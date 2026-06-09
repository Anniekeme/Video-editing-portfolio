// Custom cursor
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
  requestAnimationFrame(animateRing);
}
animateRing();

document
  .querySelectorAll("a, button, .video-card, .featured-wrap")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("hover"));
    el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
  });

// Videos
const videos = [
  {
    id: "oYBfw-0ysn0",
    title: "Audio Edit | Before & After",
    cat: "Social Media",
  },
  { id: "8COkBo07mq0", title: "Roblox gaming", cat: "Gaming" },
  { id: "9dfBLcEJ2R4", title: "Podcast", cat: "Podcast" },
];

const grid = document.getElementById("videoGrid");
videos.forEach((v) => {
  const el = document.createElement("div");
  el.className = "video-card";
  el.innerHTML = `
      <div class="thumb">
        <img src="https://img.youtube.com/vi/${v.id}/hqdefault.jpg" alt="${v.title}" loading="lazy" />
        <div class="mini-play">
          <div class="mini-play-icon">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
      </div>
      <div class="card-info">
        <h3>${v.title}</h3>
        <p>${v.cat}</p>
      </div>
    `;
  el.addEventListener("click", () => openModal(v.id));
  el.addEventListener("mouseenter", () => ring.classList.add("hover"));
  el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
  grid.appendChild(el);
});

// Modal
function openModal(id) {
  document.getElementById("modal").classList.add("open");
  document.getElementById("player").src =
    `https://www.youtube.com/embed/${id}?autoplay=1&start=2`;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modal").classList.remove("open");
  document.getElementById("player").src = "";
  document.body.style.overflow = "";
}

function handleModalClick(e) {
  if (e.target === document.getElementById("modal")) closeModal();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Scroll reveal
const reveals = document.querySelectorAll(".reveal");
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 80);
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);
reveals.forEach((el) => obs.observe(el));

const testimonialToggles = document.querySelectorAll(".testimonial-toggle");

testimonialToggles.forEach((button) => {
  const card = button.closest(".testimonial-card");
  button.addEventListener("click", () => {
    const expanded = card.classList.toggle("expanded");
    button.textContent = expanded ? "Read less" : "Read more";
    button.setAttribute("aria-expanded", expanded);
  });
});
