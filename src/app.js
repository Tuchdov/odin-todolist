"use strict";
import { Project } from "./project.js";
export class App {
    constructor(){
      this.projects = [];
    }

/* 
Methods to start with:
addProject(name) - creates and adds a new project
removeProject(projectName) - removes a project (even if it has todos)
findProject(projectName) - finds and returns a project
moveTodo(taskTitle, fromProjectName, toProjectName) - moves a todo between projects */

addProject(name, id = null){
  let proj = new Project(name, id);
  this.projects.push(proj);
  return proj;
}
removeProject(projectId){
  this.projects = this.projects.filter( (project) => project.id !==projectId );
}
findProject(projectId){
  return this.projects.find((project) => project.id === projectId);
}
moveTodo(todoId, fromProjectName, toProjectName){
  const originProject = this.findProject(fromProjectName);
  const destinationProject = this.findProject(toProjectName);
  // if one of the projects is not do nothing
  if (!originProject || !destinationProject) {
    return;
}

  const task = originProject.findTodo(todoId);
// if the task is not found do nothing
if (!task) {
  return;
}

  destinationProject.addTodo(task);
  originProject.removeTodo(todoId);

}
}
