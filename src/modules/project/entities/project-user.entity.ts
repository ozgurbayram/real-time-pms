import { Column, CreateDateColumn, Entity, In, Index, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Project from "./project.entity";
import { User } from "../../user/entities/user.entity";
import AbstractEntity from "../../../core/entities/abstract.entity";

@Entity()
export default class ProjectUser extends AbstractEntity {
  @ManyToMany(() => Project)
  @JoinColumn({ name: "project_id" })
  project: Project;

  @ManyToMany(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @CreateDateColumn({ precision: 3 })
  assigned_at: Date;
}
