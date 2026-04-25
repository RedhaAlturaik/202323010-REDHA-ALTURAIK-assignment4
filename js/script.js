const BASE_PROJECTS = [
  {
    title: "QR Code Generator",
    description: "A responsive attendance helper that generates QR codes for quick classroom check-ins.",
    tags: ["HTML", "CSS", "JavaScript", "Frontend"],
    category: "frontend",
    level: "intermediate",
    featured: true,
    source: "portfolio",
    highlights: ["Responsive layout", "Fast user flow", "Practical student use case"],
    demoUrl: "#projects",
    codeUrl: "https://github.com/RedhaAlturaik/QR-Code-Generator"
  },
  {
    title: "Quiz App",
    description: "A MAUI-based quiz management application for creating, updating, and taking quizzes with structured data handling.",
    tags: ["MAUI", "SQLite", "C#", "Mobile"],
    category: "mobile",
    level: "advanced",
    featured: true,
    source: "portfolio",
    highlights: ["CRUD operations", "Data persistence", "Application logic"],
    demoUrl: "#projects",
    codeUrl: "https://github.com/RedhaAlturaik/Quiz-App"
  },
  {
    title: "Library Management System",
    description: "A borrowing and tracking system that combines frontend pages, business logic, and database-backed workflows.",
    tags: ["HTML", "CSS", "JavaScript", "Python", "Database"],
    category: "fullstack",
    level: "advanced",
    featured: true,
    source: "portfolio",
    highlights: ["End-to-end workflow", "Database integration", "Multi-technology stack"],
    demoUrl: "#projects",
    codeUrl: "https://github.com/RedhaAlturaik/Library-Management-System"
  }
];

let allProjects = [...BASE_PROJECTS];
let filteredProjects = [...BASE_PROJECTS];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[char]));
}

function updateHeroCounts() {
  const projectCount = $("#projectCount");
  if (projectCount) {
    projectCount.textContent = String(allProjects.length);
  }
}

function createTagMarkup(items = []) {
  return items.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join("");
}

function createProjectCard(project, index) {
  const safeTitle = escapeHtml(project.title);
  const safeDescription = escapeHtml(project.description);
  const tagMarkup = createTagMarkup(project.tags);

  return `
    <article class="project-card">
      <div class="project-topline">
        <span class="tag">${escapeHtml(project.level)}</span>
        <span class="tag">${escapeHtml(project.category)}</span>
        ${project.source === "github" ? '<span class="tag">GitHub</span>' : '<span class="tag">Featured</span>'}
      </div>
      <div>
        <h3>${safeTitle}</h3>
        <p class="muted">${safeDescription}</p>
      </div>
      <div class="project-meta">${tagMarkup}</div>
      <div class="project-actions project-links">
        <button class="btn" type="button" data-project-index="${index}">View details</button>
        <a href="${escapeHtml(project.codeUrl)}" target="_blank" rel="noreferrer">Source code</a>
      </div>
    </article>
  `;
}

function renderProjects(projects = filteredProjects) {
  const grid = $("#projectsGrid");
  const status = $("#projectsStatus");
  if (!grid || !status) return;

  filteredProjects = [...projects];

  if (!projects.length) {
    grid.innerHTML = "";
    status.textContent = "No projects matched the current search and filters.";
    return;
  }

  status.textContent = `Showing ${projects.length} project${projects.length === 1 ? "" : "s"}.`;
  grid.innerHTML = projects.map((project) => {
    const index = allProjects.findIndex((item) => item.title === project.title && item.codeUrl === project.codeUrl);
    return createProjectCard(project, index);
  }).join("");
}

function applyProjectFilters() {
  const searchValue = ($("#projectSearch")?.value || "").trim().toLowerCase();
  const categoryValue = $("#filterType")?.value || "all";
  const levelValue = $("#levelFilter")?.value || "all";
  const sortValue = $("#sortType")?.value || "featured";

  let result = [...allProjects];

  if (searchValue) {
    result = result.filter((project) => {
      const haystack = [
        project.title,
        project.description,
        project.category,
        project.level,
        ...project.tags,
        ...(project.highlights || [])
      ].join(" ").toLowerCase();

      return haystack.includes(searchValue);
    });
  }

  if (categoryValue !== "all") {
    result = result.filter((project) => project.category === categoryValue);
  }

  if (levelValue !== "all") {
    result = result.filter((project) => project.level === levelValue);
  }

  if (sortValue === "az") {
    result.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortValue === "za") {
    result.sort((a, b) => b.title.localeCompare(a.title));
  } else {
    result.sort((a, b) => Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title));
  }

  renderProjects(result);
}

