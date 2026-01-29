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


(function(){
  const imgs = document.querySelectorAll('.hero-thumbImg');
  if(!imgs.length) return;

  let i = 0;
  const intervalMs = 2800; // change speed here

  setInterval(() => {
    imgs[i].classList.remove('active');
    i = (i + 1) % imgs.length;
    imgs[i].classList.add('active');
  }, intervalMs);
})();

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


const CONSENT_KEY = "siteConsent_v1";

function getConsent() {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setConsent(consentObj) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify({
    ...consentObj,
    updatedAt: new Date().toISOString()
  }));
}

function hidePopup() {
  const popup = document.getElementById("privacy-popup");
  if (popup) popup.style.display = "none";
}

function showPopup() {
  const popup = document.getElementById("privacy-popup");
  if (popup) popup.style.display = "block";
}

/* --- Preferences modal open/close --- */
function openPreferences() {
  const modal = document.getElementById("prefs-modal");
  const consent = getConsent();

  // preload toggles
  document.getElementById("pref-analytics").checked = !!consent?.analytics;
  document.getElementById("pref-marketing").checked = !!consent?.marketing;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

function closePreferences() {
  const modal = document.getElementById("prefs-modal");
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

function openPreferencesFromMenu() {
  // do not show the small popup; open the full preferences directly
  hidePopup();
  openPreferences();
}

/* --- Consent actions --- */
function savePreferences() {
  const analytics = document.getElementById("pref-analytics").checked;
  const marketing = document.getElementById("pref-marketing").checked;

  setConsent({ necessary: true, analytics, marketing });
  closePreferences();
  hidePopup();

  // Optional: enable/disable scripts here based on consent
  // applyConsent();
}

function acceptAll() {
  setConsent({ necessary: true, analytics: true, marketing: true });
  closePreferences();
  hidePopup();
  // applyConsent();
}

function rejectOptional() {
  setConsent({ necessary: true, analytics: false, marketing: false });
  closePreferences();
  hidePopup();
  // applyConsent();
}

/* Your existing function can call acceptAll or just hide popup */
function closePrivacyPopup() {
  acceptAll(); // matches your current “Continue” behaviour
}

/* Show popup only if no consent saved yet */
document.addEventListener("DOMContentLoaded", () => {
  const consent = getConsent();
  if (!consent) showPopup();
  else hidePopup();
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

// TEST CAROUSEL 

(function () {
  const csTrack = document.getElementById("csTrack");
  const csPrevBtn = document.getElementById("csPrevBtn");
  const csNextBtn = document.getElementById("csNextBtn");

  function csCardStepPx() {
    const first = csTrack.querySelector(".cs-card");
    if (!first) return 320;

    const styles = getComputedStyle(csTrack);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;

    return first.getBoundingClientRect().width + gap;
  }

  function csUpdateButtons() {
    const maxScrollLeft = csTrack.scrollWidth - csTrack.clientWidth - 2;
    csPrevBtn.disabled = csTrack.scrollLeft <= 2;
    csNextBtn.disabled = csTrack.scrollLeft >= maxScrollLeft;
  }

  function csScrollByCard(dir) {
    csTrack.scrollBy({ left: dir * csCardStepPx(), behavior: "smooth" });
  }

  csPrevBtn.addEventListener("click", () => csScrollByCard(-1));
  csNextBtn.addEventListener("click", () => csScrollByCard(1));
  csTrack.addEventListener("scroll", csUpdateButtons, { passive: true });
  window.addEventListener("resize", csUpdateButtons);

  // drag-to-scroll
  let csIsDown = false;
  let csStartX = 0;
  let csStartScrollLeft = 0;

  csTrack.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    csIsDown = true;
    csTrack.setPointerCapture(e.pointerId);
    csStartX = e.clientX;
    csStartScrollLeft = csTrack.scrollLeft;
    csTrack.style.scrollBehavior = "auto";
  });

  csTrack.addEventListener("pointermove", (e) => {
    if (!csIsDown) return;
    const dx = e.clientX - csStartX;
    csTrack.scrollLeft = csStartScrollLeft - dx;
  });

  function csEndDrag() {
    if (!csIsDown) return;
    csIsDown = false;
    csTrack.style.scrollBehavior = "smooth";

    // settle snap in some browsers
    csTrack.scrollBy({ left: 0, behavior: "smooth" });
    csUpdateButtons();
  }

  csTrack.addEventListener("pointerup", csEndDrag);
  csTrack.addEventListener("pointercancel", csEndDrag);
  csTrack.addEventListener("pointerleave", csEndDrag);

  // initial state
  csUpdateButtons();
})();





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



