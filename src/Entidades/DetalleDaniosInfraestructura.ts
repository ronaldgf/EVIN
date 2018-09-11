import { Table, PrimaryGeneratedColumn,OneToOne,ManyToOne, Column,JoinColumn,OneToMany } from 'ionic-orm'
import {TipoEventosForm} from "../Entidades/TiposEventosForm";
import {DaniosInfraestructuraForm} from "../Entidades/DaniosInfraestructurasForm";
@Table()
export class DetallaDaniosInfraestructura {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable:true })
  FUNCIONA: boolean;

  
  @Column({ nullable:true })
  SINDANIO: boolean;


  @Column({ nullable:true })
  DANIOPARCIAL: boolean;
  
  @Column({ nullable:true })
  DANIOTOTAL: boolean;

  @Column({length: "500", nullable:true })
  ESPECIFICACION: string;





  @OneToOne(type => DaniosInfraestructuraForm, daniosInf => daniosInf.detalleInfra)
  @JoinColumn()
  daniosInfraestructura: DaniosInfraestructuraForm;
}