import React, { useEffect, useState } from 'react'
import { resetRequest, tokenVerif } from '../../hooks/https'
import { useNavigate, useParams } from 'react-router-dom';

function Confirm() {
    const [email, setEmail] = useState('')
    const { actToken } = useParams();
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        // verify token validity from API
        async function runSearch() {
            await tokenVerif(actToken).then((res) => {
                if (res.ok) {
                    setLoading(false);
                    setSuccess(true);                    
                    // navigate('/host');
                } else {
                    console.log(res)
                    alert("Token Invalid or Expired")
                };

            }).catch((err) => {
                setSuccess(false);
                console.log(err)
                alert("Invalid or Expired Token ")
            });
        }

        runSearch()
        // send this for processing with extra verification
        // use link reset for now: jwt is needed

        // Forgot password

    }, []);

    return (
        <>
            {loading ? (
                <h2 className='font-400 text-center my-2 font-bold'>Loading</h2>) : (
                <div>
                    <h1>Confirmed</h1>

                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={navigate('/host')}>
                        Signin
                    </button>
                </div>
            )}
        </>
    );
}

export default Confirm;