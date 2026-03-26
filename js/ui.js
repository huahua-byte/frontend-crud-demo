const form = document.querySelector("#todo-form");
const titleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#description");
const todoIdInput = document.querySelector("#todo-id");
const submitButton = document.querySelector("#submit-button");
const cancelButton = document.querySelector("#cancel-button");
const formTitle = document.querySelector("#todo-form-title");
const formModeText = document.querySelector("#todo-form-mode-text");
const listElement = document.querySelector("#todo-list-items");
const toastContainer = document.querySelector("#toast-container");

const formatDate = (value) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export const renderTodos = (todos) => {
  if (todos.length === 0) {
    listElement.innerHTML = '<li class="todo-list__empty">No todos yet. Start with the form.</li>';
    return;
  }

  listElement.innerHTML = todos
    .map(
      ({ id, title, description, createdAt }) => `
        <li class="todo-item" data-id="${id}">
          <button class="todo-item__button" type="button" data-action="edit" data-id="${id}">
            <div class="todo-item__top">
              <div>
                <h3 class="todo-item__title">${escapeHtml(title)}</h3>
                <p class="todo-item__meta">Created ${formatDate(createdAt)}</p>
              </div>
            </div>
            <p class="todo-item__description">${
              description ? escapeHtml(description) : "No description provided."
            }</p>
          </button>
          <div class="todo-item__actions">
            <button class="button button--ghost" type="button" data-action="edit" data-id="${id}">
              Edit
            </button>
            <button class="button button--danger" type="button" data-action="delete" data-id="${id}">
              Delete
            </button>
          </div>
        </li>
      `,
    )
    .join("");
};

export const populateForm = (todo) => {
  todoIdInput.value = todo.id;
  titleInput.value = todo.title;
  descriptionInput.value = todo.description;
  submitButton.textContent = "Update";
  cancelButton.hidden = false;
  formTitle.textContent = "Edit todo";
  formModeText.textContent = "Update the selected item.";
  titleInput.focus();
};

export const resetForm = () => {
  form.reset();
  todoIdInput.value = "";
  submitButton.textContent = "Add";
  cancelButton.hidden = true;
  formTitle.textContent = "Add a todo";
  formModeText.textContent = "Create a new item.";
};

export const showToast = (message, type = "success") => {
  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;
  toast.textContent = message;

  toastContainer.appendChild(toast);

  window.setTimeout(() => {
    toast.remove();
  }, 3000);
};

export const getFormValues = () => ({
  id: todoIdInput.value,
  title: titleInput.value,
  description: descriptionInput.value,
});

export const getListElement = () => listElement;

export const getFormElement = () => form;

export const getCancelButton = () => cancelButton;
