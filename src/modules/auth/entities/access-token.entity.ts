import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import TimeStampEntity from '../../../core/entities/timestamp.entity';
import moment from 'moment';

@Entity({ name: 'access_token' })
@Index(['token'])
class AccessToken extends TimeStampEntity {
  @Column({ type: 'varchar', length: 255 }) token: string;

  @Column({ type: 'boolean', default: false }) revoked: boolean;

  @Column({
  	type: 'timestamp',
  	nullable: true,
  	default: moment().add(process.env.JWT_TTL, 'minute'),
  })
  	expires_at: Date;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, { cascade: true })
  	user: User;

  constructor(token: string, user: User) {
  	super();
  	this.token = token;
  	this.user = user;
  }
}

export default AccessToken;
