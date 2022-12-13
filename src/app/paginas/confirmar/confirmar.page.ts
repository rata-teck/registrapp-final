import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { delay } from 'rxjs';
import {PuenteService} from './../../servicios/puente.service';
@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.page.html',
  styleUrls: ['./confirmar.page.scss'],
})
export class ConfirmarPage implements OnInit {

  constructor(
    public datos : PuenteService,
    private rutas : Router,
    private ruta : ActivatedRoute
  ) { }

  ngOnInit(): void {
    const s1 = this.ruta.snapshot.params['s1'];
    const s2 = this.ruta.snapshot.params['s2'];
    const s3 = this.ruta.snapshot.params['s3'];
    const s4 = this.ruta.snapshot.params['s4'];
    const fecha1 = this.ruta.snapshot.params["fecha"];
    const asignatura1 = this.ruta.snapshot.params["asignatura"];
    const alumno1 = this.ruta.snapshot.params["alumno"];

    const url1 : string = 'https://'+s1+'.'+s2+'.'+s3+'.'+s4+':4200/api';

    this.datos.qrData = {url: url1, fecha: fecha1, asignatura: asignatura1}
    delay(200);
    this.datos.comprobarSesion(alumno1);
  }

  public listo() : void{
    this.datos.registrarAsistencia();
    this.rutas.navigateByUrl('/exito');
  }

}
