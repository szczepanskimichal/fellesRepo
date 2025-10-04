import type { Category } from "../types";

const handlerCategoryChange = (category: Category) => {
  if(category === 'Personal') {
    console.log('Personal selected');
  } else if (category === 'Work') {
    console.log('Work selected');
  } else if (category === 'Shopping') {
    console.log('Shopping selected');
  } else if (category === 'Others') {
    console.log('Others selected');
  } else if (category === 'test') {
    console.log('test selected');
    document.body.style.backgroundColor = 'lightblue';
  } else {
    // This block should never be reached if Category type is exhaustive
    // Adding this to satisfy TypeScript's exhaustiveness checking
    const never: never = category;
    console.log(never);
  }
}

export const renderCategories = (
  categories: Category[], 
  categoriesContainerElement: HTMLElement,
  inputChangeCallback: (category: Category) => void) => { // to jest bardzo wazne!!!
categories.forEach((category)=> {
  const categoryElement: HTMLElement = document.createElement('li');
  const radioInputElement: HTMLInputElement = document.createElement('input');
  radioInputElement.type = 'radio';
  radioInputElement.name = 'category';
  radioInputElement.value = category;
  radioInputElement.id = `category-${category.toUpperCase()}`;
  radioInputElement.addEventListener('change', () => {
    // selectedCategory = category;
    inputChangeCallback(category);
    handlerCategoryChange(category);
  });
  const labelElement: HTMLElement = document.createElement('label');
  labelElement.setAttribute('for', radioInputElement.id);
  categoryElement.textContent = category;
  categoryElement.appendChild(radioInputElement); 
  categoriesContainerElement.appendChild(categoryElement);
});
}