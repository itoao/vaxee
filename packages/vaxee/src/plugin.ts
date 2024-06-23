import { ref, type App, type Ref } from "vue";
import type { VaxeeStoreState } from "./helpers";
import type { VaxeeStore } from "./store/defineStore";
import { IS_CLIENT, IS_DEV, VAXEE_LOG_START } from "./constants";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $vaxee: Vaxee;
  }
}

export const vaxeeSymbol = Symbol("vaxee");

export interface Vaxee {
  install(app: App): void;
  state: Ref<Record<string, VaxeeStoreState<any>>>;
  _stores: Record<string, VaxeeStore<any, any>>;
}

let vaxeeInstance: Vaxee | null = null;

export function setVaxeeInstance(instance: Vaxee) {
  vaxeeInstance = instance;
}

export const getVaxeeInstance = () => vaxeeInstance;

export function createVaxee() {
  const vaxee: Vaxee = {
    install(app: App) {
      setVaxeeInstance(vaxee);
      app.provide(vaxeeSymbol, vaxee);

      if (IS_DEV && IS_CLIENT) {
        if (!__TEST__) {
          console.log(
            VAXEE_LOG_START +
              "Store successfully installed. Enjoy! Also you can check current Vaxee state by using a `$vaxee` property in the `window`."
          );
        }
        // @ts-ignore
        window.$vaxee = vaxee.state;
      }
    },
    state: ref({}),
    _stores: {},
  };

  return vaxee;
}
