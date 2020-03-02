import React, {useState} from 'react';
import {Link} from 'react-router-dom';

export default function TrainerHome(props) {
  const [fakeBatches] = useState([
    {
      id: 1,
      name: "Test Batch",
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
    }
  ]);

  return (
    <div>
      <h2>My Batches</h2>
      {fakeBatches.map(fakeBatch => {
        return <Link key={fakeBatch.id} to="/batch-dashboard">{fakeBatch.name}</Link>
      })}
    </div>
  )
}
