import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { EntityBase } from './entity-base';
import { User, Task } from './index';

@Entity('comments')
export class Comment extends EntityBase {
  @Column({ type: 'varchar', nullable: false })
  content!: string;

  @ManyToOne(
    () => Task,
    (task) => task.comments,
    { nullable: false }
  )
  @JoinColumn({ name: 'task_id' })
  task!: Task;

  @ManyToOne(
    () => User,
    (user) => user.comments,
    { nullable: false }
  )
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
