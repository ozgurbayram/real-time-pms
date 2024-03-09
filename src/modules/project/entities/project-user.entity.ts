import { Column, Entity, JoinColumn, ManyToMany, Unique } from "typeorm";
import Project from "./project.entity";
import { User } from "../../user/entities/user.entity";

@Entity()
@Unique("project_user", ["project_id", "user_id"])
export default class ProjectUser {
  @ManyToMany(() => Project)
  @JoinColumn({ name: "project_id" })
  project: Project;

  @ManyToMany(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ type: "datetime" })
  assigned_at: Date;
}
