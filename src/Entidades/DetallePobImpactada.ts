import { Table, PrimaryGeneratedColumn,OneToOne,ManyToOne, Column,JoinColumn,OneToMany } from 'ionic-orm'
import {TipoEventosForm} from "../Entidades/TiposEventosForm";
import {PoblacionImpactadaForm} from "../Entidades/PoblacionImpactadaForm";
@Table()
export class DetallePobImpactada {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable:true })
  HOMBRES: number;

  @Column({ nullable:true })
  MUJERES: number;
  
  @Column({ nullable:true })
  NINIOS: number;


  @Column({ nullable:true })
  NINIAS: number;
  
  @Column({ nullable:true })
  TOTAL: number;

  


  // @ManyToOne(type => UbicacionGeografica, ubica => ubica.fechasTipoEvento)
  
  // ubicacion: UbicacionGeografica;
  // @OneToOne(type => UbicacionGeografica)
  // @JoinColumn()
  // ubicacion: UbicacionGeografica;
  @OneToOne(type => PoblacionImpactadaForm, poblacion => poblacion.detalle)
  @JoinColumn()
  poblacionImpac: PoblacionImpactadaForm;
}