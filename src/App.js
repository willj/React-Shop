import React from 'react';
import Axios from 'axios';
import './App.css';

class App extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            products: [],
            currency: "",
            hasError: false
        };
    }

    componentDidMount(){
        Axios.get("/products.json")
        .then(response => {
            this.setState({ 
                products: response.data.products, 
                currency: response.data.currency
            });
        }).catch(err => {
            this.setState({ hasError: true });
        });
    }

    render() {
        if (this.state.hasError) return <h1>an error occured</h1>;

        return (
            <h1>Hello</h1>
        );
    }
}

export default App;
