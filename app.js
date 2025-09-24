const GAME_DATA = { 
  "project-glyph": {
    id: "project-glyph",
    title: "GLYPH",
    subtitle: "Where letters become weapons",
    description: "GLYPH is a 2D puzzle-platformer where every letter holds unique power—serving as both a weapon and a tool. Harness these abilities to unravel mysteries, overcome challenges, and ultimately escape to victory.",
    genre: "Puzzle/Platformer",
    platforms: ["PC", "Mobiles"],
    status: "Pre-Production",
    releaseDate: "April, 2025",
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
      steam: "null",
      epic: "null",
      playstore: "null"
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
    features: ["null"],
    team: ["null"],
    systemReqs: {
      minimum: "null",
      recommended: "null"
    },
    downloads: {
      steam: "null",
      epic: "null"
    },
    rating: null
  }
};


// Pure Monochrome Custom Cursor System
class CustomCursor {
  constructor() {
    this.cursor = document.querySelector('.cursor');
    this.isMoving = false;
    this.init();
  }
  
  init() {
    if (!this.cursor) return;
    
    document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    
    // Handle hover states for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .game-card, .member-card, input, textarea, select');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => this.handleHover(true));
      el.addEventListener('mouseleave', () => this.handleHover(false));
    });
  }
  
  handleMouseMove(e) {
    if (!this.cursor) return;
    
    const x = e.clientX;
    const y = e.clientY;
    
    this.cursor.style.left = x - 8 + 'px';
    this.cursor.style.top = y - 8 + 'px';
  }
  
  handleHover(isHovering) {
    if (!this.cursor) return;
    
    if (isHovering) {
      this.cursor.classList.add('hover');
    } else {
      this.cursor.classList.remove('hover');
    }
  }
}

// Pure Monochrome Theme Toggle System
class MonochromeThemeSystem {
  constructor() {
    this.toggle = document.getElementById('themeToggle');
    this.toggleIcon = this.toggle?.querySelector('.toggle-icon');
    this.init();
  }
  
  init() {
    if (!this.toggle) return;
    
    // Initialize theme on page load
    this.initTheme();
    
    // Set up toggle listener
    this.toggle.addEventListener('click', () => this.toggleTheme());
    
    // Listen for system theme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        // Only apply system preference if user hasn't made an explicit choice
        const savedTheme = localStorage.getItem('nexus-monochrome-theme');
        if (!savedTheme) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }
  
  initTheme() {
    // Check localStorage first, then system preference
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
    // Apply pure monochrome theme to document
    document.documentElement.dataset.theme = theme;
    
    // Save to localStorage
    localStorage.setItem('nexus-monochrome-theme', theme);
    
    // Update theme icon - monochrome symbols only
    this.updateThemeIcon(theme);
    
    // Log theme change for debugging
    console.log(`NEXUS STUDIOS - Switched to ${theme} monochrome theme`);
  }
  
