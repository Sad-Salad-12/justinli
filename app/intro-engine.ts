// First-visit intro. A blue dot draws an orbital system, collapses it into a line,
// unzips the name from that line, then settles every element onto the real hero:
// the final frames are drawn at the measured positions of the page underneath, so
// fading the canvas out reveals an identical layout.

type RGB = [number, number, number];
type Pt = { x: number; y: number };
type Orbit = { cx: number; cy: number; rx: number; ry: number; rot: number };
type Run = { text: string; x: number; y: number; font: string; size: number; spacing: number; color: string; width: number };

const TAU = Math.PI * 2;
const DEG = Math.PI / 180;
const INK: RGB = [11, 12, 15];
const BLUE: RGB = [20, 91, 255];
const SOFT_BLUE: RGB = [111, 155, 255];
const LABEL = "#4b4e55";
const PLAY = 4.2;
const FADE = 0.35;

const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const mix = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));

function bezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const sx = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sy = (t: number) => ((ay * t + by) * t + cy) * t;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let lo = 0, hi = 1, t = x;
    for (let i = 0; i < 28; i++) { if (sx(t) < x) lo = t; else hi = t; t = (lo + hi) / 2; }
    return sy(t);
  };
}
const ease = {
  outExpo: (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  outQuart: (t: number) => 1 - Math.pow(1 - t, 4),
  outCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  inCubic: (t: number) => t * t * t,
  inOutSine: (t: number) => -(Math.cos(Math.PI * t) - 1) / 2,
  outBack: (t: number, s = 1.7) => (t <= 0 ? 0 : 1 + (s + 1) * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2)),
  snap: bezier(0.83, 0, 0.17, 1),
  glide: bezier(0.65, 0, 0.35, 1),
  settle: bezier(0.16, 1, 0.3, 1),
  swing: bezier(0.76, 0, 0.24, 1),
  sweep: bezier(0.55, 0, 0.2, 1),
};
// Monotone cubic through (x, y) points (Fritsch–Carlson): smooth, never runs backwards.
function monotone(points: [number, number][]) {
  const n = points.length, xs = points.map((p) => p[0]), ys = points.map((p) => p[1]);
  const d = xs.slice(0, -1).map((x, i) => (ys[i + 1] - ys[i]) / (xs[i + 1] - x));
  const m = xs.map((_, i) => (i === 0 ? d[0] : i === n - 1 ? d[n - 2] : d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2));
  for (let i = 0; i < n - 1; i++) {
    const a = m[i] / d[i], b = m[i + 1] / d[i], h = a * a + b * b;
    if (h > 9) { const k = 3 / Math.sqrt(h); m[i] = k * a * d[i]; m[i + 1] = k * b * d[i]; }
  }
  return (x: number) => {
    if (x <= xs[0]) return ys[0];
    if (x >= xs[n - 1]) return ys[n - 1];
    let i = 0;
    while (x > xs[i + 1]) i++;
    const h = xs[i + 1] - xs[i], t = (x - xs[i]) / h, t2 = t * t, t3 = t2 * t;
    return (2 * t3 - 3 * t2 + 1) * ys[i] + (t3 - 2 * t2 + t) * h * m[i] + (-2 * t3 + 3 * t2) * ys[i + 1] + (t3 - t2) * h * m[i + 1];
  };
}
// The choreography below is authored on a 9 s timeline; this maps real seconds onto it so the
// whole intro plays in PLAY seconds, spending relatively more time on the collapse and the name.
const pace = monotone([[0, 0], [0.29, 0.62], [1.43, 3.3], [1.91, 4.1], [2.72, 5.45], [3.05, 6.1], [PLAY, 9.0]]);

// Eased approach to a steady speed: starts at velocity 0 and tends to v.
const drift = (dt: number, v: number, tau = 0.5) => (dt <= 0 ? 0 : v * (dt - tau * (1 - Math.exp(-dt / tau))));

/* ---------- Ellipses ---------- */
const LUT_N = 720;
const lutCache = new Map<number, Float64Array>();
function lut(ratio: number) {
  const key = Math.round(ratio * 2000);
  const cached = lutCache.get(key);
  if (cached) return cached;
  const r = key / 2000, table = new Float64Array(LUT_N + 1);
  let acc = 0, px = 1, py = 0;
  for (let i = 1; i <= LUT_N; i++) {
    const th = (i / LUT_N) * TAU, x = Math.cos(th), y = r * Math.sin(th);
    acc += Math.hypot(x - px, y - py); table[i] = acc; px = x; py = y;
  }
  lutCache.set(key, table);
  return table;
}
// Parametric angle reached after travelling fraction u of the perimeter from th0.
function thetaAt(o: Orbit, th0: number, u: number) {
  const table = lut(clamp(Math.max(o.ry, 1e-4) / Math.max(o.rx, 1e-4)));
  const total = table[LUT_N];
  const n = ((((th0 % TAU) + TAU) % TAU) / TAU) * LUT_N, i0 = Math.floor(n);
  const s0 = table[i0] + (table[Math.min(i0 + 1, LUT_N)] - table[i0]) * (n - i0);
  let s = s0 + u * total;
  const turns = Math.floor(s / total);
  s -= turns * total;
  let lo = 0, hi = LUT_N;
  while (hi - lo > 1) { const m = (lo + hi) >> 1; if (table[m] < s) lo = m; else hi = m; }
  return ((lo + (s - table[lo]) / (table[hi] - table[lo] || 1)) / LUT_N) * TAU + turns * TAU;
}
function ellPoint(o: Orbit, th: number) {
  const c = Math.cos(th), s = Math.sin(th), cr = Math.cos(o.rot), sr = Math.sin(o.rot);
  const x = o.rx * c, y = o.ry * s;
  return { x: o.cx + x * cr - y * sr, y: o.cy + x * sr + y * cr, depth: s };
}
function angleOf(o: Orbit, p: Pt) {
  const dx = p.x - o.cx, dy = p.y - o.cy, cr = Math.cos(o.rot), sr = Math.sin(o.rot);
  return Math.atan2((-dx * sr + dy * cr) / o.ry, (dx * cr + dy * sr) / o.rx);
}

