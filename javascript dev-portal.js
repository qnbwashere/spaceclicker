export class DevPortal {
  constructor(game) {
    this.game = game;
    this.setupDevPortal();
  }

  setupDevPortal() {
    // Create dev portal container
    const devPortal = document.createElement('div');
    devPortal.id = 'dev-portal';
    devPortal.style.display = 'none';
    devPortal.innerHTML = `
      <div class="dev-portal-content">
        <h2>Developer Portal</h2>
        <div class="dev-section">
          <h3>Resource Manipulation</h3>
          <button id="add-minerals">Add 1M Minerals</button>
          <button id="add-credits">Add 100k Credits</button>
          <button id="reset-game">Reset Game State</button>
        </div>
        <div class="dev-section">
          <h3>Upgrade Testing</h3>
          <button id="unlock-all-upgrades">Unlock All Upgrades</button>
          <button id="reset-upgrades">Reset Upgrades</button>
        </div>
        <div class="dev-section">
          <h3>Achievement Testing</h3>
          <button id="unlock-achievements">Unlock All Achievements</button>
        </div>
        <div class="dev-section">
          <h3>Stardust Testing</h3>
          <button id="add-stardust">Add 100 Stardust</button>
          <button id="reset-stardust">Reset Stardust</button>
        </div>
        <button id="close-dev-portal">Close Portal</button>
      </div>
    `;
    document.body.appendChild(devPortal);

    this.setupDevPortalListeners();
  }

  setupDevPortalListeners() {
    const portal = document.getElementById('dev-portal');
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Enter Dev Portal Password';
    document.body.insertBefore(passwordInput, portal);

    passwordInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && passwordInput.value === '8211') {
        portal.style.display = 'block';
        passwordInput.style.display = 'none';
      }
    });

    document.getElementById('add-minerals').addEventListener('click', () => {
      this.game.minerals += 1000000;
      this.game.updateDisplay();
    });

    document.getElementById('add-credits').addEventListener('click', () => {
      this.game.credits += 100000;
      this.game.updateDisplay();
    });

    document.getElementById('reset-game').addEventListener('click', () => {
      this.game.resetToDefaultState();
      this.game.updateDisplay();
    });

    document.getElementById('unlock-all-upgrades').addEventListener('click', () => {
      this.game.upgrades.upgrades.forEach(upgrade => {
        for (let i = 0; i < 100; i++) {
          this.game.upgrades.purchase(upgrade, true);
        }
      });
      this.game.upgrades.updateButtons();
    });

    document.getElementById('reset-upgrades').addEventListener('click', () => {
      this.game.upgrades.reset();
      this.game.upgrades.updateButtons();
    });

    document.getElementById('unlock-achievements').addEventListener('click', () => {
      this.game.achievements.unlocked = new Set(this.game.achievements.achievements.map(achievement => achievement.id));
      this.game.achievements.createAchievementElements();
    });

    document.getElementById('add-stardust').addEventListener('click', () => {
      this.game.stardust += 100;
      this.game.updateDisplay();
    });

    document.getElementById('reset-stardust').addEventListener('click', () => {
      this.game.stardust = 0;
      this.game.updateDisplay();
    });

    document.getElementById('close-dev-portal').addEventListener('click', () => {
      portal.style.display = 'none';
      passwordInput.style.display = 'block';
      passwordInput.value = '';
    });
  }
}