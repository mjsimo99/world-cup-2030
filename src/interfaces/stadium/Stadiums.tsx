import City from "../city/City";

interface Stadium {
    stadiumId: number;
    name: string;
    capacity: number;
    location: string;
    city: City;
    cityId: number;
    matches: any[]; 
}

export default Stadium;


