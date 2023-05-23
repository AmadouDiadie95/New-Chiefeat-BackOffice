export class MenuCategory {

    id: number;
    name: string;
    catPictureUrl: string;
    description: string;
    enable: boolean;
    parentsId: number;
    menus: Menu[];
}


export class Menu {

  id: number;
     name: string;
     description: string;
     enable: boolean;
     price: number;
     usersId: number;
     eatersNumber: number;
     preparationTime: number;
     acceptMultipleEaters: boolean;
     categories: string;
     ingredients: string;
     utensils: string;
     documents: string;
}

export const menuCategories: MenuCategory[] = [
    {
        id: 1,
        name: "Entrées",
        catPictureUrl: "https://example.com/entrees.jpg",
        description: "Délicieuses entrées pour ouvrir l'appétit",
        enable: true,
        parentsId: null,
        menus: [
            {
                id: 1,
                name: "Salade César",
                description: "Salade avec poulet grillé, croûtons et sauce César",
                enable: true,
                price: 8.99,
                usersId: 1,
                eatersNumber: 1,
                preparationTime: 15,
                acceptMultipleEaters: false,
                categories: "Entrées",
                ingredients: "Laitue, poulet, croûtons, sauce César",
                utensils: "Bol, cuillère, couteau",
                documents: ""
            },
            {
                id: 2,
                name: "Bruschetta",
                description: "Pain grillé garni de tomates, basilic et fromage",
                enable: true,
                price: 6.99,
                usersId: 2,
                eatersNumber: 1,
                preparationTime: 10,
                acceptMultipleEaters: false,
                categories: "Entrées",
                ingredients: "Pain, tomates, basilic, fromage",
                utensils: "Assiette, couteau",
                documents: ""
            },
            // Ajoutez d'autres menus pour la catégorie "Entrées"
        ]
    },
    {
        id: 2,
        name: "Plats principaux",
        catPictureUrl: "https://example.com/plats-principaux.jpg",
        description: "Délicieux plats pour le repas principal",
        enable: true,
        parentsId: null,
        menus: [
            {
                id: 3,
                name: "Steak de boeuf",
                description: "Steak juteux accompagné de légumes sautés",
                enable: true,
                price: 19.99,
                usersId: 1,
                eatersNumber: 1,
                preparationTime: 30,
                acceptMultipleEaters: false,
                categories: "Plats principaux",
                ingredients: "Steak de boeuf, légumes",
                utensils: "Poêle, couteau",
                documents: ""
            },
            {
                id: 4,
                name: "Pâtes à la carbonara",
                description: "Pâtes crémeuses avec du bacon et du parmesan",
                enable: true,
                price: 12.99,
                usersId: 2,
                eatersNumber: 1,
                preparationTime: 20,
                acceptMultipleEaters: false,
                categories: "Plats principaux",
                ingredients: "Pâtes, bacon, oeufs, parmesan",
                utensils: "Casserole, cuillère, couteau",
                documents: ""
            },
            // Ajoutez d'autres menus pour la catégorie "Plats principaux"
        ]
    },
    // Ajoutez d'autres catégories avec leurs menus correspondants
];

