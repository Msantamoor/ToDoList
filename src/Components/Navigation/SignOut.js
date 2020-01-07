import React, { useContext } from 'react'
import { useHistory } from "react-router-dom";

import { AuthContext } from '../../Context/Authentication'
 
function SignOut() {
    let history = useHistory();
    let context = useContext(AuthContext)

    return context.isAuthenticated ? (
            <button
                onClick={() => {
                    context.signout(() => history.push("/"));
                }}
            >
                Sign out
      </button>
    ) : (
            <p>Sign in to view lists</p>
        );
}

export default SignOut;