// functional modules
var React = require('react');

// custom modules
import FormContainer from '../form/view/form-container';
import Login from '../form/view/login';
import SignupPlayer from '../form/view/signup-player';
import SignupCompany from '../form/view/signup-company';


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
