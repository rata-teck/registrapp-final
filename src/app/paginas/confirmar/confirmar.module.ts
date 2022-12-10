import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmarPageRoutingModule } from './confirmar-routing.module';

import { ConfirmarPage } from './confirmar.page';
import {HttpClientModule} from '@angular/common/http';
import {PuenteService} from './../../servicios/puente.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmarPageRoutingModule
  ],
  declarations: [ConfirmarPage],
  providers: [PuenteService]
})
export class ConfirmarPageModule {}
