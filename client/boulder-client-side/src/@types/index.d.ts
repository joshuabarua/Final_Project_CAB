import {VoucherData} from './index.d';
export interface User {
	_id: string;
	email: string;
	password: string;
	name: string;
	vouchers: [];
	assignedBookings: [];
}

export type Users = User[];

export interface NotOk {
	error: string;
}

export interface updateFields {
	email?: string;
	password?: string;
	username?: string;
	profilePicFile?: File | null;
}

export type LoginData = {
	login: {
		token: string;
		user: User;
	};
};

export interface LoginVariables {
	loginEmail: string;
	loginPassword: string;
}

export interface RegisterVariables {
	registerEmail: string;
	registerPassword: string;
	registerName: string;
}

export type RegisterData = {
	register: {
		token: string;
		user: User;
	};
};

export interface VoucherVariables {
	userId: any;
	numberOfVouchers: number;
}

export type VoucherData = {
	voucher: {
		_id: string;
		user: User;
	};
};
