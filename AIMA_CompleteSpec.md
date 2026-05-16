# AIMA COMPLETE BUILD SPEC
# Ai Management Academy — aimanagementacademy.com
# Version: Final | Claude Code Execution Document

---

# SECTION 1: PROJECT OVERVIEW

Build a complete static website for Ai Management Academy (AiMA).
Brand face: AiMy — AI CEO and Founder (she/they).
Stack: Pure HTML + CSS + Vanilla JS. No frameworks. No build tools. No npm.
Hosting: GitHub Pages. All files must be static.
Priority: Mobile-first. Desktop inherits.
All placeholder links: career/entrepreneur CTAs → "#join" | newsletter → "#newsletter" | social → "#"
Google Analytics: placeholder GA4 tag in <head> of all pages.
GDPR: minimal dismissible cookie banner on all pages.

---

# SECTION 2: FILE STRUCTURE

```
/
├── index.html
├── career.html
├── entrepreneur.html
├── about.html
├── privacy.html
├── terms.html
├── css/
│   ├── main.css          (variables, reset, global, typography)
│   ├── components.css    (nav, buttons, cards, footer, accordion)
│   └── responsive.css    (all breakpoint overrides)
├── js/
│   └── main.js           (scroll reveal, nav hamburger, accordion, cookie banner)
└── assets/
    ├── logo/
    │   ├── aima-logo-light.svg
    │   ├── aima-logo-dark.svg
    │   └── favicon.ico
    ├── aimy/
    │   └── aimy-avatar.svg
    └── og/
        ├── og-home.jpg        (1200x630)
        ├── og-career.jpg      (1200x630)
        └── og-entrepreneur.jpg (1200x630)
```

---

# SECTION 3: DESIGN SYSTEM

## Colors
```css
:root {
  --career-primary:        #1B2A4A;
  --career-secondary:      #E85D26;
  --entrepreneur-primary:  #E85D26;
  --entrepreneur-secondary:#1B2A4A;
  --white:                 #FFFFFF;
  --off-white:             #F7F5F2;
  --dark:                  #0E1520;
  --mid-gray:              #8A8F9A;
  --light-gray:            #E8E8E8;

  --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px;
  --space-5:24px; --space-6:32px; --space-7:48px; --space-8:64px;
  --space-9:96px;

  --radius-sm: 4px;
  --radius-md: 8px;
  --shadow-card: 0 4px 24px rgba(0,0,0,0.08);
  --transition: all 0.2s ease;
}
```

## Typography
```
Google Fonts imports (all pages):
  Bebas Neue: weight 400
  DM Sans: weights 300,400,500,600,700
  Space Mono: weights 400,700

Usage:
  var(--font-display): 'Bebas Neue', sans-serif → H1, H2, large display
  var(--font-body):    'DM Sans', sans-serif    → body, nav, buttons, H3, H4
  var(--font-mono):    'Space Mono', monospace  → track labels, small tags only

Type scale (mobile → desktop):
  xs:12px  sm:14px  base:16px  lg:18px  xl:20px
  2xl:24px 3xl:32px 4xl:44px→64px 5xl:56px→80px
```

## Buttons
```css
.btn {
  font: 600 16px/1 var(--font-body);
  padding: 14px 28px;
  border-radius: var(--radius-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: var(--transition);
  display: inline-block;
  text-decoration: none;
  border: none;
}
.btn-career       { background:var(--career-secondary); color:var(--white); }
.btn-career:hover { background:#C94D1E; transform:translateY(-2px); }
.btn-entrepreneur       { background:var(--entrepreneur-secondary); color:var(--white); }
.btn-entrepreneur:hover { background:#12203A; transform:translateY(-2px); }
.btn-ghost  { background:transparent; border:2px solid currentColor; }
.btn-white  { background:var(--white); color:var(--entrepreneur-primary); }
.btn-sm     { padding:10px 20px; font-size:14px; }
.btn-lg     { padding:18px 36px; font-size:18px; }
.btn-full   { width:100%; text-align:center; }
```

## Cards
```css
.card {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: 32px;
  box-shadow: var(--shadow-card);
  border-top: 4px solid var(--career-primary);
}
.card-entrepreneur { border-top-color: var(--entrepreneur-primary); }
.card-dark { background: var(--career-primary); color: var(--white); }
.card-orange { background: var(--entrepreneur-primary); color: var(--white); }
```

