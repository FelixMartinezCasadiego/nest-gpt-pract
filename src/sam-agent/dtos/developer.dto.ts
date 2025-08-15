import { IsArray, IsOptional, IsString } from 'class-validator';

export class DeveloperDto {
  @IsString()
  readonly prompt: string;

  @IsString()
  readonly conversationId: string;

  @IsOptional()
  @IsString()
  readonly model?: string;

  @IsOptional()
  @IsArray()
  readonly tools?: string[];
}
