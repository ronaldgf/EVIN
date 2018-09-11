import { Table, PrimaryGeneratedColumn,PrimaryColumn, Column,JoinColumn,OneToMany } from 'ionic-orm'
// import {Direcciones} from "../home/Direcciones";
@Table()
export class ImpactoEventoAdversoCat {

  @PrimaryColumn()
  ID: number;

  @Column()
  NOMBRE: string;

  @Column()
  DESCRIPCION: string ;

  
  @Column()
  ESTADO: boolean;
   
  @Column({nullable:true})
  ESTADOSEL: boolean;

//   @OneToMany(type => Direcciones, direccion => direccion.personaEn) 
//   // note: we will create author property in the Photo class below
//   direcciones: Direcciones[];
}