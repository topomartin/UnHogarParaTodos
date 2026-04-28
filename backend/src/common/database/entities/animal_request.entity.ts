import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Animal } from "./animal.entity";
import { AnimalRequestType, AnimalRequestStatus } from "src/common/knowledge/enums";

@Entity()
export class AnimalRequest {
    @PrimaryGeneratedColumn()
    id!: number;

    @ApiProperty()
    @ManyToOne(() => User, (user) => user.animal_requests, { nullable: false })
    @JoinColumn({ name: "user_id" })
    user!: User;

    @ApiProperty()
    @ManyToOne(() => Animal, (animal) => animal.animal_requests, { nullable: false })
    @JoinColumn({ name: "animal_id" })
    animal!: Animal;

    @ApiProperty({ enum: AnimalRequestType })
    @Column({ type: "enum", enum: AnimalRequestType })
    type!: AnimalRequestType;

    @ApiProperty({ enum: AnimalRequestStatus })
    @Column({
        type: "enum",
        enum: AnimalRequestStatus,
        default: AnimalRequestStatus.PENDING,
    })
    status!: AnimalRequestStatus;

    @ApiProperty()
    @CreateDateColumn({ type: "timestamp" })
    created_at!: Date;

    @ApiProperty()
    @UpdateDateColumn({ type: "timestamp" })
    updated_at!: Date;
}