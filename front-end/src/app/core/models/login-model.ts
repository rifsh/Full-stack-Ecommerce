import { MainUser, UserDetails } from "./user-reg-model";

export class LoginDetail {
    userName:'';
    password: '';
}
export class LoginResponse {
    status: string;
    token: string;
    user: MainUser
}
