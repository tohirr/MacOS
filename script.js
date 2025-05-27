let appIcons = document.querySelectorAll(".launchpad .icon");
let dock = document.getElementById("dock");
let dropIndex;
const iconPlaceholder = document.createElement("div");
appIcons.forEach((icon) => {
  icon.addEventListener("dragstart", handleDragStart);
  icon.addEventListener("dragend", handleDragEnd);
});

dock.addEventListener("dragenter", handleDragEnter);
dock.addEventListener("dragleave", handleDragLeave);
dock.addEventListener("dragover", handleDragOver);
dock.addEventListener("drop", handleDrop);
let noOfDockIcons = dock.children.length;

iconPlaceholder.classList.add("icon-ghost");

function handleDragStart(e) {
  this.style.opacity = "0.4";
  e.dataTransfer.setData("iconDatasrc", e.target.src);
}
function handleDragEnd(e) {
  this.style.opacity = "1";
}

function getDropIndex(e) {
  const dockRect = dock.getBoundingClientRect();
  let mouseRelativeX = e.clientX - dockRect.left;

  for (let i = 0; i < dock.children.length; i++) {
    let icon = dock.children[i];
    let iconRelativeX = icon.getBoundingClientRect().left - dockRect.left;
    let iconMidpoint = iconRelativeX + icon.width / 2;

    if (mouseRelativeX < iconMidpoint) {
      return i;
    }
  }
  return dock.children.length;
}

function handleDragOver(e) {
  e.preventDefault();
  this.insertBefore(iconPlaceholder, this.children[getDropIndex(e)]);
  // iconPlaceholder.classList.add("expanding");
}

function handleDragEnter(e) {
  // this.insertBefore(iconPlaceholder, this.children[getDropIndex(e)]);
}

function handleDragLeave(e) {
  e.preventDefault();

  if (!this.contains(e.relatedTarget)) {
    console.log("left");
    if (
      iconPlaceholder.classList.contains("icon-ghost") &&
      this.contains(iconPlaceholder)
    ) {
      iconPlaceholder.remove();
      console.log("removed");
    }
  }
}

function handleDrop(e) {
  e.preventDefault();
  const dockIcon = document.createElement("img");

  dockIcon.classList.add("icon");

  iconDataSrc = e.dataTransfer.getData("iconDatasrc");
  console.log("dropped", iconDataSrc);
  dockIcon.src = iconDataSrc;
  this.insertBefore(dockIcon, this.children[getDropIndex(e)]);
  if (!this.contains(e.relatedTarget)) {
    console.log("left");
    if (
      iconPlaceholder.classList.contains("icon-ghost") &&
      this.contains(iconPlaceholder)
    ) {
      iconPlaceholder.remove();
      console.log("removed");
    }
  }
}