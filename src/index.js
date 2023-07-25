import navbar from "./navbar"

let navButton = document.querySelector(".page-header-nav-button");
let navContent = document.querySelector(".nav-content");
navContent.appendChild(navbar)
navButton.addEventListener("click", () => {
	navContent.getAttribute("aria-expanded") === "true"
		? navContent.setAttribute("aria-expanded" , "false")
		: navContent.setAttribute("aria-expanded" , "true")
});