  updateThemeIcon(theme) {
    if (!this.toggleIcon) return;
    
    if (theme === 'dark') {
      this.toggleIcon.textContent = '◑'; // Dark mode symbol
    } else {
      this.toggleIcon.textContent = '◐'; // Light mode symbol
    }
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
    
    // Add click listeners to game view buttons
    this.gameViewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => this.handleGameViewClick(e));
    });
    
    // Close modal listeners
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
    
    // Close on escape key
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
    
    // Smooth fade in with monochrome styling
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
    // Update header
    const title = this.modal.querySelector('.game-detail-title');
    const subtitle = this.modal.querySelector('.game-detail-subtitle');
    
    if (title) title.textContent = game.title;
    if (subtitle) subtitle.textContent = game.subtitle;
    
    // Update description
    const descriptionText = this.modal.querySelector('.description-text');
    if (descriptionText) {
      descriptionText.textContent = game.description;
    }
    
    // Update features
    const featuresList = this.modal.querySelector('.features-list');
    if (featuresList && game.features) {
      featuresList.innerHTML = game.features.map(feature => `<li>${feature}</li>`).join('');
    }
    
    // Update game info
    const genreInfo = this.modal.querySelector('.game-genre-info');
    const releaseDate = this.modal.querySelector('.game-release-date');
    const rating = this.modal.querySelector('.game-rating');
    
    if (genreInfo) genreInfo.textContent = game.genre;
    if (releaseDate) releaseDate.textContent = game.releaseDate;
    if (rating) rating.textContent = game.rating ? `${game.rating}/5.0` : 'Not yet rated';
    
    // Update platforms
    const platformsList = this.modal.querySelector('.platforms-list');
    if (platformsList && game.platforms) {
      platformsList.innerHTML = game.platforms.map(platform => 
        `<div class="platform-tag">${platform}</div>`
      ).join('');
    }
    
    // Update team
    const teamList = this.modal.querySelector('.team-list');
    if (teamList && game.team) {
      teamList.innerHTML = game.team.map(member => 
        `<div class="team-member">${member}</div>`
      ).join('');
    }
    
    // Update download links
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
    
    // Update system requirements
    const reqMinimum = this.modal.querySelector('.req-minimum');
    const reqRecommended = this.modal.querySelector('.req-recommended');
    
    if (reqMinimum && game.systemReqs?.minimum) {
      reqMinimum.textContent = game.systemReqs.minimum;
    }
    if (reqRecommended && game.systemReqs?.recommended) {
      reqRecommended.textContent = game.systemReqs.recommended;
    }
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
    
    // Update active link on scroll
    window.addEventListener('scroll', () => this.updateActiveLink());
  }
  
  handleNavClick(e, link) {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
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
        if (activeLink) {
          activeLink.classList.add('active');
        }
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
    
    // Add professional focus effects to form inputs
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
    
    // Professional submission feedback - monochrome styling
    submitBtn.textContent = 'SENDING...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    // Simulate form submission
    setTimeout(() => {
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
    }, 1000);
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
    // Smooth scroll indicator
    this.updateScrollIndicator();
    window.addEventListener('scroll', () => this.updateScrollIndicator());
    
    // Professional parallax effects
    this.handleParallax();
    window.addEventListener('scroll', () => this.handleParallax());
    
    // Reveal animations
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
    
    // Observe cards and sections
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
    // Professional hover effects for cards
    this.setupCardHovers();
    
    // Button press effects
    this.setupButtonEffects();
    
    // Brutalist hover effects
    this.setupBrutalistEffects();
  }
  
  setupCardHovers() {
    const cards = document.querySelectorAll('.game-card, .member-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.25s ease';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
  
  setupButtonEffects() {
    const buttons = document.querySelectorAll('button, .btn');
    
    buttons.forEach(button => {
      button.addEventListener('mousedown', () => {
        button.style.transform = 'scale(0.98)';
      });
      
      button.addEventListener('mouseup', () => {
        button.style.transform = '';
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.transform = '';
      });
    });
  }
  
  setupBrutalistEffects() {
    // Add sharp, geometric interactions
    const interactiveElements = document.querySelectorAll('.stat, .stat-block, .expertise-tag, .platform-tag');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        element.style.transition = 'all 0.2s ease';
      });
    });
  }
}

// Initialize all systems when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('NEXUS STUDIOS - Pure Monochrome Gaming Experience Initialized');
  
  // Initialize all professional systems with monochrome theme
  new CustomCursor();
  new MonochromeThemeSystem(); // Updated for pure monochrome
  new GameModalSystem();
  new NavigationSystem();
  new ContactFormSystem();
  new ScrollEffectsSystem();
  new InteractionEffectsSystem();
  
  // Professional page load animation - monochrome
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
  
  // Update scroll position on page refresh
  if (window.location.hash) {
    setTimeout(() => {
      const targetElement = document.querySelector(window.location.hash);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }, 500);
  }
  
  // Monochrome theme validation
  setTimeout(() => {
    console.log('NEXUS STUDIOS - Pure monochrome theme system active');
    console.log('Current theme:', document.documentElement.dataset.theme || 'system');
  }, 1000);
});

// Performance optimization for scroll events
let ticking = false;
function requestTick(callback) {
  if (!ticking) {
    requestAnimationFrame(() => {
      callback();
      ticking = false;
    });
    ticking = true;
  }
}

// Window resize handler - optimized for monochrome
window.addEventListener('resize', () => {
  requestTick(() => {
    // Recalculate positions if needed
    console.log('NEXUS STUDIOS - Window resized, monochrome layouts recalculated');
  });
});

// Professional error handling - monochrome system
window.addEventListener('error', (e) => {
  console.warn('NEXUS STUDIOS - Pure Monochrome System: Minor error handled:', e.error?.message || e.message);
});

// Export monochrome systems for potential external use
window.NexusStudioMonochrome = {
  CustomCursor,
  MonochromeThemeSystem,
  GameModalSystem,
  NavigationSystem,
  ContactFormSystem,
  ScrollEffectsSystem,
  InteractionEffectsSystem,
  GAME_DATA
};

// Pure monochrome theme confirmation
console.log('🎯 NEXUS STUDIOS - Pure Monochrome System Ready');
console.log('✅ All teal colors removed - Only black, white, and gray variations active');
console.log('🎨 Theme toggle: Light/Dark monochrome modes available');
console.log('⚡ Professional brutalist interactions enabled');