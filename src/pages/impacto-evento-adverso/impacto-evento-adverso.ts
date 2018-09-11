import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,App, Platform } from 'ionic-angular';
import {ImpactoEventoAdversoCat} from "../../Entidades/ImpactoEventoAdversoCat";
import {MenuFormulaPage} from '../menu-formula/menu-formula';
import {ImpactoEventoAdversoForm} from "../../Entidades/ImpactoEventoAdversoForm";
import {UbicacionGeografica} from "../../Entidades/UbicacionGeografica";
import 'rxjs/add/operator/map';
import { createConnection,getConnection } from 'ionic-orm/dist'
import {Jsons} from "../../Entidades/Jsons";
/**
 * Generated class for the ImpactoEventoAdversoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-impacto-evento-adverso',
  templateUrl: 'impacto-evento-adverso.html',
})
export class ImpactoEventoAdversoPage {
impactos=new Array<ImpactoEventoAdversoCat>();
ubicacion =new UbicacionGeografica();
  constructor(public navCtrl: NavController, public navParams: NavParams,public platform:Platform,public app:App,public tr:AlertController) {
  }

  ionViewDidLoad() {
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
    console.log('ionViewDidLoad ImpactoEventoAdversoPage');
    this.getDataBase();
  }
  goBack()
  {
    
    this.navCtrl.setRoot(MenuFormulaPage,this.ubicacion);
  }
  async llenaDatos()
  {
    if (this.ubicacion.impactosEventoAdversos!=undefined)
    {
          this.ubicacion.impactosEventoAdversos.forEach(impacto=>{
          let index =this.impactos.findIndex(x=>x.ID==impacto.IDIMP);
          this.impactos[index].ESTADOSEL=impacto.ESTADOSEL;
          });
    }
  }
async getDataBase()
{
  let impactosRepository =await getConnection('default').getRepository(ImpactoEventoAdversoCat);
  this.impactos=await impactosRepository.find(ImpactoEventoAdversoCat);
  this.llenaDatos();
}
async guardar()
{
  let impacto =this.impactos.find(x=>x.ESTADOSEL==true);
  let impactosForm=new Array<ImpactoEventoAdversoForm>();
  if(impacto!=undefined)
  {
    this.impactos.forEach(impacto=>{
      let impactoForm=new ImpactoEventoAdversoForm();
      impactoForm.IDIMP=impacto.ID;
      if(impacto.ESTADOSEL!=undefined)
      {
        impactoForm.ESTADOSEL=impacto.ESTADOSEL;
      }
      else{
        impactoForm.ESTADOSEL=false;
      }
      // impactoForm.ubicImpacto=this.ubicacion;
      impactosForm.push(impactoForm);
    });
    this.ubicacion.impactosEventoAdversos=impactosForm;
    let jsonoObj=new Jsons();
    let ubicaRepository =await getConnection('default').getRepository(Jsons);
    jsonoObj=await ubicaRepository.createQueryBuilder("ubic").where("ubic.id= :id",{id:this.ubicacion.idJson}).getSingleResult();
    jsonoObj.JSON=JSON.stringify(this.ubicacion);
    await ubicaRepository.persist(jsonoObj);
    this.navCtrl.setRoot(MenuFormulaPage,this.ubicacion);
  }
  else{
    this.doAlert("Seleccione al menos un Impacto de evento Adverso");
  }
  console.log(impacto);
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
