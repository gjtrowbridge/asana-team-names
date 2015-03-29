var React = require('react');

var ReportCard = React.createClass({
  calculateGrade: function(percentage) {
    if (percentage === 1) {
      return 'A+';
    } else if (percentage >= 0.95) {
      return 'A';
    } else if (percentage >= 0.9) {
      return 'A-';
    } else if (percentage >= 0.87) {
      return 'B+';
    } else if (percentage >= 0.84) {
      return 'B';
    } else if (percentage >= 0.80) {
      return 'B-';
    } else if (percentage >= 0.77) {
      return 'C+';
    } else if (percentage >= 0.74) {
      return 'C';
    } else if (percentage >= 0.7) {
      return 'C-';
    } else if (percentage >= 0.67) {
      return 'D+';
    } else if (percentage >= 0.64) {
      return 'D';
    } else if (percentage >= 0.6) {
      return 'D-';
    } else {
      return 'F';
    }
  },
  render: function() {
    var percentage;
    if (this.props.totalGuesses === 0) {
      percentage = 0;
    } else {
      percentage = this.props.correctGuesses / this.props.totalGuesses;
    }
    var grade = this.calculateGrade(percentage);

    // Truncate percentage for easy display
    percentage = Math.floor(percentage * 1000) / 10;
    var guessString = this.props.correctGuesses.toString() +
        ' / ' + this.props.totalGuesses.toString();
    return (
      <div className="report-card">
        <h4>Grade: <strong>{grade}</strong></h4>
        <h5>{guessString + ' (' + percentage + '%)' }</h5>
      </div>    
    );
  }
});

module.exports = ReportCard;
