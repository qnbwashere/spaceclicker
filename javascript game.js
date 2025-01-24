import { Upgrades } from './upgrades.js';
import { Achievements } from './achievements.js';
import { createParticles } from './particles.js';
import { AuthManager } from './auth.js';


class Game {
  constructor() {
    this.authManager = new AuthManager();
    this.canClick = true;
    
    // Wait for DOM to be fully loaded before initializing
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initLogin());
    } else {
      this.initLogin();
    }
  }

  initLogin() {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const guestBtn = document.getElementById('guest-btn');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game');

    loginBtn.addEventListener('click', () => {
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
    });

    registerBtn.addEventListener('click', () => {
      registerForm.style.display = 'block';
      loginForm.style.display = 'none';
    });

    guestBtn.addEventListener('click', () => {
      startScreen.style.display = 'none';
      gameScreen.style.display = 'block';
      this.init(true);
    });

    document.getElementById('submit-login').addEventListener('click', () => {
      const username = document.getElementById('login-username').value;
      const password = document.getElementById('login-password').value;

      try {
        this.authManager.login(username, password);
        startScreen.style.display = 'none';
        gameScreen.style.display = 'block';
        this.init(false);
      } catch (error) {
        alert(error.message);
      }
    });

    document.getElementById('submit-register').addEventListener('click', () => {
      const username = document.getElementById('register-username').value;
      const password = document.getElementById('register-password').value;
      const confirmPassword = document.getElementById('register-confirm-password').value;

      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      try {
        this.authManager.register(username, password);
        alert('Registration successful! Please log in.');
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
      } catch (error) {
        alert(error.message);
      }
    });
  }

  init(isGuest = false) {
    // Initialize upgrades and achievements BEFORE loading game state
    this.upgrades = new Upgrades(this);
    this.achievements = new Achievements(this);

    // Initialize game state properties
    this.minerals = 0;
    this.credits = 0;
    this.stardust = 0;
    this.mineralsPerClick = 1;
    this.mineralsPerSecond = 0;
    this.creditsPerSecond = 0;
    this.multiplier = 1;
    this.mineralsFraction = 0;
    this.creditsFraction = 0;

    // Guest mode or logged-in user
    if (!isGuest && this.authManager.getCurrentUser()) {
      const savedState = this.authManager.loadGameState();
      if (savedState) {
        this.loadGameStateFromSaved(savedState);
      }
    }
    
    this.setupEventListeners();
    this.setupMoonCraters();
    this.setupDevTools();
    this.setupStardustInfo();
    this.setupSettingsTab();
    this.startGameLoop();
    this.lastUpdate = performance.now();

    // Save game state periodically
    this.saveInterval = setInterval(() => this.saveGameState(), 30000); // Save every 30 seconds
  }

  saveGameState() {
    const gameState = {
      minerals: this.minerals,
      credits: this.credits,
      stardust: this.stardust,
      mineralsPerClick: this.mineralsPerClick,
      mineralsPerSecond: this.mineralsPerSecond,
      creditsPerSecond: this.creditsPerSecond,
      multiplier: this.multiplier,
      upgrades: Object.fromEntries(this.upgrades.owned),
      achievements: Array.from(this.achievements.unlocked)
    };

    // If logged in, save to auth manager
    if (this.authManager.getCurrentUser()) {
      this.authManager.saveGameState(gameState);
    }
  }

  loadGameStateFromSaved(savedState) {
    this.minerals = savedState.minerals || 0;
    this.credits = savedState.credits || 0;
    this.stardust = savedState.stardust || 0;
    this.mineralsPerClick = savedState.mineralsPerClick || 1;
    this.mineralsPerSecond = savedState.mineralsPerSecond || 0;
    this.creditsPerSecond = savedState.creditsPerSecond || 0;
    this.multiplier = savedState.multiplier || 1;

    // Restore upgrades
    if (savedState.upgrades && this.upgrades) {
      this.upgrades.reset();
      
      Object.entries(savedState.upgrades).forEach(([upgradeId, count]) => {
        const upgrade = this.upgrades.upgrades.find(u => u.id === upgradeId);
        if (upgrade) {
          for (let i = 0; i < count; i++) {
            this.upgrades.purchase(upgrade, true);
          }
        }
      });
    }

    // Restore achievements
    if (savedState.achievements && this.achievements) {
      this.achievements.unlocked = new Set(savedState.achievements);
    }

    this.updateDisplay();
  }

  setupEventListeners() {
    const asteroid = document.getElementById('asteroid');
    
    // Remove continuous clicking
    asteroid.addEventListener('click', () => {
      if (!this.canClick) return;
      this.canClick = false;
      this.clickAsteroid();
      
      // Prevent rapid clicking
      setTimeout(() => {
        this.canClick = true;
      }, 100);  // 100ms cooldown between clicks
    });
    
    const prestigeBtn = document.getElementById('prestige-btn');
    prestigeBtn.addEventListener('click', () => this.prestige());
  }

  setupMoonCraters() {
    const asteroid = document.getElementById('asteroid');
    const craterCount = 8;
    
    for (let i = 0; i < craterCount; i++) {
      const crater = document.createElement('div');
      crater.className = 'crater';
      
      const size = 10 + Math.random() * 30;
      crater.style.width = `${size}px`;
      crater.style.height = `${size}px`;
      
      crater.style.left = `${Math.random() * 80}%`;
      crater.style.top = `${Math.random() * 80}%`;
      
      asteroid.appendChild(crater);
    }
  }



  setupStardustInfo() {
    const info = document.createElement('div');
    info.id = 'stardust-info';
    info.innerHTML = `
      <h3> Coming Soon: Stardust System!</h3>
      <p>When you reach 100M minerals, you'll be able to perform a Prestige reset!</p>
      <ul>
        <li>Convert your progress into powerful Stardust</li>
        <li>Each Stardust provides +1% to all resource generation</li>
        <li>Unlock special Stardust-only upgrades</li>
        <li>Access new game mechanics and features</li>
        <li>Earn special achievements and rewards</li>
      </ul>
      <p class="progress">Progress to Stardust: <span>0</span>%</p>
    `;
    document.body.appendChild(info);
  }

  setupSettingsTab() {
    const settingsToggle = document.getElementById('settings-toggle');
    const settingsPanel = document.getElementById('settings-panel');
    const soundToggle = document.getElementById('sound-toggle');
    const particleToggle = document.getElementById('particle-toggle');
    const saveFrequency = document.getElementById('save-frequency');
    const themeSelect = document.getElementById('theme-select');
    const resetProgressBtn = document.getElementById('reset-progress');

    settingsToggle.addEventListener('click', () => {
      settingsPanel.classList.toggle('visible');
    });

    // Load saved settings
    const savedSettings = JSON.parse(localStorage.getItem('gameSettings') || '{}');
    
    soundToggle.checked = savedSettings.soundEnabled || false;
    particleToggle.checked = savedSettings.particlesEnabled !== false;
    saveFrequency.value = savedSettings.saveFrequency || 30000;
    themeSelect.value = savedSettings.theme || 'dark';

    // Save settings when changed
    [soundToggle, particleToggle, saveFrequency, themeSelect].forEach(el => {
      el.addEventListener('change', this.saveSettings.bind(this));
    });

    // Reset progress button
    resetProgressBtn.addEventListener('click', () => {
      if(confirm('Are you sure? This will delete ALL progress!')) {
        this.resetToDefaultState();
        this.saveGameState();
        location.reload();
      }
    });
  }

  saveSettings() {
    const settings = {
      soundEnabled: document.getElementById('sound-toggle').checked,
      particlesEnabled: document.getElementById('particle-toggle').checked,
      saveFrequency: document.getElementById('save-frequency').value,
      theme: document.getElementById('theme-select').value
    };

    localStorage.setItem('gameSettings', JSON.stringify(settings));
  }

  toggleAutoClick() {
    this.autoClickEnabled = !this.autoClickEnabled;
    document.getElementById('auto-click-status').textContent = 
      `Auto-Click: ${this.autoClickEnabled ? 'On' : 'Off'}`;
    
    if (this.autoClickEnabled) {
      this.autoClickInterval = setInterval(() => {
        this.clickAsteroid();
      }, 50);
    } else if (this.autoClickInterval) {
      clearInterval(this.autoClickInterval);
      this.autoClickInterval = null;
    }
  }

  clickAsteroid() {
    const gain = this.mineralsPerClick * this.multiplier;
    this.addMinerals(gain);
    
    // Visual feedback
    this.createClickEffect();
    this.createCrack();
    
    // Check achievements
    this.achievements.check();
  }

  addMinerals(amount) {
    this.minerals += amount;
    this.updateDisplay();
  }

  createClickEffect() {
    const container = document.getElementById('click-effects');
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    effect.textContent = `+${this.mineralsPerClick * this.multiplier}`;
    
    const rect = document.getElementById('asteroid').getBoundingClientRect();
    effect.style.left = `${Math.random() * rect.width}px`;
    effect.style.top = `${Math.random() * rect.height}px`;
    
    container.appendChild(effect);
    setTimeout(() => effect.remove(), 500);
  }

  createCrack() {
    const cracks = document.getElementById('cracks');
    const crack = document.createElement('div');
    crack.className = 'crack';
    
    const angle = Math.random() * 360;
    const length = 20 + Math.random() * 30;
    
    crack.style.width = `${length}px`;
    crack.style.transform = `rotate(${angle}deg)`;
    crack.style.left = `${Math.random() * 100}%`;
    crack.style.top = `${Math.random() * 100}%`;
    
    cracks.appendChild(crack);
    setTimeout(() => crack.remove(), 2000);
  }

  startGameLoop() {
    const updateGame = (currentTime) => {
      const deltaTime = currentTime - this.lastUpdate;
      this.lastUpdate = currentTime;
      
      // Convert deltaTime from milliseconds to seconds
      const secondsFraction = deltaTime / 1000;
      
      // Calculate minerals to add this frame
      const mineralsToAdd = this.mineralsPerSecond * secondsFraction;
      this.mineralsFraction += mineralsToAdd;
      
      // Calculate credits to add this frame
      const creditsToAdd = this.creditsPerSecond * this.minerals * secondsFraction;
      this.creditsFraction += creditsToAdd;
      
      // Only add whole numbers of resources
      if (this.mineralsFraction >= 1) {
        const wholeMineral = Math.floor(this.mineralsFraction);
        this.minerals += wholeMineral;
        this.mineralsFraction -= wholeMineral;
      }
      
      if (this.creditsFraction >= 1) {
        const wholeCredit = Math.floor(this.creditsFraction);
        this.credits += wholeCredit;
        this.creditsFraction -= wholeCredit;
      }
      
      // Update display
      this.updateDisplay();
      requestAnimationFrame(updateGame);
    };
    
    requestAnimationFrame(updateGame);
  }

  updateDisplay() {
    // Use optional chaining and provide fallback values
    const mineralsEl = document.querySelector('#minerals span');
    const creditsEl = document.querySelector('#credits span');
    const stardustEl = document.querySelector('#stardust span');
    const mineralsPerSecondEl = document.querySelector('#minerals-per-second');
    const creditsPerSecondEl = document.querySelector('#credits-per-second');

    if (mineralsEl) mineralsEl.textContent = Math.floor(this.minerals);
    if (creditsEl) creditsEl.textContent = Math.floor(this.credits);
    if (stardustEl) stardustEl.textContent = Math.floor(this.stardust);
    
    // Update minerals per second display
    if (mineralsPerSecondEl) {
      mineralsPerSecondEl.textContent = 
        `${this.mineralsPerSecond.toFixed(1)} per second`;
    }
    
    // Update credits per second display
    if (creditsPerSecondEl) {
      creditsPerSecondEl.textContent = 
        `${(this.creditsPerSecond * this.minerals).toFixed(1)} per second`;
    }
    
    // Update upgrade buttons
    if (this.upgrades) this.upgrades.updateButtons();
    
    // Show/hide prestige button
    const prestigeBtn = document.getElementById('prestige-btn');
    if (prestigeBtn) {
      prestigeBtn.style.display = this.minerals >= 100000000 ? 'block' : 'none';
    }
    
    // Update stardust progress
    const progressEl = document.querySelector('#stardust-info .progress span');
    if (progressEl) {
      const progress = Math.min(100, (this.minerals / 1000000));
      progressEl.textContent = progress.toFixed(2);
    }
  }

  resetToDefaultState() {
    this.minerals = 0;
    this.credits = 0;
    this.stardust = 0;
    this.mineralsPerClick = 1;
    this.mineralsPerSecond = 0;
    this.creditsPerSecond = 0;
    this.multiplier = 1;
    
    // Reset upgrades if exists
    if (this.upgrades) this.upgrades.reset();
    
    // Reset achievements if exists
    if (this.achievements) this.achievements.unlocked = new Set();
  }

  prestige() {
    if (this.minerals < 100000000) return;
    
    const stardustGain = Math.floor(Math.sqrt(this.minerals / 1000000));
    this.stardust += stardustGain;
    
    // Stardust now provides permanent bonuses
    this.applyStardustBonuses();
    
    // Reset progress
    this.minerals = 0;
    this.credits = 0;
    this.mineralsPerClick = 1 + (this.stardust * 0.01);  // Each stardust gives 1% bonus
    this.mineralsPerSecond = 0;
    this.creditsPerSecond = 0;
    this.multiplier = 1 + (this.stardust * 0.005);  // Each stardust gives 0.5% multiplier
    
    // Reset upgrades
    this.upgrades.reset();
    
    // Visual effect
    createParticles();
    
    this.updateDisplay();
  }

  applyStardustBonuses() {
    // Add special stardust-based upgrades or bonuses
    const stardustBonuses = [
      { threshold: 10, bonus: "Unlock basic stardust efficiency" },
      { threshold: 50, bonus: "Improved mineral conversion" },
      { threshold: 100, bonus: "Advanced resource management" },
      { threshold: 500, bonus: "Cosmic resource multipliers" }
    ];

    stardustBonuses.forEach(bonus => {
      if (this.stardust >= bonus.threshold) {
        // Implement bonus logic
        console.log(`Unlocked: ${bonus.bonus}`);
      }
    });
  }
}

window.game = new Game();
