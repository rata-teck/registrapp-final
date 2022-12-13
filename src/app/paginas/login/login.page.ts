import { Component, OnInit } from '@angular/core';
import {FormControl, Validators } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import { delay } from 'rxjs';
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

  private s1 : number = 0;
  private s2 : number = 0;
  private s3 : number = 0;
  private s4 : number = 0;

  constructor(
    private datos : PuenteService,
    private rutas : Router,
    private ruta : ActivatedRoute
  ) {}

  ngOnInit(): void {
    const fecha1 = this.ruta.snapshot.params["fecha"];
    const a1 = this.ruta.snapshot.params["asignatura"];

    this.s1 = this.ruta.snapshot.params['s1'];
    this.s2 = this.ruta.snapshot.params['s2'];
    this.s3 = this.ruta.snapshot.params['s3'];
    this.s4 = this.ruta.snapshot.params['s4'];

    const url = 'https://'+this.s1.toString()+'.'+this.s2.toString()+'.'+this.s3.toString()+'.'+this.s4.toString()+':4200/api';
    this.datos.qrData = {url: url, fecha: fecha1, asignatura : a1}
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
      this.rutas.navigateByUrl('/ccc/'+this.s1.toString()+'/'+this.s2.toString()+'/'+this.s3.toString()+'/'+this.s4.toString()+'/'+this.datos.qrData.fecha.toString()+'/'+this.datos.qrData.asignatura+'/'+this.usuarioOut);
    }
  }
}
