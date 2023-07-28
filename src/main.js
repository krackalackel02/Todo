import { Inbox, Project, Test1 } from "./todo";
import { renderMain, renderNav } from "./index";

import { format, compareAsc, parseISO, setHours, add } from "date-fns";
export function getListProjects() {
	let storedList = JSON.parse(localStorage.getItem("projects"));
	if (!storedList) return [Inbox, Test1];
	let newCopy = [];
	storedList.forEach(({ id, isProject, name, renderButton, symbol, list }) => {
		newCopy.push(
			new Project({ id, isProject, name, renderButton, symbol }, ...list)
		);
	});
	return newCopy;
}

export function saveListProjects(listprojects) {
	localStorage.setItem("projects", JSON.stringify(listprojects));
}

export function clearProjects() {
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
		<button id="deleteButton" >
			<span class="content-list-add-item-text">
				<span class="material-symbols-outlined"> delete </span
				><span>Clear Projects</span>
			</span>
		</button>
		<button id="saveButton" >
			<span class="content-list-add-item-text">
				<span class="material-symbols-outlined"> save </span
				><span>Save Projects</span>
			</span>
		</button>
	`;
	buttons.addEventListener("click", (e) => {
		let activeButton = e.target.closest("button");
		if (!activeButton) return;
		switch (activeButton.id) {
			case "deleteButton":
				clearProjects();
				break;
			case "saveButton":
				saveListProjects();
				break;
			default:
				break;
		}
	});
	content.appendChild(buttons);

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
	for (const project of projects.list) {
		let projectTemplate = document.createElement("div");
		projectTemplate.classList.add("project-card");
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
				<span class="material-symbols-outlined content-list-item-marker"
				id="${todo.id + "-checkbox"}"
				>
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
					id="${todo.id + "-delete"}"
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
	<button id="${project.id + "-add"}" >
		<span class="content-list-add-item-text">
			<span class="material-symbols-outlined"> add_box </span>
			<span>Add Task</span>
		</span>
	</button>
`;
		addEventListenerToButton(li.querySelector("button"));
		function addEventListenerToButton(buttonElement) {
			buttonElement.addEventListener("click", (e) => {
				let activeButton = e.target.closest("button");
				if (!activeButton) return;
				let ProjectAddButtonID = activeButton.id.endsWith("-add")
					? activeButton.id.slice(0, -4)
					: null;
				if (!ProjectAddButtonID) return;
				let projectContainer = activeButton.closest(".project-card");
				let activeButtonListItem = activeButton.closest(
					".content-list-add-item"
				);
				let clonedActiveButtonListItem = activeButtonListItem.cloneNode(true);
				activeButton.remove();

				let form = document.createElement("form");
				form.id = ProjectAddButtonID + "-form";
				form.classList.add("form");
				form.innerHTML = `
					<div>
						<label for="title" class="required">Title:</label>
						<input type="text" id="title" name="title" required pattern=".{3,}" placeholder="do laundry">
					</div>
					<div>
						<label for="details">Details:</label>
						<textarea id="details" name="details" placeholder="optional"></textarea>
					</div>
					<div>
						<label for="priority" class="required">Priority:</label>
						<select id="priority" name="priority" required>
							<option value="high">High</option>
							<option value="medium">Medium</option>
							<option value="low">Low</option>
						</select>
					</div>
					<div>
						<label for="duedate" class="required">Due Date:</label>
						<input type="date" id="duedate" name="duedate" value="" required>
					</div>
					<div>
						<input type="submit" value="Submit">
					</div>
				`;

				activeButtonListItem.appendChild(form);
				form.addEventListener("submit", submitForm);

				function submitForm(e) {
					e.preventDefault();
					if (!form.checkValidity()) return;
					let index = listprojects.findIndex(
						(project) => project.id === e.target.closest(".project-card").id
					);

					let title = form.querySelector("#title").value;
					let details = form.querySelector("#details").value;
					let due = form.querySelector("#duedate").value;
					let priority = form.querySelector("#priority").value;
					listprojects[index].add({ title, details, due, priority });
					saveListProjects(listprojects);
					renderMain({ id, when });
					activeButtonListItem.remove();
					projectContainer
						.querySelector(".content-list")
						.appendChild(clonedActiveButtonListItem);
					// Attach the event listener to the cloned button
					addEventListenerToButton(
						clonedActiveButtonListItem.querySelector("button")
					);
				}
			});
		}

		// Attach event listener to the initial button
		li.addEventListener("click", (e) => {
			let activeButton = e.target.closest("button");
			if (!activeButton) return;
			addEventListenerToButton(activeButton);
		});

		project.renderButton ? projectList.appendChild(li) : null;

		projectTemplate.appendChild(projectList);
		content.appendChild(projectTemplate);
	}
	return content;
};
export default exportedContent;
