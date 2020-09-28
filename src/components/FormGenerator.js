import React , {Component, Fragment} from "react";
import ReactDOM from "react-dom";
import { FormBuilder } from 'cb-react-forms';
import Header from './HeaderComponent';

export default class Formbuilder extends Component { 
    constructor(props){
        super(props);
    }
    render(){
        return (
        <Fragment>
            <Header />
            <div>
                <FormBuilder onSubmit={data => console.log(data)} />
            </div>  
        </Fragment>
        )
    }

}