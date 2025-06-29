import { PartialType } from '@nestjs/mapped-types';
import { CreateRentalDto } from './create-rental.dto';

export class UpdateBusinessDto extends PartialType(CreateRentalDto) {}