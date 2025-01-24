export class Upgrades {
  constructor(game) {
    this.game = game;
    this.upgrades = [
      {
        id: 'laser',
        name: 'Handheld Laser',
        baseMineral: 50,
        baseCredit: 0,
        description: 'Increases minerals per click by 4',
        visualTier: 1,
        effect: () => {
          this.game.mineralsPerClick += 4;
          this.updateVisuals(1);
        }
      },
      {
        id: 'plasma',
        name: 'Plasma Cutter',
        baseMineral: 200,
        baseCredit: 0,
        description: 'Increases minerals per click by 8',
        visualTier: 2,
        effect: () => {
          this.game.mineralsPerClick += 8;
          this.updateVisuals(2);
        }
      },
      {
        id: 'market',
        name: 'Mineral Market',
        baseMineral: 400,
        baseCredit: 0,
        description: 'Sells minerals automatically, earning 1 credit per 1000 minerals per second',
        visualTier: 3,
        effect: () => {
          this.game.creditsPerSecond += 0.001;
          this.updateVisuals(3);
        }
      },
      {
        id: 'drone',
        name: 'Mining Drone',
        baseMineral: 500,
        baseCredit: 0,
        description: 'Generates 10 minerals per second',
        visualTier: 4,
        effect: () => {
          this.game.mineralsPerSecond += 10;
          this.updateVisuals(4);
        }
      },
      {
        id: 'swarm',
        name: 'Drone Swarm',
        baseMineral: 1000,
        baseCredit: 100,
        description: 'Generates 25 minerals per second',
        visualTier: 5,
        effect: () => {
          this.game.mineralsPerSecond += 25;
          this.updateVisuals(5);
        }
      },
      {
        id: 'turret',
        name: 'Laser Turret',
        baseMineral: 2000,
        baseCredit: 200,
        description: 'Generates 50 minerals per second',
        visualTier: 6,
        effect: () => {
          this.game.mineralsPerSecond += 50;
          this.updateVisuals(6);
        }
      },
      {
        id: 'trade',
        name: 'Trade Network',
        baseMineral: 5000,
        baseCredit: 300,
        description: 'Improves mineral selling, earning 2 credits per 1000 minerals per second',
        visualTier: 7,
        effect: () => {
          this.game.creditsPerSecond += 0.002;
          this.updateVisuals(7);
        }
      },
      {
        id: 'station',
        name: 'Asteroid Harvesting Station',
        baseMineral: 10000,
        baseCredit: 1000,
        description: 'Generates 200 minerals per second',
        visualTier: 8,
        effect: () => {
          this.game.mineralsPerSecond += 200;
          this.updateVisuals(8);
        }
      },
      {
        id: 'quantum',
        name: 'Quantum Driller',
        baseMineral: 50000,
        baseCredit: 5000,
        description: 'Generates 500 minerals per second',
        visualTier: 9,
        effect: () => {
          this.game.mineralsPerSecond += 500;
          this.updateVisuals(9);
        }
      },
      {
        id: 'refinery',
        name: 'Mineral Refinery',
        baseMineral: 75000,
        baseCredit: 7500,
        description: 'Refines minerals for better value, earning 5 credits per 1000 minerals per second',
        visualTier: 10,
        effect: () => {
          this.game.creditsPerSecond += 0.005;
          this.updateVisuals(10);
        }
      },
      {
        id: 'nanobots',
        name: 'Nano Swarm',
        baseMineral: 100000,
        baseCredit: 10000,
        description: 'Generates 1000 minerals per second',
        visualTier: 11,
        effect: () => {
          this.game.mineralsPerSecond += 1000;
          this.updateVisuals(11);
        }
      },
      {
        id: 'wormhole',
        name: 'Wormhole Extractor',
        baseMineral: 200000,
        baseCredit: 20000,
        description: 'Generates 2000 minerals per second',
        visualTier: 12,
        effect: () => {
          this.game.mineralsPerSecond += 2000;
          this.updateVisuals(12);
        }
      },
      {
        id: 'dyson',
        name: 'Dyson Mineral Sphere',
        baseMineral: 500000,
        baseCredit: 50000,
        description: 'Generates 5000 minerals per second',
        visualTier: 13,
        effect: () => {
          this.game.mineralsPerSecond += 5000;
          this.updateVisuals(13);
        }
      },
      {
        id: 'solar-sail',
        name: 'Solar Sail Collector',
        baseMineral: 750000,
        baseCredit: 75000,
        description: 'Generates 7500 minerals per second using advanced solar technology',
        visualTier: 14,
        effect: () => {
          this.game.mineralsPerSecond += 7500;
          this.updateVisuals(14);
        }
      },
      {
        id: 'gravity-extractor',
        name: 'Gravity Well Extractor',
        baseMineral: 1000000,
        baseCredit: 100000,
        description: 'Uses gravitational fields to extract dense mineral deposits, generating 10000 minerals per second',
        visualTier: 15,
        effect: () => {
          this.game.mineralsPerSecond += 10000;
          this.updateVisuals(15);
        }
      },
      {
        id: 'quantum-resonator',
        name: 'Quantum Mineral Resonator',
        baseMineral: 1500000,
        baseCredit: 150000,
        description: 'Quantum technology that extracts minerals through dimensional rifts, generating 15000 minerals per second',
        visualTier: 16,
        effect: () => {
          this.game.mineralsPerSecond += 15000;
          this.updateVisuals(16);
        }
      },
      {
        id: 'hyperdrive',
        name: 'Hyperdrive Extractor',
        baseMineral: 2000000,
        baseCredit: 200000,
        description: 'Uses faster-than-light technology to extract 25000 minerals per second',
        visualTier: 17,
        effect: () => {
          this.game.mineralsPerSecond += 25000;
          this.updateVisuals(17);
        }
      },
      {
        id: 'multidimensional',
        name: 'Multidimensional Harvester',
        baseMineral: 3000000,
        baseCredit: 300000,
        description: 'Extracts minerals from parallel dimensions, generating 50000 minerals per second',
        visualTier: 18,
        effect: () => {
          this.game.mineralsPerSecond += 50000;
          this.updateVisuals(18);
        }
      }
    ];

    this.upgrades.push(
      {
        id: 'quantum-harvester',
        name: 'Quantum Harvester',
        baseMineral: 2500000,
        baseCredit: 250000,
        description: 'Generates 100,000 minerals per second using quantum resonance',
        visualTier: 19,
        effect: () => {
          this.game.mineralsPerSecond += 100000;
          this.updateVisuals(19);
        }
      },
      {
        id: 'dimensional-rift',
        name: 'Dimensional Rift Extractor',
        baseMineral: 5000000,
        baseCredit: 500000,
        description: 'Extracts minerals from parallel dimensions, generating 250,000 minerals per second',
        visualTier: 20,
        effect: () => {
          this.game.mineralsPerSecond += 250000;
          this.updateVisuals(20);
        }
      },
      {
        id: 'dark-matter-forge',
        name: 'Dark Matter Forge',
        baseMineral: 10000000,
        baseCredit: 1000000,
        description: 'Converts dark matter into pure minerals, generating 500,000 minerals per second',
        visualTier: 21,
        effect: () => {
          this.game.mineralsPerSecond += 500000;
          this.updateVisuals(21);
        }
      }
    );

    this.currentVisualTier = 0;
    this.owned = new Map();
    this.createUpgradeElements();
  }

  calculateCost(upgrade) {
    const count = this.owned.get(upgrade.id) || 0;
    const multiplier = Math.pow(1.05, count + 1); 
    return {
      mineralCost: Math.floor(upgrade.baseMineral * multiplier * 1.05),
      creditCost: Math.floor(upgrade.baseCredit * multiplier * 1.05)
    };
  }

  updateVisuals(tier) {
    const asteroid = document.getElementById('asteroid');
    const colors = [
      '#555', 
      '#4466ff', 
      '#ff44ff', 
      '#44ffff', 
      '#ffff44', 
      '#ff4444', 
      '#44ff44', 
      '#8844ff', 
      '#ff8844', 
      '#44ffaa', 
      '#aa44ff', 
      '#ffaa44', 
      '#44ffdd', 
      '#dd44ff', 
      '#11aaff', 
      '#ff11aa', 
      '#11ffaa',
      '#22bbcc',
      '#33ddaa', 
      '#44ffaa', 
      '#55ffaa', 
      '#66ffaa'
    ];
    
    const animationEffects = [
      'none', 
      'moon-spin 5s linear infinite', 
      'moon-spin 5s linear infinite, moon-rain 2s linear infinite', 
      'moon-spin 5s linear infinite, moon-rain 2s linear infinite, moon-pulse 2s ease-in-out infinite', 
      'moon-spin 5s linear infinite, moon-rain 2s linear infinite, moon-pulse 2s ease-in-out infinite, moon-fragment 5s linear infinite', 
      'moon-spin 5s linear infinite, moon-rain 2s linear infinite, moon-pulse 2s ease-in-out infinite, moon-fragment 5s linear infinite, moon-vortex 5s linear infinite', 
      'moon-spin 5s linear infinite, moon-rain 2s linear infinite, moon-pulse 2s ease-in-out infinite, moon-fragment 5s linear infinite, moon-vortex 5s linear infinite, moon-orbit 5s linear infinite', 
      'moon-spin 5s linear infinite, moon-rain 2s linear infinite, moon-pulse 2s ease-in-out infinite, moon-fragment 5s linear infinite, moon-vortex 5s linear infinite, moon-orbit 5s linear infinite, moon-swirl 2s ease-in-out infinite', 
      'moon-spin 5s linear infinite, moon-rain 2s linear infinite, moon-pulse 2s ease-in-out infinite, moon-fragment 5s linear infinite, moon-vortex 5s linear infinite, moon-orbit 5s linear infinite, moon-swirl 2s ease-in-out infinite, moon-ripple 5s linear infinite', 
      'moon-spin 5s linear infinite, moon-rain 2s linear infinite, moon-pulse 2s ease-in-out infinite, moon-fragment 5s linear infinite, moon-vortex 5s linear infinite, moon-orbit 5s linear infinite, moon-swirl 2s ease-in-out infinite, moon-ripple 5s linear infinite, moon-bloom 2s ease-in-out infinite', 
      'moon-spin 5s linear infinite, moon-rain 2s linear infinite, moon-pulse 2s ease-in-out infinite, moon-fragment 5s linear infinite, moon-vortex 5s linear infinite, moon-orbit 5s linear infinite, moon-swirl 2s ease-in-out infinite, moon-ripple 5s linear infinite, moon-bloom 2s ease-in-out infinite, moon-supernova 2s ease-in-out infinite', 
      'moon-spin 5s linear infinite, moon-rain 2s linear infinite, moon-pulse 2s ease-in-out infinite, moon-fragment 5s linear infinite, moon-vortex 5s linear infinite, moon-orbit 5s linear infinite, moon-swirl 2s ease-in-out infinite, moon-ripple 5s linear infinite, moon-bloom 2s ease-in-out infinite, moon-supernova 2s ease-in-out infinite, moon-zoom 2s ease-in-out infinite', 
      'moon-spin 5s linear infinite, moon-rain 2s linear infinite, moon-pulse 2s ease-in-out infinite, moon-fragment 5s linear infinite, moon-vortex 5s linear infinite, moon-orbit 5s linear infinite, moon-swirl 2s ease-in-out infinite, moon-ripple 5s linear infinite, moon-bloom 2s ease-in-out infinite, moon-supernova 2s ease-in-out infinite, moon-zoom 2s ease-in-out infinite, moon-wave 2s ease-in-out infinite', 
      'moon-spin 5s linear infinite, moon-rain 2s linear infinite, moon-pulse 2s ease-in-out infinite, moon-fragment 5s linear infinite, moon-vortex 5s linear infinite, moon-orbit 5s linear infinite, moon-swirl 2s ease-in-out infinite, moon-ripple 5s linear infinite, moon-bloom 2s ease-in-out infinite, moon-supernova 2s ease-in-out infinite, moon-zoom 2s ease-in-out infinite, moon-wave 2s ease-in-out infinite, moon-explosion 2s ease-in-out infinite', 
      'moon-spin 5s linear infinite, moon-rain 2s linear infinite, moon-pulse 2s ease-in-out infinite, moon-fragment 5s linear infinite, moon-vortex 5s linear infinite, moon-orbit 5s linear infinite, moon-swirl 2s ease-in-out infinite, moon-ripple 5s linear infinite, moon-bloom 2s ease-in-out infinite, moon-supernova 2s ease-in-out infinite, moon-zoom 2s ease-in-out infinite, moon-wave 2s ease-in-out infinite, moon-explosion 2s ease-in-out infinite, moon-fragment 5s linear infinite', 
      'moon-spin 5s linear infinite, moon-rain 2s linear infinite, moon-pulse 2s ease-in-out infinite, moon-fragment 5s linear infinite, moon-vortex 5s linear infinite, moon-orbit 5s linear infinite, moon-swirl 2s ease-in-out infinite, moon-ripple 5s linear infinite, moon-bloom 2s ease-in-out infinite, moon-supernova 2s ease-in-out infinite, moon-zoom 2s ease-in-out infinite, moon-wave 2s ease-in-out infinite, moon-explosion 2s ease-in-out infinite, moon-fragment 5s linear infinite, moon-vortex 5s linear infinite', 
      'moon-spin 5s linear infinite, moon-rain 2s linear infinite, moon-pulse 2s ease-in-out infinite, moon-fragment 5s linear infinite, moon-vortex 5s linear infinite, moon-orbit 5s linear infinite, moon-swirl 2s ease-in-out infinite, moon-ripple 5s linear infinite, moon-bloom 2s ease-in-out infinite, moon-supernova 2s ease-in-out infinite, moon-zoom 2s ease-in-out infinite, moon-wave 2s ease-in-out infinite, moon-explosion 2s ease-in-out infinite, moon-fragment 5s linear infinite, moon-vortex 5s linear infinite, moon-orbit 5s linear infinite', 
      'moon-spin 5s linear infinite, moon-rain 2s linear infinite, moon-pulse 2s ease-in-out infinite, moon-fragment 5s linear infinite, moon-vortex 5s linear infinite, moon-orbit 5s linear infinite, moon-swirl 2s ease-in-out infinite, moon-ripple 5s linear infinite, moon-bloom 2s ease-in-out infinite, moon-supernova 2s ease-in-out infinite, moon-zoom 2s ease-in-out infinite, moon-wave 2s ease-in-out infinite, moon-explosion 2s ease-in-out infinite, moon-fragment 5s linear infinite, moon-vortex 5s linear infinite, moon-orbit 5s linear infinite, moon-swirl 2s ease-in-out infinite', 
      'moon-spin 5s linear infinite, moon-rain 2s linear infinite, moon-pulse 2s ease-in-out infinite, moon-fragment 5s linear infinite, moon-vortex 5s linear infinite, moon-orbit 5s linear infinite, moon-swirl 2s ease-in-out infinite, moon-ripple 5s linear infinite, moon-bloom 2s ease-in-out infinite, moon-supernova 2s ease-in-out infinite, moon-zoom 2s ease-in-out infinite, moon-wave 2s ease-in-out infinite, moon-explosion 2s ease-in-out infinite, moon-fragment 5s linear infinite, moon-vortex 5s linear infinite, moon-orbit 5s linear infinite, moon-swirl 2s ease-in-out infinite, moon-ripple 5s linear infinite', 
      'moon-spin 5s linear infinite, moon-rain 2s linear infinite, moon-pulse 2s ease-in-out infinite, moon-fragment 5s linear infinite, moon-vortex 5s linear infinite, moon-orbit 5s linear infinite, moon-swirl 2s ease-in-out infinite, moon-ripple 5s linear infinite, moon-bloom 2s ease-in-out infinite, moon-supernova 2s ease-in-out infinite, moon-zoom 2s ease-in-out infinite, moon-wave 2s ease-in-out infinite, moon-explosion 2s ease-in-out infinite, moon-fragment 5s linear infinite, moon-vortex 5s linear infinite, moon-orbit 5s linear infinite, moon-swirl 2s ease-in-out infinite, moon-ripple 5s linear infinite, moon-bloom 2s ease-in-out infinite', 
      'moon-spin 5s linear infinite, moon-rain 2s linear infinite, moon-pulse 2s ease-in-out infinite, moon-fragment 5s linear infinite, moon-vortex 5s linear infinite, moon-orbit 5s linear infinite, moon-swirl 2s ease-in-out infinite, moon-ripple 5s linear infinite, moon-bloom 2s ease-in-out infinite, moon-supernova 2s ease-in-out infinite, moon-zoom 2s ease-in-out infinite, moon-wave 2s ease-in-out infinite, moon-explosion 2s ease-in-out infinite, moon-fragment 5s linear infinite, moon-vortex 5s linear infinite, moon-orbit 5s linear infinite, moon-swirl 2s ease-in-out infinite, moon-ripple 5s linear infinite, moon-bloom 2s ease-in-out infinite, moon-supernova 2s ease-in-out infinite'
    ];
    
    const animationSpeeds = [
      '5s', '4.5s', '4s', '3.5s', '3s', '2.5s', '2s', '1.5s', 
      '1.25s', '1s', '0.9s', '0.8s', '0.7s', '0.6s', '0.5s', 
      '0.4s', '0.3s', '0.25s', '0.2s', '0.15s', '0.1s'
    ];

    const speed = animationSpeeds[Math.min(tier, animationSpeeds.length - 1)];
    asteroid.style.animationDuration = speed;

    asteroid.style.animation = animationEffects[tier] || 
      animationEffects[animationEffects.length - 1];
    
    if (tier > this.currentVisualTier) {
      this.currentVisualTier = tier;
      const currentColor = colors[Math.min(tier, colors.length - 1)];
      
      asteroid.style.background = `radial-gradient(circle, ${currentColor}, #333)`;
      asteroid.style.boxShadow = `0 0 ${20 + tier * 5}px ${currentColor}`;
      
      asteroid.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(1.05)' },
        { transform: 'scale(1)' }
      ], {
        duration: 500,
        easing: 'ease-in-out'
      });
    }

    const craterCount = Math.min(20, 8 + Math.floor(tier / 2));
    const asteroid_el = document.getElementById('asteroid');
    asteroid_el.innerHTML = ''; 
    
    for (let i = 0; i < craterCount; i++) {
      const crater = document.createElement('div');
      crater.className = 'crater';
      
      const size = 10 + Math.random() * (20 + tier * 2);
      crater.style.width = `${size}px`;
      crater.style.height = `${size}px`;
      
      crater.style.left = `${Math.random() * 80}%`;
      crater.style.top = `${Math.random() * 80}%`;
      
      crater.style.background = `radial-gradient(circle at center, 
        rgba(0,0,0,${0.2 + tier * 0.03}),
        rgba(0,0,0,${0.1 + tier * 0.02}) 60%,
        transparent)`;
      
      asteroid_el.appendChild(crater);
    }
  }

  createUpgradeElements() {
    const container = document.getElementById('upgrade-list');
    container.innerHTML = ''; 
    
    this.upgrades.forEach(upgrade => {
      const element = document.createElement('div');
      element.className = 'upgrade-item';
      element.id = `upgrade-${upgrade.id}`;
      
      element.innerHTML = `
        <h3>${upgrade.name}</h3>
        <p>${upgrade.description}</p>
        <p class="cost"></p>
        <p>Owned: <span class="owned">0</span></p>
      `;
      
      element.addEventListener('click', () => this.purchase(upgrade));
      container.appendChild(element);
      
      this.owned.set(upgrade.id, 0);
    });
  }

  purchase(upgrade, silent = false) {
    const costs = this.calculateCost(upgrade);
    
    if (!silent && (this.game.minerals < costs.mineralCost || 
        this.game.credits < costs.creditCost)) {
      return false;
    }
    
    if (!silent) {
      this.game.minerals -= costs.mineralCost;
      this.game.credits -= costs.creditCost;
    }
    
    const count = this.owned.get(upgrade.id) + 1;
    this.owned.set(upgrade.id, count);
    
    upgrade.effect();
    
    if (!silent) {
      this.updateButtons();
      this.game.achievements.check();
    }
    
    return true;
  }

  updateButtons() {
    this.upgrades.forEach(upgrade => {
      const element = document.getElementById(`upgrade-${upgrade.id}`);
      const costs = this.calculateCost(upgrade);
      const canAfford = this.game.minerals >= costs.mineralCost && 
                       this.game.credits >= costs.creditCost;
      
      element.classList.toggle('disabled', !canAfford);
      element.querySelector('.owned').textContent = this.owned.get(upgrade.id);
      element.querySelector('.cost').textContent = 
        `Cost: ${costs.mineralCost} minerals ${costs.creditCost ? `+ ${costs.creditCost} credits` : ''}`;
    });
  }

  reset() {
    this.owned.clear();
    this.upgrades.forEach(upgrade => {
      this.owned.set(upgrade.id, 0);
    });
    this.updateButtons();
    this.updateVisuals(0);
  }
}