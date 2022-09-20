import { PartialType } from '@nestjs/mapped-types';
import { CreateBarcitoDto } from './create-barcito.dto';

export class UpdateBarcitoDto extends PartialType(CreateBarcitoDto) {}
