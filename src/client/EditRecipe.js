import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class EditRecipe extends Component {
  constructor(props) {
    super(props);
    // store information relating to the user in state
    // should match the user object from the API
    this.state = {name: '', time: '', level: '', lecturer_id:'', lecturers: []};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // when this Component mounts, fetch data relating to the user to be edited
    // the user's ID is passed in via the URL and accessed via props
    axios.get('/api/modules/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          _id: response.data._id,
          name: response.data.name,
          time: response.data.time,
          level: response.data.level,
          lecturer_id: response.data.lecturer_id
        });
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

    // send a PUT request to the server
    // the request includes the state, which is the updated user information
    axios.put('/api/modules', this.state)
      .then(res => this.props.history.push('/')) // if successful go to home
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // note: name of the inputs must match the property names in state
    return (
      <div>
        <h2>Edit Recipe</h2>
        <form onSubmit={this.handleSubmit}>
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
            Associated Chef:
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

export default EditRecipe;
