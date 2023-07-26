import Inbox, { Project } from "./todo";
import {format, compareAsc, parseISO } from "date-fns";

let content = document.createElement("div");
content.classList.add("main");

const today = format(new Date(), "yyyy-MM-dd");
const Test1 = new Project(
	{ name: "Test1", symbol: "task_alt" },
	{
		title: "Example Task",
		details: "details",
		due: today,
		priority: "high",
	}
);
Test1.add(
	{
		title: "Example Task2",
		details: "details2",
		due: today,
		priority: "medium",
	},
	{
		title: "Example Task3",
		details: "details3",
		due: today,
		priority: "low",
	}
);

let projects = [Inbox, Test1];
for (const project of projects) {
	let projectTemplate = document.createElement("div");
	let projectHeader = document.createElement("h1");
	projectHeader.innerHTML = `
	<span class="content-header">
	<span class="material-symbols-outlined"> ${project.symbol} </span><span>${project.name}</span>
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
		<span class="material-symbols-outlined content-list-item-marker"> ${
			todo.isDone ? "check_box" : "check_box_outline_blank"
		} </span><span
		class="content-list-item-title">${todo.title}</span>
		<span class="content-list-item-details">${todo.snippet}</span>
		</span>
		<span class="content-list-item-symbol">
		<span class = "priority" priority = "${todo.priority}"></span>
		<span class="content-list-item-date">Due:<input class="list-item-date" type="date" value = "${
			todo.due
		}"/></span>
		<span class="material-symbols-outlined content-list-item-marker remove-task"> delete </span>
		</span>
		`;
		projectList.appendChild(li);
	}
	let li = document.createElement("li");
	li.classList.add("content-list-add-item");
	li.innerHTML = `
	<button>
	<span class="content-list-add-item-text">
	<span class="material-symbols-outlined"> add_box </span><span>Add Task</span>
	</span>
	</button>
	`;
	projectList.appendChild(li);
	projectTemplate.appendChild(projectList);
	content.appendChild(projectTemplate);
}
export default () => content;

// // Create the first project element
// let project1 = document.createElement("div");
// project1.innerHTML = `
// <h1>
// 	<span class="content-header">
// 		<span class="material-symbols-outlined"> inbox </span><span>Inbox</span>
// 	</span>
// </h1>
// <ul class="content-list">
// 	<li class="content-list-item">
// 		<span class="content-list-item-symbol">
// 			<span class="material-symbols-outlined content-list-item-marker"> check_box_outline_blank </span><span
// 				class="content-list-item-title">Example Task</span>
// 				<span class="content-list-item-details"> "details"</span>
// 		</span>
// 		<span class="content-list-item-symbol">
// 			<span class = "priority" priority = "high"></span>
// 			<span class="content-list-item-date">Due:<input class="list-item-date" type="date" /></span>
// 			<span class="material-symbols-outlined content-list-item-marker remove-task"> delete </span>
// 		</span>
// 	</li>
// 	<li class="content-list-add-item">
// 		<button>
// 			<span class="content-list-add-item-text">
// 				<span class="material-symbols-outlined"> add_box </span><span>Add Task</span>
// 			</span>
// 		</button>
// 	</li>
// </ul>
// `;

// let project2 = project1.cloneNode(true);

// content.appendChild(project1);
// content.appendChild(project2);

// export default () => content;
