import { Table, PrimaryGeneratedColumn,PrimaryColumn, Column,JoinColumn,OneToMany } from 'ionic-orm'
// import {Direcciones} from "../home/Direcciones";
@Table()
export class TipoEntrevistado {

  @PrimaryColumn()
  ID: number;

  @Column({ length: "500" })
  NOMBRE: string;

  @Column({nullable:true})
  ESTADOSEL: boolean;

  @Column()
  ESTADO: boolean;
  
 
//   @OneToMany(type => Direcciones, direccion => direccion.personaEn) 
//   // note: we will create author property in the Photo class below
//   direcciones: Direcciones[];
}