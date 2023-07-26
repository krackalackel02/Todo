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
	constructor({ name, symbol, renderButton = true }, ...todos) {
        this.name = name;
        this.symbol = symbol;
        this.renderButton = renderButton;
        this.id = uid();
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
				name: this.name ,
				symbol: this.symbol,
				renderButton: true,
			},
			...this.list.filter((todo) => {
				return parseISO(todo.due).getTime() < currentDate.getTime();
			})
		);
	}

	get dueThisWeek() {
		let currentDate = Project.tonight();
		currentDate = add(currentDate, { days: 8 });
		return new Project(
			{
				name: this.name ,
				symbol: this.symbol,
				renderButton: true,
			},
			...this.list.filter((todo) => {
				return parseISO(todo.due).getTime() < currentDate.getTime();
			})
		);
	}

	get dueThisMonth() {
		let currentDate = Project.tonight();
		currentDate = add(endOfMonth(currentDate), { days: 1 });

		return new Project(
			{
				name: this.name ,
				symbol: this.symbol,
				renderButton: true,
			},
			...this.list.filter((todo) => {
				return parseISO(todo.due).getTime() < currentDate.getTime();
			})
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
const randomdate = format(add(new Date(), { days: 5 }), "yyyy-MM-dd");
const randomdate2 = format(add(new Date(), { days: 10 }), "yyyy-MM-dd");
const inbox = new Project(
	{ name: "Inbox", symbol: "inbox" },
	{
		title: "Example Task",
		details: "details",
		due: today,
		priority: "high",
	}
);
inbox.add(
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

console.log(inbox.sortAlpha);
console.log(inbox.sortDueDate);
console.log(inbox.sortCreateDate);
console.log(inbox.list[0].snippet);
export default inbox;
export { Project };
