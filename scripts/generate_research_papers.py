from __future__ import annotations

import html
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Flowable,
    Frame,
    HRFlowable,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)
from reportlab.platypus.tableofcontents import TableOfContents


ROOT = Path(__file__).resolve().parents[1]
DOWNLOADS = ROOT / "public" / "downloads"
PAPERS = (
    "Research_Proposal_Gap17_Explainable_Sanskrit_NLP",
    "Research_Proposal_Gap20_Paninian_CALL_Pedagogy",
)
FOREST = colors.HexColor("#173D2B")
GREEN = colors.HexColor("#24583D")
GOLD = colors.HexColor("#A68131")
INK = colors.HexColor("#26352C")
MUTED = colors.HexColor("#68756C")
CREAM = colors.HexColor("#FBF8F1")
PALE_GREEN = colors.HexColor("#EFF4EF")
PALE_GOLD = colors.HexColor("#F6F0E2")


@dataclass
class Paper:
    source: Path
    title: str
    subtitle: str
    metadata: list[str]
    body: list[str]
    sections: list[tuple[str, list[str]]]


def parse_paper(source: Path) -> Paper:
    lines = source.read_text(encoding="utf-8").splitlines()
    title = ""
    subtitle = ""
    metadata: list[str] = []
    body_start = next((i for i, line in enumerate(lines) if line.startswith("## ")), len(lines))
    for line in lines[:body_start]:
        if line.startswith("# ") and not title:
            title = line[2:].strip()
        elif line.startswith("**") and line.endswith("**") and not subtitle:
            subtitle = line[2:-2].strip()
        elif line.strip():
            metadata.append(line.strip())
    if not title or not subtitle or body_start == len(lines):
        raise ValueError(f"{source.name} must contain a title, subtitle, and paper sections.")
    body = lines[body_start:]
    sections: list[tuple[str, list[str]]] = []
    current_title = ""
    current_lines: list[str] = []
    for line in body:
        if line.startswith("## "):
            if current_title:
                sections.append((current_title, current_lines))
            current_title = line[3:].strip()
            current_lines = []
        else:
            current_lines.append(line)
    if current_title:
        sections.append((current_title, current_lines))
    if len(sections) < 10:
        raise ValueError(f"{source.name} has too few sections for a research paper.")
    return Paper(source, title, subtitle, metadata, body, sections)


def slugify(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def inline_html(text: str, reportlab: bool = False) -> str:
    text = html.escape(text, quote=False)
    text = re.sub(
        r"\[([^\]]+)\]\((https?://[^)\s]+)\)",
        lambda match: f'<a href="{match.group(2)}">{match.group(1)}</a>',
        text,
    )
    text = re.sub(
        r'(?<!["=])(https?://[^\s<>"]+)',
        lambda match: _link_plain_url(match.group(1)),
        text,
    )
    text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)
    text = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<i>\1</i>", text)
    text = re.sub(r"`([^`]+)`", r"<code>\1</code>", text)
    return text


def _link_plain_url(value: str) -> str:
    url = value.rstrip(".,;:!?")
    punctuation = value[len(url):]
    return f'<a href="{url}">{url}</a>{punctuation}'


def iter_blocks(lines: list[str]):
    paragraph: list[str] = []
    list_kind: str | None = None
    list_items: list[str] = []

    def flush_paragraph():
        nonlocal paragraph
        if paragraph:
            yield ("paragraph", " ".join(part.strip() for part in paragraph))
            paragraph = []

    def flush_list():
        nonlocal list_kind, list_items
        if list_kind and list_items:
            yield (list_kind, list_items)
        list_kind = None
        list_items = []

    for line in lines:
        if not line.strip():
            yield from flush_paragraph()
            yield from flush_list()
            continue
        heading = re.match(r"^(#{3,6})\s+(.+)$", line)
        if heading:
            yield from flush_paragraph()
            yield from flush_list()
            yield ("heading", (len(heading.group(1)), heading.group(2)))
            continue
        bullet = re.match(r"^\s*[-*]\s+(.+)$", line)
        numbered = re.match(r"^\s*\d+\.\s+(.+)$", line)
        if bullet or numbered:
            yield from flush_paragraph()
            current_kind = "bullet" if bullet else "numbered"
            if list_kind and list_kind != current_kind:
                yield from flush_list()
            list_kind = current_kind
            list_items.append((bullet or numbered).group(1))
            continue
        yield from flush_list()
        paragraph.append(line.strip())
    yield from flush_paragraph()
    yield from flush_list()


