type Asistencia = {
  asignatura : string,
  estado : 'Presente' | 'Ausente' | 'Justificado',
  fecha : number
}

export interface Alumno {
  nombre : string,
  apellido : string,
  id : string, //email
  clave : string
  edad : number,
  genero : 'Masculino'|'Femenino',
  carrera : string,
  asistencias : Array<Asistencia>
}
