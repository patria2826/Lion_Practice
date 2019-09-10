import React, { Component } from 'react';
import Table from './Table';

class App extends Component {
    state = {
        data: null
    }

    componentDidMount() {
        fetch('./tripData.json', {
            headers: {
                'Accept': 'application/json'
            }
        }).then((response) => {
            return response.json();
        }).then((responseData) => {
            this.setState({ data: responseData });
            return responseData;
        })
    }

    render() {
        return (
            <Table tripData={this.state.data} />
        )
    }
}
export default App;