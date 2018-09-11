import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,App } from 'ionic-angular';
import {Jsons} from "../../Entidades/Jsons";
import {UbicacionGeografica} from "../../Entidades/UbicacionGeografica";
import { createConnection,getConnection,ConnectionManager,Connection } from 'ionic-orm/dist'
import { MenuFormulaPage } from '../menu-formula/menu-formula';
import {FormulariosListPage} from '../formularios-list/formularios-list'
/**
 * Generated class for the ListBorradoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-borradores',
  templateUrl: 'list-borradores.html',
})
export class ListBorradoresPage {
  listUbicaciones=new Array<UbicacionGeografica>();
  listJsons=new Array<Jsons>();
  imagess='assets/Icono_pdf.png';
  visiblecheck=false;
  checkallVar=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public platform:Platform,public app:App) {
  }

  ionViewDidLoad() {
this.imagess='assets/formulario.png';
    console.log('ionViewDidLoad ListBorradoresPage');
    this.platform.ready().then(()=>{
      this.platform.registerBackButtonAction(()=>{
        let nav=this.app.getActiveNav();
 if(nav.canGoBack())
 {
  //  alert('asdas');
 }else{
   if(this.visiblecheck)
   {
     this.visiblecheck=false;
     this.listUbicaciones.forEach(data=>{
      data.selCheck=false;   
     });
   }else{
this.goBack();
   }

}
      });
    });
    this.getData();
  }
 async eliminarBorradores()
  {
    // this.listUbicaciones=undefined;
  let countSel=this.listUbicaciones.length;
  let count=0;
    this.visiblecheck=false;
    let lubicaciones=new Array<UbicacionGeografica>()
    this.listUbicaciones.forEach(async data=>{
    lubicaciones.push(data);
    });
    lubicaciones.forEach(async data=>{
     
      if(data.selCheck)
      {
        let jsonoObj=new Jsons();
        let ubicaRepository =await getConnection('default').getRepository(Jsons);
        jsonoObj=await ubicaRepository.createQueryBuilder("ubic").where("ubic.id= :id",{id:data.idJson}).getSingleResult();
        await ubicaRepository.remove(jsonoObj);
         let index =this.listUbicaciones.findIndex(x=>x.idJson==data.idJson);
        //  this.listUbicaciones=await new Array<UbicacionGeografica>();
          await this.listUbicaciones.splice(index,1);    
      }
     
    });
    
  }
  goBack()
  {
   
    this.navCtrl.setRoot(FormulariosListPage);
  }
  sel(index:number)
  {
    this.visiblecheck=true;
    this.listUbicaciones[index].selCheck=true;
  }
  checkall()
  {
      if(this.checkallVar)
      {
          this.listUbicaciones.forEach(data=>{
           data.selCheck=true;   
          });

      }else{ this.listUbicaciones.forEach(data=>{
        data.selCheck=false;   
       });}
  }
  async getData()
  {
    // alert('pepa2');
    let jsonrepository =await getConnection('default').getRepository(Jsons);
    this.listJsons=await jsonrepository.createQueryBuilder("json").where("json.ESTADO= :estado",{estado:'B'}).getResults();
    // alert (JSON.stringify(this.listJsons));
    this.listJsons.forEach(data=>{
     let ubi=new UbicacionGeografica();
      // alert(data.JSON);
     ubi=JSON.parse(data.JSON);
     
     this.listUbicaciones.push(ubi); 
    //  alert(ubi.idJson);
    });
    // await alert(JSON.stringify(this.listUbicaciones));
}
pepa(ss:UbicacionGeografica)
{
  // alert(ss.idJson);
  this.navCtrl.setRoot(MenuFormulaPage,ss);
}
}
