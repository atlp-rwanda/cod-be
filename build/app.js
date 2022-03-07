"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("dotenv/config");

var _express = _interopRequireWildcard(require("express"));

var _swagger = _interopRequireDefault(require("../public/api-docs/swagger"));

var _models = require("./database/models");

var _index = _interopRequireDefault(require("./routes/index"));

var _offices = _interopRequireDefault(require("./routes/offices"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function cov_2gzde8lj7q() {
  var path = "/Users/andelarwanda/Desktop/ ALTP6/cod-be/src/app.js";
  var hash = "6d02295f3f31de05fb886ec0f64f72ccbd530874";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/andelarwanda/Desktop/ ALTP6/cod-be/src/app.js",
    statementMap: {
      "0": {
        start: {
          line: 21,
          column: 12
        },
        end: {
          line: 21,
          column: 21
        }
      },
      "1": {
        start: {
          line: 22,
          column: 0
        },
        end: {
          line: 22,
          column: 16
        }
      },
      "2": {
        start: {
          line: 24,
          column: 0
        },
        end: {
          line: 24,
          column: 26
        }
      },
      "3": {
        start: {
          line: 25,
          column: 0
        },
        end: {
          line: 25,
          column: 26
        }
      },
      "4": {
        start: {
          line: 31,
          column: 22
        },
        end: {
          line: 43,
          column: 1
        }
      },
      "5": {
        start: {
          line: 32,
          column: 23
        },
        end: {
          line: 32,
          column: 39
        }
      },
      "6": {
        start: {
          line: 33,
          column: 4
        },
        end: {
          line: 42,
          column: 6
        }
      },
      "7": {
        start: {
          line: 34,
          column: 8
        },
        end: {
          line: 34,
          column: 97
        }
      },
      "8": {
        start: {
          line: 35,
          column: 8
        },
        end: {
          line: 39,
          column: 10
        }
      },
      "9": {
        start: {
          line: 36,
          column: 12
        },
        end: {
          line: 36,
          column: 67
        }
      },
      "10": {
        start: {
          line: 38,
          column: 12
        },
        end: {
          line: 38,
          column: 78
        }
      },
      "11": {
        start: {
          line: 40,
          column: 8
        },
        end: {
          line: 40,
          column: 36
        }
      },
      "12": {
        start: {
          line: 41,
          column: 8
        },
        end: {
          line: 41,
          column: 33
        }
      },
      "13": {
        start: {
          line: 45,
          column: 0
        },
        end: {
          line: 45,
          column: 16
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 31,
            column: 22
          },
          end: {
            line: 31,
            column: 23
          }
        },
        loc: {
          start: {
            line: 31,
            column: 28
          },
          end: {
            line: 43,
            column: 1
          }
        },
        line: 31
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 33,
            column: 27
          },
          end: {
            line: 33,
            column: 28
          }
        },
        loc: {
          start: {
            line: 33,
            column: 39
          },
          end: {
            line: 42,
            column: 5
          }
        },
        line: 33
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 35,
            column: 45
          },
          end: {
            line: 35,
            column: 46
          }
        },
        loc: {
          start: {
            line: 35,
            column: 52
          },
          end: {
            line: 37,
            column: 9
          }
        },
        line: 35
      },
      "3": {
        name: "(anonymous_3)",
        decl: {
          start: {
            line: 37,
            column: 18
          },
          end: {
            line: 37,
            column: 19
          }
        },
        loc: {
          start: {
            line: 37,
            column: 25
          },
          end: {
            line: 39,
            column: 9
          }
        },
        line: 37
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
      "10": 0,
      "11": 0,
      "12": 0,
      "13": 0
    },
    f: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "6d02295f3f31de05fb886ec0f64f72ccbd530874"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_2gzde8lj7q = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_2gzde8lj7q();

/**
 * Express App
 */
const app = (cov_2gzde8lj7q().s[0]++, (0, _express.default)());
cov_2gzde8lj7q().s[1]++;
app.use((0, _express.json)());
cov_2gzde8lj7q().s[2]++;
app.use('/', _index.default);
cov_2gzde8lj7q().s[3]++;
app.use('/', _offices.default);
/**
 * Server Connection
 */

cov_2gzde8lj7q().s[4]++;

const connectServer = () => {
  cov_2gzde8lj7q().f[0]++;
  const serverPort = (cov_2gzde8lj7q().s[5]++, process.env.PORT);
  cov_2gzde8lj7q().s[6]++;
  app.listen(serverPort, async () => {
    cov_2gzde8lj7q().f[1]++;
    cov_2gzde8lj7q().s[7]++;
    console.log('\nBarefoot Nomad Server Started & Listening on PORT: ' + serverPort + '\n');
    cov_2gzde8lj7q().s[8]++;
    await _models.sequelize.authenticate().then(res => {
      cov_2gzde8lj7q().f[2]++;
      cov_2gzde8lj7q().s[9]++;
      console.log('\nBarefoot Nomad Database Connected! \n');
    }).catch(err => {
      cov_2gzde8lj7q().f[3]++;
      cov_2gzde8lj7q().s[10]++;
      console.log('\n!!! Barefoot Nomad Database Not Connected !!! \n');
    });
    cov_2gzde8lj7q().s[11]++;
    (0, _swagger.default)(app, serverPort);
    cov_2gzde8lj7q().s[12]++;
    app.emit('appStarted \n');
  });
};

cov_2gzde8lj7q().s[13]++;
connectServer();
var _default = app;
exports.default = _default;