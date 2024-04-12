import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTaskRequest {
  @IsString()
  @IsNotEmpty()
  	name: string;

  @IsString() status: string;

  @IsNotEmpty()
  @IsNumber()
  	project_id: number;
}
