import { Country } from "./country";

export interface City {
    idCity:number;
    idCountry:number;
    name:string;
    country:Country;
}
