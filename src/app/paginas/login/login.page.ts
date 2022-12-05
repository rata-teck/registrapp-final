import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formL : FormGroup;


  constructor(public fb:FormBuilder) {
    this.formL=this.fb.group({
      correo: new FormControl("",Validators.required),
      contraseña: new FormControl("",Validators.required)
    })

   }

  ngOnInit() {
  }

}
