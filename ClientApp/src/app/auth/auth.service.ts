import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {

    constructor() {
    }

    public isAuthenticated(): boolean {
        const idoLogin: any = localStorage.getItem('ido-login');
        const decodedLogin: any = atob(idoLogin);
        if (decodedLogin) {
            try {
                const jsonBody = JSON.parse(decodedLogin);
                if (jsonBody?.userEmail === 'test@gmail.com') {
                    return true;
                }
            } catch (error) {

            }
        }
        return false;
    }
}