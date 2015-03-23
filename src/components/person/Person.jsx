var React = require('react');

var Person = React.createClass({
  render: function() {
    var imgStyle = {
      'background-image': 'url(' + this.props.backgroundImage + ')',
      'width': '100px',
      'height': '100px',
      'background-position': this.props.backgroundPosition
    };
    return (
      <div className="Person">
        <h1>{this.props.name}</h1>
        <div className="image" style={imgStyle}></div>
        <p>{this.props.description}</p>
        <button onClick={this.props.clickFunc}>Next Person</button>
      </div>
    );
  }
})

module.exports = Person;

