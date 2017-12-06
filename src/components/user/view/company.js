var React = require('react');
var PropTypes = require('prop-types');

var FormContainer = require(__dirname + '/form/view/form-container');
var CreatePitch = require(__dirname + '/src/form/view/create-pitch');

class CompanyUser extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div className="user__container --company">
        <h1>Company</h1>
        <h3>Hello {this.props.me.companyInfo.businessName}</h3>
        <p>{this.props.me.email}</p>
        <p>{this.props.me.postCode}</p>

        <FormContainer form={ <CreatePitch/> }/>
      </div>
    )
  }
};

CompanyUser.PropTypes = {
  me: PropTypes.shape({
    isCompany: PropTypes.boolean,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    postcode: PropTypes.string,
    companyInfo: PropTypes.shape({
      businessName: PropTypes.string,
      registeredBusinessAddress: PropTypes.string,
      phoneNumber: PropTypes.string,
    })
  })
};

module.exports = CompanyUser;