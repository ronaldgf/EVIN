import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,AlertController,App } from 'ionic-angular';
import {UbicacionGeografica} from "../../Entidades/UbicacionGeografica";
import {ComentarioObservaciones} from "../../Entidades/ComentarioObservaciones";
import {MenuFormulaPage} from '../menu-formula/menu-formula';
import { createConnection,getConnection } from 'ionic-orm/dist'
import {Jsons} from "../../Entidades/Jsons";
/**
 * Generated class for the ComentariosObservacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comentarios-observaciones',
  templateUrl: 'comentarios-observaciones.html',
})
export class ComentariosObservacionesPage {
  comentarioObservacion:string;
  ubicacion=new UbicacionGeografica();
  constructor(public tr:AlertController, public navCtrl: NavController, public navParams: NavParams,public platform:Platform,public app:App) {
    this.platform.ready().then(()=>{
      this.platform.registerBackButtonAction(()=>{
        let nav=this.app.getActiveNav();
 if(nav.canGoBack()) 
 {
  //  alert('asdas');
 }else{this.goBack();}
      });
    });
  }

  ionViewDidLoad() {
    this.ubicacion=this.navParams.data;
    this.llenaDatos();
    console.log('ionViewDidLoad ComentariosObservacionesPage');
  }
  llenaDatos()
  {
    console.log(this.ubicacion);
    if(this.ubicacion.comentarioObservacion!=undefined)
    {
      this.comentarioObservacion=this.ubicacion.comentarioObservacion.COMENTARIO;
    }
  }
  goBack()
  {
    this.navCtrl.setRoot(MenuFormulaPage,this.ubicacion);
  }
  doAlert(nombresdas) {
    
    
    let alert = this.tr.create({
      title: 'Error',
      
      message: nombresdas,
      buttons: [ {
        text: "Ok",
        role: 'cancel'
      }]
    });
    alert.present()
  }
async guardar()
{
  // console.log(this.comentarioObservacion);
  if(this.comentarioObservacion!=undefined && this.comentarioObservacion.trim()!="")
  {
    let comentario=new ComentarioObservaciones();
    comentario.COMENTARIO=this.comentarioObservacion;
    // comentario.ubicComentario=this.ubicacion;
    this.ubicacion.comentarioObservacion=comentario
    // console.log(this.comentarioObservacion);
    // console.log(this.ubicacion);
    let jsonoObj=new Jsons();
    let ubicaRepository =await getConnection('default').getRepository(Jsons);
    jsonoObj=await ubicaRepository.createQueryBuilder("ubic").where("ubic.id= :id",{id:this.ubicacion.idJson}).getSingleResult();
    jsonoObj.JSON=JSON.stringify(this.ubicacion);
    await ubicaRepository.persist(jsonoObj);
    this.navCtrl.setRoot(MenuFormulaPage,this.ubicacion);  
  }
  else{
    this.doAlert("Ingrese un Comentario u Observación");
  }
}
}