function setupProjectControls() {
  const searchInput = $("#projectSearch");
  const filterType = $("#filterType");
  const levelFilter = $("#levelFilter");
  const sortType = $("#sortType");

  if (!searchInput || !filterType || !levelFilter || !sortType) return;

  let debounceId;
  searchInput.addEventListener("input", () => {
    window.clearTimeout(debounceId);
    debounceId = window.setTimeout(applyProjectFilters, 180);
  });

  [filterType, levelFilter, sortType].forEach((element) => {
    element.addEventListener("change", applyProjectFilters);
  });
}

async function fetchGitHubProjects() {
  const username = "RedhaAlturaik";

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
    if (!response.ok) {
      throw new Error(`GitHub request failed with status ${response.status}`);
    }

    const repos = await response.json();
    const githubProjects = repos
      .filter((repo) => !repo.fork)
      .slice(0, 6)
      .map((repo) => ({
        title: repo.name,
        description: repo.description || "GitHub repository imported from the public profile.",
        tags: ["GitHub", repo.language || "Code"],
        category: "github",
        level: "intermediate",
        featured: false,
        source: "github",
        highlights: [
          "Live GitHub data",
          `Last updated: ${new Date(repo.updated_at).toLocaleDateString()}`,
          repo.language ? `Primary language: ${repo.language}` : "Language not specified"
        ],
        demoUrl: repo.homepage || repo.html_url,
        codeUrl: repo.html_url
      }));

    allProjects = [...BASE_PROJECTS, ...githubProjects];
    updateHeroCounts();
    applyProjectFilters();
  } catch (error) {
    console.error(error);
    allProjects = [...BASE_PROJECTS];
    updateHeroCounts();
    renderProjects(allProjects);
    const status = $("#projectsStatus");
    if (status) {
      status.textContent = "GitHub repositories could not be loaded right now, so local portfolio projects are being shown.";
    }
  }
}

function setTheme(theme) {
  const icon = $(".theme-icon");
  const text = $(".theme-text");

  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    if (icon) icon.textContent = "Sun";
    if (text) text.textContent = "Light mode";
  } else {
    document.documentElement.removeAttribute("data-theme");
    if (icon) icon.textContent = "Moon";
    if (text) text.textContent = "Dark mode";
  }

  localStorage.setItem("theme", theme);
}

function setupThemeToggle() {
  const button = $(".theme-toggle");
  if (!button) return;

  setTheme(localStorage.getItem("theme") === "dark" ? "dark" : "light");
  button.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    setTheme(currentTheme === "dark" ? "light" : "dark");
  });
}

function setupWelcomeMessage() {
  const form = $("#welcomeForm");
  const input = $("#usernameInput");
  const message = $("#welcomeMsg");
  if (!form || !input || !message) return;

  const savedName = localStorage.getItem("portfolioVisitorName");
  if (savedName) {
    message.textContent = `Welcome back, ${savedName}.`;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = input.value.trim();

    if (!value) {
      message.textContent = "Enter a name to personalize your visit.";
      return;
    }

    localStorage.setItem("portfolioVisitorName", value);
    message.textContent = `Welcome, ${value}. Your preference is saved locally.`;
    input.value = "";
  });
}

function setupVisitCounter() {
  const visitCounter = $("#visitCounter");
  if (!visitCounter) return;

  const currentVisits = Number(localStorage.getItem("portfolioVisitCount") || "0") + 1;
  localStorage.setItem("portfolioVisitCount", String(currentVisits));
  visitCounter.textContent = String(currentVisits);
}

