import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class EntityBaseGeneral {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    update: false,
    insert: true,
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    update: true,
    insert: false,
  })
  updatedAt?: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    update: true,
    insert: false,
  })
  deletedAt?: Date;
}
