# Ai Management Academy — aimanagementacademy.com

Static website for Ai Management Academy (AiMA). Built with pure HTML, CSS, and vanilla JS. No frameworks, no build tools, no npm.

## Deploy to GitHub Pages

1. Push this repository to GitHub
2. Go to **Settings → Pages**
3. Under **Source**, select **Deploy from a branch**
4. Choose **main** branch, **/ (root)** folder
5. Click **Save**
6. Your site will be live at `https://<your-org>.github.io/academy/` within a few minutes

### Custom Domain (aimanagementacademy.com)

1. In **Settings → Pages → Custom domain**, enter `aimanagementacademy.com`
2. Add the following DNS records at your domain registrar:

```
Type    Name    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     <your-org>.github.io
```

3. Check **Enforce HTTPS** once DNS propagates (can take up to 24 hours)

## Before Launch — Action Required

- [ ] Replace `GA_MEASUREMENT_ID` in all 6 HTML files with your real GA4 tag
- [ ] Add legal copy to `privacy.html` (currently placeholder)
- [ ] Add legal copy to `terms.html` (currently placeholder)
- [ ] Generate OG images: `assets/og/og-home.jpg`, `assets/og/og-career.jpg`, `assets/og/og-entrepreneur.jpg` (1200×630 px each)
- [ ] Generate `assets/logo/favicon.ico` from avatar SVG (use realfavicongenerator.net)
- [ ] Replace all `#join` hrefs with the actual Skool community URL
- [ ] Replace `#newsletter` hrefs with the actual Substack URL
- [ ] Replace `#` social hrefs with real profile URLs

## File Structure

```
/
├── index.html
├── career.html
├── entrepreneur.html
├── about.html
├── privacy.html
├── terms.html
├── css/
│   ├── main.css
│   ├── components.css
│   └── responsive.css
├── js/
│   └── main.js
└── assets/
    ├── logo/
    │   ├── aima-logo-light.svg
    │   └── aima-logo-dark.svg
    ├── aimy/
    │   ├── aimy-avatar.svg
    │   ├── aimy-avatar-dark.svg
    │   └── aimy-avatar-light.svg
    └── og/
        ├── og-home.jpg
        ├── og-career.jpg
        └── og-entrepreneur.jpg
```

## Tech Stack

- Pure HTML5 + CSS3 + Vanilla JS
- Google Fonts: Bebas Neue, DM Sans, Space Mono
- Lucide Icons via CDN
- Google Analytics 4 (placeholder)
- No frameworks. No build step. No npm.
