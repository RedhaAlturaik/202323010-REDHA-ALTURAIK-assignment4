# Technical Documentation

## 1. Project Overview

This project is a final personal web application built for SWE363 Assignment 4. It combines the work from earlier assignments into a more polished portfolio experience that demonstrates responsive design, JavaScript interactivity, state management, API integration, graceful error handling, and professional documentation.

The application was intentionally kept as a static website so it can be deployed easily on GitHub Pages, Netlify, or Vercel without additional build tools.

## 2. Architecture

The project uses a simple and maintainable structure:

- `index.html` contains the semantic structure and all major page sections
- `css/styles.css` contains design tokens, layout styling, responsive rules, and animation behavior
- `js/script.js` contains application logic, project rendering, filtering, modal behavior, API integration, and form validation

The website follows a single-page architecture with section-based navigation:

- Hero
- About
- Toolkit
- Projects
- Contact

## 3. Key Features

### 3.1 Responsive Interface

The layout uses CSS Grid, Flexbox, reusable surface cards, and media queries to adapt to desktop, tablet, and mobile screen sizes. Navigation collapses into a toggle menu on small screens.

### 3.2 Project Explorer

Projects are stored as structured JavaScript objects and rendered dynamically into cards. The explorer supports:

- keyword search
- category filtering
- complexity filtering
- alphabetical and featured sorting
- a hide/show toggle for the project grid
- modal-based project detail viewing

### 3.3 GitHub API Integration

The application requests public repositories from GitHub using the Fetch API. Imported repositories are merged with the local featured projects.

If the GitHub request fails, the interface does not break. Instead, the site gracefully falls back to local project data and displays a helpful status message.

### 3.4 Local Storage Features

The project uses `localStorage` in several ways:

- theme preference persistence
- visitor name personalization
- return visit counter
- contact form draft saving

These features improve the feeling of continuity and make the application behave more like a real-world web app.

### 3.5 Contact Form Validation

The contact form validates:

- required name, email, and message fields
- minimum name length
- valid email format
- minimum message length

Validation errors are shown near the related fields, and the form status area provides success or error feedback.

### 3.6 Accessibility and UX Improvements

The interface includes:

- semantic headings and section structure
- a skip link for keyboard users
- `aria-live` feedback for dynamic status messages
- reduced-motion support
- visible focus states
- helpful error and fallback messages

## 4. Styling Approach

The Assignment 4 version introduces a stronger visual identity than the previous assignment:

- custom typography using `Space Grotesk` and `DM Sans`
- warm gradient backgrounds and layered surfaces
- reusable design tokens through CSS variables
- subtle motion for entrance and hover states
- glass-like cards and rounded components for a more modern presentation

The goal was to make the portfolio feel intentional and presentation-ready rather than like a basic classroom demo.

## 5. JavaScript Design

The JavaScript is organized into focused functions:

- rendering functions for project cards and modal content
- setup functions for independent UI behaviors
- filter application logic for search and selects
- persistence helpers for localStorage data
- fetch logic for GitHub integration

This makes the script easier to maintain and extend.

## 6. Error Handling

The application handles errors gracefully in these scenarios:

- GitHub API failure falls back to local data
- invalid contact form input shows targeted field errors
- invalid or missing saved draft data does not break the form

This supports the assignment requirement for professional-quality behavior.

## 7. Performance Considerations

The site remains lightweight and efficient by:

- using plain HTML, CSS, and JavaScript without heavy frameworks
- debouncing project search input
- rendering only filtered project results
- avoiding unnecessary dependencies

## 8. Future Improvements

Possible future enhancements include:

- connecting the contact form to a backend service
- adding real screenshots for each project
- improving the project modal with galleries and technical stack breakdowns
- adding automated testing and deployment workflows
- including analytics for visitor behavior after deployment
