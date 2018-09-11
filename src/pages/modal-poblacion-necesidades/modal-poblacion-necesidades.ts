import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController,Platform,App } from 'ionic-angular';
import {PoblacionNecesidadesEspeForm} from "../../Entidades/PoblacionNecesidadesEspeForm";
import {PoblacionNecesidadesEspCat} from "../../Entidades/PoblacionNecesidadesEspeCat";
import {DetallePoblacionNeceEspe} from "../../Entidades/DetallePoblacionNeceEspe";
/**
 * Generated class for the ModalPoblacionNecesidadesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-poblacion-necesidades',
  templateUrl: 'modal-poblacion-necesidades.html',
})
export class ModalPoblacionNecesidadesPage {

  title:string;
  poblacionCat =new PoblacionNecesidadesEspCat();
  poblacionEspeform =new PoblacionNecesidadesEspeForm();
  detalleNeceEspe=new DetallePoblacionNeceEspe();
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewctr : ViewController,public tr:AlertController ,public platform:Platform,public app:App ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPoblacionNecesidadesPage');
    this.poblacionCat=this.navParams.get("poblacionCat");
    this.poblacionEspeform=this.navParams.get("pobForm");
    this.title=this.poblacionCat.NOMBRE;
    this.platform.ready().then(()=>{
      this.platform.registerBackButtonAction(()=>{
        let nav=this.app.getActiveNav();
 if(nav.canGoBack())
 {
  //  alert('asdas');
 }else{this.viewctr.dismiss(null);}
      });
    });
    if (this.poblacionEspeform.detalleNeceEspe!=undefined)
    {
      this.detalleNeceEspe=this.poblacionEspeform.detalleNeceEspe;
    }
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
  agregar()
  {
    console.log("act",this.poblacionCat);
    if(this.poblacionCat.ACTIVACATPRINCIPALES==true)
    {
       if (this.detalleNeceEspe.TOTAL>0 )
      {
        this.detalleNeceEspe.ETNIA="";
        // this.detalleNeceEspe.poblacionNeceEsp=this.poblacionEspeform;
        this.poblacionEspeform.detalleNeceEspe=this.detalleNeceEspe;
        console.log(this.poblacionEspeform,this.detalleNeceEspe);
        this.viewctr.dismiss(this.poblacionEspeform);
      }
      else{
          this.doAlert("Debe registrar "+ this.title.substring(0,this.title.length-1));
        }
  }else{
      if(this.detalleNeceEspe.ETNIA!=undefined && this.detalleNeceEspe.ETNIA!='')
      {
        // this.detalleNeceEspe.poblacionNeceEsp=this.poblacionEspeform;
        this.poblacionEspeform.detalleNeceEspe=this.detalleNeceEspe;
        this.detalleNeceEspe.HOMBRES=0;
        this.detalleNeceEspe.MUJERES=0;
        this.detalleNeceEspe.TOTAL=0;
        console.log(this.poblacionEspeform,this.detalleNeceEspe);
        this.viewctr.dismiss(this.poblacionEspeform);
      }
      else{
        this.doAlert(this.title);
      }
  }
  }
  sumar()
  {
    if(this.detalleNeceEspe.HOMBRES==undefined || this.detalleNeceEspe.HOMBRES.valueOf().toString()=='')
    {
      this.detalleNeceEspe.HOMBRES=0;
    }
    if(this.detalleNeceEspe.MUJERES==undefined || this.detalleNeceEspe.MUJERES.valueOf().toString()=='')
    {
      this.detalleNeceEspe.MUJERES=0;
    }
   
    this.detalleNeceEspe.TOTAL=parseInt( this.detalleNeceEspe.HOMBRES.valueOf().toString()) +parseInt( this.detalleNeceEspe.MUJERES.valueOf().toString());
    // let s = this.detallepob.HOMBRES.valueOf() + this.detallepob.MUJERES.valueOf() +this.detallepob.NINIAS.valueOf() + this.detallepob.NINIOS.valueOf();
    // console.log(this.detallepob.HOMBRES.valueOf() + this.detallepob.MUJERES.valueOf() +this.detallepob.NINIAS.valueOf() + this.detallepob.NINIOS.valueOf());
  }
}
