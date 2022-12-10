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

  public urlIn = new FormControl('', [Validators.required, Validators.minLength(27), Validators.maxLength(32)]);
  public fechaIn = new FormControl(0, [Validators.required, Validators.min(1583031600)]); // 1583031600 == 1 de marzo de 2020 a medianoche
  public asignaturaIn = new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]);

  private urlOut : string = '';
  private fechaOut : number = 0;
  private asignaturaOut : string = '';
  constructor(
    public datos : PuenteService,
    public fb : FormBuilder,
    private ruta : Router
  ) { }


  public accesoManual() : void{
    // Parseo de nulos (NO ES UNA PROTECCIÓN, las protecciones están como validaciones de entrada)
    if(this.urlIn.value === null){
      this.urlOut = ''
    }
    else{
      this.urlOut = this.urlIn.value;
    }

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
    this.datos.qrData.url = this.urlOut;
    this.datos.qrData.fecha = this.fechaOut;
    this.datos.qrData.asignatura = this.asignaturaOut;

    // Ahora preguntemos al usuario quién es
    this.ruta.navigateByUrl('/login');
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
  /*async checkPermission(){
    try{
      const status = await BarcodeScanner.checkPermission({force:true});
      if(status.granted){
        return true;
      }
      return false;
    }catch(e){
      console.log(e);
    }
  }*/

  startScan = async () => {
    // Check camera permission
    // This is just a simple example, check out the better checks below
    await BarcodeScanner.checkPermission({ force: true });

    // make background of WebView transparent
    // note: if you are using ionic this might not be enough, check below
    BarcodeScanner.hideBackground();

    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

    // if the result has content
    if (result.hasContent) {
      console.log(result.content); // log the raw scanned content
    }
  };
  /*async startScan(){
    try{
      const permission=await this.checkPermission();
      if(!permission){
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body')?.classList.add('scanner-active');
      this.content_visibility='hidden';
      const result=await BarcodeScanner.startScan();
      console.log(result);

      BarcodeScanner.showBackground();
      document.querySelector('body')?.classList.remove('scanner-active');
      this.content_visibility='';
      if(result?.hasContent){
        this.scannedResult=result.content;

        console.log(this.scannedResult);
      }
    }catch(e){
      console.log(e);
      this.stopScan();
    }
  }*/

  stopScan(){

    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.remove('scanner-active');
    this.content_visibility='';
  }
  /*
  stopScan = () => {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  };*/

  ngOnDestroy(): void {
    this.stopScan();
  }

}
