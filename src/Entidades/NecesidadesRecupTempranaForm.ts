import { Table, PrimaryGeneratedColumn,OneToOne,ManyToOne, Column,JoinColumn,OneToMany } from 'ionic-orm'
import {TipoEventosForm} from "../Entidades/TiposEventosForm";
import {SectoresIntervencionForm} from "../Entidades/SectoresIntervencionForm";
import {UbicacionGeografica} from "../Entidades/UbicacionGeografica";
import {TipoTransporteForm} from "../Entidades/TiposTransporteForm";
@Table()
export class NecesidadesRecupTempranaForm {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  IDNECRECU: number;
 
  @Column()
  ESTADOSEL: boolean;

  @ManyToOne(type => UbicacionGeografica, ubicNecRecu => ubicNecRecu.necesidadesRecuForm)
  
  ubicNecRecu: UbicacionGeografica;
}