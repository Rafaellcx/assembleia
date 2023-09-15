import { OptionVoto } from "../voto.entity";

export class ResultVoteResource {
    pauta: string;
    opening: Date;
    closing: Date;
    totalVote: number;
    quantityYes: number;
    quantityNo: number;
    winningOption: OptionVoto;
}