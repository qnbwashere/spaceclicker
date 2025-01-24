class SpaceBackground {
  constructor() {
    this.container = document.getElementById('space-background');
    this.createStars();
    this.createFloatingObjects();
  }

  createStars() {
    const starCount = 200;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      
      // Vary star size and opacity
      const size = Math.random() * 3;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.opacity = Math.random();
      
      this.container.appendChild(star);
    }
  }

  createFloatingObjects() {
    const objects = [
      { type: 'asteroid', count: 5 },
      { type: 'planet', count: 3 },
      { type: 'spaceship', count: 2 },
      { type: 'text', count: 1 }
    ];

    objects.forEach(objType => {
      for (let i = 0; i < objType.count; i++) {
        const obj = document.createElement('div');
        obj.classList.add('floating-object', objType.type);
        
        // Randomize position
        obj.style.left = `${Math.random() * 100}%`;
        obj.style.top = `${Math.random() * 100}%`;
        
        // Randomize size
        const size = 50 + Math.random() * 100;
        obj.style.width = `${size}px`;
        obj.style.height = `${size}px`;
        
        // Add text for text object
        if (objType.type === 'text') {
          obj.textContent = 'QnB';
          obj.style.fontSize = '48px';
          obj.style.color = 'white';
          obj.style.display = 'flex';
          obj.style.alignItems = 'center';
          obj.style.justifyContent = 'center';
        }
        
        // Randomize animation
        obj.style.animationDuration = `${30 + Math.random() * 60}s`;
        obj.style.animationDelay = `${Math.random() * 10}s`;
        obj.style.animationDirection = Math.random() > 0.5 ? 'alternate' : 'alternate-reverse';
        
        this.container.appendChild(obj);
      }
    });
  }
}

// Initialize space background when the start screen loads
document.addEventListener('DOMContentLoaded', () => {
  new SpaceBackground();
});