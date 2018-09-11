import { Table, PrimaryGeneratedColumn,OneToOne,ManyToOne, Column,JoinColumn,OneToMany } from 'ionic-orm'
import {TipoEventosForm} from "../Entidades/TiposEventosForm";
import {SectoresIntervencionForm} from "../Entidades/SectoresIntervencionForm";
import {UbicacionGeografica} from "../Entidades/UbicacionGeografica";
import {TipoTransporteForm} from "../Entidades/TiposTransporteForm";
@Table()
export class NecesidadesUrgRRHHForm {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  IDNECRRHH: number;
 
  @Column()
  ESTADOSEL: boolean;

  @ManyToOne(type => UbicacionGeografica, ubicNecUrg => ubicNecUrg.necesidadesUrgRRHH)
  
  ubicNecUrg: UbicacionGeografica;
}