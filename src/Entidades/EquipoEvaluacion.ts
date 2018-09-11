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
export class EquipoEvaluacion {

  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  FECHA: string;
  
  @Column()
  HORA: string;


 
  @Column({nullable:true})
  ESTADOAGREGADO: boolean;


  @OneToMany(type => Evaluador, evalua => evalua.equiEvaluador) 
  // note: we will create author property in the Photo class below
  evaluadores: Evaluador[];

  @OneToMany(type => Entrevistado, entrev => entrev.equiEntrevist) 
  // note: we will create author property in the Photo class below
  entrevistados: Entrevistado[];

  @OneToOne(type => UbicacionGeografica, ubicEqu => ubicEqu.equipo)
  @JoinColumn()
  ubicEquipo: UbicacionGeografica;
//   @ManyToOne(type => UbicacionGeografica, ubicAfe => ubicAfe.accionesRespuesta)
  
//   ubicAcciones: UbicacionGeografica;
  
}