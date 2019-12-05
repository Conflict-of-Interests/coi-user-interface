import React, {useState} from 'react';

export default function BatchDashboard(props) {
  const [associates, updateAssociates] = useState([
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
  ]);
  return (
    <div>
      <h2>Batch Dashboard</h2>
      <table>
        <tbody>
          {
            // no idea how to implement yet
          }
        </tbody>
      </table>
    </div>
  )
}
