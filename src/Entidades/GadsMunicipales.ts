import { Table, PrimaryGeneratedColumn,PrimaryColumn, Column,JoinColumn,OneToMany } from 'ionic-orm'
// import {Direcciones} from "../home/Direcciones";
@Table()
export class GadsMunicipales {

  @PrimaryColumn()
  ID: number;

  @Column()
  NOMBRE: string;

  @Column()
  NOMBREINFORME: string ;

  


//   @OneToMany(type => Direcciones, direccion => direccion.personaEn) 
//   // note: we will create author property in the Photo class below
//   direcciones: Direcciones[];
}