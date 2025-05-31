import { City } from "../../../../SystemOfHotels_F/src/app/Models/city";
import { TypeDocument } from "./type-document";

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
    typeDocument:TypeDocument;
}
