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

    const  projectList = domManipulator.querySelector('#project-list');

    projectList.innerHTML ='';
    
    for (const project of projects) {
        const newListItem = domManipulator.createElement('li');
        newListItem.textContent = `${project.name}`;
        projectList.appendChild(newListItem);
}
}

export function renderTasks(tasks) {
  // your code here
}