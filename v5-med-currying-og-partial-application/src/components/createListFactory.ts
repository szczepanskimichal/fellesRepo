const createListFactory = 
    (color: string) =>
    (items: string[]) => {
      const list = document.createElement('ul');
      items.forEach(item => {

          const listItem = document.createElement('li');
          listItem.style.color=color;
          listItem.textContent = item;
          list.appendChild(listItem);
      });
      return list;
    };
    
// DATA: Partially applied function - configured with specific list of items 
export const RedList = createListFactory('red');
export const BilLIste = createListFactory('blue')(['BMW', 'Audi', 'Mercedes']);


