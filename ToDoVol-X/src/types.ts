export type Category = 'Personal' | 'Work' | 'Shopping' | 'Others';
export interface Task{
  title: string;
  done: boolean;
  category?: Category; // ogranicza kategorie do tych 4 wartosci, 
  // union types!!!
}

