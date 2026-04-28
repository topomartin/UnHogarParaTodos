import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn, Index } from "typeorm";
import { User } from "./user.entity";
import {
    HousingType,
    AvailableTime,
    Lifestyle,
    NoiseTolerance,
    TimeAtHome,
} from "src/common/knowledge/enums";

@Index(["user"], { unique: true })
@Entity()
export class UserProfile {

    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => User, (user) => user.profile, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column({ type: "varchar", nullable: true })
    fullname!: string;

    @Column({ type: "varchar", nullable: true })
    phone!: string;

    @Column({ type: "int", nullable: true })
    age!: number;

    @Column({ type: "varchar", nullable: true })
    address!: string;

    @Column({ type: "enum", enum: HousingType, nullable: true })
    housing_type!: string;

    @Column({ type: "int", nullable: true })
    square_meters!: number;

    @Column({ type: "boolean", default: false })
    has_garden!: boolean;

    @Column({ type: "boolean", default: false })
    has_terrace!: boolean;

    @Column({ type: "boolean", default: false })
    has_other_animals!: boolean;

    @Column({ type: "boolean", default: false })
    experience!: boolean;

    @Column({ type: "enum", enum: AvailableTime, nullable: true })
    available_time!: string;

    @Column({ type: "int", nullable: true })
    max_animals!: number;

    @Column({ type: "enum", enum: Lifestyle, nullable: true })
    lifestyle!: string;

    @Column({ type: "enum", enum: NoiseTolerance, nullable: true })
    noise_tolerance!: string;

    @Column({ type: "enum", enum: TimeAtHome, nullable: true })
    time_at_home!: string;

    @Column({ type: "text", nullable: true })
    motivation!: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;

    @Column({ type: "timestamp", nullable: true, default: null })
    updated_at!: Date;
}