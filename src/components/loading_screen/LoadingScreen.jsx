var React = require('react');

var LoadingScreen = React.createClass({
  render: function() {
    return (
      <div className="loading">
        <img src="/assets/images/cat_loading.gif" />
        <p>Loading...</p>
      </div>
    );
  }
});

module.exports = LoadingScreen;
