import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserModel } from "../models/user.model";
import { map } from "rxjs/operators";

import { apikey } from "../../apikey";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty";

  userToken: string;

  // Crear nuevo usuario
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]

  // Login
  // https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  logout() {
    localStorage.removeItem("token");
  }

  login(user: UserModel) {
    const authData = {
      ...user,
      returnSecureToken: true,
    };

    return this.http
      .post(`${this.url}/verifyPassword?key=${apikey}`, authData)
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
      .post(`${this.url}/signupNewUser?key=${apikey}`, authData)
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

    let today = new Date();
    today.setSeconds(3600);

    localStorage.setItem("expires", today.getTime() + "");
  }

  loadToken() {
    if (localStorage.getItem("token")) {
      this.userToken = localStorage.getItem("token");
    } else {
      this.userToken = "";
    }

    return this.userToken;
  }

  isAuthenticated(): boolean {
    if (this.userToken.length !== 0) {
      return false;
    }

    const expires = Number(localStorage.getItem("expires"));
    const expiresDate = new Date();
    expiresDate.setTime(expires);

    if (expiresDate > new Date()) {
      return true;
    } else {
      return false;
    }
  }
}
