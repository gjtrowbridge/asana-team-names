var React = require('react');
var Page = require('./components/page/Page.jsx')

React.render(
  <Page src="/api/retrieve" />,
  document.getElementById('mountPoint')
)
