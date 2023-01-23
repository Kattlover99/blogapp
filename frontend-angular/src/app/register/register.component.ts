import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../shared/authentication/authentication.service';
import { confirmPassword } from '../shared/validators/confirmPassword.validator';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private registerService: RegisterService) {
    this.form = this.fb.group({
      file: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, confirmPassword()]]
    })
  }

  public getReferences(nameField: string): AbstractControl {
    return this.form.controls[nameField]
  }

  public async handleSubmit() {
    if (this.form.invalid) {
      alert('Preencha todos os campos corretamente');
      return;
    }

    try {
      const formValues = this.form.value;
      let requisitonBody = formValues;

      if (formValues.file) {
        requisitonBody = new FormData();
        requisitonBody.append('file', formValues.file);
        requisitonBody.append('nome', formValues.name);
        requisitonBody.append('email', formValues.email);
        requisitonBody.append('senha', formValues.password);

      } else {
        requisitonBody = new FormData();
        requisitonBody.append('file', null);
        requisitonBody.append('nome', formValues.name);
        requisitonBody.append('email', formValues.email);
        requisitonBody.append('senha', formValues.password);
      }
      await this.registerService.register(requisitonBody);
      // TODO login
      await this.authenticationService.login({
        login: formValues.email,
        senha: formValues.password
      })
      alert('Cadastro realizado com sucesso!')
    } catch (error: any) {
      const errorMessage: any = error?.error?.error || 'Erro ao relizar o Cadastro'
      alert(errorMessage)

    }
  }
}
