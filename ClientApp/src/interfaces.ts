export interface Todo {
    id?: number;
    due_date: string;
    todo_text: string | null;
    reminder: boolean | null;
}

export type IAddTodoResponse = {
    status: number;
    id: number;
} & {
    error: unknown;
}

export type IEditTodoResponse = {
    status: number;
} & {
    error: unknown;
}

export type IUpdateTodoReminderResponse = {
    status: number;
} & {
    error: unknown;
}

export type IDeleteAllResponse = {
    status: number;
} & {
    error: unknown;
}