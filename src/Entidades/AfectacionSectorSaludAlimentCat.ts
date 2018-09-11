import { Table, PrimaryGeneratedColumn,PrimaryColumn, Column,JoinColumn,OneToMany } from 'ionic-orm'
// import {Direcciones} from "../home/Direcciones";
@Table()
export class AfectacionSectorSaludAlimentCat {

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

  @Column({nullable:true})
  ACTIVACATPRINCIPALES: boolean;
  
  @Column({nullable:true})
  SALUD: boolean;

  @Column({nullable:true})
  ALIMENTARIA: boolean;

  @Column({nullable:true})
  CUANTIFICAR: boolean;

  @Column({ length: "900" ,nullable: true})
  ESPECIFICACION: string ;

  @Column({ length: "900" ,nullable: true})
  OBSERVACION: string ;

  @Column({nullable:true})
  PORCENTAJE: number;
//   @OneToMany(type => Direcciones, direccion => direccion.personaEn) 
//   // note: we will create author property in the Photo class below
//   direcciones: Direcciones[];
}