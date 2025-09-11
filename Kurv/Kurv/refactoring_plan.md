# Refactoring Plan: Code Simplification

Here is a plan for simplifying the codebase before transitioning to a more functional style. The goal is to improve the structure and reduce complexity within the current imperative paradigm. Each step includes implementation details to ensure the app remains functional.

---

## Step 1: Consolidate Controller Files

**Goal:** Merge the three small controller files into a single, centralized `controller.ts`.

### The "What"
- Merge the contents of:
  - `src/Controllers/cartController.ts`
  - `src/Controllers/productDetailController.ts`
  - `src/Controllers/productsController.ts`
- Into a single new file: `src/controller.ts`.

### Implementation Steps
1.  **Create `src/controller.ts`**.
2.  **Copy all functions** from the three old controller files into the new `controller.ts`.
3.  **Export Functions:** Add the `export` keyword to each function you moved (e.g., `export function handleAddToCart(...)`).
4.  **Fix Imports:** Add the necessary imports at the top of `controller.ts` for functions like `updateView`, `addToCart`, etc. These will likely come from `./mutations.ts`, `./queries.ts`, and `./main.ts`.
5.  **Import in `main.ts`:** Import the controller functions in `src/main.ts`:
    ```typescript
    import './controller';
    ```
6.  **Cleanup:** Delete the old `src/Controllers` directory.

---

## Step 2: Consolidate View Files and Centralize Rendering

**Goal:** Merge all HTML-generating logic into a single `view.ts` and make `main.ts` the single source of rendering.

### The "What"
1.  Merge all `generate...` and `create...` functions from the `src/Views/` directory into a single `src/view.ts`.
2.  Delete the repetitive `updateView...Page` functions.
3.  Make the `updateView()` function in `src/main.ts` responsible for all DOM updates.

### Implementation Steps
1.  **Create `src/view.ts`**.
2.  **Move HTML-generating functions** into `src/view.ts`. This includes `generateProductsPage`, `createProductCard`, `generateNavbar`, `generateFooter`, `generateCartPage`, `createCartItem`, and `generateProductDetailPage`.
3.  **Export Page Generators:** Add the `export` keyword to the main page-generating functions: `generateProductsPage`, `generateProductDetailPage`, and `generateCartPage`.
4.  **Fix Imports:** Add necessary imports to `src/view.ts` for any query functions it needs (e.g., `import { getCartItemCount } from './queries';`).
5.  **Update `main.ts`:**
    - Import the new page generators: `import { generateProductsPage, generateProductDetailPage, generateCartPage } from './view';`.
    - Modify the `updateView` function to call the appropriate generator and set `innerHTML` directly.
    - **Important:** You must also `export function updateView() {...}` so it can be called from your controller.
6.  **Cleanup:** Delete the old `src/Views` directory.

---

## Step 3: Separate Data Reading from Data Writing

**Goal:** Split `common.ts` to clearly separate functions that read data from those that change it.

### The "What"
- Split `src/Shared/common.ts` into two new files: `src/queries.ts` and `src/mutations.ts`.

### Implementation Steps
1.  **Create `src/queries.ts`**. Move all functions that only **read** from the model into this file.
    - **Functions:** `calculateCartTotal`, `calculateCartItemCount`, `getAllProducts`, `getProductById`, `getCart`, `getCartTotal`, `getCartItemCount`.
    - **Export** every function.
    - Add `import { model } from './Model/model';` and any other necessary imports.

2.  **Create `src/mutations.ts`**. Move all functions that **change (mutate)** the model into this file.
    - **Functions:** `addToCart`, `removeFromCart`, `updateCartQuantity`, `clearCart`.
    - **Export** every function.
    - Add necessary imports (e.g., `import { model } from './Model/model';`, `import { getProductById } from './queries';`).

3.  **Update All Imports:** Go through every file (`controller.ts`, `view.ts`, `main.ts`) and change the old imports from `common.ts` to point to either `queries.ts` or `mutations.ts`.
4.  **Cleanup:** Delete the `src/Shared` directory.

---

## Step 4: Replace onclick Handlers with Event Listeners

**Goal:** Replace all inline `onclick` attributes in HTML strings with proper event listeners for better separation of concerns and cleaner code.

### Benefits
- **Separation of Concerns:** HTML no longer contains JavaScript code.
- **Clear Element Identification:** Uses semantic CSS classes and IDs.
- **Easier Testing:** Event handlers can be tested independently.
- **Better Maintainability:** All event handling logic is centralized in one place.
- **No Global Pollution:** No need to attach functions to the window object.
- **Specific Handlers:** Each type of element gets its own specific event listener.
