var React = require('react');
var Person = require('../person/Person.jsx');
var LoadingScreen = require('../loading_screen/LoadingScreen.jsx');
var ReportCard = require('../report_card/ReportCard.jsx');
var $ = require('jquery');
var shuffle = require('mess');
var _ = require('lodash');

var NUM_GUESS_OPTIONS = 9;

var Page = React.createClass({
  getInitialState: function() {
    return {
      loaded: false,
      totalGuesses: 0,
      correctGuesses: 0,
      canAdvance: false
    };
  },
  changeCurrentIndex: function(offset) {
    this.setState(function(previousState) {
      return {
        currentIndex: previousState.currentIndex + offset,
        canAdvance: false
      };
    });
  },
  recordGuess: function(correct) {
    this.setState(function(previousState) {
      if (correct) {
        return {
          totalGuesses: previousState.totalGuesses + 1,
          correctGuesses: previousState.correctGuesses + 1,
          canAdvance: true
        }
      } else {
        return {
          totalGuesses: previousState.totalGuesses + 1,
          canAdvance: true
        }
      }
    })
  },
  transformPeople: function(data) {
    // Convert people hash into an array
    var people = _.map(data.people, function(person) {
      return person;
    });

    // Add guessing options for each person
    var getRandomIndex = function(max) {
      return Math.floor(Math.random()*max);
    };
    people = _.map(people, function(person, index) {
      var peopleCopy = people.slice();
      person.guessOptions = [peopleCopy.splice(index, 1)[0].name];

      for (var i=0; i<NUM_GUESS_OPTIONS - 1; i++) {
        var guessOption = peopleCopy.splice(getRandomIndex(peopleCopy.length), 1)[0].name;
        person.guessOptions.push(guessOption);
      }
      person.guessOptions = shuffle(person.guessOptions);
      return person;
    });

    return people;
  },
  retrieveData: function() {
    var me = this;
    $.get(me.props.src, function(response) {
      var data = response.data;
      var people = me.transformPeople(data);
      
      me.setState({
        loaded: true,
        people: shuffle(people),
        currentIndex: 0,
        backgroundImage: response.data.backgroundImage
      });
    });
  },
  componentDidMount: function() {
    var me = this;
    if (me.state.loaded === false) {
      me.retrieveData();
    }
  },
  render: function() {
    var me = this;
    var mainScreen;
    var personData;
    // Definitely better to track state outside of react for all
    // the guesses, but this will work for now...
    if (me.state.loaded) {
      personData = me.state.people[me.state.currentIndex];
      mainScreen = (
        <Person {...personData}
            className="container limited-width"
            key={me.state.currentIndex}
            recordGuess={me.recordGuess}
            backgroundImage={me.state.backgroundImage} />
      )
    } else {
      mainScreen = <LoadingScreen  />
    }
    var nextPersonNav = <button className="next-person"
        onClick={me.changeCurrentIndex.bind(me, 1)}>&rarr;</button>
    // var previousPersonNav = <button className="previous-person"
    //     onClick={me.changeCurrentIndex.bind(me, -1)}>&larr;</button>

    return (
      <div>
        <ReportCard correctGuesses={me.state.correctGuesses}
            totalGuesses={me.state.totalGuesses} />

        {mainScreen}
        {me.state.loaded && me.state.canAdvance &&
            me.state.currentIndex < me.state.people.length - 1 ?
            nextPersonNav : ''}
      </div>
    )
  }
});

module.exports = Page;

