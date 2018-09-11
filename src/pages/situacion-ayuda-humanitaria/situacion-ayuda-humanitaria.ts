import { Component } from '@angular/core';
import { IonicPage, NavController,ModalController,AlertController, NavParams,Platform,App } from 'ionic-angular';
import {OrganizacionesCat} from "../../Entidades/OrganizacionesCat";
import {SectoresIntervencionCat} from "../../Entidades/SectoresIntervencionCat";
import {UbicacionGeografica} from "../../Entidades/UbicacionGeografica";
import {OrganizacionesForm} from "../../Entidades/OrganizacionesForm";
import {SectoresIntervencionForm} from "../../Entidades/SectoresIntervencionForm";
import 'rxjs/add/operator/map';
import { createConnection,getConnection } from 'ionic-orm/dist';
import {MenuFormulaPage} from '../menu-formula/menu-formula';
import {ModalAccionesRespuestaPage} from '../modal-acciones-respuesta/modal-acciones-respuesta'
import {AccionesRespuestaForm} from "../../Entidades/AccionesRespuestaForm";
import {Jsons} from "../../Entidades/Jsons";
import { SpeechRecognition } from '@ionic-native/speech-recognition';
/**
 * Generated class for the SituacionAyudaHumanitariaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-situacion-ayuda-humanitaria',
  templateUrl: 'situacion-ayuda-humanitaria.html',
})
export class SituacionAyudaHumanitariaPage {
  isRecording = false;
  organizaciones=new Array<OrganizacionesCat>();
  sectores=new Array<SectoresIntervencionCat>();
  TIENEDATOS:boolean;
  organizacionesForm=new Array<OrganizacionesForm>();
  organizacionesForm2=new Array<OrganizacionesForm>();
  sectoresForm=new Array<SectoresIntervencionForm>();
  ubicacion1=new UbicacionGeografica();
  acciones=new Array<AccionesRespuestaForm>();
  observaciones:string='';
  constructor(public speechRecognition:SpeechRecognition,public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public platform:Platform,public app:App,public alert:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SituacionAyudaHumanitariaPage');
    this.TIENEDATOS=true;
    this.ubicacion1=this.navParams.data;
    console.log('333',this.ubicacion1);
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
async getDataBase()
{
 
  let organizacionRepositorey =await getConnection('default').getRepository(OrganizacionesCat);
  this.organizaciones=await organizacionRepositorey.find(OrganizacionesCat);

  let sectoresRepository =await getConnection('default').getRepository(SectoresIntervencionCat);
  this.sectores=await sectoresRepository.find(SectoresIntervencionCat);
  // let i=0;

  // this.organizaciones.forEach(orga=>{
  //   this.organizaciones[i].sectoresIntervencioncat=this.sectores;
  //   i++;
  // });
  this.llenaDatos();
// this.organizaciones[0].sectoresIntervencioncat[0].ESTADOSEL=true;
}
async llenaDatos()
{
  if(this.ubicacion1.organizacionForm!=undefined)
  {
    this.organizacionesForm=this.ubicacion1.organizacionForm;
    
    console.log('asdasdadasdasd',this.organizacionesForm);
    this.organizacionesForm.forEach(organizaForm=>{
      this.observaciones=organizaForm.OBSERVACIONES;
      let index=this.organizaciones.findIndex(x=>x.ID==organizaForm.IDORG);
      let organizacion=this.organizaciones[index];
      organizacion.SECTORES="";
      
      let i=0;
      let sectooresCat=new Array<SectoresIntervencionCat>();
    organizaForm.sectoresIntervencion.forEach(sector=>{
      let indexItem=this.sectores.findIndex(x=>x.ID==sector.IDSECTOR);
      // this.sectores[indexItem].ESTADOSEL=true;
      sectooresCat.push(this.sectores[indexItem]);
      organizacion.sectoresIntervencioncat=sectooresCat;
      console.log(this.sectores[indexItem]);
      if(i==organizaForm.sectoresIntervencion.length-1)
      {
        organizacion.EXISTESECTORES=true;
        organizacion.SECTORES= organizacion.SECTORES.concat(this.sectores[indexItem].NOMBRE).concat(".");
      }else{organizacion.EXISTESECTORES=true;organizacion.SECTORES= organizacion.SECTORES.concat(this.sectores[indexItem].NOMBRE).concat(", ");}
      i++;
    });

    });
  }
  if(this.ubicacion1.accionesRespuesta!=undefined)
  {
    let accioness=this.ubicacion1.accionesRespuesta
    accioness.forEach(accion=>{
     this.acciones.push(accion);   
    });
    // this.acciones=this.ubicacion1.accionesRespuesta;
    this.TIENEDATOS=false;
  }
  console.log(this.sectores);
}
goBack()
{
  console.log('dfrf',this.ubicacion1);
  this.navCtrl.setRoot(MenuFormulaPage,this.ubicacion1);
}
async guardar()
{
  let organizacionesFormsP=new Array<OrganizacionesForm>();
  this.organizaciones.forEach(organizacion=>{
if(organizacion.sectoresIntervencioncat!=undefined)
  {
    let sectoresForms=new Array<SectoresIntervencionForm>();
    let organizacionForm1=new OrganizacionesForm();
    organizacionForm1.IDORG=organizacion.ID;
    // organizacionForm1.ubicOrganiza=this.ubicacion1;
      let sectorescat=organizacion.sectoresIntervencioncat;
      sectorescat.forEach(sectorCat=>{
       let sectorForm=new SectoresIntervencionForm();
       sectorForm.IDSECTOR=sectorCat.ID
      //  sectorForm.orgSectoresInter=organizacionForm1;   
       sectoresForms.push(sectorForm);
      });
      organizacionForm1.sectoresIntervencion=sectoresForms;
      organizacionForm1.OBSERVACIONES=this.observaciones;
      organizacionesFormsP.push(organizacionForm1);
    }
    
  
  });
  if(organizacionesFormsP.length>0)
  {
    if(this.acciones.length>0)
    {
      this.ubicacion1.organizacionForm=organizacionesFormsP;
      // this.ubicacion1.accionesRespuesta=this.acciones;
      let accionesForm=new Array<AccionesRespuestaForm>();
      this.acciones.forEach(accion=>{
        
        accionesForm.push(accion);
      });
      this.ubicacion1.accionesRespuesta=accionesForm;
      let jsonoObj=new Jsons();
      let ubicaRepository =await getConnection('default').getRepository(Jsons);
      jsonoObj=await ubicaRepository.createQueryBuilder("ubic").where("ubic.id= :id",{id:this.ubicacion1.idJson}).getSingleResult();
      jsonoObj.JSON=JSON.stringify(this.ubicacion1);
      await ubicaRepository.persist(jsonoObj);
      this.navCtrl.setRoot(MenuFormulaPage,this.ubicacion1);
    }
    else{this.doAlert("Ingrese al menos una acción de respuesta")}
    
  }
  else{
    this.doAlert("Seleccione al menos un sector de intervención")
  }
  // else{organizacionesFormsP=undefined;
  //   this.ubicacion1.organizacionForm=organizacionesFormsP;}
  // console.log('asd',this.ubicacion1);
  
  
}
onChange(ss:any,organizacion:OrganizacionesCat)
{
   console.log('entro',ss);
  organizacion.SECTORES="";
  //  this.sectoresForm=new Array<SectoresIntervencionForm>();
  let i=0;
  // let index=-1;
  // index=this.organizacionesForm.findIndex(x=>x.IDORG==organizacion.ID);
  // let organizacionform=new OrganizacionesForm();
  // if(index>-1)
  // {
  //   organizacionform=this.organizacionesForm[index];
  // }
  let sectoresCats=new Array<SectoresIntervencionCat>();
  if (ss.length>0)
  {
  //  organizacionform.IDORG=organizacion.ID;
  ss.forEach(element => {
  let sector=new SectoresIntervencionCat();
  sector=this.sectores.find(x=>x.ID==element);  
  if(i==ss.length-1)
  {
    organizacion.SECTORES= organizacion.SECTORES.concat(sector.NOMBRE).concat(".");
  }else{organizacion.SECTORES= organizacion.SECTORES.concat(sector.NOMBRE).concat(", ");}
   organizacion.EXISTESECTORES=true;
  sectoresCats.push(sector);
   
   
  //  let sectorfor=new SectoresIntervencionForm();
  //  sectorfor.IDSECTOR=sector.ID;
  //  sectorfor.orgSectoresInter=organizacionform;
  //  this.sectoresForm.push(sectorfor);
   i++;
  });
  organizacion.sectoresIntervencioncat=sectoresCats;
  let index=this.organizaciones.findIndex(x=>x.ID==organizacion.ID);
  this.organizaciones[index]=organizacion;
  // console.log(this.sectoresForm);
  // organizacionform.sectoresIntervencion=this.sectoresForm;
  // organizacionform.ubicOrganiza=this.ubicacion1;
  // if (index>-1)
  // {
  //   this.organizacionesForm[index]=organizacionform;
  // }else{this.organizacionesForm.push(organizacionform);}
  
  // console.log(this.organizacionesForm);
}
else{ 
  let index=this.organizaciones.findIndex(x=>x.ID==organizacion.ID);
  this.organizaciones[index].SECTORES="";
  this.organizaciones[index].EXISTESECTORES=false;
  this.organizaciones[index].sectoresIntervencioncat=undefined;
  // this.organizacionesForm.splice(index,1);}
}
console.log(this.organizaciones);
}
async deleteDetalle(organizacion:OrganizacionesCat)
{
  let index=this.organizaciones.findIndex(x=>x.ID==organizacion.ID);
  this.organizaciones[index].SECTORES="";
  this.organizaciones[index].EXISTESECTORES=false;
  this.organizaciones[index].sectoresIntervencioncat=undefined;
//  let indexItem= this.organizacionesForm.findIndex(x=>x.IDORG==organizacion.ID);
//  this.organizacionesForm.splice(indexItem,1);
//  let sectoresRepository = await getConnection('default').getRepository(SectoresIntervencionCat);
//  this.sectores=await sectoresRepository.find(SectoresIntervencionCat);
 console.log(this.sectores);
}
openModalEditar(index)
{
  let modal=this.modalCtrl.create(ModalAccionesRespuestaPage,this.acciones[index]);
  modal.onDidDismiss(data => {
    this.platform.ready().then(()=>{
      this.platform.registerBackButtonAction(()=>{
        let nav=this.app.getActiveNav();
 if(nav.canGoBack())
 {
  //  alert('asdas');
 }else{this.goBack();}
      });
    });
    if (data!=null)
    {
       this.acciones[index]=data;
            
    }
  });
  modal.present();
}
openModal()
{
  let modal=this.modalCtrl.create(ModalAccionesRespuestaPage);
  modal.onDidDismiss(data => {
    this.platform.ready().then(()=>{
      this.platform.registerBackButtonAction(()=>{
        let nav=this.app.getActiveNav();
 if(nav.canGoBack())
 {
  //  alert('asdas');
 }else{this.goBack();}
      });
    });
    if (data!=null)
    {
       let accion=new AccionesRespuestaForm();
       accion=data;
      //  accion.ubicAcciones=this.ubicacion1;
       accion.ESTADOAGREGADO=true;
       this.acciones.push(accion);     
       this.TIENEDATOS=false;
    }
  });
  modal.present();
}
deleteAccion(index)
{
  this.acciones.splice(index,1);
  if(this.acciones.length==0)
  {
    this.TIENEDATOS=true;
  }

}
doAlert(nombresdas) {
  
  
  let alert = this.alert.create({
    title: 'Error',
    
    message: nombresdas,
    buttons: [ {
      text: "Ok",
      role: 'cancel'
    }]
  });
  alert.present()
}
stopListening() {
  this.speechRecognition.stopListening().then(() => {
    this.isRecording = false;
  });
}

getPermission() {
  this.speechRecognition.hasPermission()
    .then((hasPermission: boolean) => {
      if (!hasPermission) {
        this.speechRecognition.requestPermission();
      }
    });
}

startListening(ind:number) {
  this.getPermission();
  let options = {
    language: 'es-ES'
  }
  this.speechRecognition.startListening().subscribe(matches => {
    
      this.observaciones=matches[0];
   
  });
  this.isRecording = true;
}
isIos() {
  return this.platform.is('ios');
}
}
