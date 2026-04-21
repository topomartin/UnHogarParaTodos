import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Animal } from "./animal.entity";

@Entity('animal_images')
export class AnimalImage {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    image_url!: string;

    @Column({ type: 'boolean', default: false })
    is_main!: boolean;

    @Column({ type: 'datetime', nullable: true, default: null })
    deleted_at!: Date | null;

    @CreateDateColumn()
    created_at!: Date;

    @ManyToOne(() => Animal, (animal) => animal.images, { onDelete: 'CASCADE' })
    animal!: Animal;
}