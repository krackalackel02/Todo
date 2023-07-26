let element = document.createElement("div");
element.classList.add("main");
element.innerHTML = `
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
		</span>
		<span class="content-list-item-symbol">
			<span class="content-list-item-date">Due:</span><input class="list-item-date" type="date" />
			<span class="material-symbols-outlined content-list-item-marker"> delete </span>
		</span>
	</li>
	<li class="content-list-add-item">
		<span class="content-list-add-item-text">
			<span class="material-symbols-outlined"> add_box </span><span>Add Task</span>
		</span>
	</li>
</ul>

`;
export default element;
