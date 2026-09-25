const works = [
  // Timplado — exact files from the uploaded collection
  ...[
    'Green Simple Morning Routine Carousel Instagram Post - 5.png',
    'Green Simple Morning Routine Carousel Instagram Post - 6.png',
    'Green Simple Morning Routine Carousel Instagram Post - 7.png',
    'Green Simple Morning Routine Carousel Instagram Post - 8.png',
    'Green Simple Morning Routine Carousel Instagram Post - 10.png',
    'Green Simple Morning Routine Carousel Instagram Post - 11.png',
    'Green Simple Morning Routine Carousel Instagram Post - 12.png',
    'Green Simple Morning Routine Carousel Instagram Post - 13.png',
    'Green Simple Morning Routine Carousel Instagram Post - 14.png'
  ].map((file, i) => ({
    title: `Timplado — Brand Concept ${String(i + 1).padStart(2, '0')}`,
    category: 'Brand Concept',
    type: 'Social Media Design',
    src: `assets/images/timplado/${file}`
  })),

  // OJT corporate graphics — exact files from the uploaded collection
  ...[
    'A4 Blank Template (Building BG).png',
    'C1_MDL.png','C1_MWL.png','D1_MDL.png','D1_MWL.png',
    'H1_MDL.png','H1_MWL.png','I1_MWL.png','UNISEA_DESKTOP WALLPAPER (1920 X 1080).png'
  ].map((file, i) => ({
    title: `Internship Design ${String(i + 1).padStart(2, '0')}`,
    category: 'Internship Work',
    type: i === 0 ? 'Hiring Template' : i === 8 ? 'Desktop Wallpaper' : 'Standee Design',
    confidential: i === 0,
    description: i === 0 ? 'A hiring template created during my internship, designed to present recruitment information in a clear, professional layout.' : i === 8 ? 'A desktop wallpaper created during my internship, bringing a consistent corporate visual identity to the workplace screen.' : 'A standee design created during my internship, arranging corporate information in a tall display format with a clear visual hierarchy.',
    src: `assets/images/ojt/${file}`
  })),

  // Social media carousel — original slides and supporting assets in supplied order.
  ...[
    ...Array.from({ length: 12 }, (_, i) => `${String(i + 1).padStart(2, '0')}_Social Media Post.png`),
    'Phone Mock-up.png',
    'Fonts and Color Palette.png'
  ].map((file, i) => ({
    title: 'SOCIAL MEDIA CAROUSEL',
    category: 'Social Media Carousel',
    type: 'Social Media · Carousel Design',
    alt: i < 12 ? `Social Media Carousel — slide ${i + 1}` : `Social Media Carousel — ${file.replace('.png', '')}`,
    src: `assets/images/social-media-carousel/${file}`
  })),

  // Personal graphic-design studies — exact files from the uploaded collection
  ...['Copy of Tubaland CV - 38.png','Copy of Tubaland CV - 39.png','Copy of Tubaland CV - 40.png','Copy of Tubaland CV - 41.png','Copy of Tubaland CV - 42.png','Copy of Tubaland CV - 43.png'].map((file, i) => ({
    title: `Personal Design Study ${String(i + 1).padStart(2, '0')}`,
    category: 'Personal Work',
    type: 'Graphic Design Study',
    src: `assets/images/personal_work/${file}`
  }))
];

const certificates = [
  { title: 'TESDA NC III — Visual Graphic Design', note: 'TESDA', src: 'assets/images/certs/cert-IMG_5211 - Copy.jpeg' },
  { title: 'Digital Skills: Mobile', note: 'Accenture / FutureLearn', src: 'assets/images/certs/cert-accenture-mobile.jpg' },
  { title: 'Digital Skills: User Experience', note: 'Accenture / FutureLearn', src: 'assets/images/certs/cert-accenture-ux.jpg' },
  { title: 'Java Object-Oriented Programming Certification Exam', note: 'CodeChum', src: 'assets/images/certs/cert-IMG_5206 - Copy.jpeg' }
];

const workGrid = document.getElementById('workGrid');
const filters = document.getElementById('filters');
const categories = ['Social Media Carousel', 'Brand Concept', 'Internship Work', 'Personal Work'];
const categoryLabels = ['Social Media Carousel', 'Timplado Concept', 'Internship Design', 'Personal Posters'];

function renderFilters() {
  filters.innerHTML = categories.map((category, index) => `
    <button type="button" id="workTab${index}" role="tab" class="filter-btn ${index === 0 ? 'active' : ''}" aria-selected="${index === 0}" aria-controls="workCarousel" tabindex="${index === 0 ? 0 : -1}" data-filter="${category}"><svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H6v18h12V7l-4-4ZM14 3v5h4M9 12h6M9 16h6"/></svg>${categoryLabels[index]}</button>
  `).join('');
}

