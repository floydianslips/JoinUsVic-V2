import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';
import Main from './components/Main';
import FunFacts from './components/FunFacts';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      funfactList: []
    };
  }

  componentDidMount() {
    axios.get('funfacts')
    .then(response => {
        this.setState({
            funfactList: response.data
        });
    })
    .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="app">
        <NavBar toggle={this.toggleFunfact} />
        <Main />
        <FunFacts funfactList={this.state.funfactList} funfactShow={this.state.funfact_page} />
      </div>
    );
  }
}


export default App
