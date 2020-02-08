import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
	invalidLogin: boolean = true;
	role: String;
	userId: String;
}
