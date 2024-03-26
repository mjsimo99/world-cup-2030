import Client from "../client/Client";
import Match from "../match/match";

interface Ticket {
    ticketId:number;
    quantity:number;
    client:Client;
    match: Match;
}

export default Ticket;