import { ApiProperty } from "@nestjs/swagger";
import { AnimalStatus, AnimalType } from "src/common/knowledge/enums";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Adoption } from "./adoption.entity";

@Entity()
export class Animal {
    @PrimaryGeneratedColumn()
    id!: number;

    @ApiProperty()
    @Column({ type: "varchar", length: 50, nullable: false })
    name!: string;

    @ApiProperty({ enum: AnimalType, enumName: 'AnimalType'})
    @Column({ type: 'enum', enum: AnimalType, nullable: false })
    type!: AnimalType;

    @ApiProperty({example: new Date().toISOString().split('T')[0],format: 'date',})
    @Column({ type: "date", nullable: false })
    birth_date!: Date;

    @ApiProperty()
    @Column({ type: "varchar", length: 254 })
    description!: string;

    @ApiProperty({ enum: AnimalStatus, enumName: 'AnimalStatus'})
    @Column({ type: "enum", enum: AnimalStatus, default: AnimalStatus.AVAILABLE })
    status!: AnimalStatus;

    @ApiProperty()
    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;

    @ApiProperty()
    @Column({ type: "timestamp", nullable: true, default: null })
    updated_at!: Date;

    @OneToMany(() => Adoption, (adoption) => adoption.animal)
    adoptions!: Adoption[]

}