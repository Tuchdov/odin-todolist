"use strict";
// Now go ahead and create your Project class with:
// Constructor that takes a name
// An array to hold todos
// An addTodo(todo) method

export class Project {
  /**
   * @param {string} name – The project name
   * @param {Array} todos – An array that contains the takss
   */
  constructor(name, id = null) {
    this.name = name;
    this.todos = [];
    if (id) {
      this.id = id;
    } else {
      this.id = Date.now().toString() + Math.random().toString(36).slice(2);
    }
  }

  addTodo(task) {
    this.todos.push(task);
  }
  // remove the task
  removeTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
  findTodo(id) {
    return this.todos.find((todo) => todo.id === id);
  }
}
