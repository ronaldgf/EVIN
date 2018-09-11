import { Table, PrimaryGeneratedColumn,PrimaryColumn, Column,JoinColumn,OneToMany } from 'ionic-orm'
// import {Direcciones} from "../home/Direcciones";
@Table()
export class Usuarios {

  @PrimaryColumn()
  ID: number;

  @Column()
  NOMBRES: string;

  @Column()
  APELLIDOS: string ;

  @Column()
  CORREO: string;

  @Column()
  USUARIO: string;
   
  @Column({nullable:true})
  PASSWORD: string;
  @Column({nullable:true})
  ESTADO: boolean;

  @Column({nullable:true})
  ESTADOLOGUEO: boolean;

  @Column()
  IDCOMPANIA: number;
  @Column()
  IDGAD: number;


//   @OneToMany(type => Direcciones, direccion => direccion.personaEn) 
//   // note: we will create author property in the Photo class below
//   direcciones: Direcciones[];
}