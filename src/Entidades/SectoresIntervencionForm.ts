import { Table, PrimaryGeneratedColumn,OneToOne,ManyToOne, Column,JoinColumn,OneToMany } from 'ionic-orm'
import {TipoEventosForm} from "../Entidades/TiposEventosForm";
import {DetalleMediosVida} from "../Entidades/DetalleMediosVida";
import {UbicacionGeografica} from "../Entidades/UbicacionGeografica";
import {OrganizacionesForm} from "../Entidades/OrganizacionesForm";
@Table()
export class SectoresIntervencionForm {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  IDSECTOR: number;
  @ManyToOne(type => OrganizacionesForm, orgSectore => orgSectore.sectoresIntervencion)
  
  orgSectoresInter: OrganizacionesForm;
}