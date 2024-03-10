import { IsNotEmpty, IsString, isNotEmpty } from "class-validator";

export class CreateProjectRequest {
  @IsString()
  @IsNotEmpty()
  name: string;
  
}
