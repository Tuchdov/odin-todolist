"use strict";
/**
* @param {Array} projects – The projects array from the app 
*/

import { App } from "./app.js";
import { AppStorage } from "./storage.js";
import { ToDo } from "./todo.js";
import { Project } from "./project.js";
// Track which project is currently active
let activeProjectId = null;
let activeTaskId = null;

export function renderProjects(projects, domManipulator = document) {
    // Get the <ul id="project-list"> element
    // Clear it out
    // Loop through projects
    // Create an <li> for each, set its text
    // Append to the <ul>

    const projectList = domManipulator.querySelector('#project-list');

    projectList.innerHTML = '';

    for (const project of projects) {
        const newListItem = domManipulator.createElement('li');
        newListItem.setAttribute("data-id", project.id);
        newListItem.textContent = `${project.name}`;
        
        if (project.id === activeProjectId){

            // add delete button with trash icon for active project
            const dltBtn = document.createElement('button');
            dltBtn.classList.add('delete-btn-proj');
            const dltIcon = document.createElement('i');
            dltIcon.classList.add('fa', 'fa-trash');

            dltBtn.appendChild(dltIcon);
            newListItem.appendChild(dltBtn);

            // add edit button with pencil icon for active project
            const editBtn = document.createElement('button');
            editBtn.classList.add('edit-btn-proj');
            const editICon = document.createElement('i');
            editICon.classList.add('fa', 'fa-pencil');
            editBtn.appendChild(editICon);
            newListItem.appendChild(editBtn);


        }
        projectList.appendChild(newListItem);
    }
}

export function renderTasks(tasks, domManipulator = document) {
    // Get <ul id="task-list"> element.
    // Clear it out, but only for this specific project 
    // Create a list element for each task, add the text of title, due date, and priority.
    // Append to the taskList.
    const taskList = domManipulator.querySelector('#task-list');
    taskList.innerHTML = ''



    for (const task of tasks) {

        const newListItem = domManipulator.createElement('li');

        newListItem.setAttribute("data-id", task.id);

        const titleSpan = domManipulator.createElement('span');
        const dateSpan = domManipulator.createElement('span');
        const prioritySpan = domManipulator.createElement('span');



        titleSpan.textContent = task.title;
        dateSpan.textContent = task.dueDate.toLocaleDateString();
        prioritySpan.textContent = task.priority;

        newListItem.appendChild(titleSpan);
        newListItem.appendChild(dateSpan);
        newListItem.appendChild(prioritySpan);
            // add delete button with trash icon for rendered task
            const dltBtn = document.createElement('button');
            dltBtn.classList.add('delete-btn-task');
            const dltIcon = document.createElement('i');
            dltIcon.classList.add('fa', 'fa-trash');

            dltBtn.appendChild(dltIcon);
            newListItem.appendChild(dltBtn);

            // add edit button with pencil icon for active project
            const editBtn = document.createElement('button');
            editBtn.classList.add('edit-btn-task');
            const editICon = document.createElement('i');
            editICon.classList.add('fa', 'fa-pencil');

            editBtn.appendChild(editICon);
            newListItem.appendChild(editBtn);

        taskList.appendChild(newListItem);
    }

}

export function initEventListeners(app, domManipulator = document) {

  const projectList = domManipulator.querySelector('#project-list');

  // Add ONE listener that will handle ALL clicks
  projectList.addEventListener('click', (event) => {
    handleProjectClick(event, app, domManipulator);
  });

  const taskList = domManipulator.querySelector('#task-list');
  taskList.addEventListener('click',(event)  => {
    handleTaskClick(event,app,domManipulator);
  });
}


