import Match from "../match/match";
import Team from "../team/Team";

interface TeamMatch {

    date: string;
    time: string;
    teamId: number;
    matchId: number;
    teamsName: string;
    team: Team;
    match: Match;
}

export default TeamMatch;

    