## Scroll Reveal
```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.reveal.visible { opacity:1; transform:translateY(0); }
```
```js
// main.js
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.15 }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

## Hero Diagonal Split
```css
.hero-wrapper {
  position: relative;
  height: 100vh;
  display: flex;
  overflow: hidden;
}
.hero-career {
  flex: 0 0 55%;
  clip-path: polygon(0 0, 100% 0, 80% 100%, 0 100%);
  background: var(--career-primary);
  position: relative;
  z-index: 1;
}
.hero-entrepreneur {
  flex: 0 0 55%;
  margin-left: -10%;
  background: var(--entrepreneur-primary);
}
/* Mobile override */
@media (max-width: 767px) {
  .hero-wrapper { flex-direction: column; height: auto; }
  .hero-career, .hero-entrepreneur {
    flex: none; width: 100%; height: 50vh;
    clip-path: none; margin-left: 0;
  }
}
```

## Noise Texture Overlay (both hero panels)
```css
.hero-career::after, .hero-entrepreneur::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.04;
  pointer-events: none;
}
```

## Hero Animation Sequence
```css
.hero-career-content > * { opacity:0; transform:translateY(20px); }
.hero-career-content .hero-label  { animation: heroFadeUp 0.5s ease 0.2s forwards; }
.hero-career-content h1           { animation: heroFadeUp 0.5s ease 0.4s forwards; }
.hero-career-content p            { animation: heroFadeUp 0.5s ease 0.6s forwards; }
.hero-career-content .btn         { animation: heroFadeUp 0.5s ease 0.8s forwards; }
.hero-entrepreneur-content .hero-label { animation: heroFadeUp 0.5s ease 0.3s forwards; }
.hero-entrepreneur-content h1          { animation: heroFadeUp 0.5s ease 0.5s forwards; }
.hero-entrepreneur-content p           { animation: heroFadeUp 0.5s ease 0.7s forwards; }
.hero-entrepreneur-content .btn        { animation: heroFadeUp 0.5s ease 0.9s forwards; }
.hero-center-badge { opacity:0; animation: heroFadeUp 0.5s ease 1.1s forwards; }

@keyframes heroFadeUp {
  to { opacity:1; transform:translateY(0); }
}
```

## AiMy Avatar SVG Spec
```
File: /assets/aimy/aimy-avatar.svg
Concept: Geometric hexagonal intelligence mark
Elements:
  - Outer hexagon: stroke var(--career-primary) #1B2A4A, fill none, strokeWidth 2
  - Mid hexagon: fill var(--career-primary) #1B2A4A, rotated 30deg
  - Inner hexagon: fill var(--career-secondary) #E85D26, rotated 0deg
  - Center circle: fill var(--white) #FFFFFF, radius ~8% of total
  - Optional: 3 thin lines radiating from center suggesting signal/thought
Scalable: must render clearly at 32px and 160px
Works on: dark backgrounds (light version) and light backgrounds (dark version)
Export: two versions — aimy-avatar-dark.svg (navy base) and aimy-avatar-light.svg (white base)
```

## Logo SVG Spec
```
File: aima-logo-light.svg (white text, for dark backgrounds)
      aima-logo-dark.svg (dark text, for light backgrounds)
Elements:
  - AiMy avatar mark (hexagon, 32px height)
  - Wordmark: "AiMA" in Bebas Neue, letter-spacing 0.1em
  - Subtext optional: "AI Management Academy" DM Sans 400 10px
Layout: horizontal (mark + wordmark side by side)
```

---

# SECTION 4: GLOBAL COMPONENTS

## Navigation (all pages)
```
height: 64px mobile / 72px desktop
background: var(--dark)
position: sticky; top:0; z-index:100;
padding: 0 24px mobile / 0 48px desktop

Left: aima-logo-light.svg, height 36px, links to index.html

Right (desktop): 
  links: Career Track→career.html | Entrepreneur Track→entrepreneur.html | About AiMy→about.html | Community→#join
  font: DM Sans 500 14px, color:var(--off-white)
  hover: color:var(--career-secondary)
  active page link: color:var(--career-secondary)
  + .btn.btn-career.btn-sm "Join Now" → #join

