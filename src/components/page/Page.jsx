var React = require('react');
var Person = require('../person/Person.jsx');
var LoadingScreen = require('../loading_screen/LoadingScreen.jsx');
var $ = require('jquery');
var shuffle = require('mess');

var Page = React.createClass({
  getInitialState: function() {
    return {
      loaded: false
    };
  },
  moveToNextPerson: function() {
    this.setState(function(previousState) {
      return {
        currentIndex: previousState.currentIndex + 1
      };
    });
  },
  componentDidMount: function() {
    var me = this;

    // Get the team data if necessary
    if (me.state.loaded === false) {
      $.get(me.props.src, function(result) {
        var people = [];
        for (var key in result.data.people) {
          var person = result.data.people[key];
          people.push(person);
        }
        me.setState({
          loaded: true,
          people: shuffle(people),
          currentIndex: 0,
          backgroundImage: result.data.backgroundImage
        });
      });
    }
  },
  render: function() {
    var mainScreen;
    var personData;
    if (this.state.loaded) {
      personData = this.state.people[this.state.currentIndex];
      mainScreen = <Person {...personData} 
          clickFunc={this.moveToNextPerson}
          backgroundImage={this.state.backgroundImage} />
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

