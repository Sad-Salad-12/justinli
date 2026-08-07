from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "works"

INK = HexColor("#0B0C0F")
MUTED = HexColor("#686B73")
LINE = HexColor("#D9DADD")
SOFT = HexColor("#F3F4F6")
BLUE = HexColor("#145BFF")
WHITE = HexColor("#FFFFFF")

DOCUMENTS = [
    {
        "filename": "solution-blueprint-sample.pdf",
        "index": "01",
        "type": "SOLUTION DESIGN",
        "title": "Solution Blueprint",
        "subtitle": "From an ambiguous business question to a testable system plan.",
        "sections": [
            ("CONTEXT", "Frame the user workflow, decision points, constraints, and the cost of doing nothing."),
            ("SYSTEM", "Map data flow, retrieval, permissions, evaluation, observability, and the human handoff."),
            ("DELIVERY", "Turn the architecture into a staged plan with explicit assumptions and validation gates."),
        ],
        "labels": ["DISCOVERY", "ARCHITECTURE", "AI / DATA"],
    },
    {
        "filename": "field-discovery-sample.pdf",
        "index": "02",
        "type": "FIELD ENGINEERING",
        "title": "Field Discovery Notes",
        "subtitle": "A working document for turning field signals into clear hypotheses.",
        "sections": [
            ("OBSERVE", "Capture how work actually happens: actors, systems, workarounds, latency, and failure modes."),
            ("SYNTHESIZE", "Separate symptoms from root causes and rank assumptions by value, risk, and testability."),
            ("VALIDATE", "Design the smallest realistic prototype that can prove or disprove the next key decision."),
        ],
        "labels": ["FIELD WORK", "PROTOTYPE", "VALIDATION"],
    },
    {
        "filename": "production-readiness-sample.pdf",
        "index": "03",
        "type": "DELIVERY SYSTEM",
        "title": "Production Readiness",
        "subtitle": "A concise path from a successful demo to a dependable workflow.",
        "sections": [
            ("INTEGRATE", "Confirm interfaces, identity, permissions, data contracts, and ownership boundaries."),
            ("OPERATE", "Define quality thresholds, monitoring, incident response, rollback, and support routines."),
            ("ADOPT", "Prepare enablement, feedback loops, and a clear path for the system to improve after launch."),
        ],
        "labels": ["INTEGRATION", "OPERATIONS", "ADOPTION"],
    },
]


def paragraph(pdf: canvas.Canvas, text: str, x: float, y: float, max_width: float, leading: float = 15) -> float:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if stringWidth(candidate, "Helvetica", 10) <= max_width:
            current = candidate
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)

    pdf.setFont("Helvetica", 10)
    pdf.setFillColor(MUTED)
    for line in lines:
        pdf.drawString(x, y, line)
        y -= leading
    return y


def draw_document(document: dict[str, object]) -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    path = OUTPUT / str(document["filename"])
    width, height = A4
    pdf = canvas.Canvas(str(path), pagesize=A4, pageCompression=1)
    pdf.setTitle(str(document["title"]))
    pdf.setAuthor("Portfolio demo document")

    margin = 48
    content_width = width - margin * 2

    pdf.setFillColor(WHITE)
    pdf.rect(0, 0, width, height, fill=1, stroke=0)

    pdf.setStrokeColor(HexColor("#ECEDEF"))
    pdf.setLineWidth(0.45)
    for x in range(margin, int(width - margin) + 1, 50):
        pdf.line(x, 0, x, height)
    for y in range(40, int(height), 50):
        pdf.line(0, y, width, y)

    pdf.setFillColor(WHITE)
    pdf.rect(margin - 14, 40, content_width + 28, height - 80, fill=1, stroke=0)

    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 9)
    pdf.drawString(margin, height - 54, f"JUSTIN / {document['index']}")
    pdf.setFillColor(BLUE)
    pdf.setFont("Courier", 7)
    type_label = str(document["type"])
    pdf.drawRightString(width - margin, height - 54, type_label)

    pdf.setStrokeColor(LINE)
    pdf.line(margin, height - 68, width - margin, height - 68)

    pdf.setFillColor(INK)
    pdf.setFont("Helvetica-Bold", 34)
    pdf.drawString(margin, height - 129, str(document["title"]))

    pdf.setFillColor(MUTED)
    pdf.setFont("Helvetica", 12)
    pdf.drawString(margin, height - 153, str(document["subtitle"]))

    diagram_y = height - 258
    pdf.setStrokeColor(HexColor("#BFC9E3"))
    pdf.setLineWidth(0.8)
    pdf.line(margin + 18, diagram_y, width - margin - 18, diagram_y)

    node_xs = [margin + 18, width / 2, width - margin - 18]
    node_labels = ["FIELD", "SYSTEM", "IMPACT"]
    for index, (x, label) in enumerate(zip(node_xs, node_labels)):
        pdf.setFillColor(WHITE if index != 1 else BLUE)
        pdf.setStrokeColor(BLUE)
        pdf.circle(x, diagram_y, 15 if index != 1 else 20, fill=1, stroke=1)
        pdf.setFillColor(BLUE if index != 1 else WHITE)
        pdf.setFont("Courier-Bold", 6)
        pdf.drawCentredString(x, diagram_y - 2, label)

    pdf.setFillColor(BLUE)
    pdf.setFont("Courier", 7)
    pdf.drawCentredString((node_xs[0] + node_xs[1]) / 2, diagram_y + 12, "DISCOVER")
    pdf.drawCentredString((node_xs[1] + node_xs[2]) / 2, diagram_y + 12, "DEPLOY")

    section_top = height - 344
    section_gap = 112
    for index, (label, body) in enumerate(document["sections"]):
        y = section_top - index * section_gap
        pdf.setFillColor(BLUE)
        pdf.setFont("Courier-Bold", 7)
        pdf.drawString(margin, y, f"0{index + 1} / {label}")
        pdf.setStrokeColor(LINE)
        pdf.line(margin, y - 12, width - margin, y - 12)
        paragraph(pdf, str(body), margin, y - 34, content_width * 0.82)

    label_y = 93
    label_x = margin
    for label in document["labels"]:
        label_text = str(label)
        label_width = stringWidth(label_text, "Courier", 7) + 18
        pdf.setFillColor(SOFT)
        pdf.setStrokeColor(LINE)
        pdf.rect(label_x, label_y, label_width, 22, fill=1, stroke=1)
        pdf.setFillColor(INK)
        pdf.setFont("Courier", 7)
        pdf.drawCentredString(label_x + label_width / 2, label_y + 7.5, label_text)
        label_x += label_width + 8

    pdf.setFillColor(HexColor("#777B84"))
    pdf.setFont("Courier", 6.5)
    pdf.drawString(margin, 57, "DEMO DOCUMENT - REPLACE WITH YOUR OWN DE-IDENTIFIED WORK")
    pdf.drawRightString(width - margin, 57, f"{document['index']} / 03")

    pdf.save()


if __name__ == "__main__":
    for item in DOCUMENTS:
        draw_document(item)
