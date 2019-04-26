/**
 * Created by Andy on 2017/8/27.
 */
interface Card{
    suit:string;
    card:number;
}

interface Deck{
    suit:string;
    card:number[];

}

let deck:Deck = {
    suit:"hello",
    card:[9,9,9]
};