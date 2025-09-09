import { model } from "../model";
import {doClickImpl, buyUpgradeImpl} from "./controller";
import type { Model } from "../types";



function doClick(model:Model): Model {
    const newModel = doClickImpl(model);
    // const element = updateView(newModel);
    // document.getElementById('app')!.replaceWith(element);
    return newModel;
}