function setupSessionTimer() {
  const timer = $("#sessionTimer");
  if (!timer) return;

  let seconds = 0;
  window.setInterval(() => {
    seconds += 1;
    timer.textContent = seconds < 60 ? `${seconds}s` : `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  }, 1000);
}

function setupMobileMenu() {
  const button = $(".nav-toggle");
  const menu = $("#navMenu");
  if (!button || !menu) return;

  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    menu.classList.toggle("open");
  });

  $$(".nav-link", menu).forEach((link) => {
    link.addEventListener("click", () => {
      button.setAttribute("aria-expanded", "false");
      menu.classList.remove("open");
    });
  });
}

function setupScrollSpy() {
  const links = $$(".nav-link");
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!links.length || !sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", isActive);
      });
    });
  }, {
    threshold: 0.45
  });

  sections.forEach((section) => observer.observe(section));
}

function setFieldError(fieldId, message) {
  const error = document.querySelector(`[data-error-for="${fieldId}"]`);
  const input = document.getElementById(fieldId);
  if (error) error.textContent = message;
  if (input) input.style.borderColor = message ? "var(--error)" : "";
}

function saveDraft() {
  const draft = {
    name: $("#name")?.value || "",
    email: $("#email")?.value || "",
    message: $("#message")?.value || ""
  };

  localStorage.setItem("contactDraft", JSON.stringify(draft));
}

function restoreDraft() {
  const rawDraft = localStorage.getItem("contactDraft");
  if (!rawDraft) return;

  try {
    const draft = JSON.parse(rawDraft);
    if ($("#name")) $("#name").value = draft.name || "";
    if ($("#email")) $("#email").value = draft.email || "";
    if ($("#message")) $("#message").value = draft.message || "";
  } catch (error) {
    console.error("Failed to restore draft", error);
  }
}

function setupContactForm() {
  const form = $("#contactForm");
  const status = $("#formStatus");
  const clearDraftButton = $("#clearDraftBtn");
  if (!form || !status || !clearDraftButton) return;

  restoreDraft();
  ["name", "email", "message"].forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener("input", saveDraft);
    }
  });

  clearDraftButton.addEventListener("click", () => {
    localStorage.removeItem("contactDraft");
    form.reset();
    ["name", "email", "message"].forEach((id) => setFieldError(id, ""));
    status.className = "form-status";
    status.textContent = "Saved draft cleared.";
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = $("#name")?.value.trim() || "";
    const email = $("#email")?.value.trim() || "";
    const message = $("#message")?.value.trim() || "";

    let valid = true;
    status.className = "form-status";
    status.textContent = "";
    ["name", "email", "message"].forEach((id) => setFieldError(id, ""));

    if (!name) {
      setFieldError("name", "Name is required.");
      valid = false;
    } else if (name.length < 2) {
      setFieldError("name", "Name must be at least 2 characters.");
      valid = false;
    }

    if (!email) {
      setFieldError("email", "Email is required.");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFieldError("email", "Enter a valid email address.");
      valid = false;
    }

    if (!message) {
      setFieldError("message", "Message is required.");
      valid = false;
    } else if (message.length < 15) {
      setFieldError("message", "Message must be at least 15 characters.");
      valid = false;
    }

    if (!valid) {
      status.classList.add("error-message");
      status.textContent = "Please fix the highlighted fields and try again.";
      return;
    }

    localStorage.removeItem("contactDraft");
    form.reset();
    status.classList.add("success");
    status.textContent = "Message validated successfully. In a deployed version, this would be sent to a backend service.";
  });
}

function setupProjectVisibilityToggle() {
  const button = $("#toggleProjects");
  const grid = $("#projectsGrid");
  if (!button || !grid) return;

  button.addEventListener("click", () => {
    const isHidden = grid.classList.toggle("hidden");
    button.textContent = isHidden ? "Show project grid" : "Hide project grid";
  });
}

function populateModal(project) {
  const modal = $("#projectModal");
  const title = $("#modalTitle");
  const description = $("#modalDescription");
  const meta = $("#modalMeta");
  const links = $("#modalLinks");
  if (!modal || !title || !description || !meta || !links) return;

  title.textContent = project.title;
  description.textContent = project.description;
  meta.innerHTML = createTagMarkup([
    project.level,
    project.category,
    ...project.tags,
    ...(project.highlights || [])
  ]);
  links.innerHTML = `
    <a href="${escapeHtml(project.demoUrl || project.codeUrl)}" target="_blank" rel="noreferrer">Open demo</a>
    <a href="${escapeHtml(project.codeUrl)}" target="_blank" rel="noreferrer">Open repository</a>
  `;
}

function setupProjectModal() {
  const modal = $("#projectModal");
  const closeButton = $("#closeModalBtn");
  const grid = $("#projectsGrid");
  if (!modal || !closeButton || !grid) return;

  grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-project-index]");
    if (!button) return;

    const projectIndex = Number(button.getAttribute("data-project-index"));
    const project = allProjects[projectIndex];
    if (!project) return;

    populateModal(project);
    document.body.classList.add("modal-open");
    modal.showModal();
  });

  closeButton.addEventListener("click", () => {
    modal.close();
  });

  modal.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
  });
}

function setYear() {
  const year = $("#year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects(allProjects);
  updateHeroCounts();
  setupThemeToggle();
  setupWelcomeMessage();
  setupVisitCounter();
  setupSessionTimer();
  setupMobileMenu();
  setupScrollSpy();
  setupProjectControls();
  setupProjectVisibilityToggle();
  setupProjectModal();
  setupContactForm();
  setYear();
  fetchGitHubProjects();
});
