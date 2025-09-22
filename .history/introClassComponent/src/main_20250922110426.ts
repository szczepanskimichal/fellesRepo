

export function CircledText(text: string, backColor: string, textColor: string) : HTMLElement{
    const div = document.createElement("div");
    const fontSize = Math.min(300, 300/text.length);
    div.innerHTML = /*HTML*/`
        <div 
            class="circled-text"
            style="background-color:${backColor}; color:${textColor}; font-size:${fontSize}px"
            >
            ${text}
        </div>        
    `;
    return div;
}

render();

function render() {
  const app = document.getElementById("app")!;
  const circledText1 = CircledText("Hei", "blue", "white");
  const circledText2 = CircledText("Verden", "green", "white");
  circledText1.style="color: black"
  app.appendChild(circledText1);
  app.appendChild(circledText2);
}