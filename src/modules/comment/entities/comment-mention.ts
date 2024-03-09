import { Entity, JoinColumn, ManyToMany } from "typeorm";
import Comment from "./comment.entity";
import { User } from "../../user/entities/user.entity";

@Entity()
export default class CommentMention {
  @ManyToMany(() => Comment)
  @JoinColumn({ name: "comment_id" })
  comment: Comment;

  @ManyToMany(() => User)
  @JoinColumn({ name: "mentionee_id" })
  mentionee: User;
}
