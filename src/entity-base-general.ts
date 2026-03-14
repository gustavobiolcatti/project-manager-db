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
  created_at!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    update: true,
    insert: false,
  })
  updated_at?: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    update: true,
    insert: false,
  })
  deleted_at?: Date;
}
