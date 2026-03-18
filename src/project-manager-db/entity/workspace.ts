import { Column, Entity, OneToMany } from 'typeorm';

import { EntityBase } from './entity-base';
import { WorkspaceMember, Project } from './index';

@Entity('workspaces')
export class Workspace extends EntityBase {
  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @Column({ type: 'bigint', nullable: false })
  ownerId!: string;

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
