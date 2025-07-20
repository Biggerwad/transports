import React from 'react'
import { useNavigate } from 'react-router-dom'

function Welcome() {
    const navigate = useNavigate()
    return (
        <div id='welcome' className="mb-5 max-w-lg font-400 text-center font-bold">
            <p>
                Welcome to Commute
            </p>
            <br />


            {/* <button onClick={() => navigate('/requests')}
                className="text-white bg-gray-600 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
            >
                Cancel Ride
            </button> <br /> <br /> */}

            <button onClick={() => navigate('/host')}
                className="text-white bg-green-500 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
            >
                Host
            </button>
            <br /> <br />
            <button onClick={() => navigate('/:hostId')}
                className="text-white bg-green-500 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
            >
                Operator
            </button>

        </div>
    )
}

export default Welcome