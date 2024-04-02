import Stadium from "../stadium/Stadiums";
import TeamMatch from "../team-match/TeamMatch";

interface Match {
    matchId: number;
    ticketPrice: number;
    ticketAvailable: number;
    stadium : Stadium;
    name: string;
    teamMatches: TeamMatch[];
}

export default Match;