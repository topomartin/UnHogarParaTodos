import { ApiProperty } from "@nestjs/swagger";
import { AdoptionStatus } from "src/common/knowledge/enums";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./user.entity";
import { Animal } from "./animal.entity";

@Entity()
@Unique(['user', 'animal'])
export class Adoption {
    @PrimaryGeneratedColumn()
    id!: number;

    @ApiProperty()
    @Column({ type: "timestamp", nullable: true, default: null })
    date!: Date;

    @ApiProperty({ enum: AdoptionStatus, enumName: 'AdoptionStatus' })
    @Column({ type: "enum", enum: AdoptionStatus, default: AdoptionStatus.PENDING })
    status!: AdoptionStatus;

    @ApiProperty()
    @Column({ type: 'json', nullable: true })
    formData!: any;

    @ApiProperty()
    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;

    @ApiProperty()
    @Column({ type: "timestamp", nullable: true, default: null })
    updated_at!: Date;

    @ManyToOne(() => User, (user) => user.adoptions)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => Animal, (animal) => animal.adoptions)
    @JoinColumn({ name: 'animal_id' })
    animal!: Animal

}