import {
	Column,
	CreateDateColumn,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';
import { credentialPkGenerator } from '@common/config';

export class Credential {
	@PrimaryColumn('varchar', {
		length: 26,
		default: () => `'${credentialPkGenerator()}'`,
	})
	credential_id: string;

	@Column({ nullable: false, unique: true })
	username: string;

	@Column({ nullable: true })
	password: string;

	@Column({ nullable: false, unique: true })
	email: string;

	@Column({ nullable: true, unique: false })
	facebookHash: string;

	@Column({ nullable: true, unique: false })
	googleHash: string;

	@Column({ default: false })
	isAdmin: boolean;

	@Column({ default: false })
	active: boolean;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
