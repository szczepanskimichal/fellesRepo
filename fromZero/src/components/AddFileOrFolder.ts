import { BaseComponent } from "../components/BaseComponent";
import type { FileOrFolder } from "../types";

export class AddFileOrFolder extends BaseComponent {
    private state = {
        name: '',
    };
    render() {
        this.shadowRoot!.innerHTML = /*HTML*/`
            <fieldset>
                <legend>Legg til fil eller mappe</legend>
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
        const event = new CustomEvent('content-added', {detail});
        this.dispatchEvent(event);        
    }
}