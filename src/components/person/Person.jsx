var React = require('react');

var Person = React.createClass({
  getInitialState: function() {
    return {
      guess: undefined
    };
  },
  render: function() {
    var imgStyle = {
      'backgroundImage': 'url(' + this.props.backgroundImage + ')',
      'width': '100px',
      'height': '100px',
      'backgroundPosition': this.props.backgroundPosition
    };
    var fullView = (
      <div className="Person">
        <h1>{this.props.name}</h1>
        <div className="image" style={imgStyle}></div>
        <p>{this.props.description}</p>
        <button onClick={this.props.clickFunc}>Next Person</button>
      </div>
    );
    var guessView = (
      <div className="Person">
        <div className="image" style={imgStyle}></div>
      </div>
    );
    return fullView;
  }
});

module.exports = Person;

