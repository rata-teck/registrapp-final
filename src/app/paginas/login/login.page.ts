import { Component, OnInit } from '@angular/core';
import {FormControl, Validators } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {PuenteService} from './../../servicios/puente.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{
  public usuarioIn = new FormControl('', [Validators.required]);
  public claveIn = new FormControl('', Validators.required);

  private usuarioOut : string = '';
  private claveOut : string = '';

  constructor(
    private datos : PuenteService,
    private rutas : Router,
    private ruta : ActivatedRoute
  ) {}

  ngOnInit(): void {
    const fecha1 = this.ruta.snapshot.params["fecha"];
    const a1 = this.ruta.snapshot.params["asignatura"];

    this.datos.qrData = {fecha: fecha1, asignatura : a1}
  }

  public iniciarSesion() : void{
    // Parseo de nulos
    if(this.usuarioIn.value === null){
      this.usuarioOut = '';
    }
    else{
      this.usuarioOut = this.usuarioIn.value;
    }

    if(this.claveIn.value == null){
      this.claveOut = '';
    }
    else{
      this.claveOut = this.claveIn.value;
    }

    // Vamo a probarlo
    this.datos.iniciarSesion(this.usuarioOut, this.claveOut);
    if(this.datos.alumno.id == this.usuarioOut){
      this.rutas.navigateByUrl('/ccc/'+this.datos.qrData.fecha.toString()+'/'+this.datos.qrData.asignatura+'/'+this.usuarioOut);
    }
  }
}
