import { getListProjects, saveListProjects } from "./main";
import { Inbox, Project, Test1 } from "./todo";
let content = document.createElement("div");
content.classList.add("navbar");
let list = document.createElement("ul");
list.innerHTML = `
		<li>
			<h3>Important:</h3>
			<ul>
				<li id="${Inbox.id}">
					<span class="nav-link-click">
						<span class="material-symbols-outlined"> inbox </span
						><span>Inbox</span>
					</span>
				</li>
			</ul>
		</li>
		<li>
			<h3>Due:</h3>
			<ul>
				<li>
					<span class="nav-link-click">
						<span class="material-symbols-outlined"> warning </span
						><span>Overdue!!!</span>
					</span>
				</li>
				<li>
					<span class="nav-link-click">
						<span class="material-symbols-outlined"> calendar_today </span
						><span>Today</span>
					</span>
				</li>
				<li>
					<span class="nav-link-click">
						<span class="material-symbols-outlined"> event </span
						><span>This week</span>
					</span>
				</li>
				<li>
					<span class="nav-link-click">
						<span class="material-symbols-outlined"> calendar_month </span
						><span>This month</span>
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
	if(project.isDefault)continue;
	let navIcon = document.createElement("li");;
	navIcon.id = project.id
	navIcon.innerHTML = `
	<span class="nav-link-click">
				<span class="material-symbols-outlined"> task_alt </span
				><span>${project.name}</span>
			</span>
	`;
	projectsList.appendChild(navIcon);
}

projects.appendChild(projectsList);
list.appendChild(projects);
content.appendChild(list);

export default () => content;
