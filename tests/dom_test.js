"use strict";

import { assertEquals, assertExists } from "jsr:@std/assert";
import { DOMParser } from "jsr:@b-fuze/deno-dom";
import { App } from "../src/app.js";
import { ToDo } from "../src/todo.js";
import {
  handleProjectClick,
  initEventListeners,
  renderProjects,
  renderTasks,
} from "../src/dom.js";

// Helper function to create a fake document with the expected HTML structure
function createMockDocument() {
  const doc = new DOMParser().parseFromString(
    `<!DOCTYPE html>
        <html>
            <body>
                <ul id="project-list"></ul>
                <ul id="task-list"></ul>  </body>
        </html>`,
    "text/html",
  );
  return doc;
}

// Helper function to create mock projects
function createMockProjects(names) {
  return names.map((name) => ({ name }));
}

// Helper function to create mock tasks
function createMockTasks(taskData) {
  return taskData.map((data) => ({
    id: data.id || `task-${Math.random()}`,
    title: data.title,
    dueDate: new Date(data.dueDate),
    priority: data.priority,
  }));
}

// ==================== RENDER PROJECTS TESTS ====================

Deno.test("renderProjects: renders 3 projects as 3 li elements", () => {
  const doc = createMockDocument();
  const projects = createMockProjects(["Work", "Personal", "Shopping"]);

  renderProjects(projects, doc);

  const projectList = doc.querySelector("#project-list");
  assertEquals(projectList.children.length, 3);
});

Deno.test("renderProjects: renders empty array as 0 li elements", () => {
  const doc = createMockDocument();
  const projects = [];

  renderProjects(projects, doc);

  const projectList = doc.querySelector("#project-list");
  assertEquals(projectList.children.length, 0);
});

Deno.test("renderProjects: calling twice with 3 projects results in 3 li elements (not 6)", () => {
  const doc = createMockDocument();
  const projects = createMockProjects(["Work", "Personal", "Shopping"]);

  renderProjects(projects, doc);
  renderProjects(projects, doc);

  const projectList = doc.querySelector("#project-list");
  assertEquals(projectList.children.length, 3);
});

Deno.test("renderProjects: each li contains the correct project name", () => {
  const doc = createMockDocument();
  const projects = createMockProjects(["Work", "Personal", "Shopping"]);

  renderProjects(projects, doc);

  const projectList = doc.querySelector("#project-list");
  const listItems = projectList.querySelectorAll("li");

  assertEquals(listItems[0].textContent, "Work");
  assertEquals(listItems[1].textContent, "Personal");
  assertEquals(listItems[2].textContent, "Shopping");
});

Deno.test("renderProjects: renders single project correctly", () => {
  const doc = createMockDocument();
  const projects = createMockProjects(["Solo Project"]);

  renderProjects(projects, doc);

  const projectList = doc.querySelector("#project-list");
  assertEquals(projectList.children.length, 1);
  assertEquals(projectList.querySelector("li").textContent, "Solo Project");
});

Deno.test("renderProjects: each li has correct data-id attribute", () => {
  const doc = createMockDocument();
  const projects = [
    { id: "proj-abc-123", name: "Work" },
    { id: "proj-def-456", name: "Personal" },
  ];

  renderProjects(projects, doc);

  const projectList = doc.querySelector("#project-list");
  const listItems = projectList.querySelectorAll("li");

  assertEquals(listItems[0].getAttribute("data-id"), "proj-abc-123");
  assertEquals(listItems[1].getAttribute("data-id"), "proj-def-456");
});

// ==================== RENDER TASKS TESTS ====================

Deno.test("renderTasks: renders tasks into #task-list", () => {
  const doc = createMockDocument();
  // Create mock tasks (simple objects are fine for DOM testing)
  const tasks = [
    {
      title: "Pay bills",
      dueDate: new Date("2023-01-01"),
      priority: "High",
      id: "101",
    },
    {
      title: "Walk dog",
      dueDate: new Date("2023-01-02"),
      priority: "Low",
      id: "102",
    },
  ];

  renderTasks(tasks, doc);

  const taskList = doc.querySelector("#task-list");
  assertEquals(taskList.children.length, 2);

  // Check that text content appears (we can improve formatting later)
  const firstTask = taskList.children[0];
  assertEquals(firstTask.textContent.includes("Pay bills"), true);

  // Check that we stored the ID for later use
  // Note: in deno-dom/jsdom, attributes are usually strings
  assertEquals(firstTask.getAttribute("data-id"), "101");
});

