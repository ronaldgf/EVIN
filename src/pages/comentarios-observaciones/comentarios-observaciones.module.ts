import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComentariosObservacionesPage } from './comentarios-observaciones';

@NgModule({
  declarations: [
    ComentariosObservacionesPage,
  ],
  imports: [
    IonicPageModule.forChild(ComentariosObservacionesPage),
  ],
})
export class ComentariosObservacionesPageModule {}
