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
            <div>
                <Table tripData={this.state.data}/>
            </div>
        )
    }
}
export default App;