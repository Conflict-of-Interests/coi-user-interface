import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import {coiUserClient, coiFeedbackClient} from './config/axios-config';
import { toast } from 'react-toastify';

export default function AssociateHome(props) {

  const userSelectRef = useRef();
  const [peers, setPeers] = useState([]);
  const [skills, setSkills] = useState([]);

  let giveNudge = async (isNudge) => {
    let peerId = document.getElementById('peer-select').value;
    let skillId = document.getElementById('skill-select').value;
    await coiFeedbackClient.post('/feedback', {
      associateId: peerId,
      notes: null,
      nudge: isNudge,
      skill: {
        id: skillId
      }
    });
    if(isNudge) {
      toast.error('Nudge saved')
    } else {
      toast.success('Pat saved');
    }
  }

  useEffect(() => {
    async function getPeers() {
      const response = await coiUserClient.get('/users');
      const userId = localStorage.getItem('user');
      setPeers(response.data.filter(peer => Number(peer.id) !== Number(userId)));
    }
    async function getSkills() {
      const response = await coiFeedbackClient.get('/skills');
      setSkills(response.data);
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
        <div className="a-home-feedback-button">
          <p>Give Pat on the Back</p>
          <div>
            <FaPlusCircle onClick={() => giveNudge(false)}></FaPlusCircle>
          </div>
        </div>
        <div className="a-home-feedback-button">
          <p>Give a Nudge</p>
          <div>
            <FaMinusCircle onClick={() => giveNudge(true)}></FaMinusCircle>
          </div>
        </div>
      </div>
    </div>
  )
}
