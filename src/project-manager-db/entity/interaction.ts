import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { EntityBase } from './entity-base';
import { User, Task } from './index';

@Entity('interactions')
export class Interaction extends EntityBase {
  @Column({ type: 'varchar', nullable: false })
  content!: string;

  @Column({ type: 'jsonb', nullable: false })
  payload!: string;

  @ManyToOne(
    () => Task,
    (task) => task.interactions,
    { nullable: false }
  )
  @JoinColumn({ name: 'task_id' })
  task!: Task;

  @ManyToOne(
    () => User,
    (user) => user.interactions,
    { nullable: false }
  )
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
