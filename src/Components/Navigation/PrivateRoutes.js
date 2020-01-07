import React from "react";
import {
    Route,
    Redirect
} from "react-router-dom";

import { AuthContext } from '../../Context/Authentication'

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
    return (
        <AuthContext.Consumer>
            {({isAuthenticated}) => (
                    <Route
                        {...rest}
                        render={({ location }) =>
                            isAuthenticated ? (
                                children
                            ) : (
                                    <Redirect
                                        to={{
                                            pathname: "/",
                                            state: { from: location }
                                        }}
                                    />
                                )
                        }
                    />
                )
            }
        </AuthContext.Consumer>
        
    );
}

export default PrivateRoute