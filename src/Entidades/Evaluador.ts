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
export class Evaluador {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: "100" })
  CARGO: string;

  @Column()
  NOMBRE: string;
  
  @Column()
  SEXO: string;

  @Column()
  ORGANIZACION: string;

  @Column()
  TELEFONO: string;

  @Column()
  EMAIL: string;

  @Column({nullabe:true})
  ESTADOAGREGADO: boolean;

  @ManyToOne(type => EquipoEvaluacion, eqEval => eqEval.evaluadores)
  
  equiEvaluador: EquipoEvaluacion;
  
}