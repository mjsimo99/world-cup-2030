import { Link } from 'react-router-dom';

import AdminRoutes from '../../routes/AdminRoutes';
import logo from '../../assets/images/logoadmin.png';
import { useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import { RootState } from '../../redux/reducers/RootState';
import { useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import { getDecodedToken } from '../../guards/tokenUtils';
import { Avatar } from 'flowbite-react';
import '../../pages/css/main.css';

function NavbarAdmin() {
    const [hasError] = useState(false);


    const dispatch = useAppDispatch();
    const token = useSelector((state: RootState) => state.auth.token); 
  
    const handleLogout = () => {
      dispatch(logout());
    };
  
    let username = '';
    let email = '';
    let avatar = '';
    if (token) {
      const decodedToken = getDecodedToken(token);
      username = decodedToken.username;
      email = decodedToken.email;
      avatar = decodedToken.avatar;
      console.log(avatar);
    }

    return (

        <div className="flex bg-gray-100 min-h-screen" >

            <aside className="hidden sm:flex sm:flex-col">

                <div className="satocolor inline-flex items-center justify-center h-20 w-26 ">
                    <a className="flex items-center mx-2" href="#">
                        <img className="w-8 h-8 mx-1 sm:h-10 sm:w-10" src={logo} alt="logo" />
                        <div className="mx-1 text-gray-700">
                            <h3 className="uppercase tracking-[0.15em] font-medium ">Sato-Cup</h3>
                            <p className="text-xs italic">World Cup Maroc 2030</p>
                        </div>
                    </a>

                    <button className="text-gray-600 lg:hidden ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>


                <div className="flex-grow flex flex-col justify-between text-white bg-black">

                    <nav className="flex flex-col mx-4 my-6 space-y-4">
                        <Link to="/adminCity"
                            className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
                            <span className="sr-only">city</span>
                            cities
                        </Link>
                        <Link to="/adminStadium"
                            className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
                            <span className="sr-only">stadium</span>
                            stadiums
                        </Link>
                        <Link to="/adminTeam"
                            className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
                            <span className="sr-only">team</span>
                            teams
                        </Link>
                        <Link to="/adminClient"
                            className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
                            <span className="sr-only">client</span>
                            clients
                        </Link>
                        <Link to="/adminMatch"
                            className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
                            <span className="sr-only">match</span>
                            matchs
                        </Link>
                        <Link to="/adminTeamMatch"
                            className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
                            <span className="sr-only">team-match</span>
                            teams-matchs
                        </Link>
                        <Link to="/adminTicket"
                            className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
                            <span className="sr-only">ticket</span>
                            tickets
                        </Link>



                    </nav>

                    <div className="inline-flex items-center justify-center h-20 w-20 border-t border-gray-700 w-full">
                        <button className="p-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
                            <span className="sr-only">Settings</span>
                            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </aside>
            <div className="flex-grow text-gray-800">
                <header className="flex items-center h-20 px-6 sm:px-10 bg-black">
                    <button
                        className="block sm:hidden relative flex-shrink-0 p-2 mr-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 rounded-full">
                        <span className="sr-only">Menu</span>
                        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />

                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </button>

                    <div className="flex flex-shrink-0 items-center ml-auto">
                        <button className="inline-flex items-center p-2 hover:bg-gray-600 focus:bg-gray-700 rounded-lg">
                            <span className="sr-only">User Menu</span>
                            <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
                                <span className="tname font-semibold" style={{ color: 'antiquewhite' }}>{username}</span>
                                <span className="text-sm text-white">
                                    {/* Administrateur */}
                                    {email}
                                    </span>
                            </div>
                            <span className="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
                                {/* <img src={avatar} alt="user profile photo" className="h-full w-full object-cover" /> */}
                                <Avatar alt="User settings" img={avatar} rounded size="10px" />

                            </span>
                           
                        </button>
                        <div className="border-l pl-3 ml-3 space-x-1">
                            
                            <button onClick={handleLogout}
                                className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
                                <span className="sr-only">Log out</span>
                                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </header>

                {!hasError && (

                    <main className="p-6 sm:p-10 space-y-6">
                        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                            <div className="mr-6">
                                <h1 className="text-4xl font-semibold mb-2">Welcome To SatoQuiz</h1>
                                <h2 className="text-gray-600">Manage all aspects of Satocup, including ticket reservations for the FIFA World Cup 2030 in Morocco.</h2>
                            </div>
                        </div>
                        {/* tt */}

                    </main>
                )}

                <main className="p-6 sm:p-10 space-y-6">

                    <AdminRoutes />

                </main>


            </div>
        </div>
    );

}


export default NavbarAdmin;







{/* <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                        <div className="flex items-center p-8 bg-white shadow rounded-lg">
                            <div
                                className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
                                <img alt="Level" className="h-6 w-6 object-cover" />
                            </div>

                            <div>
                                <span className="block text-2xl font-bold">Levels </span>
                            </div>
                        </div>
                        <div className="flex items-center p-8 bg-white shadow rounded-lg">
                            <div
                                className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
                                <img alt="Subject" className="h-6 w-6 object-cover" />
                            </div>

                            <div>
                                <span className="block text-2xl font-bold">Subjects </span>
                            </div>
                        </div>
                        <div className="flex items-center p-8 bg-white shadow rounded-lg">
                            <div
                                className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
                                <img alt="Subject" className="h-6 w-6 object-cover" />
                            </div>

                            <div>
                                <span className="block text-2xl font-bold">Questions :</span>
                            </div>
                        </div>
                        <div className="flex items-center p-8 bg-white shadow rounded-lg">
                            <div
                                className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
                                <img alt="Subject" className="h-6 w-6 object-cover" />
                            </div>

                            <div>
                                <span className="block text-2xl font-bold">Answers :</span>
                            </div>
                        </div>

                    </section> */}