# Odin TodoList - Claude Project Context

## Project Overview

**The Bear's to do list** - A modern, lightweight task management application built with vanilla JavaScript. This project demonstrates clean architecture, separation of concerns, and modern web development practices without framework dependencies.

**Author:** Dov Tuch
**License:** MIT

## Technology Stack

- **Runtime:** Vanilla JavaScript (ES6 Modules)
- **Build Tool:** Vite 7.2.7
- **Testing:** Deno Testing Framework
- **UI Library:** Font Awesome 6.0.0 (icons)
- **CSS:** Modern Normalize + Custom Styles
- **Storage:** Browser LocalStorage

## Project Structure

```
odin-todolist/
├── src/
│   ├── main.js          # Application entry point
│   ├── app.js           # App class - core application logic
│   ├── project.js       # Project class - project management
│   ├── todo.js          # ToDo class - task model
│   ├── storage.js       # AppStorage - localStorage persistence
│   ├── dom.js           # DOM manipulation & event handling
│   └── style.css        # Application styles
├── tests/               # Deno-based test suite
│   ├── app_test.js
│   ├── project_test.js
│   ├── todo_test.js
│   ├── storage_test.js
│   └── dom_test.js
├── index.html           # Main HTML template
├── package.json         # NPM configuration (for Vite)
└── deno.lock           # Deno dependency lock
```

## Core Architecture

### App (app.js)
Main application class managing the overall state:
- `addProject(name, id)` - Creates and adds new projects
- `removeProject(projectId)` - Removes projects and associated todos
- `findProject(projectId)` - Finds project by ID
- `moveTodo(todoId, fromProjectID, toProjectID)` - Moves tasks between projects

### Project (project.js)
Project management and task container:
- `addTodo(task)` - Adds tasks to the project
- `removeTodo(id)` - Removes tasks
- `findTodo(id)` - Finds task by ID
- Uses unique ID generation via `Date.now() + Math.random()`

### ToDo (todo.js)
Task model with properties:
- title, description, priority (high/medium/low), dueDate, isCompleted, id
- `edit(param, newVal)` - Edits task properties
- `toggleComplete()` - Toggles completion status
- Auto-generates unique IDs

### AppStorage (storage.js)
Data persistence layer:
- `save(app)` - Serializes app state to localStorage
- `load()` - Deserializes and rehydrates app state
- Maintains object instances and references

### DOM (dom.js)
View layer and event management (470 lines):
- `renderProjects(projects)` - Renders project list
- `renderTasks(tasks)` - Renders task list
- `initEventListeners(app)` - Sets up event handlers
- Modal dialogs for editing and moving tasks
- Toast notification system

## Development Commands

### Using Deno

```bash
# Install Vite with Deno
deno install

# Development server (with hot reload)
deno task dev

# Build for production
deno task build

# Preview production build
deno task preview

# Run tests
deno test tests/

# Run specific test file
deno test tests/app_test.js

# Run tests with coverage
deno test --coverage=coverage tests/

# Watch mode for tests
deno test --watch tests/
```

### Alternative: Using npm, always prefer Deno

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Key Features

### Project Management
- Create, rename, and delete projects
- Project selection with active state
- Delete confirmation for projects with tasks

### Task Management
- Create tasks with:
  - Title and description
  - Priority levels (high, medium, low)
  - Due dates
  - Completion status
- Edit all task properties
- Delete tasks
- Move tasks between projects
- Task completion toggle

### User Experience
- Sidebar navigation with project list
- Icon-based action buttons (Font Awesome)
- Modal dialogs for complex operations
- Toast notifications for feedback
- Form validation
- Cancel/confirm workflows

### Data Persistence
- Automatic save to localStorage
- Data rehydration on page load
- Maintains object relationships

## Development Workflow

1. **Start Development Server:**
   ```bash
   deno task dev
   ```
   Opens at `http://localhost:5173`

2. **Make Changes:**
   - Edit files in `src/`
   - Changes hot-reload automatically

3. **Run Tests:**
   ```bash
   deno test tests/
   ```

4. **Build for Production:**
   ```bash
   deno task build
   ```
   Output in `dist/` directory

## Testing

Tests are written for Deno using `@std/assert`:

```javascript
import { assertEquals } from "@std/assert";
import { ToDo } from "../src/todo.js";

Deno.test("ToDo creation", () => {
  const todo = new ToDo("Test", "Description", "high", "2024-12-31");
  assertEquals(todo.title, "Test");
});
```

Run all tests:
```bash
deno test tests/
```

## Recent Development

Recent commits show active feature development:
- ✅ Fix bug where user selects to move task to same project
- ✅ Add toast message system
- ✅ Implement Move functionality
- ✅ Add task edit functionality
- ✅ Add delete task functionality

## Important Notes

### ID Generation
Projects and tasks use unique IDs generated via:
```javascript
Date.now() + Math.random()
```

### Global State
The application maintains:
- `activeProjectId` - Currently selected project
- `activeTaskId` - Task being edited/moved

### Event Delegation
DOM events use delegation pattern for dynamically created elements:
- Project list items
- Task list items
- Action buttons

### Storage Format
Data is stored in localStorage as JSON:
```javascript
{
  "projects": [
    {
      "name": "Project Name",
      "id": 1234567890.123,
      "todos": [...]
    }
  ]
}
```

## Dependencies

**Runtime:** None (vanilla JavaScript)

**Development:**
- vite@7.2.7 - Build tool
  - esbuild@0.25.12 - Transpiler
  - rollup@4.53.3 - Bundler
  - postcss@8.5.6 - CSS processing

**Testing:**
- @std/assert@1.0.16 - Deno assertions

**CDN Resources:**
- Font Awesome 6.0.0
- Modern Normalize 1.1.0

## Code Style

- ES6+ JavaScript
- Module imports/exports
- Class-based architecture
- Semantic HTML
- BEM-style CSS (where applicable)
- No framework dependencies

## Visual Development

### Design Principles
- Comprehensive design checklist in `/context/design-principles.md`
- Brand style guide in `/context/style-guide.md`
- When making visual (front-end, UI/UX) changes, always refer to these files for guidance

### Quick Visual Check
IMMEDIATELY after implementing any front-end change:
1. **Identify what changed** - Review the modified components/pages
2. **Navigate to affected pages** - Use `mcp__playwright__browser_navigate` to visit each changed view
3. **Verify design compliance** - Compare against `/context/design-principles.md` and `/context/style-guide.md`
4. **Validate feature implementation** - Ensure the change fulfills the user's specific request
5. **Check acceptance criteria** - Review any provided context files or requirements
6. **Capture evidence** - Take full page screenshot at desktop viewport (1440px) of each changed view
7. **Check for errors** - Run `mcp__playwright__browser_console_messages`

This verification ensures changes meet design standards and user requirements.

### Comprehensive Design Review
Invoke the `@agent-design-review` subagent for thorough design validation when:
- Completing significant UI/UX features
- Before finalizing PRs with visual changes
- Needing comprehensive accessibility and responsiveness testing


