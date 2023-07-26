import { compareAsc, parseISO } from "date-fns";
import { v4 as uid } from "uuid";

class project {
	constructor(...todos) {
		this.list = todos;
		for (const todo of todos) {
			todo.createDate = new Date(); 
		}
	}

	add(...todos) {
		for (const todo of todos) {
			todo.createDate = new Date(); 
			this.list.push(todo);
		}
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

	get sortCreateDate() {
		return this.sortByCriteria(project.createDateSort);
	}

	get sortAlpha() {
		return this.sortByCriteria(project.alphaSort, project.dueDateSort, project.createDateSort);
	}

	get sortDueDate() {
		return this.sortByCriteria(project.dueDateSort, project.alphaSort, project.createDateSort);
	}
}

class todo {
	constructor({ title, details, due, priority }) {
		Object.assign(this, {
			title,
			details,
			due,
			id: uid(),
			priority,
            isDone:false
		});
	}

	get snippet() {
		let length = 25;
		if (this.details.length <= length) {
			return "\""+this.details+"\"";
		} else {
            return "\""+this.details.substring(0, length) + "..."+"\"";
		}
	}
    complete(){
        this.isDone=true
    }
}

const todo1 = new todo({
	title: "Buy groceries",
	details: "Get milk, eggs, and bread",
	due: "2023-07-30",
	priority: "high",
});

const todo2 = new todo({
	title: "Finish homework",
	details: "Complete math and science assignments",
	due: "2023-08-02",
	priority: "medium",
});

const todo3 = new todo({
	title: "Walk the dog",
	details: "Take the dog for a walk in the park",
	due: "2023-07-27",
	priority: "low",
});

const todo4 = new todo({
	title: "Walk the dog",
	details: "Take the dog for a walk in the park",
	due: "2023-07-28",
	priority: "low",
});

let inbox = new project();
console.log(inbox);

inbox.add(todo3, todo2, todo1, todo4);
console.log(inbox.sortAlpha);
console.log(inbox.sortDueDate);
console.log(inbox.sortCreateDate);
console.log(inbox.list[0].snippet);
