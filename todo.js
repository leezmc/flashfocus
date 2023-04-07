const taskTitleInput = document.getElementById('task-title');
const taskDueDateInput = document.getElementById('task-due-date');
const addTaskButton = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

let tasks = [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    const taskTitle = document.createElement('span');
    const taskDueDate = document.createElement('span');
    const deleteTaskButton = document.createElement('button');

    taskTitle.innerText = task.title;
    const dueDate = new Date(task.dueDate);
    const formattedDate = `${dueDate.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})} - ${dueDate.toLocaleString('en-US', {month: 'numeric', day: 'numeric'})}`;
    taskDueDate.innerText = formattedDate;
    deleteTaskButton.innerText = 'Delete';
    deleteTaskButton.classList.add('delete-task-btn');
    deleteTaskButton.dataset.index = index;

    taskItem.appendChild(taskTitle);
    taskItem.appendChild(taskDueDate);
    taskItem.appendChild(deleteTaskButton);
    taskList.appendChild(taskItem);
  });
}

function addTask() {
  const title = taskTitleInput.value;
  const dueDate = taskDueDateInput.value;
  if (!title || !dueDate) {
    return;
  }
  const newTask = { title, dueDate };
  tasks.push(newTask);
  taskTitleInput.value = '';
  taskDueDateInput.value = '';
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

addTaskButton.addEventListener('click', addTask);

taskList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-task-btn')) {
    const index = parseInt(event.target.dataset.index);
    deleteTask(index);
  }
});

renderTasks();
