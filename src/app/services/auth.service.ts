import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserModel } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty";
  private apikey = "AIzaSyCq3BcdrfX-DYXh0u03g8-SuG8UN6i08Ss";
  // Crear nuevo usuario
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]

  // Login
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]

  constructor(private http: HttpClient) {}

  logout() {}

  login(user: UserModel) {}

  newUser(user: UserModel) {
    const authData = {
      ...user,
      returnSecureToken: true,
    };

    return this.http.post(
      `${this.url}/signupNewUser?key=${this.apikey}`,
      authData
    );
  }
}
