// TRINETRA GAMES - Enhanced Brutalist JavaScript System (No Emojis Version)
// Enhanced game data with more detailed information
const GAME_DATA = {
  "project-glyph": {
    id: "project-glyph",
    title: "GLYPH",
    subtitle: "Where letters become weapons and words shape reality",
    description: "GLYPH is a revolutionary 2D puzzle-platformer where every letter holds unique power—serving as both a weapon and a tool. Players must harness these abilities to unravel mysteries, overcome challenging puzzles, and ultimately escape to victory. Experience a game where typography meets gameplay in unprecedented ways.",
    genre: "Puzzle/Platformer",
    platforms: ["PC", "Mobile", "Steam"],
    status: "Pre-Production",
    releaseDate: "April 23, 2025",
    trailer: "https://www.youtube.com/embed/zKTTZNup2Cc?si=UikDXTIX_gwj6JUb",
    screenshots: [
      "https://img.itch.zone/aW1hZ2UvMzk1MzMwNC8yMzU3NjA3My5qcGc=/original/npGM%2Bl.jpg",
      "https://img.itch.zone/aW1hZ2UvMzk1MzMwNC8yMzU3NjA3MS5qcGc=/original/OwGU0h.jpg",
      "https://img.itch.zone/aW1hZ2UvMzk1MzMwNC8yMzU3NjA3MC5qcGc=/original/dYSQEw.jpg",
      "https://img.itch.zone/aW1hZ2UvMzk1MzMwNC8yMzU3NjA3Mi5qcGc=/original/n7BNaa.jpg"
    ],
    features: [
      "Unique letter-based gameplay mechanics",
      "Procedural puzzle generation system",
      "Adaptive soundtrack that responds to gameplay",
      "Multiple character customization options",
      "Global leaderboards and achievements",
      "Cross-platform save synchronization",
      "Accessibility-focused design",
      "Community level editor (post-launch)"
    ],
    team: [
      "Nitin Burli - Creative Director & Game Design",
      "Adamya Gupta - Lead Programmer",
      "Phan Thanh Duc - Lead Programmer",
      "Manish - Gameplay Programmer",
      "Sanjay - Engine Programmer & Founder",
      "Ayush - UI/UX Programmer & Founder",
      "Aditya - Level Designer",
      "Drew - Level Designer",
      "Zsombor - Music & Audio Design"
    ],
    systemReqs: {
      minimum: "OS: Windows 10 64-bit | Processor: Intel i3-6100 / AMD FX-6300 | Memory: 4 GB RAM | Graphics: GTX 750 Ti / Radeon R7 260X | DirectX: Version 11 | Storage: 2 GB available space",
      recommended: "OS: Windows 11 64-bit | Processor: Intel i5-8400 / AMD Ryzen 5 2600 | Memory: 8 GB RAM | Graphics: GTX 1060 / Radeon RX 580 | DirectX: Version 12 | Storage: 4 GB available space"
    },
    downloads: {
      itch: "https://sanjaythedev.itch.io/glyph",
    },
    rating: "4.2/5.0",
    progress: 35
  },
  "project-neo": {
    id: "project-neo",
    title: "PROJECT NEO",
    subtitle: "A celebration of Indian heritage through interactive storytelling",
    description: "PROJECT NEO is an ambitious upcoming title that explores the rich tapestry of Indian culture through innovative gameplay mechanics. Currently in the early ideation phase, this project aims to showcase the diversity, mythology, and traditions of India in a way that has never been done before in gaming. More details will be revealed as development progresses.",
    genre: "Action-Adventure / Cultural",
    platforms: ["PC", "PlayStation 5", "Xbox Series X/S", "Mobile"],
    status: "IDEATION",
    releaseDate: "2026 (Tentative)",
    trailer: null,
    screenshots: [],
    features: [
      "Authentic cultural representation",
      "Multiple regional storylines",
      "Traditional music integration",
      "Collaborative gameplay elements",
      "Educational cultural insights",
      "Multiple language support"
    ],
    team: [
      "Development team to be announced",
      "Cultural consultants (various regions)",
      "Traditional music artists",
      "Local storytellers and historians"
    ],
    systemReqs: {
      minimum: "To be determined based on final scope",
      recommended: "To be determined based on final scope"
    },
    downloads: {},
    rating: null,
    progress: 5
  }
};

