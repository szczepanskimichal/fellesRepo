import type {Model} from "./model";

export function render(Model: Model) {
    const root = document.getElementById("app");
    if (!root) return;
    // Example usage: render Model as JSON
    root.innerHTML="";
    const controls=document.createElement("div");
    const input=document.createElement("input");
    input.type="text";
    input.placeholder="What needs to be done?";
    controls.appendChild(input);
    const addButton=document.createElement("button");
    addButton.textContent="Add";
    controls.appendChild(addButton);
    root.appendChild(controls);

    // Display Model as JSON for demonstration
    const modelDisplay = document.createElement("pre");
    modelDisplay.textContent = JSON.stringify(Model, null, 2);
    root.appendChild(modelDisplay);
}