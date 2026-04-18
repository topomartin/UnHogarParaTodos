
import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity";
import { FosterProfileStatus } from "src/common/knowledge/enums";


@Entity()
export class FosterProfile {
    @PrimaryGeneratedColumn()
    id!: number;

    @ApiProperty()
    @Column({ type: "varchar", length: 50, nullable: false })
    full_name!: string;

    @ApiProperty()
    @Column({ type: "varchar", length: 12, nullable: false })
    phone!: string;

    @ApiProperty()
    @Column({ type: "integer", nullable: false })
    age!: number;

    @ApiProperty()
    @Column({ type: "varchar", length: 254, nullable: false })
    address!: string;

    @ApiProperty()
    @Column({ type: "varchar", length: 40, nullable: false })
    housing_type!: string;

    @ApiProperty()
    @Column({ type: "integer", nullable: false })
    square_meters!: number;

    @ApiProperty()
    @Column({ type: "boolean", nullable: false })
    has_garden!: boolean;

    @ApiProperty()
    @Column({ type: "boolean", nullable: false })
    has_terrace!: boolean;

    @ApiProperty()
    @Column({ type: "boolean", nullable: false })
    has_other_animals!: boolean;

    @ApiProperty()
    @Column({ type: "boolean", nullable: false })
    has_experience!: boolean;

    @ApiProperty()
    @Column({ type: "varchar", length: 10, nullable: false })
    available_time!: string;

    @ApiProperty()
    @Column({ type: "integer", nullable: false })
    max_animals!: number;

    @ApiProperty()
    @Column({ type: "varchar", length: 254, nullable: false })
    motivation!: string;

    @ApiProperty({ enum: FosterProfileStatus, enumName: 'FosterProfileStatus'})
    @Column({ type: "enum", enum: FosterProfileStatus, default: FosterProfileStatus.PENDING })
    status!: FosterProfileStatus;

    @ApiProperty()
    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;

    @ApiProperty()
    @Column({ type: "timestamp", nullable: true, default: null })
    updated_at!: Date;

    @ManyToOne(() => User, (user) => user.foster_profiles)
    @JoinColumn({ name: 'user_id' })
    user!: User;

}

