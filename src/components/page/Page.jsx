var React = require('react');
var Person = require('../person/Person.jsx');
var LoadingScreen = require('../loading_screen/LoadingScreen.jsx');
var $ = require('jquery');
var shuffle = require('mess');
var _ = require('lodash');

var NUM_GUESS_OPTIONS = 8;

var Page = React.createClass({
  getInitialState: function() {
    return {
      loaded: false
    };
  },
  changeCurrentIndex: function(offset) {
    this.setState(function(previousState) {
      return {
        currentIndex: previousState.currentIndex + offset
      };
    });
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

      for (var i=0; i<NUM_GUESS_OPTIONS; i++) {
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
    window.hello = me;
    var mainScreen;
    var personData;
    if (me.state.loaded) {
      personData = me.state.people[me.state.currentIndex];
      mainScreen = <Person {...personData} 
          nextPersonFunction={me.changeCurrentIndex.bind(me, 1)}
          backgroundImage={me.state.backgroundImage} />
    } else {
      mainScreen = <LoadingScreen />
    }
    return (
      <div className="col-2-4">
        <h1>Asanames</h1>
        {mainScreen}
      </div>
    );
  }
});

module.exports = Page;

