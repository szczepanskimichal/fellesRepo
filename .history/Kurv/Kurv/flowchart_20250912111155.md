# Kurv App Flowchart


[Kurv App]
   |
   |---> [Products API / Database]   (fetches product data)
   |
   |---> [Payment Service]           (handles checkout/payment)
   |
   |---> [User Auth Service]         (manages user login/session)
   |
   |---> [Other Internal Modules]
           |---> [Controllers]
           |---> [Views]
           |---> [Shared Utilities]



graph TD
    A[Kurv App] --> B[Products API / Database]
    A --> C[Payment Service]
    A --> D[User Auth Service]
    A --> E[Controllers]
    A --> F[Views]
    A --> G[Shared Utilities]


```mermaid
graph TD
    A[Start] --> B[Initialize Model & Render Main View]
    B --> C{User Action?}
    C --> D[View Products]
    D --> E[productsController]
    E --> F[productsView]
    C --> G[Select Product]
    G --> H[productDetailController]
    H --> I[productDetailView]
    G --> J[Add to Cart]
    J --> K[cartController]
    K --> L[cartView]
    J --> M[Remove/Change Quantity]
    M --> K
    B --> N[Shared Utilities]
    C --> O[Update Model]
    O --> P[Re-render Views]
    P --> C
```

This flowchart describes the main logic and data flow in the Kurv shopping cart application. User actions are handled by controllers, which update the model and trigger view re-rendering.
