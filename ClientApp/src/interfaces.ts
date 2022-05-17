export interface Todo {
    id?: number;
    due_date: string;
    todo_text: string | null;
    reminder: boolean | null;
}
export interface Joke {
    created_at: string;
    categories: Array<string>;
    icon_url: string;
    id: string;
    url: string;
    value: string;
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

export type IGetRandomJokeResponse = {
    status: number;
    joke: Joke
} & {
    error: unknown;
}

export type IGetCategoriesResponse = {
    status: number;
    categories: Array<string>;
} & {
    error: unknown;
}
export type IGetJokeByCategoryResponse = {
    status: number;
    joke: Joke;
} & {
    error: unknown;
}