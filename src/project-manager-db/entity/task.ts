import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { EntityBase } from './entity-base';
import { BoardColumn, User, Comment, Interaction } from './index';

@Entity('tasks')
export class Task extends EntityBase {
  @Column({ type: 'varchar', nullable: false })
  title!: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({ type: 'integer', nullable: true })
  priority?: number;

  @ManyToOne(
    () => User,
    (user) => user.assignedTasks,
    { nullable: true }
  )
  @JoinColumn({ name: 'assignee_id' })
  assignee?: User;

  @ManyToOne(
    () => User,
    (user) => user.reportedTasks,
    { nullable: false }
  )
  @JoinColumn({ name: 'reporter_id' })
  reporter!: User;

  @ManyToOne(
    () => BoardColumn,
    (boardColumn) => boardColumn.tasks,
    { nullable: false }
  )
  @JoinColumn({ name: 'board_column_id' })
  boardColumn!: BoardColumn;

  @OneToMany(
    () => Comment,
    (comment) => comment.task,
    { nullable: true }
  )
  @JoinColumn({ name: 'task_id' })
  comments?: Comment[];

  @OneToMany(
    () => Interaction,
    (interaction) => interaction.task,
    { nullable: true }
  )
  @JoinColumn({ name: 'task_id' })
  interactions?: Interaction[];
}
