import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { EntityBase } from './entity-base';
import { Workspace, Board } from './index';

@Entity('projects')
export class Project extends EntityBase {
  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @Column({ type: 'varchar', nullable: true })
  description!: string;

  @ManyToOne(
    () => Workspace,
    (workspace) => workspace.projects,
    { nullable: false }
  )
  @JoinColumn({ name: 'workspace_id' })
  workspace!: Workspace;

  @OneToMany(
    () => Board,
    (board) => board.project,
    { nullable: true }
  )
  @JoinColumn({ name: 'project_id' })
  boards?: Board[];
}