// Enhanced Theme System with improved transitions and localStorage
class EnhancedThemeSystem {
  constructor() {
    this.toggle = document.getElementById('themeToggle');
    this.toggleIcon = this.toggle?.querySelector('.toggle-icon');
    this.currentTheme = 'light';
    this.init();
  }

  init() {
    if (!this.toggle) return;

    // Initialize theme from saved preference or system preference
    this.initTheme();
    
    // Add event listeners
    this.toggle.addEventListener('click', () => this.toggleTheme());
    this.toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggleTheme();
      }
    });

    // Listen for system theme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        const savedTheme = localStorage.getItem('trinetra-theme');
        if (!savedTheme) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }

    console.log('TRINETRA GAMES - Enhanced theme system initialized');
  }

  initTheme() {
    const savedTheme = localStorage.getItem('trinetra-theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    this.setTheme(initialTheme);
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
    
    // Add visual feedback
    this.toggle.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.toggle.style.transform = '';
    }, 150);
  }

  setTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('trinetra-theme', theme);
    this.updateThemeIcon(theme);
    
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { theme } 
    }));
    
    console.log(`TRINETRA GAMES - Theme switched to ${theme}`);
  }

  updateThemeIcon(theme) {
    if (!this.toggleIcon) return;
    
    // Add smooth rotation animation
    this.toggleIcon.style.transform = 'rotate(180deg)';
    setTimeout(() => {
      this.toggleIcon.textContent = theme === 'dark' ? '◑' : '◐';
      this.toggleIcon.style.transform = 'rotate(0deg)';
    }, 150);
  }
}

// Enhanced Loading Screen System
class LoadingScreenSystem {
  constructor() {
    this.loadingScreen = document.getElementById('loadingScreen');
    this.init();
  }

  init() {
    if (!this.loadingScreen) return;

    // Start loading animation
    this.startLoading();
  }

  startLoading() {
    // Simulate loading progress
    const progressBar = this.loadingScreen.querySelector('.loading-progress');
    if (progressBar) {
      setTimeout(() => {
        progressBar.style.width = '100%';
      }, 100);
    }

    // Hide loading screen after animation completes
    setTimeout(() => {
      this.hideLoadingScreen();
    }, 3000);
  }

  hideLoadingScreen() {
    if (this.loadingScreen) {
      this.loadingScreen.classList.add('hidden');
      document.body.style.overflow = '';
      
      // Remove from DOM after transition
      setTimeout(() => {
        this.loadingScreen.remove();
      }, 500);
    }
  }
}

// Enhanced Game Modal System with better accessibility and features
class EnhancedGameModalSystem {
  constructor() {
    this.modal = document.getElementById('gameModal');
    this.closeBtn = document.getElementById('modalClose');
    this.overlay = this.modal?.querySelector('.modal-overlay');
    this.gameViewBtns = document.querySelectorAll('.game-view-btn');
    this.lastFocusedElement = null;
    this.init();
  }

