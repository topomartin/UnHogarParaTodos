import { UserRole } from 'src/common/knowledge/enums';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 10, unique: true })
    username!: string;

    @Column({ length: 254 })
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

}
