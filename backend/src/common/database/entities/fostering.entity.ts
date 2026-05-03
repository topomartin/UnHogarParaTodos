import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Animal } from "./animal.entity";
import { FosteringModelNames as Names } from "src/modules/fostering/config/fostering-model-name";
import { FosterStatus } from "../../knowledge/enums";

@Entity()
export class Fostering {
    @PrimaryGeneratedColumn()
    id!: number;

    @ApiProperty()
    @Column({ name: Names.tableFields.START_DATE, type: "timestamp", nullable: false })
    [Names.modelFields.START_DATE]!: Date;

    @ApiProperty()
    @Column({ name: Names.tableFields.END_DATE, type: "timestamp", nullable: false })
    [Names.modelFields.END_DATE]!: Date;

    @Column({type: 'enum', enum: FosterStatus, default: FosterStatus.ACTIVE })
    status!: FosterStatus;

    @ApiProperty()
    @CreateDateColumn({ name: Names.tableFields.CREATED_AT, type: 'timestamp' })
    [Names.modelFields.CREATED_AT]!: Date;

    @ApiProperty()
    @Column({ name: Names.tableFields.UPDATED_AT, type: "timestamp", nullable: true, default: null })
    [Names.modelFields.UPDATED_AT]!: Date;

    @ManyToOne(() => User, (user) => user.fosterings)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => Animal, (animal) => animal.fosterings)
    @JoinColumn({ name: 'animal_id' })
    animal!: Animal

}