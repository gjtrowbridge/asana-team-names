var React = require('react');
var _ = require('lodash');

var Person = React.createClass({
  getInitialState: function() {
    return {
      guess: undefined
    };
  },
  resolveGuess: function(isCorrect) {
    var me = this;
    me.setState({
      guess: isCorrect
    });
    me.props.recordGuess(isCorrect);
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
    var guessImages = {
      'correct': 'correct.svg',
      'incorrect': 'incorrect.svg',
      'neutral': 'neutral.svg'
    };
    var guessButtons = _.map(me.props.guessOptions, function(guessOption, index) {
      var correct = guessOption === me.props.name;
      return <button key={index} onClick={me.resolveGuess.bind(me, correct)}>{guessOption}</button>
    });

    var guessClass = 'neutral';
    if (me.state.guess === false) {
      guessClass = 'incorrect';
    } else if (me.state.guess === true) {
      guessClass = 'correct';
    }

    var description = <p>{me.props.description}</p>

    return (
      <div className="Person limited-width horizontal-center">
        <h1>{ me.state.guess === undefined ? ' ' : me.props.name }</h1>
        <div className="image horizontal-center" style={imgStyle}></div>
        <img className={'stick-figure ' + guessClass}
            src={'/assets/images/' + guessImages[guessClass]} />
        {me.state.guess !== undefined ? description : ''}
        {me.state.guess === undefined ? guessButtons : ''}
      </div>
    );
  }
});

module.exports = Person;

