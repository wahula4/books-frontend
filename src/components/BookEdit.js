import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Navigation from './Navigation';

class BookEdit extends Component {

  emptyItem = {
    book_name: '',
    author_name: '',
    isbn: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const book = await (await fetch(`/book/${this.props.match.params.id}`)).json();
      this.setState({item: book});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/book/' + (item.id), {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/books');
  }

  render() {
    const {item} = this.state;
    const book_name = <h2>{item.id ? 'Edit Book' : 'Add Book'}</h2>;

    return <div>
      <Navigation/>
      <Container>
        {book_name}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="book_name">Title</Label>
            <Input type="text" name="book_name" id="book_name" value={item.book_name || ''}
                   onChange={this.handleChange} autoComplete="book_name"/>
          </FormGroup>
          <FormGroup>
            <Label for="author_name">Author</Label>
            <Input type="text" name="author_name" id="author_name" value={item.author_name || ''}
                   onChange={this.handleChange} autoComplete="author_name"/>
          </FormGroup>
          <FormGroup>
            <Label for="isbn">ISBN</Label>
            <Input type="text" name="isbn" id="isbn" value={item.isbn || ''}
                   onChange={this.handleChange} autoComplete="isbn"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/books">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(BookEdit);