(() => {
  const photos = [
    ['01', 'Portrait Retouching', 'Skin • Clothing • Exposure • Detail', 3036, 4554],
    ['02', 'Lifestyle Photoshoot', 'Exposure • White Balance • Skin Tones • Light Balancing', 2333, 3500],
    ['03', 'Travel Photography', 'Color Grading • Contrast • Highlights/Shadows', 2299, 4096],
    ['04', 'Skin & Detail Retouching', 'Skin Correction • Detail Enhancement • Natural Retouching', 2832, 4256],
    ['05', 'Light & Skin Tone', 'Exposure • White Balance • Skin Tones • Light Balancing', 4480, 6720],
    ['07', 'Editorial Portrait', 'Color Grading • Contrast • Mood • Creative Direction', 1964, 3000],
    ['08', 'Urban Color Grade', 'Contrast • Shadow Recovery • Color Grading • Detail Enhancement', 4000, 6000],
    ['09', 'Landscape Enhancement', 'Exposure • Highlights • Shadows • Natural Color Enhancement', 5472, 3072],
    ['10', 'Cinematic Sunset Grade', 'Color Grading • Highlight Control • Atmospheric Contrast', 6961, 4640]
  ];
  document.getElementById('photoPieceCount').textContent = `${photos.length} pieces`;
  const tabs = document.getElementById('photoTabs');
  const panel = document.getElementById('photoPanel');
  const frame = document.getElementById('photoComparison');
  const before = document.getElementById('photoBefore');
  const after = document.getElementById('photoAfter');
  const beforeButton = document.getElementById('showBefore');
  const afterButton = document.getElementById('showAfter');
  let current = 0;
  let generation = 0;
  function setVersion(edited) {
    frame.classList.toggle('is-after', edited);
    before.setAttribute('aria-hidden', String(edited));
    after.setAttribute('aria-hidden', String(!edited));
    beforeButton.setAttribute('aria-pressed', String(!edited));
    afterButton.setAttribute('aria-pressed', String(edited));
    document.getElementById('photoStatus').textContent = edited ? 'Showing AFTER' : 'Showing BEFORE';
  }
  function showPhoto(index) {
    current = index;
    document.getElementById('photoCounter').textContent = `${String(index + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')}`;
    const [number, title, description, width, height] = photos[index];
    const token = ++generation;
    frame.classList.add('is-changing');
    setVersion(false);
    afterButton.disabled = true;
    after.onload = () => { if (token === generation) afterButton.disabled = false; };
    after.onerror = () => { if (token === generation) document.getElementById('photoStatus').textContent = 'The edited photo could not load. Please select this tab to retry.'; };
    before.onload = () => { if (token === generation) frame.classList.remove('is-changing'); };
    before.src = `assets/images/photo-editing/Before - ${title}.jpg`;
    after.src = `assets/images/photo-editing/After - ${title}.jpg`;
    before.alt = `${number} — ${title} — BEFORE`;
    after.alt = `${number} — ${title} — AFTER`;
    frame.style.setProperty('--photo-ratio', `${width} / ${height}`);
    frame.style.setProperty('--photo-width', `${Math.min(640, 520 * width / height)}px`);
    document.getElementById('photoTitle').textContent = `${number} — ${title}`;
    document.getElementById('photoDescription').textContent = description;
    panel.setAttribute('aria-labelledby', `photoTab${number}`);
    [...tabs.children].forEach((tab, i) => { tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1; });
  }
  photos.forEach(([number, title], index) => {
    const button = document.createElement('button');
    button.type = 'button'; button.id = `photoTab${number}`;
    button.setAttribute('role', 'tab'); button.setAttribute('aria-controls', 'photoPanel');
    button.textContent = `${number} — ${title}`;
    button.addEventListener('click', () => showPhoto(index));
    tabs.append(button);
  });
  tabs.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const index = event.key === 'Home' ? 0 : event.key === 'End' ? photos.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + photos.length) % photos.length;
    showPhoto(index); tabs.children[index].focus();
  });
  beforeButton.addEventListener('click', () => setVersion(false));
  afterButton.addEventListener('click', () => setVersion(true));
  document.getElementById('photoPrev').addEventListener('click', () => showPhoto((current - 1 + photos.length) % photos.length));
  document.getElementById('photoNext').addEventListener('click', () => showPhoto((current + 1) % photos.length));
  showPhoto(0);
})();
