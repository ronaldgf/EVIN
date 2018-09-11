import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App,Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { createConnection,getConnection } from 'ionic-orm/dist';
import {UbicacionGeografica} from "../../Entidades/UbicacionGeografica";
import {AfectacionSaludAlimentariaForm} from "../../Entidades/AfectacionSaludAlimentariaForm";
import {AfectacionSectorSaludAlimentCat} from "../../Entidades/AfectacionSectorSaludAlimentCat";
import {MenuFormulaPage} from '../menu-formula/menu-formula'
import {Jsons} from "../../Entidades/Jsons";
/**
 * Generated class for the AfectacionSaludAlimentariaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-afectacion-salud-alimentaria',
  templateUrl: 'afectacion-salud-alimentaria.html',
})
export class AfectacionSaludAlimentariaPage {
saluds=new Array<AfectacionSectorSaludAlimentCat>();
saludNos=new Array<AfectacionSectorSaludAlimentCat>();
alimentarias=new Array<AfectacionSectorSaludAlimentCat>();
ubicacion= new UbicacionGeografica();
afectacionesForm=new Array<AfectacionSaludAlimentariaForm>();
  constructor(public navCtrl: NavController, public navParams: NavParams,public platform:Platform,public app:App) {
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad AfectacionSaludAlimentariaPage');
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
    this.getDataBase();
  }
  goBack()
  {
    this.navCtrl.setRoot(MenuFormulaPage,this.ubicacion);
  }
 async llenarDatos()
 {
   if (this.ubicacion.afectacionesSalud!=undefined)
   {
    this.ubicacion.afectacionesSalud.forEach(sal=>{
      if(sal.CUANTIFICAR==true && sal.SALUD==true)
      {
        let index=this.saluds.findIndex(x=>x.ID==sal.IDTIPO);
        this.saluds[index].ESTADOSEL=sal.ESTADOSEL;
        this.saluds[index].OBSERVACION=sal.OBSERVACION;
        
      }
      if(sal.CUANTIFICAR==false && sal.SALUD==true)
      {
        let index=this.saludNos.findIndex(x=>x.ID==sal.IDTIPO);
        this.saludNos[index].ESTADOSEL=sal.ESTADOSEL;
        this.saludNos[index].OBSERVACION=sal.OBSERVACION;
        this.saludNos[index].ESPECIFICACION=sal.ESPECIFICACION;
      }
      if(sal.CUANTIFICAR==false && sal.ALIMENTARIA==true)
      {
        let index=this.alimentarias.findIndex(x=>x.ID==sal.IDTIPO);
        this.alimentarias[index].ESTADOSEL=sal.ESTADOSEL;
        this.alimentarias[index].OBSERVACION=sal.OBSERVACION;
        this.alimentarias[index].PORCENTAJE=sal.PORCENTAJE;
        
      }
    });
   }
 }
async getDataBase()
{
  let tiposRepository =await getConnection('default').getRepository(AfectacionSectorSaludAlimentCat);
  this.saluds=await tiposRepository.createQueryBuilder("salud")
  .where("salud.SALUD = :myVar and salud.CUANTIFICAR= :myVar2", { myVar: true,myVar2:true}).getResults();
let i=0;
  this.saluds.forEach(salud=>{
    this.saluds[i].ESTADOSEL=false;
    i++;
  });

  this.saludNos=await tiposRepository.createQueryBuilder("salud")
  .where("salud.SALUD = :myVar and salud.CUANTIFICAR= :myVar2", { myVar: true,myVar2:false}).getResults();

  let j=0;
  this.saludNos.forEach(salud=>{
    this.saludNos[j].ESTADOSEL=false;
    j++;
  });


  this.alimentarias=await tiposRepository.createQueryBuilder("salud")
  .where("salud.ALIMENTARIA = :myVar and salud.CUANTIFICAR= :myVar2", { myVar: true,myVar2:false}).getResults();
  let k=0;
  this.alimentarias.forEach(salud=>{
    this.alimentarias[k].ESTADOSEL=false;
    k++;
  });
this.llenarDatos();

}
async guardar()
{
  console.log('eee',this.saludNos);  
this.saluds.forEach(salud=>{
let saludForm=new AfectacionSaludAlimentariaForm();
saludForm.IDTIPO=salud.ID;
saludForm.ALIMENTARIA=salud.ALIMENTARIA;
saludForm.ESTADOSEL=salud.ESTADOSEL;
saludForm.CUANTIFICAR=salud.CUANTIFICAR;
saludForm.OBSERVACION=salud.OBSERVACION;
saludForm.PORCENTAJE=salud.PORCENTAJE;
saludForm.ESPECIFICACION=salud.ESPECIFICACION;

saludForm.SALUD=salud.SALUD;
// saludForm.ubicAfectSalud=this.ubicacion;

this.afectacionesForm.push(saludForm);
});
this.saludNos.forEach(salud=>{
  let saludForm=new AfectacionSaludAlimentariaForm();
  saludForm.IDTIPO=salud.ID;
  saludForm.ALIMENTARIA=salud.ALIMENTARIA;
  saludForm.ESTADOSEL=salud.ESTADOSEL;
  saludForm.CUANTIFICAR=salud.CUANTIFICAR;
  saludForm.OBSERVACION=salud.OBSERVACION;
  saludForm.PORCENTAJE=salud.PORCENTAJE;
  saludForm.ESPECIFICACION=salud.ESPECIFICACION;
  saludForm.SALUD=salud.SALUD;
  console.log('aaa',salud.ESPECIFICACION,saludForm.ESPECIFICACION);
  // saludForm.ubicAfectSalud=this.ubicacion;
  this.afectacionesForm.push(saludForm);
  });
  this.alimentarias.forEach(salud=>{
    let saludForm=new AfectacionSaludAlimentariaForm();
    saludForm.IDTIPO=salud.ID;
    saludForm.ALIMENTARIA=salud.ALIMENTARIA;
    saludForm.ESTADOSEL=salud.ESTADOSEL;
    saludForm.CUANTIFICAR=salud.CUANTIFICAR;
    saludForm.OBSERVACION=salud.OBSERVACION;
    saludForm.PORCENTAJE=salud.PORCENTAJE;
    saludForm.ESPECIFICACION=salud.ESPECIFICACION;
    saludForm.SALUD=salud.SALUD;
    // saludForm.ubicAfectSalud=this.ubicacion;
    this.afectacionesForm.push(saludForm);
    });
    this.ubicacion.afectacionesSalud=this.afectacionesForm;
    // let tiposRepository = getConnection('default').getRepository(AfectacionSaludAlimentariaForm);
    // tiposRepository.persist(this.afectacionesForm);
    console.log('asd',this.afectacionesForm);
    let jsonoObj=new Jsons();
    let ubicaRepository =await getConnection('default').getRepository(Jsons);
    jsonoObj=await ubicaRepository.createQueryBuilder("ubic").where("ubic.id= :id",{id:this.ubicacion.idJson}).getSingleResult();
    jsonoObj.JSON=JSON.stringify(this.ubicacion);
    await ubicaRepository.persist(jsonoObj);

    this.navCtrl.setRoot(MenuFormulaPage,this.ubicacion);  
    
}
}
