import { ApiProperty } from '@nestjs/swagger';

export class SignUpPayload {
	@ApiProperty()
	email: string;

	@ApiProperty()
	password: string;

	@ApiProperty()
	googleHash: string;

	@ApiProperty()
	euroCoreHash: string;
}