  init() {
    if (!this.modal) return;

    // Add event listeners for game view buttons
    this.gameViewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => this.handleGameViewClick(e));
    });

    // Modal close events
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

    // Keyboard events
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
        this.closeModal();
      }
    });

    console.log('TRINETRA GAMES - Enhanced modal system initialized');
  }

  handleGameViewClick(e) {
    e.preventDefault();
    this.lastFocusedElement = e.target;
    
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

    // Focus management for accessibility
    this.trapFocus();

    // Smooth animation
    this.modal.style.opacity = '0';
    setTimeout(() => {
      this.modal.style.transition = 'opacity 0.3s ease';
      this.modal.style.opacity = '1';
      // Focus the close button
      this.closeBtn?.focus();
    }, 10);
  }

  closeModal() {
    this.modal.style.opacity = '0';
    setTimeout(() => {
      this.modal.classList.add('hidden');
      document.body.style.overflow = '';
      this.modal.style.transition = '';
      
      // Return focus to the triggering element
      if (this.lastFocusedElement) {
        this.lastFocusedElement.focus();
      }
    }, 300);
  }

  trapFocus() {
    // Simple focus trap for modal
    const focusableElements = this.modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    this.modal.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });
  }

  populateModalContent(game) {
    // Update basic game info
    this.updateElement('.game-detail-title', game.title);
    this.updateElement('.game-detail-title-large', game.title);
    this.updateElement('.game-detail-subtitle', game.subtitle);
    this.updateElement('.game-detail-status', game.status);
    this.updateElement('.game-detail-genre', game.genre);
    this.updateElement('.game-detail-release', game.releaseDate);
    this.updateElement('.description-text', game.description);

    // Update trailer
    this.updateTrailer(game);
    
    // Update screenshots
    this.updateScreenshots(game);
    
    // Update features
    this.updateFeatures(game);
    
    // Update sidebar info
    this.updateSidebarInfo(game);
    
    // Update progress bar
    this.updateProgress(game);
  }

  updateElement(selector, content) {
    const element = this.modal.querySelector(selector);
    if (element && content) {
      element.textContent = content;
    }
  }

  updateTrailer(game) {
    const container = this.modal.querySelector('.game-trailer-container');
    if (!container) return;

    if (game.trailer) {
      container.innerHTML = `
        <iframe src="${game.trailer}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
                title="Game trailer for ${game.title}">
        </iframe>
      `;
    } else {
      container.innerHTML = `
        <div class="video-placeholder">
          <svg class="play-icon" width="64" height="64">
            <use href="#icon-play"></use>
          </svg>
          <span>Trailer Coming Soon</span>
        </div>
      `;
    }
  }

  updateScreenshots(game) {
    const grid = this.modal.querySelector('.screenshots-grid');
    if (!grid) return;

    if (game.screenshots && game.screenshots.length > 0) {
      grid.innerHTML = game.screenshots.map((src, index) => `
        <img src="${src}" 
             alt="Screenshot ${index + 1} of ${game.title}" 
             class="screenshot-img"
             loading="lazy">
      `).join('');
      
      // Add click handlers for screenshot enlargement
      grid.querySelectorAll('.screenshot-img').forEach(img => {
        img.addEventListener('click', () => this.enlargeScreenshot(img.src, game.title));
      });
    } else {
      grid.innerHTML = `
        <div class="screenshot-placeholder">
          <span>Screenshots Coming Soon</span>
        </div>
      `;
    }
  }

  enlargeScreenshot(src, gameTitle) {
    // Create a simple image overlay
    const overlay = document.createElement('div');
    overlay.className = 'screenshot-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      cursor: pointer;
    `;

    const img = document.createElement('img');
    img.src = src;
    img.alt = `Enlarged screenshot of ${gameTitle}`;
    img.style.cssText = `
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
    `;

    overlay.appendChild(img);
    document.body.appendChild(overlay);

    // Close on click or escape
    overlay.addEventListener('click', () => overlay.remove());
    document.addEventListener('keydown', function escapeHandler(e) {
      if (e.key === 'Escape') {
        overlay.remove();
        document.removeEventListener('keydown', escapeHandler);
      }
    });
  }

  updateFeatures(game) {
    const list = this.modal.querySelector('.features-list');
    if (!list || !game.features) return;

    list.innerHTML = game.features.map(feature => `
      <li>
        <svg class="feature-icon" width="16" height="16">
          <use href="#icon-arrow-right"></use>
        </svg>
        ${feature}
      </li>
    `).join('');
  }

  updateSidebarInfo(game) {
    // Update game info
    this.updateElement('.game-genre-info', game.genre);
    this.updateElement('.game-release-date', game.releaseDate);
    this.updateElement('.game-rating', game.rating || 'Not yet rated');

    // Update platforms
    const platformsList = this.modal.querySelector('.platforms-list');
    if (platformsList && game.platforms) {
      platformsList.innerHTML = game.platforms.map(platform => `
        <div class="platform-tag">${platform}</div>
      `).join('');
    }

    // Update team
    const teamList = this.modal.querySelector('.team-list');
    if (teamList && game.team) {
      teamList.innerHTML = game.team.map(member => `
        <div class="team-member">${member}</div>
      `).join('');
    }

    // Update download links
    const downloadLinks = this.modal.querySelector('.download-links');
    if (downloadLinks && game.downloads) {
      const platformNames = {
        steam: 'STEAM',
        epic: 'EPIC GAMES STORE',
        playstation: 'PLAYSTATION STORE',
        xbox: 'XBOX MARKETPLACE',
        nintendo: 'NINTENDO ESHOP',
        itch: 'ITCH.IO'
      };

      downloadLinks.innerHTML = Object.entries(game.downloads).map(([platform, url]) => `
        <a href="${url}" 
           target="_blank" 
           rel="noopener noreferrer" 
           class="download-link">
          <svg width="16" height="16">
            <use href="#icon-download"></use>
          </svg>
          ${platformNames[platform] || platform.toUpperCase()}
        </a>
      `).join('');
    }

    // Update system requirements
    this.updateElement('.req-minimum', game.systemReqs?.minimum || 'To be announced');
    this.updateElement('.req-recommended', game.systemReqs?.recommended || 'To be announced');
  }

  updateProgress(game) {
    const progressFill = this.modal.querySelector('.progress-fill');
    const progressText = this.modal.querySelector('.progress-text');
    
    if (progressFill && game.progress) {
      setTimeout(() => {
        progressFill.style.width = `${game.progress}%`;
      }, 300);
    }
    
    if (progressText && game.progress) {
      progressText.textContent = `${game.progress}% Complete`;
    }
  }
}

// Enhanced Navigation System with smooth scrolling and active states
class EnhancedNavigationSystem {
  constructor() {
    this.navLinks = document.querySelectorAll('.nav-link');
    this.sections = document.querySelectorAll('section[id]');
    this.navToggle = document.getElementById('navToggle');
    this.navMenu = document.querySelector('.nav-menu');
    this.header = document.querySelector('.header');
    this.currentSection = '';
    this.init();
  }

  init() {
    // Navigation link clicks
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleNavClick(e, link));
    });

    // Mobile navigation toggle
    if (this.navToggle && this.navMenu) {
      this.navToggle.addEventListener('click', () => this.toggleMobileNav());
      
      // Close mobile nav when clicking outside
      document.addEventListener('click', (e) => {
        if (!this.navToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
          this.closeMobileNav();
        }
      });
    }

    // Scroll events
    window.addEventListener('scroll', () => {
      this.updateActiveLink();
      this.updateHeaderState();
    });

    // Initial setup
    this.updateActiveLink();
    this.updateHeaderState();

    console.log('TRINETRA GAMES - Enhanced navigation system initialized');
  }

  handleNavClick(e, link) {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      const headerHeight = this.header.offsetHeight;
      const offsetTop = targetSection.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });

      // Close mobile nav if open
      this.closeMobileNav();

      // Update URL without page jump
      history.pushState(null, null, `#${targetId}`);
    }
  }

  toggleMobileNav() {
    this.navToggle.classList.toggle('active');
    this.navMenu.classList.toggle('active');
    
    // Prevent body scroll when mobile nav is open
    if (this.navMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileNav() {
    this.navToggle.classList.remove('active');
    this.navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  updateActiveLink() {
    const scrollPos = window.scrollY + 150;

    this.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos <= sectionTop + sectionHeight) {
        if (this.currentSection !== sectionId) {
          this.currentSection = sectionId;
          
          // Update active states
          this.navLinks.forEach(link => link.classList.remove('active'));
          const activeLink = document.querySelector(`[href="#${sectionId}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      }
    });
  }

  updateHeaderState() {
    const scrolled = window.scrollY > 100;
    this.header.classList.toggle('scrolled', scrolled);
  }
}

// Enhanced Contact Form System with validation and feedback
class EnhancedContactFormSystem {
  constructor() {
    this.form = document.getElementById('contactForm');
    this.submitBtn = this.form?.querySelector('button[type="submit"]');
    this.originalBtnText = this.submitBtn?.textContent || 'SEND MESSAGE';
    this.init();
  }

  init() {
    if (!this.form) return;

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Enhanced form field interactions
    const inputs = this.form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('focus', () => this.handleInputFocus(input));
      input.addEventListener('blur', () => this.handleInputBlur(input));
      input.addEventListener('input', () => this.validateField(input));
    });

    console.log('TRINETRA GAMES - Enhanced contact form system initialized');
  }

  handleSubmit(e) {
    e.preventDefault();
    
    if (!this.validateForm()) {
      this.showMessage('Please fill in all required fields correctly.', 'error');
      return;
    }

    this.setSubmitState('loading');

    // Use EmailJS to send the form
    emailjs.sendForm("service_59411bf", "template_gdtqd8c", this.form)
      .then(() => {
        this.setSubmitState('success');
        this.showMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
        this.resetForm();
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        this.setSubmitState('error');
        this.showMessage('Failed to send message. Please try again or contact us directly.', 'error');
      });
  }

  validateForm() {
    const requiredFields = this.form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error styling
    field.classList.remove('error');

    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    } else if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }

    if (!isValid) {
      field.classList.add('error');
      this.showFieldError(field, errorMessage);
    } else {
      this.hideFieldError(field);
    }

    return isValid;
  }

  showFieldError(field, message) {
    // Remove existing error message
    this.hideFieldError(field);

    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
      color: var(--text-secondary);
      font-size: var(--font-size-xs);
      margin-top: var(--space-1);
      font-weight: var(--font-weight-medium);
    `;

    field.parentNode.appendChild(errorElement);
  }

  hideFieldError(field) {
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  setSubmitState(state) {
    if (!this.submitBtn) return;

    this.submitBtn.disabled = state !== 'idle';

    switch (state) {
      case 'loading':
        this.submitBtn.textContent = 'SENDING...';
        this.submitBtn.style.opacity = '0.7';
        break;
      case 'success':
        this.submitBtn.textContent = 'MESSAGE SENT!';
        this.submitBtn.style.background = 'var(--accent-color)';
        this.submitBtn.style.borderColor = 'var(--accent-color)';
        break;
      case 'error':
        this.submitBtn.textContent = 'SEND FAILED!';
        this.submitBtn.style.background = 'var(--text-secondary)';
        this.submitBtn.style.borderColor = 'var(--text-secondary)';
        break;
      default:
        this.submitBtn.textContent = this.originalBtnText;
        this.submitBtn.style.opacity = '1';
        this.submitBtn.style.background = '';
        this.submitBtn.style.borderColor = '';
        break;
    }

    if (state !== 'idle') {
      setTimeout(() => this.setSubmitState('idle'), 3000);
    }
  }

  showMessage(message, type) {
    // Create or update message element
    let messageElement = document.querySelector('.form-message');
    if (!messageElement) {
      messageElement = document.createElement('div');
      messageElement.className = 'form-message';
      this.form.appendChild(messageElement);
    }

    messageElement.textContent = message;
    messageElement.className = `form-message form-message--${type}`;
    messageElement.style.cssText = `
      padding: var(--space-3);
      margin-top: var(--space-4);
      border: 2px solid var(--border-color);
      background: var(--bg-hover);
      color: var(--text-primary);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      text-align: center;
    `;

    if (type === 'success') {
      messageElement.style.borderColor = 'var(--accent-color)';
    } else if (type === 'error') {
      messageElement.style.borderColor = 'var(--text-secondary)';
    }

    // Auto-hide after 5 seconds
    setTimeout(() => {
      if (messageElement && messageElement.parentNode) {
        messageElement.remove();
      }
    }, 5000);
  }

  resetForm() {
    setTimeout(() => {
      this.form.reset();
      // Clear any error states
      this.form.querySelectorAll('.error').forEach(field => {
        field.classList.remove('error');
      });
      this.form.querySelectorAll('.field-error').forEach(error => {
        error.remove();
      });
    }, 2000);
  }

  handleInputFocus(input) {
    input.style.borderColor = 'var(--accent-color)';
    input.style.boxShadow = 'var(--shadow-brutal-sm)';
    input.parentNode.classList.add('focused');
  }

  handleInputBlur(input) {
    input.style.borderColor = '';
    input.style.boxShadow = '';
    input.parentNode.classList.remove('focused');
  }
}

// Enhanced Scroll Effects System with intersection observer
class EnhancedScrollEffectsSystem {
  constructor() {
    this.init();
  }

  init() {
    this.updateScrollIndicator();
    this.setupScrollListener();
    this.setupIntersectionObserver();
    this.setupParallaxEffects();

    console.log('TRINETRA GAMES - Enhanced scroll effects system initialized');
  }

  setupScrollListener() {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateScrollIndicator();
          this.handleParallax();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  updateScrollIndicator() {
    const indicator = document.querySelector('.scroll-indicator');
    if (indicator) {
      const scrolled = window.scrollY;
      const opacity = Math.max(0, 1 - scrolled / 600);
      indicator.style.opacity = opacity;
      indicator.style.transform = `translateX(-50%) translateY(${scrolled * 0.3}px)`;
    }
  }

  handleParallax() {
    const scrolled = window.pageYOffset;
    const heroShapes = document.querySelectorAll('.hero-shapes .shape');
    
    heroShapes.forEach((shape, index) => {
      const speed = (index + 1) * 0.1;
      const yPos = scrolled * speed;
      shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
    });
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Add staggered animation for grid items
          if (entry.target.classList.contains('game-card') || 
              entry.target.classList.contains('member-card') ||
              entry.target.classList.contains('stat-block')) {
            const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
            entry.target.style.animationDelay = `${delay}ms`;
          }
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const elementsToObserve = document.querySelectorAll(`
      .game-card, .member-card, .stat-block, .value-item,
      .contact-block, .section-header, .about-text p
    `);

    elementsToObserve.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(el);
    });
  }

  setupParallaxEffects() {
    // Add CSS for animate-in class
    const style = document.createElement('style');
    style.textContent = `
      .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
      
      @media (prefers-reduced-motion: reduce) {
        .animate-in {
          animation: none !important;
          transition: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Enhanced Interaction Effects System
class EnhancedInteractionEffectsSystem {
  constructor() {
    this.init();
  }

  init() {
    this.setupCardHovers();
    this.setupButtonEffects();
    this.setupBrutalistEffects();
    this.setupKeyboardNavigation();

    console.log('TRINETRA GAMES - Enhanced interaction effects system initialized');
  }

  setupCardHovers() {
    const cards = document.querySelectorAll('.game-card, .member-card, .stat-block, .value-item');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        this.addHoverEffect(card);
      });

      card.addEventListener('mouseleave', () => {
        this.removeHoverEffect(card);
      });

      // Touch support for mobile
      card.addEventListener('touchstart', () => {
        this.addHoverEffect(card);
      });

      card.addEventListener('touchend', () => {
        setTimeout(() => this.removeHoverEffect(card), 150);
      });
    });
  }

  addHoverEffect(element) {
    if (element.classList.contains('game-card')) {
      // Special effect for featured games
      if (element.classList.contains('featured-game')) {
        element.style.transform = 'translate(6px, -6px) scale(1.02)';
      }
    }
  }

  removeHoverEffect(element) {
    element.style.transform = '';
  }

  setupButtonEffects() {
    const buttons = document.querySelectorAll('button, .btn');
    
    buttons.forEach(button => {
      // Mouse events
      button.addEventListener('mousedown', () => {
        button.style.transform = 'scale(0.98)';
      });

      button.addEventListener('mouseup', () => {
        button.style.transform = '';
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = '';
      });

      // Add ripple effect on click
      button.addEventListener('click', (e) => {
        this.createRippleEffect(e, button);
      });
    });
  }

  createRippleEffect(e, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
      z-index: 1;
    `;

    // Add ripple animation keyframes if not already added
    if (!document.querySelector('#ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.remove();
      }
    }, 600);
  }

  setupBrutalistEffects() {
    const interactiveElements = document.querySelectorAll(`
      .stat, .stat-block, .expertise-tag, .platform-tag, .tag,
      .contact-block, .value-item
    `);
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        element.style.transition = 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
      });

      // Add subtle animation on hover
      element.addEventListener('mouseenter', () => {
        const randomRotation = (Math.random() - 0.5) * 2; // Random rotation between -1 and 1 degree
        element.style.transform += ` rotate(${randomRotation}deg)`;
      });

      element.addEventListener('mouseleave', () => {
        element.style.transform = element.style.transform.replace(/rotate\([^)]*\)/g, '');
      });
    });
  }

  setupKeyboardNavigation() {
    // Enhanced keyboard navigation for better accessibility
    document.addEventListener('keydown', (e) => {
      // Skip link functionality (when implemented)
      if (e.key === 'Tab' && e.target.classList.contains('skip-link')) {
        e.target.focus();
      }

      // Close modals with escape
      if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal:not(.hidden)');
        openModals.forEach(modal => {
          const closeBtn = modal.querySelector('.modal-close');
          if (closeBtn) {
            closeBtn.click();
          }
        });
      }
    });
  }
}

