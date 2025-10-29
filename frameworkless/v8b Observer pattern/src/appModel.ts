import type { AppState, MenuItem } from "./types";
import { initialAppState } from "./initialAppState";

class AppModel {

  private _state : AppState;
  private subscribers: Function[]=[];

constructor(initialState?: AppState) {
  this._state = initialState || {menuItems: [], categories: []};
}

public subscribe(subscriber: Function): void {
  this.subscribers.push(subscriber);
  const state = this.getState();
  subscriber(state);
}

public notifySubscribers(): void {
  const state = this.getState();
  // for(const subscriber of this.subscribers) {
  //   subscriber(this.state);
  // }
  // this.subscribers.forEach(subscriber => subscriber(this.state));
  this.subscribers.forEach(subscriber => subscriber(state));
}

private getState(){
  return Object.freeze(structuredClone(this._state));
}

 public addCategory(category: string): void {
   this._state.categories.push(category);
   this.notifySubscribers(); // inform all subscribers about the change!!!!
 }
  public addMenuItem(menuItem: MenuItem): void {
    const maxId = this._state.menuItems.reduce((max, mi) => mi.id > max ? mi.id : max, 0);
      menuItem.id = maxId + 1;
    this._state.menuItems.push(menuItem);
    this.notifySubscribers();
  }
}

export const appModel = new AppModel(initialAppState);
appModel.addCategory('something - robie ten przycisk z appModel!!!');
