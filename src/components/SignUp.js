import React , {Fragment, Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from './HeaderComponent';
import axios from 'axios';
import Cookie from 'js-cookie';
import history from './history';
import {Link} from 'react-router-dom';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        localhost:3000
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default class SignUp extends Component {
    constructor(props){
        super(props);
        const useStyles = makeStyles((theme) => ({
          paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          },
          avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
          },
          form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
          },
          submit: {
            margin: theme.spacing(3, 0, 2),
          },
          }));
        this.state = {
          classes : useStyles,
          email : "",
          password1 : "",
          password2 : "",
          fname : "",
          lname : "",
          userName: "",
          bio : "",
          emailErrorText : "",
          passwordErrorFlag: false,
          emailErrorFlag : false,
          passwordErrorText : "",
          userNameErrorFlag : false,
          userNameErorrText : "",
          submitError:"none",
          submitErrorText:"",
          password2ErrorFlag : false,
          password2ErrorText : "",
          submitSuccess:"none",
          submitSuccessText:"",
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {
      let activeUser = Cookie.getJSON("activeUser");
      if(activeUser){
          history.push('/dashboard');
      }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        });
        console.log(name,value);
        this.validate(name,value);
        
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
          submitError:"none",
          submitErrorText:"",
          submitSuccess:"none",
          submitSuccessText:"",
        });
        if(!(this.state.emailErrorFlag || this.state.password1ErrorFlag || this.state.password2ErrorFlag || this.state.userNameErrorFlag)) {
            this.setState({
                submitError : "none",
                
            })
            console.log("username",this.state.email);
            console.log("fname",this.state.fname);
            console.log("lname",this.state.lname);
            console.log("bio",this.state.bio);
            const args = {
              username:this.state.userName,
              password:this.state.password2,
              email: this.state.email,
              fname: this.state.fname,
              lname: this.state.lname,
              bio: this.state.bio
            }
            
            axios.post('https://wp.fmv.cc/wpdemo/wp-json/react/signup',args)
              .then((response) => {
                console.log(response);
                if(response.data.code===200) {
                  this.setState({
                    submitSuccess : "block",
                    submitSuccessText : response.data.message
                })
                } else {
                    let err = "";
                    for(let i=0;i<response.data.errors.length-1;i++) {
                      err+=response.data.errors[i]+' | ';
                    }
                    err+=response.data.errors[response.data.errors.length-1];
                    this.setState({
                        submitError : "block",
                        submitErrorText : err
                    })
                }
              })
              .catch( (error) => {
                this.setState({
                    submitError : "block",
                    submitErrorText : "Server Unreachable"
                })
              }); 

        } else {
            this.setState({
                submitError : "block",
                submitSuccess:"none",
                submitSuccessText:"",
            })
        }

    }

    validate(caller,value) {    
        if(caller==="email") {
            let email = value;
            var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!emailPattern.test(email)) {
                this.setState({
                    emailErrorFlag :  true,
                    emailErrorText : "Please enter valid email addressed"
                });
            } else {
                this.setState({
                    emailErrorFlag : false,
                    emailErrorText : ""
                });
                
            }
        } else if(caller==="password1") {
          if(value==="" || value.length<=5) {
            this.setState({
              password1ErrorFlag :  true,
              password1ErrorText : "Password is required field or atleast 6 characters long"
            });
          } else {
            this.setState({
              password1ErrorFlag :  false,
              password1ErrorText : ""
            });
          }
        } else if(caller==="password2") {
          if(value!==this.state.password1) {
            this.setState({
              password2ErrorFlag :  true,
              password2ErrorText : "Password not matched"
            });
          } else {
            this.setState({
              password2ErrorFlag :  false,
              password2ErrorText : ""
            });
          }
        } else if(caller==="userName") {
          if(value==="" || value.length<=4) {
            this.setState({
              userNameErrorFlag :  true,
              userNameErrorText : "User Name is required and atleast 5 characters long"
            });
          } else {
            this.setState({
              userNameErrorFlag :  false,
              userNameErrorText : ""
            });
          }
        }
    }

    render(){
        return (
                <Fragment>
                <Header />
                <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={this.state.classes.paper}>
                    <Avatar className={this.state.classes.avatar}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Sign Up
                    </Typography>
                    <form className={this.state.classes.form} noValidate onSubmit={this.handleSubmit} autoComplete="false">
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="text"
                fullWidth
                required
                id="userName"
                label="Username"
                name="userName"
                value={this.state.userName}
                onChange={this.handleInputChange}
                error={this.state.userNameErrorFlag}
                helperText={this.state.userNameErrorText}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                error={this.state.emailErrorFlag}
                helperText={this.state.emailErrorText}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="fname"
                variant="outlined"
                fullWidth
                id="fname"
                label="First Name"
                value={this.state.fname}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="lname"
                label="Last Name"
                value={this.state.lname}
                onChange={this.handleInputChange}
                name="lname"
              />
            </Grid>
            
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password1"
                label="Password1"
                type="password"
                id="password1"
                value={this.state.password1}
                onChange={this.handleInputChange}
                error={this.state.password1ErrorFlag}
                helperText={this.state.password1ErrorText}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Password2"
                type="password"
                id="password2"
                value={this.state.password2}
                onChange={this.handleInputChange}
                error={this.state.password2ErrorFlag}
                helperText={this.state.password2ErrorText}
              />
            </Grid>
            <Grid item xs={12}>
            <TextareaAutosize 
                variant="outlined"
                fullWidth
                id="bio"
                label="Bio"
                name="bio"
                type="textarea"
                placeholder="Bio"
                rowsMin={9}
                value={this.state.bio}
                onChange={this.handleInputChange}
                />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={this.state.classes.submit}
          >
            Sign Up
          </Button>
          <div class="alert alert-danger" style={{display:this.state.submitError}} role="alert">
                        {this.state.submitErrorText}
                    </div>
                    <div class="alert alert-success" style={{display:this.state.submitSuccess}} role="alert">
                        {this.state.submitSuccessText}
                    </div>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
        </div>
        <Box mt={8}>
            <Copyright />
        </Box>
        </Container>
        </Fragment>       
            
        );
    }
}