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
    constructor(name){
        this.name = name;
        this.todos = [];
    }

    addTodo(task){
        this.todos.push(task);
    }
    // remove the task
    removeTodo(task){
       this.todos =  this.todos.filter((todo)=> todo.title !== task.title);
    }
    findTodo(taskname){
        return  this.todos.find((todo) => todo.title === taskname);
    }

}