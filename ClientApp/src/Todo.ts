export interface Todo {
    id?: number;
    day_date: string;
    todo_text: string | null;
    reminder: boolean | null;
}