// This function runs EVERY TIME someone clicks
export function handleProjectClick(event, app, domManipulator = document) {

    const editBtn = event.target.closest('.edit-btn-proj')
    const projectDltBtn = event.target.closest('.delete-btn-proj')
    // Find the clicked project element
    const projectElement = event.target.closest('li'); // or '.project-item'
        // Find the clicked task element and the task id

    const projectId = projectElement.dataset.id;
    
    const project = app.findProject(projectId);


  // if delete was clicked get project id and remove tasks
  if (projectDltBtn) {
         // Guard clause: if user cancels, exit early
    if (project.todos.length > 0) {
        const confirmed = confirm('This will delete ALL tasks, are you sure?');
        if (!confirmed) {
            return;  // bail out, do nothing
        }
    }
    app.removeProject(projectId);
    renderProjects(app.projects, domManipulator);
    renderTasks([], domManipulator);
    activeProjectId = null;
    AppStorage.save(app)

    return
  }
  else if (editBtn) {
    // hide edit button show form and focus curson on input
    const form = domManipulator.querySelector('#edit-project-form');
    // hide button and old name
    editBtn.style.display = 'none';
    projectElement.style.display = 'none';
    form.style.display = 'block';


    
    // get project name
    const projectNameInput = domManipulator.querySelector('#edit-project-name-input');
        // Pre-fill with current name
    projectNameInput.value = project.name;
    return

;}

  // If a valid project was clicked
  else if (projectElement) {
    activeProjectId = projectId;

    if (project) {
      const todos = project.todos;
      renderTasks(todos, domManipulator);
      renderProjects(app.projects, domManipulator)
    }
  }
}

export function handleTaskClick(event, app, domManipulator = document) {
    const editBtn = event.target.closest('.edit-btn-task')
    const taskDltBtn = event.target.closest('.delete-btn-task')
    // Find the clicked task element and the task id
    const taskElement = event.target.closest('li');
    const taskId = taskElement.dataset.id;
    // activeTaskId = taskId;
    const project = app.findProject(activeProjectId);
    const task = project.findTodo(taskId)

    if (taskDltBtn) {
        project.removeTodo(taskId); 
        // renderProjects(app.projects, domManipulator);
        renderTasks(project.todos, domManipulator);
        AppStorage.save(app);
        return
    }
    else if (editBtn) {
        // show the modal and use the form
        const dialog = domManipulator.querySelector('#edit-task-dialog');
        const form = domManipulator.querySelector('#edit-task-form');
        activeTaskId = taskId;
        
        // open dialog
        dialog.showModal()

        // get form fields
        const taskNameInput = domManipulator.querySelector('#task-title-edit-input');
        const taskDescriptionInput = domManipulator.querySelector('#task-description-edit-input');
        const taskPriorityInput = domManipulator.querySelector('#task-priority-edit-input');
        const taskDateInput = domManipulator.querySelector('#task-date-edit-input');
        // Pre-fill with current name
        taskNameInput.value = task.title;
        taskDescriptionInput.value = task.description;
        taskPriorityInput.value = task.priority;
        taskDateInput.value = task.dueDate.toISOString().split('T')[0];
        return
    }


}
export function initAddProjectButton(app, domManipulator = document) {
    const showFormBtn = domManipulator.querySelector('#show-project-form-btn');
    const form = domManipulator.querySelector('#add-project-form');
    const cancelBtn = domManipulator.querySelector('#cancel-project-btn');
    const projectNameInput = domManipulator.querySelector('#project-name-input');

    // Show form, hide button
    showFormBtn.addEventListener('click', () => {
        showFormBtn.style.display = 'none';
        form.style.display = 'block';
        projectNameInput.focus(); // Nice UX touch - cursor goes to input
    });

    // Hide form, show button
    cancelBtn.addEventListener('click', () => {
        form.style.display = 'none';
        showFormBtn.style.display = 'block';
        form.reset(); // Clear the input
    });

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent page reload
        // get project name
        const projectName = projectNameInput.value;
        // create project
        const newProject = app.addProject(projectName)
        // save app
        AppStorage.save(app)
        // Re-render the projects list and tasks (tasks will be empty)
        renderProjects(app.projects, domManipulator)
        renderTasks(newProject.todos , domManipulator)
        //  Hide the form, show the button again
        form.style.display = 'none';
        showFormBtn.style.display = 'block';
        form.reset(); // Clear the input

    });
}

