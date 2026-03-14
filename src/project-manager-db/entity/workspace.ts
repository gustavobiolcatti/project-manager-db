import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { EntityBase } from './entity-base';
import { User, WorkspaceMember, Project } from './index';

@Entity('workspaces')
export class Workspace extends EntityBase {
  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @ManyToOne(
    () => User,
    (user) => user.workspaces,
    { nullable: false }
  )
  owner!: User;

  @OneToMany(
    () => WorkspaceMember,
    (workspaceMember) => workspaceMember.workspace,
    { nullable: true }
  )
  workspaceMembers?: WorkspaceMember[];

  @OneToMany(
    () => Project,
    (project) => project.workspace,
    { nullable: true }
  )
  projects?: Project[];
}
