import { addTodo, deleteTodo, getTodos, updateTodo } from "./store.js";
import {
  getCancelButton,
  getFormElement,
  getFormValues,
  getListElement,
  populateForm,
  renderTodos,
  resetForm,
  showToast,
} from "./ui.js";

let editingTodoId = null;

const syncView = () => {
  renderTodos(getTodos());
};

const handleFormSubmit = (event) => {
  event.preventDefault();

  const { title, description } = getFormValues();
  const trimmedTitle = title.trim();

  if (!trimmedTitle) {
    showToast("Title is required.", "error");
    return;
  }

  if (editingTodoId) {
    const updatedTodo = updateTodo(editingTodoId, { title, description });

    if (!updatedTodo) {
      showToast("Todo could not be updated.", "error");
      return;
    }

    showToast("Todo updated.");
  } else {
    addTodo({ title, description });
    showToast("Todo added.");
  }

  editingTodoId = null;
  resetForm();
  syncView();
};

const handleListClick = (event) => {
  const actionButton = event.target.closest("[data-action]");

  if (!actionButton) {
    return;
  }

  const { action, id } = actionButton.dataset;

  if (!id) {
    return;
  }

  if (action === "delete") {
    const wasDeleted = deleteTodo(id);

    if (!wasDeleted) {
      showToast("Todo could not be deleted.", "error");
      return;
    }

    if (editingTodoId === id) {
      editingTodoId = null;
      resetForm();
    }

    syncView();
    showToast("Todo deleted.");
    return;
  }

  if (action === "edit") {
    const todo = getTodos().find((item) => item.id === id);

    if (!todo) {
      showToast("Todo could not be found.", "error");
      return;
    }

    editingTodoId = id;
    populateForm(todo);
  }
};

const initApp = () => {
  syncView();

  getFormElement().addEventListener("submit", handleFormSubmit);
  getListElement().addEventListener("click", handleListClick);
  getCancelButton().addEventListener("click", () => {
    editingTodoId = null;
    resetForm();
  });
};

initApp();
