import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import Swal from "sweetalert2";
import { UserModel } from "../../models/user.model";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  user: UserModel;
  remember = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = new UserModel();
    if (localStorage.getItem("email")) {
      this.user.email = localStorage.getItem("email");
      this.remember = true;
    }
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: "info",
      text: "Please wait...",
    });

    Swal.showLoading();

    this.auth.login(this.user).subscribe(
      (response) => {
        console.log(response);
        Swal.close();

        if (this.remember) {
          localStorage.setItem("email", this.user.email);
        }

        this.router.navigateByUrl("/home");
      },
      (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          title: "Authentication error",
          icon: "error",
          text: err.error.error.message,
        });
      }
    );
  }
}
