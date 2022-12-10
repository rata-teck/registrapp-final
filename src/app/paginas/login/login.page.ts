import { Component } from '@angular/core';
import {FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { delay } from 'rxjs';
import {PuenteService} from './../../servicios/puente.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{
  public correoIn = new FormControl('', [Validators.required, Validators.email]);
  public claveIn = new FormControl('', Validators.required);

  private correoOut : string = '';
  private claveOut : string = '';

  constructor(
    private datos : PuenteService,
    private ruta : Router
  ) {}

  public iniciarSesion() : void{
    // Parseo de nulos
    if(this.correoIn.value === null){
      this.correoOut = '';
    }
    else{
      this.correoOut = this.correoIn.value;
    }

    if(this.claveIn.value == null){
      this.claveOut = '';
    }
    else{
      this.claveOut = this.claveIn.value;
    }

    // Dejalo pensar un segundo
    delay(1000);

    // Vamo a probarlo
    this.datos.iniciarSesion(this.correoOut, this.claveOut);
  }
}
