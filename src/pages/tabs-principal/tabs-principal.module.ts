import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPrincipalPage } from './tabs-principal';

@NgModule({
  declarations: [
    TabsPrincipalPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsPrincipalPage),
  ],
})
export class TabsPrincipalPageModule {}
