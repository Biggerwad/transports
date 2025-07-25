const API = process.env.REACT_APP_API_ADDRESS;

async function getAllRequests(hostId) {
    try {
        const res = await fetch(`${API}/requests/${hostId}`);
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
        return [];
    }
}

// Delete Request

async function deleteRequest(reqId, setRequests) {
    try {
        const res = await fetch(`${API}/requests`, {
            method: 'DELETE',
            body: JSON.stringify({ id: reqId }),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
        })

        if (res.ok) {
            setRequests((prev) => prev.filter(req => req._id !== reqId));
            return await res.json();
        } else {
            const error = await res.json();
            console.error("Failed to delete:", error.message);
        }

    } catch (err) {
        console.log(err);
    }
}

//Updated

async function getFormStatus({ hostId, formId }) {
    try {
        const data = await fetch(`${API}/operator/formstatus/${hostId}/${formId}`);

        if (!data) {
            return false;
            // throw new Error('Failed to fetch form Status');
        }

        return data.json();

    } catch (err) {
        console.log(err);
    }
};

async function httpsetFormStatus(status) {
    try {
        const formStatus = await fetch(`${API}/operator/formstatus/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(status),
            credentials: 'include',
        })

        return formStatus.status;
    } catch (err) {
        return err;
    }
}


// Get all containers to store assigned operators across the application
async function getAllContainers() {
    try {
        const response = await fetch(`${API}/operator/assign`);
        if (!response) {
            throw new Error('Failed to fetch containers');
        }

        return response.json();
    } catch (err) {
        console.log("Error getting containers");
        console.log(err);
    }
}

// Verify Tokens
async function tokenVerif(token) {
    try {
        const response = await fetch(`${API}/operator/confirm/${token}`);
        if (!response.ok) {
            return response.json();
        };

        return response.json();
    } catch (err) {
        console.log("Error getting containers");
        console.log(err);
        return false;
    }
};

// Login Operator
async function loginOperator({ email, password, type, hostId }) {
    try {
        const res = await fetch(`${API}/operator`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, opType: type, hostId }),
            credentials: 'include',
        });

        if (!res.ok) {
            return res.json();
        };

        const data = await res.json();
        return data;

    } catch (err) {
        console.log(err);
        return { error: "An error occurred while logging in" }; // Return an error object
    }
};

async function signupAdmin({ username, email, password }) {
    try {
        const req = await fetch(`${API}/operator/signup`, {
            method: "POST",
            body: JSON.stringify({ username: username, email: email, password: password }),
            headers: {
                'Content-Type': "application/json"
            },
            credentials: 'include',
        })

        if (!req) {
            return req.json()
        }

        const data = await req.json()
        return data;

    } catch (err) {
        console.log("Error", err)
        return err
    }
}

// password reset from FE
async function resetRequest({ hostName, email, password }) {
    try {
        const req = await fetch(`${API}/operator/resetrequest`, {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': "application/json"
            },
            credentials: 'include',
        })

        if (!req) {
            return req.json()
        }

        const data = await req.json()
        return data;
    } catch (err) {
        console.log("Error", err)
        return err
    }
}


// password reset from FE
async function resetPassword({ token, password }) {
    try {

        const req = await fetch(`${API}/operator/resetpassword`, {
            method: "POST",
            body: JSON.stringify({ token, password }),
            headers: {
                'Content-Type': "application/json"
            },
            credentials: 'include',
        })

        if (!req) {
            return req.json()
        }

        const data = await req.json()
        return data;
    } catch (err) {
        console.log("Error", err)
        return err
    }
}

// Get all operators
// async function getAllOperators(hostId) {
//     try {
//         const res = await fetch(`${API}/operator/hostId`);

//         const data = res.json();
//         return data;
//     } catch (err) {
//         console.log(err);
//         return [];
//     }
// };

// Add Operators
async function addOperator(data) {
    try {
        const res = await fetch(`${API}/operator/add`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include',
        })

        return res;
    } catch (err) {
        console.log(err);
        return [];
    }
}

// Assign operatorId to requests
async function assignOperator(data) {
    try {
        console.log(data.id);
        const res = await fetch(`${API}/operator/assign`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ geolocation: data.geoLoc, operatorId: data.id }),
            credentials: 'include',
        });

        // console.log(res)
        return res
    } catch (err) {
        console.log(err);
        return [];
    }
};

// Modify request e.g request status.
async function updateRequest(request_id, status) {
    try {
        const res = await fetch(`${API}/operator/status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ request_id, status }),
            credentials: 'include',
        })
        if (res) {
            return res
        } else {
            console.log("Error updating status");
            res.status(404).json("Errors updating status!")
        }

    } catch (err) {
        console.log(err)
    }
}

async function modifyOperator(data) {
    console.log(data);
    const response = await fetch(`${API}/operator/modify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    // Parse and return the JSON response from the backend
    if (!response.ok) {
        throw new Error("Failed to update operator");
    }

    return response;
}

export {
    getAllRequests,
    deleteRequest,
    tokenVerif,
    getAllContainers,
    loginOperator,
    signupAdmin,
    // getAllOperators,
    addOperator,
    resetRequest,
    resetPassword,
    modifyOperator,
    assignOperator,
    updateRequest,
    getFormStatus,
    httpsetFormStatus,
}