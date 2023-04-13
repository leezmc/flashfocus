const taskTitleInput = document.getElementById('task-title');
const taskDueDateInput = document.getElementById('task-due-date');
const addTaskButton = document.getElementById('add-task-btn');
const completeTasksButton = document.getElementById('complete-tasks-btn');
const taskList = document.getElementById('task-list');

let tasks = [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    const taskTitle = document.createElement('span');
    const taskDueDate = document.createElement('span');
    const completeTaskCheckbox = document.createElement('input');

    taskTitle.innerText = task.title;
    const dueDate = new Date(task.dueDate);
    const formattedDate = `${dueDate.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})} - ${dueDate.toLocaleString('en-US', {month: 'numeric', day: 'numeric'})}`;
    taskDueDate.innerText = formattedDate;
    completeTaskCheckbox.type = 'checkbox';
    completeTaskCheckbox.checked = task.completed;
    completeTaskCheckbox.dataset.index = index;

    if (task.completed) {
      taskTitle.style.textDecoration = 'line-through';
      taskDueDate.style.textDecoration = 'line-through';
    }

    taskItem.appendChild(completeTaskCheckbox);
    taskItem.appendChild(taskTitle);
    taskItem.appendChild(taskDueDate);
    taskList.appendChild(taskItem);
  });
}

function addTask() {
  const title = taskTitleInput.value;
  const dueDate = taskDueDateInput.value;
  if (!title || !dueDate) {
    return;
  }
  const newTask = { title, dueDate, completed: false };
  tasks.push(newTask);
  taskTitleInput.value = '';
  taskDueDateInput.value = '';
  renderTasks();

}

function completeTask(event) {
  const index = parseInt(event.target.dataset.index);
  tasks[index].completed = event.target.checked;
  renderTasks();
}

addTaskButton.addEventListener('click', addTask);
completeTasksButton.addEventListener('click', renderTasks);

taskList.addEventListener('change', completeTask);

renderTasks();
