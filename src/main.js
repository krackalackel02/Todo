import inbox from "./todo";
import Inbox, { Project } from "./todo";
import { format, compareAsc, parseISO, setHours, add } from "date-fns";
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

let listprojects = [Inbox];
let newprojects = [];
let isDue
for (const project of listprojects) {
	newprojects.push(project.dueThisWeek);
	isDue = "Due This Week"
}
let mainTitle = document.createElement("h1")
mainTitle.style.textAlign = "center"
isDue?mainTitle.innerText = isDue:mainTitle.innerText = "" 
content.appendChild(mainTitle)
let projects = {list:newprojects};
// projects = [Inbox, Test1, inbox.dueToday, Inbox.dueThisMonth];
for (const project of projects.list) {
	let projectTemplate = document.createElement("div");
	projectTemplate.id = project.id;
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

	project.renderButton ? projectList.appendChild(li) : null;

	projectTemplate.appendChild(projectList);
	content.appendChild(projectTemplate);
}
export default () => content;
