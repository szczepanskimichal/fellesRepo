// src/buttonModule.ts
import { eventBus } from './eventBus';

export function setupButtons() {
  const notifyBtn = document.querySelector<HTMLButtonElement>('#notifyBtn')!;
  const resetBtn = document.querySelector<HTMLButtonElement>('#resetBtn')!;
  const colorBtn = document.querySelector<HTMLButtonElement>('#colorBtn')!;

  notifyBtn.addEventListener('click', () => {
    console.log('🟡 Kliknięto przycisk WYŚLIJ');
    // ✅ TypeScript sprawdzi że przekazujesz { message: string }
    eventBus.emit('buttonClicked', { message: 'Cześć z Event Busa 🚀' });
  });

  resetBtn.addEventListener('click', () => {
    console.log('🔵 Kliknięto przycisk RESET');
    // ✅ TypeScript wie że resetScreen nie wymaga danych
    eventBus.emit('resetScreen', undefined);
  });

  colorBtn.addEventListener('click', () => {
    console.log('🟠 Kliknięto przycisk ZMIEŃ KOLOR');
    const colors = ['darkblue', 'red', 'green', 'purple', 'orange', 'brown'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    // ✅ TypeScript sprawdzi że przekazujesz { color: string }
    eventBus.emit('changeColor', { color: randomColor });
  });
}