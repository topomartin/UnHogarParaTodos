import { AnimalStatus, AnimalType } from "src/common/knowledge/enums";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Animal {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 50, nullable: false })
    name!: string;

    @Column({ type: 'enum', enum: AnimalType, nullable: false })
    type!: AnimalType;

    @Column({ type: "date", nullable: false })
    birth_date!: Date;

    @Column({ type: "varchar", length: 254 })
    description!: string;

    @Column({ type: "enum", enum: AnimalStatus, default: AnimalStatus.AVAILABLE })
    status!: AnimalStatus;

    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;

    @Column({ type: "timestamp", nullable: true, default: null })
    updated_at!: Date;

}