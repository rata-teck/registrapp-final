import { Injectable } from '@angular/core';
import {Alumno} from './../modelos/alumno';
import {Asignatura} from './../modelos/asignatura';
import {HttpClient} from '@angular/common/http';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuenteService {

  constructor(private cliente : HttpClient) { }

  public alumno : Alumno = {
    nombre : '',
    apellido : '',
    id : '',
    clave : '',
    edad : 0,
    genero : 'Masculino',
    carrera : '',
    asistencias : []
  }

  public asignatura : Asignatura = {
    nombre : '',
    sigla : '',
    seccion : '',
    alumnos : [],
    id : ''
  }

  public qrData = {
    "url" : "",
    "fecha" : 0,
    "asignatura" : ""
  }

  public iniciarSesion(correo : string, clave : string) : void{
    this.cliente.get<Alumno>(this.qrData.url + '/alumnos/'+correo).subscribe(data => {
      if(data.clave == clave){
        this.alumno = {...data}
      }
    });
    this.buscarAsignatura();
  }

  public buscarAsignatura() : void{
    this.cliente.get<Asignatura>(this.qrData.url+'/asignaturas/'+this.qrData.asignatura).subscribe(data => {
      for(let x of data.alumnos){
        if(this.alumno.id == x){
          this.asignatura = {...data}
        }
      }
    });
  }

  public registrarAsistencia():void{
    this.alumno.asistencias.push({asignatura : this.asignatura.id, estado : 'Presente', fecha : this.qrData.fecha});
    delay(200);
    this.cliente.put(this.qrData.url+'/alumnos/'+this.alumno.id, {...this.alumno}, {headers:{'Content-Type':'application/json; charset=utf-8'}}).subscribe(data => {
      console.log(this.alumno.apellido+' presente');
    });
  }
}
