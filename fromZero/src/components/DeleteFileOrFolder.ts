import { BaseComponent } from "../components/BaseComponent";

export class DeleteFileOrFolder extends BaseComponent {
    private state = {
        isInInitialPhase: true,
    };

    // Reset do fazy początkowej przy każdym renderowaniu
    connectedCallback() {
        super.connectedCallback();
        this.state.isInInitialPhase = true;
    }

    render() {
        const checkedItem = this
       const isInInitialPhase = this.state.isInInitialPhase;
        this.shadowRoot!.innerHTML = /*HTML*/`
            <fieldset>
                <legend>Slett fil eller mappe</legend>
                ${isInInitialPhase ?/*HTML*/`
                    <button>Slett</button>
                `:/*HTML*/`
                    Er du sikker på at du vil slette?<br/>
                    <button>Ja, slett!</button>
                    <button>Avbryt</button>
                `}
            </fieldset>
        `;

        if (isInInitialPhase) {
            const btn = this.shadowRoot!.querySelector('button')!;
            btn.addEventListener('click', () => this.handleChangePhase(false));
        } else {
            const btns = this.shadowRoot!.querySelectorAll('button')!;
            btns[0].addEventListener('click', this.handleDelete.bind(this));
            btns[1].addEventListener('click', () => this.handleChangePhase(true));
        }
    }

    handleDelete(){
        const event = new CustomEvent('delete-file-or-folder');
        const detail = {

        }
        this.dispatchEvent(event, id );
    }

    handleChangePhase(isInInitialPhase: boolean) {
        console.log("initialPhase", isInInitialPhase);
        this.state.isInInitialPhase = isInInitialPhase;
        if (isInInitialPhase) {
            const event = new CustomEvent('cancel-delete');
            this.dispatchEvent(event);
        }
        this.scheduleRender();
    }
}
// customElements.define('delete-file-or-folder', DeleteFileOrFolder);