// src/screenModule.ts
import { eventBus } from './eventBus';

export function setupScreen() {
  const screen = document.querySelector<HTMLDivElement>('#screen')!;

  // ✅ TypeScript wie że event.detail ma typ { message: string }
  eventBus.on('buttonClicked', (event) => {
    console.log('🟢 Otrzymano event buttonClicked');
    // TypeScript wie że event.detail.message istnieje i jest stringiem!
    screen.textContent = event.detail.message ?? '';
  });

  // ✅ TypeScript wie że resetScreen nie ma danych
  eventBus.on('resetScreen', () => {
    console.log('⚪ Otrzymano event resetScreen');
    screen.textContent = '(Ekran czeka na wiadomość...)';
    screen.style.color = 'darkblue'; // przywrócenie domyślnego koloru
  });

  // ✅ TypeScript wie że event.detail ma typ { color: string }
  eventBus.on('changeColor', (event) => {
    console.log('🟠 Otrzymano event changeColor:', event.detail.color);
    // TypeScript wie że event.detail.color istnieje i jest stringiem!
    screen.style.color = event.detail.color ?? 'darkblue';
  });
}