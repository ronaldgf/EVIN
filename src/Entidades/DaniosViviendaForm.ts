import { Table, PrimaryGeneratedColumn,OneToOne,ManyToOne, Column,JoinColumn,OneToMany } from 'ionic-orm'
import {TipoEventosForm} from "../Entidades/TiposEventosForm";
import {DetalleDaniosVivienda} from "../Entidades/DetalleDaniosVivienda";
import {UbicacionGeografica} from "../Entidades/UbicacionGeografica";
@Table()
export class DaniosViviendaForm {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  IDTIPO: number;

  @OneToOne(type => DetalleDaniosVivienda, detalleDanios => detalleDanios.daniosViviendaForm)
  detalleDaniosVivienda: DetalleDaniosVivienda;
 
  @ManyToOne(type => UbicacionGeografica, u => u.viviendaForm)
  ubicda: UbicacionGeografica;
  







//   @OneToMany(type => TipoEventosForm, tipo => tipo.fechaTipoEventos) 
//   // note: we will create author property in the Photo class below
//   tiposEve: TipoEventosForm[];

  // @ManyToOne(type => UbicacionGeografica, ubica => ubica.fechasTipoEvento)
  
  // ubicacion: UbicacionGeografica;
  // @OneToOne(type => UbicacionGeografica)
  // @JoinColumn()
  // ubicacion: UbicacionGeografica;
//   @OneToOne(type => UbicacionGeografica, ubicacion => ubicacion.fechatipo)
//   @JoinColumn()
//   ubicacionGeo: UbicacionGeografica;
}