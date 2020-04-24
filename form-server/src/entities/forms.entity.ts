import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column } from 'typeorm';

@Entity()
export class Forms {
	@PrimaryGeneratedColumn()
	id!: number 

	@Column()
	user_id: number

	@CreateDateColumn()
	submitTime: Date = new Date()

	@Column()
	form_type: string

	@Column("text")
	form_content: string 

}
