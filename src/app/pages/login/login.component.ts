import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserModel } from "../../models/user.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  user: UserModel;

  constructor() {}

  ngOnInit() {
    this.user = new UserModel();
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(this.user);
    console.log(form);
  }
}
