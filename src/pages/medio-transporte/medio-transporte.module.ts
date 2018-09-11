import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedioTransportePage } from './medio-transporte';

@NgModule({
  declarations: [
    MedioTransportePage,
  ],
  imports: [
    IonicPageModule.forChild(MedioTransportePage),
  ],
})
export class MedioTransportePageModule {}
