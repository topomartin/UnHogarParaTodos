import { ApiProperty } from "@nestjs/swagger";
import { AdoptionStatus } from "src/common/knowledge/enums";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Animal } from "./animal.entity";

@Entity()
export class Adoption {
    @PrimaryGeneratedColumn()
    id!: number;

    @ApiProperty()
    @Column({ type: "timestamp", nullable: true, default: null })
    date!: Date;

    @ApiProperty({ enum: AdoptionStatus, enumName: 'AdoptionStatus'})
    @Column({ type: "enum", enum: AdoptionStatus, default: AdoptionStatus.PENDING })
    status!: AdoptionStatus;

    @ApiProperty()
    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;

    @ApiProperty()
    @Column({ type: "timestamp", nullable: true, default: null })
    updated_at!: Date;

    @ManyToOne(() => User, (user) => user.id)
    user_!: User;

    @ManyToOne(() => Animal, (animal) => animal.id)
    animal_!: Animal

}