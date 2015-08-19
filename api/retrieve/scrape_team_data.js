var Q = require('q');
var cheerio = require('cheerio');
var request = require('request');
var cssParser = require('css');
var _ = require('lodash');

Q.longStackTrace = true;
var rootUrl = 'http://asana.com';
var retrieving = false;

var teamData = {};

// Returns a promise that resolves to the team
// data object
var scrapeTeamData = function() {
  return Q.nfcall(request, rootUrl + '/team')
  .then(function(response) {
    // Initialize the team data object
    teamData = {
      backgroundImage: '',
      people: {},
      missingPeople: {}
    };

    // Parse the raw html using a jQuery-like library
    var $ = cheerio.load(response[1]);

    // Get info on team members
    $('.popover-combo-trigger').each(function(index, element) {
      var $el = $(element);

      var person = {};
      var key = '';
      
      person.number = index;
      person.name = $el.data('title');
      person.description = $el.find('.cite-social').text().replace(/\s+/g, ' ');

      // Get the class name with "sprite" in it -- necessary later
      var classes = $el.find('div.portrait').attr('class').split(/\s+/);
      _.each(classes, function(className) {
        if (className.slice(0, 6) === 'sprite') {
          key = className;
          return false;
        }
      });

      if (key) {
        teamData.people[key] = person;
      } else {
        throw 'Could not find sprite class for ' + person.name + '!';
      }
    });

    // Pass the parsed html to the next "then" block
    return $;
  })

  // Get the location of the CSS file
  .then(function($) {
    var url = '';
    $('link').each(function(index, $el) {
      if ($el.attribs.rel === 'stylesheet') {
        var href = $el.attribs.href;
        if (href.slice(0,2) === "//") {
          url = "https:" + href;
        } else {
          url = rootUrl + $el.attribs.href;
        }
        return false;
      }
    });
    console.log(url);
    return url;
  })

  // Parse the CSS file for background-image
  // and background-position information
  .then(function(cssUrl) {
    return Q.nfcall(request, cssUrl)
    .then(function(response) {
      var css = response[1];
      var cssObj = cssParser.parse(css)
      _.each(cssObj.stylesheet.rules, function(rule) {
        if (Array.isArray(rule.selectors)) {
          if (rule.selectors.length > 1) {
            var classes = rule.selectors[1].split(/\s+/);
            var declarations = rule.declarations;
            if (classes[0] === '.team-page') {
              if (classes[1] === '.portrait') {
                _.each(declarations, function(decl) {
                  if (decl.property === 'background-image') {
                    var url = decl.value;
                    console.log(url);
                    url = url.replace(/url\(/g, '');
                    url = url.replace(/"/g, '');
                    url = url.replace(/'/g, '');
                    url = url.replace(/\.\./g, '');
                    url = url.replace(/\)/g, '');
                    console.log(url);
                    teamData.backgroundImage = rootUrl + '/assets' + url;
                  }
                });
              } else if (classes[1].slice(0, 7) === '.sprite') {
                _.each(declarations, function(decl) {
                  if (decl.property === 'background-position') {
                    var className = classes[1].substr(1)
                    var person = teamData.people[className];
                    if (person) {
                      person.backgroundPosition = decl.value;
                    } else {
                      teamData.missingPeople[className] = {
                        backgroundPosition: decl.value
                      };
                    }
                  }
                });
              }
            }
          }
        }
      });
      return teamData;
    });
  });
};

module.exports = scrapeTeamData;
