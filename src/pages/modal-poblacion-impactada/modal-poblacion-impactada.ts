import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController,Platform,App  } from 'ionic-angular';
import {PoblacionImpactadaForm} from "../../Entidades/PoblacionImpactadaForm";
import {PoblacionImpactada} from "../../Entidades/PoblacionImpactada";
import {DetallePobImpactada} from "../../Entidades/DetallePobImpactada";
/**
 * Generated class for the ModalPoblacionImpactadaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-poblacion-impactada',
  templateUrl: 'modal-poblacion-impactada.html',
})
export class ModalPoblacionImpactadaPage {
  
  title:string;
  poblacion =new PoblacionImpactada();
  poblacionform =new PoblacionImpactadaForm();
  detallepob=new DetallePobImpactada();
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewctr : ViewController,public tr:AlertController,public platform:Platform,public app:App ) {
  }
inicializarDetall()
{
  
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPoblacionImpactadaPage');
    console.log(this.navParams);
    
    this.poblacion=this.navParams.get("poblacion");
     this.poblacionform=this.navParams.get("pobForm");
     this.title=this.poblacion.NOMBRE;
     this.platform.ready().then(()=>{
      this.platform.registerBackButtonAction(()=>{
        let nav=this.app.getActiveNav();
 if(nav.canGoBack())
 {
  //  alert('asdas');
 }else{this.viewctr.dismiss(null);}
      });
    });
     if (this.poblacionform.detalle!=undefined)
     {
       this.detallepob=this.poblacionform.detalle;
     }
    //  this.poblacionform.IDTIPO=this.poblacion.ID;
    //  console.log(this.poblacionform,this.poblacion);
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
   if (this.detallepob.TOTAL>0)
   {
  // this.detallepob.poblacionImpac=this.poblacionform;
  this.poblacionform.detalle=this.detallepob;
  console.log(this.poblacionform,this.detallepob);
   this.viewctr.dismiss(this.poblacionform);
  }else{
    this.doAlert("Debe registrar al menos un "+ this.title.substring(0,this.title.length-1));
  }
}
keyup(ev)
{
  
  // console.log(this.detallepob.HOMBRES.valueOf());
  // if(this.detallepob.HOMBRES==undefined || this.detallepob.HOMBRES.valueOf().toString()=='')
  // {
  //   this.detallepob.HOMBRES=0;
  // }
  // if(this.detallepob.MUJERES==undefined || this.detallepob.MUJERES.valueOf().toString()=='')
  // {
  //   this.detallepob.MUJERES=0;
  // }
  // if(this.detallepob.NINIAS==undefined || this.detallepob.NINIAS.valueOf().toString()=='')
  // {
  //   this.detallepob.NINIAS=0;
  // }
  // if(this.detallepob.NINIOS==undefined || this.detallepob.NINIOS.valueOf().toString()=='')
  // {
  //   this.detallepob.NINIOS=0;
  // }
  // this.detallepob.TOTAL=parseInt( this.detallepob.HOMBRES.valueOf().toString()) +parseInt( this.detallepob.MUJERES.valueOf().toString()) + parseInt(this.detallepob.NINIAS.valueOf().toString()) + parseInt(this.detallepob.NINIOS.valueOf().toString());
}
sumar()
{
  if(this.detallepob.HOMBRES==undefined || this.detallepob.HOMBRES.valueOf().toString()=='')
  {
    this.detallepob.HOMBRES=0;
  }
  if(this.detallepob.MUJERES==undefined || this.detallepob.MUJERES.valueOf().toString()=='')
  {
    this.detallepob.MUJERES=0;
  }
  if(this.detallepob.NINIAS==undefined || this.detallepob.NINIAS.valueOf().toString()=='')
  {
    this.detallepob.NINIAS=0;
  }
  if(this.detallepob.NINIOS==undefined || this.detallepob.NINIOS.valueOf().toString()=='')
  {
    this.detallepob.NINIOS=0;
  }
  this.detallepob.TOTAL=parseInt( this.detallepob.HOMBRES.valueOf().toString()) +parseInt( this.detallepob.MUJERES.valueOf().toString()) + parseInt(this.detallepob.NINIAS.valueOf().toString()) + parseInt(this.detallepob.NINIOS.valueOf().toString());
  // let s = this.detallepob.HOMBRES.valueOf() + this.detallepob.MUJERES.valueOf() +this.detallepob.NINIAS.valueOf() + this.detallepob.NINIOS.valueOf();
  // console.log(this.detallepob.HOMBRES.valueOf() + this.detallepob.MUJERES.valueOf() +this.detallepob.NINIAS.valueOf() + this.detallepob.NINIOS.valueOf());
}
}
