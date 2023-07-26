import navbar from "./navbar";
import content from "./main";

let navButton = document.querySelector(".page-header-nav-button");
let navContent = document.querySelector(".nav-content");
let mainContent = document.querySelector(".main-content");

function clearChildren(parent) {
	while (parent.firstChild) {
		parent.firstChild.remove();
	}
}
function renderNav() {
	clearChildren(navContent);
	navContent.appendChild(navbar());
}
function renderMain() {
	clearChildren(mainContent);
	mainContent.appendChild(content());
}
renderNav();
renderMain();

navButton.addEventListener("click", () => {
	if (navContent.getAttribute("aria-expanded") === "true") {
		navContent.setAttribute("aria-expanded", "false");
	} else {
		navContent.setAttribute("aria-expanded", "true");
	}
	navButton.classList.toggle("rotated");
});
