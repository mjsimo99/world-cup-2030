import { combineReducers } from 'redux';
import cityReducer, { CityState } from './cityReducer';
import authReducer, { AuthState } from './authReducer';
import stadiumReducer, { StadiumState } from './stadiumReducer';
import teamReducer, { TeamState } from './teamReducer';
import clientReducer, { ClientState } from './clientReducer';
import registerReducer, { RegisterState } from './registerReducer';
import matchReducer, { MatchState } from './matchReducer';
import teamMatchReducer, { TeamMatchState } from './teamMatchReducer';
import ticketReducer, { TicketState } from './ticketReducer';

export interface RootState {
  register: RegisterState;
  city: CityState;
  auth: AuthState;
  stadium: StadiumState;
  team: TeamState;
  client: ClientState;
  match: MatchState;
  teamMatches: TeamMatchState;
  ticket: TicketState;
}

const rootReducer = combineReducers({
  register: registerReducer,
  city: cityReducer,
  auth: authReducer,
  stadium: stadiumReducer,
  team: teamReducer,
  client: clientReducer,
  match: matchReducer,
  teamMatches: teamMatchReducer,
  ticket: ticketReducer,
});

export default rootReducer;