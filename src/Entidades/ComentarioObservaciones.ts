import { Table, PrimaryGeneratedColumn,OneToOne,ManyToOne, Column,JoinColumn,OneToMany } from 'ionic-orm'
import {TipoEventosForm} from "../Entidades/TiposEventosForm";
import {DetalleDaniosVivienda} from "../Entidades/DetalleDaniosVivienda";
import {UbicacionGeografica} from "../Entidades/UbicacionGeografica";
@Table()
export class ComentarioObservaciones {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true})
  COMENTARIO: string;
  @OneToOne(type => UbicacionGeografica, ubicComen => ubicComen.comentarioObservacion)
  @JoinColumn()
  ubicComentario: UbicacionGeografica;
}