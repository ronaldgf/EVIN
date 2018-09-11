import { Table, PrimaryGeneratedColumn,PrimaryColumn, Column,JoinColumn,OneToMany,ManyToOne } from 'ionic-orm'
import {OrganizacionesCat} from "../Entidades/OrganizacionesCat";
// import {Direcciones} from "../home/Direcciones";
@Table()
export class SectoresIntervencionCat {

  @PrimaryColumn()
  ID: number;

  @Column()
  NOMBRE: string;

  @Column({ length: "500" ,nullable: true})
  DESCRIPCION: string ;

  @Column()
  ESTADO: boolean;
   
  @Column({nullable: true})
  ESTADOSEL: boolean;
 
  @ManyToOne(type => OrganizacionesCat, orgSectorecat => orgSectorecat.sectoresIntervencioncat)
  
  orgSectoresInterCat: OrganizacionesCat;
//   @OneToMany(type => Direcciones, direccion => direccion.personaEn) 
//   // note: we will create author property in the Photo class below
//   direcciones: Direcciones[];
}