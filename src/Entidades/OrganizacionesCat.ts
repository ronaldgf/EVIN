import { Table, PrimaryGeneratedColumn,PrimaryColumn, Column,JoinColumn,OneToMany } from 'ionic-orm'
import {SectoresIntervencionCat} from "../Entidades/SectoresIntervencionCat";
// import {Direcciones} from "../home/Direcciones";
@Table()
export class OrganizacionesCat {

  @PrimaryColumn()
  ID: number;

  @Column()
  NOMBRE: string;

  @Column({ length: "500" ,nullable: true})
  DESCRIPCION: string ;

  @Column()
  ESTADO: boolean;
  @Column({nullable: true})
  SECTORES: string;

  @Column({nullable:true})
  EXISTESECTORES: boolean;

  @OneToMany(type => SectoresIntervencionCat, sectoreInterCat => sectoreInterCat.orgSectoresInterCat,{nullable:true}) 
  // note: we will create author property in the Photo class below
  sectoresIntervencioncat: SectoresIntervencionCat[];

//   @OneToMany(type => Direcciones, direccion => direccion.personaEn) 
//   // note: we will create author property in the Photo class below
//   direcciones: Direcciones[];
}