/* ---------- Scene A layout (design space: 1920×1080 around the viewport centre) ---------- */
const ORBITS = [
  { rx: 430, ry: 158, rot: -11, col: BLUE, a: 1, w: 1.5, draw: [1.12, 2.2], th0: Math.PI / 2, wob: [0.05, 0.1], dash: false },
  { rx: 520, ry: 196, rot: 27, col: INK, a: 0.17, w: 1, draw: [1.42, 2.32], th0: -2.2, wob: [0.09, 0], dash: false },
  { rx: 372, ry: 124, rot: -61, col: INK, a: 0.14, w: 1, draw: [1.6, 2.46], th0: 2.6, wob: [0.1, 0.35], dash: false },
  { rx: 258, ry: 96, rot: -11, col: BLUE, a: 0.34, w: 1, draw: [1.78, 2.6], th0: 0.4, wob: [0.07, 0.7], dash: true },
];
// Start positions chosen by search so no two labels touch between 2.0s and 3.3s.
const SATS = [
  { o: 1, u0: 0.799, v: 0.085, label: "PRD" },
  { o: 1, u0: 0.288, v: 0.085, label: "WORKFLOWS" },
  { o: 2, u0: 0.176, v: -0.12, label: "LLM" },
  { o: 2, u0: 0.764, v: -0.12, label: "PROTOTYPES" },
  { o: 3, u0: 0.714, v: 0.16, label: "LARK BASE" },
  { o: 3, u0: 0.178, v: 0.16, label: "TABLEAU" },
];

type Options = { onHandoff: () => void; onDone: () => void };