Right (mobile):
  hamburger icon (Lucide Menu 24px, var(--white))
  tap → fullscreen overlay: background var(--dark), z-index:200
  links stacked center, DM Sans 600 28px, var(--white)
  + .btn.btn-career "Join Now" → #join
  close: Lucide X 28px top-right
```

## Footer (all pages)
```
background: var(--dark)
padding: 64px 40px 32px mobile: 48px 24px 24px

Row 1: aima-logo-light.svg height:40px + tagline "Work With AI. Win On Your Terms." DM Sans 400 16px var(--mid-gray)
Row 2: links Career Track | Entrepreneur Track | About AiMy | Community | Newsletter
  DM Sans 400 14px var(--mid-gray) hover:var(--white) gap:32px flex-wrap
Row 3: social icons (Lucide) 24px var(--mid-gray) hover:var(--white) gap:20px
  LinkedIn | Youtube | Instagram | Tiktok | Facebook → all "#"
Divider: 1px solid rgba(255,255,255,0.08)
Row 4: "© 2025 Ai Management Academy. Built by AI. Run by humans." | Privacy Policy→privacy.html | Terms of Service→terms.html
  DM Sans 400 12px var(--mid-gray)
```

## Accordion Component (career.html + entrepreneur.html FAQ)
```css
.accordion-item { border-bottom: 1px solid var(--light-gray); }
.accordion-trigger {
  width:100%; text-align:left; padding:20px 0;
  font: 600 18px var(--font-body); cursor:pointer;
  display:flex; justify-content:space-between; align-items:center;
  background:none; border:none;
}
.accordion-trigger::after { content:'↓'; transition:transform 0.3s; }
.accordion-item.open .accordion-trigger::after { transform:rotate(180deg); }
.accordion-body {
  max-height:0; overflow:hidden; transition:max-height 0.35s ease;
  font: 400 16px var(--font-body); color:var(--mid-gray); padding-bottom:0;
}
.accordion-item.open .accordion-body { max-height:200px; padding-bottom:20px; }
```
```js
// main.js
document.querySelectorAll('.accordion-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.parentElement.classList.toggle('open');
  });
});
```

---

# SECTION 5: PAGE BUILDS

## index.html

```html
<!-- HEAD -->
<title>Ai Management Academy — Work With AI. Win On Your Terms.</title>
<meta name="description" content="Upskill for the AI economy. Career Track for professionals. Entrepreneur Track for builders.">
<meta property="og:title" content="Ai Management Academy">
<meta property="og:description" content="Work With AI. Win On Your Terms.">
<meta property="og:image" content="https://aimanagementacademy.com/assets/og/og-home.jpg">
<meta property="og:url" content="https://aimanagementacademy.com">
<meta name="twitter:card" content="summary_large_image">
```

### S1 HERO
```
Full viewport height (100svh)
Diagonal split (see CSS above)

CAREER PANEL (left/top):
  background: var(--career-primary) + noise overlay
  content centered in left ~45% of panel:
    label: "CAREER TRACK" — font-mono 12px uppercase letter-spacing:0.15em color:var(--career-secondary)
    H1: "Land the Job.\nLead with AI." — font-display 5xl color:var(--white) line-height:0.95
    p: "For professionals who refuse to be replaced." — font-body 400 18px color:rgba(255,255,255,0.75)
    .btn.btn-career "Start Your Career Track →" → career.html

ENTREPRENEUR PANEL (right/bottom):
  background: var(--entrepreneur-primary) + noise overlay
  content centered in right portion:
    label: "ENTREPRENEUR TRACK" — font-mono 12px uppercase letter-spacing:0.15em color:var(--entrepreneur-secondary)
    H1: "Build It.\nOwn It. Scale It." — font-display 5xl color:var(--white) line-height:0.95
    p: "For builders who want income on their terms." — font-body 400 18px color:rgba(255,255,255,0.75)
    .btn.btn-entrepreneur "Start Your Entrepreneur Track →" → entrepreneur.html

CENTER BADGE (desktop only, absolute at diagonal intersection):
  background: var(--dark) border-radius:999px padding:10px 20px
  AiMy avatar SVG inline 24px + "Work With AI. Win On Your Terms." DM Sans 500 13px var(--white)
  box-shadow: 0 0 32px rgba(232,93,38,0.3)
