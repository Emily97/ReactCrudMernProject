import React from 'react';
import { Link } from 'react-router-dom';
import './app.css';

class Lecturer extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h2>{this.props.name}</h2>
          <figure>
            <img alt="Profile" src={this.props.image} />
          </figure>
          <p>Cook Style: {this.props.region}</p>
          <p>{this.props.email}</p>

          <Link to={`/module/${this.props.id}`}>
            <button type="button" class="btn btn-light">
                  View Recipes
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Lecturer;
