import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column } from 'typeorm'

@Entity()
class Forms {
	@PrimaryGeneratedColumn()
	id!: number 

	@CreateDateColumn()
	submitTime: Date = new Date()

	@Column("text")
	content: string = ''

}

export default Forms