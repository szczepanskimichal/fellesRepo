import { BaseComponent } from "../components/BaseComponent";
import type { FileOrFolder } from "../types";

export class AddFileOrFolder extends BaseComponent {
    private state = {
        name: '',
        errorMessage: "",
    };
    render() {
        this.shadowRoot!.innerHTML = /*HTML*/`
            <fieldset>
                <legend>Legg til fil eller mappe</legend>
                <div style="color:red">${this.state.errorMessage}</div>
                <input type="text"/>
                <button>Ny fil</button>
                <button>Ny mappe</button>
            </fieldset>
        `;
        const input = this.shadowRoot!.querySelector('input');
        input?.addEventListener('input', (e: Event) => this.state.name = input.value);
        const btns = this.shadowRoot!.querySelectorAll('button');
        btns[0].addEventListener('click', () => this.handleClick(true));
        btns[1].addEventListener('click', () => this.handleClick(false));
    }

    handleClick(isFile: boolean) {
        const detail = {
            isFile: isFile,
            name: this.state.name,
        };
        if(!detail.name || detail.name.length ==0) {
            this.state.errorMessage = "Name is required";
            this.render();
        } else {
        const event = new CustomEvent('content-added', {detail});
        this.dispatchEvent(event);        
        }
    }
}