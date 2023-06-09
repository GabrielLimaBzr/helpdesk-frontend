import { Router } from "@angular/router";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { Credenciais } from "./../../models/credenciais";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  hide = true;

  creds: Credenciais = {
    email: "",
    senha: "",
  };

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(
    private toast: ToastrService,
    private service: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  logar() {
    this.service.autenticar(this.creds).subscribe(
      (resposta) => {
        this.service.successfulLogin(
          resposta.headers.get("Authorization").substring(7)
        );
        this.toast.success("Login Realizado com sucesso", "Login");
        setTimeout(() => {
          this.router.navigate(["/home"]);
        }, 3000);
      },
      () => {
        this.toast.error("Usuário e/ou senha inválidos");
      }
    );
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid;
  }
}