def make_html(paper: Paper, pdf_name: str) -> str:
    toc: list[tuple[str, str]] = []
    rendered_sections: list[str] = []
    for title, lines in paper.sections:
        anchor = slugify(title)
        toc.append((title, anchor))
        blocks: list[str] = []
        for kind, value in iter_blocks(lines):
            if kind == "paragraph":
                blocks.append(f"<p>{inline_html(value)}</p>")
            elif kind in ("bullet", "numbered"):
                tag = "ul" if kind == "bullet" else "ol"
                items = "".join(f"<li>{inline_html(item)}</li>" for item in value)
                blocks.append(f"<{tag}>{items}</{tag}>")
            else:
                depth, heading = value
                tag = "h3" if depth == 3 else "h4"
                blocks.append(f"<{tag}>{inline_html(heading)}</{tag}>")
        rendered_sections.append(
            f'<section aria-labelledby="{anchor}"><h2 id="{anchor}">{html.escape(title)}</h2>{"".join(blocks)}</section>'
        )

    metadata = "".join(f"<p>{inline_html(item)}</p>" for item in paper.metadata)
    toc_html = "".join(
        f'<li><a href="#{anchor}">{html.escape(title)}</a></li>' for title, anchor in toc
    )
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="{html.escape(paper.title, quote=True)} — working research proposal">
  <title>{html.escape(paper.title)} | THE PANINI PARSER</title>
  <style>
    :root {{ color-scheme: light dark; --paper: #fbf8f1; --ink: #26352c; --green: #173d2b; --muted: #65736a; --gold: #a68131; --line: #d9d1c2; }}
    * {{ box-sizing: border-box; }}
    body {{ margin: 0; background: #e9e5dc; color: var(--ink); font: 16px/1.72 Georgia, "Times New Roman", serif; }}
    .skip {{ position: absolute; left: -9999px; top: 0; background: var(--paper); padding: .7rem; }}
    .skip:focus {{ left: .7rem; z-index: 2; }}
    main {{ width: min(100% - 2rem, 54rem); margin: 2rem auto; padding: clamp(1.25rem, 5vw, 4rem); background: var(--paper); border: 1px solid var(--line); box-shadow: 0 18px 48px #18251d20, inset 0 1px #fff; }}
    header {{ border-bottom: 2px solid var(--gold); padding-bottom: 1.5rem; margin-bottom: 2rem; }}
    .eyebrow {{ color: var(--gold); font: 700 .75rem/1.4 Arial, sans-serif; letter-spacing: .13em; text-transform: uppercase; }}
    h1, h2, h3 {{ color: var(--green); line-height: 1.25; }}
    h1 {{ font-size: clamp(2rem, 5vw, 3rem); margin: .7rem 0; }}
    h2 {{ margin-top: 2.5rem; padding-bottom: .45rem; border-bottom: 1px solid var(--line); font-size: 1.55rem; }}
    h3 {{ margin-top: 1.7rem; font-size: 1.15rem; }}
    .subtitle {{ color: var(--muted); font-size: 1.2rem; }}
    .meta {{ margin-top: 1rem; font: .9rem/1.6 Arial, sans-serif; color: var(--muted); }}
    .actions {{ display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 1.5rem; }}
    .actions a {{ display: inline-block; border: 1px solid var(--green); border-radius: .5rem; padding: .55rem .85rem; color: var(--green); font: 700 .85rem Arial, sans-serif; text-decoration: none; }}
    a {{ color: #24583d; overflow-wrap: anywhere; }}
    a:focus-visible {{ outline: 3px solid var(--gold); outline-offset: 3px; }}
    nav {{ border: 1px solid var(--line); border-radius: .6rem; padding: 1rem 1.25rem; background: #f5f1e8; }}
    nav h2 {{ margin-top: 0; border: 0; font-size: 1.15rem; }}
    nav ol {{ columns: 2; column-gap: 2rem; padding-left: 1.4rem; }}
    nav li {{ break-inside: avoid; margin: .3rem 0; }}
    section {{ scroll-margin-top: 1rem; }}
    li {{ margin: .35rem 0; }}
    code {{ background: #eee8dc; padding: .08rem .25rem; border-radius: .2rem; }}
    footer {{ border-top: 1px solid var(--line); margin-top: 3rem; padding-top: 1rem; color: var(--muted); font: .8rem/1.5 Arial, sans-serif; }}
    @media (max-width: 600px) {{ body {{ font-size: 15px; }} main {{ width: 100%; margin: 0; border: 0; box-shadow: none; }} nav ol {{ columns: 1; }} }}
    @media (prefers-color-scheme: dark) {{ body {{ background: #111a14; }} main {{ --paper: #1b2820; --ink: #dce5de; --green: #c1d6c6; --muted: #a9b8ad; --line: #46564b; --gold: #d5bd7d; background: var(--paper); }} nav {{ background: #222f26; }} a {{ color: #afd0b5; }} code {{ background: #303c32; }} }}
    @media print {{ body {{ background: white; }} main {{ width: 100%; margin: 0; padding: 0; border: 0; box-shadow: none; }} .actions {{ display: none; }} a {{ color: inherit; }} }}
  </style>
</head>
<body>
  <a class="skip" href="#paper-content">Skip to paper</a>
  <main id="paper-content">
    <header>
      <p class="eyebrow">THE PANINI PARSER · Research design paper</p>
      <h1>{html.escape(paper.title)}</h1>
      <p class="subtitle">{html.escape(paper.subtitle)}</p>
      <div class="meta">{metadata}</div>
      <div class="actions">
        <a href="{html.escape(pdf_name, quote=True)}" download>Download the PDF</a>
        <a href="{html.escape(paper.source.name, quote=True)}" download>Download editable Markdown</a>
      </div>
    </header>
    <nav aria-label="Table of contents"><h2>Contents</h2><ol>{toc_html}</ol></nav>
    <article>{"".join(rendered_sections)}</article>
    <footer>Working research proposal. Proposed methods and expected outcomes are not completed findings. Bibliographic details are linked to their DOI or stable source record where available.</footer>
  </main>
</body>
</html>
"""


def locate_fonts() -> tuple[Path, Path, Path, Path]:
    candidates = (
        (
            Path("C:/Windows/Fonts/arial.ttf"),
            Path("C:/Windows/Fonts/arialbd.ttf"),
            Path("C:/Windows/Fonts/times.ttf"),
            Path("C:/Windows/Fonts/timesbd.ttf"),
        ),
        (
            Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),
            Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"),
            Path("/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"),
            Path("/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"),
        ),
        (
            Path("/Library/Fonts/Arial.ttf"),
            Path("/Library/Fonts/Arial Bold.ttf"),
            Path("/Library/Fonts/Georgia.ttf"),
            Path("/Library/Fonts/Georgia Bold.ttf"),
        ),
    )
    for group in candidates:
        if all(path.exists() for path in group):
            return group
    raise FileNotFoundError(
        "Arial/Georgia fonts were not found. Install a licensed font with Latin Extended coverage, "
        "then add its platform path to locate_fonts()."
    )


def make_styles():
    regular, bold, serif, serif_bold = locate_fonts()
    pdfmetrics.registerFont(TTFont("PaperBody", str(regular)))
    pdfmetrics.registerFont(TTFont("PaperBodyBold", str(bold)))
    pdfmetrics.registerFont(TTFont("PaperHeading", str(serif)))
    pdfmetrics.registerFont(TTFont("PaperHeadingBold", str(serif_bold)))
    pdfmetrics.registerFontFamily(
        "PaperBody", normal="PaperBody", bold="PaperBodyBold", italic="PaperBody", boldItalic="PaperBodyBold"
    )
    base = getSampleStyleSheet()
    styles = {
        "body": ParagraphStyle(
            "PaperBodyStyle", parent=base["BodyText"], fontName="PaperBody", fontSize=9.4,
            leading=14.2, textColor=INK, spaceAfter=8, alignment=TA_LEFT, splitLongWords=1,
        ),
        "section": ParagraphStyle(
            "PaperSection", parent=base["Heading1"], fontName="PaperHeadingBold", fontSize=15,
            leading=19, textColor=FOREST, spaceBefore=15, spaceAfter=8, keepWithNext=True,
        ),
        "subsection": ParagraphStyle(
            "PaperSubsection", parent=base["Heading2"], fontName="PaperHeadingBold", fontSize=11,
            leading=14, textColor=GREEN, spaceBefore=9, spaceAfter=5, keepWithNext=True,
        ),
        "bullet": ParagraphStyle(
            "PaperBullet", parent=base["BodyText"], fontName="PaperBody", fontSize=9.2,
            leading=13.3, textColor=INK, leftIndent=14, firstLineIndent=-9, spaceAfter=4,
        ),
        "coverTitle": ParagraphStyle(
            "PaperCoverTitle", fontName="PaperHeadingBold", fontSize=25, leading=31,
            textColor=FOREST, alignment=TA_CENTER, spaceAfter=13,
        ),
        "coverSubtitle": ParagraphStyle(
            "PaperCoverSubtitle", fontName="PaperHeading", fontSize=15, leading=21,
            textColor=GREEN, alignment=TA_CENTER, spaceAfter=21,
        ),
        "eyebrow": ParagraphStyle(
            "PaperEyebrow", fontName="PaperBodyBold", fontSize=9, leading=12,
            textColor=GOLD, alignment=TA_CENTER, tracking=1.1, spaceAfter=13,
        ),
        "coverMeta": ParagraphStyle(
            "PaperCoverMeta", fontName="PaperBody", fontSize=10, leading=16,
            textColor=INK, alignment=TA_LEFT,
        ),
        "status": ParagraphStyle(
            "PaperStatus", fontName="PaperBody", fontSize=9, leading=13,
            textColor=MUTED, alignment=TA_CENTER,
        ),
        "toc": ParagraphStyle(
            "PaperToc", fontName="PaperBody", fontSize=9.5, leading=13,
            textColor=INK, leftIndent=12, firstLineIndent=0, spaceAfter=2,
        ),
        "references": ParagraphStyle(
            "PaperReferences", fontName="PaperBody", fontSize=8.6, leading=12,
            textColor=INK, leftIndent=15, firstLineIndent=-15, spaceAfter=7, splitLongWords=1,
        ),
    }
    return styles


class PaperDocument(BaseDocTemplate):
    def __init__(self, filename: Path, title: str, short_title: str):
        super().__init__(
            str(filename), pagesize=A4,
            leftMargin=0.78 * inch, rightMargin=0.78 * inch,
            topMargin=0.78 * inch, bottomMargin=0.72 * inch,
            title=title, author="College Research Initiative in Indian Knowledge Systems (IKS)",
            subject="Working research proposal",
        )
        frame = Frame(
            self.leftMargin, self.bottomMargin, self.width, self.height,
            id="paper-frame", leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0,
        )
        self.addPageTemplates(
            [PageTemplate(id="paper", frames=frame, onPage=lambda canvas, doc: self.draw_page(canvas, doc, short_title))]
        )

    @staticmethod
    def draw_page(canvas, doc, short_title: str):
        if doc.page == 1:
            return
        canvas.saveState()
        width, height = A4
        canvas.setStrokeColor(colors.HexColor("#D9D1C2"))
        canvas.setLineWidth(0.55)
        canvas.line(doc.leftMargin, height - 0.56 * inch, width - doc.rightMargin, height - 0.56 * inch)
        canvas.setFont("PaperBody", 7.5)
        canvas.setFillColor(MUTED)
        canvas.drawString(doc.leftMargin, height - 0.45 * inch, "THE PANINI PARSER  ·  RESEARCH DESIGN")
        canvas.drawRightString(width - doc.rightMargin, height - 0.45 * inch, short_title)
        canvas.line(doc.leftMargin, 0.52 * inch, width - doc.rightMargin, 0.52 * inch)
        canvas.setFont("PaperBody", 8)
        canvas.drawString(doc.leftMargin, 0.34 * inch, "Working proposal · not peer-reviewed")
        canvas.drawRightString(width - doc.rightMargin, 0.34 * inch, str(doc.page - 1))
        canvas.restoreState()

    def afterFlowable(self, flowable: Flowable):
        if isinstance(flowable, Paragraph) and flowable.style.name == "PaperSection":
            title = flowable.getPlainText()
            anchor = getattr(flowable, "toc_anchor", slugify(title))
            self.canv.bookmarkPage(anchor)
            self.canv.addOutlineEntry(title, anchor, 0, False)
            self.notify("TOCEntry", (0, title, self.page, anchor))


def parse_pdf_story(paper: Paper, styles):
    story: list[Flowable] = [
        Spacer(1, 0.72 * inch),
        Paragraph("THE PANINI PARSER  ·  RESEARCH DESIGN SERIES", styles["eyebrow"]),
        HRFlowable(width="28%", thickness=2, color=GOLD, hAlign="CENTER", spaceBefore=2, spaceAfter=24),
        Paragraph(inline_html(paper.title), styles["coverTitle"]),
        Paragraph(inline_html(paper.subtitle), styles["coverSubtitle"]),
    ]
    gap_line = next((line for line in paper.metadata if "GAP-" in line), "")
    story.append(
        Table(
            [[Paragraph(inline_html(gap_line), styles["coverMeta"])]],
            colWidths=[4.6 * inch],
            style=TableStyle([
                ("BACKGROUND", (0, 0), (-1, -1), PALE_GOLD),
                ("BOX", (0, 0), (-1, -1), 0.8, GOLD),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 9),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ]),
            hAlign="CENTER",
        )
    )
    story.append(Spacer(1, 0.42 * inch))
    metadata_lines = [line for line in paper.metadata if line != gap_line]
    metadata_rows = [[Paragraph(inline_html(line), styles["coverMeta"])] for line in metadata_lines]
    story.append(
        Table(
            metadata_rows, colWidths=[5.7 * inch], hAlign="CENTER",
            style=TableStyle([
                ("BACKGROUND", (0, 0), (-1, -1), PALE_GREEN),
                ("BOX", (0, 0), (-1, -1), 0.6, colors.HexColor("#C4D1C5")),
                ("LEFTPADDING", (0, 0), (-1, -1), 13),
                ("RIGHTPADDING", (0, 0), (-1, -1), 13),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]),
        )
    )
    story.extend([
        Spacer(1, 0.35 * inch),
        HRFlowable(width="100%", thickness=0.7, color=colors.HexColor("#D9D1C2"), spaceAfter=11),
        Paragraph(
            "This document is a proposed research design. Planned work, hypotheses, and expected contributions "
            "are not completed findings, peer-reviewed claims, or institutional approval.",
            styles["status"],
        ),
        PageBreak(),
        Paragraph("Contents", styles["section"]),
    ])
    toc = TableOfContents()
    toc.levelStyles = [styles["toc"]]
    story.extend([toc, PageBreak()])

    for section_title, lines in paper.sections:
        anchor = slugify(section_title)
        section_paragraph = Paragraph(inline_html(section_title), styles["section"])
        section_paragraph.toc_anchor = anchor
        story.append(section_paragraph)
        blocks = list(iter_blocks(lines))
        for kind, value in blocks:
            if kind == "paragraph":
                style = styles["references"] if section_title == "References" else styles["body"]
                story.append(Paragraph(inline_html(value), style))
            elif kind in ("bullet", "numbered"):
                for index, item in enumerate(value, start=1):
                    marker = "•" if kind == "bullet" else f"{index}."
                    story.append(Paragraph(f"{marker} {inline_html(item)}", styles["bullet"]))
            else:
                depth, heading = value
                story.append(Paragraph(inline_html(heading), styles["subsection"]))
    return story


def build_paper(stem: str) -> None:
    source = DOWNLOADS / f"{stem}.md"
    paper = parse_paper(source)
    styles = make_styles()
    pdf_path = DOWNLOADS / f"{stem}.pdf"
    html_path = DOWNLOADS / f"{stem}.html"
    doc = PaperDocument(pdf_path, paper.title, stem.replace("Research_Proposal_", ""))
    doc.multiBuild(parse_pdf_story(paper, styles))
    html_path.write_text(make_html(paper, pdf_path.name), encoding="utf-8")
    pdf_bytes = pdf_path.read_bytes()
    if not pdf_bytes.startswith(b"%PDF-") or b"%%EOF" not in pdf_bytes[-1024:]:
        raise RuntimeError(f"Generated PDF failed its file-integrity check: {pdf_path}")
    print(f"Generated {pdf_path.relative_to(ROOT)} ({len(pdf_bytes):,} bytes)")
    print(f"Generated {html_path.relative_to(ROOT)}")


def main() -> int:
    try:
        for stem in PAPERS:
            build_paper(stem)
    except Exception as error:
        print(f"Research paper generation failed: {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
