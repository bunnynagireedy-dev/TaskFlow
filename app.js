/* =============================================
   TASKFLOW – app.js
   Mobile menu · Dark mode · Form validation · Blog API
   ============================================= */
'use strict';

// ── Helpers ──────────────────────────────────
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ── Mobile Menu Toggle ────────────────────────
(function initMobileMenu() {
  const btn   = $('#hamburger');
  const links = $('#nav-links');
  if (!btn || !links) return;

  function toggleMenu(force) {
    const open = typeof force === 'boolean' ? force : !links.classList.contains('open');
    links.classList.toggle('open', open);
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  }

  btn.addEventListener('click', () => toggleMenu());

  // Close when a nav link is clicked
  $$('a', links).forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  // Close on outside click
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !links.contains(e.target)) {
      toggleMenu(false);
    }
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggleMenu(false);
  });
})();

// ── Dark Mode Toggle ──────────────────────────
(function initDarkMode() {
  const btn  = $('#theme-toggle');
  const html = document.documentElement;
  if (!btn) return;

  // Persist preference
  const stored = localStorage.getItem('tf-theme');
  if (stored) {
    html.setAttribute('data-theme', stored);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.setAttribute('data-theme', 'dark');
  }

  btn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('tf-theme', next);
    btn.setAttribute('aria-label', next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  });
})();

// ── Form Validation ───────────────────────────
(function initFormValidation() {
  const form    = $('#contact-form');
  const success = $('#form-success');
  if (!form) return;

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function getField(id) {
    return form.querySelector(`#${id}`);
  }

  function getError(id) {
    return form.querySelector(`#${id}-error`);
  }

  function showError(id, msg) {
    const input = getField(id);
    const err   = getError(id);
    input.classList.add('error');
    err.textContent = msg;
  }

  function clearError(id) {
    const input = getField(id);
    const err   = getError(id);
    input.classList.remove('error');
    err.textContent = '';
  }

  function validateAll() {
    let valid = true;

    // Name
    const name = getField('name').value.trim();
    if (!name) {
      showError('name', 'Please enter your name.');
      valid = false;
    } else {
      clearError('name');
    }

    // Email
    const email = getField('email').value.trim();
    if (!email) {
      showError('email', 'Email is required.');
      valid = false;
    } else if (!EMAIL_RE.test(email)) {
      showError('email', 'Please enter a valid email address.');
      valid = false;
    } else {
      clearError('email');
    }

    // Message
    const msg = getField('message').value.trim();
    if (!msg) {
      showError('message', 'Please write a message.');
      valid = false;
    } else if (msg.length < 10) {
      showError('message', 'Message must be at least 10 characters.');
      valid = false;
    } else {
      clearError('message');
    }

    return valid;
  }

  // Live validation on blur
  ['name', 'email', 'message'].forEach(id => {
    const el = getField(id);
    el.addEventListener('blur', () => validateAll());
    el.addEventListener('input', () => {
      if (el.classList.contains('error')) validateAll();
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateAll()) {
      // Focus first error
      const firstErr = form.querySelector('.error');
      if (firstErr) firstErr.focus();
      return;
    }

    // Simulate success
    form.reset();
    ['name', 'email', 'message'].forEach(clearError);
    success.hidden = false;

    setTimeout(() => { success.hidden = true; }, 5000);
  });
})();

// ── Blog API Integration ──────────────────────
(function initBlog() {
  const grid  = $('#blog-grid');
  const errEl = $('#blog-error');
  if (!grid) return;

  function renderSkeletons(count = 6) {
    grid.innerHTML = Array.from({ length: count }, () => `
      <div class="skeleton" aria-hidden="true">
        <div class="skeleton-line short"></div>
        <div class="skeleton-line title"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line short"></div>
      </div>
    `).join('');
    grid.setAttribute('aria-busy', 'true');
  }

  function renderPosts(posts) {
    grid.setAttribute('aria-busy', 'false');
    grid.innerHTML = posts.map(post => `
      <article class="blog-card" aria-label="Blog post: ${escapeHtml(post.title)}">
        <span class="blog-card-id">Post #${post.id}</span>
        <h3>${escapeHtml(post.title)}</h3>
        <p>${escapeHtml(post.body)}</p>
        <a href="#" class="blog-read-more" aria-label="Read more about ${escapeHtml(post.title)}">Read more →</a>
      </article>
    `).join('');
  }

  function renderError(msg) {
    grid.setAttribute('aria-busy', 'false');
    grid.innerHTML = '';
    errEl.textContent = `⚠️ ${msg}`;
    errEl.hidden = false;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  async function fetchPosts() {
    renderSkeletons(6);
    try {
      // Simulate network request delay to show skeleton loading state
      await new Promise(resolve => setTimeout(resolve, 850));

      const posts = [
        {
          id: 1,
          title: "How to run effective async daily standups",
          body: "Discover how remote-first engineering teams leverage asynchronous updates to stay aligned without wasting valuable focus and coding time."
        },
        {
          id: 2,
          title: "Introducing TaskFlow Goals: Align tasks with OKRs",
          body: "Connect daily operations to high-level company goals. Learn how to set up goal tracking and metrics roll-ups directly in TaskFlow."
        },
        {
          id: 3,
          title: "5 common bottlenecks in sprint planning",
          body: "Spot velocity blockers, manage team workload heat maps, and keep your software delivery pipeline flowing smoothly with these tips."
        },
        {
          id: 4,
          title: "A guide to zero-friction developer onboarding",
          body: "Build team documentation, design-system audits, and automated workspace rules so new hires can ship their first code on day one."
        },
        {
          id: 5,
          title: "Why context switching kills developer productivity",
          body: "The cost of jumping between Slack, GitHub, and task managers is higher than you think. Learn how to centralize your team's focus."
        },
        {
          id: 6,
          title: "Securing your team workspace: Best practices",
          body: "From SSO and SAML security to enterprise data encryption at rest and in transit, here is how we keep your project data safe."
        }
      ];

      renderPosts(posts);
    } catch (err) {
      renderError(`Couldn't load posts. ${err.message || 'Please try again later.'}`);
    }
  }

  // Lazy-load blog section using IntersectionObserver
  const section = document.querySelector('.blog');
  if ('IntersectionObserver' in window && section) {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchPosts();
        observer.disconnect();
      }
    }, { rootMargin: '200px' });
    observer.observe(section);
  } else {
    fetchPosts();
  }
})();

// ── Smooth scroll offset for sticky nav ──────
(function initSmoothScroll() {
  const NAV_H = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '68');

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - NAV_H - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
