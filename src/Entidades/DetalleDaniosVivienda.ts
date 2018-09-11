import { Table, PrimaryGeneratedColumn,OneToOne,ManyToOne, Column,JoinColumn,OneToMany } from 'ionic-orm'
import {TipoEventosForm} from "../Entidades/TiposEventosForm";
import {DaniosViviendaForm} from "../Entidades/DaniosViviendaForm";
@Table()
export class DetalleDaniosVivienda {

  @PrimaryGeneratedColumn()
  id: number;

  
  @Column({ nullable:true })
  SINDANIO: number;

  @Column({ nullable:true })
  TEMNOHABI: number;

  @Column({ nullable:true })
  DANIOPARHAB: number;

  @Column({ nullable:true })
  DANIOTOTNOHAB: number;

  @Column({ nullable:true })
  TOTAL: number;

  @OneToOne(type => DaniosViviendaForm, daniosVivienda => daniosVivienda.detalleDaniosVivienda)
  @JoinColumn()
  daniosViviendaForm: DaniosViviendaForm;
}