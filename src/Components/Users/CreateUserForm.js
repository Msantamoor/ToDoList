import React from 'react';
import '../../form.css'
import Axios from 'axios'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';


function validate(username, email, password, cpassword) {
    return {
        username: username.length === 0,
        email: email.length === 0,
        password: password.length === 0,
        cpassword: cpassword !== password || cpassword.length === 0
    }
    
}

export default class CUForm extends React.Component {
    state = {
        username: "",
        email: "",
        password: "",
        cpassword: "",

        touched: {
            username: false, 
            email: false,
            password: false,
            cpassword: false,
        },

        unavailableUsers: [],
        unavailableEmails: []
    };

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
        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        Axios.get('https://to-do-list-server-api.herokuapp.com/textfont', {
            params: {
                username: this.state.username
            }
        })
        .then(res => {
            console.log(res)
            if(res.data === true){
            (Axios.get('https://to-do-list-server-api.herokuapp.com/textcolor', {
                params: {
                    email: this.state.email
                }
            })
            .then((res) => {
                console.log(res)
                if(res.data === true){
                    console.log(`Email ${this.state.email} Available`)
                    Axios.post('https://to-do-list-server-api.herokuapp.com/users', user)
                    .then((res) => {
                        console.log(res.data)
                    }).catch((error) => {
                        console.log(error)
                    });
                    this.setState({
                        username: "",
                        email: "",
                        password: "",
                        cpassword: "",
    
                        touched: {
                            username: false,  
                            email: false,
                            password: false,
                            cpassword: false,
                        }
    
                    })
                    this.setState({ redirect: true})
                } else if(res.data === false){
                    this.state.unavailableEmails.push(this.state.email)
                    this.setState({email: this.state.email})
                    console.log(`Email ${this.state.email} is already in use`)
                }
            }).catch((error) => {
                console.log(error)
            }))
             
            } else if(res.data === false){
                this.state.unavailableUsers.push(this.state.username)
                this.setState({username: this.state.username})
                console.log(`Username ${this.state.username} is unavailable`)
            }
        }) 
        .catch(function(error){
            console.log(error);
        })

    }

    render(){
        if (this.state.redirect) {
            return <Redirect push to={ '/' }/>
          }

        var errors = validate(this.state.username, this.state.email, this.state.password, this.state.cpassword);        
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
                <h3>New User Registration</h3>
                <input 
                name="username" 
                className={showErr('username') ? "error" : ""}
                filled={showValid('username') ? "good" : ""}
                taken={this.state.unavailableUsers.includes(this.state.username) ? "true" : ""}
                onBlur={this.handleBlur('username')}
                placeholder="Username"
                value={this.state.username} 
                onChange={e => this.change(e)}
                />
                <br/>
                <p className={this.state.unavailableUsers.includes(this.state.username) ? "shown-messages" : "hidden-messages"}> Username unavailable</p>
                <p className={showErr('username') ? "shown-messages" : "hidden-messages"}> Enter Username</p>
                <br/>
                <input 
                name="email"
                className={showErr('email') ? "error" : ""}
                filled={showValid('email') ? "good" : ""}
                taken={this.state.unavailableEmails.includes(this.state.email) ? "true" : ""}
                onBlur={this.handleBlur('email')}
                placeholder="Email Address" 
                value={this.state.email} 
                onChange={e => this.change(e)}
                />
                <br/>
                <p className={this.state.unavailableEmails.includes(this.state.email) ? "shown-messages" : "hidden-messages"}> Email already in use, try Signing In</p>
                <p className={showErr('email') ? "shown-messages" : "hidden-messages"}> Enter a valid Email address</p>
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
                <p className={showErr('password') ? "shown-messages" : "hidden-messages"}>Enter a good password</p>
                <br/>
                <input 
                name="cpassword"
                className={showErr('cpassword') ? "error" : ""}
                filled={showValid('cpassword') ? "good" : ""}
                onBlur={this.handleBlur('cpassword')}
                placeholder="Confirm Password"
                type="password" 
                value={this.state.cpassword} 
                onChange={e => this.change(e)}
                />
                <br/>
                <p className={showErr('cpassword') ? "shown-messages" : "hidden-messages"}>Passwords must match</p>
                <br/>
                <p className={isEnabled ? "shown-messages" : "hidden-messages"}>Ready to submit</p>
                <br/>
                <button disabled={!isEnabled} onClick={e => this.onSubmit(e)}>Create Account</button>
                
            </form>
            <p>Already have an account?</p><Link to="/">Sign-in</Link>
            </div>
            
        )
    }
}