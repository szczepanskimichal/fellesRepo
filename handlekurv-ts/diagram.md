# Flowchart UML for commonView.ts Module

This flowchart represents the structure and flow of the `commonView.ts` module, including its functions and interactions with other modules (`view.ts` and `model.ts`).

```mermaid
flowchart TD
    A[commonView.ts Module] --> B[generateFooter Function]
    A --> C[generateNavbar Function]
    A --> D[itemsTotalCart Function]
    
    B --> E[Set footer innerHTML with current year]
    
    C --> F[Create nav elements]
    C --> G[Add event listeners to links]
    G --> H[Set model.app.currentPage and call updateView]
    H --> I[updateView from view.ts]
    C --> J[Add click listener to body for itemsTotalCart]
    
    D --> K[Access model.cart.items and model.cart.total]
    D --> L[Update infoCart innerText]
    
    I --> M[model.ts Module - Provides data]
    K --> M
```

### Module Descriptions

- **commonView.ts**: Main module containing view generation functions.
- **generateFooter**: Generates and returns the footer element with copyright info.
- **generateNavbar**: Creates and appends the navbar to the header, with links that update the model and view.
- **itemsTotalCart**: Updates the cart info span with item count and total from the model.
- **view.ts**: Imported module providing `updateView` function to refresh the UI.
- **model.ts**: Imported module providing the application state (e.g., cart data, current page).

```// filepath: /home/geir/Projects/GET/Frontend2025.2/2. Emne 2 og 3 - Frameworkless, Typescript og Funksjonell programering/Uke 2/Ukesoppgave/handlekurv-ts/flowchart.md

# Flowchart UML for commonView.ts Module

This flowchart represents the structure and flow of the `commonView.ts` module, including its functions and interactions with other modules (`view.ts` and `model.ts`).

```mermaid
flowchart TD
    A[commonView.ts Module] --> B[generateFooter Function]
    A --> C[generateNavbar Function]
    A --> D[itemsTotalCart Function]
    
    B --> E[Set footer innerHTML with current year]
    
    C --> F[Create nav elements]
    C --> G[Add event listeners to links]
    G --> H[Set model.app.currentPage and call updateView]
    H --> I[updateView from view.ts]
    C --> J[Add click listener to body for itemsTotalCart]
    
    D --> K[Access model.cart.items and model.cart.total]
    D --> L[Update infoCart innerText]
    
    I --> M[model.ts Module - Provides data]
    K --> M
```

### Module Descriptions

- **commonView.ts**: Main module containing view generation functions.
- **generateFooter**: Generates and returns the footer element with copyright info.
- **generateNavbar**: Creates and appends the navbar to the header, with links that update the model and view.
- **itemsTotalCart**: Updates the cart info span with item count and total from the model.
- **view.ts**: Imported module providing `updateView` function to refresh the UI.
- **model.ts**: Imported module providing the application
