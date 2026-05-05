import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entity";

@Entity('answers')
export class Answer {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  answer_text!: string;

  @Column({ type: 'int' })
  value!: number;

  @ManyToOne(() => Question, q => q.answers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'question_id' }) // 👈 ESTO ES CLAVE
  question!: Question;
}