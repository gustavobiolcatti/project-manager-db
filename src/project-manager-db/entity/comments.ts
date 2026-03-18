import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { EntityBase } from './entity-base';
import { User, Task } from './index';

@Entity('comments')
export class Comment extends EntityBase {
  @Column({ type: 'varchar', nullable: false })
  content!: string;

  @ManyToOne(() => Task, (task) => task.comments, { nullable: false })
  @JoinColumn({ name: 'taskId' })
  task!: Task;

  @ManyToOne(() => User, (user) => user.comments, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user!: User;
}
