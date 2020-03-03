import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {ListGroup} from 'react-bootstrap';

export default function TrainerHome(props) {
  const [fakeBatches] = useState([
    {
      id: 1,
      name: "Test Batch 1",
      associates: [
        {
          id: 1,
          fname: 'firstnameA',
          lname: 'lastnameA'
        },
        {
          id: 2,
          fname: 'firstnameB',
          lname: 'lastnameB'
        }
      ]
    },
    {
      id: 2,
      name: "Test Batch 2",
      associates: [
        {
          id: 3,
          fname: 'firstnameC',
          lname: 'lastnameC'
        },
        {
          id: 4,
          fname: 'firstnameD',
          lname: 'lastnameD'
        }
      ]
    }
  ]);

  return (
    <div>
      <h2>My Batches</h2>
      <ListGroup>
        {fakeBatches.map(fakeBatch => {
          return (<ListGroup.Item key={fakeBatch.id}>
            <Link to="/batch-dashboard">{fakeBatch.name}</Link>
          </ListGroup.Item>)
        })}
      </ListGroup>
    </div>
  )
}
