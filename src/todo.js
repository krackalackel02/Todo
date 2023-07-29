import {
	format,
	compareAsc,
	parseISO,
	setHours,
	add,
	endOfMonth,
	endOfWeek,
} from "date-fns";
import { v4 as uid } from "uuid";

class Project {
	constructor(
		{
			name,
			symbol = "task_alt",
			renderButton = true,
			isProject = true,
			id = uid(),
		},
		...todos
	) {
		Object.assign(this, {
			name,
			symbol,
			renderButton,
			id: id,
			isProject,
			list: [],
		});
		this.add(...todos);
	}

	add(...todos) {
		for (const todo of todos) {
			 todo;
			const newTodo = new this.Todo(todo);
			if (!todo.id) newTodo.createDate = new Date();
			this.list.push(newTodo);
		}
	}

	sortByCriteria(...criteriaFunctions) {
		return this.list.sort((a, b) => {
			for (const criteria of criteriaFunctions) {
				const comparison = criteria(a, b);
				if (comparison !== 0) {
					return comparison;
				}
			}
			return 0;
		});
	}

	static dueDateSort(a, b) {
		return compareAsc(parseISO(a.due), parseISO(b.due));
	}

	static alphaSort(a, b) {
		return a.title.localeCompare(b.title);
	}

	static createDateSort(a, b) {
		return a.createDate.getTime() - b.createDate.getTime();
	}

	get sortCreateDate() {
		return this.sortByCriteria(Project.createDateSort);
	}

	get sortAlpha() {
		return this.sortByCriteria(
			Project.alphaSort,
			Project.dueDateSort,
			Project.createDateSort
		);
	}

	get sortDueDate() {
		return this.sortByCriteria(
			Project.dueDateSort,
			Project.alphaSort,
			Project.createDateSort
		);
	}
	static tonight = () => {
		const currentDate = setHours(new Date(), 0);
		currentDate.setMinutes(0);
		currentDate.setSeconds(0);
		return currentDate;
	};

	get dueToday() {
		let currentDate = Project.tonight();

		return new Project(
			{
				name: this.name,
				symbol: this.symbol,
				id: this.id,
				renderButton: true,
				isProject: this.isProject,
			},
			...this.list.filter((todo) => {
				return (
					parseISO(todo.due).getTime() < currentDate.getTime() &&
					todo.isDone != true
				);
			})
		);
	}

	get dueThisWeek() {
		let currentDate = Project.tonight();
		currentDate = add(currentDate, { days: 8 });
		return new Project(
			{
				name: this.name,
				symbol: this.symbol,
				id: this.id,
				renderButton: true,
				isProject: this.isProject,
			},
			...this.list.filter((todo) => {
				return (
					parseISO(todo.due).getTime() < currentDate.getTime() &&
					todo.isDone != true
				);
			})
		);
	}

	get dueThisMonth() {
		let currentDate = Project.tonight();
		currentDate = add(currentDate, { days: 31 });

		return new Project(
			{
				name: this.name,
				symbol: this.symbol,
				id: this.id,
				renderButton: true,
				isProject: this.isProject,
			},
			...this.list.filter((todo) => {
				return (
					parseISO(todo.due).getTime() < currentDate.getTime() &&
					todo.isDone != true
				);
			})
		);
	}
	get overdue() {
		let currentDate = Project.tonight();
		currentDate = add(currentDate, { days: -1 });
		return new Project(
			{
				name: this.name,
				symbol: this.symbol,
				id: this.id,
				renderButton: true,
				isProject: this.isProject,
			},
			...this.list.filter((todo) => {
				return (
					parseISO(todo.due).getTime() < currentDate.getTime() &&
					todo.isDone != true
				);
			})
		);
	}

	Todo = class {
		constructor({ title, details, due, priority, isDone = false, id = uid() }) {
			Object.assign(this, {
				title,
				details,
				due,
				id: id,
				priority,
				isDone,
			});
		}

		get snippet() {
			let length = 25;
			if (this.details.length <= length) {
				return `"${this.details}"`;
			} else {
				return `"${this.details.substring(0, length)}..."`;
			}
		}

		complete() {
			this.isDone = true;
		}
	};
}

const today = format(new Date(), "yyyy-MM-dd");
const randomdate = format(add(new Date(), { days: 5 }), "yyyy-MM-dd");
const randomdate2 = format(add(new Date(), { days: 10 }), "yyyy-MM-dd");
const Inbox = new Project(
	{ name: "Inbox", symbol: "inbox", isProject: false },
	{
		title: "Example Task",
		details: "details",
		due: today,
		priority: "high",
	}
);
Inbox.add(
	{
		title: "Example Task2",
		details: "details2",
		due: randomdate,
		priority: "medium",
	},
	{
		title: "Example Task3",
		details: "details3",
		due: randomdate2,
		priority: "low",
	}
);
const Test1 = new Project(
	{ name: "Test 1", symbol: "task_alt" },
	{
		title: "Example Task",
		details: "details",
		due: today,
		priority: "high",
	}
);
const Test2 = new Project(
	{ name: "Test 2", symbol: "task_alt" },
	{
		title: "Example Task",
		details: "details",
		due: today,
		priority: "high",
	}
);

export { Project, Inbox, Test1, Test2 };
