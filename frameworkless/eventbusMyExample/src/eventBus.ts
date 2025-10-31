// src/eventBus.ts - Generyczny EventBus z TypeScript!

// 🎯 Definiujemy mapę eventów i ich typów
interface EventMap {
  buttonClicked: { message: string };
  resetScreen: undefined; // event bez danych
  changeColor: { color: string };
}

// 🚀 Generyczna klasa EventBus
class TypedEventBus<T extends Record<string, any>> extends EventTarget {
  // emit z typowaniem - TypeScript sprawdzi czy dane się zgadzają!
  emit<K extends keyof T>(eventName: K, data: T[K]) {
    console.log(`📡 Emituję event: ${String(eventName)}`, data);
    const event = new CustomEvent(String(eventName), { detail: data });
    this.dispatchEvent(event);
  }

  // on z typowaniem - TypeScript wie jaki typ danych dostaniesz!
  on<K extends keyof T>(
    eventName: K, 
    callback: T[K] extends undefined 
      ? () => void 
      : (event: CustomEvent<T[K]>) => void
  ) {
    console.log(`👂 Rejestruję nasłuchiwanie: ${String(eventName)}`);
    this.addEventListener(String(eventName), callback as EventListener);
  }
}

// 🎉 Eksportujemy typowany Event Bus
export const eventBus = new TypedEventBus<EventMap>();

// 🔥 Teraz TypeScript będzie sprawdzał:
// ✅ eventBus.emit('buttonClicked', { message: 'OK' }) 
// ❌ eventBus.emit('buttonClicked', { wrong: 'type' })
// ❌ eventBus.emit('nonExistentEvent', {}))