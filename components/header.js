// Header functionality
document.addEventListener("DOMContentLoaded", function () {
  // Load header component
  loadHeader();

  // Initialize navbar scroll effect
  initNavbarScrollEffect();

  // Set active navigation link
  setActiveNavLink();
});

function loadHeader() {
  const headerContainer = document.getElementById("header-container");
  if (headerContainer) {
    fetch("components/header.html")
      .then((response) => response.text())
      .then((html) => {
        headerContainer.innerHTML = html;
        // Re-initialize after loading
        initNavbarScrollEffect();
        setActiveNavLink();
      })
      .catch((error) => {
        console.error("Error loading header:", error);
        // Fallback: show a basic header if component fails to load
        headerContainer.innerHTML = `
                    <nav class="navbar navbar-expand-lg">
                        <div class="container">
                            <a class="navbar-brand" href="index.html">
                                <i class="fas fa-mountain"></i>
                                TravelFlow
                            </a>
                        </div>
                    </nav>
                `;
      });
  }
}

function initNavbarScrollEffect() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");

    if (
      href === currentPage ||
      (currentPage === "" && href === "index.html") ||
      (currentPage === "index.html" && href === "index.html")
    ) {
      link.classList.add("active");
    }
  });
}

// Smooth scrolling for anchor links
document.addEventListener("click", function (e) {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const targetId = e.target.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
});
