import { Column, Entity, ManyToOne } from 'typeorm';

import { EntityBase } from './entity-base';
import { WorkspaceMemberRolesEnum } from '../enums';
import { User, Workspace } from './index';

@Entity('workspaceMembers')
export class WorkspaceMember extends EntityBase {
  @ManyToOne(
    () => User,
    (user) => user.workspaceMembers,
    { nullable: false }
  )
  user!: User;

  @ManyToOne(
    () => Workspace,
    (workspace) => workspace.workspaceMembers,
    { nullable: false }
  )
  workspace!: Workspace;

  @Column({ type: 'enum', enum: WorkspaceMemberRolesEnum, nullable: false })
  role!: WorkspaceMemberRolesEnum;
}
