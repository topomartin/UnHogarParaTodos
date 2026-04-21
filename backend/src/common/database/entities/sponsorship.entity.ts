import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SponsorshipModelNames as Names } from "src/modules/sponsorship/config/sponsorship-model-name";
import { User } from "./user.entity";
import { Animal } from "./animal.entity";
import { SponsorshipFrequency } from "src/common/knowledge/enums";

@Entity()
export class Sponsorship {
    @PrimaryGeneratedColumn({ name: Names.tableFields.ID })
    id!: number;

    @ApiProperty()
    @Column({ name: Names.tableFields.AMOUNT, type: "decimal", nullable: false })
    amount!: number;

    @ApiProperty({ name: Names.tableFields.FREQUENCY, enum: SponsorshipFrequency, enumName: 'SponsorshipFrequency' })
    @Column({ type: "enum", enum: SponsorshipFrequency, default: SponsorshipFrequency.MONTHLY })
    frequency!: SponsorshipFrequency;

    @ApiProperty()
    @Column({ name: Names.tableFields.START_DATE, type: 'timestamp' })
    startDate!: Date;

    @ApiProperty()
    @CreateDateColumn({ name: Names.tableFields.CREATED_AT, type: 'timestamp' })
    created_at!: Date;

    @ApiProperty()
    @Column({ name: Names.tableFields.UPDATED_AT, type: "timestamp", nullable: true, default: null })
    updated_at!: Date;

    @ManyToOne(() => User, (user) => user.sponsorships)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => Animal, (animal) => animal.sponsorships)
    @JoinColumn({ name: 'animal_id' })
    animal!: Animal

}