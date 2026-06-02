/* ═══════════════════════════════════════════════════════
   ONEBLIND DOCS — script.js
═══════════════════════════════════════════════════════ */

/* ─── Active nav link tracking ───────────────────────── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link[href^="#"]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
    });
  });
}, {
  rootMargin: '-20% 0px -70% 0px',
  threshold: 0,
});

sections.forEach(s => observer.observe(s));

/* ─── Copy-to-clipboard buttons ──────────────────────── */
document.querySelectorAll('pre').forEach(pre => {
  const btn = document.createElement('button');
  btn.className = 'copy-btn';
  btn.textContent = 'Copy';
  btn.addEventListener('click', async () => {
    const text = pre.querySelector('code')?.textContent ?? pre.textContent;
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
    } catch {
      btn.textContent = 'Failed';
    }
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 2000);
  });
  pre.appendChild(btn);
});

/* ─── Mobile sidebar toggle ──────────────────────────── */
const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
  document.body.style.overflow = '';
}

menuBtn?.addEventListener('click', () => {
  sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
});

overlay?.addEventListener('click', closeSidebar);

/* Close sidebar when a nav link is tapped on mobile */
navLinks.forEach(link => link.addEventListener('click', () => {
  if (window.innerWidth <= 860) closeSidebar();
}));
