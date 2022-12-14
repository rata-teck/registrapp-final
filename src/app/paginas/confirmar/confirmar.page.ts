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
    const fecha1 = this.ruta.snapshot.params["fecha"];
    const asignatura1 = this.ruta.snapshot.params["asignatura"];
    const alumno1 = this.ruta.snapshot.params["alumno"];

    this.datos.qrData = {fecha: fecha1, asignatura: asignatura1}
    this.datos.comprobarSesion(alumno1);
  }

  public listo() : void{
    this.datos.registrarAsistencia();
    this.rutas.navigateByUrl('/ddd');
  }

}
