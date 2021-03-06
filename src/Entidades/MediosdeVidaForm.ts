import { Table, PrimaryGeneratedColumn,OneToOne,ManyToOne, Column,JoinColumn,OneToMany } from 'ionic-orm'
import {TipoEventosForm} from "../Entidades/TiposEventosForm";
import {DetalleMediosVida} from "../Entidades/DetalleMediosVida";
import {UbicacionGeografica} from "../Entidades/UbicacionGeografica";
@Table()
export class MediosdeVidaForm {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  IDTIPO: number;

  @OneToOne(type => DetalleMediosVida, detallemedios => detallemedios.mediosdeVida)
  detalleMedios: DetalleMediosVida;
 
  @ManyToOne(type => UbicacionGeografica, ubic => ubic.mediosvidaUbic)
  
  ubicMediosVida: UbicacionGeografica;
  
  
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