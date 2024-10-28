import { ApiProperty } from '@nestjs/swagger';

export class SignInPayload {
	@ApiProperty()
	email: string;

	@ApiProperty()
	password: string;

	@ApiProperty()
	googleHash: string;

	@ApiProperty()
	euroCoreHash: string;

	@ApiProperty()
	useProvider: boolean;
}
