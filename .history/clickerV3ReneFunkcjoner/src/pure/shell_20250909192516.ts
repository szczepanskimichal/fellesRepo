import { model } from "../model";
import {doClickImpl, buyUpgradeImpl} from "./controller";



function doClick(model:Model): Model {
    const newModel= doClickImpl(model);
    // const element = updateView(newModel);
    // document.getElementById('app')!.replaceWith(element);
}


