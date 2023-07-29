import navbar from "./navbar";
import content, {
	getListProjects,
	saveListProjects,
	clearProjects,
} from "./main";
import { Inbox, Project, Test1 } from "./todo";

let navButton = document.querySelector(".page-header-nav-button");
let navContent = document.querySelector(".nav-content");
let mainContent = document.querySelector(".main-content");
let pageTitle = document.querySelector(".page-header-title");

function clearChildren(parent) {
	while (parent.firstChild) {
		parent.firstChild.remove();
	}
}
function renderNav() {
	let navContent = document.querySelector(".nav-content");
	clearChildren(navContent);
	navContent.appendChild(navbar());
}
function renderMain({ id = Inbox.id, when = null } = {}) {
	let mainContent = document.querySelector(".main-content");
	clearChildren(mainContent);
	mainContent.appendChild(content({ id, when }));
}

let projects = getListProjects();
let projectWithIsProjectFalse = projects.find(
	(project) => project.isProject === false
);
let id = projectWithIsProjectFalse.id;
renderMain({ id, when: null });

navButton.addEventListener("click", () => {
	if (navContent.getAttribute("aria-expanded") === "true") {
		navContent.setAttribute("aria-expanded", "false");
	} else {
		renderNav();
		navContent.setAttribute("aria-expanded", "true");
	}
	navButton.classList.toggle("rotated");
});

pageTitle.addEventListener("click", () => {
	renderMain();
});

navContent.addEventListener("click", (e) => {
	let navclick = e.target.closest(".nav-link-click");
	if (!navclick) return;
	let message = navclick.querySelector(".material-symbols-outlined").innerText;
	let id;
	switch (message) {
		case "inbox":
			let projects = getListProjects();
			let projectWithIsProjectFalse = projects.find(
				(project) => project.isProject === false
			);
			id = projectWithIsProjectFalse.id;
			renderMain({ id, when: null });
			break;
		case "warning":
			renderMain({ id: null, when: "overdue" });
			break;
		case "calendar_today":
			renderMain({ id: null, when: "today" });
			break;
		case "event":
			renderMain({ id: null, when: "week" });
			break;
		case "calendar_month":
			renderMain({ id: null, when: "month" });
			break;
		case "task_alt":
			id = navclick.parentElement.id;
			renderMain({ id, when: null });
			break;

		default:
			break;
	}
});
export { renderMain, renderNav };
