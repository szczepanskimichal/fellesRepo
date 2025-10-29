
import { BaseComponent } from "./BaseComponent";
import { appModel } from "../appModel";
import type { AppState } from "../types";

export class SubscriberComponent extends BaseComponent {
    protected state: AppState | null = null;
    connectedCallback(): void {
        super.connectedCallback();
        appModel.subscribe((state: AppState)=>{
            this.state = state;
            this.scheduleRender();
        });
    }
}