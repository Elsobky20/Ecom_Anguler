import { Component, OnInit } from '@angular/core';
import { ResetPassword } from '../../shared/Models/ResetPassowrd';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validate } from 'uuid';
import { IdentityService } from '../identiyy.service';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {

  ResetValue = new ResetPassword()
  formGroup: FormGroup
  constructor(
    private router: ActivatedRoute,
    private fb: FormBuilder ,
    private _service: IdentityService ,
    private route:Router
  ) { }
  ngOnInit(): void {
    this.router.queryParams.subscribe((param) => {

      this.ResetValue.email = param['email'];
      this.ResetValue.token = param['code'];
      console.log(this.ResetValue);
    });
    this.formValidation()
  }
  formValidation() {
    this.formGroup = this.fb.group({
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[#$@!.\-])[A-Za-z\d#$@!.\-]{8,}$/)]],
      confirmPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[#$@!.\-])[A-Za-z\d#$@!.\-]{8,}$/)]],
    },
    {valedator:this.PasswordMatchValidation}
);
  }
  get _password() {
    return this.formGroup.get('password');
  }
  get _confirmPassword() {
    return this.formGroup.get('confirmPassword');
  }
  PasswordMatchValidation(form: FormGroup) {
    const passwordControl = form.get('password'); 
    const confirmPasswordControl = form.get('confirmPassword');
    if (passwordControl?.value === confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors(null);
    } else {
      confirmPasswordControl?.setErrors({ passwordMisMatch: true });
    }
  }
   Submit(){
    if(this.formGroup.valid){
      this.ResetValue.password=this.formGroup.value.password
      this._service.ResetPassword(this.ResetValue).subscribe({
        next:()=>{
            this.route.navigateByUrl('/Account/Login')
        },error(err) {
          console.log();
          
        },
      })
    }
  }
}