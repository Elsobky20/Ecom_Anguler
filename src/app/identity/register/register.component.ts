import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IdentityService } from '../identiyy.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
fromGroup :FormGroup
constructor(private fb:FormBuilder ,
    private toast:ToastrService,
    private _service:IdentityService,
    private route:Router) {}
  ngOnInit(): void {
    this.formValidation()
  }
  
  formValidation() {
    this.fromGroup = this.fb.group({
      UserName: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      DisplayName: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
        /^(?=.*[0-9])(?=.*[#$@!.\-])[A-Za-z\d#$@!.\-]{8,}$/
          ),
        ],
      ],
    });
  }
  get _username() {
    return this.fromGroup.get('UserName');
  }
  get _email() {
    return this.fromGroup.get('email');
  }
  get _DisplayName() {
    return this.fromGroup.get('DisplayName');
  }
  get _password() {
    return this.fromGroup.get('password');
  }
  Submit(){
    if(this.fromGroup.valid){
      this._service.register(this.fromGroup.value).subscribe({
        next:(value) =>{
          console.log(value);
          this.toast.success("Register success , please confierm your email",'success'.toUpperCase())
          this.route.navigateByUrl('/Account/Login')
        },
        error:(err:any)=> {
          console.log(err);
          this.toast.error(err.error.message,'error'.toUpperCase())

        },
      })
    }
  }
}
