import React, { useState } from 'react'

function ForgotPassword() {
    const [email, setEmail] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        // send this for processing with extra verification
    }

    return (
        <>

            <h2 className='font-400 text-center my-2 font-bold'>Password Reset</h2>

            <form id='login' className='max-w-sm py-5' onSubmit={onSubmit}>
                <div className='mb-5 max-w-sm'>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>

                    <input
                        type='email'
                        id='email'
                        className="bg-gray-50 my-3 border border-gray-300 text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder='operator@gmail.com'
                        required
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />

                    <button type='submit' className="text-white bg-blue-700 
          hover:bg-blue-800 focus:outline-none 
          focus:ring-blue-300 font-medium rounded-lg text-sm 
          w-full px-5 py-2.5 text-center dark:bg-blue-600 
          dark:hover:bg-blue-700 dark:focus:ring-blue-800">send reset link</button>

                    {/* add password reset counter. */}

                </div>
            </form>
        </>
    );
}

export default ForgotPassword;