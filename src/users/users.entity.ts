import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'roles' })
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  login: string;

  @Column({ select: false })
  password: string;

  @Column({ name: 'role' })
  role: number;
}