let workCategory = categories[0];
let workIndex = 0;
const workDescriptions = {
  'Social Media Carousel': 'A collection of social media carousel concepts designed to communicate ideas clearly through structured layouts, visual hierarchy, and engaging content.',
  'Brand Concept': 'Timplado is a fictional coffee-shop brand I created as a personal showcase project. These social media designs explore how a consistent visual style can introduce a brand and bring its content ideas to life.',
  'Internship Work': 'A collection of corporate graphics created during my internship, including hiring templates and workplace materials. These pieces show my approach to organizing information in clear, professional layouts.',
  'Personal Work': 'Independent design studies created to explore visual ideas and develop my graphic design skills. This collection gives me room to experiment with composition, typography, and color beyond a client brief.'
};
function renderWorks(filter = workCategory) {
  if (filter !== workCategory) { workCategory = filter; workIndex = 0; }
  const visible = works.filter(item => item.category === workCategory);
  const item = visible[workIndex];
  const categoryIndex = categories.indexOf(workCategory);
  document.getElementById('workCarousel').setAttribute('aria-labelledby', `workTab${categoryIndex}`);
  document.getElementById('workLocation').textContent = categoryLabels[categoryIndex];
  document.getElementById('categoryNote').textContent = {
    'Social Media Carousel': 'Social Media · Carousel Design',
    'Brand Concept': 'Self-initiated social media design · Fictional brand',
    'Internship Work': 'Corporate graphics · Internship projects',
    'Personal Work': 'Graphic design · Independent studies'
  }[workCategory];
  document.getElementById('collectionTitle').textContent = {
    'Social Media Carousel': 'SOCIAL MEDIA CAROUSEL',
    'Brand Concept': 'Timplado · A coffee-shop concept',
    'Internship Work': 'Design in a professional setting',
    'Personal Work': 'Room to explore'
  }[workCategory];
  document.getElementById('collectionCount').textContent = `${visible.length} pieces`;
  workGrid.dataset.category = workCategory;
  workGrid.innerHTML = `
    <article class="cert-slide work-slide" role="group" aria-roledescription="slide" aria-label="${workIndex + 1} of ${visible.length}: ${item.title}">
      <button class="work-preview" type="button" aria-label="Enlarge ${item.alt || item.title}">
        <img src="${item.src}" alt="${item.alt || item.title}" />
        <span>View design <svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg></span>
      </button>
      <div class="cert-copy">
        <p class="eyebrow">${item.type}</p>
        <h3>${item.title}</h3>
        <p class="cert-description">${item.description || workDescriptions[workCategory]}</p>
        ${item.confidential ? '<p class="confidentiality-note"><strong>Confidentiality note</strong>Some information in this hiring template has been blocked out to protect the company’s confidential details.</p>' : ''}
        <div class="work-detail"><p>${item.alt || item.title}</p></div>
      </div>
    </article>`;
  document.getElementById('workCounter').textContent = `${String(workIndex + 1).padStart(2, '0')} / ${String(visible.length).padStart(2, '0')}`;
  workGrid.querySelector('.work-preview').addEventListener('click', () => openLightbox(item.src, item.alt || item.title));
}
function changeWork(step) {
  const count = works.filter(item => item.category === workCategory).length;
  workIndex = (workIndex + step + count) % count;
  renderWorks();
}
document.getElementById('workPrev').addEventListener('click', () => changeWork(-1));
document.getElementById('workNext').addEventListener('click', () => changeWork(1));
document.getElementById('workCarousel').addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    const previewFocused = event.target.closest('.work-preview');
    changeWork(event.key === 'ArrowLeft' ? -1 : 1);
    if (previewFocused) workGrid.querySelector('.work-preview').focus();
  }
});

