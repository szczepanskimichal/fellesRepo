import type { AppState } from "./types";

export const initialAppState: AppState = {
    categories: ["Drikke", "Bakverk", "Småretter", "Sandwich", "Salat"],
    menuItems: [
        // Drikke
        { id: 1, name: "Espresso", price: 32, category: "Drikke", description: "Enkel espresso, 30 ml." },
        { id: 2, name: "Cappuccino", price: 49, category: "Drikke", description: "Espresso med steamet melk og skum." },
        { id: 3, name: "Iste", price: 45, category: "Drikke", description: "Hjemmelaget sitron-iste." },

        // Bakverk
        { id: 10, name: "Brownie", price: 39, category: "Bakverk", description: "Saftig sjokoladebrownie." },
        { id: 11, name: "Croissant", price: 36, category: "Bakverk", description: "Smør-croissant, sprø og luftig." },

        // Småretter
        { id: 20, name: "Dagens suppe", price: 98, category: "Småretter", description: "Serveres med brød og smør." },
        { id: 21, name: "Ost & kjeks", price: 119, category: "Småretter", description: "Utvalg av oster med kjeks." },

        // Sandwich
        { id: 30, name: "Kyllingsandwich", price: 129, category: "Sandwich", description: "Kylling, aioli, salat, tomat." },
        { id: 31, name: "Veggie sandwich", price: 119, category: "Sandwich", description: "Avokado, hummus, grønnsaker." },

        // Salat
        { id: 40, name: "Cæsarsalat", price: 139, category: "Salat", description: "Kylling, krutonger, parmesan." },
        { id: 41, name: "Bete & feta", price: 129, category: "Salat", description: "Rødbeter, feta, valnøtter." },
    ],
};

