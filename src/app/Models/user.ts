export interface User {
    id:string;
    email:string;
    emailConfirmed:boolean;
    passwordHash:string;
    twoFactorEnabled:boolean;
    phoneNumber:string;
    phoneNumberConfirmed:boolean;
    isActive:boolean;
}
