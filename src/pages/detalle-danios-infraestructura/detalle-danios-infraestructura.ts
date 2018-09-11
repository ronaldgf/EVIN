import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController,Platform,App  } from 'ionic-angular';
import {InfraestructurasCat} from "../../Entidades/InfraestructurasCat";
import {DetallaDaniosInfraestructura} from "../../Entidades/DetalleDaniosInfraestructura";
import {DaniosInfraestructuraForm} from "../../Entidades/DaniosInfraestructurasForm";
import {TiposDanioServiciosCat} from "../../Entidades/TiposDanioServiciosCat";
import 'rxjs/add/operator/map';
import { createConnection,getConnection } from 'ionic-orm/dist'

/**
 * Generated class for the DetalleDaniosInfraestructuraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-danios-infraestructura',
  templateUrl: 'detalle-danios-infraestructura.html',
})
export class DetalleDaniosInfraestructuraPage {
infraestructura=new InfraestructurasCat();
detalle=new DetallaDaniosInfraestructura();
daniosInfraestructuraForm=new DaniosInfraestructuraForm();
danios=new Array<TiposDanioServiciosCat>();
title:string;
selectedDanio=new TiposDanioServiciosCat();
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewctr:ViewController,public tr:AlertController,public platform:Platform,public app:App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleDaniosInfraestructuraPage');
    this.infraestructura=this.navParams.get("infraestr");
    this.daniosInfraestructuraForm=this.navParams.get("daniosForm")
    console.log(this.daniosInfraestructuraForm);
    this.title=this.infraestructura.NOMBRE;
    this.platform.ready().then(()=>{
      this.platform.registerBackButtonAction(()=>{
        let nav=this.app.getActiveNav();
 if(nav.canGoBack())
 {
  //  alert('asdas');
 }else{this.viewctr.dismiss(null);}
      });
    });

   
    this.getDataBase();
  }
  async getDataBase()
  {
     
      let tipodanioServicioRepository =await getConnection('default').getRepository(TiposDanioServiciosCat);
      this.danios=await tipodanioServicioRepository.find(TiposDanioServiciosCat);
      let index=0;
      this.danios.forEach(danio=>{
       this.danios[index].ESTADOSEL=false;
       index++;
      });
     if(this.danios.length>0)
     {
       this.danios[0].ESTADOSEL=true;
       this.selectedDanio=this.danios[0];
     }
    this.llenaDatos();
    
  }
  llenaDatos()
  {
    if(this.daniosInfraestructuraForm.detalleInfra!=undefined)
    {
      let index=0;
      this.danios.forEach(danio=>{
       this.danios[index].ESTADOSEL   =false;
      });
      this.detalle=this.daniosInfraestructuraForm.detalleInfra;
      if (this.daniosInfraestructuraForm.detalleInfra.SINDANIO==true)
      {
        this.danios[0].ESTADOSEL=true;
        this.selectedDanio=this.danios[0];
      }
      if (this.daniosInfraestructuraForm.detalleInfra.DANIOPARCIAL==true)
      {
        this.danios[1].ESTADOSEL=true;
        this.selectedDanio=this.danios[1];
      }
      if (this.daniosInfraestructuraForm.detalleInfra.DANIOTOTAL==true)
      {
        this.danios[2].ESTADOSEL=true;
        this.selectedDanio=this.danios[2];
      }
    }
  }
  select(i){
    this.selectedDanio=this.danios[i];
    console.log(this.danios[i]);
    console.log(this.selectedDanio);
  }
  agregar(){
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
      if(this.infraestructura.ESPECIFICA==true)
      {
        if(this.detalle.ESPECIFICACION!=undefined && this.detalle.ESPECIFICACION!="")
        {
          // this.detalle.daniosInfraestructura=this.daniosInfraestructuraForm;
          this.daniosInfraestructuraForm.detalleInfra=this.detalle;
          // console.log(this.poblacionEspeform,this.detalleNeceEspe);
           this.viewctr.dismiss(this.daniosInfraestructuraForm);
          // console.log('asd',this.sexos);
          // console.log("asd",this.medioVidaForm);
        }
        else{ this.doAlert("Especifique Infraestructura");}
      }
      else{
        this.detalle.ESPECIFICACION="";
        
        // this.detalle.daniosInfraestructura=this.daniosInfraestructuraForm;
        this.daniosInfraestructuraForm.detalleInfra=this.detalle;
        // console.log(this.poblacionEspeform,this.detalleNeceEspe);
         this.viewctr.dismiss(this.daniosInfraestructuraForm);
        // console.log('asd',this.sexos);
        // console.log("asd",this.medioVidaForm);
      }
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
}
