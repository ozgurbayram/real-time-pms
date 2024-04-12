import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import TimeStampEntity from '../../../core/entities/timestamp.entity';
import AccessToken from './access-token.entity';
import moment from 'moment';

@Entity({ name: 'refresh_token' })
@Index(['token'])
class RefreshToken extends TimeStampEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: 'varchar', length: 255, unique: true }) token: string;
  @Column({ type: 'boolean', default: false }) revoked: boolean;

  @Column({ type: 'timestamp', nullable: true, default: moment().add(process.env.JWT_TTL,'minute') }) expires_at: Date;

  @JoinColumn({ name: 'access_token_id' })
  @ManyToOne(() => AccessToken, { cascade: true })
  	accessToken: AccessToken;

  constructor(token: string, accessToken: AccessToken) {
  	super();
  	this.token = token;
  	this.accessToken = accessToken;
  }
}

export default RefreshToken;
