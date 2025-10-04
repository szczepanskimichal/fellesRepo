import type { Category } from "../types";

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
  });
  const labelElement: HTMLElement = document.createElement('label');
  labelElement.setAttribute('for', radioInputElement.id);
  categoryElement.textContent = category;
  categoryElement.appendChild(radioInputElement); 
  categoriesContainerElement.appendChild(categoryElement);
});
}