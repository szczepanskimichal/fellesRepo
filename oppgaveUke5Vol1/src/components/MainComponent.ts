import { BaseComponent } from "./BaseComponent";
import type { AppState } from "../types";

export class MainComponent extends BaseComponent {

    static propNames: string[] = ['state'];

    render() {
        const state: AppState = this.get('state') || { currentId: null, filesAndFolders: [] };
        
        this.shadowRoot!.innerHTML = `
            <fieldset>
            
            <legend>Filer & mapper</legend>
            <my-location>location here!</my-location>
          
            
            <div>
            <my-list></my-list>
            </div>
            
        


        <div>
            <p>Slette</p>
         </div>
 
        </div>

         <div>
<my-input></my-input>
</div>
        
            </fieldset>`
        }
    }



