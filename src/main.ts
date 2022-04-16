import { App } from '@vue/runtime-dom';
import * as components from './components';

let install = (app: App) => {
  Object.keys(components).map((key: string) => {
    let component = (components as any)[key];
    app.use(component);
  })
}

// Use modularized viewui 
export * from './components';

// global import
export default {
  install,
}