import { Table, PrimaryGeneratedColumn,OneToOne,ManyToOne, Column,JoinColumn,OneToMany } from 'ionic-orm'
import {TipoEventosForm} from "../Entidades/TiposEventosForm";
import {SectoresIntervencionForm} from "../Entidades/SectoresIntervencionForm";
import {UbicacionGeografica} from "../Entidades/UbicacionGeografica";
import {NecesidadesRespuestaForm} from "../Entidades/NecesidadesRespuestaForm";
@Table()
export class SectoresNecesidadesRespuestaForm {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  IDSECTOR: number;
 
  @Column()
  CANTIDAD: number;
  @ManyToOne(type => NecesidadesRespuestaForm, neceRespForm => neceRespForm.sectoresRespuestaForm)
  
  neceSecRespuesta: NecesidadesRespuestaForm;
  
}