// Performance Monitor (for development)
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      loadTime: 0,
      domContentLoaded: 0,
      firstPaint: 0,
      firstContentfulPaint: 0
    };
    this.init();
  }

  init() {
    if (typeof performance === 'undefined') return;

    // Measure page load time
    window.addEventListener('load', () => {
      this.metrics.loadTime = performance.now();
      this.logMetrics();
    });

    // Measure DOM content loaded
    document.addEventListener('DOMContentLoaded', () => {
      this.metrics.domContentLoaded = performance.now();
    });

    // Measure paint timings
    if ('getEntriesByType' in performance) {
      const paintEntries = performance.getEntriesByType('paint');
      paintEntries.forEach(entry => {
        if (entry.name === 'first-paint') {
          this.metrics.firstPaint = entry.startTime;
        } else if (entry.name === 'first-contentful-paint') {
          this.metrics.firstContentfulPaint = entry.startTime;
        }
      });
    }
  }

  logMetrics() {
    console.group('TRINETRA GAMES - Performance Metrics');
    console.log(`Load Time: ${this.metrics.loadTime.toFixed(2)}ms`);
    console.log(`DOM Content Loaded: ${this.metrics.domContentLoaded.toFixed(2)}ms`);
    if (this.metrics.firstPaint > 0) {
      console.log(`First Paint: ${this.metrics.firstPaint.toFixed(2)}ms`);
    }
    if (this.metrics.firstContentfulPaint > 0) {
      console.log(`First Contentful Paint: ${this.metrics.firstContentfulPaint.toFixed(2)}ms`);
    }
    console.groupEnd();
  }
}

