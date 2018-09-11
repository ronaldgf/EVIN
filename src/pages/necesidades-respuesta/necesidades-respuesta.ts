import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,App,AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { createConnection,getConnection } from 'ionic-orm/dist';
import {NecesidadesUrgRRHHCat} from "../../Entidades/NecesidadesUrgRRHHCat";
import {NecesidadesRecuTempranaCat} from "../../Entidades/NecesidadesRecuTempranaCat";
import {SectoresIntervencionCat} from "../../Entidades/SectoresIntervencionCat";
import {SectoresNecesidadesRespuestaForm} from "../../Entidades/SectoresNecesidadesRespuestaForm";
import {NecesidadesRespuestaForm} from "../../Entidades/NecesidadesRespuestaForm";
import {NecesidadesUrgRRHHForm} from "../../Entidades/NecesidadesUrgRRHHForm";
import {NecesidadesRecupTempranaForm} from "../../Entidades/NecesidadesRecupTempranaForm";
import {UbicacionGeografica} from "../../Entidades/UbicacionGeografica";
import {MenuFormulaPage} from '../menu-formula/menu-formula'
import {Jsons} from "../../Entidades/Jsons";
/**
 * Generated class for the NecesidadesRespuestaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-necesidades-respuesta',
  templateUrl: 'necesidades-respuesta.html',
})
export class NecesidadesRespuestaPage {
  necesidadesUrg=new Array<NecesidadesUrgRRHHCat>();
  sectoresAgregados=[{idsectore:0,cantidad:0,nombre:""}];
  cantidadS=0;
  NUMEROHOGARES=0;
  DIAS=0;
  necesidadesRecuperacionTemprana=new Array<NecesidadesRecuTempranaCat>();
  sectores=new Array<SectoresIntervencionCat>();
  valueSelect:any;
  ubicacion=new UbicacionGeografica();
  constructor(public navCtrl: NavController, public navParams: NavParams,public app:App,public tr:AlertController,public platform:Platform) {
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
    console.log('ionViewDidLoad NecesidadesRespuestaPage');
    this.getDataBase();
   
  }
  goBack()
  {
    this.navCtrl.setRoot(MenuFormulaPage,this.ubicacion);
  }
  async getDataBase()
  {
   
    let necesidadesUrgRepository =await getConnection('default').getRepository(NecesidadesUrgRRHHCat);
    this.necesidadesUrg=await necesidadesUrgRepository.find(NecesidadesUrgRRHHCat);
  
    let necesidadesRecuRepository =await getConnection('default').getRepository(NecesidadesRecuTempranaCat);
    this.necesidadesRecuperacionTemprana=await necesidadesRecuRepository.find(NecesidadesRecuTempranaCat);

    let sectoreRepository =await getConnection('default').getRepository(SectoresIntervencionCat);
    this.sectores=await sectoreRepository.find(SectoresIntervencionCat);
    this.llenaDatos();
  }
  async llenaDatos()
  {
    if(this.ubicacion.necesidadRespuestaForm!=undefined)
    {
      let necesidadRespuestaForm=new NecesidadesRespuestaForm();
      necesidadRespuestaForm=this.ubicacion.necesidadRespuestaForm;
      this.DIAS=necesidadRespuestaForm.DIAS;
      this.NUMEROHOGARES=necesidadRespuestaForm.NUMEROHOGARES;
      necesidadRespuestaForm.sectoresRespuestaForm.forEach(sector=>{
        console.log(sector);
        console.log(this.sectores);
        let sectorAgregar={idsectore:0,cantidad:0,nombre:""};
        sectorAgregar.cantidad=sector.CANTIDAD;
        sectorAgregar.idsectore=sector.IDSECTOR;
        let imdex=this.sectores.findIndex(x=>x.ID==sector.IDSECTOR);
        console.log(imdex);
        let sectorCat=this.sectores.find(x=>x.ID==sector.IDSECTOR);
        console.log(sectorCat);
        sectorAgregar.nombre=sectorCat.NOMBRE;
        this.sectoresAgregados.push(sectorAgregar);
      });
    }
    if(this.ubicacion.necesidadesUrgRRHH!=undefined)
    {
      this.ubicacion.necesidadesUrgRRHH.forEach(neceUrgForm=>
      {
        let index=this.necesidadesUrg.findIndex(x=>x.ID==neceUrgForm.IDNECRRHH);
        this.necesidadesUrg[index].ESTADOSEL=neceUrgForm.ESTADOSEL;
      });
    }

    if(this.ubicacion.necesidadesRecuForm!=undefined)
    {
      this.ubicacion.necesidadesRecuForm.forEach(neceRuform=>
      {
        let index=this.necesidadesRecuperacionTemprana.findIndex(x=>x.ID==neceRuform.IDNECRECU);
        this.necesidadesRecuperacionTemprana[index].ESTADOSEL=neceRuform.ESTADOSEL;
      });
    }
  }
  onChange(value)
  {
    this.valueSelect=value;
    console.log(this.valueSelect);
  }
  agregar()
  {
    console.log("asdsasa",this.cantidadS);
    if (this.valueSelect!=undefined)
    {
      if(this.cantidadS!=undefined && this.cantidadS!=0)
      {
      let sector=this.sectores.find(x=>x.ID==this.valueSelect);
      let sectorAgregar={idsectore:0,cantidad:0,nombre:""};
      sectorAgregar.cantidad=this.cantidadS;
      sectorAgregar.idsectore=sector.ID;
      sectorAgregar.nombre=sector.NOMBRE;
      this.sectoresAgregados.push(sectorAgregar);
      console.log("ss",this.sectoresAgregados);
      this.cantidadS=0;
      }
      else{
        this.doAlert("Ingrese una Cantidad")
      }
    }else{
      this.doAlert("Seleccionar un Sector");
    }
  }
  deleteDetalle(i)
  {
    console.log(i);
    this.sectoresAgregados.splice(i,1);
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
    if(this.sectoresAgregados.length>1)
    {
      let neceRespuestaForm=new NecesidadesRespuestaForm();
      let sectoresAgregadosForm=new Array<SectoresNecesidadesRespuestaForm>();
      neceRespuestaForm.DIAS=this.DIAS;
      neceRespuestaForm.NUMEROHOGARES=this.NUMEROHOGARES;
      // neceRespuestaForm.ubicNeceRespuestaForm=this.ubicacion;
      this.sectoresAgregados.forEach(sectorAgregado=>
      {
        if (sectorAgregado.cantidad>0)
        {
          let sectorForm=new SectoresNecesidadesRespuestaForm();
          sectorForm.CANTIDAD=sectorAgregado.cantidad;
          sectorForm.IDSECTOR=sectorAgregado.idsectore;
          // sectorForm.neceSecRespuesta=neceRespuestaForm;
          sectoresAgregadosForm.push(sectorForm);
        }
          
      });
      neceRespuestaForm.sectoresRespuestaForm=sectoresAgregadosForm;
      this.ubicacion.necesidadRespuestaForm=neceRespuestaForm;
    }
    else{this.doAlert("Agregue al menos un sector");return;}
    
    if(this.NUMEROHOGARES==undefined || this.NUMEROHOGARES==0)
    {
      this.doAlert("Ingrese Número de Hogares");
      return;
    }
    // if(this.DIAS==undefined || this.DIAS==0)
    // {
    //   this.doAlert("Ingrese Número de Días");
    //   return;
    // }
    let necesidadesUrg=new Array<NecesidadesUrgRRHHForm>();
    this.necesidadesUrg.forEach(neceUrg=>{
      let neceUrgForm=new NecesidadesUrgRRHHForm();
      neceUrgForm.IDNECRRHH=neceUrg.ID;
      if(neceUrg.ESTADOSEL!=undefined)
      {
          neceUrgForm.ESTADOSEL=neceUrg.ESTADOSEL;  
      }
      else{
        neceUrgForm.ESTADOSEL=false;
      }
      // neceUrgForm.ubicNecUrg=this.ubicacion;
      necesidadesUrg.push(neceUrgForm);
    });
    this.ubicacion.necesidadesUrgRRHH=necesidadesUrg;

    let neceRecu=new Array<NecesidadesRecupTempranaForm>();
    this.necesidadesRecuperacionTemprana.forEach(neceRec=>{
      let neceRecupForm=new NecesidadesRecupTempranaForm();
      neceRecupForm.IDNECRECU=neceRec.ID;
      if(neceRec.ESTADOSEL!=undefined)
      {
        neceRecupForm.ESTADOSEL=neceRec.ESTADOSEL;  
      }
      else{
        neceRecupForm.ESTADOSEL=false;
      }
      // neceRecupForm.ubicNecRecu=this.ubicacion;
      neceRecu.push(neceRecupForm);
    });
    this.ubicacion.necesidadesUrgRRHH=necesidadesUrg;
    this.ubicacion.necesidadesRecuForm=neceRecu;
    let jsonoObj=new Jsons();
    let ubicaRepository =await getConnection('default').getRepository(Jsons);
    jsonoObj=await ubicaRepository.createQueryBuilder("ubic").where("ubic.id= :id",{id:this.ubicacion.idJson}).getSingleResult();
    jsonoObj.JSON=JSON.stringify(this.ubicacion);
    await ubicaRepository.persist(jsonoObj);
    this.navCtrl.setRoot(MenuFormulaPage,this.ubicacion);
  }
}