export function runIntro(canvas: HTMLCanvasElement, { onHandoff, onDone }: Options) {
  const ctx = canvas.getContext("2d");
  const nameEl = document.querySelector<HTMLElement>(".hero-name");
  const discEl = document.querySelector<HTMLElement>(".hero-disciplines");
  if (!ctx || !nameEl || !discEl) { onHandoff(); onDone(); return { stop() {}, skip() {} }; }
  const c = ctx;

  const vw = window.innerWidth, vh = window.innerHeight, dpr = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = Math.round(vw * dpr);
  canvas.height = Math.round(vh * dpr);
  const U = Math.min(vw / 1250, vh / 1000);
  const CX = vw / 2, CY = vh / 2, LINE_Y = CY + 100 * U;
  const px = (v: number) => v / U; // screen pixels expressed in design units
  const dotScale = clamp(U, 0.75, 1.1) / U;
  const showLabels = vw >= 700;

  // Type as it is set on the page.
  const nameCs = getComputedStyle(nameEl), discCs = getComputedStyle(discEl);
  const NAME = (nameEl.textContent || "JUSTIN LI.").replace(/\.$/, "");
  const nameFamily = nameCs.fontFamily, nameWeight = nameCs.fontWeight;
  const nameTrack = (parseFloat(nameCs.letterSpacing) || 0) / parseFloat(nameCs.fontSize);
  const nameSx = parseFloat(nameCs.getPropertyValue("--v2-name-scale-x")) || 1;
  const SANS = discCs.fontFamily;
  const nameFont = (size: number) => `${nameWeight} ${size}px ${nameFamily}`;

  function nameLayout(size: number) {
    c.font = nameFont(size); c.letterSpacing = "0px";
    const ls = nameTrack * size, xs: number[] = [];
    for (let i = 0; i <= NAME.length; i++) xs.push(c.measureText(NAME.slice(0, i)).width + i * ls);
    const periodW = c.measureText(".").width;
    return { xs, ls, periodX: xs[NAME.length] + periodW / 2, periodOrigin: xs[NAME.length], dotR: 0.034 * size };
  }
  const refLayout = nameLayout(100);
  const nameWidthPer = ((refLayout.periodX + refLayout.dotR) * nameSx) / 100;
  const sizeB = Math.min(300 * U, (vw * 0.84) / nameWidthPer);
  const leftB = CX - (nameWidthPer * sizeB) / 2;

  // Disciplines: centred above the name first, then on their places in the hero.
  const discItems = Array.from(discEl.querySelectorAll("li")).map((li) => li.textContent || "");
  const discTrackRatio = (parseFloat(discCs.letterSpacing) || 0) / parseFloat(discCs.fontSize);
  const discFont = (size: number) => `${discCs.fontWeight} ${size}px ${SANS}`;
  const discSizeB = (() => {
    c.font = discFont(100); c.letterSpacing = `${discTrackRatio * 100}px`;
    const w = discItems.reduce((sum, word) => sum + c.measureText(word).width, 0) + c.measureText("×").width * (discItems.length - 1) + 32 * (discItems.length - 1);
    return Math.min(17, (vw * 0.88) / (w / 100));
  })();
  const discB = (() => {
    c.font = discFont(discSizeB); c.letterSpacing = `${discTrackRatio * discSizeB}px`;
    const parts: { text: string; x: number; blue: boolean }[] = [];
    let x = 0;
    discItems.forEach((word, i) => {
      if (i > 0) { parts.push({ text: "×", x, blue: true }); x += c.measureText("×").width + 16 * (discSizeB / 17); }
      parts.push({ text: word, x, blue: false });
      x += c.measureText(word).width + (i < discItems.length - 1 ? 16 * (discSizeB / 17) : 0);
    });
    const left = CX - x / 2, y = LINE_Y - 0.708 * sizeB - 0.2 * sizeB;
    return parts.map((p) => ({ ...p, x: left + p.x, y }));
  })();

  /* ---------- Measurements of the real hero (taken once its entrance has settled) ---------- */
  type Targets = {
    name: { size: number; left: number; baseline: number; sx: number };
    disc: { text: string; x: number; y: number; size: number; blue: boolean }[];
    discColor: string;
    lines: Run[]; body: Run[];
    card: { x: number; y: number; w: number; h: number; r: number; border: string; img: HTMLImageElement | null; objX: number; objY: number; imgScale: number; filter: string };
    orbit: Orbit; ringBack: string; ringFront: string;
    satEls: HTMLElement[];
  };
  let T: Targets | null = null;
  // The page paints text baselines on whole device pixels, rounding up; match it so the handoff lines up.
  const snap = (y: number) => Math.ceil(y * dpr - 0.01) / dpr;
  const ascent = (font: string) => { c.font = font; return c.measureText("Hg").fontBoundingBoxAscent; };
  function runsOf(root: Element | null): Run[] {
    if (!root) return [];
    const runs: Run[] = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const range = document.createRange();
    for (let node = walker.nextNode() as Text | null; node; node = walker.nextNode() as Text | null) {
      const cs = getComputedStyle(node.parentElement as Element);
      if (cs.display === "none") continue;
      const size = parseFloat(cs.fontSize);
      const font = `${cs.fontStyle} ${cs.fontWeight} ${size}px ${cs.fontFamily}`;
      const spacing = parseFloat(cs.letterSpacing) || 0, a = ascent(font);
      let cur: Run | null = null;
      for (let i = 0; i < node.data.length; i++) {
        range.setStart(node, i); range.setEnd(node, i + 1);
        const r = range.getClientRects()[0];
        if (!r || r.width === 0) continue;
        if (cur && Math.abs(snap(r.top + a) - cur.y) < 2) { cur.text += node.data[i]; cur.width = r.right - cur.x; }
        else { cur = { text: node.data[i], x: r.left, y: snap(r.top + a), font, size, spacing, color: cs.color, width: r.width }; runs.push(cur); }
      }
    }
    runs.forEach((r) => { r.text = r.text.replace(/\s+$/, ""); });
    return runs.filter((r) => r.text.trim());
  }
  function measure(): Targets {
    const range = document.createRange();
    const text = nameEl!.firstChild as Text;
    range.setStart(text, 0); range.setEnd(text, 1);
    const first = range.getClientRects()[0];
    const cs = getComputedStyle(nameEl!), size = parseFloat(cs.fontSize);
    const sx = new DOMMatrix(cs.transform === "none" ? undefined : cs.transform).a || nameSx;
    const name = { size, left: first.left, baseline: first.top + ascent(nameFont(size)), sx };

    const discColor = getComputedStyle(discEl!).color;
    const disc: Targets["disc"] = [];
    Array.from(discEl!.querySelectorAll("li")).forEach((li, i) => {
      const run = runsOf(li)[0];
      if (!run) return;
      if (i > 0) disc.push({ text: "×", x: li.getBoundingClientRect().left, y: run.y, size: run.size, blue: true });
      disc.push({ text: run.text, x: run.x, y: run.y, size: run.size, blue: false });
    });

    const frame = document.querySelector<HTMLElement>(".portrait-frame")!;
    const fr = frame.getBoundingClientRect(), fcs = getComputedStyle(frame);
    const img = frame.querySelector("img");
    const ics = img ? getComputedStyle(img) : null;
    const [objX, objY] = (ics?.objectPosition || "50% 50%").split(" ").map((v) => parseFloat(v) / 100);
    const imgScale = ics && ics.transform !== "none" ? new DOMMatrix(ics.transform).a : 1;

    const orbitEl = document.querySelector<HTMLElement>(".portrait-orbit:not(.portrait-orbit-front)")!;
    const frontEl = document.querySelector<HTMLElement>(".portrait-orbit-front");
    const or = orbitEl.getBoundingClientRect(), ocs = getComputedStyle(orbitEl);
    const m = new DOMMatrix(ocs.transform === "none" ? undefined : ocs.transform);
    const orbit = { cx: or.left + or.width / 2, cy: or.top + or.height / 2, rx: orbitEl.offsetWidth / 2 - 0.5, ry: orbitEl.offsetHeight / 2 - 0.5, rot: Math.atan2(m.b, m.a) };

    return {
      name, disc, discColor,
      lines: runsOf(document.querySelector(".hero-statement h2")),
      body: runsOf(document.querySelector(".hero-statement > p")),
      card: { x: fr.left, y: fr.top, w: fr.width, h: fr.height, r: parseFloat(fcs.borderTopLeftRadius) || 40, border: fcs.borderTopColor, img, objX, objY, imgScale, filter: ics?.filter && ics.filter !== "none" ? ics.filter : "none" },
      orbit, ringBack: ocs.borderTopColor, ringFront: frontEl ? getComputedStyle(frontEl).borderTopColor : ocs.borderTopColor,
      satEls: Array.from(orbitEl.querySelectorAll<HTMLElement>(".orbit-satellite")),
    };
  }
  const satPos = (el: HTMLElement | undefined): Pt | null => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return r.width > 0 ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null;
  };

  /* ---------- Drawing helpers ---------- */
  function dot(x: number, y: number, r: number, color: RGB = BLUE, alpha = 1, glow = 0) {
    if (r <= 0.01 || alpha <= 0.001) return;
    if (glow > 0) {
      const g = c.createRadialGradient(x, y, 0, x, y, r * 3.4);
      g.addColorStop(0, rgba(color, 0.42 * glow * alpha));
      g.addColorStop(1, rgba(color, 0));
      c.fillStyle = g; c.beginPath(); c.arc(x, y, r * 3.4, 0, TAU); c.fill();
    }
    c.fillStyle = rgba(color, alpha); c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill();
  }
  // A short smear from the previous position gives fast dots a sense of motion blur.
  function movingDot(p: Pt, prev: Pt, r: number, color: RGB = BLUE, alpha = 1, glow = 0) {
    const d = Math.hypot(p.x - prev.x, p.y - prev.y);
    if (d > r * 0.6) {
      c.strokeStyle = rgba(color, 0.32 * alpha); c.lineWidth = r * 1.7; c.lineCap = "round";
      c.beginPath(); c.moveTo(prev.x, prev.y); c.lineTo(p.x, p.y); c.stroke();
    }
    dot(p.x, p.y, r, color, alpha, glow);
  }
  function pulse(x: number, y: number, t: number, t0: number, dur: number, r0: number, r1: number, a0: number, width = 1.3) {
    const p = seg(t, t0, t0 + dur);
    if (p <= 0 || p >= 1) return;
    c.strokeStyle = rgba(BLUE, a0 * Math.pow(1 - p, 1.6)); c.lineWidth = width;
    c.beginPath(); c.arc(x, y, lerp(r0, r1, ease.outCubic(p)), 0, TAU); c.stroke();
  }
  function text(str: string, x: number, y: number, font: string, color: string, spacing = 0) {
    c.font = font; c.letterSpacing = `${spacing}px`; c.textAlign = "left"; c.textBaseline = "alphabetic";
    c.fillStyle = color; c.fillText(str, x, y); c.letterSpacing = "0px";
  }
  function tracePath(o: Orbit, th0: number, u0: number, u1: number) {
    const n = Math.max(2, Math.ceil(Math.abs(u1 - u0) * 260));
    c.beginPath();
    for (let j = 0; j <= n; j++) {
      const p = ellPoint(o, thetaAt(o, th0, u0 + ((u1 - u0) * j) / n));
      if (j === 0) c.moveTo(p.x, p.y); else c.lineTo(p.x, p.y);
    }
  }
  function half(o: Orbit, front: boolean, draw: () => void) {
    c.save();
    c.translate(o.cx, o.cy); c.rotate(o.rot);
    c.beginPath();
    if (front) c.rect(-5000, 0, 10000, 5000); else c.rect(-5000, -5000, 10000, 5000);
    c.rotate(-o.rot); c.translate(-o.cx, -o.cy);
    c.clip();
    draw();
    c.restore();
  }

  /* ---------- Scene A: the dot builds an orbital system, then flattens it ---------- */
  const collapseAt = (t: number) => ease.snap(seg(t, 3.3, 4.05));
  function orbitAt(i: number, t: number): Orbit {
    const o = ORBITS[i], k = collapseAt(t);
    const sysRot = (-3 + 7 * ease.inOutSine(seg(t, 0.8, 3.3))) * DEG;
    const wob = 1 + o.wob[0] * Math.sin(TAU * (t * 0.3 + o.wob[1]));
    return { cx: 960, cy: lerp(540, 640, k), rx: lerp(o.rx, 900, k), ry: o.ry * wob * (1 - k), rot: (o.rot * DEG + sysRot) * (1 - k) };
  }
  function tracerA(t: number) {
    const o = orbitAt(0, t), core = { x: 960, y: lerp(540, 640, collapseAt(t)) };
    if (t < 1.12) {
      const p = ease.inCubic(seg(t, 0.78, 1.12)), end = ellPoint(o, ORBITS[0].th0), ctrl = { x: 1150, y: 570 };
      const q = (a: number, b: number, d: number) => (1 - p) * (1 - p) * a + 2 * (1 - p) * p * b + p * p * d;
      return { x: q(core.x, ctrl.x, end.x), y: q(core.y, ctrl.y, end.y), u: 0, merge: 0 };
    }
    const u = t < 2.2 ? ease.outCubic(seg(t, 1.12, 2.2)) : 1 + drift(t - 2.2, 0.075, 0.45);
    const p = ellPoint(o, thetaAt(o, ORBITS[0].th0, u)), merge = ease.inCubic(seg(t, 3.78, 4.1));
    return { x: lerp(p.x, core.x, merge), y: lerp(p.y, core.y, merge), u, merge };
  }
  function drawSystem(t: number) {
    if (t >= 4.1) return;
    const k = collapseAt(t), core = { x: 960, y: lerp(540, 640, k) };
    const cam = lerp(1 + 0.05 * ease.inOutSine(seg(t, 0.4, 3.3)), 1, k);
    c.save();
    c.translate(CX - 960 * U, CY - 540 * U); c.scale(U, U);
    c.translate(core.x, core.y); c.scale(cam, cam); c.translate(-core.x, -core.y);

    const tr = tracerA(t);
    ORBITS.forEach((spec, i) => {
      const o = orbitAt(i, t);
      const alpha = lerp(i === 0 ? lerp(1, 0.4, ease.outCubic(seg(t, 2.25, 2.9))) : spec.a, 0.42, k);
      c.strokeStyle = rgba(mix(spec.col, INK, k), alpha); c.lineWidth = px(lerp(spec.w, 1, k)); c.lineCap = "round";
      if (spec.dash) { c.setLineDash([px(4), px(7 * (1 - k) + 0.001)]); c.lineDashOffset = px(-t * 22); }
      const progress = i === 0 ? (t < 1.12 ? 0 : tr.u) : ease.glide(seg(t, spec.draw[0], spec.draw[1]));
      if (progress > 0) {
        if (progress < 1) tracePath(o, spec.th0, 0, progress);
        else { c.beginPath(); c.ellipse(o.cx, o.cy, o.rx, Math.max(o.ry, 1e-3), o.rot, 0, TAU); }
        c.stroke();
      }
      c.setLineDash([]);
    });

    const sats = SATS.map((s, i) => {
      const o = orbitAt(s.o, t), p = ellPoint(o, thetaAt(o, ORBITS[s.o].th0, s.u0 + s.v * (t - 1.0)));
      return { ...s, i, x: p.x, y: p.y, depth: (p.depth + 1) / 2 };
    });
    sats.forEach((s) => {
      const reach = ease.outCubic(seg(t, 2.42 + s.i * 0.05, 2.8 + s.i * 0.05)) * (1 - ease.outCubic(seg(t, 3.12, 3.4)));
      if (reach <= 0) return;
      c.strokeStyle = rgba(INK, 0.09 * lerp(0.6, 1, s.depth)); c.lineWidth = px(1);
      c.beginPath(); c.moveTo(core.x, core.y); c.lineTo(lerp(core.x, s.x, reach), lerp(core.y, s.y, reach)); c.stroke();
      const f0 = 2.72 + s.i * 0.11;
      if (t > f0 && t < 3.34) {
        const ph = ((t - f0) / 0.62) % 1, e = ease.inCubic(ph);
        dot(lerp(s.x, core.x, e), lerp(s.y, core.y, e), 2.3 * dotScale, BLUE, Math.sin(Math.PI * ph) * reach);
      }
    });
    const labelSize = Math.max(12.5, 11 / U), indexSize = Math.max(10.5, 9.5 / U);
    sats.forEach((s) => {
      const a0 = 2.0 + s.i * 0.085, scale = ease.outBack(seg(t, a0, a0 + 0.38));
      const alpha = lerp(0.42, 1, s.depth) * (1 - k);
      if (scale <= 0 || alpha <= 0) return;
      dot(s.x, s.y, 3.6 * dotScale * lerp(0.78, 1, s.depth) * scale, s.i % 2 ? INK : BLUE, alpha);
      if (!showLabels) return;
      const shown = Math.round(s.label.length * seg(t, a0 + 0.1, a0 + 0.42) * (1 - seg(t, 3.08 + s.i * 0.02, 3.3 + s.i * 0.02)));
      if (shown <= 0) return;
      c.globalAlpha = alpha;
      text(String(s.i + 1).padStart(2, "0"), s.x + labelSize, s.y + labelSize * 0.32, `600 ${indexSize}px ${SANS}`, rgba(BLUE, 1), indexSize * 0.11);
      text(s.label.slice(0, shown), s.x + labelSize * 2.95, s.y + labelSize * 0.36, `600 ${labelSize}px ${SANS}`, LABEL, labelSize * 0.15);
      c.globalAlpha = 1;
    });

    if (t >= 0.78) movingDot(tr, tracerA(t - step), 6 * dotScale * (1 - 0.4 * tr.merge), BLUE, 1, 0.9);
    dot(core.x, core.y, 7 * dotScale * ease.outBack(seg(t, 0.2, 0.62), 2.2), BLUE, 1, seg(t, 0.4, 1.0));
    pulse(core.x, core.y, t, 0.52, 0.95, 8, 88, 0.3, px(1.3));
    pulse(core.x, core.y, t, 2.78, 0.9, 8, 60, 0.22, px(1.3));
    c.restore();
  }

  /* ---------- Scene B: the dot unzips the name from the line ---------- */
  const SWEEP = [4.36, 5.0];
  const toScreenX = (dx: number) => CX + (dx - 960) * U;
  const nameState = (t: number) => {
    const m = ease.swing(seg(t, 6.1, 7.25));
    const target = T?.name ?? { size: sizeB, left: leftB, baseline: LINE_Y, sx: nameSx };
    return { size: lerp(sizeB, target.size, m), left: lerp(leftB, target.left, m), baseline: lerp(LINE_Y, target.baseline, m), sx: lerp(nameSx, target.sx, m) };
  };
  const layoutB = nameLayout(sizeB);
  const sweepStart = leftB - 0.1 * sizeB, sweepEnd = leftB + layoutB.periodX * nameSx;
  function sweepTimeFor(x: number) {
    const target = clamp((x - sweepStart) / (sweepEnd - sweepStart));
    let lo = 0, hi = 1;
    for (let i = 0; i < 26; i++) { const m = (lo + hi) / 2; if (ease.sweep(m) < target) lo = m; else hi = m; }
    return lerp(SWEEP[0], SWEEP[1], lo);
  }
  function periodCentre(t: number) {
    const n = nameState(t), l = nameLayout(n.size);
    return { x: n.left + l.periodX * n.sx, y: n.baseline - l.dotR, r: l.dotR };
  }
  function nameDot(t: number) {
    let x: number, y = LINE_Y, r = 7 * clamp(U, 0.75, 1.1);
    if (t < SWEEP[0]) x = lerp(CX, sweepStart, ease.glide(seg(t, 4.1, SWEEP[0])));
    else x = lerp(sweepStart, sweepEnd, ease.sweep(seg(t, SWEEP[0], SWEEP[1])));
    const land = seg(t, 5.0, 5.36);
    if (land > 0) {
      const p = periodCentre(t), e = ease.outBack(land, 2.4);
      if (land >= 1) return p;
      r = lerp(r, p.r, e); x = lerp(sweepEnd, p.x, ease.outCubic(land)); y = lerp(LINE_Y, p.y, e);
    }
    return { x, y, r };
  }
  function drawName(t: number) {
    if (t < 4.1) return;
    const n = nameState(t), l = nameLayout(n.size), d = nameDot(t);

    if (t < 5.4) {
      const r = ease.snap(seg(t, 4.1, 4.55));
      const xL = lerp(toScreenX(60), leftB - 0.14 * sizeB, r);
      const xR = lerp(lerp(toScreenX(1860), sweepEnd + 0.1 * sizeB, r), d.x, ease.snap(seg(t, 5.0, 5.34)));
      c.lineWidth = 1;
      if (t < SWEEP[0]) {
        c.strokeStyle = rgba(INK, 0.89); c.beginPath(); c.moveTo(xL, LINE_Y); c.lineTo(xR, LINE_Y); c.stroke();
      } else {
        const fade = Math.max(160, sizeB);
        if (xR > d.x) { c.strokeStyle = rgba(INK, 0.89); c.beginPath(); c.moveTo(Math.max(xL, d.x), LINE_Y); c.lineTo(xR, LINE_Y); c.stroke(); }
        const a = Math.max(xL, d.x - fade);
        if (d.x > a) {
          const g = c.createLinearGradient(d.x - fade, 0, d.x, 0);
          g.addColorStop(0, rgba(INK, 0)); g.addColorStop(1, rgba(INK, 0.89));
          c.strokeStyle = g; c.beginPath(); c.moveTo(a, LINE_Y); c.lineTo(Math.min(d.x, xR), LINE_Y); c.stroke();
        }
      }
    }

    // Letters rise out of the line as the dot passes them.
    c.save();
    c.translate(n.left, n.baseline); c.scale(n.sx, 1);
    if (t < 5.6) { c.beginPath(); c.rect(-n.size, -n.size * 1.4, n.size * 12, n.size * 1.4 + 2); c.clip(); }
    c.font = nameFont(n.size); c.letterSpacing = "0px"; c.fillStyle = rgba(INK, 1); c.textBaseline = "alphabetic";
    for (let i = 0; i < NAME.length; i++) {
      if (NAME[i] === " ") continue;
      const mid = leftB + ((layoutB.xs[i] + layoutB.xs[i + 1] - layoutB.ls) / 2) * nameSx;
      const p = seg(t, sweepTimeFor(mid), sweepTimeFor(mid) + 0.78);
      if (p <= 0) continue;
      const spread = (1 - ease.outQuart(p)) * 0.016 * n.size * (i - NAME.length / 2);
      c.fillText(NAME[i], l.xs[i] + spread, (1 - ease.outExpo(p)) * 0.708 * n.size * 1.18);
    }
    // The full stop: the blue dot hands its place to the page's own glyph as a second dot leaves for the orbit.
    const ink = ease.glide(seg(t, 6.3, 6.75));
    if (ink > 0) { c.fillStyle = rgba(INK, ink); c.fillText(".", l.periodOrigin, 0); }
    c.restore();

    const blueA = 1 - ink;
    if (blueA > 0) {
      const r = t < 6.3 ? d.r : lerp(d.r, d.r * 0.55, ink);
      movingDot(d, t < 5.36 ? nameDot(t - step) : d, r, BLUE, blueA, t < 5.36 ? 0.9 : lerp(0.9, 0, seg(t, 5.36, 6.0)));
    }
    const pc = periodCentre(t);
    pulse(pc.x, pc.y, t, 5.3, 1.1, pc.r * 1.1, pc.r * 6, 0.3);

    // Disciplines, word by word, then onto their places in the hero.
    const dm = ease.swing(seg(t, 6.18, 7.33));
    discB.forEach((part, j) => {
      const p = seg(t, 5.08 + j * 0.075, 5.83 + j * 0.075);
      if (p <= 0) return;
      const e = ease.settle(p), target = T?.disc[j];
      const size = lerp(discSizeB, target?.size ?? discSizeB, dm);
      const x = lerp(part.x, target?.x ?? part.x, dm), y = lerp(part.y, target?.y ?? part.y, dm);
      c.save();
      c.beginPath(); c.rect(x - 8, y - size * 1.25, (part.text.length + 2) * size, size * 1.6); c.clip();
      const color = part.blue ? rgba(BLUE, 1) : T?.discColor ?? "#666970";
      text(part.text, x, y + (1 - e) * size * 1.3, discFont(size), color, part.blue ? 0 : discTrackRatio * size);
      c.restore();
    });
  }

  /* ---------- Scene C: the portrait and headline settle into the real hero ---------- */
  const TRACE = [7.0, 7.78];
  let join: { th: number; t: number } | null = null;
  let lastDomAngle: number | null = null, unwrapped = 0, direction = 1;
  function domAngle(o: Orbit) {
    const p = satPos(T?.satEls[0]);
    if (!p) return null;
    const a = angleOf(o, p);
    if (lastDomAngle === null) unwrapped = a;
    else { let dA = a - lastDomAngle; dA -= Math.round(dA / TAU) * TAU; unwrapped += dA; if (Math.abs(dA) > 1e-4) direction = Math.sign(dA); }
    lastDomAngle = a;
    return unwrapped;
  }
  function drawHero(t: number) {
    if (t < 6.2 || !T) return;
    const o = T.orbit, k = T.card, dom = domAngle(o);
    const fallback = ellPoint(o, Math.PI * 0.62);
    const joinPt = dom === null ? fallback : ellPoint(o, dom);

    // Tracer: flies from the full stop, joins the orbit where the page's satellite is, laps once and becomes it.
    let tracer: { x: number; y: number; depth: number; flying: boolean; sweep: number; from: number };
    if (t < TRACE[0]) {
      const p = ease.glide(seg(t, 6.28, TRACE[0])), from = periodCentre(t);
      const ctrl = { x: lerp(from.x, joinPt.x, 0.55), y: Math.min(from.y, joinPt.y) - Math.min(250, vh * 0.25) };
      const q = (a: number, b: number, e: number) => (1 - p) * (1 - p) * a + 2 * (1 - p) * p * b + p * p * e;
      tracer = { x: q(from.x, ctrl.x, joinPt.x), y: q(from.y, ctrl.y, joinPt.y), depth: 1, flying: true, sweep: 0, from: 0 };
    } else {
      if (!join) join = { th: dom ?? Math.PI * 0.62, t };
      const u = ease.outCubic(seg(t, TRACE[0], TRACE[1]));
      const live = dom ?? join.th + drift(t - TRACE[0], TAU / 7) * direction;
      const th = join.th + u * (direction * TAU + (live - join.th));
      const pt = ellPoint(o, th);
      tracer = { ...pt, flying: false, sweep: th - join.th, from: join.th };
    }
    const settle = ease.outCubic(seg(t, TRACE[1], 8.4));
    const ring = (front: boolean) => {
      if (tracer.flying) return;
      c.lineWidth = 1; c.lineCap = "round";
      c.strokeStyle = front ? T!.ringFront : T!.ringBack;
      c.globalAlpha = 1;
      c.beginPath();
      if (Math.abs(tracer.sweep) >= TAU - 1e-3) c.ellipse(o.cx, o.cy, o.rx, o.ry, o.rot, 0, TAU);
      else c.ellipse(o.cx, o.cy, o.rx, o.ry, o.rot, tracer.from, tracer.from + tracer.sweep, tracer.sweep < 0);
      c.stroke();
      if (settle < 1) {
        c.strokeStyle = rgba(BLUE, 1 - settle); c.stroke();
      }
    };
    const small = satPos(T.satEls[1]);
    const smallA = ease.outCubic(seg(t, 7.9, 8.5));
    const sats = (front: boolean) => {
      if (!tracer.flying && (tracer.depth > 0) === front) dot(tracer.x, tracer.y, 4.5, BLUE, 1, 1);
      if (small && smallA > 0 && (angleDepth(o, small) > 0) === front) dot(small.x, small.y, 2.5, SOFT_BLUE, smallA, 0.8);
    };
    half(o, false, () => { ring(false); sats(false); });

    // Portrait: a pill that opens into the frame, the photo easing down to its resting scale.
    const open = ease.settle(seg(t, 7.02, 8.02)), openH = ease.settle(seg(t, 7.1, 8.1));
    if (open > 0) {
      const w = lerp(56, k.w, open), h = lerp(56, k.h, openH), cx = k.x + k.w / 2, cy = k.y + k.h / 2, r = lerp(28, k.r, open);
      c.save();
      c.beginPath(); c.roundRect(cx - w / 2, cy - h / 2, w, h, Math.min(r, w / 2, h / 2)); c.clip();
      c.fillStyle = "#dfe5e9"; c.fillRect(k.x, k.y, k.w, k.h);
      const img = k.img;
      if (img && img.complete && img.naturalWidth) {
        const cover = Math.max(k.w / img.naturalWidth, k.h / img.naturalHeight);
        const iw = img.naturalWidth * cover, ih = img.naturalHeight * cover;
        const zoom = lerp(1.3, k.imgScale, ease.outQuart(seg(t, 7.02, 8.7)));
        c.translate(cx, cy); c.scale(zoom, zoom); c.translate(-cx, -cy);
        c.imageSmoothingQuality = "high";
        c.filter = k.filter;
        c.drawImage(img, k.x + (k.w - iw) * k.objX, k.y + (k.h - ih) * k.objY, iw, ih);
        c.filter = "none";
        c.setTransform(dpr, 0, 0, dpr, 0, 0);
        const shade = c.createLinearGradient(0, k.y, 0, k.y + k.h);
        shade.addColorStop(0.76, "rgba(5,12,25,0)"); shade.addColorStop(1, "rgba(5,12,25,0.07)");
        c.fillStyle = shade; c.fillRect(k.x, k.y, k.w, k.h);
      }
      c.restore();
      c.strokeStyle = k.border; c.lineWidth = 1;
      c.beginPath(); c.roundRect(cx - w / 2 + 0.5, cy - h / 2 + 0.5, w - 1, h - 1, Math.min(r, w / 2, h / 2)); c.stroke();
    }
    half(o, true, () => { ring(true); sats(true); });

    // The ring's marker dot, as on the page.
    const markA = ease.outCubic(seg(t, 8.0, 8.5));
    if (markA > 0) {
      const lx = -o.rx, ly = 4 - 0.03 * (o.ry * 2), cr = Math.cos(o.rot), sr = Math.sin(o.rot);
      dot(o.cx + lx * cr - ly * sr, o.cy + lx * sr + ly * cr, 4, BLUE, markA);
    }
    if (tracer.flying && t >= 6.28) {
      const prev = t - step >= 6.28 ? (() => { const p = ease.glide(seg(t - step, 6.28, TRACE[0])), from = periodCentre(t - step); return { x: lerp(from.x, joinPt.x, p), y: lerp(from.y, joinPt.y, p) }; })() : tracer;
      movingDot(tracer, prev, 5 * ease.outBack(seg(t, 6.28, 6.5)), BLUE, 1, 1);
    }

    // Headline lines rise into place; the body follows.
    T.lines.forEach((run, i) => {
      const p = seg(t, 7.36 + i * 0.12, 8.31 + i * 0.12);
      if (p <= 0) return;
      c.save();
      c.beginPath(); c.rect(run.x - run.size * 0.3, run.y - run.size * 1.05, run.width + run.size, run.size * 1.35); c.clip();
      text(run.text, run.x, run.y + (1 - ease.outExpo(p)) * run.size * 1.2, run.font, run.color, run.spacing);
      c.restore();
    });
    T.body.forEach((run, i) => {
      const p = ease.settle(seg(t, 8.05 + i * 0.08, 8.85 + i * 0.08));
      if (p <= 0) return;
      c.globalAlpha = p;
      text(run.text, run.x, run.y + (1 - p) * 14, run.font, run.color, run.spacing);
      c.globalAlpha = 1;
    });
  }
  function angleDepth(o: Orbit, p: Pt) { return Math.sin(angleOf(o, p)); }

  /* ---------- Loop ---------- */
  function draw(t: number) {
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.fillStyle = "#ffffff"; c.fillRect(0, 0, vw, vh);
    if (!T && t >= 5.6) T = measure();
    drawSystem(t);
    drawHero(t);
    drawName(t);
  }

  let t = 0, last: number | null = null, raf = 0, leftAt: number | null = null, stopped = false;
  // Choreography time covered by one 60 fps frame at the current pace; sizes the motion smear.
  let step = 1 / 60;
  const leave = () => { if (leftAt === null) { leftAt = performance.now(); onHandoff(); } };
  const frame = (now: number) => {
    if (stopped) return;
    if (leftAt === null) t += last === null ? 0 : Math.min(0.05, (now - last) / 1000);
    last = now;
    const real = Math.min(t, PLAY), story = pace(real);
    step = Math.max(1e-3, story - pace(Math.max(0, real - 1 / 60)));
    draw(story);
    if (t >= PLAY) leave();
    if (leftAt !== null && now - leftAt > FADE * 1000) { stopped = true; onDone(); return; }
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);

  return {
    stop() { stopped = true; cancelAnimationFrame(raf); },
    skip() { leave(); },
  };
}
