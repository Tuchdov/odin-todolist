"use strict";


export class ToDo {
  /**
   * @param {string} title       – The task title
   * @param {string} description – A short description of the task
   * @param {number|string} priority – Priority level (e.g., 1–5 or 'high', 'medium', 'low')
   * @param {Date|string} dueDate – When the task is due (Date object or ISO‑8601 string)
   * @param {boolean} isCompleted - is the task completed
   */
  constructor(title, description, priority, dueDate, isCompleted = false, id =null) {
    this.title   = title;
    this.description = description;
    this.priority    = priority;
    this.isCompleted = isCompleted;
        if (id){
    this.id = id;
}
    else{
    this.id = Date.now().toString() + Math.random().toString(36).slice(2);
}

    // Convert to a Date object if a string was passed
    this.dueDate = dueDate instanceof Date
      ? dueDate
      : new Date(dueDate);
  }

  // Optional: helper to display the task nicely
  toString() {
    return `${this.title} (${this.priority}) – due ${this.dueDate.toLocaleDateString()}`;
  }

  // edit one of the title decription or due date
  edit(param, newVal){
    const listOfParams = ['title', 'description', 'priority', 'dueDate'];
    if (listOfParams.includes(param)){
        this[param] = newVal;
    }
    else {
        return null;
    }
    }
    toggleComplete(){
        this.isCompleted = !this.isCompleted
    }
  
}



