import React, { Fragment , Component } from 'react';
import Header from './HeaderComponent';
import Cookie from 'js-cookie';
import {Jumbotron} from 'reactstrap';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Link} from 'react-router-dom';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/">
        localhost:3000
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
export default class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      name : ''
    }
  }
  componentDidMount() {
    this.setState({
      name : Cookie.getJSON('activeUser').name
  })
  }
  render(){
    return (
      <Fragment>
        <Header/>
        <div className = "container">
        
      <Jumbotron>
        
        <p className="lead">Admin Dashboard</p>
        <hr className="my-2" />
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
      </Jumbotron>
          
        </div>
        <Box mt={8}>
                    <Copyright />
                </Box>
      </Fragment>
    )
  }

}