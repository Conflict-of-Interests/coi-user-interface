import React, { useState, useEffect, useContext } from 'react';
import {FaPlusCircle,FaMinusCircle} from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import {Table} from 'react-bootstrap';
import {coiFeedbackClient} from './config/axios-config';
import AuthContext from './AuthContext';

export default function AssociateDashboard(props) {
  const [feedback, setFeedback] = useState([]);
  const authUser = useContext(AuthContext);

  useEffect(() => {
    const id = authUser.id;
    async function getFeedback() {
      const response = await coiFeedbackClient.get(`/feedback/associates/${id}`);
      const feedback = response.data;
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
  }, [authUser]);

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