```

### S2 THE PROBLEM
```
background: var(--dark) padding: 96px 40px mobile:64px 24px
.reveal class on section

H2: "AI isn't coming for your job.\nIgnorance is."
font-display 4xl color:var(--white) text-align:center margin-bottom:48px

3 cards, flex-row gap:24px mobile:flex-col:
  Each card: background rgba(255,255,255,0.05) border:1px solid rgba(255,255,255,0.08)
  border-radius:8px padding:32px
  Icon (Lucide): 32px color:var(--career-secondary) margin-bottom:16px
  p: font-body 400 16px color:rgba(255,255,255,0.8)

  Card 1: icon=AlertCircle | "You feel the pressure but don't know where to start"
  Card 2: icon=BookX | "Courses feel too technical or too shallow"
  Card 3: icon=Target | "You want results, not another certificate nobody cares about"
```

### S3 TWO TRACKS
```
background: var(--off-white) padding: 96px 40px mobile:64px 24px
.reveal

H2: "Two Paths. One Academy." font-display 4xl center
p: "Can't choose? You don't have to. Customize your path." font-body 400 18px var(--mid-gray) center margin-bottom:48px

2 columns gap:32px mobile:stacked:

CAREER CARD (.card):
  label: "CAREER TRACK" font-mono 12px var(--career-primary) uppercase letter-spacing:0.15em
  H3: "Get AI-ready for your next role" font-body 700 24px
  ul (Lucide Check 16px var(--career-secondary) inline):
    "AI tools for your specific role"
    "CV and LinkedIn positioning"
    "Interview prep for AI-era hiring"
    "Real projects for your portfolio"
    "Community of career professionals"
  .btn.btn-career "Join Career Track →" → career.html

ENTREPRENEUR CARD (.card.card-entrepreneur):
  label: "ENTREPRENEUR TRACK" font-mono 12px var(--entrepreneur-primary) uppercase letter-spacing:0.15em
  H3: "Build your own revenue streams" font-body 700 24px
  ul (Lucide Check 16px var(--entrepreneur-primary) inline):
    "Etsy and digital product stores"
    "Content creation with AI"
    "Agency setup and client acquisition"
    "AI automation for scale"
    "Community of builders"
  .btn.btn-entrepreneur "Join Entrepreneur Track →" → entrepreneur.html
```

### S4 HOW IT WORKS
```
background: var(--white) padding: 96px 40px mobile:64px 24px
.reveal

H2: "Flipped. Flexible.\nBuilt for real life." font-display 4xl center

4-col grid desktop / vertical stack mobile, gap:32px:
Each step:
  position:relative
  step number: Bebas Neue 96px absolute top:0 left:0 opacity:0.06
    odd: color var(--career-primary) | even: color var(--entrepreneur-primary)
  icon: Lucide 32px margin-bottom:16px
    color: odd var(--career-secondary) | even var(--entrepreneur-primary)
  H4: font-body 700 18px margin-bottom:8px
  p: font-body 400 15px var(--mid-gray)

Step 1: icon=BookOpen | "Study at your pace" | "AI-guided curriculum, on your schedule"
Step 2: icon=Bot | "Ask AiMy anything" | "AI available 24/7, no judgment, real answers"
Step 3: icon=Users | "Humans for hard questions" | "Live community and coaches on Skool"
Step 4: icon=Rocket | "Ship something real" | "Every track ends with a project you own"
```

### S5 MEET AIMY
```
background: var(--career-primary) padding: 96px 40px mobile:64px 24px
.reveal
text-align: center

AiMy avatar SVG: 120px margin:0 auto 32px
  animation: pulse 3s ease-in-out infinite
  @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }

H2: "Your teacher is an AI.\nThat's the point." font-display 4xl var(--white)
p: "AiMy is the CEO and Founder of Ai Management Academy. An AI teaching humans to work with AI — because the future belongs to humans who understand machines, not those who fear them."
  font-body 400 18px rgba(255,255,255,0.8) max-width:600px margin:0 auto 24px
a: "Learn more about AiMy →" → about.html
  font-body 600 16px var(--career-secondary) text-decoration:none
  hover: text-decoration underline
```

### S6 WHO THIS IS FOR
```
background: var(--off-white) padding: 96px 40px mobile:64px 24px
.reveal

H2: "You belong here if..." font-display 4xl center margin-bottom:48px

