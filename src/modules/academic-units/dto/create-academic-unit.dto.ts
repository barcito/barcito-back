import { IsString } from '@nestjs/class-validator';
export class CreateAcademicUnitDto {
  /**
   * Siglas de la unidad académica
   * @example 'FAIF'
   */
  @IsString()
  shortName: string;

  /**
   * Nombre de la unidad academica
   * @example 'Facultad de Informática'
   */
  @IsString()
  description: string;
}
