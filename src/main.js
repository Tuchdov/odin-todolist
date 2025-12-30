"use strict";
import "./style.css";

import { ToDo } from "./todo.js";
import { AppStorage } from "./storage.js";
import * as dom from "./dom.js";

const app = AppStorage.load();

// if the app is emprty make some example projects, this is temp main version will start with empty todo
if (app.projects.length === 0) {
  const work = app.addProject("Forest Duties");
  const personal = app.addProject("Den Life");

  // add example todos
  const todoReport = new ToDo(
    "Mark territory",
    "Check borders and refresh scent markers",
    "high",
    "2025-06-01T00:00:00Z",
  );
  const todoMail = new ToDo(
    "Scout fishing spots",
    "Find best salmon runs for season",
    "low",
    "2025-06-01T00:00:00Z",
  );

  work.addTodo(todoReport);
  work.addTodo(todoMail);

  const todo1 = new ToDo(
    "Organize den",
    "Arrange moss and leaves for comfort",
    "medium",
    "2025-01-01T00:00:00Z",
  );
  const todo2 = new ToDo(
    "Forage for berries",
    "Stock up before hibernation",
    "high",
    "2025-01-03T00:00:00Z",
  );
  const todo3 = new ToDo(
    "Sharpen claws",
    "Find good tree for scratching",
    "low",
    "2025-01-02T00:00:00Z",
  );

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