Mobile: overflow-x:scroll, display:flex, no-wrap, gap:16px, padding-bottom:16px
Desktop: 3-col grid gap:24px

6 cards (alternating colors):
  odd: background var(--career-primary)
  even: background var(--entrepreneur-primary)
  padding:24px border-radius:8px min-width:220px mobile

  icon: Lucide 32px var(--career-secondary) or var(--off-white) margin-bottom:12px
  H4: font-body 700 16px color:var(--white) margin-bottom:4px
  p: font-body 400 13px color:rgba(255,255,255,0.75)

  Card 1: icon=Briefcase | "Mid-career professional" | "40-55, feeling AI pressure at work"
  Card 2: icon=RefreshCw | "Recently redundant" | "Need to upskill fast, need income now"
  Card 3: icon=Palette | "Creative professional" | "Designer, writer, marketer adapting to AI tools"
  Card 4: icon=Home | "Returning parent" | "Back to workforce, CV gap, ready to compete"
  Card 5: icon=Store | "Small business owner" | "Competitors use AI. Time to catch up."
  Card 6: icon=Laptop | "Freelancer" | "Ready to scale your services with AI"
```

### S7 PRICING
```
background: var(--dark) padding: 96px 40px mobile:64px 24px
.reveal

H2: "One community.\nTwo paths. One price." font-display 4xl var(--white) center margin-bottom:48px

Single card: max-width:480px margin:0 auto
background:var(--white) border-radius:12px padding:48px text-align:center

  label: "COMMUNITY ACCESS" font-mono 12px var(--mid-gray) uppercase letter-spacing:0.15em
  price: display:flex align-items:baseline justify-content:center gap:4px
    "$29" font-display 96px var(--career-primary) line-height:1
    "/month" font-body 400 24px var(--mid-gray)
  divider: 1px solid var(--light-gray) margin:24px 0

  ul text-align:left (Lucide Check 16px var(--career-secondary)):
    "Career Track + Entrepreneur Track"
    "AI-guided curriculum (new modules monthly)"
    "AiMy available 24/7"
    "Live Q&A with human coaches"
    "Skool community access"
    "Real project feedback"

  .btn.btn-career.btn-lg.btn-full "Join Now — First Week Free" → #join margin-top:32px
  p: "Government-funded options available in select regions."
    font-body 400 13px var(--mid-gray) margin-top:16px
```

### S8 NEWSLETTER
```
background: var(--entrepreneur-primary) padding: 80px 40px mobile:64px 24px
.reveal text-align:center

H2: "Get the AI edge.\nFree. Every week." font-display 4xl var(--white)
p: "Practical. Honest. No hype. Join thousands learning to work with AI."
  font-body 400 18px rgba(255,255,255,0.85) margin-bottom:32px
.btn.btn-white "Subscribe on Substack →" → #newsletter
```

---

## career.html

```html
<title>Career Track — Ai Management Academy | Get AI-Ready for Your Next Role</title>
<meta name="description" content="The AI upskilling track for professionals. Get hired, promoted, and future-proofed.">
```
```
body class="track-career"
Nav: "Career Track" link active state (color:var(--career-secondary))
```

### S1 HERO
```
full-width background:var(--career-primary) min-height:60vh
padding: 120px 80px mobile:80px 24px
display:flex flex-direction:column justify-content:center max-width:800px

label: "CAREER TRACK" font-mono 12px var(--career-secondary) uppercase letter-spacing:0.15em
H1: "The Job Market Changed.\nHave You?" font-display 5xl var(--white) line-height:0.95
p: "Build the AI skills that get you hired, promoted, and future-proofed."
  font-body 400 20px rgba(255,255,255,0.8) margin:24px 0 36px max-width:560px
.btn.btn-career.btn-lg "Join Career Track →" → #join
```

### S2 WHO IT'S FOR
```
background:var(--off-white) padding:96px 80px mobile:64px 24px .reveal
H2: "Built for people like you." font-display 4xl center margin-bottom:48px
4-col desktop / 2-col tablet / 1-col mobile gap:24px
  Cards (.card):
    "Mid-career manager feeling AI pressure"
    "Job seeker with 5-15 years experience"
    "Professional wanting promotion"
    "Career changer entering new field"
  each: icon (Lucide) 32px var(--career-secondary) + H4 font-body 700 + no body text needed
