import React, { useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../hooks/OperatorContext'
import { loginOperator, resetPassword, signupAdmin } from '../../hooks/https';
import Loader from '../../components/Loader';
import SigninOperator from '../signinOperator';

function ResetPassword() {
    const navigate = useNavigate();
    const { setUserInfo, loader, setLoader } = useContext(UserContext);
    const { token } = useParams();
    const [match, setMatch] = useState(true);
    const [formData, setFormData] = useState({
        password: '',
        pass2: '',
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoader(true)

        // This logic will be moved to utils
        await resetPassword(formData.password, token).then((data) => {
            if (data.ok) {  // Check if data exists and if there's no error
                // Populating user container
                setLoader(false);
                navigate('/operator/');
            } else {
                // Display the error message if available
                alert(data.msg);
                setLoader(false);
            }

        });
    }

    const onChange = (e) => {
        const { password, pass2 } = formData;

        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })

        if (e.target.id === 'pass2') {
            setMatch(password === e.target.value);
        };

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

                <h3 className='font-400 text-center my-2 font-bold'>Reset Password</h3>

                <form className="" onSubmit={onSubmit}>

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
                        <p>{ }</p>
                    </div>

                    <div className="mb-5 max-w-sm">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                        <input
                            type="password"
                            id="pass2"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            value={formData.pass2}
                            onChange={onChange} // Update state directly
                        />
                        <p>{!match ? "password does not match!" : ""}</p>
                    </div>

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Save
                    </button>
                </form>

                <div className='my-2 text-center'>
                    <Link to="/signin">
                        <button>
                            Go home
                        </button>
                    </Link>
                </div>

            </div>

            {/* // : <Loader />} */}
        </>
    );
}

export default ResetPassword;