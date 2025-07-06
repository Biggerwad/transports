import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../hooks/OperatorContext'
import { loginOperator, signupAdmin } from '../../hooks/https';
import Loader from '../../components/Loader';
import SigninOperator from '../signinOperator';

function Signup() {
    const navigate = useNavigate();
    const { setUserInfo, loader, setLoader } = useContext(UserContext);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoader(true)

        // This logic will be moved to utils
        await signupAdmin(formData).then((data) => {
            
            if (data.ok) {  // Check if data exists and if there's no error
                // Populating user container
                setUserInfo(data.operator);
                setLoader(false);
                navigate('/operator/viewrequests/');
            } else {
                // Display the error message if available
                alert('Incorrect Credentials');
                setLoader(false);
            }
        });
    }

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }

    /**
     * This page will be refined to contain login and signup for operator
     * How:
     * 1. Church rep login.
     * |
     * |--> Signup --> Login --> Reset password
     * |
     * |--> Email, username and password
     * |
     * |--> Dashboard -> view requests
     * 
     */

    return (
        <>
            {/* {!loader ? */}
            <div id='login' className='max-w-sm py-5'>

                <h3 className='font-400 text-center my-2 font-bold'>Host Signup</h3>

                <form className="" onSubmit={onSubmit}>
                    
                    {/* username */}
                    <div className="mb-5 max-w-sm">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                        <input
                            type="username"
                            id="username"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="enter your username"
                            required
                            value={formData.username}
                            onChange={onChange} // Update state directly
                        />
                    </div>

                    {/* email */}
                    <div className="mb-5 max-w-sm">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="E.g operator@gmail.com"
                            required
                            value={formData.email}
                            onChange={onChange} // Update state directly
                        />
                    </div>

                    {/* password */}
                    <div className="mb-5 max-w-sm">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            value={formData.password}
                            onChange={onChange} // Update state directly
                        />
                    </div>

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Signup
                    </button>
                </form>

                <div className='my-2 text-center'>
                    <Link to="/signin">
                        <button>
                            Already have an Account? <br />
                            Signin
                        </button>
                    </Link>
                </div>

            </div>

            {/* // : <Loader />} */}
        </>
    );
}

export default Signup;