import { Table, PrimaryGeneratedColumn,OneToOne,ManyToOne, Column,JoinColumn,OneToMany } from 'ionic-orm'
import {TipoEventosForm} from "../Entidades/TiposEventosForm";
import {PoblacionNecesidadesEspeForm} from "../Entidades/PoblacionNecesidadesEspeForm";
@Table()
export class DetallePoblacionNeceEspe {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable:true })
  HOMBRES: number;

  @Column({ nullable:true })
  MUJERES: number;
  
  
  
  @Column({ nullable:true })
  TOTAL: number;

  @Column({ length: "800" , nullable:true })
  ETNIA: string;

  @OneToOne(type => PoblacionNecesidadesEspeForm, poblacionNece => poblacionNece.detalleNeceEspe)
  @JoinColumn()
  poblacionNeceEsp: PoblacionNecesidadesEspeForm; 


  // @ManyToOne(type => UbicacionGeografica, ubica => ubica.fechasTipoEvento)
  
  // ubicacion: UbicacionGeografica;
  // @OneToOne(type => UbicacionGeografica)
  // @JoinColumn()
  // ubicacion: UbicacionGeografica;
 
}