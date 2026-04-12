/* ============================================
   Claude Code Terminal Theme
   Interactive JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    // Press Enter to go to first nav item
    if (e.key === 'Enter') {
      const firstNavItem = document.querySelector('.nav-item');
      if (firstNavItem) {
        window.location.href = firstNavItem.href;
      }
    }

    // Number keys for quick navigation
    const navItems = document.querySelectorAll('.nav-item');
    const keyNum = parseInt(e.key);
    if (keyNum >= 1 && keyNum <= navItems.length) {
      window.location.href = navItems[keyNum - 1].href;
    }
  });

  // Traffic light animations
  const lights = document.querySelectorAll('.light');
  lights.forEach(light => {
    light.addEventListener('click', () => {
      if (light.classList.contains('close')) {
        // Close animation
        document.body.style.opacity = '0';
        setTimeout(() => {
          document.body.style.opacity = '1';
        }, 300);
      } else if (light.classList.contains('minimize')) {
        // Minimize animation
        document.querySelector('.terminal-content').style.display =
          document.querySelector('.terminal-content').style.display === 'none' ? 'block' : 'none';
      } else if (light.classList.contains('maximize')) {
        // Maximize - toggle fullscreen
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      }
    });
  });

  // Typing effect for command (optional)
  const typeWriter = (element, text, speed = 50) => {
    let i = 0;
    element.textContent = '';
    const type = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    };
    type();
  };

  // Update footer with current time (optional)
  const updateFooterTime = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
    const footerPrompt = document.querySelector('.footer-prompt');
    if (footerPrompt) {
      // You can customize this
    }
  };

  // Call on load and every minute
  updateFooterTime();
  setInterval(updateFooterTime, 60000);

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Console easter egg
  console.log('%c🖥️ Claude Code Terminal Theme', 'color: #E07A5F; font-size: 20px; font-weight: bold;');
  console.log('%cBuilt with ❤️ using the Terminal Dark Theme Design System', 'color: #888888;');
  console.log('%cGet the theme: https://github.com/your-repo/claude-code-theme', 'color: #60A5FA;');
});

/* ============================================
   Utility Functions (Export for use)
   ============================================ */

// Create a terminal-style loading indicator
function terminalLoader(message = 'Loading...') {
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  let i = 0;

  const loader = document.createElement('div');
  loader.className = 'terminal-loader';
  loader.innerHTML = `<span class="loader-spinner">${frames[0]}</span> ${message}`;
  loader.style.cssText = 'color: var(--color-primary); font-family: var(--font-mono);';

  const interval = setInterval(() => {
    i = (i + 1) % frames.length;
    loader.querySelector('.loader-spinner').textContent = frames[i];
  }, 80);

  loader.stop = () => {
    clearInterval(interval);
    loader.remove();
  };

  return loader;
}

// Create terminal output
function terminalOutput(type, message) {
  const output = document.createElement('div');
  output.className = `output-${type}`;
  output.textContent = message;
  return output;
}
