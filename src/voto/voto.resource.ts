import { IsIn, IsNotEmpty } from "class-validator";
import { OptionVoto } from "./voto.entity";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterVotoResource {
    @IsNotEmpty({ message: "CPF deve ses informado." })
    @ApiProperty()
    cpf: string;
    @IsNotEmpty({ message: "Opção de voto deve ser informada." })
    @IsIn(
        [OptionVoto.NO, OptionVoto.YES],
        { message: 'Opção de voto só poderá ter os valores "Yes" ou "No".' }
    )
    @ApiProperty({example: 'YES or NO', enum: ['YES','NO']})
    optionVoto: OptionVoto;
}