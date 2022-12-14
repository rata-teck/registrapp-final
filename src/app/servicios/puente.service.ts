import { Injectable } from '@angular/core';
import {Alumno, Asistencia} from './../modelos/alumno';
import {Asignatura} from './../modelos/asignatura';
import {AngularFirestore} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PuenteService {

  constructor(private db : AngularFirestore) { }

  public alumno : Alumno = {
    nombre : '',
    apellido : '',
    id : '',
    clave : '',
    edad : 0,
    genero : 'Masculino',
    carrera : ''
  }

  public asignatura : Asignatura = {
    nombre : '',
    sigla : '',
    seccion : '',
    alumnos : [],
    id : ''
  }

  public qrData = {
    fecha : 0,
    asignatura : ""
  }

  public asistencia : Asistencia = {
    alumno : '',
    asignatura : '',
    estado : 'Ausente',
    fecha : 0
  }

  public iniciarSesion(id : string, clave : string) : void{
    this.db.doc<Alumno>('alumnos/'+id).get().subscribe(data => {
      const d2 = data.data();
      if(d2 !== undefined){
        if(d2.clave == clave){
          this.alumno = d2;
          this.alumno.id = data.id;
        }
      }
    });
    this.buscarAsignatura();
  }

  public comprobarSesion(id : string) : void{
    this.db.doc<Alumno>('alumnos/'+ id).get().subscribe(data => {
      const d2 = data.data();
      if(d2 !== undefined){
        this.alumno = d2;
        this.alumno.id = data.id;
      }
    })
    this.buscarAsignatura();
  }

  public buscarAsignatura() : void{
    this.db.doc<Asignatura>('asignaturas/'+this.qrData.asignatura).get().subscribe(data => {
      const d2 = data.data();
      if(d2 !== undefined){
        for(let x of d2.alumnos){
          if(x == this.alumno.id){
            this.asignatura = d2;
            this.asignatura.id = data.id;
          }
        }
      }
    });
  }

  public registrarAsistencia():void{
    this.asistencia = {
      alumno : this.alumno.id,
      asignatura : this.asignatura.id,
      estado : 'Presente',
      fecha : this.qrData.fecha
    }
    this.db.collection('asistencias').add({...this.asistencia});
  }
}
