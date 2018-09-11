import { Table, PrimaryGeneratedColumn,OneToOne,ManyToOne, Column,JoinColumn,OneToMany } from 'ionic-orm'
import {TipoEventosForm} from "../Entidades/TiposEventosForm";
import {DetalleDaniosVivienda} from "../Entidades/DetalleDaniosVivienda";
import {UbicacionGeografica} from "../Entidades/UbicacionGeografica";
@Table()
export class DatosInformeDanios {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true})
  AFECTACION_CARACTERISTICA: string;
//   @Column({nullable:true})
//   AFECTACION_SECTORPROD: string;

  @Column({nullable:true})
  EFECTO_SECTORPROD: string;

  @Column({nullable:true})
  EFECTO_INFRAESTRUCTURA: string;

  @Column({nullable:true})
  MEDIOVIDACOMUNIDAD: string;

  @Column({nullable:true})
  AFECTACIONSECTORSALUDNUTRI: string;

  @Column({nullable:true})
  AFECTACIONSECTORSEGURIDAD: string;

  @Column({nullable:true})
  SITUACIONAYUDAHUMAN: string;

  @Column({nullable:true})
  CONCLUSIONES: string;

  @Column({nullable:true})
  NECESIDADSURGENTES: string;

  @Column({nullable:true})
  NECESIDADSURGENTESRRHH: string;

  @Column({nullable:true})
  RECUPTEMPRANA: string;

  @OneToOne(type => UbicacionGeografica, ubicInfDanio => ubicInfDanio.datosInformDanio)
  @JoinColumn()
  ubicInformDanio: UbicacionGeografica;
}