// Main Application Class
class TrinetraGamesApp {
  constructor() {
    this.systems = {};
    this.init();
  }

  init() {
    console.log('TRINETRA GAMES - Initializing enhanced systems...');

    // Initialize all systems
    this.systems.loadingScreen = new LoadingScreenSystem();
    this.systems.theme = new EnhancedThemeSystem();
    this.systems.gameModal = new EnhancedGameModalSystem();
    this.systems.navigation = new EnhancedNavigationSystem();
    this.systems.contactForm = new EnhancedContactFormSystem();
    this.systems.scrollEffects = new EnhancedScrollEffectsSystem();
    this.systems.interactions = new EnhancedInteractionEffectsSystem();
    this.systems.performance = new PerformanceMonitor();

    // Setup global event listeners
    this.setupGlobalEvents();

    // Initialize body fade-in effect
    this.initializeApp();

    console.log('TRINETRA GAMES - All systems initialized successfully');
  }

  setupGlobalEvents() {
    // Handle hash changes for deep linking
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });

    // Handle theme change events
    window.addEventListener('themeChanged', (e) => {
      console.log(`Theme changed to: ${e.detail.theme}`);
    });

    // Handle visibility changes (tab switching)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        // Re-focus management when tab becomes visible
        console.log('Tab is now visible');
      }
    });
  }

  initializeApp() {
    // Fade in the body after systems are loaded
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);

    // Handle initial hash if present
    if (window.location.hash) {
      setTimeout(() => {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const offsetTop = targetElement.offsetTop - headerHeight - 20;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      }, 1000);
    }

    // Log successful initialization
    setTimeout(() => {
      console.log('TRINETRA GAMES - Enhanced brutalist experience ready');
      console.log('Current theme:', document.documentElement.dataset.theme || 'system');
    }, 1500);
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.TrinetraApp = new TrinetraGamesApp();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TrinetraGamesApp, GAME_DATA };
}
