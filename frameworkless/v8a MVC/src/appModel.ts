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

 public getMenuItem(id: number): MenuItem | undefined {
  return this.state.menuItems.find(mi => mi.id === id);
}

 public addCategory(category: string): void {
   this.state.categories.push(category);
 }
  public addMenuItem(menuItem: MenuItem): void {
    const maxId = this._state.menuItems.reduce((max, mi) => mi.id > max ? mi.id : max, 0);
      menuItem.id = maxId + 1;
    this.state.menuItems.push(menuItem);
  }
}

export const appModel = new AppModel(initialAppState);
appModel.addCategory('something - robie ten przycisk z appModel!!!');
