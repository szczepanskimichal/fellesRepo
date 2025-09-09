import { model } from "../model";
import {doClick, buyUpgrade} from "./controller";
import type { Model } from "../types";



function doClick(model:Model): Model {
    const newModel = doClick(model);
    const element = updateView(newModel);
    document.getElementById('app')!.replaceWith(element);
    
}