Deno.test("renderTasks: clears previous tasks before adding new ones", () => {
  const doc = createMockDocument();
  const list = doc.querySelector("#task-list");

  // Manually add "old" content to simulate a previous project's view
  const oldItem = doc.createElement("li");
  oldItem.textContent = "Old Task";
  list.appendChild(oldItem);

  // Now render "new" content
  const newTasks = [{
    title: "New Task",
    dueDate: new Date(),
    priority: "Medium",
    id: "200",
  }];
  renderTasks(newTasks, doc);

  assertEquals(list.children.length, 1);
  assertEquals(list.children[0].textContent.includes("New Task"), true);
});

Deno.test("renderTasks: switching projects shows correct tasks without data loss", () => {
  const doc = createMockDocument();
  const list = doc.querySelector("#task-list");

  // Two different "projects" (arrays of tasks)
  const projectATasks = [
    { title: "Task A1", dueDate: new Date(), priority: "High", id: "A1" },
    { title: "Task A2", dueDate: new Date(), priority: "Low", id: "A2" },
  ];
  const projectBTasks = [
    { title: "Task B1", dueDate: new Date(), priority: "Medium", id: "B1" },
  ];

  // 1. Render Project A
  renderTasks(projectATasks, doc);
  assertEquals(list.children.length, 2);
  assertEquals(list.children[0].textContent.includes("Task A1"), true);

  // 2. Render Project B (Simulate clicking "Project B")
  renderTasks(projectBTasks, doc);
  assertEquals(list.children.length, 1);
  assertEquals(list.children[0].textContent.includes("Task B1"), true);
  // Crucial check: Project A's task should NOT be visible
  assertEquals(list.textContent.includes("Task A1"), false);

  // 3. Render Project A again (Simulate clicking "Project A" again)
  renderTasks(projectATasks, doc);
  assertEquals(list.children.length, 2);
  assertEquals(list.children[0].textContent.includes("Task A1"), true);
});

Deno.test("renderTasks: renders task with title, date, and priority in spans", () => {
  const doc = createMockDocument();

  // We don't need to create it manually anymore!
  // It's already in the doc.
  const taskList = doc.querySelector("#task-list");

  const tasks = [{
    id: "101",
    title: "Buy Milk",
    dueDate: new Date("2025-01-01"),
    priority: "High",
  }];

  renderTasks(tasks, doc);

  const listItems = taskList.querySelectorAll("li");
  assertEquals(listItems.length, 1);

  const spans = listItems[0].querySelectorAll("span");
  assertEquals(spans.length, 3);
  assertEquals(spans[0].textContent, "Buy Milk");
  // Ensure the date string is there (exact format depends on locale)
  assertExists(spans[1].textContent);
  assertEquals(spans[2].textContent, "High");
});

Deno.test("renderTasks: renders 3 tasks as 3 li elements", () => {
  const doc = createMockDocument();
  const tasks = createMockTasks([
    { id: "1", title: "Task 1", dueDate: "2025-01-15", priority: "High" },
    { id: "2", title: "Task 2", dueDate: "2025-01-16", priority: "Medium" },
    { id: "3", title: "Task 3", dueDate: "2025-01-17", priority: "Low" },
  ]);

  renderTasks(tasks, doc);

  const taskList = doc.querySelector("#task-list");
  assertEquals(taskList.children.length, 3);
});

Deno.test("renderTasks: renders empty array as 0 li elements", () => {
  const doc = createMockDocument();
  const tasks = [];

  renderTasks(tasks, doc);

  const taskList = doc.querySelector("#task-list");
  assertEquals(taskList.children.length, 0);
});

Deno.test("renderTasks: calling twice clears previous tasks", () => {
  const doc = createMockDocument();
  const tasks = createMockTasks([
    { id: "1", title: "Task 1", dueDate: "2025-01-15", priority: "High" },
    { id: "2", title: "Task 2", dueDate: "2025-01-16", priority: "Medium" },
  ]);

  renderTasks(tasks, doc);
  renderTasks(tasks, doc);

  const taskList = doc.querySelector("#task-list");
  assertEquals(taskList.children.length, 2);
});

Deno.test("renderTasks: each li contains spans with title, dueDate, and priority", () => {
  const doc = createMockDocument();
  const tasks = createMockTasks([
    { id: "1", title: "Buy milk", dueDate: "2025-01-15", priority: "High" },
  ]);

  renderTasks(tasks, doc);

  const taskList = doc.querySelector("#task-list");
  const listItem = taskList.querySelector("li");
  const spans = listItem.querySelectorAll("span");

  assertEquals(spans.length, 3);
  assertEquals(spans[0].textContent, "Buy milk");
  // Note: dueDate format depends on locale, so we check it contains the date
  assertEquals(spans[2].textContent, "High");
});

