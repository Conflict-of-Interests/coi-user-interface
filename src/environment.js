const dev = {
  coiUserContext:      "http://" + window.location.hostname + ':2021',
  coiFeedbackContext:  'http://' + window.location.hostname + ':2020'
};
const uat = {
  coiUserContext:         '',
  coiFeedbackContext:     ''
};
const prod = {
  coiUserContext:     'http://35.225.252.246/',
  coiFeedbackContext: 'http://35.193.218.142/'
};
console.log(process.env.NODE_ENV);
export let environment = dev;
if (process.env.REACT_APP_ENV === 'uat') {
  environment = uat;
} else if (process.env.NODE_ENV === 'production' || process.env.REACT_APP_ENV === 'production') {
  environment = prod;
}
