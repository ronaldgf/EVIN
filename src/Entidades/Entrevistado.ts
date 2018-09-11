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
import {EquipoEvaluacion} from "../Entidades/EquipoEvaluacion";
import {UbicacionGeografica} from "../Entidades/UbicacionGeografica";
@Table()
export class Entrevistado {

  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  NOMBRE: string;
  
  @Column()
  SEXO: string;

  @Column()
  ORGANIZACION: string;

  @Column()
  TELEFONO: string;

 
  @Column({nullabe:true})
  ESTADOAGREGADO: boolean;

  @Column()
  IDTIPO: number;
  
  @ManyToOne(type => EquipoEvaluacion, eqEntr => eqEntr.entrevistados)
  
  equiEntrevist: EquipoEvaluacion;
//   @ManyToOne(type => UbicacionGeografica, ubicAfe => ubicAfe.accionesRespuesta)
  
//   ubicAcciones: UbicacionGeografica;
  
}