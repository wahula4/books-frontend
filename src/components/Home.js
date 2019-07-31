import React, { Component } from 'react';
import '../App.css';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <div>
        <Navigation/>
        <Container fluid>
          <Button color="link"><Link to="/books">Manage Books</Link></Button>
        </Container>
      </div>
    );
  }
}

export default Home;