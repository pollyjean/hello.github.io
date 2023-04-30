"use strict";

const todoForm = document.querySelector("#todo-form");
const todoList = document.querySelector("#todo-list");
const todoInput = todoForm.querySelector("input");
const STORAGE_NAME = "todo-data";
const localData = localStorage.getItem(STORAGE_NAME);
const MAX_ITEMS = 10;
let todoArr = [];

const paintTodo = (todo) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const btn = document.createElement("button");
  btn.innerText = "❌";
  btn.setAttribute("title", "삭제");
  li.dataset["id"] = todo.id;
  li.appendChild(btn);
  li.appendChild(span);
  btn.addEventListener("click", removeTodo);
  span.addEventListener("click", checkTodo);
  span.innerText = todo.value;
  todoList.append(li);
  li.classList.toggle("checked", todo.checked);
};

const removeTodo = (e) => {
  const removeTarget = e.target;
  const targetList = removeTarget.closest("li");
  const targetId = targetList.dataset["id"];
  todoArr = todoArr.filter((item) => item.id !== targetId);
  saveTodo();
  targetList.remove();
};
const checkTodo = (e) => {
  const checkTarget = e.target;
  const targetList = checkTarget.closest("li");
  const targetId = targetList.dataset["id"];
  todoArr.forEach((item) => {
    if (item.id === targetId && item.checked === true) {
      item.checked = false;
    } else if (item.id === targetId && item.checked === false) {
      item.checked = true;
    }
  });
  targetList.classList.toggle("checked");
  saveTodo();
};
const saveTodo = () => {
  const arrToStr = JSON.stringify(todoArr);
  localStorage.setItem(STORAGE_NAME, arrToStr);
};
const checkItemLimit = () => {
  const itemsLength = document.querySelectorAll("#todo-list > li").length;
  return itemsLength <= MAX_ITEMS;
};
if (localData) {
  todoArr = JSON.parse(localData);
  todoArr.forEach((item) => paintTodo(item));
}
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!checkItemLimit()) {
    alert("Can no longer add notes.");
    return;
  }
  const todoValue = todoInput.value;
  const todoId = Date.now().toString();
  const todoObj = { id: todoId, value: todoValue, checked: false };
  todoInput.value = "";
  todoArr.push(todoObj);
  saveTodo();
  paintTodo(todoObj);
});
