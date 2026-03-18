import { BeforeInsert, Column, Entity, JoinColumn, OneToMany } from 'typeorm';

import * as argon2 from 'argon2';

import { EntityBase } from './entity-base';
import { 
  Task, 
  Workspace, 
  WorkspaceMember, 
  Comment, 
  Interaction 
} from './index';

@Entity('users')
export class User extends EntityBase {
  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @Column({ type: 'varchar', nullable: false })
  email!: string;

  @Column({ type: 'varchar', nullable: false, select: false })
  password!: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
    });
  }

  @OneToMany(
    () => WorkspaceMember,
    (workspaceMember) => workspaceMember.user,
    { nullable: true }
  )
  @JoinColumn({ name: 'user_id' })
  workspaceMembers?: WorkspaceMember[];

  @OneToMany(
    () => Task,
    (task) => task.assignee,
    { nullable: true }
  )
  @JoinColumn({ name: 'assignee_id' })
  assignedTasks?: Task[];

  @OneToMany(
    () => Task,
    (task) => task.reporter,
    { nullable: true }
  )
  @JoinColumn({ name: 'reporter_id' })
  reportedTasks?: Task[];

  @OneToMany(
    () => Comment,
    (comment) => comment.user,
    { nullable: true }
  )
  @JoinColumn({ name: 'user_id' })
  comments?: Comment[];

  @OneToMany(
    () => Interaction,
    (interaction) => interaction.user,
    { nullable: true }
  )
  @JoinColumn({ name: 'user_id' })
  interactions?: Interaction[];
}
