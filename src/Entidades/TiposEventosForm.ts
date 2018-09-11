import { Table, PrimaryGeneratedColumn, Column,PrimaryColumn ,ManyToOne,JoinColumn} from 'ionic-orm'
import {FechaTipoEvento} from "../Entidades/FechaTipoEvento";
@Table()
export class TipoEventosForm {

  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  IDTIPO: number;

   
  @Column({nullable:true})
  ESTADOSEL: boolean;

  @ManyToOne(type => FechaTipoEvento, fecha => fecha.tiposEve)
  
   fechaTipoEventos: FechaTipoEvento;
//   @OneToMany(type => Direcciones, direccion => direccion.personaEn) 
//   // note: we will create author property in the Photo class below
//   direcciones: Direcciones[];
}