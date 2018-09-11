import { Table, OneToOne,PrimaryGeneratedColumn, Column,JoinColumn,OneToMany,ManyToOne } from 'ionic-orm'
import {TipoEventos} from "../Entidades/TiposEventos";
import {FechaTipoEvento} from "../Entidades/FechaTipoEvento";
import {PoblacionImpactadaForm} from "../Entidades/PoblacionImpactadaForm";
import {PoblacionNecesidadesEspeForm} from "../Entidades/PoblacionNecesidadesEspeForm";
import {MediosdeVidaForm} from "../Entidades/MediosdeVidaForm";
import {DaniosViviendaForm} from "../Entidades/DaniosViviendaForm";
import {DaniosInfraestructuraForm} from "../Entidades/DaniosInfraestructurasForm";
import {MediosTransporteForm} from "../Entidades/MediosTransporteForm";
import {AfectacionSaludAlimentariaForm} from "../Entidades/AfectacionSaludAlimentariaForm";
import {Evaluador} from "../Entidades/Evaluador";
import {Entrevistado} from "../Entidades/Entrevistado";
import {UbicacionGeografica} from "../Entidades/UbicacionGeografica";
@Table()
export class Jsons {

  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  JSON: string;
  
  @Column()
  ESTADO: string;

  @Column({nullabe:true})
  USUARIO: number;

  @Column({nullable:true})
  IDUBICBASE: number;
  @Column({nullable:true})
  DOCUMENT: string;
//   @ManyToOne(type => UbicacionGeografica, ubicAfe => ubicAfe.accionesRespuesta)
  
//   ubicAcciones: UbicacionGeografica;
  
}