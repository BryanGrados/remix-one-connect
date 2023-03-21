import type { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { type } from "os";

import { prisma } from "../utils/db/db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
	return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User["email"]) {
	return prisma.user.findUnique({ where: { email } });
}

export async function createUser(
	email: User["email"],
	password: User["password"],
) {
	const hashedPassword = await bcrypt.hash(password, 10);

	return prisma.user.create({
		data: {
			email,
			password: hashedPassword,
		},
	});
}

export async function deleteUserByEmail(email: User["email"]) {
	return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
	email: User["email"],
	password: User["password"],
) {
	const userWithPassword = await prisma.user.findUnique({
		where: { email },
		select: { password: true },
	});

	if (!userWithPassword?.password) {
		return null;
	}

	const isPasswordCorrect = await bcrypt.compare(
		password,
		userWithPassword.password,
	);

	if (!isPasswordCorrect) {
		return null;
	}

	const { password: _password, ...user } = userWithPassword;

	return user;
}
