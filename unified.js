/** @type {?CSSStyleSheet} */
var selectedItem = null;
/** @type {?{x: number: y: number}} */
var dragPrev = null;

function addDraggableTitlebar() {
  document.querySelectorAll("div.title-bar").forEach((titlebar) => {
    titlebar.addEventListener("mousedown", () => {
      if (titlebar.parentNode.parentNode == null) return;

      const contentWindow = titlebar.parentNode.cloneNode(true);
      const contentOuter = titlebar.parentNode.parentNode;

      contentOuter.removeChild(titlebar.parentNode);
      contentOuter.appendChild(contentWindow);
      selectedItem = contentOuter.lastChild.style;

      addDraggableTitlebar();
    });
  });
}

addDraggableTitlebar();

document.addEventListener("mousemove", (e) => {
  if (selectedItem != null) {
    if (dragPrev == null) {
      dragPrev = {
        x: e.pageX,
        y: e.pageY,
      };
      return;
    }
    const dx = e.pageX - dragPrev.x;
    const dy = e.pageY - dragPrev.y;
    const posX = Number(selectedItem["left"].substring(0, selectedItem["left"].length - 2));
    const posY = Number(selectedItem["top"].substring(0, selectedItem["top"].length - 2));

    selectedItem["left"] = `${posX + dx}px`;
    selectedItem["top"] = `${posY + dy}px`;
    dragPrev.x = e.pageX;
    dragPrev.y = e.pageY;
  }
});

document.addEventListener("mouseup", () => {
  selectedItem = null;
  dragPrev = null;
});

function changeStyle() {
  const value = document.querySelector('select[name="style"]').value;
  document.getElementById("demo-content").className = `content ${value}`;
}

function decreaseCounter() {
  const value = Number(document.getElementById("button-count").innerText.split(" ")[0]);
  if (value - 1 < 0) {
    return;
  }
  document.getElementById("button-count").innerText = `${value - 1} ${
    value - 1 == 1 ? "time" : "times"
  }`;
}

function increaseCounter() {
  const value = Number(document.getElementById("button-count").innerText.split(" ")[0]);
  document.getElementById("button-count").innerText = `${value + 1} ${
    value + 1 == 1 ? "time" : "times"
  }`;
}
