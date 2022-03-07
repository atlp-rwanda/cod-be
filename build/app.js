"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("dotenv-flow/config");

var _express = _interopRequireWildcard(require("express"));

var _swagger = _interopRequireDefault(require("../public/api-docs/swagger"));

var _models = require("./database/models");

var _index = _interopRequireDefault(require("./routes/index"));

var _offices = _interopRequireDefault(require("./routes/offices"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function cov_2gzde8lj7q() {
  var path = "/Users/andelarwanda/Desktop/ ALTP6/cod-be/src/app.js";
  var hash = "b50aeae043880ce43bc9ef72b7eb36ee80706b09";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/andelarwanda/Desktop/ ALTP6/cod-be/src/app.js",
    statementMap: {
      "0": {
        start: {
          line: 24,
          column: 12
        },
        end: {
          line: 24,
          column: 21
        }
      },
      "1": {
        start: {
          line: 25,
          column: 0
        },
        end: {
          line: 25,
          column: 15
        }
      },
      "2": {
        start: {
          line: 29,
          column: 0
        },
        end: {
          line: 29,
          column: 25
        }
      },
      "3": {
        start: {
          line: 30,
          column: 0
        },
        end: {
          line: 30,
          column: 25
        }
      },
      "4": {
        start: {
          line: 38,
          column: 22
        },
        end: {
          line: 47,
          column: 1
        }
      },
      "5": {
        start: {
          line: 39,
          column: 23
        },
        end: {
          line: 39,
          column: 39
        }
      },
      "6": {
        start: {
          line: 40,
          column: 4
        },
        end: {
          line: 46,
          column: 6
        }
      },
      "7": {
        start: {
          line: 41,
          column: 8
        },
        end: {
          line: 41,
          column: 87
        }
      },
      "8": {
        start: {
          line: 42,
          column: 8
        },
        end: {
          line: 42,
          column: 43
        }
      },
      "9": {
        start: {
          line: 43,
          column: 8
        },
        end: {
          line: 43,
          column: 54
        }
      },
      "10": {
        start: {
          line: 44,
          column: 8
        },
        end: {
          line: 44,
          column: 36
        }
      },
      "11": {
        start: {
          line: 45,
          column: 8
        },
        end: {
          line: 45,
          column: 30
        }
      },
      "12": {
        start: {
          line: 49,
          column: 0
        },
        end: {
          line: 49,
          column: 15
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 38,
            column: 22
          },
          end: {
            line: 38,
            column: 23
          }
        },
        loc: {
          start: {
            line: 38,
            column: 28
          },
          end: {
            line: 47,
            column: 1
          }
        },
        line: 38
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 40,
            column: 35
          },
          end: {
            line: 40,
            column: 36
          }
        },
        loc: {
          start: {
            line: 40,
            column: 47
          },
          end: {
            line: 46,
            column: 5
          }
        },
        line: 40
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
      "12": 0
    },
    f: {
      "0": 0,
      "1": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "b50aeae043880ce43bc9ef72b7eb36ee80706b09"
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
  app.listen({
    port: serverPort
  }, async () => {
    cov_2gzde8lj7q().f[1]++;
    cov_2gzde8lj7q().s[7]++;
    console.log('Barefoot Nomad Server Started & Listening on PORT: ' + serverPort);
    cov_2gzde8lj7q().s[8]++;
    await _models.sequelize.sync({
      force: true
    });
    cov_2gzde8lj7q().s[9]++;
    console.log('Barefoot Nomad Database Synced!');
    cov_2gzde8lj7q().s[10]++;
    (0, _swagger.default)(app, serverPort);
    cov_2gzde8lj7q().s[11]++;
    app.emit('appStarted');
  });
};

cov_2gzde8lj7q().s[12]++;
connectServer();
var _default = app;
exports.default = _default;