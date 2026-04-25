# Redha Aziz Personal Web Application

This repository contains my SWE363 Assignment 4 personal web application. It is a polished portfolio website built with HTML, CSS, and JavaScript to present my background, technical skills, project work, and AI-assisted development process in a professional way.

The application focuses on:

- responsive, presentation-ready interface design
- dynamic project rendering with search, filtering, sorting, and project details
- GitHub API integration with graceful fallback to local project data
- localStorage-based state for theme preference, visitor personalization, visit counter, and contact draft saving
- accessible navigation, clear validation feedback, and improved overall user experience

## Project Structure

```text
202323010-REDHA-ALTURAIK-assignment4/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
├── presentation/
│   └── README.md
└── .gitignore
```

## Run Locally

1. Clone or download the repository.
2. Open the project folder.
3. Run `index.html` in any modern browser.

No package installation is required because this is a static web application.

## Main Features

- Hero dashboard with live project count, session timer, and return visit counter
- Personalized greeting saved locally in the browser
- Project explorer with debounced search, category filter, complexity filter, and sorting
- Project detail modal for a richer portfolio browsing experience
- GitHub repository import for recent public repositories
- Theme toggle with persistent preference
- Contact form validation with saved draft and clear status feedback
- Responsive layout for desktop, tablet, and mobile devices

## AI Tools Summary

AI tools were used to support planning, UI refinement, JavaScript improvements, debugging, and documentation writing. All generated suggestions were reviewed, tested, and modified before inclusion.

Detailed documentation is available in:

- `docs/ai-usage-report.md`

## Documentation

- `docs/technical-documentation.md` explains the architecture, features, and implementation decisions.
- `docs/ai-usage-report.md` documents how AI was used responsibly during development.

## Deployment

This project can be deployed easily on:

- GitHub Pages
- Netlify
- Vercel

Optional live deployment link:

- Add your deployed URL here before submission.

## Notes Before Submission

- For the final Blackboard submission, create a new public repository named `202323010-redhaaziz-assignment4` or your instructor's exact required naming format.
- Add your presentation deliverables inside the `presentation/` folder before submitting:
  - `slides.pdf`
  - `demo-video.mp4`
