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
        <p>Mapper og filer</p>
            <ul>
            ${state.filesAndFolders.map(item => `
                <li>
                    <h2>${item.name}</h2>
                    ${item.parentId ? `<small>(w folderze ${item.parentId})</small>` : ''}
                </li>
            `).join('')}
            </ul>
        </div>


        <div>
            <p>Slette</p>
        </div>



        <div>
        <p>Opprette mappe eller file</p>
            <input type="text" placeholder="Skriv..." />            
            <button>Legg til fil</button>
            <button>Legg til mappe</button>
        </div>       
            </fieldset>`
        }
    }



