import { IsIn, IsNotEmpty } from "class-validator";
import { OptionVoto } from "./voto.entity";

export class RegisterVotoResource {
    @IsNotEmpty({ message: "CPF deve ses informado." })
    cpf: string;
    @IsNotEmpty({ message: "Opção de voto deve ser informada." })
    @IsIn(
        [OptionVoto.NO, OptionVoto.YES],
        { message: 'Opção de voto só poderá ter os valores "Yes" ou "No".' }
    )
    optionVoto: OptionVoto;
}