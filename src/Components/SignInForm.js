import React from 'react';
import '/Users/morgansantamoor/Helio/Projects/to-do-list/src/form.css'
import Axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/Context';


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
            loggedIn: false,

            touched: {
                username: false, 
                password: false
            }
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
        Axios.get('http://localhost:3306/colortheme', {
            params: {
                username: this.state.username,
                password: this.state.password
            }
        })
        .then(res => {
            console.log(res)
            if(res.data === true){
                console.log('Password matches')
                this.setState({ 

                loggedIn: true
            })
            } else {
                console.log(`Matching Failed ${this.state.password}`)
            }
        })
        .catch(function(error){
            console.log(error);
        })
       
            

    }

    render(){

        if(this.state.loggedIn){
            console.log('login successful')
           return ( <Redirect push to={{
               pathname: '/',
           state: {
            username: this.state.username,
            loggedIn: this.state.loggedIn
           }
        }}/>
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
                <p className="hidden-messages" id={showErr('fname') ? "fname-err" : ""}>Enter Username</p>
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
                <p className="hidden-messages" id={showErr('password') ? "password-err" : ""}></p>
                <br/>
                <p className="hidden-messages" id={isEnabled ? "Ready" : ""}>Ready to submit</p>
                <br/>
                <button disabled={!isEnabled} onClick={e => this.onSubmit(e)}>Sign-In</button>
            </form>
            <p>New User?</p> <Link to="/Components/CreateUserForm.js">Create Account</Link>
            </div>
        )
    }
}