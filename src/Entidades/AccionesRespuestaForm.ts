import { Table, OneToOne,PrimaryGeneratedColumn, Column,JoinColumn,OneToMany,ManyToOne } from 'ionic-orm'
import {TipoEventos} from "../Entidades/TiposEventos";
import {FechaTipoEvento} from "../Entidades/FechaTipoEvento";
import {PoblacionImpactadaForm} from "../Entidades/PoblacionImpactadaForm";
import {PoblacionNecesidadesEspeForm} from "../Entidades/PoblacionNecesidadesEspeForm";
import {MediosdeVidaForm} from "../Entidades/MediosdeVidaForm";
import {DaniosViviendaForm} from "../Entidades/DaniosViviendaForm";
import {DaniosInfraestructuraForm} from "../Entidades/DaniosInfraestructurasForm";
import {MediosTransporteForm} from "../Entidades/MediosTransporteForm";
import {AfectacionSaludAlimentariaForm} from "../Entidades/AfectacionSaludAlimentariaForm";
import {OrganizacionesForm} from "../Entidades/OrganizacionesForm";
import {UbicacionGeografica} from "../Entidades/UbicacionGeografica";
@Table()
export class AccionesRespuestaForm {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: "20" })
  FECHA: string;

  @Column()
  DESCRIPCION: string;
  
  @Column()
  ORGANIZACION: string;

  @Column()
  HOGARES: number;

  @Column({nullabe:true})
  ESTADOAGREGADO: boolean;

  @ManyToOne(type => UbicacionGeografica, ubicAfe => ubicAfe.accionesRespuesta)
  
  ubicAcciones: UbicacionGeografica;
  
}