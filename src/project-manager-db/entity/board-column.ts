import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { EntityBase } from './entity-base';
import { Board, Task } from './index';

@Entity('boardColumns')
export class BoardColumn extends EntityBase {
  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @ManyToOne(
    () => Board,
    (board) => board.boardColumns,
    { nullable: false }
  )
  @JoinColumn({ name: 'board_id' })
  board!: Board;

  @OneToMany(
    () => Task,
    (task) => task.boardColumn,
    { nullable: true }
  )
  @JoinColumn({ name: 'board_column_id' })
  tasks?: Task[];
}
