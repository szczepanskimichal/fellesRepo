import { BaseComponent } from "./BaseComponent";
import type { AppState } from "../types";
import { Location } from "./Location";

export class MainComponent extends BaseComponent {

    propNames: string[] = ['state'];


    

    render() {
        // const state: AppState = this.getProp('state');
        const location = new Location();

        this.shadowRoot!.innerHTML = `
            <fieldset>
            
            <legend>Filer & mapper</legend>
            ${location.connectedCallback()}
          
            
            
            
        <div>
        <p>Mapper og filer</p>
            <ul>
            <li>
                <h2>Emne1</h2>
            </li>
            <li>
                <h2>Emne2</h2>
            </li>
            <li>
                <h2>Emne4</h2>
            </li>
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



