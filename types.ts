export type LinkColumn = {
    type: 'link';
    label: string;
    url: string;
}

type TagColumn = {
    type: 'tag';
    label: string;
    id: string;
}

type NumberColumn = {
    type: 'number';
    value: number;
}

type TextColumn = {
    type: 'text';
    value: string;
}

export type User = {
    name: string;
    email: string;
    avatar: string;
}

export type UsersColumn = {
    type: 'users';
    users: User[];
}

export type Column = LinkColumn | TagColumn | NumberColumn | TextColumn | UsersColumn;

export type Grid = {
    id: number;
    name: string;
    headers: string[];
    data: Column[][];
}