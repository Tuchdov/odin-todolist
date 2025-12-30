"use strict";

import { App } from "./app.js";
import { ToDo } from "./todo.js";

export class AppStorage {
  static save(app) {
    const appStringed = JSON.stringify(app);
    localStorage.setItem("appData", appStringed);
  }

  static load() {
    const AppStoredData = localStorage.getItem("appData");
    const app = new App();
    if (AppStoredData) {
      const appParsedData = JSON.parse(AppStoredData);

      // if  date is stored then rehydrate todos,projects, app
      for (const project of appParsedData.projects) {
        const projectInit = app.addProject(project.name, project.id);

        for (const task of project.todos) {
          const todo = new ToDo(
            task.title,
            task.description,
            task.priority,
            task.dueDate,
            task.isCompleted,
            task.id,
          );
          projectInit.addTodo(todo);
        }
      }
      return app;
    } else {
      // if no data is stored then just return an empty app instance
      return app;
    }
  }
}
