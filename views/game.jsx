var React = require('react');

class GameView extends React.Component {
  render() {
    return (
      <div>
        <h1>Game View</h1>
        <h2>{this.props.id}</h2>
      </div>
    );
  }
};

module.exports = GameView;
