const dev = {

  coiContext:      "http://" + window.location.hostname + ':5500'
};
const uat = {

};
const prod = {
  coiContext:         'http://OriginApiProd.yruxtjdgwg.us-east-1.elasticbeanstalk.com'
};
console.log(process.env.NODE_ENV);
export let environment = dev;
if (process.env.REACT_APP_ENV === 'uat') {
  environment = uat;
} else if (process.env.NODE_ENV === 'production' || process.env.REACT_APP_ENV === 'production') {
  environment = prod;
}
