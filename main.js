const prompts = [
  {
    title: "Sim Jam Hub",
    tag: "Community",
    text:
      "Create a minimal hub for weekly “Sim Jams” on WebSim: three featured prompts, a live countdown timer to the next jam, and a grid of winning simulations with big “Fork this” buttons for each."
  },
  {
    title: "Prompt vs Result Gallery",
    tag: "Meta",
    text:
      "Build a gallery that shows side-by-side cards: on the left the original WebSim prompt (short, 2–3 lines), on the right a screenshot placeholder and a “Remix prompt” button that pre-fills an editable textarea."
  },
  {
    title: "Mad Libs Prompt Maker",
    tag: "Utility",
    text:
      "Design a small mobile-first tool that lets users choose a type of site, aesthetic, and utility from dropdowns and generates a WebSim-ready prompt, with a single tap-to-copy button."
  },
  {
    title: "WebSim-verse Portal Map",
    tag: "Exploration",
    text:
      "Make a stylized map of interconnected simulations: each node is a card with a title, short description, and a link field where users can drop a WebSim URL. Clicking a node highlights all connected “portals.”"
  },
  {
    title: "Idea-to-App Sprint Board",
    tag: "Productivity",
    text:
      "Create a kanban-style board for turning ideas into WebSim projects: columns for “Ideas,” “Draft Prompts,” “Live Sims,” and “Share.” Each card should have fields for prompt text, sim URL, and notes."
  },
  {
    title: "Learning Flexbox with WebSim",
    tag: "Education",
    text:
      "Build an interactive tutorial that explains flexbox using panels. Each panel shows a short explanation, the HTML/CSS snippet, and a “Generate this layout on WebSim” button with a prewritten prompt."
  },
  {
    title: "One-Click Remix Lab",
    tag: "Onboarding",
    text:
      "Design a page with 6–8 example simulations represented as cards. Each card has a short description, a snippet of the original prompt, and three quick remix buttons that swap the aesthetic or theme in the prompt."
  },
  {
    title: "Prompt Drafting Notebook",
    tag: "Writing",
    text:
      "Create a distraction-free, notebook-style page to draft prompts: sections for goal, features, visual style, and interactions. Add a live preview area that combines those sections into a single polished prompt string."
  },
  {
    title: "Sim Collection Showcase",
    tag: "Portfolio",
    text:
      "Build a portfolio-style page where a user can curate their favorite WebSim creations. Each entry has a name, thumbnail placeholder, tags (e.g., game, tool, experimental), and a big “Open in WebSim” button."
  },
  {
    title: "Teaching Session Playground",
    tag: "Collaborative",
    text:
      "Design a simple “live workshop” board: a shared prompt on top, a list of participant names, and slots where each participant can paste the URL of their forked sim, so others can jump between them quickly."
  }
];

function initTabs() {
  const buttons = Array.from(document.querySelectorAll(".tab-button"));
  const panels = Array.from(document.querySelectorAll(".panel"));

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;

      buttons.forEach((b) =>
        b.classList.toggle("tab-button--active", b === btn)
      );
      panels.forEach((panel) =>
        panel.classList.toggle(
          "panel--active",
          panel.dataset.panel === target
        )
      );
    });
  });
}

function renderPrompts() {
  const list = document.getElementById("prompt-list");
  if (!list) return;

  list.innerHTML = "";

  prompts.forEach((p) => {
    const wrap = document.createElement("div");
    wrap.className = "prompt";

    wrap.innerHTML = `
      <div class="prompt-header">
        <div class="prompt-title">${p.title}</div>
        <div class="prompt-tag">${p.tag}</div>
      </div>
      <div class="prompt-text">${p.text}</div>
    `;

    wrap.addEventListener("click", () => {
      copyText(p.text);
    });

    list.appendChild(wrap);
  });
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    flashStatus("Prompt copied", true);
  } catch {
    flashStatus("Could not copy (clipboard blocked)", false);
  }
}

function flashStatus(message, ok) {
  const el = document.getElementById("copy-status");
  if (!el) return;
  el.textContent = message;
  el.style.color = ok ? "#1a7f3b" : "#b5472f";
  clearTimeout(flashStatus._t);
  flashStatus._t = setTimeout(() => {
    el.textContent = "";
  }, 1600);
}

function initGenerator() {
  const typeSel = document.getElementById("type-select");
  const aestheticSel = document.getElementById("aesthetic-select");
  const utilitySel = document.getElementById("utility-select");
  const btn = document.getElementById("generate-btn");
  const output = document.getElementById("generated-prompt");
  const copyBtn = document.getElementById("copy-generated");

  if (!btn || !output) return;

  const generate = () => {
    const type = typeSel.value;
    const aesthetic = aestheticSel.value;
    const utility = utilitySel.value;

    const prompt = [
      `Create a ${type} for WebSim that uses a ${aesthetic} aesthetic.`,
      `It should work as a ${utility}.`,
      "Make it mobile-first, with clear sections, subtle shadows, and easy-to-tap buttons.",
      "Keep the design clean and focused, and include small labels so new users understand what to click."
    ].join(" ");

    output.value = prompt;
  };

  btn.addEventListener("click", generate);
  generate();

  copyBtn?.addEventListener("click", () => {
    if (!output.value) return;
    copyText(output.value);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  initTabs();
  renderPrompts();
  initGenerator();
});