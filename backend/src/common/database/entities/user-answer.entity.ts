import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from "./answer.entity";

@Entity('user_answers')
export class UserAnswer {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

  @Column()
  question_id!: number;

  @Column()
  answer_id!: number;

  @ManyToOne(() => Answer)
  @JoinColumn({ name: 'answer_id' })
  answer!: Answer;
}