filters.addEventListener('click', (event) => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-selected', 'false');
    btn.tabIndex = -1;
  });
  button.classList.add('active');
  button.setAttribute('aria-selected', 'true');
  button.tabIndex = 0;
  renderWorks(button.dataset.filter);
});
filters.addEventListener('keydown', event => {
  const tabs = [...filters.querySelectorAll('[role="tab"]')];
  const index = tabs.indexOf(event.target);
  if (index < 0 || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
  tabs[next].click();
  tabs[next].focus();
});

const certGrid = document.getElementById('certGrid');
const certificateDescriptions = [
  'A TESDA National Certificate III recognizing competency in visual graphic design. It covers logo and print design, user experience and interface design, product packaging, and display design.',
  'An Accenture course on FutureLearn exploring the role of mobile technology in the digital world. It introduces mobile design, development, and the creation of mobile experiences.',
  'An introductory Accenture course on FutureLearn about user experience (UX) and why it matters in digital products and services.',
  'A certificate from the LPU Batangas Java Object-Oriented Programming Certification Exam through CodeChum. It documents my assessment in Java programming and forms part of my Information Technology background.'
];
let certificateIndex = 0;
function renderCertificate() {
  const cert = certificates[certificateIndex];
  certGrid.innerHTML = `
    <article class="cert-slide" role="group" aria-roledescription="slide" aria-label="${certificateIndex + 1} of ${certificates.length}: ${cert.title}">
      <button class="cert-preview" type="button" aria-label="Enlarge ${cert.title}">
        <img src="${cert.src}" alt="${cert.title}" />
        <span>View certificate <svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg></span>
      </button>
      <div class="cert-copy">
        <p class="eyebrow">${cert.note}</p>
        <h3>${cert.title}</h3>
        <p class="cert-description">${certificateDescriptions[certificateIndex]}</p>
      </div>
    </article>`;
  document.getElementById('certCounter').textContent = `${String(certificateIndex + 1).padStart(2, '0')} / ${String(certificates.length).padStart(2, '0')}`;
  certGrid.querySelector('.cert-preview').addEventListener('click', () => openLightbox(cert.src, cert.title));
}
function changeCertificate(step) {
  certificateIndex = (certificateIndex + step + certificates.length) % certificates.length;
  renderCertificate();
}
document.getElementById('certPrev').addEventListener('click', () => changeCertificate(-1));
document.getElementById('certNext').addEventListener('click', () => changeCertificate(1));
document.querySelector('.cert-carousel').addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    const previewFocused = event.target.closest('.cert-preview');
    changeCertificate(event.key === 'ArrowLeft' ? -1 : 1);
    if (previewFocused) certGrid.querySelector('.cert-preview').focus();
  }
});
renderCertificate();

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');

let previousFocus;
function openLightbox(src, title) {
  previousFocus = document.activeElement;
  lightboxImage.src = src;
  lightboxImage.alt = title;
  document.getElementById('lightboxTitle').textContent = title;
  document.getElementById('lightboxOriginal').href = src;
  lightbox.classList.remove('hidden');
  lightbox.classList.add('flex');
  document.body.style.overflow = 'hidden';
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.add('hidden');
  lightbox.classList.remove('flex');
  lightboxImage.src = '';
  document.body.style.overflow = '';
  previousFocus?.focus();
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) closeLightbox(); });

const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const sidebarClose = document.getElementById('sidebarClose');
function closeSidebar() { sidebar.close(); }
menuBtn.addEventListener('click', () => {
  sidebar.showModal();
  menuBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  sidebarClose.focus();
});
sidebarClose.addEventListener('click', closeSidebar);
sidebar.addEventListener('close', () => {
  menuBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  menuBtn.focus();
});
sidebar.addEventListener('click', e => {
  const rect = sidebar.getBoundingClientRect();
  if (e.target === sidebar && (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom)) closeSidebar();
});
sidebar.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  closeSidebar();
  if (link.hash) {
    const section = document.querySelector(link.hash);
    if (section) requestAnimationFrame(() => { section.setAttribute('tabindex', '-1'); section.focus({preventScroll:true}); });
  }
}));

document.getElementById('year').textContent = new Date().getFullYear();
renderFilters();
renderWorks();

const themeToggle = document.getElementById('themeToggle');
function updateThemeLabel() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeToggle.innerHTML = dark ? '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg><span>Light</span>' : '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 15.5A9 9 0 0 1 8.5 4 9 9 0 1 0 20 15.5Z"/></svg><span>Dark</span>';
  themeToggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
}
themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('kaycee-theme', theme); } catch (_) {}
  updateThemeLabel();
});
updateThemeLabel();
try { sessionStorage.setItem('kaycee-intro-seen', '1'); } catch (_) {}
setTimeout(() => { document.documentElement.classList.remove('show-intro'); document.getElementById('splash').remove(); }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 4600);
lightbox.addEventListener('keydown', e => {
  if (e.key !== 'Tab') return;
  const original = document.getElementById('lightboxOriginal');
  if (e.shiftKey && document.activeElement === lightboxClose) { e.preventDefault(); original.focus(); }
  else if (!e.shiftKey && document.activeElement === original) { e.preventDefault(); lightboxClose.focus(); }
});



const backToTop = document.getElementById('backToTop');
function updateBackToTop() {
  backToTop.hidden = window.scrollY < 400;
}
window.addEventListener('scroll', updateBackToTop, { passive: true });
window.addEventListener('pageshow', updateBackToTop);
backToTop.addEventListener('click', () => {
  const home = document.getElementById('home');
  home.setAttribute('tabindex', '-1');
  home.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
});
updateBackToTop();
