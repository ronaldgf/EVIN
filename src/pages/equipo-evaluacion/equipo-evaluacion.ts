import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,Platform,App,AlertController } from 'ionic-angular';
import {ModalEvaluadorPage} from '../modal-evaluador/modal-evaluador'
import {ModalEncuestadoPage} from '../modal-encuestado/modal-encuestado'
import {UbicacionGeografica} from "../../Entidades/UbicacionGeografica";
import {Evaluador} from "../../Entidades/Evaluador";
import {Entrevistado} from "../../Entidades/Entrevistado";
import {EquipoEvaluacion} from "../../Entidades/EquipoEvaluacion";
import {MenuFormulaPage} from '../menu-formula/menu-formula';
import { createConnection,getConnection } from 'ionic-orm/dist'
import {Jsons} from "../../Entidades/Jsons";
/**
 * Generated class for the EquipoEvaluacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-equipo-evaluacion',
  templateUrl: 'equipo-evaluacion.html',
}) 
export class EquipoEvaluacionPage {
  hoy =new Date();
  public event = {
    month:this.hoy.getFullYear().toString().concat('-').concat((this.hoy.getUTCMonth()+1).toString()).concat('-').concat(this.hoy.getDate().toString()),
    timeStarts: this.hoy.getHours().toString().concat(':').concat(this.hoy.getMinutes().toString()),
    timeEnds: '1990-02-20'
  };

  TIENEDATOSEVALUADORES:boolean;
  TIENEENTREVISTADO:boolean;
  evaluadores=new Array<Evaluador>();
  entrevistados=new Array<Entrevistado>();
  equipoEvaluacion=new EquipoEvaluacion();
  ubicacion=new UbicacionGeografica();
  constructor(public navCtrl: NavController,public platform:Platform,public app:App, public navParams: NavParams,public mdctr:ModalController,public tr:AlertController) {
  }

  ionViewDidLoad() {
    this.equipoEvaluacion.FECHA=this.event.month;
    this.equipoEvaluacion.HORA=this.event.timeStarts;
    this.platform.ready().then(()=>{
      this.platform.registerBackButtonAction(()=>{
        let nav=this.app.getActiveNav();
 if(nav.canGoBack())
 {
  //  alert('asdas');
 }else{this.goBack();}
      });
    });
    this.ubicacion=this.navParams.data;
    this.TIENEDATOSEVALUADORES=true;
    this.TIENEENTREVISTADO=true;
    this.llenaDatos();
    console.log('ionViewDidLoad EquipoEvaluacionPage');
  }
  goBack()
  {
    
    this.navCtrl.setRoot(MenuFormulaPage,this.ubicacion);
  }
  llenaDatos()
  {
    if(this.ubicacion.equipo!=undefined)
    {
      let equipoForm=new EquipoEvaluacion();
      equipoForm=this.ubicacion.equipo;
      this.equipoEvaluacion.FECHA=equipoForm.FECHA;
      this.equipoEvaluacion.HORA=equipoForm.HORA;
      equipoForm.evaluadores.forEach(evaluadorForm=>{
        let evaluador=new Evaluador();
        evaluador.NOMBRE=evaluadorForm.NOMBRE;
        evaluador.CARGO=evaluadorForm.CARGO;
        evaluador.EMAIL=evaluadorForm.EMAIL;
        evaluador.ORGANIZACION=evaluadorForm.ORGANIZACION;
        evaluador.SEXO=evaluadorForm.SEXO;
        evaluador.TELEFONO=evaluadorForm.TELEFONO;
        evaluador.equiEvaluador=this.equipoEvaluacion;
        evaluador.ESTADOAGREGADO=evaluadorForm.ESTADOAGREGADO;
        this.evaluadores.push(evaluador)
        this.TIENEDATOSEVALUADORES=false;
      });
      equipoForm.entrevistados.forEach(entrevistadoForm=>
      {
        let entrevistado=new Entrevistado();
        entrevistado.NOMBRE=entrevistadoForm.NOMBRE;
      
        entrevistado.ORGANIZACION=entrevistadoForm.ORGANIZACION;
        entrevistado.SEXO=entrevistadoForm.SEXO;
        entrevistado.TELEFONO=entrevistadoForm.TELEFONO;
        entrevistado.equiEntrevist=this.equipoEvaluacion;
        entrevistado.ESTADOAGREGADO=entrevistadoForm.ESTADOAGREGADO;
        entrevistado.IDTIPO=entrevistadoForm.IDTIPO;
        this.entrevistados.push(entrevistado);
        this.TIENEENTREVISTADO=false;
      });
    }
  }
openModalEvaluador()
{
let modal=this.mdctr.create(ModalEvaluadorPage);
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
if(data!=null)
{
  console.log(data);
  let evaluador=new Evaluador();
  evaluador.NOMBRE=data.NOMBRE;
  evaluador.CARGO=data.CARGO;
  evaluador.EMAIL=data.EMAIL;
  evaluador.ORGANIZACION=data.ORGANIZACION;
  evaluador.SEXO=data.SEXO;
  evaluador.TELEFONO=data.TELEFONO;
  evaluador.equiEvaluador=this.equipoEvaluacion;
  evaluador.ESTADOAGREGADO=data.ESTADOAGREGADO;
  this.evaluadores.push(evaluador);
  this.TIENEDATOSEVALUADORES=false;
}
});
modal.present();
}
openModalEntrevistado()
{
let modal=this.mdctr.create(ModalEncuestadoPage);
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
if(data!=null)
{
  console.log(data);
  let entrevistado=new Entrevistado();
  entrevistado.NOMBRE=data.NOMBRE;

  entrevistado.ORGANIZACION=data.ORGANIZACION;
  entrevistado.SEXO=data.SEXO;
  entrevistado.TELEFONO=data.TELEFONO;
  entrevistado.equiEntrevist=this.equipoEvaluacion;
  entrevistado.ESTADOAGREGADO=data.ESTADOAGREGADO;
  entrevistado.IDTIPO=data.IDTIPO;
  this.entrevistados.push(entrevistado);
  this.TIENEENTREVISTADO=false;
}
});
modal.present();
}
openModalEditarEvaluador(i)
{
  let modal=this.mdctr.create(ModalEvaluadorPage,this.evaluadores[i]);
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
  if(data!=null)
  {
    console.log(data);
    let evaluador=new Evaluador();

    evaluador.NOMBRE=data.NOMBRE;
    evaluador.CARGO=data.CARGO;
    evaluador.EMAIL=data.EMAIL;
    evaluador.ORGANIZACION=data.ORGANIZACION;
    // evaluador.equiEvaluador=this.equipoEvaluacion;
    evaluador.SEXO=data.SEXO;
    evaluador.TELEFONO=data.TELEFONO;
    evaluador.ESTADOAGREGADO=data.ESTADOAGREGADO;
    this.evaluadores[i]=evaluador;
    this.TIENEDATOSEVALUADORES=false;
  }
  });
  modal.present();
}
openModalEditarEntrevistado(i)
{
  let modal=this.mdctr.create(ModalEncuestadoPage,this.entrevistados[i]);
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
  if(data!=null)
  {
    console.log(data);
    let entrevistado=new Entrevistado();

    entrevistado.NOMBRE=data.NOMBRE;
    entrevistado.ORGANIZACION=data.ORGANIZACION;
    // entrevistado.equiEntrevist=this.equipoEvaluacion;
    entrevistado.SEXO=data.SEXO;
    entrevistado.TELEFONO=data.TELEFONO;
    entrevistado.ESTADOAGREGADO=data.ESTADOAGREGADO;
    entrevistado.IDTIPO=data.IDTIPO;
    this.entrevistados[i]=entrevistado;
    this.TIENEENTREVISTADO=false;
  }
  });
  modal.present();
}
deleteEvaluador(i)
{
  this.evaluadores.splice(i,1);
  if(this.evaluadores.length==0)
  {
    this.TIENEDATOSEVALUADORES=true; 
  }
}
deleteEntrevistado(i)
{
  this.entrevistados.splice(i,1);
  if(this.entrevistados.length==0)
  {
    this.TIENEENTREVISTADO=true; 
  }
}
async guardar()
{
  let equipoFrom=new EquipoEvaluacion();
  equipoFrom.FECHA=this.equipoEvaluacion.FECHA;
  equipoFrom.HORA=this.equipoEvaluacion.HORA;
  if(this.evaluadores.length>0)
  {
      let evaluadoresForm=new Array<Evaluador>();
      this.evaluadores.forEach(evaluador=>{
      let evaluadorForm=new Evaluador();
      evaluadorForm.NOMBRE=evaluador.NOMBRE;
      evaluadorForm.CARGO=evaluador.CARGO;
      evaluadorForm.EMAIL=evaluador.EMAIL;
      evaluadorForm.ORGANIZACION=evaluador.ORGANIZACION;
      evaluadorForm.SEXO=evaluador.SEXO;
      evaluadorForm.TELEFONO=evaluador.TELEFONO;
      // evaluadorForm.equiEvaluador=this.equipoEvaluacion;
      evaluadorForm.ESTADOAGREGADO=evaluador.ESTADOAGREGADO;
      evaluadoresForm.push(evaluadorForm);
      });
      equipoFrom.evaluadores=evaluadoresForm;

  }else{this.doAlert("Ingrese al menos un Evaluador");return}
  if(this.entrevistados.length>0)
  {
      let entrevistadosForm=new Array<Entrevistado>();
      this.entrevistados.forEach(entrevistado=>{
      let entrevistadoForm=new Entrevistado();
      entrevistadoForm.NOMBRE=entrevistado.NOMBRE;
     
      entrevistadoForm.ORGANIZACION=entrevistado.ORGANIZACION;
      entrevistadoForm.SEXO=entrevistado.SEXO;
      entrevistadoForm.TELEFONO=entrevistado.TELEFONO;
      entrevistadoForm.IDTIPO=entrevistado.IDTIPO;
      // entrevistadoForm.equiEntrevist=this.equipoEvaluacion;
      entrevistadoForm.ESTADOAGREGADO=entrevistado.ESTADOAGREGADO;
      entrevistadosForm.push(entrevistadoForm);
      });
      equipoFrom.entrevistados=entrevistadosForm;

  }else{this.doAlert("Ingrese al menos un Entrevistado");return}
  this.ubicacion.equipo=equipoFrom;
  console.log(this.ubicacion);
  let jsonoObj=new Jsons();
  let ubicaRepository =await getConnection('default').getRepository(Jsons);
  jsonoObj=await ubicaRepository.createQueryBuilder("ubic").where("ubic.id= :id",{id:this.ubicacion.idJson}).getSingleResult();
  jsonoObj.JSON=JSON.stringify(this.ubicacion);
  await ubicaRepository.persist(jsonoObj);
  this.navCtrl.setRoot(MenuFormulaPage,this.ubicacion);
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
