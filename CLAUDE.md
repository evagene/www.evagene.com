# CLAUDE.md — Evagene marketing site

This file is loaded into every conversation. Keep it tight; update when the workflow changes.

---

## What this repo is

Static HTML marketing site for **Evagene** — a clinical-grade pedigree management platform. Deployed to `evagene.com` (GitHub Pages via the `CNAME` file). ~125 pages. No build step; Tailwind via CDN.

Authoritative product docs live in a sibling repo at `../evagene/docs/` — particularly:
- `docs/guides/risk_models.md` — every risk calculator, parameters, examples, citations
- `docs/guides/diseases_catalogue.md` and `docs/guides/diseases/*.md` — disease data
- `docs/architecture.md` — module-level overview

**Always verify feature claims against `../evagene` before writing them into marketing copy.**

---

## Tone, style, and brand rules

- **"Evagene"** — capitalised as one word, never "EvAgene" or "EvaGene". Correct everywhere including meta descriptions.
- **Factual, clinician-facing, not hyperbolic.** No unqualified superlatives ("the best", "revolutionary"). Specific, verifiable claims only.
- **Never claim** FDA clearance, regulatory approval, or equivalence to validated clinical binaries unless the product actually has that status.
- **Never claim** Evagene "replaces" the clinical geneticist — the product augments clinicians.
- **No emojis** in copy or code unless the user explicitly asks.
- **Exclusions** — these two caveats must appear wherever the feature is mentioned:
  - **Tyrer-Cuzick** is an *IBIS-style approximation* of the published Tyrer / Duffy / Cuzick 2004 algorithm. Not the official IBIS Breast Cancer Risk Evaluator binary (whose full coefficients are not public). Label every mention.
  - **BOADICEA is not bundled.** Licensed by the University of Cambridge. Evagene exports a `##CanRisk 2.0` pedigree file that the clinician uploads at canrisk.org. Say this every time BOADICEA is mentioned.

---

## Rounded-numbers rule

Any `[number]+` claim must be a round number. "19+" reads as 20 — use `20` or `20+` instead. Round hundreds (200+, 220+) and round fives at the tens place (50+, 55+) are acceptable. Awkward numbers (19+, 23+, 14+) are not.

Canonical counts (keep consistent across every page, llms.txt, llms-full.txt, sitemap-related metadata):

| Claim | Current value | Source |
|---|---|---|
| Risk models + CanRisk bridge | **20** (exact) + CanRisk bridge | 7 single-gene-adjacent + 1 polygenic engine + 3 BayesMendel + 9 family-history scoring |
| Disease catalogue | **200+** | `ls ../evagene/docs/guides/diseases/*.md \| wc -l` currently returns 207 |
| Complex / polygenic / oligogenic conditions | **20+** | Subset with empirical recurrence tables (22 confirmed + major depression = 23) |
| Built-in guides | **200+** | Disease + role + topic guides |
| Allergies | **50+** · Traits: **50+** | Catalogues in app |
| Research-paper citations | **4** · Institutions: **10+** | `research-citations.html` |

Update this table when any count changes materially.

---

## Required elements on every new page

Copy from an existing recent page (`research-citations.html`, `for-reproductive-medicine.html`, or any `release-*.html`) rather than authoring from scratch. Required:

