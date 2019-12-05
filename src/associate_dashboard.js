import React, { useState, useEffect } from 'react';
import {FaPlusCircle,FaMinusCircle} from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import {Table} from 'react-bootstrap';
import {coiFeedbackClient} from './axios-config.js';

export default function AssociateDashboard(props) {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem('user');
    async function getFeedback() {
      const data = await coiFeedbackClient.get(`/feedback/associates/${id}`);
      const feedback = data.data;
      let formattedFeedback = {};
      feedback.forEach((ele) => {
        if(!formattedFeedback[ele.skill.name]) {
          formattedFeedback[ele.skill.name] = {
            nudges: 0,
            pats: 0
          }
        }
        if(ele.nudge) {
          formattedFeedback[ele.skill.name].nudges++;
        } else {
          formattedFeedback[ele.skill.name].pats++;
        }
      });
      let actualFeedbackArray = [];
      for (let key in formattedFeedback) {
        actualFeedbackArray.push({
          skill: key,
          nudges: formattedFeedback[key].nudges,
          pats: formattedFeedback[key].pats
        })
      }
      setFeedback(actualFeedbackArray);
    }
    getFeedback();
  }, [])

  return (
    <div>
      <h2>Feedback I have Received</h2>
      <Table striped border hover>
        <thead>
          <tr>
            <th>Skill</th>
            <th><FaPlusCircle /></th>
            <th><FaMinusCircle /></th>
          </tr>
        </thead>
        <tbody>
          {feedback.map(f => {
            const skills = f.skill;
            return (
              <tr key={f.skill}>
                <td>{f.skill}</td>
                <td>{f.pats}</td>
                <td>{f.nudges}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <div>
        <Link to="/associate-home">
          <Button variant="primary">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
