import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaPlusCircle } from "react-icons/fa";
import {coiUserClient, coiFeedbackClient} from './environment.js';

export default function AssociateHome(props) {
  const [peers, setPeers] = useState([
    {
      id: 1,
      fname: 'Peer1A',
      lname: 'Peer1B'
    },
    {
      id: 2,
      fname: 'Peer2A',
      lname: 'Peer2B'
    }
  ]);

  const [skills, setSkills] = useState([
    {
      id: 1,
      name: 'TestSkill1'
    },
    {
      id: 2,
      name: 'TestSkill2'
    }
  ]);

  useEffect(() => {
    async function getPeers() {
      const data = await coiUserClient.get('/users');
      setPeers(data);
    }
    async function getSkills() {
      const data = await coiFeedbackClient.get('/skills');
      const skillData = await data.json();
      setSkills(skillData);
    }
    getPeers();
    getSkills();
  }, []);

  return (
    <div id="associate-home-container">
      <div id="a-home-dashboard" class="btn btn-primary">
        <Link class="unstyled-link" to="/associate-dashboard">My Performance Dashboard</Link>
      </div>
      <div id="a-home-form-container">
        <span>Select a peer</span>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Control as="select">
            {peers.map(p => {
              return <option key={p.id} value={p.id}>{p.fname}</option>
            })}
          </Form.Control>
        </Form.Group>
        <span>Select a peer</span>
        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Control as="select">
            {skills.map(s => {
              return <option key={s.id} value={s.id}>{s.name}</option>
            })}
          </Form.Control>
        </Form.Group>
        {/* <Form.Group>
        <Form.Check
          type="radio"
          id="pat-radio"
          label="Pat on the back"
        />
        <Form.Check
          type="radio"
          id="nudge-radio"
          label="Nudge"
        />
      </Form.Group> */}
        <div class="a-home-feedback-button">
          <p>Give Pat on the Back</p>
          <div>
            <FaPlusCircle></FaPlusCircle>
          </div>
        </div>
        <div class="a-home-feedback-button">
          <p>Give a Nudge</p>
          <div>
            <FaPlusCircle></FaPlusCircle>
          </div>
        </div>
      </div>
    </div>
  )
}
