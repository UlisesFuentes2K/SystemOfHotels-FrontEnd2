import { City } from "./city";
import { Country } from "./country";
import { Gender } from "./gender";
import { TypeDocument } from "./type-document";

export interface Register {
    country:Country[]
    city:City[]
    gender:Gender[];
    typeDocument:TypeDocument[];
}
