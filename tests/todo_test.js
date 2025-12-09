// toDo_test.js
import {
  assertEquals,
  assertStrictEquals,
  assertInstanceOf,
  assertNotStrictEquals
  
} from "https://deno.land/std/testing/asserts.ts";

import { ToDo } from "./todo.js"; // adjust extension/path if needed

const title = "Buy milk";
const description = "Get whole milk from the store";
const priority = 3;
const dueDateStr = "2025-12-31T00:00:00Z";
const isoString = "2025-12-31T00:00:00Z";
const dueDateObj = new Date(dueDateStr);

const expectedDate = new Date(isoString);


// ---------- Constructor ----------
Deno.test("ToDo class - constructor - initializes properties correctly when given a Date object", () => {
  const todo = new ToDo(title, description, priority, dueDateObj);
  assertStrictEquals(todo.title, title);
  assertStrictEquals(todo.description, description);
  assertStrictEquals(todo.priority, priority);
  assertEquals(todo.isCompleted, false);
  assertInstanceOf(todo.dueDate, Date);
  // Compare times for equality
  assertEquals(todo.dueDate.getTime(), expectedDate.getTime());
});



// ---------- toString ----------
Deno.test("ToDo class - toString - returns a formatted string", () => {
  const todo = new ToDo(title, description, priority, dueDateObj);
  const expected = `${title} (${priority}) – due ${todo.dueDate.toLocaleDateString()}`;
  assertEquals(todo.toString(), expected);
});

// ---------- edit ----------
Deno.test("ToDo class - edit - updates title when param is 'title'", () => {
  const todo = new ToDo(title, description, priority, dueDateObj);
  const newTitle = "Buy almond milk";
  const result = todo.edit("title", newTitle);
  // assuming edit returns something truthy or undefined on success; original tests just checked property
  assertStrictEquals(todo.title, newTitle);
});

Deno.test("ToDo class - edit - updates description when param is 'description'", () => {
  const todo = new ToDo(title, description, priority, dueDateObj);
  const newDesc = "Get oat milk instead";
  todo.edit("description", newDesc);
  assertStrictEquals(todo.description, newDesc);
});

Deno.test("ToDo class - edit - updates priority when param is 'priority'", () => {
  const todo = new ToDo(title, description, priority, dueDateObj);
  const newPriority = 1;
  todo.edit("priority", newPriority);
  assertStrictEquals(todo.priority, newPriority);
});

Deno.test("ToDo class - edit - updates dueDate when param is 'dueDate'", () => {
  const todo = new ToDo(title, description, priority, dueDateObj);
  const newDate = new Date("2026-01-01T00:00:00Z");
  todo.edit("dueDate", newDate);
  // If edit replaces the Date object reference, this checks identity:
  assertStrictEquals(todo.dueDate, newDate);
  // If you prefer to compare times instead, use:
  // assertEquals(todo.dueDate.getTime(), newDate.getTime());
});

Deno.test("ToDo class - edit - returns null for an invalid param and leaves properties unchanged", () => {
  const todo = new ToDo(title, description, priority, dueDateObj);
  const result = todo.edit("invalidParam", "value");
  // original Jest expected null
  assertEquals(result, null);

  // Ensure no property was changed
  assertStrictEquals(todo.title, title);
  assertStrictEquals(todo.description, description);
  assertStrictEquals(todo.priority, priority);
  assertStrictEquals(todo.dueDate, dueDateObj); // identity check as original test did
});

// ---------- toggleComplete ----------
Deno.test("ToDo class - toggleComplete - toggles isCompleted from false to true", () => {
  const todo = new ToDo(title, description, priority, dueDateObj);
  assertEquals(todo.isCompleted, false);
  todo.toggleComplete();
  assertEquals(todo.isCompleted, true);
});

Deno.test("ToDo class - toggleComplete - toggles isCompleted from true to false", () => {
  const todo = new ToDo(title, description, priority, dueDateObj);
  todo.toggleComplete(); // now true
  assertEquals(todo.isCompleted, true);
  todo.toggleComplete(); // back to false
  assertEquals(todo.isCompleted, false);
});

// -- check ID 
Deno.test("ToDo class - constructor - generates unique IDs", () => {
  const todo1 = new ToDo(title, description, priority, dueDateObj);
  const todo2 = new ToDo(title, description, priority, dueDateObj);
  
  // Both should have IDs (check they're truthy strings)
  assertStrictEquals(typeof todo1.id, "string");
  assertStrictEquals(typeof todo2.id, "string");
  
  // IDs should be different (unique)
  assertNotStrictEquals(todo1.id, todo2.id);
});