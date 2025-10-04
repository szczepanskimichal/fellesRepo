export type Category = 'Personal' | 'Work' | 'Shopping' | 'Others' | 'test';
export interface Task{
  title: string;
  done: boolean;
  category?: Category; // ogranicza kategorie do tych 4 wartosci, 
  // union types!!!
}

