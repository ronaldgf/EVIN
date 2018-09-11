import { Table, PrimaryGeneratedColumn,PrimaryColumn, Column,JoinColumn,OneToMany } from 'ionic-orm'
// import {Direcciones} from "../home/Direcciones";
@Table()
export class NecesidadesRecuTempranaCat {

  @PrimaryColumn()
  ID: number;

  @Column({ length: "500" })
  NOMBRE: string;

  @Column({ length: "500" ,nullable: true})
  DESCRIPCION: string ;

  @Column()
  ESTADO: boolean;
   
  @Column({nullable:true})
  ESTADOSEL: boolean;

  @Column({nullable:true})
  ESPECIFICA: boolean;

 
  @Column({ length: "500" ,nullable: true})
  ESPECIFICACION: string ;
//   @OneToMany(type => Direcciones, direccion => direccion.personaEn) 
//   // note: we will create author property in the Photo class below
//   direcciones: Direcciones[];
}