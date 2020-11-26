import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserModel } from "../models/user.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty";
  private apikey = "AIzaSyCq3BcdrfX-DYXh0u03g8-SuG8UN6i08Ss";

  userToken: string;

  // Crear nuevo usuario
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]

  // Login
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  logout() {}

  login(user: UserModel) {
    const authData = {
      ...user,
      returnSecureToken: true,
    };

    return this.http
      .post(`${this.url}/verifyPassword?key=${this.apikey}`, authData)
      .pipe(
        map((response) => {
          this.saveToken(response["idToken"]);
          return response;
        })
      );
  }

  newUser(user: UserModel) {
    const authData = {
      ...user,
      returnSecureToken: true,
    };

    return this.http
      .post(`${this.url}/signupNewUser?key=${this.apikey}`, authData)
      .pipe(
        map((response) => {
          this.saveToken(response["idToken"]);
          return response;
        })
      );
  }

  private saveToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem("token", idToken);
  }

  loadToken() {
    if (localStorage.getItem("token")) {
      this.userToken = localStorage.getItem("token");
    } else {
      this.userToken = "";
    }

    return this.userToken;
  }
}
