// Mouse panning complements native wheel, scrollbar and touch scrolling.
(() => {
  let drag = null;
  let ignoreClickUntil = 0;
  document.addEventListener("pointerdown", event => {
    if (event.pointerType !== "mouse" || event.button !== 0 || event.target.closest("button,a,input,select,label,dialog,th")) return;
    if (!event.target.closest(".report-canvas")) return;
    const table = event.target.closest(".table-scroll");
    const vertical = table && table.scrollHeight > table.clientHeight + 1 ? table : document.scrollingElement;
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, left: table?.scrollLeft ?? 0, top: vertical.scrollTop, table, vertical, moved: false };
  });
  document.addEventListener("pointermove", event => {
    if (!drag || drag.id !== event.pointerId) return;
    const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
    if (!drag.moved && Math.hypot(dx, dy) < 6) return;
    if (!drag.moved) {
      drag.moved = true;
      document.documentElement.setPointerCapture(event.pointerId);
      document.documentElement.dataset.dragging = "true";
    }
    event.preventDefault();
    drag.vertical.scrollTop = drag.top - dy;
    if (drag.table) drag.table.scrollLeft = drag.left - dx;
  }, { passive: false });
  const finish = event => {
    if (!drag || drag.id !== event.pointerId) return;
    if (drag.moved) ignoreClickUntil = performance.now() + 250;
    if (document.documentElement.hasPointerCapture(event.pointerId)) document.documentElement.releasePointerCapture(event.pointerId);
    delete document.documentElement.dataset.dragging;
    drag = null;
  };
  document.addEventListener("pointerup", finish);
  document.addEventListener("pointercancel", finish);
  document.addEventListener("click", event => {
    if (performance.now() < ignoreClickUntil) { event.preventDefault(); event.stopImmediatePropagation(); }
  }, true);
})();
