import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from "./answer.entity";

@Entity('questions')
export class Question {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', nullable: false })
  question_text!: string;

  @OneToMany(() => Answer, answer => answer.question)
  answers!: Answer[];
}