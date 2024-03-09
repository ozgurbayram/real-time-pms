import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import TimeStampEntity from "../../../core/entities/timestamp.entity";
import { User } from "../../user/entities/user.entity";

@Entity()
export default class Project extends TimeStampEntity {
  @Column({ nullable: false, type: "char" })
  name: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "creator_id" })
  @Index()
  creator: User;
}
