import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../shared/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.form = this.fb.group({
      login: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
  }
  public getReferences(nameField: string): AbstractControl {
    return this.form.controls[nameField]
  }

  public async submit(): Promise<void> {
    if (this.form.invalid) {
      alert('Preencha os dados corretamente!')
      return;
    }
    let bodyData = {
      login: this.form.value.login,
      senha: this.form.value.password
    }
    try {
      await this.authenticationService.login(bodyData)

    } catch (error: any) {
      const errorMessage = error?.error?.error || 'Erro ao realizar o login'
      alert(errorMessage)
    }
  }




}
