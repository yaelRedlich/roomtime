import { IsNotEmpty, IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateBusinessDto {
@IsNotEmpty()
@IsString()
name: string;

@IsOptional()
@IsString()
description?: string;

@IsOptional()
@IsString()
address?: string;

@IsOptional()
@IsString()
phone?: string;

@IsOptional()
@IsEmail()
email?: string;
}
