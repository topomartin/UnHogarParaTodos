
import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity";
import { FosterProfileStatus } from "src/common/knowledge/enums";
import { FosterProfileModelNames as Names } from "src/modules/foster-profile/config/foster-profile-model-name";


@Entity()
export class FosterProfile {
    @PrimaryGeneratedColumn()
    id!: number;

    @ApiProperty()
    @Column({ name: Names.tableFields.FULL_NAME,  type: "varchar", length: 50, nullable: false })
    [Names.modelFields.FULL_NAME]!: string;

    @ApiProperty()
    @Column({ name: Names.tableFields.PHONE ,type: "varchar", length: 12, nullable: false })
    [Names.modelFields.PHONE]!: string;

    @ApiProperty()
    @Column({ name: Names.tableFields.AGE, type: "integer", nullable: false })
    [Names.modelFields.AGE]!: number;

    @ApiProperty()
    @Column({ name: Names.tableFields.ADDRESS, type: "varchar", length: 254, nullable: false })
    [Names.modelFields.ADDRESS]!: string;

    @ApiProperty()
    @Column({ name: Names.tableFields.HOUSING_TYPE, type: "varchar", length: 40, nullable: false })
    [Names.modelFields.HOUSING_TYPE]!: string;

    @ApiProperty()
    @Column({ name: Names.tableFields.SQUARE_METERS, type: "integer", nullable: false })
    [Names.modelFields.SQUARE_METERS]!: number;

    @ApiProperty()
    @Column({ name: Names.tableFields.HAS_GARDEN, type: "boolean", nullable: false })
    [Names.modelFields.HAS_GARDEN]!: boolean;

    @ApiProperty()
    @Column({ name: Names.tableFields.HAS_TERRACE, type: "boolean", nullable: false })
    [Names.modelFields.HAS_TERRACE]!: boolean;

    @ApiProperty()
    @Column({ name: Names.tableFields.HAS_OTHER_ANIMALS, type: "boolean", nullable: false, default:false })
    [Names.modelFields.HAS_OTHER_ANIMALS]!: boolean;

    @ApiProperty()
    @Column({ name: Names.tableFields.HAS_EXPERIENCE, type: "boolean", nullable: false })
    [Names.modelFields.HAS_EXPERIENCE]!: boolean;

    @ApiProperty()
    @Column({ name: Names.tableFields.AVAILABEL_TIME, type: "varchar", length: 10, nullable: false })
    [Names.modelFields.AVAILABEL_TIME]!: string;

    @ApiProperty()
    @Column({ name: Names.tableFields.MAX_ANIMALS, type: "integer", nullable: false })
    [Names.modelFields.MAX_ANIMALS]!: number;

    @ApiProperty()
    @Column({ name: Names.tableFields.MOTIVATION, type: "varchar", length: 254, nullable: false })
    [Names.modelFields.MOTIVATION]!: string;

    @ApiProperty({ enum: FosterProfileStatus, enumName: 'FosterProfileStatus'})
    @Column({ name: Names.tableFields.STATUS, type: "enum", enum: FosterProfileStatus, default: FosterProfileStatus.PENDING })
    [Names.modelFields.STATUS]!: FosterProfileStatus;

    @ApiProperty()
    @CreateDateColumn({name: Names.tableFields.CREATED_AT, type: 'timestamp' })
    [Names.modelFields.CREATED_AT]!: Date;

    @ApiProperty()
    @Column({ name: Names.tableFields.UPDATED_AT, type: "timestamp", nullable: true, default: null })
    [Names.modelFields.UPDATED_AT]!: Date;

    @ManyToOne(() => User, (user) => user.foster_profiles)
    @JoinColumn({ name: 'user_id' })
    user!: User;

}

