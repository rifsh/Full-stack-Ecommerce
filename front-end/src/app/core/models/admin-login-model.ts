export class AdminLoginData {
    adminUsername: string;
    adminPassword: string;
}

export interface adminlogin {
    username: string,
    password: string
}

export interface adminLoginRes {
    name:string,
    status: string,
    message: string,
    token: string
}