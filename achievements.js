export class Achievements {
  constructor(game) {
    this.game = game;
    this.achievements = [
      {
        id: 'first-click',
        name: 'First Contact',
        description: 'Click your first asteroid',
        check: () => this.game.minerals >= 1,
        reward: '+1 mineral per click'
      },
      {
        id: 'thousand',
        name: 'Thousand Club',
        description: 'Reach 1,000 minerals',
        check: () => this.game.minerals >= 1000,
        reward: '+2 minerals per click'
      },
      {
        id: 'first-million',
        name: 'First Million',
        description: 'Mine 1,000,000 minerals',
        check: () => this.game.minerals >= 1000000,
        reward: '+5 minerals per click'
      },
      {
        id: 'upgrade-master',
        name: 'Upgrade Master',
        description: 'Own all upgrades',
        check: () => {
          return Array.from(this.game.upgrades.owned.values())
            .every(count => count > 0);
        },
        reward: 'Mining speed increased by 10%!'
      },
      {
        id: 'collector',
        name: 'Collector',
        description: 'Own 10 of any upgrade',
        check: () => {
          return Array.from(this.game.upgrades.owned.values())
            .some(count => count >= 10);
        },
        reward: 'Mining efficiency increased by 5%'
      },
      {
        id: 'billionaire',
        name: 'Space Billionaire',
        description: 'Reach 1 billion minerals',
        check: () => this.game.minerals >= 1000000000,
        reward: 'Double all mineral gains'
      },
      {
        id: 'prestige-master',
        name: 'Stardust Pioneer',
        description: 'Prestige for the first time',
        check: () => this.game.stardust > 0,
        reward: 'Start with 100 minerals after prestige'
      },
      {
        id: 'speed-demon',
        name: 'Speed Demon',
        description: 'Reach 1000 minerals per second',
        check: () => this.game.mineralsPerSecond >= 1000,
        reward: 'Clicking power increased by 50%'
      }
    ];

    this.unlocked = new Set();
    this.createAchievementElements();

    // Add achievement page controls
    document.getElementById('show-achievements').addEventListener('click', () => {
      document.getElementById('achievements-page').classList.add('visible');
    });

    document.getElementById('close-achievements').addEventListener('click', () => {
      document.getElementById('achievements-page').classList.remove('visible');
    });

    // Add achievement panel toggle
    const achievementsToggle = document.getElementById('achievements-toggle');
    achievementsToggle.addEventListener('click', () => {
      const achievementsPanel = document.getElementById('achievements');
      achievementsPanel.classList.toggle('visible');
    });

    // Close achievements page when clicking ESC
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.getElementById('achievements-page').classList.remove('visible');
      }
    });
  }

  createAchievementElements() {
    const container = document.getElementById('achievement-list');
    container.innerHTML = ''; // Clear existing achievements
    
    this.achievements.forEach(achievement => {
      const element = document.createElement('div');
      element.className = 'achievement locked';
      element.id = `achievement-${achievement.id}`;
      
      element.innerHTML = `
        <h3>${achievement.name}</h3>
        <p>${achievement.description}</p>
        <p class="reward">Reward: ${achievement.reward}</p>
      `;
      
      container.appendChild(element);
    });
  }

  check() {
    this.achievements.forEach(achievement => {
      if (!this.unlocked.has(achievement.id) && achievement.check()) {
        this.unlock(achievement);
      }
    });
  }

  unlock(achievement) {
    this.unlocked.add(achievement.id);
    
    const element = document.getElementById(`achievement-${achievement.id}`);
    element.classList.remove('locked');
    element.classList.add('unlocked');
    
    // Apply achievement rewards
    switch(achievement.id) {
      case 'first-click':
        this.game.mineralsPerClick += 1;
        break;
      case 'thousand':
        this.game.mineralsPerClick += 2;
        break;
      case 'first-million':
        this.game.mineralsPerClick += 5;
        break;
      case 'upgrade-master':
        this.game.multiplier *= 1.1;
        break;
      case 'collector':
        this.game.multiplier *= 1.05;
        break;
      case 'billionaire':
        this.game.multiplier *= 2;
        break;
      case 'speed-demon':
        this.game.mineralsPerClick *= 1.5;
        break;
    }
    
    // Show notification
    this.showNotification(achievement);
  }

  showNotification(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
      <h3>Achievement Unlocked!</h3>
      <p>${achievement.name}</p>
      <p>${achievement.reward}</p>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => notification.remove(), 1000);
    }, 3000);
  }
}