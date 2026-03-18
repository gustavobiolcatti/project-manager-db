import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { EntityBase } from './entity-base';
import { Project, BoardColumn } from './index';

@Entity('boards')
export class Board extends EntityBase {
  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @ManyToOne(() => Project, (project) => project.boards, { nullable: false })
  @JoinColumn({ name: 'projectId' })
  project!: Project;

  @OneToMany(() => BoardColumn, (column) => column.board, { nullable: true })
  boardColumns?: BoardColumn[];
}
