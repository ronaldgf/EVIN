import { Table, OneToOne,PrimaryGeneratedColumn, Column,JoinColumn,OneToMany } from 'ionic-orm'
import {TipoEventos} from "../Entidades/TiposEventos";
import {FechaTipoEvento} from "../Entidades/FechaTipoEvento";
import {PoblacionImpactadaForm} from "../Entidades/PoblacionImpactadaForm";
import {PoblacionNecesidadesEspeForm} from "../Entidades/PoblacionNecesidadesEspeForm";
import {MediosdeVidaForm} from "../Entidades/MediosdeVidaForm";
import {DaniosViviendaForm} from "../Entidades/DaniosViviendaForm";
import {DaniosInfraestructuraForm} from "../Entidades/DaniosInfraestructurasForm";
import {MediosTransporteForm} from "../Entidades/MediosTransporteForm";
import {AfectacionSaludAlimentariaForm} from "../Entidades/AfectacionSaludAlimentariaForm";
import {OrganizacionesForm} from "../Entidades/OrganizacionesForm";
import {AccionesRespuestaForm} from "../Entidades/AccionesRespuestaForm";
import {ImpactoEventoAdversoForm} from "../Entidades/ImpactoEventoAdversoForm";
import {NecesidadesRespuestaForm} from "../Entidades/NecesidadesRespuestaForm";
import {NecesidadesUrgRRHHForm} from "../Entidades/NecesidadesUrgRRHHForm";
import {NecesidadesRecupTempranaForm} from "../Entidades/NecesidadesRecupTempranaForm";
import {ComentarioObservaciones} from "../Entidades/ComentarioObservaciones";
import {DatosInformeDanios} from "../Entidades/DatosInformeDanios";
import {EquipoEvaluacion} from "../Entidades/EquipoEvaluacion";
import {Anexos} from "../Entidades/Anexos";
@Table()  
export class UbicacionGeografica {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: "500" })
  provincia: string;

  @Column({ length: "500" })
  canton: string;
  
  @Column({ length: "500" })
  parroquia: string;

  @Column({ length: "100" })
  direccion: string;


  @Column({ length: "10" })
  tipoParroquia: string;
  
  @Column({ length: "10" })
  distancia: string;

  @Column({ length: "10" })
  tiempo: string;

  @Column({ length: "10" })
  punto: string;

  @Column()
  latitud: number;

  @Column()
  longitud: number;

  @Column()
  altitud: number;

  @Column()
  accesibilidad: string;

  @Column()
  zona: string;
  @Column()
  distrito: string;
  @Column({ length: "10" })
  estado: string;

  @Column({nullable:true})
  usuario: number;

  @Column({nullable:true})
  idUbicBase: number;

  @Column({nullable:true})
  evento: string;
  @Column({nullable:true})
  documento: string;

  @Column({nullable:true})
  idJson: number;
  
  @Column({nullable:true})
  selCheck: boolean;
  // @OneToMany(type =>FechaTipoEvento , fechaTip => fechaTip.ubicacion) 
  // // note: we will create author property in the Photo class below
  // fechasTipoEvento: FechaTipoEvento[];
  @OneToOne(type => FechaTipoEvento, fechatipo => fechatipo.ubicacionGeo)
fechatipo: FechaTipoEvento;
@OneToMany(type => PoblacionImpactadaForm, poblacionImpac => poblacionImpac.ubicPoblacion) 
// note: we will create author property in the Photo class below
poblacionImpactada: PoblacionImpactadaForm[];

@OneToMany(type => PoblacionNecesidadesEspeForm, poblacionNeceEspe => poblacionNeceEspe.ubicPoblacionNeceEspe) 
// note: we will create author property in the Photo class below
poblacionNecesEspe: PoblacionNecesidadesEspeForm[];


@OneToMany(type => MediosdeVidaForm, mediosVidaF => mediosVidaF.ubicMediosVida) 
// note: we will create author property in the Photo class below
mediosvidaUbic: MediosdeVidaForm[];


@OneToMany(type => DaniosViviendaForm, d => d.ubicda) 
viviendaForm: DaniosViviendaForm[];

@OneToMany(type => DaniosInfraestructuraForm, d => d.ubicInfra) 
daniosInfra: DaniosInfraestructuraForm[];

@OneToOne(type => MediosTransporteForm, medioTranspor => medioTranspor.ubicmedioTransp)
medioTransporteForm: MediosTransporteForm;

@OneToMany(type => AfectacionSaludAlimentariaForm, afectSal => afectSal.ubicAfectSalud) 
afectacionesSalud: AfectacionSaludAlimentariaForm[];

@OneToMany(type => OrganizacionesForm, organizaF => organizaF.ubicOrganiza) 
organizacionForm: OrganizacionesForm[];

@OneToMany(type => AccionesRespuestaForm, acciones => acciones.ubicAcciones) 
// note: we will create author property in the Photo class below
accionesRespuesta: AccionesRespuestaForm[];
@OneToMany(type => ImpactoEventoAdversoForm, impacto => impacto.ubicImpacto) 
// note: we will create author property in the Photo class below
impactosEventoAdversos: ImpactoEventoAdversoForm[];

@OneToOne(type => NecesidadesRespuestaForm, neceRespF => neceRespF.ubicNeceRespuestaForm)
necesidadRespuestaForm: NecesidadesRespuestaForm;


@OneToMany(type => NecesidadesUrgRRHHForm, neceUrgRhh => neceUrgRhh.ubicNecUrg) 
// note: we will create author property in the Photo class below
necesidadesUrgRRHH: NecesidadesUrgRRHHForm[];

@OneToMany(type => NecesidadesRecupTempranaForm, neceRecuF => neceRecuF.ubicNecRecu) 
// note: we will create author property in the Photo class below
necesidadesRecuForm: NecesidadesRecupTempranaForm[];

@OneToOne(type => ComentarioObservaciones, comentObs => comentObs.ubicComentario)
comentarioObservacion: ComentarioObservaciones;

@OneToOne(type => EquipoEvaluacion, equi => equi.ubicEquipo)
equipo: EquipoEvaluacion;

@OneToMany(type => Anexos, anex => anex.ubicAnexos)
anexos: Anexos[];

@OneToOne(type => DatosInformeDanios, informeDan => informeDan.ubicInformDanio)
datosInformDanio: DatosInformeDanios;
}