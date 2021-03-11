export class Multimedia {

    private _trailer:string;
    private _date:string;
    constructor(private _src:string,private _text:string,private _title:string, private _genre:string[],private _id:string,private _rate:number,private _type:string) {   
    }
    public set trailer(value){
        this._trailer = value;
    }
    public set date(value){
        this._date = value;
    }
    public get date():string{
        return this._date;
    }
    public get src():string {
        return this._src;
    }
    public get text():string {
        return this._text;
    }
    public get title():string {
        return this._title;
    }
    public get genre():string[] {
        return this._genre;
    }
    public get id():string {
        return this._id;
    }
    public get rate():number {
        return this._rate;
    }
    public get type():string {
        return this._type;
    }
    public get trailer():string {
        return this._trailer;
    }
}