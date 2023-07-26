let element = document.createElement("div");
element.classList.add("navbar");
element.innerHTML = `
<ul>
					<li>
						<h3>Important:</h3>
						<ul>
							<li>
								<span class="nav-link-click">
									<span class="material-symbols-outlined"> inbox </span
									><span>Inbox</span>
								</span>
							</li>
						</ul>
					</li>
					<li>
						<h3>Due:</h3>
						<ul>
							<li>
								<span class="nav-link-click">
									<span class="material-symbols-outlined"> calendar_today </span
									><span>Today</span>
								</span>
							</li>
							<li>
								<span class="nav-link-click">
									<span class="material-symbols-outlined"> event </span
									><span>This week</span>
								</span>
							</li>
							<li>
								<span class="nav-link-click">
									<span class="material-symbols-outlined"> calendar_month </span
									><span>This month</span>
								</span>
							</li>
						</ul>
					</li>
					<li>
						<h3>Projects:</h3>
						<ul>
							<li>
								<span class="nav-link-click">
									<span class="material-symbols-outlined">
										task_alt </span
									><span>Test1</span>
								</span>
							</li>
							<li>
								<span class="nav-link-click">
									<span class="material-symbols-outlined">
										task_alt </span
									><span>Test2</span>
								</span>
							</li>
							<li>
								<span class="nav-link-click">
									<span class="material-symbols-outlined">
										task_alt </span
									><span>Test3</span>
								</span>
							</li>
						</ul>
					</li>
				</ul>
`;
export default ()=>element;
