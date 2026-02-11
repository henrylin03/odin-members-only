type Email = `${string}@${string}`;
export type User = {
	firstName: string;
	lastName: string;
	username: Email;
	password: string;
};
