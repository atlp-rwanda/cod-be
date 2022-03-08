"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("dotenv/config");

var _app = _interopRequireDefault(require("./app"));

var _swagger = _interopRequireDefault(require("../public/api-docs/swagger"));

var _models = require("./database/models");

function cov_1cgesmeami() {
  var path = "/Users/andelarwanda/Desktop/ ALTP6/cod-be/src/index.js";
  var hash = "c14ff2000f01ace5f5919de2c8e8a838ab4d6f31";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/andelarwanda/Desktop/ ALTP6/cod-be/src/index.js",
    statementMap: {
      "0": {
        start: {
          line: 11,
          column: 22
        },
        end: {
          line: 24,
          column: 1
        }
      },
      "1": {
        start: {
          line: 12,
          column: 21
        },
        end: {
          line: 12,
          column: 37
        }
      },
      "2": {
        start: {
          line: 13,
          column: 2
        },
        end: {
          line: 23,
          column: 5
        }
      },
      "3": {
        start: {
          line: 14,
          column: 4
        },
        end: {
          line: 14,
          column: 88
        }
      },
      "4": {
        start: {
          line: 15,
          column: 4
        },
        end: {
          line: 20,
          column: 7
        }
      },
      "5": {
        start: {
          line: 16,
          column: 6
        },
        end: {
          line: 16,
          column: 61
        }
      },
      "6": {
        start: {
          line: 18,
          column: 6
        },
        end: {
          line: 18,
          column: 72
        }
      },
      "7": {
        start: {
          line: 19,
          column: 6
        },
        end: {
          line: 19,
          column: 36
        }
      },
      "8": {
        start: {
          line: 21,
          column: 4
        },
        end: {
          line: 21,
          column: 33
        }
      },
      "9": {
        start: {
          line: 22,
          column: 4
        },
        end: {
          line: 22,
          column: 30
        }
      },
      "10": {
        start: {
          line: 26,
          column: 0
        },
        end: {
          line: 26,
          column: 16
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 11,
            column: 22
          },
          end: {
            line: 11,
            column: 23
          }
        },
        loc: {
          start: {
            line: 11,
            column: 28
          },
          end: {
            line: 24,
            column: 1
          }
        },
        line: 11
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 13,
            column: 25
          },
          end: {
            line: 13,
            column: 26
          }
        },
        loc: {
          start: {
            line: 13,
            column: 37
          },
          end: {
            line: 23,
            column: 3
          }
        },
        line: 13
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 15,
            column: 40
          },
          end: {
            line: 15,
            column: 41
          }
        },
        loc: {
          start: {
            line: 15,
            column: 46
          },
          end: {
            line: 17,
            column: 5
          }
        },
        line: 15
      },
      "3": {
        name: "(anonymous_3)",
        decl: {
          start: {
            line: 17,
            column: 13
          },
          end: {
            line: 17,
            column: 14
          }
        },
        loc: {
          start: {
            line: 17,
            column: 22
          },
          end: {
            line: 20,
            column: 5
          }
        },
        line: 17
      }
    },
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0
    },
    f: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "c14ff2000f01ace5f5919de2c8e8a838ab4d6f31"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1cgesmeami = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_1cgesmeami();
cov_1cgesmeami().s[0]++;

/**
 * Server Connection
 */
const connectServer = () => {
  cov_1cgesmeami().f[0]++;
  const serverPort = (cov_1cgesmeami().s[1]++, process.env.PORT);
  cov_1cgesmeami().s[2]++;

  _app.default.listen(serverPort, async () => {
    cov_1cgesmeami().f[1]++;
    cov_1cgesmeami().s[3]++;
    console.log(`\nBarefoot Nomad Server Started & Listening on PORT: ${serverPort}\n`);
    cov_1cgesmeami().s[4]++;
    await _models.sequelize.authenticate().then(() => {
      cov_1cgesmeami().f[2]++;
      cov_1cgesmeami().s[5]++;
      console.log('\nBarefoot Nomad Database Connected! \n');
    }).catch(err => {
      cov_1cgesmeami().f[3]++;
      cov_1cgesmeami().s[6]++;
      console.log('\n!!! Barefoot Nomad Database Not Connected !!! \n');
      cov_1cgesmeami().s[7]++;
      console.log({
        Message: err
      });
    });
    cov_1cgesmeami().s[8]++;
    (0, _swagger.default)(_app.default, serverPort);
    cov_1cgesmeami().s[9]++;

    _app.default.emit('appStarted \n');
  });
};

cov_1cgesmeami().s[10]++;
connectServer();