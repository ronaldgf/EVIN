import { Table, PrimaryGeneratedColumn,OneToOne,ManyToOne, Column,JoinColumn,OneToMany } from 'ionic-orm'
import {TipoEventosForm} from "../Entidades/TiposEventosForm";
import {SectoresIntervencionForm} from "../Entidades/SectoresIntervencionForm";
import {UbicacionGeografica} from "../Entidades/UbicacionGeografica";
import {TipoTransporteForm} from "../Entidades/TiposTransporteForm";
@Table()
export class OrganizacionesForm {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  IDORG: number;
  @Column()
  OBSERVACIONES: string;
  @OneToMany(type => SectoresIntervencionForm, sectoreInter => sectoreInter.orgSectoresInter) 
  // note: we will create author property in the Photo class below
  sectoresIntervencion: SectoresIntervencionForm[];

  @ManyToOne(type => UbicacionGeografica, ubicOrg => ubicOrg.organizacionForm)
  
  ubicOrganiza: UbicacionGeografica;
}