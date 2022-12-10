import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {PuenteService} from './../../servicios/puente.service';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.page.html',
  styleUrls: ['./confirmar.page.scss'],
})
export class ConfirmarPage {

  constructor(
    public datos : PuenteService,
    private ruta : Router
  ) { }

  public listo() : void{
    this.datos.registrarAsistencia();
    this.ruta.navigateByUrl('/exito');
  }

}
