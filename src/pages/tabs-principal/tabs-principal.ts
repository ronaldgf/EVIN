import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormulariosListPage } from '../formularios-list/formularios-list';
import { ConfiguracionPage } from '../configuracion/configuracion';
/**
 * Generated class for the TabsPrincipalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs-principal',
  templateUrl: 'tabs-principal.html',
})
export class TabsPrincipalPage {

  tab1=FormulariosListPage;
  tab2=ConfiguracionPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPrincipalPage');
  }

}
