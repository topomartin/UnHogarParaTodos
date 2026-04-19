import { ApiProperty } from "@nestjs/swagger";
import { AnimalStatus, AnimalType } from "src/common/knowledge/enums";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Adoption } from "./adoption.entity";
import { Fostering } from "./fostering.entity";
import { AnimalModelNames as Names } from "src/modules/animal/config/animal-model-name";

@Entity()
export class Animal {
    @PrimaryGeneratedColumn()
    [Names.modelFields.ID]!: number;

    @ApiProperty()
    @Column({ name: Names.tableFields.NAME, type: "varchar", length: 50, nullable: false })
    [Names.modelFields.NAME]!: string;

    @ApiProperty({ enum: AnimalType, enumName: 'AnimalType'})
    @Column({ name: Names.tableFields.TYPE, type: 'enum', enum: AnimalType, nullable: false })
    [Names.modelFields.TYPE]!: AnimalType;

    @ApiProperty({example: new Date().toISOString().split('T')[0],format: 'date',})
    @Column({ name: Names.tableFields.BIRTH_DATE, type: "date", nullable: false })
    [Names.modelFields.BIRTH_DATE]!: Date;

    @ApiProperty()
    @Column({ name: Names.tableFields.DESCRIPTION, type: "varchar", length: 254 })
    [Names.modelFields.DESCRIPTION]!: string;

    @ApiProperty({ enum: AnimalStatus, enumName: 'AnimalStatus'})
    @Column({ name: Names.tableFields.STATUS, type: "enum", enum: AnimalStatus, default: AnimalStatus.AVAILABLE })
    [Names.modelFields.STATUS]!: AnimalStatus;

    @ApiProperty()
    @CreateDateColumn({ name: Names.tableFields.CREATED_AT, type: 'timestamp' })
    [Names.modelFields.CREATED_AT]!: Date;

    @ApiProperty()
    @Column({ name: Names.tableFields.UPDATED_AT, type: "timestamp", nullable: true, default: null })
    [Names.modelFields.UPDATED_AT]!: Date;

    @OneToMany(() => Adoption, (adoption) => adoption.animal)
    adoptions!: Adoption[]

    @OneToMany(() => Fostering, (fostering) => fostering.animal)
    fosterings!: Fostering[]

}