import {
  assertEquals,
  assertExists,
  assertNotEquals,
  assertStrictEquals,
} from "https://deno.land/std/testing/asserts.ts";

import { Project } from "../src/project.js";
import { ToDo } from "../src/todo.js";

Deno.test("Project workflow with real ToDo instances", async (t) => {
  await t.step("create a project", () => {
    const project = new Project("House Chores");
    assertExists(project);
    assertEquals(project.todos.length, 0);
    assertStrictEquals(project.name, "House Chores");
  });

  await t.step("add ToDo instances", () => {
    const project = new Project("House Chores");

    const todo1 = new ToDo(
      "Clean kitchen",
      "Deep clean",
      2,
      "2025-01-01T00:00:00Z",
    );
    const todo2 = new ToDo(
      "Do laundry",
      "Wash clothes",
      1,
      "2025-01-03T00:00:00Z",
    );
    const todo3 = new ToDo(
      "Take out trash",
      "Bins to street",
      3,
      "2025-01-02T00:00:00Z",
    );

    project.addTodo(todo1);
    project.addTodo(todo2);
    project.addTodo(todo3);

    assertEquals(project.todos.length, 3);
    assertStrictEquals(project.todos[0], todo1);
    assertStrictEquals(project.todos[1], todo2);
    assertStrictEquals(project.todos[2], todo3);
  });

  await t.step("find by title", () => {
    const project = new Project("House Chores");

    const todoA = new ToDo("Cook dinner", "Chicken", 1, "2025-01-05T00:00:00Z");
    const todoB = new ToDo("Clean table", "Wipe it", 2, "2025-01-04T00:00:00Z");

    project.addTodo(todoA);
    project.addTodo(todoB);

    const found = project.findTodo(todoB.id); // ✓ Pass ID
    assertExists(found);
    assertStrictEquals(found, todoB);

    const notFound = project.findTodo("Something else");
    assertEquals(notFound, undefined);
  });

  await t.step("remove todo and verify array updates", () => {
    const project = new Project("Morning Routine");

    const t1 = new ToDo("Brush teeth", "", 1, "2025-01-01T00:00:00Z");
    const t2 = new ToDo("Make coffee", "", 2, "2025-01-01T00:00:00Z");
    const t3 = new ToDo("Walk dog", "", 3, "2025-01-01T00:00:00Z");

    project.addTodo(t1);
    project.addTodo(t2);
    project.addTodo(t3);

    assertEquals(project.todos.length, 3);

    // Remove second item
    project.removeTodo(t2.id);

    assertEquals(project.todos.length, 2);

    // t2 must be gone; order should remain for remaining todos
    assertStrictEquals(project.todos[0], t1);
    assertStrictEquals(project.todos[1], t3);

    // Removing a non-existing todo should do nothing
    project.removeTodo(new ToDo("Fake", "", 1, "2025-01-01T00:00:00Z"));
    assertEquals(project.todos.length, 2);
  });
});

// ==================== PROJECT ID TESTS ====================

Deno.test("Project: generates unique IDs for different projects", () => {
  const project1 = new Project("Work");
  const project2 = new Project("Personal");

  // Both should have IDs
  assertStrictEquals(typeof project1.id, "string");
  assertStrictEquals(typeof project2.id, "string");

  // IDs should be different
  assertNotEquals(project1.id, project2.id);
});

Deno.test("Project: uses provided ID when given", () => {
  const customId = "my-custom-id-123";
  const project = new Project("Work", customId);

  assertEquals(project.id, customId);
});
