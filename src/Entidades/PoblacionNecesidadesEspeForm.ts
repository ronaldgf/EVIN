import { Table, PrimaryGeneratedColumn,OneToOne,ManyToOne, Column,JoinColumn,OneToMany } from 'ionic-orm'
import {TipoEventosForm} from "../Entidades/TiposEventosForm";
import {DetallePoblacionNeceEspe} from "../Entidades/DetallePoblacionNeceEspe";
import {UbicacionGeografica} from "../Entidades/UbicacionGeografica";
@Table()
export class PoblacionNecesidadesEspeForm {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  IDTIPO: number;

  @OneToOne(type => DetallePoblacionNeceEspe, detalleNeceEspe => detalleNeceEspe.poblacionNeceEsp)
  detalleNeceEspe: DetallePoblacionNeceEspe;
 
  @ManyToOne(type => UbicacionGeografica, ubic => ubic.poblacionNecesEspe)
  
  ubicPoblacionNeceEspe: UbicacionGeografica;
  
  
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