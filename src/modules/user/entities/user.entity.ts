import bcrypt from 'bcrypt';
import { Column, Entity } from 'typeorm';
import TimeStampModel from '../../../core/entities/timestamp.entity';

@Entity()
export class User extends TimeStampModel {
  @Column({ type: 'varchar', length: 255, unique: true }) email: string;

  @Column({ type: 'varchar', length: 255, nullable: true }) private password: string | null;

  async setPassword(password: string): Promise<void> {
  	const salt = await bcrypt.genSalt();
  	this.password = await bcrypt.hash(password, salt);
  }

  async validatePassword(password: string): Promise<boolean> {
  	return bcrypt.compare(password, this.password || '');
  }
}
