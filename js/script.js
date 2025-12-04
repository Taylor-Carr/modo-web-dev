
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

document.getElementById("hamburger").onclick = function () {
    this.classList.toggle("active");
    document.getElementById("mobileMenu").classList.toggle("open");
};


const wrapper = document.querySelector(".story-wrapper");
const paragraphs = document.querySelectorAll(".story-paragraph");

function updateStoryScroll() {
    const rect = wrapper.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const wrapperHeight = rect.height;

    // Before the wrapper reaches the top: nothing active
    if (rect.top > 0) {
        paragraphs.forEach(p => p.classList.remove("active"));
        return;
    }

    // After we've scrolled past the wrapper: keep last paragraph active
    if (rect.bottom <= windowHeight) {
        paragraphs.forEach((p, i) =>
            p.classList.toggle("active", i === paragraphs.length - 1)
        );
        return;
    }

    // While wrapper is in "pinned" phase
    const totalScrollable = wrapperHeight - windowHeight;
    const scrolledInside = Math.min(Math.max(-rect.top, 0), totalScrollable);
    const progress = scrolledInside / totalScrollable;

    const index = Math.min(
        paragraphs.length - 1,
        Math.floor(progress * paragraphs.length)
    );

    paragraphs.forEach((p, i) => {
        p.classList.toggle("active", i === index);
    });
}

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