1. **`<title>`**, **`<meta name="description">`**, **`<meta name="keywords">`** — specific, keyword-rich, under 160 chars for description.
2. **Open Graph** tags (`og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `og:site_name`, `og:locale=en_GB`).
3. **Twitter Card** tags (`twitter:card=summary_large_image`, title, description, image).
4. **`<link rel="canonical">`** pointing at the clean URL (no `.html` in the canonical).
5. **Favicon** reference.
6. **Tailwind CDN + config** — match existing brand colour palette and Inter font.
7. **JSON-LD** — at minimum an `Article`/`CollectionPage`/`TechArticle` and a `BreadcrumbList`. FAQ pages also need `FAQPage`.
8. **Cookie consent banner + opt-in analytics loader** — identical pattern across the site. Google Analytics, Microsoft Clarity, and EngageBay fire only after consent. Copy the `cookie-banner` div and the IIFE at the bottom of `for-reproductive-medicine.html` verbatim.
9. **Footer** with the standard four columns (logo, Product, Learn More / Inheritance, Legal).
10. **Breadcrumb `<nav>`** under the fixed top nav.
11. **Alpha CTA section** before the footer.

No page should ship without (8), (9), (10).

---

## When you ship a new page, update these six places

1. **`sitemap.xml`** — add a `<url>` entry with appropriate `lastmod`, `changefreq`, `priority` (0.6–0.9 depending on importance).
2. **`llms.txt`** — add to the relevant section (Topic Guides, Persona Pages, Inheritance-Model Landing Pages, Release Notes, etc.).
3. **`llms-full.txt`** — only if the page introduces a new capability that belongs in the full LLM index.
4. **Cross-links** — at minimum from one existing pillar page (hereditary-cancer-risk-assessment, mendelian-inheritance-calculator, or the decision matrix on for-clinical-geneticists).
5. **Footer links on related pages** — if the page is in a group (e.g. the four inheritance landing pages link to each other via their footers).
6. **`changelog.html`** — add an entry if the page represents a user-facing release.

---

## robots.txt

Located at `/robots.txt`. Allows all search engines and AI crawlers by design. When a major AI crawler appears, add it to the allowlist (current: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchTool, anthropic-ai, PerplexityBot, GoogleOther, Google-Extended, Applebot-Extended, cohere-ai, Meta-ExternalAgent, Amazonbot, CCBot, Ai2Bot, and many others).

The only `Disallow:` is `/terms`. Do not add more without a clear reason.

Sitemap reference at the bottom must point at `https://evagene.com/sitemap.xml`.

---

## sitemap.xml

Organised by section with HTML-style comments as dividers. Keep sections in order:
- Homepage
- Pillar landing pages (priority 0.9)
- Compare and Alternatives hubs (0.8)
- Direct competitor vs-Evagene pages (0.7–0.8)
- Specialised comparison pages
- Germline mosaicism + flagship clinical pages
- Cross-competitor pages
- Alternatives-to pages
- Cancer risk calculators
- Mendelian / inheritance calculator hubs
- Pedigree drawing / notation / tutorial
- Platform / integration
- Genealogy / consumer
- Specialised clinical
- Best-of roundups
- Persona pages
- Country-specific
- Authority & trust (research-citations, changelog)
- Risk-engine expansion releases
- Inheritance-model landing pages
- Legal
- LLMs metadata

`lastmod` dates should be honest (the date the page actually changed). Bulk-updating all `lastmod` to today is a red flag to crawlers and a waste.

---

## llms.txt and llms-full.txt

- **`llms.txt`** — concise index for LLM consumption. One-liner per section entry. Update when a new page, persona, or capability ships.
- **`llms-full.txt`** — complete prose description of the product. Update when a major capability changes (e.g. a new risk model family). Keep the headings stable so diffs are reviewable.

Both files are referenced from `sitemap.xml`.

When adding a new model or feature:
- Add a bullet to the "Core Features" section of `llms.txt`.
- Rewrite the relevant paragraph in `llms-full.txt` — don't append; integrate.
- If the capability has its own landing page, cross-link from the right section in `llms.txt`.

---

## Competitor / comparison pages

Honest comparative advertising is protected in the UK under **Trade Marks Act 1994 s.10(6)** and the **Business Protection from Misleading Marketing Regulations 2008**. Misleading claims are not. Stay on the legal side.

### Ground rules

1. **Every claim about a competitor must be sourced from their public product pages or documentation.** Don't invent pricing, customer counts, or feature claims. If a claim is second-hand, mark it so.
2. **Date the comparison.** State "as of [Month Year]" on every page. The competitor's current pages supersede our article.
3. **Where the competitor is stronger, say so.** Readers (and judges) punish asymmetric hit pieces. This also builds trust with evaluators who have already seen the competitor.
4. **Feature matrices must be symmetric.** Same rows, same cell types. If a row has a tick for one product and a dash for the other, that is a real finding — don't hide rows that go the wrong way.
5. **"—" (dash) means "not publicly documented", not "absent".** Enterprise products often keep capabilities behind sales. State this near every matrix.
6. **Include a plain-English short version ("Short version." paragraph)** before the matrix. Decision-makers read that and skip the grid.

### Review cadence

- **Quarterly**: spot-check each `*-vs-evagene.html` page against the competitor's current public site. Update the "as of [Month Year]" date and any changed claims.
- **Whenever Evagene ships a feature that affects a comparison row**: update every vs-X page that mentions that row. Check `canrisk-vs-evagene.html`, `famgenix-vs-evagene.html`, `phenotips-vs-evagene.html`, `progeny-vs-evagene.html`, `trakgene-vs-evagene.html` as a minimum set.
- **Whenever a competitor announces a new feature that affects us** (e.g. Phenotips ships AI interpretation): update the matrix, update the FAQ answers, update the "Short version."

### Files to audit in this sweep

Direct clinical competitors: `phenotips-vs-evagene.html`, `progeny-vs-evagene.html`, `trakgene-vs-evagene.html`, `famgenix-vs-evagene.html`, `canrisk-vs-evagene.html`, `pedigreetool-vs-evagene.html`, `quickped-vs-evagene.html`, `genopro-vs-evagene.html`, `progeny-cloud-vs-evagene.html`, `f-tree-vs-evagene.html`, `conceptviz-vs-evagene.html`, `genodraw-vs-evagene.html`, `perseus-vs-evagene.html`.

Generic diagram tools: `smartdraw-pedigree-vs-evagene.html`, `creately-pedigree-vs-evagene.html`, `visual-paradigm-pedigree-vs-evagene.html`, `edraw-pedigree-vs-evagene.html`, `cloudairy-vs-evagene.html`.

Cross-competitor: `phenotips-vs-progeny.html`, `trakgene-vs-phenotips.html`, `famgenix-vs-phenotips.html`, `famgenix-vs-progeny.html`, `boadicea-vs-brcapro.html`.

"Alternatives-to" pages: `alternatives-to-*.html` (8 pages). These should name three or four genuine competitors *including Evagene*, not redirect all traffic to Evagene.

---

## When Evagene ships a new feature / release

Per-release checklist:

1. **Write a release page** — `release-YYYY-MM-DD-short-slug.html`. Cite canonical papers where applicable. Explicit boundaries section ("What Evagene does not claim").
2. **Add to `changelog.html`** — most-recent entry first.
3. **Update the homepage** — `index.html` risk-analysis section, features cards, meta descriptions, OG/Twitter cards, JSON-LD `featureList`, and any stale FAQ answers.
4. **Update `llms.txt`** — Core Features bullets + Release Notes section.
5. **Update `llms-full.txt`** — rewrite (don't append) the relevant section.
6. **Update `sitemap.xml`** — register the release page + any new landing pages.
7. **Update the pillar pages** — `hereditary-cancer-risk-assessment.html`, `mendelian-inheritance-calculator.html` — if the feature touches their scope.
8. **Update the decision matrix** at `for-clinical-geneticists.html#decision-matrix` — if the feature is a new risk model or indication.
9. **Sweep persona pages** — add a "What's new · [Month Year]" callout before the FAQ on the relevant `for-*.html` pages. Keep each callout 3 bullets max with outbound links.
10. **Sweep competitor pages** — per the review cadence above.
11. **Update canonical counts** in the table at the top of this file if any changed.

---

## Cookie consent + analytics — strict opt-in

The banner pattern is identical across every page. Never inline Google Analytics / Clarity / EngageBay into `<head>` — the existing IIFE at the bottom of each page ensures nothing fires until the user clicks Accept. If you edit a page and remove this IIFE you will be tracking users without consent. Don't.

Consent state is stored in `localStorage` under the key `evagene-cookie-consent` with value `'accepted'` or `'rejected'`. `loadAnalytics()` is called only when state is `'accepted'`.

---

## Content voice — quick reminders

- **Clinicians read the first paragraph; decision-makers read the first sentence.** Lead with the concrete clinical or technical point, not a marketing hook.
- **Name the models**, cite the papers. Claus 1994, Couch 1997, Frank 2002, Evans 2004, Vasen 1999, Umar 2004, Gail 1989, Tyrer/Duffy/Cuzick 2004, NICE CG164/NG101, Carter 1961, Falconer 1965. These names carry weight; don't paraphrase.
- **Use "BayesMendel"** for BRCAPRO/MMRpro/PancPRO — the statistical heritage is part of the claim.
- **British English** throughout (counselling, paediatrics, favour, behaviour, organisation). Exception: direct quotes from sources that use American English.
- **Proper caveats inline**, not in a footnote. Tyrer-Cuzick approximation label belongs next to the model name, not at the bottom of the page.

---

## Don't

- Don't bulk-update `lastmod` dates without a real change.
- Don't add new `Disallow:` rules to `robots.txt` without a specific reason.
- Don't use emojis.
- Don't claim regulatory approval.
- Don't invent numbers for competitors.
- Don't use awkward "X+" figures — round or exact only.
- Don't commit unless the user has explicitly asked.
- Don't force-push, amend published commits, or skip commit hooks.
- Don't delete the cookie-banner IIFE from any page.
