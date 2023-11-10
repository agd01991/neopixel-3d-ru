import React, { Component } from 'react';

class AddUserForm extends Component {
    state = {
      name: '',
      email: '',
      username: '',
      password: '',
    };
  
    handleChange = (e) => {
     this.setState({
       [e.target.name]: e.target.value
     });
    };
  
    handleSubmit = async (e) => {
      e.preventDefault();
      const { name, email, username, password } = this.state;
  
      try {
        const response = await fetch('http://localhost:3000/api/register', {
          method: 'POST',
          body: JSON.stringify({ name, email, username, password }),
          headers: {
            'Content-Type': 'application/json'
          },
        });
  
        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };
  
    render() {
      const { name, email, username, password } = this.state;
  
      return (
        <form onSubmit={this.handleSubmit}>
          Name: <input type="text" name="name" value={name} onChange={this.handleChange} />
          Email: <input type="email" name="email" value={email} onChange={this.handleChange} />
          Username: <input type="text" name="username" value={username} onChange={this.handleChange} />
          Password: <input type="password" name="password" value={password} onChange={this.handleChange} />
          <button type="submit">Submit</button>
        </form>
      );
    }
  }
  
  export default AddUserForm;