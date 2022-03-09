"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("dotenv/config");

var _app = _interopRequireDefault(require("./app"));

var _swagger = _interopRequireDefault(require("../public/api-docs/swagger"));

var _models = require("./database/models");

function cov_1graqcz5ev() {
  var path = "E:\\SOFTWARE ENGENEER\\ANDELA\\phase-2\\cod-be\\src\\index.js";
  var hash = "d5bb4a37e9b7bedd3af595d52dd377cbe6dbaf11";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "E:\\SOFTWARE ENGENEER\\ANDELA\\phase-2\\cod-be\\src\\index.js",
    statementMap: {
      "0": {
        start: {
          line: 10,
          column: 22
        },
        end: {
          line: 22,
          column: 1
        }
      },
      "1": {
        start: {
          line: 11,
          column: 23
        },
        end: {
          line: 11,
          column: 39
        }
      },
      "2": {
        start: {
          line: 12,
          column: 4
        },
        end: {
          line: 21,
          column: 6
        }
      },
      "3": {
        start: {
          line: 13,
          column: 8
        },
        end: {
          line: 13,
          column: 97
        }
      },
      "4": {
        start: {
          line: 14,
          column: 8
        },
        end: {
          line: 18,
          column: 10
        }
      },
      "5": {
        start: {
          line: 15,
          column: 12
        },
        end: {
          line: 15,
          column: 67
        }
      },
      "6": {
        start: {
          line: 17,
          column: 12
        },
        end: {
          line: 17,
          column: 78
        }
      },
      "7": {
        start: {
          line: 19,
          column: 8
        },
        end: {
          line: 19,
          column: 37
        }
      },
      "8": {
        start: {
          line: 20,
          column: 8
        },
        end: {
          line: 20,
          column: 34
        }
      },
      "9": {
        start: {
          line: 24,
          column: 0
        },
        end: {
          line: 24,
          column: 16
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 10,
            column: 22
          },
          end: {
            line: 10,
            column: 23
          }
        },
        loc: {
          start: {
            line: 10,
            column: 28
          },
          end: {
            line: 22,
            column: 1
          }
        },
        line: 10
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 12,
            column: 27
          },
          end: {
            line: 12,
            column: 28
          }
        },
        loc: {
          start: {
            line: 12,
            column: 39
          },
          end: {
            line: 21,
            column: 5
          }
        },
        line: 12
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 14,
            column: 45
          },
          end: {
            line: 14,
            column: 46
          }
        },
        loc: {
          start: {
            line: 14,
            column: 52
          },
          end: {
            line: 16,
            column: 9
          }
        },
        line: 14
      },
      "3": {
        name: "(anonymous_3)",
        decl: {
          start: {
            line: 16,
            column: 18
          },
          end: {
            line: 16,
            column: 19
          }
        },
        loc: {
          start: {
            line: 16,
            column: 25
          },
          end: {
            line: 18,
            column: 9
          }
        },
        line: 16
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
      "9": 0
    },
    f: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "d5bb4a37e9b7bedd3af595d52dd377cbe6dbaf11"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1graqcz5ev = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_1graqcz5ev();
cov_1graqcz5ev().s[0]++;

/**
 * Server Connection
 */
const connectServer = () => {
  cov_1graqcz5ev().f[0]++;
  const serverPort = (cov_1graqcz5ev().s[1]++, process.env.PORT);
  cov_1graqcz5ev().s[2]++;

  _app.default.listen(serverPort, async () => {
    cov_1graqcz5ev().f[1]++;
    cov_1graqcz5ev().s[3]++;
    console.log('\nBarefoot Nomad Server Started & Listening on PORT: ' + serverPort + '\n');
    cov_1graqcz5ev().s[4]++;
    await _models.sequelize.authenticate().then(res => {
      cov_1graqcz5ev().f[2]++;
      cov_1graqcz5ev().s[5]++;
      console.log('\nBarefoot Nomad Database Connected! \n');
    }).catch(err => {
      cov_1graqcz5ev().f[3]++;
      cov_1graqcz5ev().s[6]++;
      console.log('\n!!! Barefoot Nomad Database Not Connected !!! \n');
    });
    cov_1graqcz5ev().s[7]++;
    (0, _swagger.default)(_app.default, serverPort);
    cov_1graqcz5ev().s[8]++;

    _app.default.emit('appStarted \n');
  });
};

cov_1graqcz5ev().s[9]++;
connectServer();