import type { AppState } from "./types";

export const initialAppState: AppState = {
  categories: ["Drikke", "Bakverk", "Småretter", "Sandwich", "Salat", "Dessert"],
  menuItems: [
    // Drikke
    {
      id: 1,
      name: "Espresso",
      price: 32,
      category: "Drikke",
      description: "Enkel espresso, 30 ml.",
      imageUrl: "https://images.unsplash.com/photo-1758024708245-69a5d4b23892?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870"    },
    {
      id: 2,
      name: "Cappuccino",
      price: 49,
      category: "Drikke",
      description: "Espresso med steamet melk og skum.",
      imageUrl: "https://images.unsplash.com/photo-1758024708232-f3ce4c3b4565?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870"    },
    {
      id: 3,
      name: "Iste",
      price: 45,
      category: "Drikke",
      description: "Hjemmelaget sitron-iste.",
      imageUrl: "https://unsplash.com/photos/espresso-being-poured-into-a-cup-and-a-creamer-z4zk8Im3a3I" // bruker kaffe-bilde midlertidig
    },

    // Bakverk
    {
      id: 10,
      name: "Brownie",
      price: 39,
      category: "Bakverk",
      description: "Saftig sjokoladebrownie.",
      imageUrl: "https://unsplash.com/photos/a-close-up-of-some-brownies-on-a-table-XqmAXOqP0js" // fra Unsplash :contentReference[oaicite:2]{index=2}
    },
    {
      id: 11,
      name: "Croissant",
      price: 36,
      category: "Bakverk",
      description: "Smør-croissant, sprø og luftig.",
      imageUrl: "https://unsplash.com/photos/baked-brownies-k1IE4WteYIU" // placeholder (kan byttes til croissant‐bilde) :contentReference[oaicite:3]{index=3}
    },

    // Småretter
    {
      id: 20,
      name: "Dagens suppe",
      price: 98,
      category: "Småretter",
      description: "Serveres med brød og smør.",
      imageUrl: "https://unsplash.com/photos/espresso-cup-with-black-stripes-lHqkdvIPWm8" // placeholder
    },
    {
      id: 21,
      name: "Ost & kjeks",
      price: 119,
      category: "Småretter",
      description: "Utvalg av oster med kjeks.",
      imageUrl: "https://unsplash.com/photos/a-stack-of-brownies-sitting-on-top-of-a-white-plate-dkEnDJiT0k8" // placeholder
    },

    // Sandwich
    {
      id: 30,
      name: "Kyllingsandwich",
      price: 129,
      category: "Sandwich",
      description: "Kylling, aioli, salat, tomat.",
      imageUrl: "https://unsplash.com/photos/a-small-cup-of-espresso-on-a-saucer-zKw25NinI3w" // placeholder
    },
    {
      id: 31,
      name: "Veggie sandwich",
      price: 119,
      category: "Sandwich",
      description: "Avokado, hummus, grønnsaker.",
      imageUrl: "https://unsplash.com/photos/a-stack-of-brownies-sitting-on-top-of-a-white-plate-dkEnDJiT0k8" // placeholder
    },

    // Salat
    {
      id: 40,
      name: "Cæsarsalat",
      price: 139,
      category: "Salat",
      description: "Kylling, krutonger, parmesan.",
      imageUrl: "https://unsplash.com/photos/espresso-cup-and-saucer-with-black-stripes-lHqkdvIPWm8" // placeholder
    },
    {
      id: 41,
      name: "Bete & feta",
      price: 129,
      category: "Salat",
      description: "Rødbeter, feta, valnøtter.",
      imageUrl: "https://unsplash.com/photos/white-ceramic-espresso-cup-with-saucer-and-spoon-with-heart-form-QPRj0bMb5Fk" // placeholder
    },
  ],
};