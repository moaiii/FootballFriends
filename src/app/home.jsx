// functional modules
var React = require('react');

// custom modules
import FormContainer from '../../view/form/view/form-container';
import Login from '../../view/form/view/login';
import SignupPlayer from '../../view/signup-player';
import SignupCompany from '../../view/signup-company';
import AppRouter from '../client/router.jsx';

const routes = createRoutes(AppRouter());

class Home extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div className="homepage__container">
        <h1>Football Friends</h1>
        <FormContainer form={<Login/>} />
        <FormContainer form={<SignupPlayer/>} />
        <FormContainer form={<SignupCompany/>} />
      </div>
    );
  };
};

module.exports = Home;
