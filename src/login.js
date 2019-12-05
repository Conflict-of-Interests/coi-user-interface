import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import {coiUserClient} from './axios-config.js';
import Form from 'react-bootstrap/Form';

export default function Login(props) {
  const [newAssociate, setNewAssociate] = useState({
    firstName: '',
    lastName: ''
  });

  const [assocs, setAssocs] = useState([]);

  let loginFunc = (id) => {
    localStorage.setItem('user',id);
    props.history.push('/associate-home');
  }

  useEffect(() => {
    async function getAllAssociates() {
      const data = await coiUserClient.get('/users');
      console.log(data);
      setAssocs(data.data);
    }
    getAllAssociates();
  }, []);

  let registerAssociate = async (e) => {
    e.preventDefault();
    const data = await coiUserClient.post('/users', newAssociate);
    loginFunc(data.data.id);
  }
  
  function updateNewUser(e) {
    setNewAssociate({
      ...newAssociate,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="login-div">
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Login as Associate
      </Dropdown.Toggle>
      <Dropdown.Menu>
      {
        assocs.map((assoc)=> {
          return <Dropdown.Item onClick={() => loginFunc(assoc.id)}>Login as {assoc.firstName} {assoc.lastName}</Dropdown.Item>
        })
      }
      </Dropdown.Menu>
    </Dropdown>
    <br/>
    <Link to="/trainer-home">
      <Button variant="primary">Login as Trainer</Button>
    </Link>
    <br />
    <div id="new-user-container">
    <Form onSubmit={registerAssociate}>
      <Form.Group controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="input" 
          name="firstName"
          placeholder="Enter first name" 
          onChange={updateNewUser}
          value={newAssociate.firstName}/>
      </Form.Group>
      <Form.Group controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="input" 
          name="lastName"
          placeholder="Enter last name" 
          onChange={updateNewUser}
          value={newAssociate.lastName}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Register
      </Button>
      </Form>
    </div>
  </div>
  )
}
