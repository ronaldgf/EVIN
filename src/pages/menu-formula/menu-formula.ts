import { Component } from '@angular/core';
import {Usuarios} from "../../Entidades/Usuarios";
import { IonicPage, NavController, ToastController ,NavParams,Platform,App,AlertController } from 'ionic-angular';
import {MenuFormularios} from "../../Entidades/MenuFormularios";
import 'rxjs/add/operator/map';
import {UbicacionGeograficaPage} from '../ubicacion-geografica/ubicacion-geografica'
import {FechaTipoeventoPage} from '../fecha-tipoevento/fecha-tipoevento'
import {PoblacionImpactadaPage} from '../poblacion-impactada/poblacion-impactada'
import {PoblacionNecesidadesPage} from '../poblacion-necesidades/poblacion-necesidades'
import {MediosDeVidaPage} from '../medios-de-vida/medios-de-vida'
import {DaniosViviendaPage} from '../danios-vivienda/danios-vivienda'
import {ImpactoEventoAdversoPage} from '../impacto-evento-adverso/impacto-evento-adverso'
import {FormulariosListPage} from '../formularios-list/formularios-list'
import {DaniosInfraestructuraPage} from '../danios-infraestructura/danios-infraestructura'
import {MedioTransportePage} from '../medio-transporte/medio-transporte';
import {SituacionAyudaHumanitariaPage} from '../situacion-ayuda-humanitaria/situacion-ayuda-humanitaria';
import {AfectacionSaludAlimentariaPage} from '../afectacion-salud-alimentaria/afectacion-salud-alimentaria';
import {NecesidadesRespuestaPage} from '../necesidades-respuesta/necesidades-respuesta';
import {ComentariosObservacionesPage} from '../comentarios-observaciones/comentarios-observaciones';
import {EquipoEvaluacionPage} from '../equipo-evaluacion/equipo-evaluacion';
import {DatosInformDaniosPage} from '../datos-inform-danios/datos-inform-danios';
import {MapPositionPage} from '../map-position/map-position';
import {AnexosPage} from '../anexos/anexos';
import {TipoEventosForm} from "../../Entidades/TiposEventosForm";
import {FechaTipoEvento} from "../../Entidades/FechaTipoEvento";
import { createConnection,getConnection,ConnectionManager,Connection } from 'ionic-orm/dist'
import {UbicacionGeografica} from "../../Entidades/UbicacionGeografica";
import {PoblacionImpactadaForm} from "../../Entidades/PoblacionImpactadaForm";
import {DatosInformeDanios} from "../../Entidades/DatosInformeDanios";
import {DetallePobImpactada} from "../../Entidades/DetallePobImpactada";
import {PoblacionNecesidadesEspeForm} from "../../Entidades/PoblacionNecesidadesEspeForm";
import {DetallePoblacionNeceEspe} from "../../Entidades/DetallePoblacionNeceEspe";
import {DetalleMediosVida} from "../../Entidades/DetalleMediosVida";
import {MediosdeVidaForm} from "../../Entidades/MediosdeVidaForm";
import {DaniosViviendaForm} from "../../Entidades/DaniosViviendaForm";
import {DetalleDaniosVivienda} from "../../Entidades/DetalleDaniosVivienda";
import {DaniosInfraestructuraForm} from "../../Entidades/DaniosInfraestructurasForm";
import {DetallaDaniosInfraestructura} from "../../Entidades/DetalleDaniosInfraestructura";
import {TipoTransporteForm} from "../../Entidades/TiposTransporteForm";
import {MediosTransporteForm} from "../../Entidades/MediosTransporteForm";
import {AfectacionSaludAlimentariaForm} from "../../Entidades/AfectacionSaludAlimentariaForm";
import {AccionesRespuestaForm} from "../../Entidades/AccionesRespuestaForm";
import {OrganizacionesForm} from "../../Entidades/OrganizacionesForm";
import {SectoresIntervencionForm} from "../../Entidades/SectoresIntervencionForm";
import {ImpactoEventoAdversoForm} from "../../Entidades/ImpactoEventoAdversoForm";
import {SectoresNecesidadesRespuestaForm} from "../../Entidades/SectoresNecesidadesRespuestaForm";
import {NecesidadesRespuestaForm} from "../../Entidades/NecesidadesRespuestaForm";
import {NecesidadesUrgRRHHForm} from "../../Entidades/NecesidadesUrgRRHHForm";
import {NecesidadesRecupTempranaForm} from "../../Entidades/NecesidadesRecupTempranaForm";
import {ComentarioObservaciones} from "../../Entidades/ComentarioObservaciones";
import {Entrevistado} from "../../Entidades/Entrevistado";
import {Evaluador} from "../../Entidades/Evaluador";
import {EquipoEvaluacion} from "../../Entidades/EquipoEvaluacion";
import {Anexos} from "../../Entidades/Anexos";
import {Jsons} from "../../Entidades/Jsons";
/**
 * Generated class for the MenuFormulaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  
  selector: 'page-menu-formula',
  templateUrl: 'menu-formula.html',
})
export class MenuFormulaPage {
  ubicacionPage=UbicacionGeograficaPage;
  ubicacion=new UbicacionGeografica();
listmenuFormularios=new Array<MenuFormularios>();
pepa ;

constructor(public toastCtrl: ToastController,public tr:AlertController ,public navCtrl: NavController, public navParams: NavParams, public platform:Platform,public app:App) {
  }

  ionViewDidLoad() {
    this.ubicacion=this.navParams.data;
    console.log(this.ubicacion);
    // alert(this.ubicacion.latitud);
   this.platform.ready().then(()=>{
     this.platform.registerBackButtonAction(()=>{
       let nav=this.app.getActiveNav();
if(nav.canGoBack())
{
  // alert('asdas');
}else{this.showConfirm();}
     });
   });
    console.log('ionViewDidLoad MenuFormulaPage');
    this.getDataBase();
   
  }
  async getDataBase()
  {
     
      let menuformulariosRepositor =await getConnection('default').getRepository(MenuFormularios);
      this.listmenuFormularios=await menuformulariosRepositor.find(MenuFormularios);
    
  }
   
  goBack()
  {
    // alert(this.ubicacion.canton);
    this.navCtrl.setRoot(FormulariosListPage,this.ubicacion);
  }
  openPage(componente:string)
  {
    
    console.log(componente);
    let page;
  switch(componente) {
    case '1': {console.log('11');page= UbicacionGeograficaPage;break;}
    case '2': {console.log('11');page= FechaTipoeventoPage;break;}
    case '3': {console.log('11');page= PoblacionImpactadaPage;break;}
    case '4': {console.log('11');page= PoblacionNecesidadesPage;break;}
    case '5': {console.log('11');page= MediosDeVidaPage;break;}
    case '6': {console.log('11');page= DaniosViviendaPage;break;}
    case '7': {console.log('11');page= DaniosInfraestructuraPage;break;}
    case '8': {console.log('11');page= MedioTransportePage;break;}
    case '9': {console.log('11');page= AfectacionSaludAlimentariaPage;break;}
    case '10': {console.log('11');page= SituacionAyudaHumanitariaPage;break;}
    case '11': {console.log('11');page= ImpactoEventoAdversoPage;break;}
    case '12': {console.log('12');page= NecesidadesRespuestaPage;break;}
    case '13': {console.log('12');page= ComentariosObservacionesPage;break;}
    case '14': {console.log('12');page= EquipoEvaluacionPage;break;}
    case '15': {console.log('12');page= AnexosPage;break;}
    case '16': {console.log('12');page= DatosInformDaniosPage;break;}
    
  }
   console.log('asdasd',page);
     this.navCtrl.setRoot(page,this.ubicacion);
  
  }
 async guardarBase()
  {
      if (this.ubicacion!=undefined){
        if(this.ubicacion.fechatipo!=undefined)
        {
          if(this.ubicacion.poblacionImpactada!=undefined)
          {
            if(this.ubicacion.poblacionNecesEspe!=undefined)
            {
              if(this.ubicacion.mediosvidaUbic!=undefined)
              {
                  if(this.ubicacion.medioTransporteForm!=undefined)
                  {
                      if(this.ubicacion.afectacionesSalud!=undefined)
                      {
                        if(this.ubicacion.accionesRespuesta!=undefined && this.ubicacion.organizacionForm!=undefined)
                        {
                          if(this.ubicacion.impactosEventoAdversos!=undefined)
                          {
                            if(this.ubicacion.necesidadRespuestaForm!=undefined && this.ubicacion.necesidadesRecuForm!=undefined && this.ubicacion.necesidadesUrgRRHH!=undefined)
                            {
                              if(this.ubicacion.equipo!=undefined)
                              {
                                if(this.ubicacion.anexos!=undefined)
                                {
                                          
    let ubicacion=new UbicacionGeografica();
    ubicacion.canton=this.ubicacion.canton;
       ubicacion.direccion=this.ubicacion.direccion;
       ubicacion.distancia=this.ubicacion.distancia;
       ubicacion.latitud=this.ubicacion.latitud;
       ubicacion.longitud=this.ubicacion.longitud;
       ubicacion.parroquia=this.ubicacion.parroquia;
      ubicacion.provincia=this.ubicacion.provincia;
       ubicacion.tiempo=this.ubicacion.tiempo;
       ubicacion.tipoParroquia=this.ubicacion.tipoParroquia;
       ubicacion.punto=this.ubicacion.punto;
       ubicacion.estado="P";
       ubicacion.accesibilidad=this.ubicacion.accesibilidad;
       ubicacion.altitud=this.ubicacion.altitud;
       ubicacion.zona=this.ubicacion.zona;
       ubicacion.distrito=this.ubicacion.distrito;
       ubicacion.evento=this.ubicacion.evento;
       let usuarioRepository =await getConnection('default').getRepository(Usuarios);
       let usuarioLogin =new Usuarios();
       usuarioLogin=await usuarioRepository.createQueryBuilder("usuario").where("usuario.ESTADOLOGUEO= :user",{user:true}).getSingleResult();
       ubicacion.usuario=usuarioLogin.ID;
       let tipoeventof=new Array<TipoEventosForm>();
       tipoeventof=this.ubicacion.fechatipo.tiposEve;
       this.ubicacion.fechatipo.tiposEve=undefined;
       let fecha=new FechaTipoEvento();
        fecha=this.ubicacion.fechatipo;
        fecha.ubicacionGeo=undefined;
        tipoeventof.forEach(t=>{
          t.fechaTipoEventos=undefined;
        });
        fecha.tiposEve=tipoeventof;
        ubicacion.fechatipo=fecha;
        let detallespobIm=new Array<DetallePobImpactada>();
                  let pobImpactadas=new Array<PoblacionImpactadaForm>();
                   this.ubicacion.poblacionImpactada.forEach(pobimp=>{
                    let detallepobim=new DetallePobImpactada();
                    detallepobim=pobimp.detalle;
                    detallepobim.poblacionImpac=undefined;
                    pobimp.detalle=detallepobim;
                    pobimp.ubicPoblacion=undefined;
                    pobImpactadas.push(pobimp);
                    
                  });
                  ubicacion.poblacionImpactada=pobImpactadas;
              let detallesPobNece=new Array<DetallePoblacionNeceEspe>();
                                        let pobNecesForm=new Array<PoblacionNecesidadesEspeForm>();
                                          this.ubicacion.poblacionNecesEspe.forEach(pobnece=>{
                                          let detllaeNeceForm=new DetallePoblacionNeceEspe();
                                          detllaeNeceForm=pobnece.detalleNeceEspe;
                                          detllaeNeceForm.poblacionNeceEsp=undefined;
                                          pobnece.detalleNeceEspe=detllaeNeceForm;
                                          pobnece.ubicPoblacionNeceEspe=undefined;
                                          pobNecesForm.push(pobnece);
                                          
                                          
                                        });
                                        ubicacion.poblacionNecesEspe=pobNecesForm;

                                        let detallesmedio=new Array<DetalleMediosVida>();
                                                   let mediosdeVida=new Array<MediosdeVidaForm>();
                                                     this.ubicacion.mediosvidaUbic.forEach(medio=>{
                                                     let detalleMedio=new DetalleMediosVida();
                                                     detalleMedio=medio.detalleMedios;
                                                     detalleMedio.mediosdeVida=undefined;
                                                     medio.detalleMedios=detalleMedio;
                                                     medio.ubicMediosVida=undefined;
                                                     mediosdeVida.push(medio);
                                                     
                                                     
                                                   });
                                                   ubicacion.mediosvidaUbic=mediosdeVida;
                                                   let detallesDanios=new Array<DetalleDaniosVivienda>();
                                                               let daniosVivienda=new Array<DaniosViviendaForm>();
                                                                 this.ubicacion.viviendaForm.forEach(danio=>{
                                                                 let detalleDanio=new DetalleDaniosVivienda();
                                                                 detalleDanio=danio.detalleDaniosVivienda;
                                                                 detalleDanio.daniosViviendaForm=undefined;
                                                                 danio.detalleDaniosVivienda=detalleDanio;
                                                                 danio.ubicda=undefined;
                                                                 daniosVivienda.push(danio);
                                                                 
                                                                 
                                                               });
                        ubicacion.viviendaForm=daniosVivienda;
                        let detallesInfraestructuras=new Array<DetallaDaniosInfraestructura>();
                        let daniosInfraestructuras=new Array<DaniosInfraestructuraForm>();
                        this.ubicacion.daniosInfra.forEach(danio=>{
                        let detalleDanio=new DetallaDaniosInfraestructura();
                        detalleDanio=danio.detalleInfra;
                        detalleDanio.daniosInfraestructura=undefined;
                        danio.detalleInfra=detalleDanio;
                        danio.ubicInfra=undefined;
                        daniosInfraestructuras.push(danio);                                                       
                         });
                         ubicacion.daniosInfra=daniosInfraestructuras;

                         let tiposTransporte=new Array<TipoTransporteForm>();
                        tiposTransporte=this.ubicacion.medioTransporteForm.tiposTransporteForm;
                        let mediotransporte=new MediosTransporteForm();
                                       mediotransporte=this.ubicacion.medioTransporteForm;
                                       
                                       mediotransporte.ubicmedioTransp=undefined;
                                       
                                       tiposTransporte.forEach(tipo=>{
                                         tipo.medioTransporteForm=undefined;
                                       });
                                       mediotransporte.tiposTransporteForm=tiposTransporte;
                                       ubicacion.medioTransporteForm=mediotransporte;
                                       
                                       let afectaciones=new Array<AfectacionSaludAlimentariaForm>();
                                       afectaciones=this.ubicacion.afectacionesSalud;
                                       afectaciones.forEach(afect=>{
                                       afect.ubicAfectSalud=undefined;   
                                          
                                                     });                            
                                                     ubicacion.afectacionesSalud=afectaciones;

let organizacionesForm=new Array<OrganizacionesForm>();
                                            let acciones=new Array<AccionesRespuestaForm>();
                                            acciones=this.ubicacion.accionesRespuesta;
                                            organizacionesForm=this.ubicacion.organizacionForm;
                                            acciones=this.ubicacion.accionesRespuesta;
                                            let sectoresintervencion=new Array<SectoresIntervencionForm>();
                                            
                                            organizacionesForm.forEach(orga=>{
                                            orga.ubicOrganiza=undefined;
                                            sectoresintervencion=orga.sectoresIntervencion;
                                            orga.sectoresIntervencion=undefined;
                                            sectoresintervencion.forEach(sector=>{
                                              sector.orgSectoresInter=undefined;  
                                            });
                                            orga.sectoresIntervencion=sectoresintervencion;      
                                            });  
                                            acciones.forEach(acc=>{
                                               acc.ubicAcciones=undefined;   
                                            });

                                            ubicacion.accionesRespuesta=acciones;
                                            ubicacion.organizacionForm=organizacionesForm;

let impactosadversos=new Array<ImpactoEventoAdversoForm>();
                                            impactosadversos=this.ubicacion.impactosEventoAdversos;
                                            impactosadversos.forEach(impc=>{
                                              impc.ubicImpacto=undefined;
                                            });
                                            ubicacion.impactosEventoAdversos=impactosadversos;
                                            let necesidadesRespuestasForm=new NecesidadesRespuestaForm();
                                                          let necesidadesRecupForm=new Array<NecesidadesRecupTempranaForm>();
                                                          let necesidadesUrgRRHHForm=new Array<NecesidadesUrgRRHHForm>();
                                                          let sectoresNecesidadesForm=new Array<SectoresNecesidadesRespuestaForm>();
                                                          necesidadesRespuestasForm=this.ubicacion.necesidadRespuestaForm;
                                                          sectoresNecesidadesForm=necesidadesRespuestasForm.sectoresRespuestaForm;
                                                          necesidadesRespuestasForm.ubicNeceRespuestaForm=undefined;
                                                          
                                                          
                                                          sectoresNecesidadesForm.forEach(sector=>
                                                          {
                                                             sector.neceSecRespuesta=undefined; 
                                                          });
                                                          necesidadesRespuestasForm.sectoresRespuestaForm=sectoresNecesidadesForm;
                                                          ubicacion.necesidadRespuestaForm=necesidadesRespuestasForm;

                                                            necesidadesRecupForm=this.ubicacion.necesidadesRecuForm;
                                                            necesidadesRecupForm.forEach(neceRecuF=>{
                                                              neceRecuF.ubicNecRecu=undefined;
                                                            });
                                                          ubicacion.necesidadesRecuForm=necesidadesRecupForm
              
                                                            necesidadesUrgRRHHForm=this.ubicacion.necesidadesUrgRRHH;
                                                            necesidadesUrgRRHHForm.forEach(neceURgRRH=>{
                                                              neceURgRRH.ubicNecUrg=undefined;
                                                            });
                                                            ubicacion.necesidadesUrgRRHH=necesidadesUrgRRHHForm;

                                                            let comentario=new ComentarioObservaciones();
                                                                            comentario=this.ubicacion.comentarioObservacion;
                                                                            comentario.ubicComentario=undefined;
                                                                            ubicacion.comentarioObservacion=comentario;

let equipoEvaluacion=new EquipoEvaluacion();
                                            equipoEvaluacion=this.ubicacion.equipo; 
                                            let evaluadores=new Array<Evaluador>();
                                            let entrevistados=new Array<Entrevistado>();
                                            evaluadores=equipoEvaluacion.evaluadores;
                                            entrevistados=equipoEvaluacion.entrevistados;
                                            equipoEvaluacion.entrevistados=undefined;
                                            equipoEvaluacion.evaluadores=undefined;
                                            equipoEvaluacion.ubicEquipo=undefined;
                                            equipoEvaluacion.ESTADOAGREGADO=true;
                                            

                                            evaluadores.forEach(evaluador=>{
                                              evaluador.equiEvaluador=undefined;

                                            });
                                            equipoEvaluacion.evaluadores=evaluadores;
                                            
                                            entrevistados.forEach(entrevistado=>{
                                              entrevistado.equiEntrevist=undefined;
                                            });                                                                            
                                                          
                                            equipoEvaluacion.entrevistados=entrevistados;
                                            ubicacion.equipo=equipoEvaluacion;
let datosInforDanios=new DatosInformeDanios();
                                            datosInforDanios=this.ubicacion.datosInformDanio;
                                             datosInforDanios.ubicInformDanio=undefined;
                                             ubicacion.datosInformDanio=datosInforDanios                                           
                                            // ubicacion.anexos=anexos;
                                      
    // console.log(ubicacion);
    // console.log(JSON.stringify(ubicacion));
    // alert(JSON.stringify(ubicacion));
    let jsonOb=new Jsons();
     let jsonRepository=await getConnection('default').getRepository(Jsons);
     jsonOb=await jsonRepository.createQueryBuilder("ubic").where("ubic.id= :id",{id:this.ubicacion.idJson}).getSingleResult();
                                  
                                  jsonOb.ESTADO='P';
                                  jsonOb.USUARIO=ubicacion.usuario;
                                  jsonOb.JSON=JSON.stringify(ubicacion);
                                  await jsonRepository.persist(jsonOb);
                                  // await alert(jsonOb.id);
                                  let anexos=new Array<Anexos>();
                                  anexos=this.ubicacion.anexos;
                                  anexos.forEach( async aneo=>{
                                    aneo.ubicAnexos=undefined;
                                    aneo.IDJSON=await jsonOb.id;
                                    
                                   
                                  });
                                  // await alert(anexos.length);
                                  let anexosRepository =await getConnection('default').getRepository(Anexos);
                                 await anexosRepository.persist(anexos);
            
                                }else{this.doAlert("Adjunte Anexos");return;}

                              }else{this.doAlert("Ingrese Equipo de Evaluación");return;}

                            }else{this.doAlert("Ingrese Necesidades de Respuesta");return;}
                            
                          }else{this.doAlert("Ingrese Impacto del Evento Adverso");return;}

                        }else{this.doAlert("Ingrese situación de Ayuda Humanitaria");return;}

                      } else{this.doAlert("Ingrese Afectación a Sectores de Salud y Alimentación");return;} 
                  }else{this.doAlert("Ingrese un Medio de Transporte");return}

              }else{this.doAlert("Ingrese Afectación a los Medios de Vida");return;}

            }else{this.doAlert("Ingrese población con Necesidades Especiales"); return;}

          }else{this.doAlert("Ingrese población Impactada");return;}

        }else{this.doAlert("Ingrese Fecha y Tipo de Eventos");return;}

      }else
      {
        this.doAlert("Ingrese datos de ubicación geográfica");
        return;
      }

    
  //   this.doAlert(JSON.stringify(await ubicaRepository.createQueryBuilder("ubic")
  //  .getCount()));
  //   this.doAlert(JSON.stringify(await fechatipoRepository.createQueryBuilder("fecha")
  //  .getCount()));
  //   this.doAlert(JSON.stringify(await tipoEventRepository.createQueryBuilder("tipo")
  //  .getCount()));

  //  this.pepa=await JSON.stringify( getConnection('default').createEntityManagerWithSingleDatabaseConnection().createQueryBuilder(UbicacionGeografica,"ubic")
  //  .innerJoinAndSelect("ubic.fechatipo","fechatipo")
  //  .innerJoinAndSelect("fechatipo.tiposEve","tiposEve")
  //  .innerJoinAndSelect("ubic.poblacionImpactada","poblacionImpactada")
  //  .innerJoinAndSelect("poblacionImpactada.detalle","detalle")
  //  .innerJoinAndSelect("ubic.poblacionNecesEspe","poblacionNecesEspe")
  //  .innerJoinAndSelect("poblacionNecesEspe.detalleNeceEspe","detalleNeceEspe")
  //  .innerJoinAndSelect("ubic.mediosvidaUbic","mediosvidaUbic")
  //  .innerJoinAndSelect("mediosvidaUbic.detalleMedios","detalleMedios")
  //  .innerJoinAndSelect("ubic.viviendaForm","viviendaForm")
  //  .innerJoinAndSelect("viviendaForm.detalleDaniosVivienda","detalleDaniosVivienda")
  //  .innerJoinAndSelect("ubic.daniosInfra","daniosInfra")
  //  .innerJoinAndSelect("daniosInfra.detalleInfra","detalleInfra")
  //  .innerJoinAndSelect("ubic.medioTransporteForm","medioTransporteForm")
  //  .innerJoinAndSelect("medioTransporteForm.tiposTransporteForm","tiposTransporteForm")
  //  .innerJoinAndSelect("ubic.afectacionesSalud","afectacionesSalud")
  //  .innerJoinAndSelect("ubic.organizacionForm","organizacionForm")
  //  .innerJoinAndSelect("organizacionForm.sectoresIntervencion","sectoresIntervencion")
  //  .innerJoinAndSelect("ubic.accionesRespuesta","accionesRespuesta")
  //  .innerJoinAndSelect("ubic.impactosEventoAdversos","impactosEventoAdversos")
  //  .innerJoinAndSelect("ubic.necesidadRespuestaForm","necesidadRespuestaForm")
  //  .innerJoinAndSelect("necesidadRespuestaForm.sectoresRespuestaForm","sectoresRespuestaForm")
  //  .innerJoinAndSelect("ubic.necesidadesUrgRRHH","necesidadesUrgRRHH")
  //  .innerJoinAndSelect("ubic.necesidadesRecuForm","necesidadesRecuForm")
  //  .innerJoinAndSelect("ubic.comentarioObservacion","comentarioObservacion")
  //  .innerJoinAndSelect("ubic.equipo","equipo")
  //  .innerJoinAndSelect("equipo.evaluadores","evaluadores")
  //  .innerJoinAndSelect("equipo.entrevistados","entrevistados")
  //  .innerJoinAndSelect("ubic.anexos","anexos").where("ubic.id=:id",{id:1})
  //  .getResults());
  //   // this.doAlert(this.pepa);
  // console.log(this.ubacionjs);
      

    this.showToastWithCloseButton();
    this.goBack();
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
  showConfirm() {
    let confirm = this.tr.create({
      title: 'Formulario',
      message: '¿Está seguro de salir?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.goBack();
          }
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
    });
    confirm.present();
  }
  showToastWithCloseButton() {
    const toast = this.toastCtrl.create({
      message: 'Formulario Guardado Correctamente',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }
}
