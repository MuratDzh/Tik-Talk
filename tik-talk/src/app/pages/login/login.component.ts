import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import {  Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthService, Router]
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router){}

  form: FormGroup = new FormGroup({
    username: new FormControl('MuratDzh', Validators.required),
    password: new FormControl('oyg2fWZm6x', Validators.required),
  });

  

  onSubmint() {
    
    if (this.form.valid) {
      
      //@ts-ignore
      this.authService.login(this.form.value).subscribe(v=>this.router.navigate(['']));
      
    }
    // this.form.reset();
  }

  gf(){
    this.router.navigate([''])
  }
}
