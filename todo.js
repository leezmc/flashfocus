const taskTitleInput = document.getElementById('task-title');
const taskDueDateInput = document.getElementById('task-due-date');
const addTaskButton = document.getElementById('add-task-btn');
const deleteCompletedTasksButton = document.getElementById('delete-completed-tasks-btn');
const taskList = document.getElementById('task-list');

let tasks = [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    const taskTitle = document.createElement('span');
    const taskDueDate = document.createElement('span');
    const deleteTaskButton = document.createElement('button');
    const checkbox = document.createElement('input');

    taskTitle.innerText = task.title;
    const dueDate = new Date(task.dueDate);
    const formattedDate = `${dueDate.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})} - ${dueDate.toLocaleString('en-US', {month: 'numeric', day: 'numeric'})}`;
    taskDueDate.innerText = formattedDate;
    deleteTaskButton.innerText = 'Delete';
    deleteTaskButton.classList.add('delete-task-btn');
    deleteTaskButton.dataset.index = index;

    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      if (checkbox.checked) {
        taskTitle.style.textDecoration = 'line-through';
        taskDueDate.style.textDecoration = 'line-through';
      } else {
        taskTitle.style.textDecoration = 'none';
        taskDueDate.style.textDecoration = 'none';
      }
    });

    if (task.completed) {
      taskTitle.style.textDecoration = 'line-through';
      taskDueDate.style.textDecoration = 'line-through';
    }

    taskItem.appendChild(checkbox);
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
  const newTask = { title, dueDate, completed: false };
  tasks.push(newTask);
  taskTitleInput.value = '';
  taskDueDateInput.value = '';
  renderTasks();
}

function completeTasks() {
  tasks.forEach((task) => {
    task.completed = true;
    const taskItem = taskList.querySelector(`[data-index="${tasks.indexOf(task)}"]`);
    const taskTitle = taskItem.querySelector('span:first-child');
    const taskDueDate = taskItem.querySelector('span:nth-child(2)');
    taskTitle.style.textDecoration = 'line-through';
    taskDueDate.style.textDecoration = 'line-through';
  });
}

function deleteCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);
  renderTasks();
}

addTaskButton.addEventListener('click', addTask);
deleteCompletedTasksButton.addEventListener('click', deleteCompletedTasks);

taskList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-task-btn')) {
    const index = parseInt(event.target.dataset.index);
    tasks.splice(index, 1);
    renderTasks();
  }
});

renderTasks();
