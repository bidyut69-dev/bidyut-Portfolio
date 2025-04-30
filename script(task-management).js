// DOM Elements
const addTaskBtn = document.querySelector('.add-task-btn');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close');
const taskForm = document.querySelector('#task-form');
const taskLists = document.querySelectorAll('.task-list');
const themeToggle = document.querySelector('.theme-toggle');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const sidebar = document.querySelector('.sidebar');

// Task Management
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Initialize the app
function init() {
    renderTasks();
    setupEventListeners();
    setupDragAndDrop();
    setupThemeToggle();
}

// Render tasks to the DOM
function renderTasks() {
    // Clear existing tasks
    taskLists.forEach(list => {
        list.querySelector('.tasks').innerHTML = '';
    });

    // Render each task
    tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        const list = document.querySelector(`[data-status="${task.status}"] .tasks`);
        list.appendChild(taskElement);
    });
}

// Create a task element
function createTaskElement(task) {
    const taskElement = document.createElement('div');
    taskElement.className = 'task';
    taskElement.draggable = true;
    taskElement.dataset.id = task.id;

    taskElement.innerHTML = `
        <div class="task-title">${task.title}</div>
        <div class="task-description">${task.description}</div>
        <div class="task-meta">
            <div class="task-due-date">Due: ${task.dueDate}</div>
            <div class="task-priority priority-${task.priority}">${task.priority}</div>
        </div>
    `;

    return taskElement;
}

// Add a new task
function addTask(task) {
    tasks.push(task);
    saveTasks();
    renderTasks();
}

// Update task status
function updateTaskStatus(taskId, newStatus) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.status = newStatus;
        saveTasks();
        renderTasks();
    }
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Setup event listeners
function setupEventListeners() {
    // Add task button
    addTaskBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Task form submission
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(taskForm);
        const task = {
            id: Date.now().toString(),
            title: formData.get('title'),
            description: formData.get('description'),
            dueDate: formData.get('due-date'),
            priority: formData.get('priority'),
            status: 'todo'
        };
        addTask(task);
        taskForm.reset();
        modal.style.display = 'none';
    });

    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// Setup drag and drop functionality
function setupDragAndDrop() {
    const draggables = document.querySelectorAll('.task');
    const droppables = document.querySelectorAll('.task-list');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
    });

    droppables.forEach(droppable => {
        droppable.addEventListener('dragover', e => {
            e.preventDefault();
            const draggable = document.querySelector('.dragging');
            const afterElement = getDragAfterElement(droppable, e.clientY);
            const tasksContainer = droppable.querySelector('.tasks');
            
            if (afterElement == null) {
                tasksContainer.appendChild(draggable);
            } else {
                tasksContainer.insertBefore(draggable, afterElement);
            }

            // Update task status
            const taskId = draggable.dataset.id;
            const newStatus = droppable.dataset.status;
            updateTaskStatus(taskId, newStatus);
        });
    });
}

// Helper function for drag and drop
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.task:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Theme toggle functionality
function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Set initial theme
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    } else {
        updateThemeIcon(false);
    }

    // Add click event listener
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', isDark);
        updateThemeIcon(isDark);
    });
}

// Update theme icon and tooltip
function updateThemeIcon(isDark) {
    const themeToggle = document.querySelector('.theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    if (isDark) {
        icon.className = 'fas fa-sun';
        themeToggle.setAttribute('data-tooltip', 'Switch to Light Mode');
    } else {
        icon.className = 'fas fa-moon';
        themeToggle.setAttribute('data-tooltip', 'Switch to Dark Mode');
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init); 