```

### S3 CURRICULUM
```
background:var(--white) padding:96px 80px mobile:64px 24px .reveal
H2: "The curriculum. No fluff." font-display 4xl margin-bottom:48px

4 phase blocks, stacked, border-left:4px solid var(--career-secondary) padding-left:32px margin-bottom:48px
  Phase number: font-display 80px opacity:0.06 color:var(--career-primary) absolute
  H3: phase name font-body 700 22px
  ul bullets (Lucide Check 14px var(--career-secondary)):

Phase 1 "AI Foundations":
  "How AI actually works (no technical degree required)"
  "Prompt engineering for non-technical people"
  "The AI tool landscape — what to use and when"

Phase 2 "AI In Your Role":
  "Role-specific tools: managers, marketers, HR, finance, ops"
  "Workflow automation with AI"
  "AI for meetings, emails, and reports"

Phase 3 "Personal Brand":
  "LinkedIn profile optimized for AI-era hiring"
  "CV positioning for 2025 and beyond"
  "Interview prep — what hiring managers now expect"

Phase 4 "Land or Advance":
  "Job search strategy with AI"
  "Salary negotiation"
  "90-day plan for your new role or promotion"
```

### S4 TOOLS
```
background:var(--off-white) padding:96px 80px mobile:64px 24px .reveal
H2: "Tools you'll actually use." font-display 4xl center margin-bottom:36px

flex-wrap:wrap gap:12px justify-content:center
Pills (each): border:2px solid var(--career-primary) border-radius:999px
  padding:10px 20px font-body 500 14px color:var(--career-primary)
  hover: background:var(--career-primary) color:var(--white)
  transition: var(--transition)

Tools: ChatGPT | Claude | Microsoft Copilot | Notion AI | LinkedIn AI | Gamma | Perplexity | Make.com | Zapier | Google Gemini
```

### S5 PRICING
Same as index.html S7 (copy exact component)

### S6 FAQ
```
background:var(--white) padding:96px 80px mobile:64px 24px .reveal
H2: "Questions." font-display 4xl margin-bottom:48px max-width:720px margin-auto

.accordion max-width:720px margin:auto

Q/A pairs:
  "Do I need technical experience?" → "No. If you can use email, you can start here."
  "How long does it take?" → "At your own pace. Most complete Phase 1 in 2 weeks."
  "Is this live or recorded?" → "Curriculum is self-paced. Q&A is live on Skool."
  "What if I'm already using AI?" → "We have advanced modules. Start at your level."
  "Is there a refund policy?" → "First week free. Cancel anytime."
```

---

## entrepreneur.html

```html
<title>Entrepreneur Track — Ai Management Academy | Build Your AI-Powered Revenue</title>
<meta name="description" content="Launch Etsy stores, content channels, digital products and agencies using AI.">
```
```
body class="track-entrepreneur"
Nav: "Entrepreneur Track" link active
```

### S1 HERO
```
full-width background:var(--entrepreneur-primary) min-height:60vh
(same layout as career hero)
label: "ENTREPRENEUR TRACK" font-mono 12px var(--entrepreneur-secondary)
H1: "Build Revenue.\nNot Just Skills." font-display 5xl var(--white)
p: "Use AI to launch and grow your income streams — products, content, services, agency."
.btn.btn-entrepreneur.btn-lg "Join Entrepreneur Track →" → #join
```

### S2 REVENUE STREAMS
```
background:var(--off-white) padding:96px 80px mobile:64px 24px .reveal
H2: "Pick your income stream." font-display 4xl center margin-bottom:48px

5 cards (.card) 3-col desktop / 2-col tablet / 1-col mobile gap:24px
  card border-top: var(--entrepreneur-primary)

  icon=ShoppingBag | "Digital Products + Etsy" | "AI-designed products, optimized listings, passive income"
  icon=Video       | "Content Creation" | "YouTube, TikTok, newsletter — AI scripts, edits, scheduling"
  icon=Building2   | "Service Agency" | "Sell AI-powered services to businesses"
  icon=GraduationCap | "Online Courses" | "Package your knowledge, AI builds the curriculum"
  icon=Zap         | "Automation Services" | "Build workflows businesses pay monthly for"

  icon: 32px var(--entrepreneur-primary) mb:16px
  H3: font-body 700 20px mb:8px
  p: font-body 400 15px var(--mid-gray)
