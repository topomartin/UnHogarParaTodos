import { UserRole } from 'src/common/knowledge/enums';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, OneToOne } from 'typeorm';
import { Adoption } from './adoption.entity';
import { Fostering } from './fostering.entity';
import { Sponsorship } from './sponsorship.entity';
import { UserProfile } from './user_profile.entity';
import { AnimalRequest } from './animal_request.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 50, unique: true })
    username!: string;

    @Column({ select: false,  length: 254 })
    password!: string;

    @Column({ type: "varchar", length: 50, unique: true })
    email!: string;

    @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
    role!: UserRole;

    @Column({ type: "boolean" })
    gdpr_consent!: boolean;

    @Column({ type: "date" })
    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;

    @Column({ type: "timestamp", nullable: true, default: null })
    updated_at!: Date;

    @Column({ type: "timestamp", nullable: true, default: null })
    deleted_at!: Date;

    @OneToOne(() => UserProfile, (profile) => profile.user)
    profile!: UserProfile;

    @OneToMany(() => Adoption, (adoption) => adoption.user)
    adoptions!: Adoption[]

    @OneToMany(() => AnimalRequest, (req) => req.user)
    animal_requests!: AnimalRequest[];

    @OneToMany(() => Fostering, (fostering) => fostering.user)
    fosterings!: Fostering[]

    @OneToMany(() => Sponsorship, (sponsorship) => sponsorship.user)
    sponsorships!: Sponsorship[]

}
