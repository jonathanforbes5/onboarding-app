# Brand Guidelines — ContractorsIgnite / RoofIgnite

Reference: https://roofignite.com | Creative Mastery: Ad Set 101 (PDF)

---

## Color System

**Primary palette: Yellow + Black + White ONLY.**  
No red. No purple. No blue. No teal. No other accent colors.

| Token | Hex | Usage |
|-------|-----|-------|
| `--acc` | `#F5C800` | Primary accent. Borders, highlights, active states, progress, CTAs. |
| `--acc2` | `#E8B800` | Hover state of accent. |
| `--acc-pale` | `rgba(245,200,0,0.10)` | Subtle yellow tint backgrounds (callout cards, active items). |
| `--acc-border` | `rgba(245,200,0,0.30)` | Yellow border on cards/inputs. |
| `--bg` | `#0A0A0A` | App background. Near-black, not pure black. |
| `--surf` | `#141414` | Card surface. |
| `--surf2` | `#1C1C1C` | Elevated card / hover state surface. |
| `--surf3` | `#242424` | Input backgrounds, deeply nested elements. |
| `--border` | `#2A2A2A` | Default border. |
| `--border2` | `#383838` | Emphasis border. |
| `--text` | `#F5F5F5` | Primary text. |
| `--text2` | `#999999` | Secondary / muted text. |
| `--text3` | `#666666` | Placeholder / disabled text. |
| `--green` | `#1A8A4A` | Success states, health green. |
| `--green-pale` | `rgba(26,138,74,0.12)` | Green card backgrounds. |
| `--yellow-pale` | `rgba(245,200,0,0.10)` | Same as acc-pale (semantic alias). |

**Critical rule:** When using `--acc` (`#F5C800`) as a **background color**, text on top MUST be dark (`#0A0A0A`). Yellow is a light color. White text on yellow fails accessibility and looks wrong.

```css
/* Correct */
.btn-primary { background: var(--acc); color: #0A0A0A; }
.tab-active   { background: var(--acc); color: #0A0A0A; }

/* Wrong */
.btn-primary { background: var(--acc); color: #fff; }
```

---

## Typography

### Font Stack
```css
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Barlow+Condensed:wght@700;800;900&display=swap');
```

### Font Usage

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Impact Display | Barlow Condensed | 900 | Slide titles, hero section headers, section labels |
| Strong Display | Barlow Condensed | 800 | Card titles, day headers, quiz section titles |
| Functional Display | Barlow Condensed | 700 | Eyebrow labels, uppercase callouts |
| UI Headers | Syne | 800 | App navigation, tab labels, feature names |
| Body | DM Sans | 400 | All body copy, checklist items |
| Body Strong | DM Sans | 600 | Emphasis in body, labels |
| Caption | DM Sans | 300 | Fine print, timestamps, secondary metadata |

### Type Scale (base 4px grid, 16px base)
```css
--text-xs:   11px;   /* Eyebrows, meta labels */
--text-sm:   13px;   /* Secondary body, captions */
--text-base: 15px;   /* Primary body */
--text-lg:   17px;   /* Large body, lead paragraphs */
--text-xl:   20px;   /* Small headers */
--text-2xl:  26px;   /* Section headers (DM Sans / Syne) */
--text-3xl:  34px;   /* Impact headers (Barlow Condensed) */
--text-4xl:  44px;   /* Hero headers (Barlow Condensed) */
--text-5xl:  58px;   /* Slide section titles (Barlow Condensed) */
--text-6xl:  72px;   /* Cover slide main title (Barlow Condensed) */
```

---

## Logo

**Primary Logo (light on dark):**
```
https://cdn.prod.website-files.com/688dfce195a98c50607b16ab/6896b5e75baf4cd978e8f1bf_Primary%20Logo.png
```

On dark backgrounds, use the logo with `filter: brightness(0) invert(1)` if needed to make it white.

**Do NOT:**
- Stretch or distort the logo
- Place the logo on a yellow background without a white or black version
- Add drop shadows or effects to the logo

---

## Spacing System (4px base grid)

```css
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
```

---

## Component Patterns

### Cards
```css
.card {
  background: var(--surf);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 24px;
}
.card:hover { border-color: var(--border2); }
.card-accent { border-left: 3px solid var(--acc); }
```

### Buttons
```css
/* Primary: yellow bg, dark text */
.btn-primary { background: var(--acc); color: #0A0A0A; padding: 10px 20px; border-radius: 7px; font-weight: 700; }

/* Secondary: surface bg, light text, yellow border on hover */
.btn-secondary { background: var(--surf2); color: var(--text); border: 1px solid var(--border2); }
.btn-secondary:hover { border-color: var(--acc); }

/* Ghost: transparent, yellow text */
.btn-ghost { background: transparent; color: var(--acc); border: 1px solid var(--acc-border); }
```

### Status Badges
```css
.badge-success { background: var(--green-pale); color: var(--green); border: 1px solid var(--green-border); }
.badge-warning { background: var(--yellow-pale); color: var(--acc2); }
.badge-accent  { background: var(--acc-pale); color: var(--acc); border: 1px solid var(--acc-border); }
```

### Health Colors (Account Status)
```css
.health-green  { color: #22A85A; }
.health-yellow { color: #F5C800; }  /* Use brand yellow */
.health-orange { color: #E07B00; }
.health-red    { color: #E03030; }  /* Red is ONLY for health indicators, not brand */
```

Note: Red (`#E03030`) is only permitted for health status indicators (account status, warnings). Never as a brand/UI accent color.

---

## Design Tone

**Keywords:** Direct. Capable. Industrial. Professional. No-nonsense.

**Anti-patterns:**
- Overly rounded corners (keep radius 6–12px, not 20px+)
- Pastel colors or gradients (dark + yellow only)
- Heavy animations or transitions (keep motion subtle and purposeful)
- Emoji overuse (1 per section header max, functional not decorative)
- Cards with heavy drop shadows (use border not shadow)
- Marketing language in UI copy (write like an operator, not a marketer)

**Reference:** The Creative Mastery: Ad Set 101 PDF shows the brand aesthetic in slide form. Study the yellow-on-dark and dark-on-yellow pattern, the bold Barlow Condensed headers, the minimal use of color.

---

## Presentation Slide Aesthetic

Slides should feel like a premium internal deck, not a PowerPoint template:

- **Cover slides:** Dark bg with yellow accent bar at bottom, large Barlow Condensed title (left-aligned, not centered), yellow eyebrow label, logo top-left
- **Section slides:** Centered, ultra-bold section title, yellow top-bar accent, subtle section number label
- **Content slides:** Yellow slide-number label + Barlow Condensed title in a header row, clean body in DM Sans, yellow left-border accent
- **Statement slides:** Large centered quote text in Barlow Condensed, decorative oversized yellow quotation mark (low opacity)
- **Closing slides:** Yellow top and bottom border bars, centered logo, bold title
