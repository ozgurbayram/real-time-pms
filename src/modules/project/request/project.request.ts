import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectRequest {
  @IsString()
  @IsNotEmpty()
  	name: string;
}

export class UpdateProjectRequest {
  @IsString()
  @IsNotEmpty()
  	name: string;
}
