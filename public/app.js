document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage or use an empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // --- Core Functions ---

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.dataset.id = task.id;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => toggleComplete(task.id));

            const textSpan = document.createElement('span');
            textSpan.textContent = task.text;

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = '🗑️';
            deleteBtn.addEventListener('click', () => deleteTask(task.id));

            li.append(checkbox, textSpan, deleteBtn);
            taskList.appendChild(li);
        });
    };

    const addTask = () => {
        const text = taskInput.value.trim();
        if (text === '') return;

        const newTask = {
            id: Date.now(), // Simple unique ID
            text: text,
            completed: false,
        };

        tasks.push(newTask);
        taskInput.value = '';
        saveTasks();
        renderTasks();
    };

    const deleteTask = (id) => {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    };

    const toggleComplete = (id) => {
        const task = tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        }
    };

    // --- Initial Setup & Event Listeners ---
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Initial render on page load
    renderTasks();
});

// public/app.js (Modified for export)

// Put all functions you want to test here, outside the event listener
export const tasks = []; // Use a simple in-memory array for tests

export const addTask = (text) => {
    if (!text || text.trim() === '') return;
    const newTask = { id: Date.now(), text: text.trim(), completed: false };
    tasks.push(newTask);
};

export const deleteTask = (id) => {
    const index = tasks.findIndex(task => task.id === id);
    if (index > -1) tasks.splice(index, 1);
};

export const toggleComplete = (id) => {
    const task = tasks.find(task => task.id === id);
    if (task) task.completed = !task.completed;
};

// The browser-specific logic remains inside the event listener
document.addEventListener('DOMContentLoaded', () => {
    // This part is ignored by Jest but runs in the browser
    // It would be a more complex version of the above
});