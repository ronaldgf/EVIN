import { Table, PrimaryGeneratedColumn,OneToOne,ManyToOne, Column,JoinColumn,OneToMany } from 'ionic-orm'
import {TipoEventosForm} from "../Entidades/TiposEventosForm";
import {DetalleMediosVida} from "../Entidades/DetalleMediosVida";
import {UbicacionGeografica} from "../Entidades/UbicacionGeografica";
import {TipoTransporteForm} from "../Entidades/TiposTransporteForm";
@Table()
export class MediosTransporteForm {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  IDMEDIO: number;

  @OneToOne(type => UbicacionGeografica, ubicacion => ubicacion.medioTransporteForm)
  @JoinColumn()
  ubicmedioTransp: UbicacionGeografica;

  @OneToMany(type => TipoTransporteForm, d => d.medioTransporteForm) 
  tiposTransporteForm: TipoTransporteForm[];
//   @OneToOne(type => DetalleMediosVida, detallemedios => detallemedios.mediosdeVida)
//   detalleMedios: DetalleMediosVida;
 
//   @ManyToOne(type => UbicacionGeografica, ubic => ubic.mediosvidaUbic)
  
//   ubicMediosVida: UbicacionGeografica;
  
  
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