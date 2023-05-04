const canvas = document.getElementById("canvas");
const nodes = [];
function createNode(x, y, text) {
  const node = document.createElement("div");
  node.classList.add("node");
  node.style.left = x + "px";
  node.style.top = y + "px";
  node.textContent = text;
  node.contentEditable = true;
  node.addEventListener("click", (event) => {
    event.stopPropagation();
    createChildNode(node);
  });
  canvas.appendChild(node);
  nodes.push(node);
}
function createChildNode(parentNode) {
  const rect = parentNode.getBoundingClientRect();
  const x = rect.left + rect.width + 50;
  const y = rect.top;
  createNode(x, y, "");
}
canvas.addEventListener("click", (event) => {
  const x = event.clientX;
  const y = event.clientY;
  createNode(x, y, "");
});
