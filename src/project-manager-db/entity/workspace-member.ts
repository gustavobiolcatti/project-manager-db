import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

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
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(
    () => Workspace,
    (workspace) => workspace.workspaceMembers,
    { nullable: false }
  )
  @JoinColumn({ name: 'workspace_id' })
  workspace!: Workspace;

  @Column({ type: 'enum', enum: WorkspaceMemberRolesEnum, nullable: false })
  role!: WorkspaceMemberRolesEnum;
}
