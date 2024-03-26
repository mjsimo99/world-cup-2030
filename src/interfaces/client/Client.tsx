interface Client {
    clientId: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phoneNumber: string;
    address: string;
    email: string;
    username: string;
    password: string;
    avatar: string | File ;
}

export default Client;