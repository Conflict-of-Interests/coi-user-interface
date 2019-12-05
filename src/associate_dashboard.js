import React, { useState } from 'react';
import {FaPlusCircle,FaMinusCircle} from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

export default function AssociateDashboard(props) {
  const [fakeSkills] = useState([
    {
      id: 1,
      name: "Communication",
      pats: 3,
      nudges: 1
    },
    {
      id: 2,
      name: "Teamwork",
      pats: 2,
      nudges: 4
    }
  ]);

  return (
    <div>
      <h2>Feedback I have Received</h2>
      <table>
        <thead>
          <tr>
            <th>Skill</th>
            <th><FaPlusCircle /></th>
            <th><FaMinusCircle /></th>
          </tr>
        </thead>
        <tbody>
          {fakeSkills.map(skill => {
            return (
              <tr key={skill.id}>
                <td>{skill.name}</td>
                <td>{skill.pats}</td>
                <td>{skill.nudges}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div>
        <Link to="/associate-home">
          <Button variant="primary">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
