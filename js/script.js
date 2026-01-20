const track = document.querySelector('.projects-track');
let isDown = false, startX, scrollLeft;

track.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
});

track.addEventListener('mouseleave', () => isDown = false);
track.addEventListener('mouseup', () => isDown = false);

track.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2;
    track.scrollLeft = scrollLeft - walk;
});


const burger = document.getElementById("hamburger");
const menu   = document.getElementById("navMenu");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  menu.classList.toggle("open");
});

// re type animation

document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("changingWord");
  if (!el) return;

  const words = ["SIMPLER..", "BETTER..", "FASTER.."]; 
  let index = 0;

  const speedType = 120;
  const speedDelete = 75;
  const pauseAfterType = 1600;
  const pauseAfterDelete = 250;

  const wait = (ms) => new Promise(r => setTimeout(r, ms));

  async function typeWord(word){
    el.textContent = "";
    for (let i = 1; i <= word.length; i++){
      el.textContent = word.slice(0, i);
      await wait(speedType);
    }
  }

  async function deleteWord(){
    for (let i = el.textContent.length; i >= 0; i--){
      el.textContent = el.textContent.slice(0, i);
      await wait(speedDelete);
    }
  }

  async function loop(){
    while(true){
      await typeWord(words[index]);
      await wait(pauseAfterType);
      await deleteWord();
      await wait(pauseAfterDelete);

      index = (index + 1) % words.length;
    }
  }

  loop();
});


// work popup

document.addEventListener("DOMContentLoaded", () => {
const popup = document.getElementById("workPopup");
const closeBtn = document.getElementById("workPopupClose");
const frame = document.getElementById("workPopupFrame");

if (!popup || !frame) return;

const images = [
    "/images/projects/project3.jpg",
    "/images/projects/project4.jpg",
    "/images/projects/project7.jpg"
];

// Preload for smooth swaps
images.forEach(src => {
    const img = new Image();
    img.src = src;
});

let index = 0;
frame.style.backgroundImage = `url("${images[0]}")`;

// Rotate background images
setInterval(() => {
    index = (index + 1) % images.length;
    frame.style.backgroundImage = `url("${images[index]}")`;
}, 3000);

// Hide on scroll (and re-show near the top)
const hideAfter = 40; // px scrolled
const onScroll = () => {
    if (window.scrollY > hideAfter) popup.classList.add("is-hidden");
    else popup.classList.remove("is-hidden");
};

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Close button (stays closed for this page view)
closeBtn.addEventListener("click", () => {
    popup.classList.add("is-hidden");
    window.removeEventListener("scroll", onScroll);
});
});

// Timeline scroll animation
document.addEventListener("scroll", () => {
  const line = document.querySelector(".timeline-line");
  const section = document.querySelector(".timeline");
  const items = document.querySelectorAll(".timeline-item");
  const windowHeight = window.innerHeight;

  const firstCircle = items[0].querySelector(".timeline-circle");
  const lastCircle = items[items.length - 1].querySelector(".timeline-circle");

  // Get vertical positions of first and last circles
  const firstY = firstCircle.getBoundingClientRect().top + window.scrollY + firstCircle.offsetHeight / 2;
  const lastY = lastCircle.getBoundingClientRect().top + window.scrollY + lastCircle.offsetHeight / 2;

  // How far user has scrolled
  const scrollMid = window.scrollY + windowHeight / 2;
  const scrollProgress = scrollMid - firstY;
  const maxHeight = lastY - firstY;

  // Keep line between first & last circles
  const progress = Math.min(Math.max(scrollProgress, 0), maxHeight);

  // Start the line exactly at the center of the first circle
  line.style.top = `${firstCircle.offsetTop + firstCircle.offsetHeight / 2}px`;
  line.style.height = `${progress}px`;

  // Highlight current visible items
  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    const isActive = center > windowHeight * 0.3 && center < windowHeight * 0.7;
    item.classList.toggle("active", isActive);
  });
});


const wrapper = document.querySelector(".story-wrapper");
const paragraphs = document.querySelectorAll(".story-paragraph");

function setActiveParagraph(index) {
    paragraphs.forEach((p, i) => {
        p.classList.toggle("active", i === index);
    });
}

function updateStoryScroll() {
    if (!wrapper || !paragraphs.length) return;

    const rect = wrapper.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const wrapperHeight = rect.height;

    const isMobile = window.innerWidth <= 850;

    // -------- MOBILE BEHAVIOUR (no sticky) --------
    if (isMobile) {
        let activeIndex = 0;
        let smallestDistance = Infinity;

        paragraphs.forEach((p, i) => {
            const pRect = p.getBoundingClientRect();
            const center = (pRect.top + pRect.bottom) / 2;
            const distance = Math.abs(center - windowHeight / 2);

            if (distance < smallestDistance) {
                smallestDistance = distance;
                activeIndex = i;
            }
        });

        setActiveParagraph(activeIndex);
        return;
    }

    const totalScrollable = wrapperHeight - windowHeight;

    // Before the wrapper reaches the top of the viewport
    if (rect.top > 0) {
        setActiveParagraph(0);
        return;
    }

    // After we've scrolled past the wrapper (bottom above viewport bottom)
    if (rect.bottom <= windowHeight) {
        setActiveParagraph(paragraphs.length - 1);
        return;
    }

    // While wrapper is in pinned phase
    const scrolledInside = Math.min(Math.max(-rect.top, 0), totalScrollable);
    const progress = totalScrollable > 0 ? (scrolledInside / totalScrollable) : 0;

    let index = Math.floor(progress * paragraphs.length);
    index = Math.max(0, Math.min(index, paragraphs.length - 1));

    setActiveParagraph(index);
}

// Run on scroll + resize + initial load
window.addEventListener("scroll", updateStoryScroll);
window.addEventListener("resize", updateStoryScroll);
updateStoryScroll();


window.addEventListener("scroll", updateStoryScroll);
window.addEventListener("load", updateStoryScroll);


const tabs = document.querySelectorAll(".motion-tab");
const panels = document.querySelectorAll(".motion-panel");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        const target = tab.dataset.target;

        // update tabs
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        // update content panels
        panels.forEach(panel => {
            panel.classList.remove("active");
            if (panel.id === target) {
                panel.classList.add("active");
            }
        });
    });
});

const items = document.querySelectorAll(".faq-item");

items.forEach(item => {
    const header = item.querySelector(".faq-header");

    header.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");

        // Close all items
        items.forEach(i => i.classList.remove("active"));

        // Open the clicked one if it wasn't already open
        if (!isOpen) {
            item.classList.add("active");
        }
    });
});

document.addEventListener("DOMContentLoaded", function(){
    if(!localStorage.getItem("privacyAccepted")){
        document.getElementById("privacy-popup").style.display = "block";
    }
});

function closePrivacyPopup(){
    document.getElementById("privacy-popup").style.display = "none";
    localStorage.setItem("privacyAccepted", true);
}


function openPolicyModal(){
    document.getElementById("privacy-modal").style.display = "block";
}

function closePolicyModal(){
    document.getElementById("privacy-modal").style.display = "none";
}



