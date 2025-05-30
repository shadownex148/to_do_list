const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('astroneerTasks')) || [];
  tasks.forEach(task => createTask(task.text, task.checked));
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('li').forEach(li => {
    tasks.push({
      text: li.querySelector('span').innerText,
      checked: li.classList.contains('checked')
    });
  });
  localStorage.setItem('astroneerTasks', JSON.stringify(tasks));
}

function createTask(text, checked = false) {
  const li = document.createElement('li');
  if (checked) li.classList.add('checked');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = checked;
  checkbox.onchange = () => {
    li.classList.toggle('checked');
    saveTasks();
  };

  const span = document.createElement('span');
  span.textContent = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '✖';
  deleteBtn.className = 'delete-btn';
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
  saveTasks();
}

function addTask() {
  const text = taskInput.value.trim();
  if (text !== '') {
    createTask(text);
    taskInput.value = '';
  }
}

loadTasks();
