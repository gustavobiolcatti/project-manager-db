import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

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
  assignee?: User;

  @ManyToOne(
    () => User,
    (user) => user.reportedTasks,
    { nullable: false }
  )
  reporter!: User;

  @ManyToOne(
    () => BoardColumn,
    (boardColumn) => boardColumn.tasks,
    { nullable: false }
  )
  boardColumn!: BoardColumn;

  @OneToMany(
    () => Comment,
    (comment) => comment.task,
    { nullable: true }
  )
  comments?: Comment[];

  @OneToMany(
    () => Interaction,
    (interaction) => interaction.task,
    { nullable: true }
  )
  interactions?: Interaction[];
}
