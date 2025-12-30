"use strict";
import './style.css'

import { App } from './app.js'
import { Project } from './project.js'
import { ToDo } from './todo.js'
import { AppStorage} from './storage.js'
import *  as dom from "./dom.js" 




const app = AppStorage.load();

// if the app is emprty make some example projects, this is temp main version will start with empty todo
if (app.projects.length === 0){
    let work = app.addProject("Work");
    let personal = app.addProject("Personal");

    // add example todos
    const todoReport = new ToDo("Send report", "Monthly report", "high", "2025-06-01T00:00:00Z");
    const todoMail = new ToDo("Check Mail report", "Daily activity", "low", "2025-06-01T00:00:00Z");

    work.addTodo(todoReport);
    work.addTodo(todoMail);

    const todo1 = new ToDo("Clean kitchen", "Deep clean", "medium", "2025-01-01T00:00:00Z");
    const todo2 = new ToDo("Do laundry", "Wash clothes", "high", "2025-01-03T00:00:00Z");
    const todo3 = new ToDo("Take out trash", "Bins to street", "low", "2025-01-02T00:00:00Z");

    personal.addTodo(todo1);
    personal.addTodo(todo2);
    personal.addTodo(todo3);

}

// render the projects
dom.renderProjects(app.projects);

// init event lesteners 
dom.initEventListeners(app);
dom.initAddProjectButton(app);
dom.initAddTaskButton(app);
dom.initEditProjectButton(app);
dom.initEditTaskButton(app);
dom.initMoveTaskButton(app);