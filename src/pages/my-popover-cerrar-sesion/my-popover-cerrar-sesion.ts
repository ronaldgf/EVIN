import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Usuarios} from "../../Entidades/Usuarios";
import { createConnection,getConnection,ConnectionManager,Connection } from 'ionic-orm/dist'
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';
/**
 * Generated class for the MyPopoverCerrarSesionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-popover-cerrar-sesion',
  templateUrl: 'my-popover-cerrar-sesion.html',
})
export class MyPopoverCerrarSesionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPopoverCerrarSesionPage');
  }
 async CerrarSesion()
  {
    let usuarioRepository =await getConnection('default').getRepository(Usuarios);
    let usuarioLogin =new Usuarios();
    usuarioLogin=await usuarioRepository.createQueryBuilder("usuario").where("usuario.ESTADOLOGUEO= :user",{user:true}).getSingleResult();
    usuarioLogin.ESTADOLOGUEO=false;
    await usuarioRepository.persist(usuarioLogin);
   await this.navCtrl.setRoot(LoginPage);
  }
}
