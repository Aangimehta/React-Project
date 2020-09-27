import React, { Fragment, Component } from 'react';
import {
    Nav, Navbar, NavbarText, NavbarBrand, Collapse,
    NavbarToggler, NavItem
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';

import history from './history';
import Cookies from 'js-cookie';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


class HomeHeader extends Component {

    constructor(props) {
        super(props);
        const useStyles = makeStyles((theme) => ({
            icon: {
              marginRight: theme.spacing(2),
            },
            heroContent: {
              backgroundColor: theme.palette.background.paper,
              padding: theme.spacing(8, 0, 6),
            },
            heroButtons: {
              marginTop: theme.spacing(4),
            },
            cardGrid: {
              paddingTop: theme.spacing(8),
              paddingBottom: theme.spacing(8),
            },
            card: {
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            },
            cardMedia: {
              paddingTop: '56.25%', // 16:9
            },
            cardContent: {
              flexGrow: 1,
            },
            footer: {
              backgroundColor: theme.palette.background.paper,
              padding: theme.spacing(6),
            },
          }));
        this.state = {
            classes: useStyles,
            isOpen: false,
            activeUser: "",
            flag : false
        }
        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    async componentDidMount() {
        var authData = await Cookies.getJSON("activeUser");
        if (authData) {
            if (authData.role !== "admin") {
                history.push("/dashboard");
            }
            this.setState({
                activeUser: authData
            });
        }
    }

    logout = () => {
        Cookies.remove('activeUser');
        this.setState({
            activeUser:""
        })
        history.push('/');
        
    }

    render() {
        let action = [];
        if (this.state.activeUser.role === "admin") {
            action.push(
                <Fragment>
                    <Nav className="mr-auto" navbar>
                        <NavItem >
                            <Link style={{color:"white"}} to="/">Home</Link>
                        </NavItem>
                        <NavItem >
                            <Link style={{color:"white"}} to="/dashboard">Dashboard</Link>
                        </NavItem>
                    </Nav>
                    <NavbarText><Link onClick={this.logout} to="/">Logout</Link></NavbarText>
                </Fragment>
            );
        } else {
            action.push(
                <Fragment>
                    <Nav className="mr-auto" navbar>
                        <NavItem >
                        <Link style={{color:"white"}} to="/">Home</Link>
                        </NavItem>
                    </Nav>
                    {/* <NavbarText><Link to="/login">Login</Link></NavbarText> */}
                    <NavbarText><Link to="/signin">Login</Link></NavbarText>

                </Fragment>
                
            );
        }
        return (
            <Fragment>
                <Navbar style={{ backgroundColor: "#3f51b5" }} dark expand="md">
                    <div className="container">
                        <NavbarBrand>
                            React Demo Project
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                        {action}
                        </Collapse>
                    </div>
                </Navbar>
                <div className={this.state.classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Welcome ! {this.state.activeUser === "" ? "" : this.state.activeUser.name}
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Something short and leading about the collection below—its contents, the creator, etc.
                        Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                        entirely.
                        </Typography>
                        
                    </Container>
                    </div>
            </Fragment>
        );
    }
}

export default HomeHeader;