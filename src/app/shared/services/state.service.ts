import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StateService {
  private state = new Map<string, any>();

  constructor() {}

  setState(key: string, value: any): void {
    this.state.set(key, value);
  }

  getState(key: string): any {
    return this.state.get(key);
  }
  removeState(key: string): void {
    this.state.delete(key);
  }

  clearState(): void {
    this.state.clear();
  }
}