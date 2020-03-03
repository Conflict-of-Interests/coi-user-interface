import React, {useState, useEffect} from 'react';
import {coiUserClient, coiFeedbackClient} from './config/axios-config';
import {FaPlusCircle, FaMinusCircle} from 'react-icons/fa';
import {Table} from 'react-bootstrap';

export default function BatchDashboard(props) {
  // since we don't have /batch endpoint yet, assume associates 1,2,3 are in
  // this fake batch. then we make request to two diff services and combine
  // the data into the format we need.
  const fakeIds = [1,2,3];
  const [associates, updateAssocs] = useState([
    {
      id: 1,
      fname: 'firstnameA',
      lname: 'lastnameA',
      feedback: {
        "Communication Skills": {
          description: 'some text',
          nudges: 5,
          pats: 3
        },
        "Presentation Skills": {
          description: 'some text',
          nudges: 2,
          pats: 3
        }
      }
    },
    {
      id: 2,
      fname: 'firstnameB',
      lname: 'lastnameB',
      feedback: {}
    }
  ]);

  useEffect(() => {
    async function getBatchData() {
      let assocs = [];
      for (let id of fakeIds) {
        const userResp = await coiUserClient.get(`/users/${id}`);
        const feedbackResp = await coiFeedbackClient.get(`/feedback/associates/${id}`);
        // group the feedback by feedback.skill.name and count feedback.skill.nudge
        let aggregateFeedbackForAssoc = {};
        feedbackResp.data.forEach((fb, i) => {
          let skillObj = aggregateFeedbackForAssoc[fb.skill.name];
          if (!skillObj) {
            const nudge = fb.skill.nudge ? 1 : 0;
            const pat = 1 - nudge;
            aggregateFeedbackForAssoc[fb.skill.name] = {
              description: fb.skill.description,
              nudges: nudge,
              pats: pat
            }
          } else {
            if (fb.skill.nudge) {
              skillObj.nudges++;
            } else {
              skillObj.pats++;
            }
          }
        });

        assocs.push({
          ...userResp.data,
          feedback: aggregateFeedbackForAssoc
        });
        console.debug(`assocs: ${assocs}`);
      }
      updateAssocs((oldAssocs) => {
        return assocs;
      });
    }
    getBatchData();
  }, []);

  const skillNames = [];
  associates.forEach((assoc, i) => {
    for (let name in assoc.feedback) {
      if (!skillNames.includes(name)) skillNames.push(name);
    }
  });

  return (
    <div>
      <h2>Batch Dashboard</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            {
              skillNames.map((name, idx) => {
                return <th key={idx} colSpan="2">{name}</th>
              })
            }
          </tr>
          <tr>
            <th></th>
              {
                Array(skillNames.length*2).fill(1).map((el, idx) => {
                  return idx % 2 === 0 ?
                  (<th key={idx}><FaPlusCircle></FaPlusCircle></th>)
                  : (<th key={idx}><FaMinusCircle></FaMinusCircle></th>);
                })
              }
          </tr>
        </thead>
        <tbody>
            {
              associates.map((assoc, idx) => {
                return (<tr key={idx}>
                  <td>{assoc.firstName} {assoc.lastName}</td>
                  {skillNames.map((sname, jdx) => {
                    if (assoc.feedback) {
                      const feedback = assoc.feedback[sname];
                      return feedback ?
                      [<td key={jdx*2}>{feedback.pats}</td>,<td key={jdx*2+1}>{feedback.nudges}</td>]
                      : [<td key={jdx*2}>0</td>,<td key={jdx*2+1}>0</td>] // no feedback given for the skill
                    } else {
                      console.debug(`associate ${assoc.firstName} had no ${sname} feedback`);
                      return null;
                    }
                  })}
                </tr>)
              })
            }
        </tbody>
      </Table>
    </div>
  )
}
