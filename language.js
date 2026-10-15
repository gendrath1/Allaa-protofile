(() => {
  const translations = [];
  const bind = (selector, english, attribute) => {
    document.querySelectorAll(selector).forEach(element => {
      translations.push({element, attribute, ar: attribute ? element.getAttribute(attribute) : element.innerHTML, en: english});
    });
  };
  bind('.skip-link', 'Skip to content');
  bind('.brand', 'Alaa Aldin, back to top', 'aria-label');
  bind('.site-header nav', 'Main navigation', 'aria-label');
  bind('nav a[href="#work"]', 'Work');
  bind('nav a[href="#about"]', 'About');
  bind('nav a[href="#contact"]', 'Contact');
  bind('#hero-title', 'Alaa Aldin<span>Jamal Saudi</span>');
  bind('.hero-role', 'Filmmaker from Balata Camp, Palestine.');
  bind('.hero-intro', 'Films and images from the place I know.<br>Stories that carry something of Palestine.');
  bind('.primary-link', 'Explore my work <span aria-hidden="true">↘</span>');
  bind('.film-ribbon', 'Frames from selected work', 'aria-label');
  bind('#work-title', 'Selected work');
  bind('.section-heading > p', 'Short films, music videos and artistic production projects from my work in Palestine.');
  const projects = [
    ['Short film · 2026', 'World Cup 2026', 'I made this film with Wadie using limited resources. After filming, we bought three pizzas for the children. That was our budget.'],
    ['Short film · Cinematography', 'Yaba', 'A short film made in collaboration with Free Marwan Now. Filming the arrest scene brought back memories of my father and cousins being arrested during the Intifada.'],
    ['Short film · Cinematography', 'Seven Stones', 'A child’s game with stones becomes a story about constraints, freedom and identity. Directed by Ahmad Naqouri, with cinematography by Alaa Aldin.'],
    ['Music video · Production manager · 2023', 'Al Radd Al Saree — Alex', 'A music project about the lives of young people in Palestine. I managed production, coordinating the shoot, crew and locations amid travel difficulties in the West Bank.'],
    ['Music and video production · 2022', 'Why Not Production', 'I founded this independent music and video project with friends and managed production. Together, we produced an album, an EP, 19 singles and nine music videos.'],
    ['Clothing and art · Founder · 2018', 'Al Darwin', 'I founded the project around the question “Where is home?” We built a clothing production process within Palestine, from design and sewing to printing and embroidery, collaborating with artists from several countries.']
  ];
  projects.forEach(([meta,title,description], i) => {
    const root = '.work-card:nth-child(' + (i + 1) + ')';
    bind(root + ' .work-meta span:first-child', meta);
    bind(root + ' h3', title);
    bind(root + ' > p', description);
  });
  const newWindow = '<span aria-hidden="true">↗</span><span class="sr-only">, opens in a new tab</span>';
  bind('.work-card:first-child > a', 'Watch the film ' + newWindow);
  bind('.work-card:nth-child(4) > a', 'Watch the video ' + newWindow);
  bind('.other-work', 'Other projects', 'aria-label');
  bind('.other-work > div:first-child h3', 'Commercial work');
  bind('.other-work > div:first-child > p:last-child', 'Alongside my film projects, I work in photography and advertising. My portfolio includes examples of this work.');
  bind('.other-work > div:nth-child(2) h3', 'Living Eyes / TALE');
  bind('.other-work > div:nth-child(2) > p:last-child', 'I worked with artist Rory on a project about our relationship with the sea. I collected notebooks from people in the camp about their memories, and filmed a short with my nephew Jamal inside a home where we projected the sea onto a wall.');
  bind('#about-title', 'About me');
  bind('.about-copy > p:nth-of-type(2)', 'My artistic journey began in 2005, at the age of nine, with traditional dabke in Balata Camp. I learned in art spaces in Nablus and the Balata and Askar camps. After 2014, I began teaching dabke and taking part in cultural initiatives.');
  bind('.about-copy > p:nth-of-type(3)', 'I did not study cinema academically. I started making videos on a phone, then developed my practice with a cinema camera. Today, I work in photography and advertising while creating space to experiment and make personal films rooted in Palestine.');
  bind('.contact h2', 'Let’s create');
  bind('.contact > p:not(.eyebrow)', 'Have a film or project in mind? Send me a message on Instagram.');
  bind('.contact-link', 'Get in touch on Instagram ' + newWindow);
  bind('.footer-line > span:last-child', 'Palestine');
  const imageAlts = {
    'alaa-behind-camera.webp': 'Alaa Aldin operating a cinema camera',
    'world-cup-boy.webp': 'A boy holding a watermelon in World Cup 2026',
    'yaba-wall.webp': 'A scene from Yaba beside the Free Marwan Free Palestine mural',
    'seven-stones-face.webp': 'A close-up of a child in Seven Stones',
    'alex-track.webp': 'A scene from the Al Radd Al Saree music video',
    'why-not-artists.webp': 'A scene from a Why Not production',
    'darwin-collective.webp': 'The team in an Al Darwin project',
    'darwin-gathering.webp': 'A gathering of artists',
    'world-cup-trophy-hq.webp': 'The trophy from World Cup 2026',
    'seven-stones-detail-hq.webp': 'Stacked stones from Seven Stones',
    'darwin-detail-hq.webp': 'A detail from Al Darwin clothing'
  };
  Object.entries(imageAlts).forEach(([file,alt]) => bind('img[src="assets/' + file + '"]:not([alt=""])', alt, 'alt'));
  const meta = document.querySelector('meta[name="description"]');
  const originalMeta = meta.content;
  const button = document.querySelector('.language-switch');
  let current = 'ar';
  function setLanguage(language) {
    current = language === 'en' ? 'en' : 'ar';
    document.documentElement.lang = current;
    document.documentElement.dir = current === 'ar' ? 'rtl' : 'ltr';
    translations.forEach(({element,attribute,ar,en}) => {
      if (attribute) element.setAttribute(attribute, current === 'ar' ? ar : en);
      else element.innerHTML = current === 'ar' ? ar : en;
    });
    document.title = current === 'ar' ? 'علاء الدين | صانع أفلام ومدير إنتاج' : 'Alaa Aldin | Filmmaker & Production Manager';
    meta.content = current === 'ar' ? originalMeta : 'Selected work by Alaa Aldin Jamal Saudi, a filmmaker and production manager from Balata Camp, Palestine.';
    button.textContent = current === 'ar' ? 'English' : 'العربية';
    button.lang = current === 'ar' ? 'en' : 'ar';
    button.setAttribute('aria-label', current === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
    try { localStorage.setItem('portfolio-language', current); } catch {}
  }
  const requested = new URL(location.href).searchParams.get('lang');
  let saved;
  try { saved = localStorage.getItem('portfolio-language'); } catch {}
  setLanguage(['ar','en'].includes(requested) ? requested : saved);
  button.hidden = false;
  button.addEventListener('click', () => {
    setLanguage(current === 'ar' ? 'en' : 'ar');
    const url = new URL(location.href);
    url.searchParams.set('lang', current);
    history.replaceState(null, '', url);
  });
})();
