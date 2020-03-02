import React, {useState, useEffect} from 'react';
import AuthContext from './AuthContext';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import {coiUserClient} from './config/axios-config';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';

export default function Login(props) {
  const [newAssociate, setNewAssociate] = useState({
    firstName: '',
    lastName: ''
  });

  const [assocs, setAssocs] = useState([]);

  useEffect(() => {
    async function getAllAssociates() {
      const response = await coiUserClient.get('/users');
      console.debug(`ALL USERS: ${JSON.stringify(response)}`);
      setAssocs(response.data);
    }
    getAllAssociates();
  }, []);

  let registerAssociate = async (e, cb) => {
    e.preventDefault();
    const response = await coiUserClient.post('/users', newAssociate);
    const newUser = response.data;
    console.debug(`NEW USER REGISTERED: ${JSON.stringify(newUser)}`);
    if (response.status >= 200 && response.status < 300) {
      toast.success('Registered successfully, logging in now');
      setTimeout(() => {
        let newAssociate = {...newUser, role: 'associate'};
        cb(newAssociate);
      }, 1500);
    }
  }

  function updateNewUser(e) {
    setNewAssociate({
      ...newAssociate,
      [e.target.name]: e.target.value
    })
  }

  const dummyTrainer = {
    id: 100,
    firstName: "Andrew",
    lastName: "Crenwelge",
    role: 'trainer'
  }

  return (
    <div className="login-div">
      <AuthContext.Consumer>
        {(auth) => (
          <>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Login as Associate
              </Dropdown.Toggle>
              <Dropdown.Menu>
              {
                assocs.map((assoc)=> {
                  let user = {...assoc, role: 'associate'};
                  return (
                    <Dropdown.Item
                      key={assoc.id}
                      onClick={() => auth.initiateLogin(user)}
                    >
                      Login as {assoc.firstName} {assoc.lastName}
                    </Dropdown.Item>
                  )
                })
              }
              </Dropdown.Menu>
            </Dropdown>
            <br/>
              <Button variant="primary"
                onClick={() => auth.initiateLogin(dummyTrainer)}>
                Login as Trainer
              </Button>
            <br />
            <div id="new-user-container">
              <Form onSubmit={(e) => {
                  registerAssociate(e, auth.initiateLogin);
                }}>
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
          </>
        )
        }
      </AuthContext.Consumer>
    </div>
  )
}
