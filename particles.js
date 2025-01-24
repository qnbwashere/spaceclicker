export function createParticles() {
  const container = document.getElementById('game');
  const particleCount = 100;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    
    particle.style.position = 'absolute';
    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;
    particle.style.background = `hsl(${Math.random() * 360}, 100%, 70%)`;
    particle.style.borderRadius = '50%';
    
    container.appendChild(particle);
    
    // Animate
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 5 + 2;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    let x = startX;
    let y = startY;
    let opacity = 1;
    
    function animate() {
      x += vx;
      y += vy;
      opacity -= 0.01;
      
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.opacity = opacity;
      
      if (opacity > 0) {
        requestAnimationFrame(animate);
      } else {
        particle.remove();
      }
    }
    
    animate();
  }
}