import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SecurityService } from '@security/service/security.service';
import { SignInPayload } from '@security/model/payload/sign-in.payload';
import { Public, User } from '@common/config/metadata';
import { SignUpPayload } from '@security/model/payload/sign-up.payload';
import { RefreshPayload } from '@security/model/payload/refresh.payload';
import { Credential } from '@security/model/entity';

@ApiBearerAuth('access-token')
@ApiTags('Account')
@Controller('account')
export class SecurityController {
	constructor(private readonly securityService: SecurityService) {}

	@Public()
	@Post('sign-in')
	public signIn(@Body() payload: SignInPayload) {
		return this.securityService.signIn(payload, false);
	}

	@Public()
	@Post('admin/sign-in')
	public adminSignIn(@Body() payload: SignInPayload) {
		return this.securityService.signIn(payload, true);
	}

	@Public()
	@Post('sign-up')
	public signUp(@Body() payload: SignUpPayload) {
		return this.securityService.signUp(payload);
	}

	@Public()
	@Post('refresh')
	public refresh(@Body() payload: RefreshPayload) {
		return this.securityService.refresh(payload);
	}

	@Get('me')
	public me(@User() user: Credential) {
		return user;
	}

	@Delete('delete/:id')
	public delete(@Param('id') id: string, @User() user: Credential) {
		// TODO: Check if user is admin

		return this.securityService.delete(id, user);
	}
}
