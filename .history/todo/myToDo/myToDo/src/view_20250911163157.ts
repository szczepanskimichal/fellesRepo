import type {Model} from "./model";

export function render(Model: Model) {
    const root = document.getElementById("app");
    if (!root) return;
    // Example usage: render Model as JSON
    root.innerHTML="";
}