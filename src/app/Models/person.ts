import { City } from "./city";
import { TypeDocument } from "./type-document";
import { User } from "./user";
export interface Person {
    idPerson:number;
    name:string;
    lastName:string;
    direction:string;
    idGender:number;
    idTypeDocument:number;
    numberDocument:string;
    idCity:number;
    idTypePerson:number;
    city:City;
    users:User;
    typeDocument:TypeDocument;
}