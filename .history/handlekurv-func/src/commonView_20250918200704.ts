export function mainView(): HTMLElement{
const app = document.getElementById('app');

// hoved seksjoner

const header = document.createElement('header') as HTMLElement;

const main = document.createElement('main') as HTMLElement;

const footer = document.createElement('footer') as HTMLElement;

header.id = 'header';
main.id = 'main';
footer.id = 'footer';

app?.appendChild(header);
app?.appendChild(main);
app?.appendChild(footer);


return app!;
}