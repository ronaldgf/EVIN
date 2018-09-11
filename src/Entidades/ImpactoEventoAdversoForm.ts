import { Table, PrimaryGeneratedColumn,OneToOne,ManyToOne, Column,JoinColumn,OneToMany } from 'ionic-orm'
import {TipoEventosForm} from "../Entidades/TiposEventosForm";
import {SectoresIntervencionForm} from "../Entidades/SectoresIntervencionForm";
import {UbicacionGeografica} from "../Entidades/UbicacionGeografica";
import {TipoTransporteForm} from "../Entidades/TiposTransporteForm";
@Table()
export class ImpactoEventoAdversoForm {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  IDIMP: number;
 
  @Column()
  ESTADOSEL: boolean;

  @ManyToOne(type => UbicacionGeografica, ubicImp => ubicImp.impactosEventoAdversos)
  
  ubicImpacto: UbicacionGeografica;
}