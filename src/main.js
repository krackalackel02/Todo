let project = document.createElement("div");
project.classList.add("main");
project.innerHTML = `
<h1>
	<span class="content-header">
		<span class="material-symbols-outlined"> inbox </span><span>Inbox</span>
	</span>
</h1>
<ul class="content-list">
	<li class="content-list-item">
		<span class="content-list-item-symbol">
			<span class="material-symbols-outlined content-list-item-marker"> check_box_outline_blank </span><span
				class="content-list-item-title">Example Task</span>
				<span class="content-list-item-details"> "details"</span>
		</span>
		<span class="content-list-item-symbol">
			<span class = "priority" priority = "high"></span>
			<span class="content-list-item-date">Due:<input class="list-item-date" type="date" /></span>
			<span class="material-symbols-outlined content-list-item-marker remove-task"> delete </span>
		</span>
	</li>
	<li class="content-list-add-item">
		<button>
			<span class="content-list-add-item-text">
				<span class="material-symbols-outlined"> add_box </span><span>Add Task</span>
			</span>
		</button>
	</li>
</ul>
`;
export default ()=>project;
