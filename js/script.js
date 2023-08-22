// Update the completed tasks count
function updateElementsCount() {
  var listItems = document.querySelectorAll(".draggable");
  listLength = listItems.length;

  var checkedItems = document.querySelectorAll(".checked");
  checkedList = checkedItems.length;

  let result = listLength - checkedList;

  let resultEl = document.getElementById("count");
  resultEl.innerHTML = result;
}

// Change of "theme" on click
var button = document.getElementById("theme-change");

button.addEventListener("click", () => {
  button.classList.toggle("moon");
  document
    .getElementsByClassName("disclaimer-dark")[0]
    .classList.toggle("disclaimer-light");
  document
    .getElementsByClassName("image-container-dark")[0]
    .classList.toggle("image-container-light");
  document
    .getElementsByClassName("bg-container-dark")[0]
    .classList.toggle("bg-container-light");
  document
    .getElementsByClassName("input-dark")[0]
    .classList.toggle("input-light");
  document
    .getElementsByClassName("result-container")[0]
    .classList.toggle("light");
  document
    .getElementsByClassName("filter-container")[0]
    .classList.toggle("light");
  let listEls = document.getElementsByTagName("li");
  for (let i = 0; i < listEls.length; i++) {
    listEls[i].classList.toggle("light");
  }
});

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector("ul");
list.addEventListener(
  "click",
  function (ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
      updateElementsCount();
    }
  },
  false
);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  li.setAttribute("draggable", true);
  li.setAttribute("class", "draggable");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (
    document.getElementById("completed").style.color === "blue" ||
    document.getElementById("active").style.color === "blue"
  ) {
    alert("Cannot add a task, please switch to ALL!!!");
  } else if (inputValue.trim(" ") === "") {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  var status = document.getElementById("theme-change").className;
  console.log(status.split(" "));

  if (status.split(" ")[1] === "moon") {
    li.classList.add("light");
    document
      .getElementsByClassName("filter-desktop-container")[0]
      .classList.add("light");
  }

  updateElementsCount();

  var listItens = document.querySelectorAll(".draggable");
  [].forEach.call(listItens, function (item) {
    addEventsDragAndDrop(item);
  });

  var close = document.getElementsByClassName("close");
  var i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      document.getElementById("myUL").removeChild(div);
      updateElementsCount();
    };
  }
}

// Drag and drop functionality
function dragStart(e) {
  this.style.opacity = "0.4";
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.innerHTML);
}

function dragEnter(e) {
  this.classList.add("over");
}

function dragLeave(e) {
  e.stopPropagation();
  this.classList.remove("over");
}

function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  return false;
}

function dragDrop(e) {
  if (dragSrcEl.className.includes("checked") && this.className.includes("checked")) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");
    // this.className = e.dataTransfer.getData("class/html");
  }
  else if (!dragSrcEl.className.includes("checked") && this.className.includes("checked")) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");
    this.classList.remove("checked");
    dragSrcEl.classList.add("checked");
  }
  else if (dragSrcEl.className.includes("checked") && !this.className.includes("checked")) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");
    this.classList.add("checked");
    dragSrcEl.classList.remove("checked");
  }
  else {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");
  }
  return false;
}

function dragEnd(e) {
  var listItens = document.querySelectorAll(".draggable");
  [].forEach.call(listItens, function (item) {
    item.classList.remove("over");
  });
  this.style.opacity = "1";
}

function addEventsDragAndDrop(el) {
  el.addEventListener("dragstart", dragStart, false);
  el.addEventListener("dragenter", dragEnter, false);
  el.addEventListener("dragover", dragOver, false);
  el.addEventListener("dragleave", dragLeave, false);
  el.addEventListener("drop", dragDrop, false);
  el.addEventListener("dragend", dragEnd, false);
}


// Clearing all completed tasks
var clearAllEl = document.getElementById("clear-all");

clearAllEl.addEventListener("click", function () {
  console.log("Cleared");
  let list = document.getElementById("myUL");
  let completedItems = document.querySelectorAll(".checked");
  console.log(completedItems);
  let i;
  for (i = 0; i < completedItems.length; i++) {
    list.removeChild(completedItems[i]);
  }
});


// Filtering tasks based on their completion status
var allEl = document.getElementById("all");
var activeEl = document.getElementById("active");
var completedEl = document.getElementById("completed");

var allEl1 = document.getElementById("all1");
var activeEl1 = document.getElementById("active1");
var completedEl1 = document.getElementById("completed1");

function dispalyAll() {
  var allItems = document.getElementsByClassName("draggable");
  var i;
  for (i = 0; i < allItems.length; i++) {
    allItems[i].style.display = "block";
  }
}

function displayActive() {
  let allItems = document.getElementsByClassName("draggable");
  let i;
  for (i = 0; i < allItems.length; i++) {
    allItems[i].style.display = "block";
  }
  let checkedItems = document.getElementsByClassName("checked");
  let j;
  for (j = 0; j < checkedItems.length; j++) {
    checkedItems[j].style.display = "none";
  }
}

function displayCompleted() {
  let allItems = document.getElementsByClassName("draggable");
  let i;
  for (i = 0; i < allItems.length; i++) {
    allItems[i].style.display = "none";
  }
  let checkedItems = document.getElementsByClassName("checked");
  let j;
  for (j = 0; j < checkedItems.length; j++) {
    checkedItems[j].style.display = "block";
  }
}

allEl.addEventListener('click', function () {
  allEl.style.color = "blue";
  activeEl.style.color = "rgb(173, 170, 170)";
  completedEl.style.color = "rgb(173, 170, 170)";
  dispalyAll();
})

allEl1.addEventListener('click', function () {
  allEl1.style.color = "blue";
  activeEl1.style.color = "rgb(173, 170, 170)";
  completedEl1.style.color = "rgb(173, 170, 170)";
  dispalyAll();
})

activeEl.addEventListener('click', function () {
  activeEl.style.color = "blue";
  allEl.style.color = "rgb(173, 170, 170)";
  completedEl.style.color = "rgb(173, 170, 170)";
  displayActive();
})

activeEl1.addEventListener('click', function () {
  activeEl1.style.color = "blue";
  allEl1.style.color = "rgb(173, 170, 170)";
  completedEl1.style.color = "rgb(173, 170, 170)";
  displayActive();
})

completedEl.addEventListener('click', function () {
  completedEl.style.color = "blue";
  allEl.style.color = "rgb(173, 170, 170)";
  activeEl.style.color = "rgb(173, 170, 170)";
  displayCompleted();
})

completedEl1.addEventListener('click', function () {
  completedEl1.style.color = "blue";
  allEl1.style.color = "rgb(173, 170, 170)";
  activeEl1.style.color = "rgb(173, 170, 170)";
  displayCompleted();
})
