import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Lecturer from './Lecturer';
import axios from 'axios';
import './app.css';

class LecturerList extends Component {
  constructor(props) {
    super(props);

    this.state = { lecturers: [] };
  }

  componentDidMount() {
    axios.get('api/lecturers')
      .then(response => {
        this.setState({ lecturers: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {

    const lecturerList = this.state.lecturers.map(u => (
      <Lecturer
        key={u._id}
        id={u._id}
        name={u.name}
        image={u.image}
        email={u.email}
        region={u.region}
      />
    ));

    return (
      <div className="container">
        <h1 className="col">All Chefs</h1>
        <div>
          <div>{lecturerList}</div>
        </div>
      </div>
    );
  }
}

export default LecturerList;
