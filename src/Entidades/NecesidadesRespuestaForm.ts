import { Table, PrimaryGeneratedColumn,OneToOne,ManyToOne, Column,JoinColumn,OneToMany } from 'ionic-orm'
import {TipoEventosForm} from "../Entidades/TiposEventosForm";
import {SectoresIntervencionForm} from "../Entidades/SectoresIntervencionForm";
import {UbicacionGeografica} from "../Entidades/UbicacionGeografica";
import {SectoresNecesidadesRespuestaForm} from "../Entidades/SectoresNecesidadesRespuestaForm";
@Table()
export class NecesidadesRespuestaForm {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  NUMEROHOGARES: number;
 
  @Column()
  DIAS: number;

  @OneToMany(type => SectoresNecesidadesRespuestaForm, sectoreRespuesta => sectoreRespuesta.neceSecRespuesta) 
  // note: we will create author property in the Photo class below
  sectoresRespuestaForm: SectoresNecesidadesRespuestaForm[];

  @OneToOne(type => UbicacionGeografica, ubicNece => ubicNece.necesidadRespuestaForm)
  @JoinColumn()
  ubicNeceRespuestaForm: UbicacionGeografica;
}