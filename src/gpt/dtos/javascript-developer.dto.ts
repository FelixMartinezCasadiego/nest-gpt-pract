import { IsString } from 'class-validator';

export class JavascriptDeveloperDto {
  @IsString()
  readonly prompt: string;

  @IsString()
  readonly conversationId: string;
}
