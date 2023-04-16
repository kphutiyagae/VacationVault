import {IUserCredential} from "../../models/types";

export function setUserCredentials(credentials: IUserCredential) {

    if(!credentials) return;

    localStorage.setItem('user-credentials', JSON.stringify(credentials))
}

export function isUserAuthenticated(): boolean {
    const userAuthObject =  localStorage.getItem('user-credentials');
    return !!userAuthObject;
}

export function getUserId(): string | null{
    const userAuthObjectString = localStorage.getItem('user-credentials');

    if(userAuthObjectString){
        const userCredentials: { 'user_id': string, 'user_JWT': string } = JSON.parse(userAuthObjectString);
        return userCredentials.user_id;
    }

    return null;
}

export function removeUserCredentials(){
    localStorage.removeItem('user-credentials');
    localStorage.clear();
}