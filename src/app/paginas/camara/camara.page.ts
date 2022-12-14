import { Component} from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import {PuenteService} from './../../servicios/puente.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage{

  scannedResult:any;
  content_visibility='';

  data : any;


  public fechaIn = new FormControl(0, [Validators.required, Validators.min(1583031600)]); // 1583031600 == 1 de marzo de 2020 a medianoche
  public asignaturaIn = new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]);


  private fechaOut : number = 0;
  private asignaturaOut : string = '';


  constructor(
    public datos : PuenteService,
    public fb : FormBuilder,
    private ruta : Router
  ) { }


  public accesoManual() : void{
    // Parseo de nulos (NO ES UNA PROTECCIÓN, las protecciones están como validaciones de entrada)
    if(this.fechaIn.value === null){
      this.fechaOut = 0;
    }
    else{
      this.fechaOut = this.fechaIn.value;
    }

    if(this.asignaturaIn.value === null){
      this.asignaturaOut = '';
    }
    else{
      this.asignaturaOut = this.asignaturaIn.value;
    }

    // Dejalo pensar un segundo
    delay(1000);

    // Escritura de datos
    this.datos.qrData.fecha = this.fechaOut;
    this.datos.qrData.asignatura = this.asignaturaOut;

    // Ahora preguntemos al usuario quién es
    this.ruta.navigateByUrl('/bbb/'+this.datos.qrData.fecha.toString()+'/'+this.datos.qrData.asignatura);
  }


  checkPermission = async () => {
    // check or request permission
    const status = await BarcodeScanner.checkPermission({ force: true });

    if (status.granted) {
      // the user granted permission
      return true;
    }

    return false;
  };
  startScan = async () => {
    await BarcodeScanner.checkPermission({ force: true });
    BarcodeScanner.hideBackground();
    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

    if (result.hasContent) {
      console.log(result.content); // log the raw scanned content
      if(result.content !== undefined){

        this.data = JSON.parse(result.content);
        this.datos.qrData.fecha = this.data.fecha;
        this.datos.qrData.asignatura = this.data.asignatura;
        console.log('fecha: '+this.data.fecha+', asignatura: '+this.data.asignatura);
        delay(1000);
        this.ruta.navigateByUrl('/bbb/'+this.datos.qrData.fecha.toString()+'/'+this.datos.qrData.asignatura);
      }
    }
  };

  stopScan(){

    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.remove('scanner-active');
    this.content_visibility='';
  }
  ngOnDestroy(): void {
    this.stopScan();
  }

}
