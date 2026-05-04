import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Animal } from "./animal.entity";

@Entity('animal_profile')
export class AnimalProfile {

    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => Animal, (animal) => animal.profile, { nullable: false })
    @JoinColumn({ name: 'animal_id' })
    animal!: Animal;

    @Column({ type: 'varchar', length: 50, nullable: true })
    size!: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    energy_level!: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    temperament!: string;

    @Column({ type: 'boolean', default: false })
    good_with_kids!: boolean;

    @Column({ type: 'boolean', default: false })
    good_with_animals!: boolean;

    @Column({ type: 'boolean', default: false })
    needs_garden!: boolean;

    @Column({ type: 'boolean', default: false })
    needs_experience!: boolean;

    @Column({ type: 'varchar', length: 50, nullable: true })
    preferred_housing_type!: string;

    @Column({ type: 'int', nullable: true })
    min_space_required!: number;

    @CreateDateColumn()
    created_at!: Date;

    @Column({ type: 'timestamp', nullable: true, default: null })
    updated_at!: Date;
}