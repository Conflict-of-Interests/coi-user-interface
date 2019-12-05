import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import { FaPlusCircle } from "react-icons/fa";
import {coiUserClient, coiFeedbackClient} from './axios-config.js';

export default function AssociateHome(props) {

  const userSelectRef = useRef();
  const [peers, setPeers] = useState([]);
  const [skills, setSkills] = useState([]);

  // const [selectedUser, setSelectedUser] = useState = ({});


  let givePat = (e) => {
    let peerId = document.getElementById('peer-select').value;
    let skillId = document.getElementById('skill-select').value;
    console.log(userSelectRef);
    console.log(peerId);
    // coiFeedbackClient.post('/feedback', {
    //   associateId: peerId,
    //   notes: null,
    //
    // });
  }

  useEffect(() => {
    async function getPeers() {
      const data = await coiUserClient.get('/users');
      console.log(data);
      setPeers(data.data);
    }
    async function getSkills() {
      const data = await coiFeedbackClient.get('/skills');
      setSkills(data.data);
    }
    getPeers();
    getSkills();
  }, []);

  return (
    <div id="associate-home-container">
      <div id="a-home-form-container">
        <span>Select a peer</span>
        <Form.Group controlId="peer-select">
          <Form.Control as="select">
            {peers.map(p => {
              return <option key={p.id} value={p.id}>{p.firstName} {p.lastName}</option>
            })}
          </Form.Control>
        </Form.Group>
        <span>Select a skill</span>
        <Form.Group controlId="skill-select" ref={userSelectRef}>
          <Form.Control as="select">
            {skills.map(s => {
              return <option key={s.id} value={s.id}>{s.name}</option>
            })}
          </Form.Control>
        </Form.Group>
        <div class="a-home-feedback-button">
          <p>Give Pat on the Back</p>
          <div>
            <FaPlusCircle onClick={givePat}></FaPlusCircle>
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
