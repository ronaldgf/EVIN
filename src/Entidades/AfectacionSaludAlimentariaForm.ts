import { Table, PrimaryGeneratedColumn,OneToOne,ManyToOne, Column,JoinColumn,OneToMany } from 'ionic-orm'
import {TipoEventosForm} from "../Entidades/TiposEventosForm";
import {DetalleDaniosVivienda} from "../Entidades/DetalleDaniosVivienda";
import {UbicacionGeografica} from "../Entidades/UbicacionGeografica";
@Table()
export class AfectacionSaludAlimentariaForm {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  IDTIPO: number;

  @Column({ nullable:true })
  ESTADOSEL: boolean;

  @Column({ nullable:true })
  SALUD: boolean;
 
  @Column({ nullable:true })
  ALIMENTARIA: boolean;

  @Column({ nullable:true })
  CUANTIFICAR: boolean;


  @Column({length: "1000", nullable:true })
  ESPECIFICACION: string;

  @Column({length: "1000", nullable:true })
  OBSERVACION: string;

  @Column({ nullable:true })
  PORCENTAJE: number;

  @ManyToOne(type => UbicacionGeografica, u => u.afectacionesSalud)
  ubicAfectSalud: UbicacionGeografica;
}