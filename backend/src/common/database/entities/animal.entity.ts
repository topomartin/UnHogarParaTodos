import { ApiProperty } from "@nestjs/swagger";
import { AnimalStatus, AnimalType } from "src/common/knowledge/enums";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Adoption } from "./adoption.entity";
import { Fostering } from "./fostering.entity";
import { AnimalModelNames as Names } from "src/modules/animal/config/animal-model-name";
<<<<<<< HEAD
import { Sponsorship } from "./sponsorship.entity";
import { AnimalImage } from "./animal_image.entity";
=======
import { AnimalImage } from "./animal_image.entity";
>>>>>>> e760ea536deec652fd33dce4bf66431fb0ab478e

@Entity()
export class Animal {
    @PrimaryGeneratedColumn()
    id!: number;

    @ApiProperty()
    @Column({ name: Names.tableFields.NAME, type: "varchar", length: 50, nullable: false })
    name!: string;

    @ApiProperty({ enum: AnimalType, enumName: 'AnimalType'})
    @Column({ name: Names.tableFields.TYPE, type: 'enum', enum: AnimalType, nullable: false })
    type!: AnimalType;

    @ApiProperty({example: new Date().toISOString().split('T')[0],format: 'date',})
    @Column({ name: Names.tableFields.BIRTH_DATE, type: "date", nullable: false })
    birth_date!: Date;

    @ApiProperty()
    @Column({ name: Names.tableFields.DESCRIPTION, type: "varchar", length: 254 })
    description!: string;

    @ApiProperty({ enum: AnimalStatus, enumName: 'AnimalStatus'})
    @Column({ name: Names.tableFields.STATUS, type: "enum", enum: AnimalStatus, default: AnimalStatus.AVAILABLE })
    status!: AnimalStatus;

    @ApiProperty()
    @CreateDateColumn({ name: Names.tableFields.CREATED_AT, type: 'timestamp' })
    create_at!: Date;

    @ApiProperty()
    @Column({ name: Names.tableFields.UPDATED_AT, type: "timestamp", nullable: true, default: null })
    update_at!: Date;

    @OneToMany(() => Adoption, (adoption) => adoption.animal)
    adoptions!: Adoption[]

    @OneToMany(() => Fostering, (fostering) => fostering.animal)
    fosterings!: Fostering[]

    @OneToMany(() => Sponsorship, (sponsorship) => sponsorship.animal)
    sponsorships!: Sponsorship[]
    
    @OneToMany(() => AnimalImage, (image) => image.animal)
    images!: AnimalImage[];

}