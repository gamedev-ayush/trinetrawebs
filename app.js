const GAME_DATA = {
  "project-glyph": {
    id: "project-glyph",
    title: "GLYPH",
    subtitle: "Where letters become weapons",
    description: "GLYPH is a 2D puzzle-platformer where every letter holds unique power—serving as both a weapon and a tool. Harness these abilities to unravel mysteries, overcome challenges, and ultimately escape to victory.",
    genre: "Puzzle/Platformer",
    platforms: ["PC", "Mobiles"],
    status: "Pre-Production",
    releaseDate: "April 23, 2025",
    trailer: "https://www.youtube.com/embed/zKTTZNup2Cc?si=UikDXTIX_gwj6JUb", // 
    screenshots: [
        "https://img.itch.zone/aW1hZ2UvMzk1MzMwNC8yMzU3NjA3My5qcGc=/original/npGM%2Bl.jpg", // <-- Replace with your image link
        "https://img.itch.zone/aW1hZ2UvMzk1MzMwNC8yMzU3NjA3MS5qcGc=/original/OwGU0h.jpg", // <-- Replace with your image link
        "https://img.itch.zone/aW1hZ2UvMzk1MzMwNC8yMzU3NjA3MC5qcGc=/original/dYSQEw.jpg", // <-- Replace with your image link
        "https://img.itch.zone/aW1hZ2UvMzk1MzMwNC8yMzU3NjA3Mi5qcGc=/original/n7BNaa.jpg"  // <-- Replace with your image link
    ],
    features: [
      "Procedural level generation",
      "Adaptive soundtrack",
      "Multiple character skins",
      "Global leaderboards",
      "Achievement system"
    ],
    team: [
      "Nitin Burli - Game Director",
      "Adamya Gupta & Phan Thanh Duc - Lead Programmer",
      "Manish, Admya, Phan Thanh Duc, Sanjay, Ayush - Gameplay Programmers",
      "Aditya & Drew - Level Designer",
      "Music - Zsombor"
    ],
    systemReqs: {
      minimum: "null",
      recommended: "null"
    },
    downloads: {
      itch: "https://sanjaythedev.itch.io/glyph",
    },
    rating: null
  },
  "project-neo": {
    id: "project-neo",
    title: "Project NEO",
    subtitle: "null",
    description: "Based on Indian Culture",
    genre: "null",
    platforms: ["PC", "Mac", "PlayStation 5", "Xbox Series X/S"],
    status: "IDEATION",
    releaseDate: "null",
    trailer: null,
    screenshots: [],
    features: ["null"],
    team: ["null"],
    systemReqs: {
      minimum: "null",
      recommended: "null"
    },
    downloads: {
      itch: "https://sanjaythedev.itch.io/glyph",
    },
    rating: null
  }
};

// Pure Monochrome Theme Toggle System
class MonochromeThemeSystem {
  constructor() {
    this.toggle = document.getElementById('themeToggle');
    this.toggleIcon = this.toggle?.querySelector('.toggle-icon');
    this.init();
  }

