import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './app.css';
import axios from 'axios';

class CreateRecipe extends Component {
  constructor(props) {
    super(props);
    // store form fields in state
    this.state = {name: '', time: '', level: '', lecturer_id:'', lecturers: []};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/api/lecturers')
      .then(response => {
        this.setState({ lecturers: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange(event) {
    // one of the input boxes changed, update the state to match
    // note: name of the input boxes must match the property names in state
    const name = event.target.name;
    const value = event.target.value;

    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();

    // send a POST request to the server
    // the request includes the state, which is the info. for the new user to be created
    axios.post('/api/modules', this.state)
      .then(res => this.props.history.push('/')) // if successful go to home
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // note: name of the inputs must match the property names in state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Create New Recipe</h2>
          <label>
            Name:
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          </label>
          <label>
            Cooking Time:
            <input type="text" name="time" value={this.state.time} onChange={this.handleChange} />
          </label>
          <label>
            Cooking Level:
            <input type="text" name="level" value={this.state.level} onChange={this.handleChange} />
          </label>
          <label>
            Chefs:
            <select
              onChange={(e) => this.setState({lecturer_id: e.target.value, validationError: e.target.value === '' ? 'You must select a Chef' : ''})}>
              <option disabled selected option="true"> Select a Chef </option>
              {this.state.lecturers.map((l) => <option key={l._id} value={l._id}> {l.name} </option>)}
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CreateRecipe;
