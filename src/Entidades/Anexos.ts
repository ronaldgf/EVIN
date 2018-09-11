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
export class Anexos {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  IMAGEN: string;

  @Column({nullable:true})
  DESCRIPCION: string;
  @Column()
  IDJSON: number;
  
  
  @ManyToOne(type => UbicacionGeografica, ubicAnex => ubicAnex.anexos)
  
  ubicAnexos: UbicacionGeografica;
  
}