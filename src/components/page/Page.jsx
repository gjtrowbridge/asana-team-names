var React = require('react');
var Person = require('../person/Person.jsx');

var Page = React.createClass({
  render: function() {
    return (
      <div>
        <Person />
      </div>
    );
  }
})

module.exports = Page;

