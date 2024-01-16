import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  errorMessage: string = "";
  fieldTextType: boolean|undefined;
  Form: FormGroup;
  successMessage!: string;
  isLoading: boolean = false;
  isLoggedIn :boolean = false;

  constructor( private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.Form = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }
  
  onSubmit() {
    this.isLoading = true;
    // const username = this.Form.value.username;
    // const password = this.Form.value.password;
    this.router.navigate(["/dashboard"])
console.log("I have been redirected")
  }
  ngOnDestroy() { }

  ToggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
