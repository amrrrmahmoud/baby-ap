import { MinLength } from "class-validator";
import { IsEnum } from "class-validator";

export class CreateNinjaDto {
    @MinLength(3)
    name: string;
    @IsEnum(["stars", "nunchucks"],{message: 'use correct weapon'})
    weapon: "stars" | "nunchucks";
}
