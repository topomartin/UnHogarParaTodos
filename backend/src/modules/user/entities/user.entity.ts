import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
    ADMIN = "admin",
    WORKER = "worker",
    USER = "user",
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 10,  unique: true })
    username: string;

    @Column({ length: 10 })
    password: string;

    @Column({ type: "varchar", length: 10,  unique: true })
    email: string;

    @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
    role: UserRole;

    @Column({ type: "boolean" })
    gdpr_consent: boolean;

    @Column({ type: "date" })
    created_at: string;

    @Column({ type: "date", nullable:true, default: null })
    updated_at: string;

    @Column({ type: "date", nullable:true, default: null })
    deleted_at: string;

}
