import { App } from "@vue/runtime-dom";

export function withInstall<T>(comp: T) {
  const c = (comp as any);
  c.install = (app: App) => {
    app.component(c.name, c);
  }

  return c;
}