  init() {
    if (!this.toggle) return;

    this.initTheme();
    this.toggle.addEventListener('click', () => this.toggleTheme());

    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        const savedTheme = localStorage.getItem('nexus-monochrome-theme');
        if (!savedTheme) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  initTheme() {
    const savedTheme = localStorage.getItem('nexus-monochrome-theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    this.setTheme(initialTheme);
  }

  toggleTheme() {
    const currentTheme = document.documentElement.dataset.theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('nexus-monochrome-theme', theme);
    this.updateThemeIcon(theme);
    console.log(`NEXUS STUDIOS - Switched to ${theme} monochrome theme`);
  }

  updateThemeIcon(theme) {
    if (!this.toggleIcon) return;
    this.toggleIcon.textContent = theme === 'dark' ? '◑' : '◐';
  }
}

// Game Modal System - Pure Monochrome
class GameModalSystem {
  constructor() {
    this.modal = document.getElementById('gameModal');
    this.closeBtn = document.getElementById('modalClose');
    this.overlay = this.modal?.querySelector('.modal-overlay');
    this.gameViewBtns = document.querySelectorAll('.game-view-btn');
    this.init();
  }

  init() {
    if (!this.modal) return;

    this.gameViewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => this.handleGameViewClick(e));
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.closeModal();
      });
    }

    if (this.overlay) {
      this.overlay.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.closeModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
        this.closeModal();
      }
    });
  }

  handleGameViewClick(e) {
    e.preventDefault();
    const gameCard = e.target.closest('.game-card');
    if (!gameCard) return;

    const gameId = gameCard.getAttribute('data-game');
    const gameData = GAME_DATA[gameId];

    if (gameData) {
      this.openModal(gameData);
    }
  }

  openModal(gameData) {
    this.populateModalContent(gameData);
    this.modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    this.modal.style.opacity = '0';
    setTimeout(() => {
      this.modal.style.transition = 'opacity 0.3s ease';
      this.modal.style.opacity = '1';
    }, 10);
  }

  closeModal() {
    this.modal.style.opacity = '0';
    setTimeout(() => {
      this.modal.classList.add('hidden');
      document.body.style.overflow = '';
      this.modal.style.transition = '';
    }, 300);
  }

  populateModalContent(game) {
    const title = this.modal.querySelector('.game-detail-title');
    if (title) title.textContent = game.title;
    const subtitle = this.modal.querySelector('.game-detail-subtitle');
    if (subtitle) subtitle.textContent = game.subtitle;
    const descriptionText = this.modal.querySelector('.description-text');
    if (descriptionText) descriptionText.textContent = game.description;
    
    // === UPDATE TRAILER AND SCREENSHOTS ===
    const trailerContainer = this.modal.querySelector('.game-trailer-container');
    if (trailerContainer) {
        if (game.trailer) {
            trailerContainer.innerHTML = `<iframe src="${game.trailer}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        } else {
            trailerContainer.innerHTML = '<div class="video-placeholder"><span>No Trailer Available</span></div>';
        }
    }

    const screenshotsGrid = this.modal.querySelector('.screenshots-grid');
    if (screenshotsGrid) {
        if (game.screenshots && game.screenshots.length > 0) {
            screenshotsGrid.innerHTML = game.screenshots.map(src => `<img src="${src}" alt="Screenshot of ${game.title}" class="screenshot-img">`).join('');
        } else {
            screenshotsGrid.innerHTML = '<div class="screenshot-placeholder"><span>No Screenshots Available</span></div>';
        }
    }

    const featuresList = this.modal.querySelector('.features-list');
    if (featuresList && game.features) {
      featuresList.innerHTML = game.features.map(feature => `<li>${feature}</li>`).join('');
    }

    const genreInfo = this.modal.querySelector('.game-genre-info');
    if (genreInfo) genreInfo.textContent = game.genre;
    const releaseDate = this.modal.querySelector('.game-release-date');
    if (releaseDate) releaseDate.textContent = game.releaseDate;
    const rating = this.modal.querySelector('.game-rating');
    if (rating) rating.textContent = game.rating ? `${game.rating}/5.0` : 'Not yet rated';

    const platformsList = this.modal.querySelector('.platforms-list');
    if (platformsList && game.platforms) {
      platformsList.innerHTML = game.platforms.map(platform =>
        `<div class="platform-tag">${platform}</div>`
      ).join('');
    }

    const teamList = this.modal.querySelector('.team-list');
    if (teamList && game.team) {
      teamList.innerHTML = game.team.map(member =>
        `<div class="team-member">${member}</div>`
      ).join('');
    }

    const downloadLinks = this.modal.querySelector('.download-links');
    if (downloadLinks && game.downloads) {
      const platformNames = {
        steam: 'STEAM',
        epic: 'EPIC GAMES STORE',
        playstation: 'PLAYSTATION STORE',
        xbox: 'XBOX MARKETPLACE',
        nintendo: 'NINTENDO ESHOP'
      };

      downloadLinks.innerHTML = Object.entries(game.downloads).map(([platform, url]) =>
        `<a href="${url}" target="_blank" class="download-link">${platformNames[platform] || platform.toUpperCase()}</a>`
      ).join('');
    }

    const reqMinimum = this.modal.querySelector('.req-minimum');
    if (reqMinimum && game.systemReqs?.minimum) reqMinimum.textContent = game.systemReqs.minimum;
    const reqRecommended = this.modal.querySelector('.req-recommended');
    if (reqRecommended && game.systemReqs?.recommended) reqRecommended.textContent = game.systemReqs.recommended;
  }
}

// Professional Navigation System - Monochrome
class NavigationSystem {
  constructor() {
    this.navLinks = document.querySelectorAll('.nav-link');
    this.sections = document.querySelectorAll('section[id]');
    this.init();
  }

  init() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleNavClick(e, link));
    });

    window.addEventListener('scroll', () => this.updateActiveLink());
  }

  handleNavClick(e, link) {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  }

  updateActiveLink() {
    const scrollPos = window.scrollY + 100;

    this.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos <= sectionTop + sectionHeight) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`[href="#${sectionId}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }
}

// Professional Contact Form System - Monochrome
class ContactFormSystem {
  constructor() {
    this.form = document.getElementById('contactForm');
    this.init();
  }

  init() {
    if (!this.form) return;

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    const inputs = this.form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('focus', () => this.handleInputFocus(input));
      input.addEventListener('blur', () => this.handleInputBlur(input));
    });
  }

handleSubmit(e) {
    e.preventDefault();
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'SENDING...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    emailjs.sendForm("service_59411bf","template_gdtqd8c", this.form)
      .then(() => {
        submitBtn.textContent = 'MESSAGE SENT!';
        submitBtn.style.background = 'var(--accent-color)';
        submitBtn.style.borderColor = 'var(--accent-color)';
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
          submitBtn.style.background = '';
          submitBtn.style.borderColor = '';
          this.form.reset();
        }, 2000);
      }, (error) => {
        console.log('FAILED...', error);
        submitBtn.textContent = 'FAILED!';
        // You can add some styling for the error state here
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
        }, 2000);
      });
  }

  handleInputFocus(input) {
    input.style.borderColor = 'var(--accent-color)';
    input.style.boxShadow = '-2px 2px 0 var(--accent-color)';
  }

  handleInputBlur(input) {
    input.style.borderColor = '';
    input.style.boxShadow = '';
  }
}

