# Abdullah Mohsin — Technology, Research & Innovation Portfolio

This folder contains Abdullah Mohsin's static professional portfolio, covering software engineering, artificial intelligence, research, innovation, and a current medical-imaging research focus.
- **Zero build steps required**
- **Zero dependencies** (no Node.js, no Docker, no external npm packages required)
- **Zero video stream / WebRTC dependencies**
- Can be opened directly by double-clicking `index.html` in any web browser, or deployed to GitHub Pages, Netlify, Vercel, or Apache/Nginx.

For repository-level GitHub Pages setup, follow the [publishing guide](../README.md).

---

## Folder Structure

```
Website-Static/
├── index.html        # Complete long-scrolling homepage with all sections
├── css/
│   └── style.css     # Responsive dark editorial theme with cyan, teal, and rose accents
├── js/
│   └── main.js       # Navigation, simulator, modal, filters, motion and contact actions
├── Video/
│   └── AbdullahMohsin.mp4 # Local introduction video (relative URL for GitHub Pages)
├── assets/           # Researcher/team photos, DAIT graphics, and press feature image
│   ├── abdullah-mohsin.jpg
│   ├── Group/        # Team portraits used in the team section
│   ├── dait-logo.png
│   ├── dait-logo-dark.jpg
│   ├── dait-world-map.jpg
│   ├── dait-assistant-ui.png
│   └── hemostasistoday.png
└── README.md
```

---

## How to View

1. **Directly in Browser:** Double-click `index.html` or right-click $\rightarrow$ "Open With" $\rightarrow$ Chrome/Firefox/Edge.
2. **Local Preview via Python:**
   ```bash
   cd /home/parrot/Desktop/Website-Static
   python3 -m http.server 8080
   # Open http://localhost:8080 in your browser
   ```

---

## Included Features

1. **Header & Navigation:** Responsive navigation bar with mobile drawer toggle and DAIT logo.
2. **Hero Section:** Professional introduction and centered video player. The site requests sound-on playback; when the browser blocks automatic playback, visitors can select **Play video** or use the native controls.
3. **About & Team:** Complete biography, academic research scope vs. clinical disclaimer, and cards for all 4 team members (**Abdullah Mohsin**, **Rayan**, **Mohib Ullah**, and **Arham Shah**).
4. **Research Focus:** 7 interactive focus cards and detailed descriptions of the 4 anatomical veins (Popliteal, Common Femoral, Femoral, Great Saphenous).
5. **Interactive Vein Simulator:** Explore an educational animated illustration of blood flow and a modeled clot, with compression controls and accessible status updates; it does not diagnose DVT.
6. **Dataset Benchmark:** Collection count breakdowns with direct links to Kaggle, Zenodo (17659415 & 17664207), Google Drive evidence, findings/analytics, execution files, and project gallery.
7. **Achievements & Hospital Survey:** Featuring the DAIT Global Medical Data Collection map, DAIT Assistant software workspace UI, and filterable timeline.
8. **Contact & Collaboration:** Gmail compose link, copyable email address, phone, WhatsApp, LinkedIn, and a Google feedback form. GitHub Pages does not send email in the background.
9. **Hemostasis Today feature:** Article image, Voices feature link, Abdullah DVT search link, related LinkedIn post, and a note that research descriptions are not clinical validation.
10. **Dataset Documentation Modal:** Formatted printable/exportable specification with BibTeX citation.
11. **Footer:** Compact profile, navigation, repository, and direct-contact links.
12. **Introduction Video:** Centered HTML5 player using `Video/AbdullahMohsin.mp4`; playback is requested with sound, with a user-initiated **Play video** fallback because browsers commonly block audible autoplay. Native controls allow pausing and seeking, and no placeholder poster image is used.
13. **Multidisciplinary Portfolio:** Current project concepts, organizations, events, categorized areas of focus, research resource cards, and social links.
14. **Visual Interactions:** Inline SVG icons, animated blood-flow illustration, responsive navigation, pointer spotlight, and scroll reveals. Motion is disabled for reduced-motion preferences and the pointer effect is limited to mouse/trackpad devices.
15. **Medical disclaimer:** Educational and researcher-reported content is separated from clinical diagnosis, medical advice, and claims of validation in the relevant research sections.

## GitHub Pages Notes

- Keep the `Video/`, `assets/`, `css/`, and `js/` folders alongside `index.html` when publishing.
- The video source is deliberately relative (`Video/AbdullahMohsin.mp4`), so it resolves both at the repository root and when served from a GitHub Pages project subpath.
- The video is never forced to mute. The page requests sound-on playback, but browsers may block automatic playback with sound; in that case, a **Play video** button and the native player controls are available. Reduced-motion preferences prevent automatic playback.
