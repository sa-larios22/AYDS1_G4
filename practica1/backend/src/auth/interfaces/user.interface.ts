export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
    PERSONAL = 'PERSONAL'
}

export interface User {
    id: number;
    name: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    active: boolean;
    role: Role;
}