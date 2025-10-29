import type { AppState, MenuItem } from "./types";
import { initialAppState } from "./initialAppState";

class AppModel {

  private _state : AppState;

constructor(initialState?: AppState) {
  this._state = initialState || {menuItems: [], categories: []};
}

public get state(): AppState {
  return Object.freeze(this._state);
}

 public addCategory(category: string): void {
   this.state.categories.push(category);
 }
  public addMenuItem(menuItem: MenuItem): void {
    this.state.menuItems.push(menuItem);
  }
}

export const appModel = new AppModel(initialAppState);
appModel.addCategory('something');
