import React from 'react';
import '../../form.css'
import Axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import '../../App';
import { AuthContext } from '../../Context/Authentication';


function validate(username, password) {
    return {
        username: username.length === 0,
        password: password.length === 0,
    }
    
}

export default class SIForm extends React.Component {
   
            state = { 
            username: "", 
            password: "",

            touched: {
                username: false, 
                password: false
            },

            attempt: true
        }

    change = e => {
        this.setState({
        [e.target.name]: e.target.value
        })
    };

    handleBlur = (field) => (e) => {
        this.setState({
          touched: { ...this.state.touched, [field]: true },
        });
      }


    onSubmit = e => {
        e.preventDefault()
        Axios.get('https://to-do-list-server-api.herokuapp.com/colortheme', {
            params: {
                username: this.state.username,
                password: this.state.password
            }
        })
        .then(res => {
            console.log(res)
            if(res.data === true){
                console.log('Password matches')
                this.context.authenticate()
                this.setState({ attempt: true})
                this.setState({ redirect: true})
            } else {
                this.setState({
                    username: "", 
                    password: "",

                touched: {
                    username: false, 
                    password: false
                }
                })
                this.setState({ attempt: false})
                console.log(`Matching Failed ${this.state.password}`)
            }
        })
        .catch(function(error){
            console.log(error);
        })
       
    }

    render(){

        if(this.state.redirect){
            console.log('login successful')
            return(
            <AuthContext.Consumer>
            {({identify}) => (
                <Redirect push={identify(this.state.username, this.context.state.activeList)} to={'/Select'}/>
            )}
            </AuthContext.Consumer>
            )
            }
    
        
        

        var errors = validate(this.state.username, this.state.password);        
        const isEnabled = !Object.keys(errors).some(x => errors[x]);
        
        const showErr = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];
      
            return hasError ? shouldShow : false;
          };

          const showValid = (field) => {
            const shouldShow = this.state.touched[field];

            return shouldShow ? true : false
            
          };

          
        return (
            <div>
            <form>
                <h3>Sign-In</h3>
                <input 
                name="username" 
                className={showErr('username') ? "error" : ""}
                filled={showValid('username') ? "good" : ""}
                onBlur={this.handleBlur('username')}
                placeholder="Username"
                value={this.state.username} 
                onChange={e => this.change(e)}
                />
                <br/>
                <p className={showErr('username') ? "shown-messages" : "hidden-messages"}>Enter Username</p>
                <br/>
                <input 
                name="password"
                className={showErr('password') ? "error" : ""}
                filled={showValid('password') ? "good" : ""}
                onBlur={this.handleBlur('password')}
                placeholder="Password"
                type="password" 
                value={this.state.password} 
                onChange={e => this.change(e)}
                />
                <br/>
                <p className={showErr('password') ? "shown-messages" : "hidden-messages"}>Enter Password</p>
                <br/>
                <p className={this.state.attempt ? "hidden-messages" : "shown-messages"}>Sign-In Failed</p>
                <br/>
                
                <button disabled={!isEnabled} onClick={e => this.onSubmit(e)}>Sign-In</button>
            </form>
            <p>New User?</p> <Link to="/CUForm">Create Account</Link>
            </div>
        )
    }
}
SIForm.contextType = AuthContext;