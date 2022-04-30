export interface Todo {
    id?: number;
    due_date: string;
    todo_text: string | null;
    reminder: boolean | null;
}

export type AddTodoResponse = {
    status: number;
    id: number;
} & {
    error: unknown
}

export type EditTodoResponse = {
    status: number;
} & {
    error: unknown
}