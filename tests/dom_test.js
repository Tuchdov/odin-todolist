"use strict";

import { assertEquals } from "jsr:@std/assert";
import { DOMParser } from "jsr:@b-fuze/deno-dom";
import { renderProjects } from "../src/dom.js";

// Helper function to create a fake document with the expected HTML structure
function createMockDocument() {
    const doc = new DOMParser().parseFromString(
        `<!DOCTYPE html>
        <html>
            <body>
                <ul id="project-list"></ul>
            </body>
        </html>`,
        "text/html"
    );
    return doc;
}

// Helper function to create mock projects
function createMockProjects(names) {
    return names.map(name => ({ name }));
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