Deno.test("renderTasks: each li has correct data-id attribute", () => {
  const doc = createMockDocument();
  const tasks = createMockTasks([
    {
      id: "task-abc-123",
      title: "Task 1",
      dueDate: "2025-01-15",
      priority: "High",
    },
    {
      id: "task-def-456",
      title: "Task 2",
      dueDate: "2025-01-16",
      priority: "Low",
    },
  ]);

  renderTasks(tasks, doc);

  const taskList = doc.querySelector("#task-list");
  const listItems = taskList.querySelectorAll("li");

  assertEquals(listItems[0].getAttribute("data-id"), "task-abc-123");
  assertEquals(listItems[1].getAttribute("data-id"), "task-def-456");
});

// ==================== EVENT HANDLING TESTS ====================

Deno.test("initEventListeners and handleProjectClick: clicking a project renders its tasks", () => {
  const doc = createMockDocument();

  // 1. Create an App with projects and todos
  const app = new App();
  const workProject = app.addProject("Work");
  const personalProject = app.addProject("Personal");

  // Add todos to Work project
  workProject.addTodo(new ToDo("Task 1", "desc", "high", "2025-01-15"));
  workProject.addTodo(new ToDo("Task 2", "desc", "medium", "2025-01-16"));
  workProject.addTodo(new ToDo("Task 3", "desc", "low", "2025-01-17"));

  // Add todos to Personal project
  personalProject.addTodo(
    new ToDo("Personal Task", "desc", "high", "2025-01-18"),
  );

  // 2. Render the projects
  renderProjects(app.projects, doc);

  // 3. Initialize event listeners
  initEventListeners(app, doc);

  // 4. Get the project list items
  const projectList = doc.querySelector("#project-list");
  const projectItems = projectList.querySelectorAll("li");

  // 5. Simulate clicking the first project (Work)
  projectItems[0].dispatchEvent(new Event("click", { bubbles: true }));

  // 6. Check that Work's tasks are rendered
  const taskList = doc.querySelector("#task-list");
  assertEquals(taskList.children.length, 3);

  // Verify the task content
  assertEquals(taskList.children[0].textContent.includes("Task 1"), true);
  assertEquals(taskList.children[1].textContent.includes("Task 2"), true);
  assertEquals(taskList.children[2].textContent.includes("Task 3"), true);
});

Deno.test("handleProjectClick: switching between projects shows correct tasks", () => {
  const doc = createMockDocument();

  // Create App with projects and todos
  const app = new App();
  const workProject = app.addProject("Work");
  const personalProject = app.addProject("Personal");

  workProject.addTodo(new ToDo("Work Task 1", "desc", "high", "2025-01-15"));
  workProject.addTodo(new ToDo("Work Task 2", "desc", "medium", "2025-01-16"));

  personalProject.addTodo(
    new ToDo("Personal Task", "desc", "high", "2025-01-18"),
  );

  // Render and setup
  renderProjects(app.projects, doc);
  initEventListeners(app, doc);

  const projectItems = doc.querySelector("#project-list").querySelectorAll(
    "li",
  );
  const taskList = doc.querySelector("#task-list");

  // Click Work project
  projectItems[0].dispatchEvent(new Event("click", { bubbles: true }));
  assertEquals(taskList.children.length, 2);
  assertEquals(taskList.textContent.includes("Work Task 1"), true);

  // Click Personal project
  projectItems[1].dispatchEvent(new Event("click", { bubbles: true }));
  assertEquals(taskList.children.length, 1);
  assertEquals(taskList.textContent.includes("Personal Task"), true);

  // Work tasks should NOT be visible anymore
  assertEquals(taskList.textContent.includes("Work Task 1"), false);
});

Deno.test("handleProjectClick: clicking project with no todos renders empty list", () => {
  const doc = createMockDocument();

  const app = new App();
  const emptyProject = app.addProject("Empty Project");

  renderProjects(app.projects, doc);
  initEventListeners(app, doc);

  const projectItems = doc.querySelector("#project-list").querySelectorAll(
    "li",
  );
  projectItems[0].dispatchEvent(new Event("click", { bubbles: true }));

  const taskList = doc.querySelector("#task-list");
  assertEquals(taskList.children.length, 0);
});
