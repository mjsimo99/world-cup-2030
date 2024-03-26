import City from "../city/City";

interface Stadium {
    stadiumId: number;
    name: string;
    capacity: number;
    location: string;
    city: City;
    matches: any[]; 
}

export default Stadium;


