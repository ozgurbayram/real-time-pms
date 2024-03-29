import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import AbstactEntity from './abstract.entity';

class TimeStampEntity extends AbstactEntity {
  @CreateDateColumn() created_at: string;

  @UpdateDateColumn() updated_at: string;
}

export default TimeStampEntity;
