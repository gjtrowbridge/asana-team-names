var React = require('react');
var _ = require('lodash');

var Person = React.createClass({
  getInitialState: function() {
    return {
      guess: undefined
    };
  },
  resolveGuess: function(correct) {
    if (correct) {
      console.log('correct!');
    } else {
      console.log('wrong!');
    }
    this.setState({
      guess: correct
    });
  },
  render: function() {
    var me = this;
    var imgStyle = {
      'backgroundImage': 'url(' + me.props.backgroundImage + ')',
      'width': '100px',
      'height': '100px',
      'backgroundPosition': me.props.backgroundPosition,
      'borderRadius': '50%'
    };
    var fullView = (
      <div className="Person">
        <h1>{me.props.name}</h1>
        <div className="image" style={imgStyle}></div>
        <p>{me.props.description}</p>
        <button onClick={me.props.nextPersonFunction}>Next Person</button>
      </div>
    );
    var guessButtons = _.map(me.props.guessOptions, function(guessOption, index) {
      var correct = guessOption === me.props.name;
      return <button key={index} onClick={me.resolveGuess.bind(me, correct)}>{guessOption}</button>
    });
    
    var guessView = (
      <div className="Person">
        <div className="image" style={imgStyle}></div>
        {guessButtons}
      </div>
    );
    if (me.state.guess === undefined) {
      return guessView;
    } else {
      return fullView;
    }
  }
});

module.exports = Person;

