import Stadium from "../stadium/Stadiums";

interface Match {
    matchId: number;
    ticketPrice: number;
    ticketAvailable: number;
    staduim : Stadium;
    name: string;
}

export default Match;