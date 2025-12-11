"use strict";
/**
* @param {Array} projects – The projects array from the app 
*/
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

        taskList.appendChild(newListItem);
    }

}

// This function is called ONCE to set things up
export function initEventListeners(app, domManipulator = document) {
  const projectList = domManipulator.querySelector('#project-list');
  
  // Add ONE listener that will handle ALL clicks
  projectList.addEventListener('click', (event) => {
    handleProjectClick(event, app, domManipulator);
  });
}

// This function runs EVERY TIME someone clicks
export function handleProjectClick(event, app, domManipulator = document) {
  // Find the clicked project element
  const projectElement = event.target.closest('li'); // or '.project-item' if you add that class
  
  // If a valid project was clicked
  if (projectElement) {
    // Get the project ID (you'll need to add this to your renderProjects)
    const projectId = projectElement.dataset.projectId;
    
    // Get the project and its todos
    const project = app.findProject(projectId);
    
    if (project) {
      const todos = project.todos;
      renderTasks(todos, domManipulator);
    }
  }
}