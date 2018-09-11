import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController,Platform,App } from 'ionic-angular';
import {MediosDeVidaCat} from "../../Entidades/MediosDeVidaCat";
import {DetalleMediosVida} from "../../Entidades/DetalleMediosVida";
import {MediosdeVidaForm} from "../../Entidades/MediosdeVidaForm";
/**
 * Generated class for the ModalDetalleMediosvidaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
@IonicPage()
@Component({
  selector: 'page-modal-detalle-mediosvida',
  templateUrl: 'modal-detalle-mediosvida.html',
})
export class ModalDetalleMediosvidaPage {
danios=[{value:0,NOMBRE:"Sin Daño",ESTADOSEL:false},{value:1,NOMBRE:"Daño Parcial",ESTADOSEL:false},{value:2,NOMBRE:"Daño Total",ESTADOSEL:false}];
title :string;  
sexos=[{NOMBRE:"Hombres",ESTADOSEL:false},{NOMBRE:"Mujeres",ESTADOSEL:false}];
selectedDanio;
mediosvidaCat=new MediosDeVidaCat();

medioVidaForm =new MediosdeVidaForm();
detalle=new DetalleMediosVida();
constructor(public navCtrl: NavController, public navParams: NavParams,public viewctr:ViewController,public tr:AlertController,public platform:Platform,public app:App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalDetalleMediosvidaPage');
    this.mediosvidaCat=this.navParams.get("mediocat");
    this.medioVidaForm=this.navParams.get("medioForm")
    this.title=this.mediosvidaCat.NOMBRE;

    this.platform.ready().then(()=>{
      this.platform.registerBackButtonAction(()=>{
        let nav=this.app.getActiveNav();
 if(nav.canGoBack())
 {
  //  alert('asdas');
 }else{this.viewctr.dismiss(null);}
      });
    });
    if (this.medioVidaForm.detalleMedios!=undefined)
    {
      this.detalle=this.medioVidaForm.detalleMedios;
      if (this.medioVidaForm.detalleMedios.SINDANIO==true)
      {
        this.danios[0].ESTADOSEL=true;
        this.selectedDanio=this.danios[0];
      }
      if (this.medioVidaForm.detalleMedios.DANIOPARCIAL==true)
      {
        this.danios[1].ESTADOSEL=true;
        this.selectedDanio=this.danios[1];
      }
      if (this.medioVidaForm.detalleMedios.DANIOTOTAL==true)
      {
        this.danios[2].ESTADOSEL=true;
        this.selectedDanio=this.danios[2];
      }
      this.sexos[0].ESTADOSEL=this.medioVidaForm.detalleMedios.HOMBRES;
      this.sexos[1].ESTADOSEL=this.medioVidaForm.detalleMedios.MUJERES;
    }
  }
  select(i){
    this.selectedDanio=this.danios[i];
    console.log(this.selectedDanio);
  }
  agregar()
  {
    
      if (this.sexos[0].ESTADOSEL==true)
      {
        this.detalle.HOMBRES=true;
      }  
      else{this.detalle.HOMBRES=false;}
      if (this.sexos[1].ESTADOSEL==true )
      {
        this.detalle.MUJERES=true;
      }  
      else{this.detalle.MUJERES=false;}
    
    if (this.selectedDanio!=undefined)
    {
      if (this.selectedDanio.NOMBRE=="Sin Daño")
      {
        this.detalle.SINDANIO=true;
      }
      else{this.detalle.SINDANIO=false;}
      if (this.selectedDanio.NOMBRE=="Daño Parcial")
      {
        this.detalle.DANIOPARCIAL=true;
      }
      else{this.detalle.DANIOPARCIAL=false;}
      if (this.selectedDanio.NOMBRE=="Daño Total")
      {
        this.detalle.DANIOTOTAL=true;
      }
      else{this.detalle.DANIOTOTAL=false;}
      if(this.mediosvidaCat.ESPECIFICA==true)
      {
        if(this.detalle.ESPECIFICACION!=undefined && this.detalle.ESPECIFICACION!="")
        {
          // this.detalle.mediosdeVida=this.medioVidaForm;
          this.medioVidaForm.detalleMedios=this.detalle;
          // console.log(this.poblacionEspeform,this.detalleNeceEspe);
           this.viewctr.dismiss(this.medioVidaForm);
          console.log('asd',this.sexos);
          console.log("asd",this.medioVidaForm);
        }
        else{ this.doAlert("Especifique Medio de Vida");}
      }
      else{
        this.detalle.ESPECIFICACION="";
        
        // this.detalle.mediosdeVida=this.medioVidaForm;
        this.medioVidaForm.detalleMedios=this.detalle;
        // console.log(this.poblacionEspeform,this.detalleNeceEspe);
         this.viewctr.dismiss(this.medioVidaForm);
        console.log('asd',this.sexos);
        console.log("asd",this.medioVidaForm);}
    }
    // this.detalle.mediosdeVida=this.medioVidaForm;
    // this.medioVidaForm.detalleMedios=this.detalle;
    // // console.log(this.poblacionEspeform,this.detalleNeceEspe);
    //  this.viewctr.dismiss(this.medioVidaForm);
    // console.log('asd',this.sexos);
    // console.log("asd",this.medioVidaForm);
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
}
