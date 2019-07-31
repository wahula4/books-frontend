import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';

class BookList extends Component {

  constructor(props) {
    super(props);
    this.state = {books: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('books', {
      mode: 'cors',
      crossDomain: true,
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => this.setState({books: data, isLoading: false}))
      .catch(() => console.log("Can’t access response. Blocked by browser?"));
  }

  async remove(id) {
    await fetch(`/book/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedbooks = [...this.state.books].filter(i => i.id !== id);
      this.setState({books: updatedbooks});
    });
  }

  render() {
    const {books, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const bookList = books.map(book => {

      return <tr key={book.id}>
        <td style={{whiteSpace: 'nowrap'}}>{book.book_name}</td>
        <td>{book.author_name}</td>
        <td>{book.isbn}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/books/" + book.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(book.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <Navigation/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/books/new">Add book</Button>
          </div>
          <h3>My Books</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Title</th>
              <th width="20%">Author</th>
              <th>ISBN</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {bookList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default BookList;