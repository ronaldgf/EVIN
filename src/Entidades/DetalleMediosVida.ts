import { Table, PrimaryGeneratedColumn,OneToOne,ManyToOne, Column,JoinColumn,OneToMany } from 'ionic-orm'
import {TipoEventosForm} from "../Entidades/TiposEventosForm";
import {MediosdeVidaForm} from "../Entidades/MediosdeVidaForm";
@Table()
export class DetalleMediosVida {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable:true })
  HOMBRES: boolean;

  @Column({ nullable:true })
  MUJERES: boolean;
  
  @Column({ nullable:true })
  SINDANIO: boolean;


  @Column({ nullable:true })
  DANIOPARCIAL: boolean;
  
  @Column({ nullable:true })
  DANIOTOTAL: boolean;

  @Column({length: "500", nullable:true })
  ESPECIFICACION: string;


 


  @OneToOne(type => MediosdeVidaForm, medios => medios.detalleMedios)
  @JoinColumn()
  mediosdeVida: MediosdeVidaForm;
}