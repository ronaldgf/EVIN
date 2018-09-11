import { Table, PrimaryGeneratedColumn,OneToOne,ManyToOne, Column,JoinColumn,OneToMany } from 'ionic-orm'
import {TipoEventosForm} from "../Entidades/TiposEventosForm";
import {UbicacionGeografica} from "../Entidades/UbicacionGeografica";
@Table()
export class FechaTipoEvento {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: "20" })
  FECHA: string;

  @Column({ length: "20" })
  HORA: string;
  
  @Column()
  DESCR_ADVERSO: string;

  @Column()
  EVENTO_GENERADOR: string;

  @Column()
  EFECTOS_SECUNDARIOS: string;
  
  @Column()
  POSIBLES_AMENAZAS: string;

  
  @OneToMany(type => TipoEventosForm, tipo => tipo.fechaTipoEventos) 
  // note: we will create author property in the Photo class below
  tiposEve: TipoEventosForm[];

  // @ManyToOne(type => UbicacionGeografica, ubica => ubica.fechasTipoEvento)
  
  // ubicacion: UbicacionGeografica;
  // @OneToOne(type => UbicacionGeografica)
  // @JoinColumn()
  // ubicacion: UbicacionGeografica;
  @OneToOne(type => UbicacionGeografica, ubicacion => ubicacion.fechatipo)
  @JoinColumn()
  ubicacionGeo: UbicacionGeografica;
}