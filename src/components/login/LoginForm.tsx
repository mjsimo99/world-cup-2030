import React, { useState } from 'react';
import loginImage from '../../assets/images/loginImage.jpg';
import svglogin from '../../assets/images/login-svgrepo-com.svg';
import { login } from '../../redux/actions/authActions';
import { useAppDispatch } from '../../redux/store';
import { Link } from 'react-router-dom';
import { InputSwitch } from 'primereact/inputswitch';


const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isAdmin, setIsAdmin] = useState(false); 
    const [checked, setChecked] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login(username, password, isAdmin));
    };
    return (
        <div className="flex justify-center h-screen">
            <div className="hidden bg-cover lg:block lg:w-2/3" style={{ backgroundImage: `url(${loginImage})` }}>
                <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                    <div>
                        <h2 className="text-2xl font-bold text-white sm:text-3xl">Login</h2>
                        <p className="max-w-xl mt-3 text-gray-300">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                            autem ipsa, nulla laboriosam dolores, repellendus perferendis libero suscipit nam temporibus
                            molestiae
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                <div className="flex-1">
                    <div className="text-center mb-8 mx-auto" style={{ width: '100px' }}>
                        <img src={svglogin} alt="login" className='w-20' />
                    </div>
                    <form onSubmit={handleSubmit}>
                        {error && <div className="mb-4 text-red-500">{error}</div>}
                        <div className="mb-4">
                            <label htmlFor="username" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Your Password"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                required
                            />
                        </div>
                        <div className="mb-4">

                        <label className="inline-flex items-center cursor-pointer">
                        <input id="isAdmin" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} type="checkbox" value="" className="sr-only peer"/>
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Is Admin ?</span>
                        </label>
                        </div>
                        <div className="mt-6">
                            <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-green-500 rounded-lg hover:bg-green-400 focus:outline-none focus:bg-green-400 focus:ring focus:ring-green-300 focus:ring-opacity-50">
                                Sign in
                            </button>
                        </div>

                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Don't have an account?{' '}
                            <Link
                                to="/register"
                                className="font-medium text-green-600 hover:text-green-500"
                            >
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default LoginForm;


