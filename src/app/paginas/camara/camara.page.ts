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

  public s1In = new FormControl(0, [Validators.required, Validators.min(0), Validators.max(255)]);
  public s2In = new FormControl(0, [Validators.required, Validators.min(0), Validators.max(255)]);
  public s3In = new FormControl(0, [Validators.required, Validators.min(0), Validators.max(255)]);
  public s4In = new FormControl(0, [Validators.required, Validators.min(0), Validators.max(255)]);
  public fechaIn = new FormControl(0, [Validators.required, Validators.min(1583031600)]); // 1583031600 == 1 de marzo de 2020 a medianoche
  public asignaturaIn = new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]);

  private urlOut : string = '';
  private fechaOut : number = 0;
  private asignaturaOut : string = '';

  private s1Out : number = 0;
  private s2Out : number = 0;
  private s3Out : number = 0;
  private s4Out : number = 0;
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

    if(this.s1In.value === null){
      this.s1Out = 0;
    }
    else{
      this.s1Out = this.s1In.value;
    }

    if (this.s2In.value ===  null){
      this.s2Out = 0;
    }
    else{
      this.s2Out = this.s2In.value;
    }

    if(this.s3In.value === null){
      this.s3Out = 0;
    }
    else{
      this.s3Out = this.s3In.value;
    }

    if(this.s4In.value === null){
      this.s4Out = 0;
    }
    else{
      this.s4Out = this.s4In.value;
    }

    // Dejalo pensar un segundo
    delay(1000);

    // Escritura de datos
    this.urlOut = 'https://'+this.s1Out.toString()+'.'+this.s2Out.toString()+'.'+this.s3Out.toString()+'.'+this.s4Out.toString()+':4200/api';
    this.datos.qrData.url = this.urlOut;
    this.datos.qrData.fecha = this.fechaOut;
    this.datos.qrData.asignatura = this.asignaturaOut;

    // Ahora preguntemos al usuario quién es
    this.ruta.navigateByUrl('/bbb/'+this.s1Out.toString()+'/'+this.s2Out.toString()+'/'+this.s3Out.toString()+'/'+this.s4Out.toString()+'/'+this.datos.qrData.fecha.toString()+'/'+this.datos.qrData.asignatura);
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
      if(result.content !== undefined){
        this.data = JSON.parse(result.content);
        this.datos.qrData.url = 'http://'+this.data.s1+'.'+this.data.s2+'.'+this.data.s3+'.'+this.data.s4+':4200/api';
        this.datos.qrData.fecha = this.data.fecha;
        this.datos.qrData.asignatura = this.data.asignatura;
        this.ruta.navigateByUrl('/bbb/'+this.data.s1+'/'+this.data.s2+'/'+this.data.s3+'/'+this.data.s4+'/'+this.data.fecha+'/'+this.data.asignatura);
      }
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
