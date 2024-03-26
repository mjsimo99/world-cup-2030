import React, { ChangeEvent, useState } from 'react';
import registerImage from '../../assets/images/loginImage.jpg';
import svgRegister from '../../assets/images/login-svgrepo-com.svg';
import { useAppDispatch } from '../../redux/store';
import { register } from '../../redux/actions/authActions';
import Client from '../../interfaces/client/Client';
import { Link, useNavigate } from 'react-router-dom';
import { uploadFile } from '../../redux/actions/fileActions';

const RegisterForm = () => {
    const [registerData, setRegisterData] = useState<Partial<Client>>({ username: '', password: '', email: '', firstName: '', lastName: '', dateOfBirth: '', phoneNumber: '', address: '', avatar: '' });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await dispatch(register(registerData));
            navigate('/', { replace: true });

        } catch (error) {
            console.error('Error registering:', error);
        }
    };
    const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (name === 'avatar' && files) {
            const file = files[0];
            try {
                const avatarUrl = await uploadFile(file);
                setRegisterData(prevData => ({ ...prevData, avatar: avatarUrl }));
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            setRegisterData(prevData => ({ ...prevData, [name]: value }));
        }
    }


    return (
        <div className="flex justify-center h-screen">
            <div className="hidden bg-cover lg:block lg:w-2/3" style={{ backgroundImage: `url(${registerImage})` }}>
                <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                    <div>
                        <h2 className="text-2xl font-bold text-white sm:text-3xl">Register</h2>
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
                        <img src={svgRegister} alt="register" className='w-20' />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex gap-4 mb-4">
                            <div className="w-1/2">
                                <label htmlFor="username" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    onChange={handleInputChange}
                                    value={registerData.username}
                                    name="username"
                                    placeholder="Username"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    required />
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="password" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={handleInputChange}
                                    value={registerData.password}
                                    name="password"
                                    placeholder="Your Password"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    required
                                    autoComplete="current-password"
                                />

                            </div>
                        </div>
                        <div className="flex gap-4 mb-4">
                            <div className="w-full">
                                <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    onChange={handleInputChange}
                                    value={registerData.email}
                                    name="email"
                                    placeholder="Your Email"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex gap-4 mb-4">
                            <div className="w-1/2">
                                <label htmlFor="firstName" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    onChange={handleInputChange}
                                    name="firstName"
                                    value={registerData.firstName}
                                    placeholder="First Name"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    required
                                />
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="lastName" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    onChange={handleInputChange}
                                    name="lastName"
                                    value={registerData.lastName}
                                    placeholder="Last Name"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex gap-4 mb-4">
                            <div className="w-full">
                                <label htmlFor="address" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    onChange={handleInputChange}
                                    name="address"
                                    value={registerData.address}
                                    placeholder="Address"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex gap-4 mb-4">
                            <div className="w-1/2">
                                <label htmlFor="dateOfBirth" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Date of Birth</label>
                                <input
                                    type="date"
                                    id="dateOfBirth"
                                    onChange={handleInputChange}
                                    name="dateOfBirth"
                                    value={registerData.dateOfBirth}
                                    placeholder="Date of Birth"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    required
                                />
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="phoneNumber" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Phone Number</label>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    onChange={handleInputChange}
                                    name="phoneNumber"
                                    value={registerData.phoneNumber}
                                    placeholder="Phone Number"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex gap-4 mb-4">
                            <div className="w-full">
                                <label htmlFor="avatar" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Avatar</label>
                                <input
                                    onChange={handleInputChange}
                                    name="avatar"
                                    type="file"
                                    id="avatar"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                        </div>
                        <div className="mt-6">
                            <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-green-500 rounded-lg hover:bg-green-400 focus:outline-none focus:bg-green-400 focus:ring focus:ring-green-300 focus:ring-opacity-50">
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Do you have an account?{' '}
                            <Link
                                to="/"
                                className="font-medium text-green-600 hover:text-green-500"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;