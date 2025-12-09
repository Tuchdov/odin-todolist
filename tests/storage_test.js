"use strict";

import { assertEquals, assertInstanceOf } from "jsr:@std/assert";
import { AppStorage } from "../src/storage.js";
import { App } from "../src/app.js";
import { Project } from "../src/project.js";
import { ToDo } from "../src/todo.js";

// Clear localStorage before each test
Deno.test.beforeEach(() => {
  localStorage.clear();
});

// ==================== LOAD TESTS ====================

Deno.test("load returns App instance when localStorage is empty", () => {
  const app = AppStorage.load();
  
  assertInstanceOf(app, App);
});

Deno.test("load returns App with empty projects array when localStorage is empty", () => {
  const app = AppStorage.load();
  
  assertEquals(app.projects.length, 0);
});

// ==================== SAVE TESTS ====================

Deno.test("save stores data in localStorage", () => {
  const app = new App();
  app.addProject("Test Project");
  
  AppStorage.save(app);
  
  const stored = localStorage.getItem("appData");
  assertEquals(stored !== null, true);
});

Deno.test("save overwrites previous data", () => {
  const app1 = new App();
  app1.addProject("First");
  AppStorage.save(app1);
  
  const app2 = new App();
  app2.addProject("Second");
  AppStorage.save(app2);
  
  const loaded = AppStorage.load();
  
  assertEquals(loaded.projects.length, 1);
  assertEquals(loaded.projects[0].name, "Second");
});

// ==================== ROUND-TRIP TESTS ====================

Deno.test("round-trip: project names are preserved", () => {
  const app = new App();
  app.addProject("Work");
  app.addProject("Personal");
  AppStorage.save(app);
  
  const loadedApp = AppStorage.load();
  
  assertEquals(loadedApp.projects.length, 2);
  assertEquals(loadedApp.projects[0].name, "Work");
  assertEquals(loadedApp.projects[1].name, "Personal");
});

Deno.test("round-trip: todo properties are preserved", () => {
  const app = new App();
  const project = app.addProject("Work");
  const todo = new ToDo("Buy milk", "From the store", "high", "2025-01-15", false);
  project.addTodo(todo);
  AppStorage.save(app);
  
  const loadedApp = AppStorage.load();
  const loadedTodo = loadedApp.projects[0].todos[0];
  
  assertEquals(loadedTodo.title, "Buy milk");
  assertEquals(loadedTodo.description, "From the store");
  assertEquals(loadedTodo.priority, "high");
  assertEquals(loadedTodo.isCompleted, false);
});

Deno.test("round-trip: todo id is preserved", () => {
  const app = new App();
  const project = app.addProject("Work");
  const todo = new ToDo("Buy milk", "From the store", "high", "2025-01-15");
  const originalId = todo.id;
  project.addTodo(todo);
  AppStorage.save(app);
  
  const loadedApp = AppStorage.load();
  const loadedTodo = loadedApp.projects[0].todos[0];
  
  assertEquals(loadedTodo.id, originalId);
});

Deno.test("round-trip: completed status is preserved", () => {
  const app = new App();
  const project = app.addProject("Work");
  const todo = new ToDo("Buy milk", "desc", "high", "2025-01-15", true);
  project.addTodo(todo);
  AppStorage.save(app);
  
  const loadedApp = AppStorage.load();
  const loadedTodo = loadedApp.projects[0].todos[0];
  
  assertEquals(loadedTodo.isCompleted, true);
});

// ==================== REHYDRATION TESTS ====================

Deno.test("rehydration: loaded projects are Project instances", () => {
  const app = new App();
  app.addProject("Work");
  AppStorage.save(app);
  
  const loadedApp = AppStorage.load();
  
  assertInstanceOf(loadedApp.projects[0], Project);
});

Deno.test("rehydration: loaded todos are ToDo instances", () => {
  const app = new App();
  const project = app.addProject("Work");
  project.addTodo(new ToDo("Test", "desc", "high", "2025-01-15"));
  AppStorage.save(app);
  
  const loadedApp = AppStorage.load();
  const loadedTodo = loadedApp.projects[0].todos[0];
  
  assertInstanceOf(loadedTodo, ToDo);
});

Deno.test("rehydration: loaded todos have working methods", () => {
  const app = new App();
  const project = app.addProject("Work");
  project.addTodo(new ToDo("Test", "desc", "high", "2025-01-15", false));
  AppStorage.save(app);
  
  const loadedApp = AppStorage.load();
  const loadedTodo = loadedApp.projects[0].todos[0];
  
  assertEquals(loadedTodo.isCompleted, false);
  loadedTodo.toggleComplete();
  assertEquals(loadedTodo.isCompleted, true);
});

Deno.test("rehydration: loaded projects have working methods", () => {
  const app = new App();
  app.addProject("Work");
  AppStorage.save(app);
  
  const loadedApp = AppStorage.load();
  const loadedProject = loadedApp.projects[0];
  
  const newTodo = new ToDo("New task", "desc", "low", "2025-02-01");
  loadedProject.addTodo(newTodo);
  
  assertEquals(loadedProject.todos.length, 1);
  assertEquals(loadedProject.todos[0].title, "New task");
});