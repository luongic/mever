/**
 * LUONGiC - Spider-Man & FC Barcelona Themed Portfolio Logic
 * Script handles:
 *  - Canvas Spider-Web Interactive Particles
 *  - Typewriter Hero Animation
 *  - Dynamic Projects Rendering & Tab Filters
 *  - Interactive "Spider-Sense" Mode Trigger
 *  - Preloader, Scrollspy, and Mobile Nav Toggle
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     PRELOADER SCREEN
     ========================================================================== */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    // Hand the page over as soon as it is ready - no artificial hold.
    window.addEventListener('load', () => {
      preloader.style.opacity = '0';
      setTimeout(() => preloader.remove(), 300);
    });
  }

  /* ==========================================================================
     MOBILE NAVIGATION TOGGLE
     ========================================================================== */
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');
  const body = document.querySelector('body');

  document.querySelectorAll('.mobile-nav-toggle').forEach((el) => {
    el.addEventListener('click', function (event) {
      event.preventDefault();
      mobileNavToggle();
    });
  });

  function mobileNavToggle() {
    body.classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  // Close the drawer when the dimmed overlay is clicked. The overlay is
  // .navbar's ::before, so those clicks land on .navbar itself; anything
  // inside the panel is a descendant and must be ignored.
  const navbarEl = document.getElementById('navbar');
  if (navbarEl) {
    navbarEl.addEventListener('click', (event) => {
      if (
        event.target === navbarEl &&
        body.classList.contains('mobile-nav-active')
      ) {
        mobileNavToggle();
      }
    });
  }

  /* --------------------------------------------------------------------------
     Below 991px the header collapses to a hamburger, so the social links move
     into the drawer rather than being duplicated in the markup. The element is
     relocated, not cloned, so there is only ever one copy in the DOM.
     -------------------------------------------------------------------------- */
  const socialLinks = document.querySelector('.header-social-links');
  const navList = navbarEl && navbarEl.querySelector('ul');

  if (socialLinks && navList) {
    const headerParent = socialLinks.parentNode;
    const headerAnchor = socialLinks.nextSibling; // put it back in the same slot
    const navSlot = document.createElement('li');
    navSlot.className = 'nav-social';

    const compact = window.matchMedia('(max-width: 991px)');

    const placeSocialLinks = () => {
      if (compact.matches) {
        if (socialLinks.parentNode !== navSlot) {
          navSlot.appendChild(socialLinks);
          navList.appendChild(navSlot);
        }
      } else if (navSlot.parentNode) {
        headerParent.insertBefore(socialLinks, headerAnchor);
        navSlot.remove();
      }
    };

    placeSocialLinks();
    compact.addEventListener('change', placeSocialLinks);
  }

  /* ==========================================================================
     YEARS OF EXPERIENCE
     Counted in whole calendar months from data-since, then floored to half a
     year so the figure reads the way a CV does ("3.5+", "4+") and never
     rounds up to a length not yet worked. The value in the markup is the
     no-JS fallback.
     ========================================================================== */
  document.querySelectorAll('.years-count').forEach((el) => {
    const since = new Date(`${el.dataset.since}T00:00:00`);
    if (Number.isNaN(since.getTime())) return;

    const now = new Date();
    let months =
      (now.getFullYear() - since.getFullYear()) * 12 +
      (now.getMonth() - since.getMonth());
    if (now.getDate() < since.getDate()) months -= 1;
    if (months < 0) months = 0;

    const halfYears = Math.floor(months / 6) / 2;
    el.textContent = Number.isInteger(halfYears)
      ? String(halfYears)
      : halfYears.toFixed(1);
  });

  // Close mobile nav when clicking a link
  document.querySelectorAll('#navbar a').forEach((navbarlink) => {
    if (!navbarlink.hash) return;
    navbarlink.addEventListener('click', () => {
      if (body.classList.contains('mobile-nav-active')) {
        mobileNavToggle();
      }
    });
  });

  /* ==========================================================================
     CONTEXT MENU WITH CONTACT LINKS
     ========================================================================== */
  const contactMenuItems = [
    {
      label: 'Download CV',
      href: 'assets/files/LeHienLuong_Resume.docx',
      icon: 'bi bi-file-earmark-arrow-down-fill',
      accent: 'text-web',
      download: true,
    },
    {
      label: 'Email',
      href: 'mailto:luongle249@gmail.com',
      icon: 'bi bi-envelope-at-fill',
      accent: 'text-crimson',
    },
    {
      label: 'Phone',
      href: 'tel:+84398123320',
      icon: 'bi bi-telephone-fill',
      accent: 'text-gold',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/luongleee/',
      icon: 'bi bi-linkedin',
      accent: 'text-blue',
    },
    {
      label: 'GitHub',
      href: 'https://github.com/luongic',
      icon: 'bi bi-github',
      accent: 'text-web',
    },
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/luongic',
      icon: 'bi bi-facebook',
      accent: 'text-crimson',
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/luongleee/',
      icon: 'bi bi-instagram',
      accent: 'text-gold',
    },
  ];

  const contactMenu = document.createElement('div');
  contactMenu.id = 'context-contact-menu';
  contactMenu.className = 'context-contact-menu';

  const contactMenuHeader = document.createElement('div');
  contactMenuHeader.className = 'context-contact-menu-header';
  contactMenuHeader.innerHTML = '<span>My Contacts</span>';
  contactMenu.appendChild(contactMenuHeader);

  contactMenuItems.forEach(({ label, href, icon, accent, download }) => {
    const menuItem = document.createElement('a');
    menuItem.href = href;
    menuItem.className = 'context-contact-menu-item';
    menuItem.innerHTML = `
      <i class="${icon} ${accent}"></i>
      <span>${label}</span>
    `;

    if (download) {
      menuItem.setAttribute('download', 'LeHienLuong_Resume.docx');
    }

    if (href.startsWith('http')) {
      menuItem.target = '_blank';
      menuItem.rel = 'noopener noreferrer';
    }

    contactMenu.appendChild(menuItem);
  });

  body.appendChild(contactMenu);

  function hideContactMenu() {
    contactMenu.classList.remove('visible');
  }

  function showContactMenu(clientX, clientY) {
    contactMenu.classList.add('visible');

    const menuWidth = contactMenu.offsetWidth || 220;
    const menuHeight = contactMenu.offsetHeight || 260;

    const maxLeft = window.innerWidth - menuWidth - 16;
    const maxTop = window.innerHeight - menuHeight - 16;

    contactMenu.style.left = `${Math.min(Math.max(clientX + 14, 16), maxLeft)}px`;
    contactMenu.style.top = `${Math.min(Math.max(clientY + 14, 16), maxTop)}px`;
  }

  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    showContactMenu(event.clientX, event.clientY);
  });

  document.addEventListener('click', (event) => {
    if (!contactMenu.contains(event.target)) {
      hideContactMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      hideContactMenu();
    }
  });

  window.addEventListener('resize', hideContactMenu);

  /* ==========================================================================
     HERO TYPEWRITER ANIMATION
     ========================================================================== */
  const typedWordElement = document.getElementById('typed-text');
  const words = [
    'Web Developer',
    'Team Leader',
    'Frontend Playmaker',
    'Spidey Fan',
    'FCB & Messi Fan',
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typedWordElement) return;
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typedWordElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Deleting is faster
    } else {
      typedWordElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typingSpeed = 1500; // Pause at full word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  if (typedWordElement) {
    setTimeout(typeEffect, 800);
  }

  /* ==========================================================================
     SPIDER-SENSE MODE — COLOUR THEME CYCLER
     Cycles the palette red -> blue -> yellow. The applied theme is just an
     attribute on <html>; every colour token is redefined per [data-theme] in
     styles.css, so nothing here touches individual elements. The choice is
     stored in localStorage and re-applied by the inline bootstrap in <head>,
     which runs before first paint.
     ========================================================================== */
  const THEMES = [
    { id: 'red', label: 'Crimson' },
    { id: 'blue', label: 'Web Blue' },
    { id: 'yellow', label: "Ballon d'Or" },
  ];
  const THEME_KEY = 'luongic-theme';
  const spideySenseBtn = document.getElementById('spider-sense-btn');

  if (spideySenseBtn) {
    let toast = null;
    let toastTimer = null;

    const currentThemeIndex = () => {
      const applied = document.documentElement.getAttribute('data-theme');
      const index = THEMES.findIndex((theme) => theme.id === applied);
      return index === -1 ? 0 : index;
    };

    const showToast = (theme) => {
      if (!toast) {
        toast = document.createElement('div');
        toast.className = 'theme-toast';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        body.appendChild(toast);
      }
      toast.innerHTML =
        '<i class="bi bi-lightning-charge-fill"></i>' +
        '<span>Spider-Sense: ' +
        theme.label +
        '</span>' +
        '<span class="theme-toast-swatches">' +
        '<span></span><span></span><span></span></span>';

      // Reflow so the transition replays when the same node is reused
      void toast.offsetWidth;
      toast.classList.add('visible');

      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove('visible'), 2200);
    };

    const applyTheme = (theme, announce) => {
      document.documentElement.setAttribute('data-theme', theme.id);
      spideySenseBtn.setAttribute(
        'aria-label',
        `Spider-Sense Mode: ${theme.label} theme. Activate to change colours.`,
      );
      try {
        localStorage.setItem(THEME_KEY, theme.id);
      } catch (err) {
        /* storage blocked - the theme simply will not persist */
      }
      if (announce) showToast(theme);
    };

    // Sync the label with whatever the head bootstrap already applied
    applyTheme(THEMES[currentThemeIndex()], false);

    spideySenseBtn.addEventListener('click', () => {
      applyTheme(THEMES[(currentThemeIndex() + 1) % THEMES.length], true);
    });
  }

  /* ==========================================================================
     HERO PORTRAIT PARALLAX
     Pointer position drives --px / --py on the stage; each layer in the CSS
     consumes them at a different multiplier, so the cut-out separates from
     the disc behind it. Silent no-op when the user prefers reduced motion.
     ========================================================================== */
  const avatarStage = document.getElementById('avatar-stage');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (avatarStage && !reduceMotion.matches) {
    const MAX_SHIFT = 14; // px the cut-out may travel from centre
    let frame = null;

    const applyShift = (relX, relY) => {
      frame = null;
      avatarStage.style.setProperty(
        '--px',
        `${(relX * MAX_SHIFT).toFixed(2)}px`,
      );
      avatarStage.style.setProperty(
        '--py',
        `${(relY * MAX_SHIFT).toFixed(2)}px`,
      );
    };

    const queueShift = (relX, relY) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => applyShift(relX, relY));
    };

    const heroSection = avatarStage.closest('.hero') || avatarStage;

    heroSection.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'touch') return;
      const rect = heroSection.getBoundingClientRect();
      // -1 .. 1 relative to the centre of the hero
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;
      queueShift(relX * 2, relY * 2);
    });

    heroSection.addEventListener('pointerleave', () => queueShift(0, 0));
  }

  /* ==========================================================================
     CANVAS SPIDER-WEB INTERACTION - DISABLED
     The particle field was switched off; the <canvas> in index.html and the
     #spidey-web-canvas rule in styles.css are commented out to match. The
     implementation is kept below so it can be restored: uncomment this block,
     the canvas element, and the CSS rule.
     ========================================================================== */

  //   /* ==========================================================================
  //      CANVAS SPIDER-WEB INTERACTION
  //      ========================================================================== */
  //   const canvas = document.getElementById('spidey-web-canvas');
  //   if (canvas) {
  //     const ctx = canvas.getContext('2d');
  //     let particles = [];
  //     const maxParticles = 65;
  //     const connectionDist = 120;
  //     let mouse = { x: null, y: null, active: false };
  //
  //     function resizeCanvas() {
  //       canvas.width = window.innerWidth;
  //       canvas.height = window.innerHeight;
  //     }
  //     resizeCanvas();
  //     window.addEventListener('resize', resizeCanvas);
  //
  //     window.addEventListener('mousemove', (e) => {
  //       mouse.x = e.clientX;
  //       mouse.y = e.clientY;
  //       mouse.active = true;
  //     });
  //
  //     window.addEventListener('mouseleave', () => {
  //       mouse.active = false;
  //     });
  //
  //     // Web shoot on click
  //     window.addEventListener('click', (e) => {
  //       if (
  //         e.target.tagName === 'A' ||
  //         e.target.tagName === 'BUTTON' ||
  //         e.target.closest('a') ||
  //         e.target.closest('button')
  //       )
  //         return;
  //       shootWeb(e.clientX, e.clientY);
  //     });
  //
  //     class Particle {
  //       constructor(x, y) {
  //         this.x = x || Math.random() * canvas.width;
  //         this.y = y || Math.random() * canvas.height;
  //         this.vx = (Math.random() - 0.5) * 0.8;
  //         this.vy = (Math.random() - 0.5) * 0.8;
  //         this.radius = Math.random() * 2.5 + 1;
  //         this.color =
  //           Math.random() > 0.5
  //             ? 'rgba(0, 0, 0, 0.4)'
  //             : 'rgba(255, 84, 112, 0.75)'; // Ink or main, flat
  //       }
  //
  //       update() {
  //         this.x += this.vx;
  //         this.y += this.vy;
  //
  //         // Collision bounds
  //         if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
  //         if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  //       }
  //
  //       draw() {
  //         ctx.beginPath();
  //         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  //         ctx.fillStyle = this.color;
  //         ctx.fill();
  //       }
  //     }
  //
  //     function initParticles() {
  //       particles = [];
  //       for (let i = 0; i < maxParticles; i++) {
  //         particles.push(new Particle());
  //       }
  //     }
  //     initParticles();
  //
  //     function shootWeb(x, y) {
  //       for (let i = 0; i < 8; i++) {
  //         const p = new Particle(x, y);
  //         p.vx = (Math.random() - 0.5) * 4;
  //         p.vy = (Math.random() - 0.5) * 4;
  //         p.color = 'rgba(255, 84, 112, 0.9)'; // Main colour on click
  //         particles.push(p);
  //         if (particles.length > maxParticles + 15) {
  //           particles.shift();
  //         }
  //       }
  //     }
  //
  //     function animate() {
  //       ctx.clearRect(0, 0, canvas.width, canvas.height);
  //
  //       particles.forEach((p) => {
  //         p.update();
  //         p.draw();
  //       });
  //
  //       // Draw web lines
  //       for (let i = 0; i < particles.length; i++) {
  //         for (let j = i + 1; j < particles.length; j++) {
  //           const dx = particles[i].x - particles[j].x;
  //           const dy = particles[i].y - particles[j].y;
  //           const dist = Math.sqrt(dx * dx + dy * dy);
  //
  //           if (dist < connectionDist) {
  //             const alpha = (1 - dist / connectionDist) * 0.15;
  //             ctx.strokeStyle = `rgba(0, 0, 0, ${alpha * 1.6})`; // Black web line
  //             ctx.lineWidth = 0.5;
  //             ctx.beginPath();
  //             ctx.moveTo(particles[i].x, particles[i].y);
  //             ctx.lineTo(particles[j].x, particles[j].y);
  //             ctx.stroke();
  //           }
  //         }
  //
  //         // Connect mouse to nearby particles
  //         if (mouse.active) {
  //           const dx = particles[i].x - mouse.x;
  //           const dy = particles[i].y - mouse.y;
  //           const dist = Math.sqrt(dx * dx + dy * dy);
  //
  //           if (dist < connectionDist + 30) {
  //             const alpha = (1 - dist / (connectionDist + 30)) * 0.25;
  //             ctx.strokeStyle = `rgba(0, 0, 0, ${alpha * 1.8})`; // Black cursor web
  //             ctx.lineWidth = 0.7;
  //             ctx.beginPath();
  //             ctx.moveTo(particles[i].x, particles[i].y);
  //             ctx.lineTo(mouse.x, mouse.y);
  //             ctx.stroke();
  //           }
  //         }
  //       }
  //
  //       requestAnimationFrame(animate);
  //     }
  //     animate();
  //   }

  /* ==========================================================================
     DYNAMIC TROPHY ROOM RENDERING & FILTERS
     ========================================================================== */
  const projectsData = [
    {
      name: 'OLMS — Custom Uniform CRM & ERP Platform',
      category: 'personal',
      categoryLabel: 'Friendly (Personal Demo)',
      desc: 'Integrated CRM + ERP modular monolith platform specialized in custom uniform manufacturing. Built with DDD, Clean Architecture, NestJS, React, TypeORM, Redis, BullMQ & MUI across 13 core modules.',
      url: 'assets/img/olms.webp',
      link: 'https://olms-fe.vercel.app',
      git: 'https://github.com/luongic/olms',
      tags: [
        'NestJS',
        'React',
        'TypeScript',
        'DDD',
        'Modular Monolith',
        'TypeORM',
        'MUI',
      ],
    },
    {
      name: 'Automotive CRM & Commerce Ecosystem',
      category: 'professional',
      categoryLabel: 'Championship (Commercial)',
      desc: 'Architected a unified automotive ecosystem linking three business modules (sales, rentals, e-commerce). Improved organic indexing using Next.js SSR/SSG. Integrated banking APIs.',
      url: 'assets/img/automotive_crm.webp',
      link: 'https://hanbiro.vn/',
      git: '#',
      tags: ['Next.js', 'React', 'SSR/SSG', 'REST API', 'Zustand'],
    },
    {
      name: 'BI system',
      category: 'professional',
      categoryLabel: 'Championship (Commercial)',
      desc: 'Developed an interactive Business Intelligence (BI) dashboard modeled after Tableau/PowerBI. Enables visual data analysis by dynamically rendering dashboards and charts from imported tabular sources (Excel) or active database connections.',
      url: 'assets/img/bi_system.webp',
      link: 'https://hanbiro.vn/',
      git: '#',
      tags: ['React', 'D3.js', 'SQL', 'Data Visualization'],
    },
    {
      name: 'Groupware new V3',
      category: 'professional',
      categoryLabel: 'Championship (Commercial)',
      desc: 'Reconstructed core client layouts for a large enterprise platform, consolidating calendars, messaging frames, and tasks. Optimized widget load efficiency.',
      url: 'assets/img/groupware_v3.webp',
      link: 'https://hanbiro.vn/',
      git: '#',
      tags: ['React.js', 'Recoil', 'Material UI', 'Socket.io'],
    },
    {
      name: 'Vora Project CRM Platform',
      category: 'professional',
      categoryLabel: 'Championship (Commercial)',
      desc: 'Maintained and scaled an automated sales pipeline CRM managing pricing calculators, contract flows, and products. Refactored legacy UI components.',
      url: 'assets/img/vora_crm.webp',
      link: 'https://hanbiro.vn/',
      git: '#',
      tags: ['React.js', 'Redux', 'MUI', 'REST API'],
    },
    // {
    //   name: "Order Pizza Hut Clone",
    //   category: "personal",
    //   categoryLabel: "Friendly (Personal Demo)",
    //   desc: "Dynamic pizza customizer and order manager platform with shopping cart integration and responsive checkout paths.",
    //   url: "assets/img/orderpizza.png",
    //   link: "https://pizzahutvn.netlify.app/",
    //   git: "https://github.com/luongic/pizza",
    //   tags: ["React.js", "Redux", "Bootstrap"]
    // },
    // {
    //   name: "Mini Music Player",
    //   category: "personal",
    //   categoryLabel: "Friendly (Personal Demo)",
    //   desc: "Interactive audio visualizer and music player containing full audio controls, volume bars, and playlist selectors.",
    //   url: "assets/img/musicplayer.png",
    //   link: "https://luongic.github.io/m2p/",
    //   git: "https://github.com/luongic/m2p",
    //   tags: ["HTML5", "CSS3", "JavaScript"]
    // },
    // {
    //   name: "Dummy Shopee Shop Layout",
    //   category: "personal",
    //   categoryLabel: "Friendly (Personal Demo)",
    //   desc: "A fully custom CSS grid layout replication of the Shopee store ecommerce layout, responsive down to mobile sizes.",
    //   url: "assets/img/shopeeUI.png",
    //   link: "https://shopeeredux.netlify.app/",
    //   git: "https://github.com/luongic/shopeereact",
    //   tags: ["React.js", "Redux", "CSS Grid"]
    // },
    {
      name: 'GenZ Production',
      category: 'professional',
      categoryLabel: 'Championship (Commercial)',
      desc: 'Cinematic media & production house showcase platform. Built with Next.js & Ant Design featuring futuristic dark cyberpunk UI, video showcase, interactive equipment catalog, and responsive layouts.',
      url: 'assets/img/genz_production.webp',
      link: 'https://genz-production.vercel.app/',
      git: '#',
      tags: ['Next.js', 'React', 'Ant Design', 'Tailwind CSS', 'UI/UX'],
    },
    {
      name: 'Sash Room — Graduation Flower Sashes',
      category: 'professional',
      categoryLabel: 'Championship (Commercial)',
      desc: 'Handcrafted graduation flower sashes web store & showcase platform in HCMC. Features soft pastel aesthetic, interactive custom order options, responsive gallery, and floating petal visual effects.',
      url: 'assets/img/sashroom.webp',
      link: 'https://sashroom.vercel.app/',
      git: '#',
      tags: [
        'HTML5',
        'CSS3',
        'JavaScript',
        'Responsive Web Design',
        'E-commerce UI',
      ],
    },
    {
      name: 'Virtual Tour 360',
      category: 'personal',
      categoryLabel: 'Friendly (Personal Demo)',
      desc: 'Interactive 360° project showcase with horizontal drag-to-rotate panorama across 61 frames, intro video, day/night toggle, and adjustable drag sensitivity. Built with plain HTML/CSS/JS with no build step.',
      url: 'assets/img/virtual-tour360.webp',
      link: 'https://virtual-tour360-test.vercel.app',
      git: 'https://github.com/luongic/virtualTour360Test',
      tags: [
        'HTML5',
        'CSS3',
        'JavaScript',
        '360° Tour',
        'Interactive UI',
        'Pointer Events',
      ],
    },
    {
      name: 'HackerRank CSS Certificate',
      category: 'certification',
      categoryLabel: "Ballon d'Or (Certificate)",
      desc: 'HackerRank validation checking advanced selectors, flexbox, Grid, custom responsive rules, and layout structures.',
      url: 'assets/img/certifycateCSSHackerrank.webp',
      link: 'https://www.hackerrank.com/certificates/b41839f800cd',
      git: '#',
      tags: ['CSS3', 'Hackerrank', 'Layouts'],
    },
    {
      name: 'HackerRank React Developer Certificate',
      category: 'certification',
      categoryLabel: "Ballon d'Or (Certificate)",
      desc: 'HackerRank developer certificate validating components composition, state hook lifecycles, and context states.',
      url: 'assets/img/certifycateReactHackerrank.webp',
      link: 'https://www.hackerrank.com/certificates/894129fd9b89',
      git: '#',
      tags: ['React', 'State Management', 'Hooks'],
    },
    {
      name: 'Highest ranking archive — 34th global ranking',
      category: 'certification',
      categoryLabel: "Ballon d'Or (Certificate)",
      desc: 'Highest ranking archive: 34th global ranking on CSSBattle.dev.',
      url: 'assets/img/cssbattle34th.webp',
      link: 'https://cssbattle.dev/player/luongleee',
      git: '#',
      tags: ['CSSBattle', 'Frontend', 'Rankings'],
    },
  ];

  const trophyGrid = document.getElementById('trophy-grid');
  // Held across renders so the previous instance can be torn down; without
  // this every filter click stacked another GLightbox on the same page.
  let lightbox = null;

  function renderTrophies(filterCategory = 'all') {
    if (!trophyGrid) return;

    // Filter logic
    const filtered =
      filterCategory === 'all'
        ? projectsData
        : projectsData.filter((item) => item.category === filterCategory);

    const html = filtered
      .map((item) => {
        const gitLink =
          item.git !== '#'
            ? `<a href="${item.git}" target="_blank" title="GitHub Source" class="github-link"><i class="bi bi-github"></i></a>`
            : '';

        const tagsHtml = item.tags
          .map((tag) => `<span class="tech-badge">${tag}</span>`)
          .join('');

        return `
        <div class="col-xl-3 col-lg-4 col-md-6 trophy-item" data-category="${item.category}">
          <div class="gallery-item glass-card h-100 p-0">
            <div class="gallery-img-container">
              <img src="${item.url}" class="img-fluid" alt="${item.name}" loading="lazy" decoding="async">
              <div class="gallery-links">
                <a href="${item.link}" target="_blank" title="Visit Live App" class="preview-link"><i class="bi bi-box-arrow-up-right"></i></a>
                ${gitLink}
                <a href="${item.url}" class="glightbox details-link" data-gallery="trophy-gallery" data-title="${item.name}" data-description="${item.desc}"><i class="bi bi-zoom-in"></i></a>
              </div>
            </div>
            <div class="gallery-info">
              <div class="project-category">${item.categoryLabel}</div>
              <h3 class="project-title">${item.name}</h3>
              <p class="project-desc">${item.desc}</p>
              <div class="tech-tags mt-2">
                ${tagsHtml}
              </div>
            </div>
          </div>
        </div>
      `;
      })
      .join('');

    trophyGrid.innerHTML = html;

    // Rebind the lightbox to the cards that were just rendered
    if (lightbox) lightbox.destroy();
    lightbox = GLightbox({
      selector: '.glightbox',
    });
  }

  // Initial render
  renderTrophies('all');

  // Attachment of filter buttons listeners
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');
      renderTrophies(filterValue);
    });
  });

  /* ==========================================================================
     SCROLL DETECTION (STICKY HEADER, SCROLLSPY, BACK TO TOP)
     ========================================================================== */
  const header = document.querySelector('#header');
  const scrollTop = document.querySelector('.scroll-top');
  const navItems = document.querySelectorAll('#navbar .nav__item');
  const sections = document.querySelectorAll('section');

  const handleScroll = () => {
    const scrollPos = window.scrollY;

    // Sticky Header
    if (scrollPos > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }

    // Scroll Top Button
    if (scrollPos > 100) {
      scrollTop.classList.add('active');
    } else {
      scrollTop.classList.remove('active');
    }

    // ScrollSpy active updates
    let currentSectionId = 'hero';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navItems.forEach((item) => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentSectionId}`) {
        item.classList.add('active');
      }
    });

    // Check if bottom of page reached, set projects active
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 50
    ) {
      navItems.forEach((item) => item.classList.remove('active'));
      const projItem = document.querySelector('#navbar a[href="#projects"]');
      if (projItem) projItem.classList.add('active');
    }
  };

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('load', handleScroll);

  // Smooth scroll scroll-top button trigger
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  /* ==========================================================================
     AOS INITIALIZATION
     ========================================================================== */
  function aosInit() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }
  window.addEventListener('load', aosInit);
});
