import * as bcrypt from 'bcrypt';

export const encryptPassword: (plainText: string) => Promise<string> = async (
	plainText: string,
) => await bcrypt.hashSync(plainText, 12);

export const comparePassword = async (plainText: string, hash: string) =>
	await bcrypt.compare(plainText, hash);
