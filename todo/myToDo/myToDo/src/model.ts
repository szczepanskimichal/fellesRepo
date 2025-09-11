export type TodoFilter = "all" | "active" | "completed";

export interface Todo {
    id: number;
    description: string;
    completed: boolean;
}

export interface InitialModel{
    todos: Todo[];
    nextId: number;
}

export interface Model extends InitialModel{
    filter: TodoFilter;
}

export const initialModel: Model = {
    todos: [],
    nextId: 1,
    filter: "all",
};