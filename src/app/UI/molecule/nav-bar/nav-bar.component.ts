import { Component } from "@angular/core";
import { removeUserCredentials } from "../../../utils/credentials";
import { Router } from "@angular/router";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"],
})
export class NavBarComponent {
  constructor(private router: Router) {}

  logoutUser() {
    removeUserCredentials();
    this.router.navigate(["login"]);
  }
  protected readonly removeUserCredentials = removeUserCredentials;
}