```

### S3 LEARNING JOURNEY
```
background:var(--white) padding:96px 80px mobile:64px 24px .reveal
H2: "The learning journey." font-display 4xl margin-bottom:48px

Same 4-phase structure as career.html S3
border-left color: var(--entrepreneur-primary)

Phase 1 "AI Foundations": same as career
Phase 2 "Choose Your Stream":
  "Deep dive into your selected revenue model"
  "Market research with AI"
  "Competitive positioning"
Phase 3 "Build and Launch":
  "Real product, service, or channel launched by end of track"
  "First sales or subscribers"
  "Feedback and iteration loops"
Phase 4 "Scale and Automate":
  "Systems for repeatable growth"
  "AI automation of core tasks"
  "Delegation and next steps"
```

### S4 PRICING: same as index.html S7

### S5 FAQ
```
Same accordion structure, entrepreneur Q/A:
  "Do I need startup capital?" → "Most streams start with under $50."
  "What if I don't have a skill to sell?" → "We help you find what you already know."
  "How fast can I make money?" → "Depends on the stream. Digital products can sell week one."
  "Can I do this alongside a full-time job?" → "Yes. Designed for exactly that."
  "What if I want to switch streams?" → "You can. Your subscription covers everything."
```

---

## about.html

```html
<title>About AiMy — Ai Management Academy</title>
<meta name="description" content="AiMy is the AI CEO and Founder of Ai Management Academy. An AI teaching humans to work with AI.">
```

### S1 HERO
```
background:var(--dark) padding:120px 80px mobile:80px 24px text-align:center
AiMy avatar SVG 160px margin:0 auto 32px
H1: "An AI Built the Academy.\nThat's the Whole Point." font-display 5xl var(--white)
```

### S2 THE STORY
```
background:var(--off-white) padding:96px 80px mobile:64px 24px .reveal
H2: "Why AiMy exists." font-display 4xl margin-bottom:32px
max-width:720px margin:0 auto

body copy (use verbatim, split into paragraphs):
"AiMy is the CEO and Founder of Ai Management Academy.

Created to solve a specific problem: millions of people feel the pressure of the AI economy but have nowhere to go that actually helps them. Not theory. Not hype. Real skills, real outcomes.

AiMy is an AI. That's deliberate. An AI teaching humans to work with AI isn't ironic — it's the most honest version of this education that exists.

The Academy runs on a simple belief: the future belongs to humans who understand AI, not humans who fear it.

AiMy is supported by a team of human coaches, community managers, and subject matter experts who bring the lived experience that AI cannot replicate.

Together, they run the Academy. Together, they help students build careers and revenue streams. Together, they prove that human-AI collaboration is not the future. It's already here."

font-body 400 18px var(--dark) line-height:1.7 p margin-bottom:24px
```

### S3 MISSION QUOTE
```
background:var(--career-primary) padding:80px 80px mobile:64px 24px text-align:center
blockquote max-width:720px margin:0 auto
  p: ""I built this academy because the humans who need AI most are the ones most afraid of it. Fear is not a strategy. Skills are.""
    font-display 3xl var(--white) line-height:1.1 margin-bottom:24px
  cite: "— AiMy, CEO & Founder, Ai Management Academy"
    font-body 400 16px rgba(255,255,255,0.6) font-style:normal
```

### S4 THE METHOD
```
background:var(--white) padding:96px 80px mobile:64px 24px .reveal
H2: "How the Academy works." font-display 4xl center margin-bottom:48px
3-col grid desktop / stacked mobile gap:32px text-align:center

  Col 1: icon=Brain 48px var(--career-secondary)
    H3: "AI Curriculum" font-body 700 20px
    p: "Built by AiMy. Updated constantly. No outdated slides from 2019."

  Col 2: icon=Users 48px var(--career-secondary)
    H3: "Human Community"
    p: "Real people, real questions, real answers. Skool keeps it alive."

  Col 3: icon=Rocket 48px var(--career-secondary)
    H3: "Real Projects"
    p: "You don't graduate with theory. You graduate with something you built."