export function initEditProjectButton(app, domManipulator = document) {
   
    // get all element I need
    const form = domManipulator.querySelector('#edit-project-form');
    const projectNameInput = domManipulator.querySelector('#edit-project-name-input');
    const editBtn = domManipulator.querySelector('.edit-btn-proj');
    const cancelBtn = domManipulator.querySelector('#cancel-edit-project-btn');
    cancelBtn.addEventListener('click', () => {
        // editBtn.style.display = 'block';
        form.style.display = 'none';
        renderProjects(app.projects);
    })

    form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent page reload
    const project = app.findProject(activeProjectId)
    // get project name
    const projectName = projectNameInput.value;
    project.name = projectName;
    // save app
    AppStorage.save(app)
    // Re-render the projects list and tasks (tasks will be empty)
    renderProjects(app.projects, domManipulator)
    renderTasks(project.todos , domManipulator)
    //  Hide the form, show the edit button again
    // editBtn.style.display = 'block';
    form.style.display = 'none';
    

  })


    };

export function initEditTaskButton(app, domManipulator = document){
    // find the task

    // update task properties


    // if cancel
    const cancelBtn = domManipulator.querySelector('#cancel-task-edit-btn');

    // if submit
    const dialog = domManipulator.querySelector('#edit-task-dialog');
    const form = domManipulator.querySelector('#edit-task-form');

    cancelBtn.addEventListener('click', () => {
        
        dialog.close()
    })

    
      form.addEventListener('submit', (event) => {
        const project = app.findProject(activeProjectId);
        const task = project.findTodo(activeTaskId);
        
        // get form fields
        const taskNameInput = domManipulator.querySelector('#task-title-edit-input');
        const taskDescriptionInput = domManipulator.querySelector('#task-description-edit-input');
        const taskPriorityInput = domManipulator.querySelector('#task-priority-edit-input');
        const taskDateInput = domManipulator.querySelector('#task-date-edit-input');
        event.preventDefault(); // Prevent page reload


        // chqange task title, description, priority, due date
         task.title = taskNameInput.value;
         task.priority = taskPriorityInput.value;
         task.description= taskDescriptionInput.value; 
         task.dueDate = new Date (taskDateInput.value);

        // save app
        AppStorage.save(app)
        // Re-render the tasks list and tasks
        renderTasks(project.todos , domManipulator)
        //  Hide the form, show the button again
        form.reset(); // Clear the input
        dialog.close()
})};


export function initAddTaskButton(app, domManipulator = document) {
  // Step 1: Get all the elements you need
  const showFormBtn = domManipulator.querySelector('#show-task-form-btn');
  const form = domManipulator.querySelector('#add-task-form');
  const cancelBtn = domManipulator.querySelector('#cancel-task-btn');
  
  // Get all the input elements
  const titleInput = domManipulator.querySelector('#task-title-input');
  const descriptionInput = domManipulator.querySelector('#task-description-input');
  const priorityInput = domManipulator.querySelector('#task-priority-input');
  const dateInput = domManipulator.querySelector('#task-date-input');

  // Step 2: Show form when button clicked
   showFormBtn.addEventListener('click', () => {
        showFormBtn.style.display = 'none';
        form.style.display = 'block';
        titleInput.focus(); // Nice UX touch - cursor goes to input
    });


  // Step 3: Hide form when cancel clicked
    // Hide form, show button
    cancelBtn.addEventListener('click', () => {
        form.style.display = 'none';
        showFormBtn.style.display = 'block';
        form.reset(); // Clear the input
    });

  // Step 4: Handle form submission
      form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent page reload

        // TODO: Get the project name, create project, save, render, etc.
        // get task title, description, priority, due date
        const taskTitle = titleInput.value;
        const taskpriority = priorityInput.value;
        const taskDescription= descriptionInput.value;
        const taskDate = dateInput.value;
        // create new task 
        const task =  new ToDo(taskTitle,taskDescription, taskpriority, taskDate)
        // add to project 
        const activeProject = app.findProject(activeProjectId);
        activeProject.addTodo(task);
        // save app
        AppStorage.save(app)
        // Re-render the tasks list and tasks
        renderTasks(activeProject.todos , domManipulator)
        //  Hide the form, show the button again
        form.style.display = 'none';
        showFormBtn.style.display = 'block';
        form.reset(); // Clear the input

    });
}