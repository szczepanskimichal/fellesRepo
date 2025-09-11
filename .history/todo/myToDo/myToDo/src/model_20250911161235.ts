export type TodoFilter = "all" | "active" | "completed";

export interface Todo {
    id: number;
    description: string;
    completed: boolean;
}

export interface InitialModel{
    todos: Todo[];
    filter: TodoFilter;
}