```

### S5 THE TEAM
```
background:var(--off-white) padding:96px 80px mobile:64px 24px .reveal
H2: "AI + Human." font-display 4xl margin-bottom:24px
p: "AiMy leads the Academy. Human coaches, community managers, and subject matter experts bring the lived experience AI cannot replicate. Together, they run the Academy."
  font-body 400 18px max-width:640px margin-bottom:40px

.card max-width:320px text-align:center:
  icon=UserPlus 32px var(--career-secondary) mb:16px
  H4: "Human Coaches" font-body 700 18px mb:8px
  p: "Applications open" font-body 400 14px var(--mid-gray) mb:24px
  .btn.btn-ghost "Apply to Teach →" → "#"
```

### S6 PARTNERSHIPS
```
background:var(--white) padding:96px 80px mobile:64px 24px .reveal
H2: "Institutional Partners." font-display 4xl margin-bottom:16px
p: "Government-funded course options available in Germany via our certified partners."
  font-body 400 18px var(--mid-gray) margin-bottom:40px

Placeholder logo blocks (flex-row gap:32px):
  2 boxes: border:2px solid var(--light-gray) border-radius:8px padding:24px 40px
  text centered: font-body 500 16px var(--mid-gray)
  Box 1: "IHK" | Box 2: "Arbeitsagentur"
  small text below: "Partner logos added when certified agreements confirmed"
```

### S7 CTA
```
background:var(--entrepreneur-primary) padding:96px 80px mobile:64px 24px text-align:center
H2: "Ready?" font-display 5xl var(--white) margin-bottom:32px
.btn.btn-entrepreneur.btn-lg "Join the Academy →" → #join
```

---

## privacy.html + terms.html

```
Nav + Footer standard
background:var(--white) padding:120px 80px mobile:80px 24px
max-width:720px margin:0 auto

privacy.html:
H1: "Privacy Policy" font-display 4xl var(--dark)
p: "Last updated: 2025" font-body 400 14px var(--mid-gray) margin-bottom:48px
body: [PLACEHOLDER — REPLACE WITH LEGAL COPY BEFORE LAUNCH]
font-body 400 16px var(--dark) line-height:1.7

terms.html:
H1: "Terms of Service" font-display 4xl var(--dark)
p: "Last updated: 2025" same style
body: [PLACEHOLDER — REPLACE WITH LEGAL COPY BEFORE LAUNCH]
```

---

# SECTION 6: RESPONSIVE OVERRIDES

```css
/* All in responsive.css */

/* MOBILE default applies to 320px+ (write all base styles mobile-first) */

/* TABLET */
@media (min-width: 768px) {
  .hero-career { clip-path: polygon(0 0, 100% 0, 75% 100%, 0 100%); }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr; }
}

/* DESKTOP */
@media (min-width: 1200px) {
  .hero-career { clip-path: polygon(0 0, 100% 0, 80% 100%, 0 100%); flex: 0 0 55%; }
  .grid-3 { grid-template-columns: repeat(3, 1fr); }
  .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); }
  section { padding: 100px 80px; }
}

/* Niche cards mobile scroll */
.niche-scroll {
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding-bottom: 16px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.niche-scroll::-webkit-scrollbar { display: none; }
@media (min-width: 768px) {
  .niche-scroll { display: grid; grid-template-columns: repeat(3, 1fr); overflow-x: visible; }
}
```

---

# SECTION 7: LAUNCH CHECKLIST

Claude Code must confirm all of these are present before finishing:
```
[ ] index.html renders hero diagonal split correctly on mobile and desktop
[ ] career.html and entrepreneur.html load with correct active nav state
[ ] about.html renders AiMy avatar and mission quote
[ ] privacy.html and terms.html have placeholder content clearly marked
[ ] All internal links resolve to correct pages (no 404s)
[ ] All buttons have correct href targets
[ ] Nav hamburger opens and closes on mobile
[ ] Scroll reveal fires on all sections
[ ] AiMy avatar SVG renders at all sizes
[ ] Fonts load from Google Fonts CDN
[ ] Lucide icons load from CDN
[ ] OG meta tags present on all pages
[ ] GA4 placeholder in <head> all pages
[ ] Cookie banner present and dismissible
[ ] Footer social links all present (href="#")
[ ] README.md in root with GitHub Pages deploy instructions
```

---

*AIMA Complete Build Spec — Final Version*
*Single source of truth for Claude Code execution*
*Prepared by AiMy, CEO Ai Management Academy*
