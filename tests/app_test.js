import {
  assertEquals,
  assertExists,
  assertStrictEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import { App } from "./app.js";
import { Project } from "./project.js";
import { ToDo } from "./todo.js";

Deno.test("App: create projects, add todo to Work, move it to Personal (same instance)", async (t) => {
  await t.step("create App and add 2 projects", () => {
    const app = new App();
    app.addProject("Work");
    app.addProject("Personal");

    assertExists(app.findProject("Work"));
    assertExists(app.findProject("Personal"));

    // sanity: two projects present
    assertEquals(app.projects.length, 2);
  });

  await t.step("create a ToDo and add it to Work", () => {
    const app = new App();
    app.addProject("Work");
    app.addProject("Personal");

    const todo = new ToDo("Send report", "Monthly report", 1, "2025-06-01T00:00:00Z");

    const work = app.findProject("Work");
    // ensure the project exists
    assertExists(work);

    work.addTodo(todo);

    // Work should contain the todo now
    assertEquals(work.todos.length, 1);
    assertStrictEquals(work.todos[0], todo);
  });

  await t.step("move the todo from Work to Personal and verify same instance moved", () => {
    const app = new App();
    app.addProject("Work");
    app.addProject("Personal");

    const todo = new ToDo("Send report", "Monthly report", 1, "2025-06-01T00:00:00Z");

    const work = app.findProject("Work");
    const personal = app.findProject("Personal");
    assertExists(work);
    assertExists(personal);

    work.addTodo(todo);
    assertEquals(work.todos.length, 1);
    assertEquals(personal.todos.length, 0);

    // Perform the move using the App API
    app.moveTodo(todo.id, "Work", "Personal");

    // Now Work should no longer contain the todo
    assertEquals(work.todos.length, 0);

    // Personal should contain the same instance (identity check)
    assertEquals(personal.todos.length, 1);
    assertStrictEquals(personal.todos[0], todo);


    // Ensure it's not a different object with same values
   // assertNotEquals(personal.todos[0], new ToDo("Send report", "Monthly report", 1, "2025-06-01T00:00:00Z"));
  });
});
