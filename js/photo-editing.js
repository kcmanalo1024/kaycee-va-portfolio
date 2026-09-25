(() => {
  const photoDescriptions = {
  "09": "A sunset edit emphasizing the warm horizon and the silhouettes of the trees. A stronger color grade and controlled sky highlights create a cinematic atmosphere, while deeper foreground tones preserve the scene’s evening mood.",
  "01": "A portrait edit focused on balancing the subject’s skin, clothing, and surrounding light. The brighter, more even finish brings attention to the face and outfit while keeping the outdoor setting and fine details visible.",
  "02": "A lifestyle edit that brings a warmer, brighter feel to the family scene. Balanced exposure and skin tones help the subjects stand out from the greenery, while the richer light gives the photograph a cohesive, sunlit finish.",
  "03": "A travel edit emphasizing the contrast between the subject, rocky foreground, and mountain scenery. A more defined sky, stronger color separation, and controlled highlights give the scene greater depth and a more dramatic atmosphere.",
  "04": "A close-up portrait edit focused on a smoother, more balanced appearance while keeping facial features defined. Refined skin tones, light, and detail draw attention to the eyes and expression without losing the portrait’s warmth.",
  "05": "A portrait edit balancing strong light and shadow across the face. More even skin tones and controlled highlights create a softer finish, while the dark background maintains the intimate mood and keeps attention on the subject.",
  "06": "An editorial portrait study exploring how light, contrast, and tone can change the mood of an image. Warmer skin tones, deeper shadows, and a more directional lighting effect give the portrait a polished, dramatic character.",
  "07": "An urban edit bringing out the layers of a busy city street. Stronger contrast, clearer architectural detail, and balanced shadows help separate the buildings and traffic, while the color grade adds depth to the scene.",
  "08": "A landscape edit that brings definition to the mountain ridges and sky. Balanced highlights and shadows reveal more detail across the terrain, while richer natural colors create a clearer separation between the land and clouds."
};
  const combinedTools = new Set(['02', '03', '07', '08']);
  const photos = [
    ['01', 'Portrait Retouching', 'Skin • Clothing • Exposure • Detail', 3036, 4554],
    ['02', 'Lifestyle Photoshoot', 'Exposure • White Balance • Skin Tones • Light Balancing', 2333, 3500],
    ['03', 'Travel Photography', 'Color Grading • Contrast • Highlights/Shadows', 2299, 4096],
    ['04', 'Skin & Detail Retouching', 'Skin Correction • Detail Enhancement • Natural Retouching', 2832, 4256],
    ['05', 'Light & Skin Tone', 'Exposure • White Balance • Skin Tones • Light Balancing', 4480, 6720],
    ['06', 'Editorial Portrait', 'Color Grading • Contrast • Mood • Creative Direction', 1964, 3000],
    ['07', 'Urban Color Grade', 'Contrast • Shadow Recovery • Color Grading • Detail Enhancement', 4000, 6000],
    ['08', 'Landscape Enhancement', 'Exposure • Highlights • Shadows • Natural Color Enhancement', 5472, 3072],
    ['09', 'Cinematic Sunset Grade', 'Color Grading • Highlight Control • Atmospheric Contrast', 6961, 4640]
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
    document.getElementById('photoLocation').textContent = `${number} — ${title}`;
    document.getElementById('photoDescription').textContent = description;
    document.getElementById('photoNarrative').textContent = photoDescriptions[number];
    document.getElementById('photoTools').textContent = combinedTools.has(number) ? 'Edited with Adobe Lightroom & Adobe Photoshop' : 'Edited with Adobe Lightroom';
    panel.setAttribute('aria-labelledby', `photoTab${number}`);
    [...tabs.children].forEach((tab, i) => { tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1; });
  }
  photos.forEach(([number, title], index) => {
    const button = document.createElement('button');
    button.type = 'button'; button.id = `photoTab${number}`;
    button.setAttribute('role', 'tab'); button.setAttribute('aria-controls', 'photoPanel');
    const label = document.createElement('span');
    label.className = 'tab-title';
    label.textContent = `${number} — ${title}`;
    button.append(label);
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
