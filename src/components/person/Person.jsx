var React = require('react');

var Person = React.createClass({
  render: function() {
    return (
      <div>Hello, {this.props.name}!</div>
    );
  }
})

module.exports = Person;

