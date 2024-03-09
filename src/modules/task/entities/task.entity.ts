import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import TimeStampEntity from "../../../core/entities/timestamp.entity";
import Project from "../../project/entities/project.entity";

@Entity()
export default class Task extends TimeStampEntity {
  @ManyToOne(() => Project)
  @JoinColumn({ name: "project_id" })
  project: Project;
  
  @Column()
  name: string;

  @Column()
  status: string;
}
