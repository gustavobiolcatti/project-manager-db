import { Column, Entity, OneToMany } from 'typeorm';

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

  @Column({ type: 'varchar', nullable: false })
  password!: string;

  @OneToMany(
    () => Workspace,
    (workspace) => workspace.owner,
    { nullable: true }
  )
  workspaces?: Workspace[];

  @OneToMany(
    () => WorkspaceMember,
    (workspaceMember) => workspaceMember.user,
    { nullable: true }
  )
  workspaceMembers?: WorkspaceMember[];

  @OneToMany(
    () => Task,
    (task) => task.assignee,
    { nullable: true }
  )
  assignedTasks?: Task[];

  @OneToMany(
    () => Task,
    (task) => task.reporter,
    { nullable: true }
  )
  reportedTasks?: Task[];

  @OneToMany(
    () => Comment,
    (comment) => comment.user,
    { nullable: true }
  )
  comments?: Comment[];

  @OneToMany(
    () => Interaction,
    (interaction) => interaction.user,
    { nullable: true }
  )
  interactions?: Interaction[];
}
