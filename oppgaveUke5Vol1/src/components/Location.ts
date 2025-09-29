export class Location extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
    }

    connectedCallback() {}
    render() {
    this.shadowRoot!.innerHTML = /*HTML*/`<div>
        <p>Her er du nå</p>
        <div>rottmapen - location</div>
    </div>`
    }
    
}