export class Input extends HTMLElement {
constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.render();
    }
    render() {
        this.shadowRoot!.innerHTML = /*HTML*/`<div>
            <p>Opprette mappe eller file</p>
            <input type="text" placeholder="Skriv..." id="my-input" />            
            <button id="add-file-btn">Legg til fil</button>
            <button>Legg til mappe</button>
        </div>`
    }
}