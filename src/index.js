import navbar from "./navbar";
import content from "./main";

let navButton = document.querySelector(".page-header-nav-button");
let navContent = document.querySelector(".nav-content");
let mainContent = document.querySelector(".main-content");
navButton.addEventListener("click", () => {
	navContent.getAttribute("aria-expanded") === "true"
		? navContent.setAttribute("aria-expanded", "false")
		: navContent.setAttribute("aria-expanded", "true");
		navButton.classList.toggle("rotated")
});

navContent.appendChild(navbar);
mainContent.appendChild(content);