// Professional Scroll Effects - Monochrome
class ScrollEffectsSystem {
  constructor() {
    this.init();
  }

  init() {
    this.updateScrollIndicator();
    window.addEventListener('scroll', () => this.updateScrollIndicator());
    this.handleParallax();
    window.addEventListener('scroll', () => this.handleParallax());
    this.observeElements();
  }

  updateScrollIndicator() {
    const indicator = document.querySelector('.scroll-indicator');
    if (indicator) {
      const scrolled = window.scrollY;
      indicator.style.opacity = scrolled > 100 ? '0' : '1';
      indicator.style.transform = `translateX(-50%) translateY(${scrolled * 0.5}px)`;
    }
  }

  handleParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
      const speed = scrolled * 0.2;
      hero.style.transform = `translateY(${speed}px)`;
    }
  }

  observeElements() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    const elementsToObserve = document.querySelectorAll('.game-card, .member-card, .stat-block');
    elementsToObserve.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'all 0.6s ease-out';
      observer.observe(el);
    });
  }
}

// Professional Interaction Effects - Monochrome
class InteractionEffectsSystem {
  constructor() {
    this.init();
  }

  init() {
    this.setupCardHovers();
    this.setupButtonEffects();
    this.setupBrutalistEffects();
  }

  setupCardHovers() {
    const cards = document.querySelectorAll('.game-card, .member-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => card.style.transition = 'all 0.25s ease');
      card.addEventListener('mouseleave', () => card.style.transform = '');
    });
  }

  setupButtonEffects() {
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
      button.addEventListener('mousedown', () => button.style.transform = 'scale(0.98)');
      button.addEventListener('mouseup', () => button.style.transform = '');
      button.addEventListener('mouseleave', () => button.style.transform = '');
    });
  }

  setupBrutalistEffects() {
    const interactiveElements = document.querySelectorAll('.stat, .stat-block, .expertise-tag, .platform-tag');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => element.style.transition = 'all 0.2s ease');
    });
  }
}

// Initialize all systems when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('NEXUS STUDIOS - Pure Monochrome Gaming Experience Initialized');

  new MonochromeThemeSystem();
  new GameModalSystem();
  new NavigationSystem();
  new ContactFormSystem();
  new ScrollEffectsSystem();
  new InteractionEffectsSystem();

  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);

  if (window.location.hash) {
    setTimeout(() => {
      const targetElement = document.querySelector(window.location.hash);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    }, 500);
  }

  setTimeout(() => {
    console.log('NEXUS STUDIOS - Pure monochrome theme system active');
    console.log('Current theme:', document.documentElement.dataset.theme || 'system');
  }, 1000);
});
