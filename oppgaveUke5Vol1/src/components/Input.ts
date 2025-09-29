export class Input extends HTMLElement {

    render() {
    this.shadowRoot!.innerHTML = /*HTML*/`<div>
        <input type="text" placeholder="Skriv..." />
    </div>`
    }
}