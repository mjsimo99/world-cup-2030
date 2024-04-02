
import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  sub: string;
  iss: string;
  iat: number;
  exp: number;
  username: string;
  email: string;
  avatar: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  clientId: number;
  
}

export const getDecodedToken = (token: string): DecodedToken => {
  return jwtDecode(token);
};
