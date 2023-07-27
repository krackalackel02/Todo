import { Inbox, Project, Test1 } from "./todo";
import { format, compareAsc, parseISO, setHours, add } from "date-fns";
export function getListProjects() {
	let storedList = JSON.parse(localStorage.getItem("projects"));
	// return storedList ? storedList : [Inbox, Test1];
	return [Inbox, Test1];
}

export function saveListProjects(listprojects) {
	localStorage.setItem("projects", JSON.stringify(listprojects));
}
function clearProjects() {
	localStorage.removeItem("projects");
}
var exportedContent = ({ id, when }) => {
	let listprojects = getListProjects();
	let content = document.createElement("div");
	content.classList.add("main");
	let buttons = document.createElement("div");
	buttons.classList.add("content-list-add-item");
	buttons.classList.add("delete-save-button");
	buttons.innerHTML = `
		<button id="deleteButton" onclick="${clearProjects()}">
			<span class="content-list-add-item-text">
				<span class="material-symbols-outlined"> delete </span
				><span>Clear Projects</span>
			</span>
		</button>
		<button id="saveButton" onclick="${saveListProjects(listprojects)}">
			<span class="content-list-add-item-text">
				<span class="material-symbols-outlined"> save </span
				><span>Save Projects</span>
			</span>
		</button>
`;
	content.appendChild(buttons);

	// saveListProjects(listprojects);
	let isDue;
	function projectDue(time) {
		let newprojects = [];
		for (const project of listprojects) {
			switch (time) {
				case "today":
					newprojects.push(project.dueToday);
					isDue = {
						text: "Due Today",
						symbol: "calendar_today",
					};

					break;
				case "week":
					newprojects.push(project.dueThisWeek);
					isDue = {
						text: "Due This Week",
						symbol: "event",
					};

					break;
				case "month":
					newprojects.push(project.dueThisMonth);
					isDue = {
						text: "Due This Month",
						symbol: "calendar_month",
					};

					break;
				case "overdue":
					newprojects.push(project.overdue);
					isDue = {
						text: "Overdue!!!",
						symbol: "warning",
					};

					break;

				default:
					break;
			}
		}
		return newprojects;
	}
	function project(id = null) {
		if (!id) return [...listprojects];
		const matchingProject = listprojects.find((project) => project.id === id);

		if (matchingProject) {
			return [matchingProject];
		} else {
			return [Inbox];
		}
	}

	let newprojects;
	if (!when) {
		newprojects = project(id);
	} else {
		newprojects = projectDue(when);
	}

	let mainTitle = document.createElement("h1");
	mainTitle.classList.add("main-title");

	isDue
		? (mainTitle.innerHTML = `
	<span class="content-list-item-symbol">
		<span class="material-symbols-outlined"> ${isDue.symbol} </span>
		<span class="main-title">${isDue.text}</span>
	</span>
`)
		: (mainTitle.innerHTML = ``);
	content.appendChild(mainTitle);
	let projects = { list: newprojects };
	// projects = [Inbox, Test1, inbox.dueToday, Inbox.dueThisMonth];
	for (const project of projects.list) {
		let projectTemplate = document.createElement("div");
		projectTemplate.id = project.id;
		let projectHeader = document.createElement("h1");
		projectHeader.innerHTML = `
		<span class="content-header">
			<span class="material-symbols-outlined"> ${project.symbol} </span>
			<span>${project.name}</span>
		</span>
	`;
		projectTemplate.appendChild(projectHeader);
		let projectList = document.createElement("ul");
		projectList.classList.add("content-list");
		for (const todo of project.list) {
			let li = document.createElement("li");
			li.classList.add("content-list-item");
			li.id = todo.id;
			li.innerHTML = `
			<span class="content-list-item-symbol">
				<span class="material-symbols-outlined content-list-item-marker">
					${todo.isDone ? "check_box" : "check_box_outline_blank"} </span
				><span class="content-list-item-title">${todo.title}</span>
				<span class="content-list-item-details">${todo.snippet}</span>
			</span>
			<span class="content-list-item-symbol">
				<span class="priority" priority="${todo.priority}"></span>
				<span class="content-list-item-date"
					>Due:<input
						class="list-item-date"
						type="date"
						value="${todo.due}"
				/></span>
				<span
					class="material-symbols-outlined content-list-item-marker remove-task"
				>
					delete
				</span>
			</span>
		`;
			projectList.appendChild(li);
		}
		let li = document.createElement("li");
		li.classList.add("content-list-add-item");
		li.innerHTML = `
	<button>
		<span class="content-list-add-item-text">
			<span class="material-symbols-outlined"> add_box </span>
			<span>Add Task</span>
		</span>
	</button>
`;

		project.renderButton ? projectList.appendChild(li) : null;

		projectTemplate.appendChild(projectList);
		content.appendChild(projectTemplate);
	}
	return content;
};
export default exportedContent;
