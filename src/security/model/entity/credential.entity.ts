import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';
import { credentialPkGenerator } from '@common/config';
import { Exclude } from 'class-transformer';

@Entity()
export class Credential {
	@PrimaryColumn('varchar', {
		length: 26,
		default: () => `'${credentialPkGenerator()}'`,
	})
	credential_id: string;

	@Column({ nullable: false, unique: true })
	email: string;

	@Column({ nullable: true })
	@Exclude({ toPlainOnly: true })
	password: string;

	@Column({ nullable: true, unique: false })
	facebookHash: string;

	@Column({ name: 'google_hash', nullable: true, unique: false })
	googleHash: string;

	@Column({ name: 'euro_core_hash', nullable: true, unique: false })
	euroCoreHash: string;

	@Column({ name: 'is_admin', default: false })
	isAdmin: boolean;

	@Column({ default: false })
	active: boolean;

	@CreateDateColumn({
		name: 'created_at',
		nullable: false,
		default: new Date(),
	})
	createdAt: Date;

	@UpdateDateColumn({
		name: 'updated_at',
		nullable: false,
		default: new Date(),
	})
	updatedAt: Date;
}
