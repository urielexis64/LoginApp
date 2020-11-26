import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { UserModel } from "../../models/user.model";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"],
})
export class RegistroComponent implements OnInit {
  user: UserModel;
  remember = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = new UserModel();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: "info",
      text: "Please wait...",
    });
    Swal.showLoading();

    this.auth.newUser(this.user).subscribe(
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
