export interface Cat {
  name: string;
  age: number;
  breed: string;
  personality: string[];
  image: string;
}

const cats: Cat[] = [
  {
    name: "Milo",
    age: 2,
    breed: "British Shorthair",
    personality: ["playful", "curious", "friendly"],
    image: "1.jpg"
  },
  {
    name: "Luna",
    age: 1,
    breed: "Sphynx",
    personality: ["affectionate", "vocal", "energetic"],
    image: "2.jpg"
  },
  {
    name: "Oliver",
    age: 3,
    breed: "Maine Coon",
    personality: ["gentle", "lazy", "fluffy"],
    image: "3.jpg"
  },
  {
    name: "Cleo",
    age: 4,
    breed: "Siamese",
    personality: ["intelligent", "talkative", "loyal"],
    image: "4.jpg"
  },
  {
    name: "Nala",
    age: 5,
    breed: "Ragdoll",
    personality: ["calm", "friendly", "affectionate"],
    image: "5.jpg"
  },
  {
    name: "Simba",
    age: 2,
    breed: "Bengal",
    personality: ["adventurous", "energetic", "curious"],
    image: "6.jpg"
  }
];

export default cats;

