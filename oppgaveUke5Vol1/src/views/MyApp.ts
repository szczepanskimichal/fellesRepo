import { BaseComponent } from "../components/BaseComponent";

export class MyApp extends BaseComponent {
    static propNames = [];
    
    render() {
        this.shadowRoot!.innerHTML = `
            <h1>Hello from MyApp</h1>
        `;
    }
}