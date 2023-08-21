export default function isNoteLengthAcceptable(text : string) : boolean{
    let isAcceptable : boolean = false;
    const MINIMUM_LENGTH : number = 20;
    const MAXIMUM_LENGTH : number = 300;
    if(text.length >= MINIMUM_LENGTH && text.length < MAXIMUM_LENGTH)
    {
        isAcceptable = true;
    }
    return isAcceptable;
}