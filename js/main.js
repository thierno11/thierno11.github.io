// Année dans le footer
document.getElementById("year").textContent = new Date().getFullYear();

// Menu mobile
const toggle = document.querySelector(".nav__toggle");
const links = document.querySelector(".nav__links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", open);
});
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", false);
  })
);

// Bordure de la barre de navigation au défilement
const nav = document.querySelector(".nav");
window.addEventListener("scroll", () => nav.classList.toggle("scrolled", window.scrollY > 20));

// Effet "machine à écrire" sur le rôle
const typed = document.querySelector(".typed");
const words = JSON.parse(typed.dataset.words);
let w = 0, c = words[0].length, deleting = true;
function type() {
  const word = words[w];
  typed.textContent = word.slice(0, c);
  if (deleting) {
    c--;
    if (c < 0) { deleting = false; w = (w + 1) % words.length; c = 0; }
  } else {
    c++;
    if (c > words[w].length) { deleting = true; return setTimeout(type, 1800); }
  }
  setTimeout(type, deleting ? 45 : 90);
}
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setTimeout(type, 1800);

// Apparition des éléments au défilement
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
