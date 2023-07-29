import exportedContent, { getListProjects, saveListProjects } from "./main";
import { Inbox, Project, Test1 } from "./todo";
function exportedNavContent() {
	let content = document.createElement("div");
	content.classList.add("navbar");
	let list = document.createElement("ul");
	list.innerHTML = `
		<li>
			<h3>Important:</h3>
			<ul>
				<li id="${Inbox.id}" class="nav-link">
					<span class="nav-link-click">
						<span class="material-symbols-outlined"> inbox </span
						><span>Inbox</span>
					</span>
					<span class="remove-project remove-link"
				>
					Default
				</span>
				</li>
			</ul>
		</li>
		<li>
			<h3>Due:</h3>
			<ul>
				<li class="nav-link">
					<span class="nav-link-click">
						<span class="material-symbols-outlined"> warning </span
						><span>Overdue!!!</span>
					</span>
					</span>
					<span class="remove-project remove-link"
				>
					Default
				</span>
				</li>
				<li class="nav-link">
					<span class="nav-link-click">
						<span class="material-symbols-outlined"> calendar_today </span
						><span>Today</span>
						</span>
						<span class="remove-project remove-link"
					>
						Default
					</span>
				</li>
				<li class="nav-link">
					<span class="nav-link-click">
						<span class="material-symbols-outlined"> event </span
						><span>This week</span>
						</span>
						<span class="remove-project remove-link"
					>
						Default
					</span>
				</li>
				<li class="nav-link">
					<span class="nav-link-click">
						<span class="material-symbols-outlined"> calendar_month </span
						><span>This month</span>
						</span>
						<span class="remove-project remove-link"
					>
						Default
					</span>
				</li>
			</ul>
		</li>
		
`;
	let projects = document.createElement("li");
	let projectsList = document.createElement("ul");
	projects.innerHTML = `
		<h3>Projects:</h3>
`;
	let listprojects = getListProjects();
	for (const project of listprojects) {
		if (!project.isProject) continue;
		let navIcon = document.createElement("li");
		navIcon.classList.add("nav-link");
		navIcon.id = project.id;
		navIcon.innerHTML = `
	<span class="nav-link-click">
				<span class="material-symbols-outlined"> task_alt </span
				><span>${project.name}</span>
			</span>
	`;
		let deleteProjectButton = document.createElement("span");
		function deleteProject(e) {
			let activeButton = e.target;
			if (!activeButton.classList.contains("remove-project")) return;
			let deleteButton = activeButton;
			let projectID = deleteButton.id.endsWith("-delete-link")
				? e.target.id.slice(0, -12)
				: null;
			if (!projectID) return;
			let index = listprojects.findIndex((project) => project.id === projectID);
			listprojects.splice(index, 1);
			console.log(listprojects);
			// saveListProjects(listprojects);
			if (!when) {
				let projectWithIsProjectFalse = listprojects.find(
					(project) => project.isProject === false
				);
				let id = projectWithIsProjectFalse.id;
				renderNav();
				renderMain({ id, when: null });
			} else {
				renderNav();
				renderMain({ id, when });
			}
		}

		deleteProjectButton.addEventListener("click", deleteProject);
		deleteProjectButton.innerHTML = `
	<span
					class="material-symbols-outlined content-list-item-marker remove-project remove-link"
					id="${project.id + "-delete-link"}"
				>
					delete
				</span>
	`;
		navIcon.appendChild(deleteProjectButton);
		projectsList.appendChild(navIcon);
	}

	projects.appendChild(projectsList);
	list.appendChild(projects);
	content.appendChild(list);
	return content;
}

export default exportedNavContent;
