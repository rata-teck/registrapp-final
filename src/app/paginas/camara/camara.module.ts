import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CamaraPageRoutingModule } from './camara-routing.module';

import { CamaraPage } from './camara.page';
import { QrCodeModule } from 'ng-qrcode';
//import {} from '@ionic-native/barcode-scanner/ngx';
import {PuenteService} from './../../servicios/puente.service';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CamaraPageRoutingModule,
    QrCodeModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [CamaraPage],
  providers:[PuenteService]
})
export class CamaraPageModule {}
