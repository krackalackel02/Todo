import {format, compareAsc, parseISO } from "date-fns";
import { v4 as uid } from "uuid";

class Project {
	constructor({name,symbol,},...todos) {
        this.name = name
        this.symbol = symbol
		this.list = [];
		for (const todo of todos) {
			this.add(todo);
		}
	}

	add(...todos) {
		for (const todoData of todos) {
			const newTodo = new this.Todo(todoData);
			newTodo.createDate = new Date();
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

	Todo = class {
		constructor({ title, details, due, priority }) {
			Object.assign(this, {
				title,
				details,
				due,
				id: uid(),
				priority,
				isDone: false,
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
const inbox = new Project({name:"Inbox",symbol:"inbox"},{
	title: "Example Task",
	details: "details",
	due: today,
	priority: "high",
});
inbox.add({
    title: "Example Task2",
	details: "details2",
	due: today,
	priority: "medium",
},{
    title: "Example Task3",
	details: "details3",
	due: today,
	priority: "low",
}
)

console.log(inbox.sortAlpha);
console.log(inbox.sortDueDate);
console.log(inbox.sortCreateDate);
console.log(inbox.list[0].snippet);

export default inbox;
export { Project };
