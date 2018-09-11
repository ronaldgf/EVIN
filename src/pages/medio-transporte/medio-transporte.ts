import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,App,AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { createConnection,getConnection } from 'ionic-orm/dist'
import {DaniosViviendaPage} from '../danios-vivienda/danios-vivienda'
import {MenuFormulaPage} from '../menu-formula/menu-formula'
import {UbicacionGeografica} from "../../Entidades/UbicacionGeografica";
import {MedioTransporte} from "../../Entidades/MediosTransporte";
import {TipoTransporteCat} from "../../Entidades/TiposTransporteCat";
import {TipoTransporteForm} from "../../Entidades/TiposTransporteForm";
import {MediosTransporteForm} from "../../Entidades/MediosTransporteForm";
import {Jsons} from "../../Entidades/Jsons";
/**
 * Generated class for the MedioTransportePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medio-transporte',
  templateUrl: 'medio-transporte.html',
})
export class MedioTransportePage {
  medios=new Array<MedioTransporte>();
  
  tiposCat=new Array<TipoTransporteCat>();
  selectMedio=new MedioTransporte();
  gender : string[];
  tiposTransporteForm=new Array<TipoTransporteForm>();
  mediotransporteForm=new MediosTransporteForm();
  ubicacion=new UbicacionGeografica();
  constructor(public navCtrl: NavController, public navParams: NavParams,public platform:Platform,public app:App,public tr:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedioTransportePage');
    this.gender=[""];
    this.ubicacion=this.navParams.data;
    this.platform.ready().then(()=>{
      this.platform.registerBackButtonAction(()=>{
        let nav=this.app.getActiveNav();
 if(nav.canGoBack())
 {
  //  alert('asdas');
 }else{this.goBack();}
      });
    });
    this.getDatabase();
 
  }
async getDatabase()
{
  let mediosTransporterepository =await getConnection('default').getRepository(MedioTransporte);
  this.medios=await mediosTransporterepository.find(MedioTransporte);
  if (this.medios.length>0)
  {
    let index=0;
    this.medios.forEach(medio=>{
     this.medios[index].ESTADOSEL=false;
     index++;
    });
    this.medios[0].ESTADOSEL=true;
    let tiposRepository =await getConnection('default').getRepository(TipoTransporteCat);
    this.tiposCat=await tiposRepository.createQueryBuilder("tipo")
    .where("tipo.IDMEDIO = :myVar", { myVar: this.medios[0].ID }).getResults();
    this.selectMedio=this.medios[0];
  }

this.llenaDatos();
  

}
async llenaDatos()
{
 
  if(this.ubicacion.medioTransporteForm!=undefined)
  {
    // await console.log(this.ubicacion);
    // await console.log(this.ubicacion.medioTransporteForm);
    // await console.log(this.ubicacion.medioTransporteForm.tiposTransporteForm);
    
    let tipoTansporte=await this.ubicacion.medioTransporteForm.tiposTransporteForm;
    tipoTansporte.forEach(tipoForm=>{
      this.gender.push(tipoForm.IDTIPO.toString());
    });
    
    let i=0;
    this.medios.forEach(medio=>{
     this.medios[i].ESTADOSEL=false;
     i++;
    });
    // await console.log(this.medios,  );
    let index= this.medios.findIndex(x=>x.ID==this.ubicacion.medioTransporteForm.IDMEDIO);
    console.log(index);
    this.medios[index].ESTADOSEL=true;
    

    let tiposRepository =await getConnection('default').getRepository(TipoTransporteCat);
    this.tiposCat=await tiposRepository.createQueryBuilder("tipo")
    .where("tipo.IDMEDIO = :myVar", { myVar: this.medios[index].ID }).getResults();
    // this.selectMedio=this.medios[0];
    this.selectMedio=this.medios[index];
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
goBack()
{
  this.navCtrl.setRoot(MenuFormulaPage,this.ubicacion);
}
async select(i)
{
  let tiposRepository =await getConnection('default').getRepository(TipoTransporteCat);
  this.tiposCat=await tiposRepository.createQueryBuilder("tipo")
  .where("tipo.IDMEDIO = :myVar", { myVar: this.medios[i].ID }).getResults();
  this.selectMedio=this.medios[i];
  // console.log(this.medios[i]);
  // console.log(this.selectMedio);
  this.gender=[""];
  this.tiposTransporteForm=new Array<TipoTransporteForm>();
}
async guardar()
{
  
  this.mediotransporteForm.IDMEDIO=this.selectMedio.ID;
  let index=0;
  
  this.gender.forEach(tipo=>{
  if(this.gender[index].toString()!="")
  {
      let tipoTransporte=this.tiposCat.find(x=>x.ID==parseInt( this.gender[index]))
      let tipotranspForm=new TipoTransporteForm();
      tipotranspForm.IDTIPO=tipoTransporte.ID
      // tipotranspForm.medioTransporteForm=this.mediotransporteForm;
      this.tiposTransporteForm.push(tipotranspForm);
    }
    index++;
  });
  if(this.tiposTransporteForm.length>0)
  {
  this.mediotransporteForm.tiposTransporteForm=this.tiposTransporteForm;
  // this.mediotransporteForm.ubicmedioTransp=this.ubicacion;
  this.ubicacion.medioTransporteForm=this.mediotransporteForm;
  let jsonoObj=new Jsons();
  let ubicaRepository =await getConnection('default').getRepository(Jsons);
  jsonoObj=await ubicaRepository.createQueryBuilder("ubic").where("ubic.id= :id",{id:this.ubicacion.idJson}).getSingleResult();
  jsonoObj.JSON=JSON.stringify(this.ubicacion);
  await ubicaRepository.persist(jsonoObj);
  this.navCtrl.setRoot(MenuFormulaPage,this.ubicacion);  
  console.log(this.mediotransporteForm);
  }else
  {
    this.doAlert("Debe elegir al menos un tipo de transporte");
  }
}
} 
