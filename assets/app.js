document.documentElement.classList.add("js");
document.body.classList.add("reveal-ready");

const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll("nav a").forEach((link) => {
    const targetPage = link.getAttribute("href")?.split("/").pop();

    if (targetPage === currentPage) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
    }
});

const revealItems = document.querySelectorAll("header, main > section");
const header = document.querySelector("header");

const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.18 }
    );

    revealItems.forEach((item) => observer.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
}
