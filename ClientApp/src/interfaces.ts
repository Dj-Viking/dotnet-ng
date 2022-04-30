export interface Todo {
    id?: number;
    due_date: string;
    todo_text: string | null;
    reminder: boolean | null;
}

export interface AddTodoResponse {
    status: number;
    id: number;
}
export interface EditTodoResponse {
    status: number;
}