document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for all internal anchor links
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectSections = document.querySelectorAll('.project-section');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        projectSections.forEach(section => {
          section.classList.remove('active');
          if (section.id === button.dataset.category) {
            section.classList.add('active');
          }
        });
      });
    });
  });

  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', () => {
      console.log('Form submitted via FormSubmit');
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const fadeEls = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // remove observer after first appearance
        }
      });
    },
    {
      threshold: 0.1 // fire when 10% is visible
    }
  );

  fadeEls.forEach(el => {
    observer.observe(el);
  });
});

// === Project Carousel with Autoplay ===
// Infinite looping carousel for projects section
const track = document.querySelector(".carousel-track");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

// Set arrow symbols
prevBtn.textContent = "<";
nextBtn.textContent = ">";

// Get width of one card (including margin)
const card = document.querySelector(".carousel-card");
const cardStyle = window.getComputedStyle(card);
const cardWidth =
  card.offsetWidth +
  parseInt(cardStyle.marginLeft) +
  parseInt(cardStyle.marginRight);

// Move to next
nextBtn.addEventListener("click", () => {
  track.style.transition = "transform 0.5s ease";
  track.style.transform = `translateX(-${cardWidth}px)`;

  track.addEventListener(
    "transitionend",
    () => {
      track.appendChild(track.firstElementChild); // move first to end
      track.style.transition = "none";
      track.style.transform = "translateX(0)";
    },
    { once: true }
  );
});

// Move to prev
prevBtn.addEventListener("click", () => {
  track.insertBefore(track.lastElementChild, track.firstElementChild); // move last to front
  track.style.transition = "none";
  track.style.transform = `translateX(-${cardWidth}px)`;

  requestAnimationFrame(() => {
    track.style.transition = "transform 0.5s ease";
    track.style.transform = "translateX(0)";
  });
});

// --- AUTOPLAY ---
let autoScroll = setInterval(() => {
  nextBtn.click();
}, 4000); // every 4 seconds

// Pause on hover
const container = document.querySelector(".carousel-container");
container.addEventListener("mouseenter", () => clearInterval(autoScroll));
container.addEventListener("mouseleave", () => {
  autoScroll = setInterval(() => {
    nextBtn.click();
  }, 4000);
});
