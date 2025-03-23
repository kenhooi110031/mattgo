/*!
 * Tenuki v0.3.1 (https://github.com/aprescott/tenuki)
 * Copyright © 2016-2019 Adam Prescott.
 * Licensed under the MIT license.
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.tenuki=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

exports.Game = require("./lib/game").default;
exports.Client = require("./lib/client").default;
exports.utils = require("./lib/utils").default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImV4cG9ydHMiLCJHYW1lIiwicmVxdWlyZSIsImRlZmF1bHQiLCJDbGllbnQiLCJ1dGlscyJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsUUFBUUMsSUFBUixHQUFlQyxRQUFRLFlBQVIsRUFBc0JDLE9BQXJDO0FBQ0FILFFBQVFJLE1BQVIsR0FBaUJGLFFBQVEsY0FBUixFQUF3QkMsT0FBekM7QUFDQUgsUUFBUUssS0FBUixHQUFnQkgsUUFBUSxhQUFSLEVBQXVCQyxPQUF2QyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydHMuR2FtZSA9IHJlcXVpcmUoXCIuL2xpYi9nYW1lXCIpLmRlZmF1bHQ7XG5leHBvcnRzLkNsaWVudCA9IHJlcXVpcmUoXCIuL2xpYi9jbGllbnRcIikuZGVmYXVsdDtcbmV4cG9ydHMudXRpbHMgPSByZXF1aXJlKFwiLi9saWIvdXRpbHNcIikuZGVmYXVsdDtcbiJdfQ==
},{"./lib/client":3,"./lib/game":6,"./lib/utils":14}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _intersection = require("./intersection");

var _intersection2 = _interopRequireDefault(_intersection);

var _zobrist = require("./zobrist");

var _zobrist2 = _interopRequireDefault(_zobrist);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var BoardState = function BoardState(_ref) {
  var moveNumber = _ref.moveNumber,
      playedPoint = _ref.playedPoint,
      color = _ref.color,
      pass = _ref.pass,
      blackPassStones = _ref.blackPassStones,
      whitePassStones = _ref.whitePassStones,
      intersections = _ref.intersections,
      blackStonesCaptured = _ref.blackStonesCaptured,
      whiteStonesCaptured = _ref.whiteStonesCaptured,
      capturedPositions = _ref.capturedPositions,
      koPoint = _ref.koPoint,
      boardSize = _ref.boardSize;

  this.moveNumber = moveNumber;
  this.playedPoint = playedPoint;
  this.color = color;
  this.pass = pass;
  this.blackPassStones = blackPassStones;
  this.whitePassStones = whitePassStones;
  this.intersections = intersections;
  this.blackStonesCaptured = blackStonesCaptured;
  this.whiteStonesCaptured = whiteStonesCaptured;
  this.capturedPositions = capturedPositions;
  this.koPoint = koPoint;
  this.boardSize = boardSize;
  this._positionHash = _zobrist2.default.hash(boardSize, intersections);

  Object.freeze(this);
};

BoardState.prototype = {
  copyWithAttributes: function copyWithAttributes(attrs) {
    var retrieveProperties = function retrieveProperties(_ref2) {
      var moveNumber = _ref2.moveNumber,
          playedPoint = _ref2.playedPoint,
          color = _ref2.color,
          pass = _ref2.pass,
          blackPassStones = _ref2.blackPassStones,
          whitePassStones = _ref2.whitePassStones,
          intersections = _ref2.intersections,
          blackStonesCaptured = _ref2.blackStonesCaptured,
          whiteStonesCaptured = _ref2.whiteStonesCaptured,
          capturedPositions = _ref2.capturedPositions,
          koPoint = _ref2.koPoint,
          boardSize = _ref2.boardSize;
      return { moveNumber: moveNumber, playedPoint: playedPoint, color: color, pass: pass, blackPassStones: blackPassStones, whitePassStones: whitePassStones, intersections: intersections, blackStonesCaptured: blackStonesCaptured, whiteStonesCaptured: whiteStonesCaptured, capturedPositions: capturedPositions, koPoint: koPoint, boardSize: boardSize };
    };
    var existingAttrs = retrieveProperties(this);
    var newAttrs = retrieveProperties(Object.assign(existingAttrs, attrs));

    return new BoardState(newAttrs);
  },

  _capturesFrom: function _capturesFrom(y, x, color) {
    var _this = this;

    var capturedNeighbors = this.neighborsFor(y, x).filter(function (neighbor) {
      // TODO: this value of 1 is potentially weird.
      // we're checking against the move before the stone we just played
      // where this space is not occupied yet. things should possibly be
      // reworked.
      return !neighbor.isEmpty() && neighbor.value !== color && _this.libertiesAt(neighbor.y, neighbor.x) === 1;
    });

    var capturedStones = _utils2.default.flatMap(capturedNeighbors, function (neighbor) {
      return _this.groupAt(neighbor.y, neighbor.x);
    });

    return _utils2.default.unique(capturedStones);
  },

  _updateIntersection: function _updateIntersection(intersection, intersections, color) {
    return intersections.map(function (i) {
      if (i.y === intersection.y && i.x === intersection.x) {
        return new _intersection2.default(i.y, i.x, color);
      } else {
        return i;
      }
    });
  },

  _removeIntersection: function _removeIntersection(intersection, intersections) {
    return this._updateIntersection(intersection, intersections, "empty");
  },

  _withoutIntersectionsMatching: function _withoutIntersectionsMatching(condition) {
    var newPoints = this.intersections.map(function (i) {
      if (condition(i)) {
        return new _intersection2.default(i.y, i.x, "empty");
      } else {
        return i;
      }
    });

    return this._withNewPoints(newPoints);
  },

  _withNewPoints: function _withNewPoints(newPoints) {
    return this.copyWithAttributes({ intersections: newPoints });
  },

  nextColor: function nextColor() {
    if (this.color === "black") {
      return "white";
    } else {
      return "black";
    }
  },

  yCoordinateFor: function yCoordinateFor(y) {
    return this.boardSize - y;
  },

  xCoordinateFor: function xCoordinateFor(x) {
    var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"];

    return letters[x];
  },

  playPass: function playPass(color) {
    var stateInfo = {
      moveNumber: this.moveNumber + 1,
      playedPoint: null,
      color: color,
      pass: true,
      blackPassStones: this.blackPassStones,
      whitePassStones: this.whitePassStones,
      intersections: this.intersections,
      blackStonesCaptured: this.blackStonesCaptured,
      whiteStonesCaptured: this.whiteStonesCaptured,
      capturedPositions: [],
      koPoint: null,
      boardSize: this.boardSize
    };

    stateInfo[color + "PassStones"] += 1;

    var newState = new BoardState(stateInfo);

    return newState;
  },

  _simpleKoPoint: function _simpleKoPoint() {
    var simpleKoPoint = null;

    if (this.playedPoint) {
      var _playedPoint = this.playedPoint,
          y = _playedPoint.y,
          x = _playedPoint.x;

      if (this.capturedPositions.length === 1 && this.groupAt(y, x).length === 1 && this.inAtari(y, x)) {
        simpleKoPoint = this.capturedPositions[0];
      }
    }

    return simpleKoPoint;
  },

  playAt: function playAt(y, x, playedColor) {
    var _this2 = this;

    var capturedPositions = this._capturesFrom(y, x, playedColor);
    var playedPoint = this.intersectionAt(y, x);
    var newPoints = this.intersections;

    capturedPositions.forEach(function (i) {
      newPoints = _this2._removeIntersection(i, newPoints);
    });

    newPoints = this._updateIntersection(playedPoint, newPoints, playedColor);

    var newTotalBlackCaptured = this.blackStonesCaptured + (playedColor === "black" ? 0 : capturedPositions.length);
    var newTotalWhiteCaptured = this.whiteStonesCaptured + (playedColor === "white" ? 0 : capturedPositions.length);

    var boardSize = this.boardSize;

    var moveInfo = {
      moveNumber: this.moveNumber + 1,
      playedPoint: Object.freeze({ y: y, x: x }),
      color: playedColor,
      pass: false,
      blackPassStones: this.blackPassStones,
      whitePassStones: this.whitePassStones,
      intersections: newPoints,
      blackStonesCaptured: newTotalBlackCaptured,
      whiteStonesCaptured: newTotalWhiteCaptured,
      capturedPositions: capturedPositions,
      boardSize: boardSize
    };

    var withPlayedPoint = new BoardState(moveInfo);

    var possibleKoPoint = withPlayedPoint._simpleKoPoint();

    if (possibleKoPoint) {
      moveInfo["koPoint"] = { y: possibleKoPoint.y, x: possibleKoPoint.x };
    } else {
      moveInfo["koPoint"] = null;
    }

    return new BoardState(moveInfo);
  },

  intersectionAt: function intersectionAt(y, x) {
    if (y >= this.boardSize || x >= this.boardSize) {
      throw new Error("Intersection at (" + y + ", " + x + ") would be outside the board");
    }

    if (y < 0 || x < 0) {
      throw new Error("Intersection position cannot be negative, but was given (" + y + ", " + x + ")");
    }

    return this.intersections[y * this.boardSize + x];
  },

  groupAt: function groupAt(y, x) {
    var startingPoint = this.intersectionAt(y, x);

    var _partitionTraverse = this.partitionTraverse(startingPoint, function (neighbor) {
      return neighbor.sameColorAs(startingPoint);
    }),
        _partitionTraverse2 = _slicedToArray(_partitionTraverse, 2),
        group = _partitionTraverse2[0],
        _ = _partitionTraverse2[1];

    return group;
  },

  libertiesAt: function libertiesAt(y, x) {
    var _this3 = this;

    var point = this.intersectionAt(y, x);

    var emptyPoints = _utils2.default.flatMap(this.groupAt(point.y, point.x), function (groupPoint) {
      return _this3.neighborsFor(groupPoint.y, groupPoint.x).filter(function (intersection) {
        return intersection.isEmpty();
      });
    });

    return _utils2.default.unique(emptyPoints).length;
  },

  inAtari: function inAtari(y, x) {
    return this.libertiesAt(y, x) === 1;
  },

  neighborsFor: function neighborsFor(y, x) {
    var neighbors = [];

    if (x > 0) {
      neighbors.push(this.intersectionAt(y, x - 1));
    }

    if (x < this.boardSize - 1) {
      neighbors.push(this.intersectionAt(y, x + 1));
    }

    if (y > 0) {
      neighbors.push(this.intersectionAt(y - 1, x));
    }

    if (y < this.boardSize - 1) {
      neighbors.push(this.intersectionAt(y + 1, x));
    }

    return neighbors;
  },

  positionSameAs: function positionSameAs(otherState) {
    return this._positionHash === otherState._positionHash && this.intersections.every(function (point) {
      return point.sameColorAs(otherState.intersectionAt(point.y, point.x));
    });
  },

  // Iterative depth-first search traversal. Start from
  // startingPoint, iteratively follow all neighbors.
  // If inclusionConditionis met for a neighbor, include it
  // otherwise, exclude it. At the end, return two arrays:
  // One for the included neighbors, another for the remaining neighbors.
  partitionTraverse: function partitionTraverse(startingPoint, inclusionCondition) {
    var checkedPoints = [];
    var boundaryPoints = [];
    var pointsToCheck = [];

    pointsToCheck.push(startingPoint);

    while (pointsToCheck.length > 0) {
      var point = pointsToCheck.pop();

      if (checkedPoints.indexOf(point) > -1) {
        // skip it, we already checked
      } else {
        checkedPoints.push(point);

        this.neighborsFor(point.y, point.x).forEach(function (neighbor) {
          if (checkedPoints.indexOf(neighbor) > -1) {
            // skip this neighbor, we already checked it
          } else {
            if (inclusionCondition(neighbor)) {
              pointsToCheck.push(neighbor);
            } else {
              boundaryPoints.push(neighbor);
            }
          }
        });
      }
    }

    return [checkedPoints, _utils2.default.unique(boundaryPoints)];
  }
};

BoardState._initialFor = function (boardSize, handicapStones) {
  this._cache = this._cache || {};
  this._cache[boardSize] = this._cache[boardSize] || {};

  if (this._cache[boardSize][handicapStones]) {
    return this._cache[boardSize][handicapStones];
  }

  var emptyPoints = Array.apply(null, Array(boardSize * boardSize));
  emptyPoints = emptyPoints.map(function (x, i) {
    return new _intersection2.default(Math.floor(i / boardSize), i % boardSize);
  });

  var hoshiOffset = boardSize > 11 ? 3 : 2;
  var hoshiPoints = {
    topRight: { y: hoshiOffset, x: boardSize - hoshiOffset - 1 },
    bottomLeft: { y: boardSize - hoshiOffset - 1, x: hoshiOffset },
    bottomRight: { y: boardSize - hoshiOffset - 1, x: boardSize - hoshiOffset - 1 },
    topLeft: { y: hoshiOffset, x: hoshiOffset },
    middle: { y: (boardSize + 1) / 2 - 1, x: (boardSize + 1) / 2 - 1 },
    middleLeft: { y: (boardSize + 1) / 2 - 1, x: hoshiOffset },
    middleRight: { y: (boardSize + 1) / 2 - 1, x: boardSize - hoshiOffset - 1 },
    middleTop: { y: hoshiOffset, x: (boardSize + 1) / 2 - 1 },
    middleBottom: { y: boardSize - hoshiOffset - 1, x: (boardSize + 1) / 2 - 1 }
  };
  var handicapPlacements = {
    0: [],
    1: [],
    2: [hoshiPoints.topRight, hoshiPoints.bottomLeft],
    3: [hoshiPoints.topRight, hoshiPoints.bottomLeft, hoshiPoints.bottomRight],
    4: [hoshiPoints.topRight, hoshiPoints.bottomLeft, hoshiPoints.bottomRight, hoshiPoints.topLeft],
    5: [hoshiPoints.topRight, hoshiPoints.bottomLeft, hoshiPoints.bottomRight, hoshiPoints.topLeft, hoshiPoints.middle],
    6: [hoshiPoints.topRight, hoshiPoints.bottomLeft, hoshiPoints.bottomRight, hoshiPoints.topLeft, hoshiPoints.middleLeft, hoshiPoints.middleRight],
    7: [hoshiPoints.topRight, hoshiPoints.bottomLeft, hoshiPoints.bottomRight, hoshiPoints.topLeft, hoshiPoints.middleLeft, hoshiPoints.middleRight, hoshiPoints.middle],
    8: [hoshiPoints.topRight, hoshiPoints.bottomLeft, hoshiPoints.bottomRight, hoshiPoints.topLeft, hoshiPoints.middleLeft, hoshiPoints.middleRight, hoshiPoints.middleTop, hoshiPoints.middleBottom],
    9: [hoshiPoints.topRight, hoshiPoints.bottomLeft, hoshiPoints.bottomRight, hoshiPoints.topLeft, hoshiPoints.middleLeft, hoshiPoints.middleRight, hoshiPoints.middleTop, hoshiPoints.middleBottom, hoshiPoints.middle]
  };

  handicapPlacements[handicapStones].forEach(function (p) {
    emptyPoints[p.y * boardSize + p.x] = new _intersection2.default(p.y, p.x, "black");
  });

  var initialState = new BoardState({
    color: handicapStones > 1 ? "black" : "white",
    moveNumber: 0,
    intersections: Object.freeze(emptyPoints),
    blackStonesCaptured: 0,
    whiteStonesCaptured: 0,
    whitePassStones: 0,
    blackPassStones: 0,
    boardSize: boardSize
  });

  this._cache[boardSize][handicapStones] = initialState;
  return initialState;
};

exports.default = BoardState;

//# sourceMappingURL=board-state.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvYXJkLXN0YXRlLmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiX3NsaWNlZFRvQXJyYXkiLCJzbGljZUl0ZXJhdG9yIiwiYXJyIiwiaSIsIl9hcnIiLCJfbiIsIl9kIiwiX2UiLCJ1bmRlZmluZWQiLCJfaSIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiX3MiLCJuZXh0IiwiZG9uZSIsInB1c2giLCJsZW5ndGgiLCJlcnIiLCJBcnJheSIsImlzQXJyYXkiLCJUeXBlRXJyb3IiLCJfdXRpbHMiLCJyZXF1aXJlIiwiX3V0aWxzMiIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJfaW50ZXJzZWN0aW9uIiwiX2ludGVyc2VjdGlvbjIiLCJfem9icmlzdCIsIl96b2JyaXN0MiIsIm9iaiIsIl9fZXNNb2R1bGUiLCJkZWZhdWx0IiwiQm9hcmRTdGF0ZSIsIl9yZWYiLCJtb3ZlTnVtYmVyIiwicGxheWVkUG9pbnQiLCJjb2xvciIsInBhc3MiLCJibGFja1Bhc3NTdG9uZXMiLCJ3aGl0ZVBhc3NTdG9uZXMiLCJpbnRlcnNlY3Rpb25zIiwiYmxhY2tTdG9uZXNDYXB0dXJlZCIsIndoaXRlU3RvbmVzQ2FwdHVyZWQiLCJjYXB0dXJlZFBvc2l0aW9ucyIsImtvUG9pbnQiLCJib2FyZFNpemUiLCJfcG9zaXRpb25IYXNoIiwiaGFzaCIsImZyZWV6ZSIsInByb3RvdHlwZSIsImNvcHlXaXRoQXR0cmlidXRlcyIsImF0dHJzIiwicmV0cmlldmVQcm9wZXJ0aWVzIiwiX3JlZjIiLCJleGlzdGluZ0F0dHJzIiwibmV3QXR0cnMiLCJhc3NpZ24iLCJfY2FwdHVyZXNGcm9tIiwieSIsIngiLCJfdGhpcyIsImNhcHR1cmVkTmVpZ2hib3JzIiwibmVpZ2hib3JzRm9yIiwiZmlsdGVyIiwibmVpZ2hib3IiLCJpc0VtcHR5IiwibGliZXJ0aWVzQXQiLCJjYXB0dXJlZFN0b25lcyIsImZsYXRNYXAiLCJncm91cEF0IiwidW5pcXVlIiwiX3VwZGF0ZUludGVyc2VjdGlvbiIsImludGVyc2VjdGlvbiIsIm1hcCIsIl9yZW1vdmVJbnRlcnNlY3Rpb24iLCJfd2l0aG91dEludGVyc2VjdGlvbnNNYXRjaGluZyIsImNvbmRpdGlvbiIsIm5ld1BvaW50cyIsIl93aXRoTmV3UG9pbnRzIiwibmV4dENvbG9yIiwieUNvb3JkaW5hdGVGb3IiLCJ4Q29vcmRpbmF0ZUZvciIsImxldHRlcnMiLCJwbGF5UGFzcyIsInN0YXRlSW5mbyIsIm5ld1N0YXRlIiwiX3NpbXBsZUtvUG9pbnQiLCJzaW1wbGVLb1BvaW50IiwiX3BsYXllZFBvaW50IiwiaW5BdGFyaSIsInBsYXlBdCIsInBsYXllZENvbG9yIiwiX3RoaXMyIiwiaW50ZXJzZWN0aW9uQXQiLCJmb3JFYWNoIiwibmV3VG90YWxCbGFja0NhcHR1cmVkIiwibmV3VG90YWxXaGl0ZUNhcHR1cmVkIiwibW92ZUluZm8iLCJ3aXRoUGxheWVkUG9pbnQiLCJwb3NzaWJsZUtvUG9pbnQiLCJFcnJvciIsInN0YXJ0aW5nUG9pbnQiLCJfcGFydGl0aW9uVHJhdmVyc2UiLCJwYXJ0aXRpb25UcmF2ZXJzZSIsInNhbWVDb2xvckFzIiwiX3BhcnRpdGlvblRyYXZlcnNlMiIsImdyb3VwIiwiXyIsIl90aGlzMyIsInBvaW50IiwiZW1wdHlQb2ludHMiLCJncm91cFBvaW50IiwibmVpZ2hib3JzIiwicG9zaXRpb25TYW1lQXMiLCJvdGhlclN0YXRlIiwiZXZlcnkiLCJpbmNsdXNpb25Db25kaXRpb24iLCJjaGVja2VkUG9pbnRzIiwiYm91bmRhcnlQb2ludHMiLCJwb2ludHNUb0NoZWNrIiwicG9wIiwiaW5kZXhPZiIsIl9pbml0aWFsRm9yIiwiaGFuZGljYXBTdG9uZXMiLCJfY2FjaGUiLCJhcHBseSIsIk1hdGgiLCJmbG9vciIsImhvc2hpT2Zmc2V0IiwiaG9zaGlQb2ludHMiLCJ0b3BSaWdodCIsImJvdHRvbUxlZnQiLCJib3R0b21SaWdodCIsInRvcExlZnQiLCJtaWRkbGUiLCJtaWRkbGVMZWZ0IiwibWlkZGxlUmlnaHQiLCJtaWRkbGVUb3AiLCJtaWRkbGVCb3R0b20iLCJoYW5kaWNhcFBsYWNlbWVudHMiLCJwIiwiaW5pdGlhbFN0YXRlIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQUEsT0FBT0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLFNBQU87QUFEb0MsQ0FBN0M7O0FBSUEsSUFBSUMsaUJBQWlCLFlBQVk7QUFBRSxXQUFTQyxhQUFULENBQXVCQyxHQUF2QixFQUE0QkMsQ0FBNUIsRUFBK0I7QUFBRSxRQUFJQyxPQUFPLEVBQVgsQ0FBZSxJQUFJQyxLQUFLLElBQVQsQ0FBZSxJQUFJQyxLQUFLLEtBQVQsQ0FBZ0IsSUFBSUMsS0FBS0MsU0FBVCxDQUFvQixJQUFJO0FBQUUsV0FBSyxJQUFJQyxLQUFLUCxJQUFJUSxPQUFPQyxRQUFYLEdBQVQsRUFBaUNDLEVBQXRDLEVBQTBDLEVBQUVQLEtBQUssQ0FBQ08sS0FBS0gsR0FBR0ksSUFBSCxFQUFOLEVBQWlCQyxJQUF4QixDQUExQyxFQUF5RVQsS0FBSyxJQUE5RSxFQUFvRjtBQUFFRCxhQUFLVyxJQUFMLENBQVVILEdBQUdiLEtBQWIsRUFBcUIsSUFBSUksS0FBS0MsS0FBS1ksTUFBTCxLQUFnQmIsQ0FBekIsRUFBNEI7QUFBUTtBQUFFLEtBQXZKLENBQXdKLE9BQU9jLEdBQVAsRUFBWTtBQUFFWCxXQUFLLElBQUwsQ0FBV0MsS0FBS1UsR0FBTDtBQUFXLEtBQTVMLFNBQXFNO0FBQUUsVUFBSTtBQUFFLFlBQUksQ0FBQ1osRUFBRCxJQUFPSSxHQUFHLFFBQUgsQ0FBWCxFQUF5QkEsR0FBRyxRQUFIO0FBQWlCLE9BQWhELFNBQXlEO0FBQUUsWUFBSUgsRUFBSixFQUFRLE1BQU1DLEVBQU47QUFBVztBQUFFLEtBQUMsT0FBT0gsSUFBUDtBQUFjLEdBQUMsT0FBTyxVQUFVRixHQUFWLEVBQWVDLENBQWYsRUFBa0I7QUFBRSxRQUFJZSxNQUFNQyxPQUFOLENBQWNqQixHQUFkLENBQUosRUFBd0I7QUFBRSxhQUFPQSxHQUFQ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QUFLaENDLHlCQUFxQixDQUxXO0FBTWhDSCxxQkFBaUIsQ0FOZTtBQU9oQ0QscUJBQWlCLENBUGU7QUFRaENPLGVBQVdBO0FBUnFCLEdBQWYsQ0FBbkI7O0FBV0EsT0FBSytFLE1BQUwsQ0FBWS9FLFNBQVosRUFBdUI4RSxjQUF2QixJQUF5Q2tCLFlBQXpDO0FBQ0EsU0FBT0EsWUFBUDtBQUNELENBdkREOztBQXlEQS9JLFFBQVFpQyxPQUFSLEdBQWtCQyxVQUFsQjs7QUFFQSIsImZpbGUiOiJib2FyZC1zdGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH0gcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyByZXR1cm4gYXJyOyB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkgeyByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpOyB9IGVsc2UgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTsgfSB9OyB9KCk7XG5cbnZhciBfdXRpbHMgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcblxudmFyIF91dGlsczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlscyk7XG5cbnZhciBfaW50ZXJzZWN0aW9uID0gcmVxdWlyZShcIi4vaW50ZXJzZWN0aW9uXCIpO1xuXG52YXIgX2ludGVyc2VjdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbnRlcnNlY3Rpb24pO1xuXG52YXIgX3pvYnJpc3QgPSByZXF1aXJlKFwiLi96b2JyaXN0XCIpO1xuXG52YXIgX3pvYnJpc3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfem9icmlzdCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBCb2FyZFN0YXRlID0gZnVuY3Rpb24gQm9hcmRTdGF0ZShfcmVmKSB7XG4gIHZhciBtb3ZlTnVtYmVyID0gX3JlZi5tb3ZlTnVtYmVyLFxuICAgICAgcGxheWVkUG9pbnQgPSBfcmVmLnBsYXllZFBvaW50LFxuICAgICAgY29sb3IgPSBfcmVmLmNvbG9yLFxuICAgICAgcGFzcyA9IF9yZWYucGFzcyxcbiAgICAgIGJsYWNrUGFzc1N0b25lcyA9IF9yZWYuYmxhY2tQYXNzU3RvbmVzLFxuICAgICAgd2hpdGVQYXNzU3RvbmVzID0gX3JlZi53aGl0ZVBhc3NTdG9uZXMsXG4gICAgICBpbnRlcnNlY3Rpb25zID0gX3JlZi5pbnRlcnNlY3Rpb25zLFxuICAgICAgYmxhY2tTdG9uZXNDYXB0dXJlZCA9IF9yZWYuYmxhY2tTdG9uZXNDYXB0dXJlZCxcbiAgICAgIHdoaXRlU3RvbmVzQ2FwdHVyZWQgPSBfcmVmLndoaXRlU3RvbmVzQ2FwdHVyZWQsXG4gICAgICBjYXB0dXJlZFBvc2l0aW9ucyA9IF9yZWYuY2FwdHVyZWRQb3NpdGlvbnMsXG4gICAgICBrb1BvaW50ID0gX3JlZi5rb1BvaW50LFxuICAgICAgYm9hcmRTaXplID0gX3JlZi5ib2FyZFNpemU7XG5cbiAgdGhpcy5tb3ZlTnVtYmVyID0gbW92ZU51bWJlcjtcbiAgdGhpcy5wbGF5ZWRQb2ludCA9IHBsYXllZFBvaW50O1xuICB0aGlzLmNvbG9yID0gY29sb3I7XG4gIHRoaXMucGFzcyA9IHBhc3M7XG4gIHRoaXMuYmxhY2tQYXNzU3RvbmVzID0gYmxhY2tQYXNzU3RvbmVzO1xuICB0aGlzLndoaXRlUGFzc1N0b25lcyA9IHdoaXRlUGFzc1N0b25lcztcbiAgdGhpcy5pbnRlcnNlY3Rpb25zID0gaW50ZXJzZWN0aW9ucztcbiAgdGhpcy5ibGFja1N0b25lc0NhcHR1cmVkID0gYmxhY2tTdG9uZXNDYXB0dXJlZDtcbiAgdGhpcy53aGl0ZVN0b25lc0NhcHR1cmVkID0gd2hpdGVTdG9uZXNDYXB0dXJlZDtcbiAgdGhpcy5jYXB0dXJlZFBvc2l0aW9ucyA9IGNhcHR1cmVkUG9zaXRpb25zO1xuICB0aGlzLmtvUG9pbnQgPSBrb1BvaW50O1xuICB0aGlzLmJvYXJkU2l6ZSA9IGJvYXJkU2l6ZTtcbiAgdGhpcy5fcG9zaXRpb25IYXNoID0gX3pvYnJpc3QyLmRlZmF1bHQuaGFzaChib2FyZFNpemUsIGludGVyc2VjdGlvbnMpO1xuXG4gIE9iamVjdC5mcmVlemUodGhpcyk7XG59O1xuXG5Cb2FyZFN0YXRlLnByb3RvdHlwZSA9IHtcbiAgY29weVdpdGhBdHRyaWJ1dGVzOiBmdW5jdGlvbiBjb3B5V2l0aEF0dHJpYnV0ZXMoYXR0cnMpIHtcbiAgICB2YXIgcmV0cmlldmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gcmV0cmlldmVQcm9wZXJ0aWVzKF9yZWYyKSB7XG4gICAgICB2YXIgbW92ZU51bWJlciA9IF9yZWYyLm1vdmVOdW1iZXIsXG4gICAgICAgICAgcGxheWVkUG9pbnQgPSBfcmVmMi5wbGF5ZWRQb2ludCxcbiAgICAgICAgICBjb2xvciA9IF9yZWYyLmNvbG9yLFxuICAgICAgICAgIHBhc3MgPSBfcmVmMi5wYXNzLFxuICAgICAgICAgIGJsYWNrUGFzc1N0b25lcyA9IF9yZWYyLmJsYWNrUGFzc1N0b25lcyxcbiAgICAgICAgICB3aGl0ZVBhc3NTdG9uZXMgPSBfcmVmMi53aGl0ZVBhc3NTdG9uZXMsXG4gICAgICAgICAgaW50ZXJzZWN0aW9ucyA9IF9yZWYyLmludGVyc2VjdGlvbnMsXG4gICAgICAgICAgYmxhY2tTdG9uZXNDYXB0dXJlZCA9IF9yZWYyLmJsYWNrU3RvbmVzQ2FwdHVyZWQsXG4gICAgICAgICAgd2hpdGVTdG9uZXNDYXB0dXJlZCA9IF9yZWYyLndoaXRlU3RvbmVzQ2FwdHVyZWQsXG4gICAgICAgICAgY2FwdHVyZWRQb3NpdGlvbnMgPSBfcmVmMi5jYXB0dXJlZFBvc2l0aW9ucyxcbiAgICAgICAgICBrb1BvaW50ID0gX3JlZjIua29Qb2ludCxcbiAgICAgICAgICBib2FyZFNpemUgPSBfcmVmMi5ib2FyZFNpemU7XG4gICAgICByZXR1cm4geyBtb3ZlTnVtYmVyOiBtb3ZlTnVtYmVyLCBwbGF5ZWRQb2ludDogcGxheWVkUG9pbnQsIGNvbG9yOiBjb2xvciwgcGFzczogcGFzcywgYmxhY2tQYXNzU3RvbmVzOiBibGFja1Bhc3NTdG9uZXMsIHdoaXRlUGFzc1N0b25lczogd2hpdGVQYXNzU3RvbmVzLCBpbnRlcnNlY3Rpb25zOiBpbnRlcnNlY3Rpb25zLCBibGFja1N0b25lc0NhcHR1cmVkOiBibGFja1N0b25lc0NhcHR1cmVkLCB3aGl0ZVN0b25lc0NhcHR1cmVkOiB3aGl0ZVN0b25lc0NhcHR1cmVkLCBjYXB0dXJlZFBvc2l0aW9uczogY2FwdHVyZWRQb3NpdGlvbnMsIGtvUG9pbnQ6IGtvUG9pbnQsIGJvYXJkU2l6ZTogYm9hcmRTaXplIH07XG4gICAgfTtcbiAgICB2YXIgZXhpc3RpbmdBdHRycyA9IHJldHJpZXZlUHJvcGVydGllcyh0aGlzKTtcbiAgICB2YXIgbmV3QXR0cnMgPSByZXRyaWV2ZVByb3BlcnRpZXMoT2JqZWN0LmFzc2lnbihleGlzdGluZ0F0dHJzLCBhdHRycykpO1xuXG4gICAgcmV0dXJuIG5ldyBCb2FyZFN0YXRlKG5ld0F0dHJzKTtcbiAgfSxcblxuICBfY2FwdHVyZXNGcm9tOiBmdW5jdGlvbiBfY2FwdHVyZXNGcm9tKHksIHgsIGNvbG9yKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciBjYXB0dXJlZE5laWdoYm9ycyA9IHRoaXMubmVpZ2hib3JzRm9yKHksIHgpLmZpbHRlcihmdW5jdGlvbiAobmVpZ2hib3IpIHtcbiAgICAgIC8vIFRPRE86IHRoaXMgdmFsdWUgb2YgMSBpcyBwb3RlbnRpYWxseSB3ZWlyZC5cbiAgICAgIC8vIHdlJ3JlIGNoZWNraW5nIGFnYWluc3QgdGhlIG1vdmUgYmVmb3JlIHRoZSBzdG9uZSB3ZSBqdXN0IHBsYXllZFxuICAgICAgLy8gd2hlcmUgdGhpcyBzcGFjZSBpcyBub3Qgb2NjdXBpZWQgeWV0LiB0aGluZ3Mgc2hvdWxkIHBvc3NpYmx5IGJlXG4gICAgICAvLyByZXdvcmtlZC5cbiAgICAgIHJldHVybiAhbmVpZ2hib3IuaXNFbXB0eSgpICYmIG5laWdoYm9yLnZhbHVlICE9PSBjb2xvciAmJiBfdGhpcy5saWJlcnRpZXNBdChuZWlnaGJvci55LCBuZWlnaGJvci54KSA9PT0gMTtcbiAgICB9KTtcblxuICAgIHZhciBjYXB0dXJlZFN0b25lcyA9IF91dGlsczIuZGVmYXVsdC5mbGF0TWFwKGNhcHR1cmVkTmVpZ2hib3JzLCBmdW5jdGlvbiAobmVpZ2hib3IpIHtcbiAgICAgIHJldHVybiBfdGhpcy5ncm91cEF0KG5laWdoYm9yLnksIG5laWdoYm9yLngpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIF91dGlsczIuZGVmYXVsdC51bmlxdWUoY2FwdHVyZWRTdG9uZXMpO1xuICB9LFxuXG4gIF91cGRhdGVJbnRlcnNlY3Rpb246IGZ1bmN0aW9uIF91cGRhdGVJbnRlcnNlY3Rpb24oaW50ZXJzZWN0aW9uLCBpbnRlcnNlY3Rpb25zLCBjb2xvcikge1xuICAgIHJldHVybiBpbnRlcnNlY3Rpb25zLm1hcChmdW5jdGlvbiAoaSkge1xuICAgICAgaWYgKGkueSA9PT0gaW50ZXJzZWN0aW9uLnkgJiYgaS54ID09PSBpbnRlcnNlY3Rpb24ueCkge1xuICAgICAgICByZXR1cm4gbmV3IF9pbnRlcnNlY3Rpb24yLmRlZmF1bHQoaS55LCBpLngsIGNvbG9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIF9yZW1vdmVJbnRlcnNlY3Rpb246IGZ1bmN0aW9uIF9yZW1vdmVJbnRlcnNlY3Rpb24oaW50ZXJzZWN0aW9uLCBpbnRlcnNlY3Rpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuX3VwZGF0ZUludGVyc2VjdGlvbihpbnRlcnNlY3Rpb24sIGludGVyc2VjdGlvbnMsIFwiZW1wdHlcIik7XG4gIH0sXG5cbiAgX3dpdGhvdXRJbnRlcnNlY3Rpb25zTWF0Y2hpbmc6IGZ1bmN0aW9uIF93aXRob3V0SW50ZXJzZWN0aW9uc01hdGNoaW5nKGNvbmRpdGlvbikge1xuICAgIHZhciBuZXdQb2ludHMgPSB0aGlzLmludGVyc2VjdGlvbnMubWFwKGZ1bmN0aW9uIChpKSB7XG4gICAgICBpZiAoY29uZGl0aW9uKGkpKSB7XG4gICAgICAgIHJldHVybiBuZXcgX2ludGVyc2VjdGlvbjIuZGVmYXVsdChpLnksIGkueCwgXCJlbXB0eVwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuX3dpdGhOZXdQb2ludHMobmV3UG9pbnRzKTtcbiAgfSxcblxuICBfd2l0aE5ld1BvaW50czogZnVuY3Rpb24gX3dpdGhOZXdQb2ludHMobmV3UG9pbnRzKSB7XG4gICAgcmV0dXJuIHRoaXMuY29weVdpdGhBdHRyaWJ1dGVzKHsgaW50ZXJzZWN0aW9uczogbmV3UG9pbnRzIH0pO1xuICB9LFxuXG4gIG5leHRDb2xvcjogZnVuY3Rpb24gbmV4dENvbG9yKCkge1xuICAgIGlmICh0aGlzLmNvbG9yID09PSBcImJsYWNrXCIpIHtcbiAgICAgIHJldHVybiBcIndoaXRlXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBcImJsYWNrXCI7XG4gICAgfVxuICB9LFxuXG4gIHlDb29yZGluYXRlRm9yOiBmdW5jdGlvbiB5Q29vcmRpbmF0ZUZvcih5KSB7XG4gICAgcmV0dXJuIHRoaXMuYm9hcmRTaXplIC0geTtcbiAgfSxcblxuICB4Q29vcmRpbmF0ZUZvcjogZnVuY3Rpb24geENvb3JkaW5hdGVGb3IoeCkge1xuICAgIHZhciBsZXR0ZXJzID0gW1wiQVwiLCBcIkJcIiwgXCJDXCIsIFwiRFwiLCBcIkVcIiwgXCJGXCIsIFwiR1wiLCBcIkhcIiwgXCJKXCIsIFwiS1wiLCBcIkxcIiwgXCJNXCIsIFwiTlwiLCBcIk9cIiwgXCJQXCIsIFwiUVwiLCBcIlJcIiwgXCJTXCIsIFwiVFwiXTtcblxuICAgIHJldHVybiBsZXR0ZXJzW3hdO1xuICB9LFxuXG4gIHBsYXlQYXNzOiBmdW5jdGlvbiBwbGF5UGFzcyhjb2xvcikge1xuICAgIHZhciBzdGF0ZUluZm8gPSB7XG4gICAgICBtb3ZlTnVtYmVyOiB0aGlzLm1vdmVOdW1iZXIgKyAxLFxuICAgICAgcGxheWVkUG9pbnQ6IG51bGwsXG4gICAgICBjb2xvcjogY29sb3IsXG4gICAgICBwYXNzOiB0cnVlLFxuICAgICAgYmxhY2tQYXNzU3RvbmVzOiB0aGlzLmJsYWNrUGFzc1N0b25lcyxcbiAgICAgIHdoaXRlUGFzc1N0b25lczogdGhpcy53aGl0ZVBhc3NTdG9uZXMsXG4gICAgICBpbnRlcnNlY3Rpb25zOiB0aGlzLmludGVyc2VjdGlvbnMsXG4gICAgICBibGFja1N0b25lc0NhcHR1cmVkOiB0aGlzLmJsYWNrU3RvbmVzQ2FwdHVyZWQsXG4gICAgICB3aGl0ZVN0b25lc0NhcHR1cmVkOiB0aGlzLndoaXRlU3RvbmVzQ2FwdHVyZWQsXG4gICAgICBjYXB0dXJlZFBvc2l0aW9uczogW10sXG4gICAgICBrb1BvaW50OiBudWxsLFxuICAgICAgYm9hcmRTaXplOiB0aGlzLmJvYXJkU2l6ZVxuICAgIH07XG5cbiAgICBzdGF0ZUluZm9bY29sb3IgKyBcIlBhc3NTdG9uZXNcIl0gKz0gMTtcblxuICAgIHZhciBuZXdTdGF0ZSA9IG5ldyBCb2FyZFN0YXRlKHN0YXRlSW5mbyk7XG5cbiAgICByZXR1cm4gbmV3U3RhdGU7XG4gIH0sXG5cbiAgX3NpbXBsZUtvUG9pbnQ6IGZ1bmN0aW9uIF9zaW1wbGVLb1BvaW50KCkge1xuICAgIHZhciBzaW1wbGVLb1BvaW50ID0gbnVsbDtcblxuICAgIGlmICh0aGlzLnBsYXllZFBvaW50KSB7XG4gICAgICB2YXIgX3BsYXllZFBvaW50ID0gdGhpcy5wbGF5ZWRQb2ludCxcbiAgICAgICAgICB5ID0gX3BsYXllZFBvaW50LnksXG4gICAgICAgICAgeCA9IF9wbGF5ZWRQb2ludC54O1xuXG5cbiAgICAgIGlmICh0aGlzLmNhcHR1cmVkUG9zaXRpb25zLmxlbmd0aCA9PT0gMSAmJiB0aGlzLmdyb3VwQXQoeSwgeCkubGVuZ3RoID09PSAxICYmIHRoaXMuaW5BdGFyaSh5LCB4KSkge1xuICAgICAgICBzaW1wbGVLb1BvaW50ID0gdGhpcy5jYXB0dXJlZFBvc2l0aW9uc1swXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc2ltcGxlS29Qb2ludDtcbiAgfSxcblxuICBwbGF5QXQ6IGZ1bmN0aW9uIHBsYXlBdCh5LCB4LCBwbGF5ZWRDb2xvcikge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgdmFyIGNhcHR1cmVkUG9zaXRpb25zID0gdGhpcy5fY2FwdHVyZXNGcm9tKHksIHgsIHBsYXllZENvbG9yKTtcbiAgICB2YXIgcGxheWVkUG9pbnQgPSB0aGlzLmludGVyc2VjdGlvbkF0KHksIHgpO1xuICAgIHZhciBuZXdQb2ludHMgPSB0aGlzLmludGVyc2VjdGlvbnM7XG5cbiAgICBjYXB0dXJlZFBvc2l0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChpKSB7XG4gICAgICBuZXdQb2ludHMgPSBfdGhpczIuX3JlbW92ZUludGVyc2VjdGlvbihpLCBuZXdQb2ludHMpO1xuICAgIH0pO1xuXG4gICAgbmV3UG9pbnRzID0gdGhpcy5fdXBkYXRlSW50ZXJzZWN0aW9uKHBsYXllZFBvaW50LCBuZXdQb2ludHMsIHBsYXllZENvbG9yKTtcblxuICAgIHZhciBuZXdUb3RhbEJsYWNrQ2FwdHVyZWQgPSB0aGlzLmJsYWNrU3RvbmVzQ2FwdHVyZWQgKyAocGxheWVkQ29sb3IgPT09IFwiYmxhY2tcIiA/IDAgOiBjYXB0dXJlZFBvc2l0aW9ucy5sZW5ndGgpO1xuICAgIHZhciBuZXdUb3RhbFdoaXRlQ2FwdHVyZWQgPSB0aGlzLndoaXRlU3RvbmVzQ2FwdHVyZWQgKyAocGxheWVkQ29sb3IgPT09IFwid2hpdGVcIiA/IDAgOiBjYXB0dXJlZFBvc2l0aW9ucy5sZW5ndGgpO1xuXG4gICAgdmFyIGJvYXJkU2l6ZSA9IHRoaXMuYm9hcmRTaXplO1xuXG4gICAgdmFyIG1vdmVJbmZvID0ge1xuICAgICAgbW92ZU51bWJlcjogdGhpcy5tb3ZlTnVtYmVyICsgMSxcbiAgICAgIHBsYXllZFBvaW50OiBPYmplY3QuZnJlZXplKHsgeTogeSwgeDogeCB9KSxcbiAgICAgIGNvbG9yOiBwbGF5ZWRDb2xvcixcbiAgICAgIHBhc3M6IGZhbHNlLFxuICAgICAgYmxhY2tQYXNzU3RvbmVzOiB0aGlzLmJsYWNrUGFzc1N0b25lcyxcbiAgICAgIHdoaXRlUGFzc1N0b25lczogdGhpcy53aGl0ZVBhc3NTdG9uZXMsXG4gICAgICBpbnRlcnNlY3Rpb25zOiBuZXdQb2ludHMsXG4gICAgICBibGFja1N0b25lc0NhcHR1cmVkOiBuZXdUb3RhbEJsYWNrQ2FwdHVyZWQsXG4gICAgICB3aGl0ZVN0b25lc0NhcHR1cmVkOiBuZXdUb3RhbFdoaXRlQ2FwdHVyZWQsXG4gICAgICBjYXB0dXJlZFBvc2l0aW9uczogY2FwdHVyZWRQb3NpdGlvbnMsXG4gICAgICBib2FyZFNpemU6IGJvYXJkU2l6ZVxuICAgIH07XG5cbiAgICB2YXIgd2l0aFBsYXllZFBvaW50ID0gbmV3IEJvYXJkU3RhdGUobW92ZUluZm8pO1xuXG4gICAgdmFyIHBvc3NpYmxlS29Qb2ludCA9IHdpdGhQbGF5ZWRQb2ludC5fc2ltcGxlS29Qb2ludCgpO1xuXG4gICAgaWYgKHBvc3NpYmxlS29Qb2ludCkge1xuICAgICAgbW92ZUluZm9bXCJrb1BvaW50XCJdID0geyB5OiBwb3NzaWJsZUtvUG9pbnQueSwgeDogcG9zc2libGVLb1BvaW50LnggfTtcbiAgICB9IGVsc2Uge1xuICAgICAgbW92ZUluZm9bXCJrb1BvaW50XCJdID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEJvYXJkU3RhdGUobW92ZUluZm8pO1xuICB9LFxuXG4gIGludGVyc2VjdGlvbkF0OiBmdW5jdGlvbiBpbnRlcnNlY3Rpb25BdCh5LCB4KSB7XG4gICAgaWYgKHkgPj0gdGhpcy5ib2FyZFNpemUgfHwgeCA+PSB0aGlzLmJvYXJkU2l6ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW50ZXJzZWN0aW9uIGF0IChcIiArIHkgKyBcIiwgXCIgKyB4ICsgXCIpIHdvdWxkIGJlIG91dHNpZGUgdGhlIGJvYXJkXCIpO1xuICAgIH1cblxuICAgIGlmICh5IDwgMCB8fCB4IDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW50ZXJzZWN0aW9uIHBvc2l0aW9uIGNhbm5vdCBiZSBuZWdhdGl2ZSwgYnV0IHdhcyBnaXZlbiAoXCIgKyB5ICsgXCIsIFwiICsgeCArIFwiKVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5pbnRlcnNlY3Rpb25zW3kgKiB0aGlzLmJvYXJkU2l6ZSArIHhdO1xuICB9LFxuXG4gIGdyb3VwQXQ6IGZ1bmN0aW9uIGdyb3VwQXQoeSwgeCkge1xuICAgIHZhciBzdGFydGluZ1BvaW50ID0gdGhpcy5pbnRlcnNlY3Rpb25BdCh5LCB4KTtcblxuICAgIHZhciBfcGFydGl0aW9uVHJhdmVyc2UgPSB0aGlzLnBhcnRpdGlvblRyYXZlcnNlKHN0YXJ0aW5nUG9pbnQsIGZ1bmN0aW9uIChuZWlnaGJvcikge1xuICAgICAgcmV0dXJuIG5laWdoYm9yLnNhbWVDb2xvckFzKHN0YXJ0aW5nUG9pbnQpO1xuICAgIH0pLFxuICAgICAgICBfcGFydGl0aW9uVHJhdmVyc2UyID0gX3NsaWNlZFRvQXJyYXkoX3BhcnRpdGlvblRyYXZlcnNlLCAyKSxcbiAgICAgICAgZ3JvdXAgPSBfcGFydGl0aW9uVHJhdmVyc2UyWzBdLFxuICAgICAgICBfID0gX3BhcnRpdGlvblRyYXZlcnNlMlsxXTtcblxuICAgIHJldHVybiBncm91cDtcbiAgfSxcblxuICBsaWJlcnRpZXNBdDogZnVuY3Rpb24gbGliZXJ0aWVzQXQoeSwgeCkge1xuICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgdmFyIHBvaW50ID0gdGhpcy5pbnRlcnNlY3Rpb25BdCh5LCB4KTtcblxuICAgIHZhciBlbXB0eVBvaW50cyA9IF91dGlsczIuZGVmYXVsdC5mbGF0TWFwKHRoaXMuZ3JvdXBBdChwb2ludC55LCBwb2ludC54KSwgZnVuY3Rpb24gKGdyb3VwUG9pbnQpIHtcbiAgICAgIHJldHVybiBfdGhpczMubmVpZ2hib3JzRm9yKGdyb3VwUG9pbnQueSwgZ3JvdXBQb2ludC54KS5maWx0ZXIoZnVuY3Rpb24gKGludGVyc2VjdGlvbikge1xuICAgICAgICByZXR1cm4gaW50ZXJzZWN0aW9uLmlzRW1wdHkoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIF91dGlsczIuZGVmYXVsdC51bmlxdWUoZW1wdHlQb2ludHMpLmxlbmd0aDtcbiAgfSxcblxuICBpbkF0YXJpOiBmdW5jdGlvbiBpbkF0YXJpKHksIHgpIHtcbiAgICByZXR1cm4gdGhpcy5saWJlcnRpZXNBdCh5LCB4KSA9PT0gMTtcbiAgfSxcblxuICBuZWlnaGJvcnNGb3I6IGZ1bmN0aW9uIG5laWdoYm9yc0Zvcih5LCB4KSB7XG4gICAgdmFyIG5laWdoYm9ycyA9IFtdO1xuXG4gICAgaWYgKHggPiAwKSB7XG4gICAgICBuZWlnaGJvcnMucHVzaCh0aGlzLmludGVyc2VjdGlvbkF0KHksIHggLSAxKSk7XG4gICAgfVxuXG4gICAgaWYgKHggPCB0aGlzLmJvYXJkU2l6ZSAtIDEpIHtcbiAgICAgIG5laWdoYm9ycy5wdXNoKHRoaXMuaW50ZXJzZWN0aW9uQXQoeSwgeCArIDEpKTtcbiAgICB9XG5cbiAgICBpZiAoeSA+IDApIHtcbiAgICAgIG5laWdoYm9ycy5wdXNoKHRoaXMuaW50ZXJzZWN0aW9uQXQoeSAtIDEsIHgpKTtcbiAgICB9XG5cbiAgICBpZiAoeSA8IHRoaXMuYm9hcmRTaXplIC0gMSkge1xuICAgICAgbmVpZ2hib3JzLnB1c2godGhpcy5pbnRlcnNlY3Rpb25BdCh5ICsgMSwgeCkpO1xuICAgIH1cblxuICAgIHJldHVybiBuZWlnaGJvcnM7XG4gIH0sXG5cbiAgcG9zaXRpb25TYW1lQXM6IGZ1bmN0aW9uIHBvc2l0aW9uU2FtZUFzKG90aGVyU3RhdGUpIHtcbiAgICByZXR1cm4gdGhpcy5fcG9zaXRpb25IYXNoID09PSBvdGhlclN0YXRlLl9wb3NpdGlvbkhhc2ggJiYgdGhpcy5pbnRlcnNlY3Rpb25zLmV2ZXJ5KGZ1bmN0aW9uIChwb2ludCkge1xuICAgICAgcmV0dXJuIHBvaW50LnNhbWVDb2xvckFzKG90aGVyU3RhdGUuaW50ZXJzZWN0aW9uQXQocG9pbnQueSwgcG9pbnQueCkpO1xuICAgIH0pO1xuICB9LFxuXG4gIC8vIEl0ZXJhdGl2ZSBkZXB0aC1maXJzdCBzZWFyY2ggdHJhdmVyc2FsLiBTdGFydCBmcm9tXG4gIC8vIHN0YXJ0aW5nUG9pbnQsIGl0ZXJhdGl2ZWx5IGZvbGxvdyBhbGwgbmVpZ2hib3JzLlxuICAvLyBJZiBpbmNsdXNpb25Db25kaXRpb25pcyBtZXQgZm9yIGEgbmVpZ2hib3IsIGluY2x1ZGUgaXRcbiAgLy8gb3RoZXJ3aXNlLCBleGNsdWRlIGl0LiBBdCB0aGUgZW5kLCByZXR1cm4gdHdvIGFycmF5czpcbiAgLy8gT25lIGZvciB0aGUgaW5jbHVkZWQgbmVpZ2hib3JzLCBhbm90aGVyIGZvciB0aGUgcmVtYWluaW5nIG5laWdoYm9ycy5cbiAgcGFydGl0aW9uVHJhdmVyc2U6IGZ1bmN0aW9uIHBhcnRpdGlvblRyYXZlcnNlKHN0YXJ0aW5nUG9pbnQsIGluY2x1c2lvbkNvbmRpdGlvbikge1xuICAgIHZhciBjaGVja2VkUG9pbnRzID0gW107XG4gICAgdmFyIGJvdW5kYXJ5UG9pbnRzID0gW107XG4gICAgdmFyIHBvaW50c1RvQ2hlY2sgPSBbXTtcblxuICAgIHBvaW50c1RvQ2hlY2sucHVzaChzdGFydGluZ1BvaW50KTtcblxuICAgIHdoaWxlIChwb2ludHNUb0NoZWNrLmxlbmd0aCA+IDApIHtcbiAgICAgIHZhciBwb2ludCA9IHBvaW50c1RvQ2hlY2sucG9wKCk7XG5cbiAgICAgIGlmIChjaGVja2VkUG9pbnRzLmluZGV4T2YocG9pbnQpID4gLTEpIHtcbiAgICAgICAgLy8gc2tpcCBpdCwgd2UgYWxyZWFkeSBjaGVja2VkXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaGVja2VkUG9pbnRzLnB1c2gocG9pbnQpO1xuXG4gICAgICAgIHRoaXMubmVpZ2hib3JzRm9yKHBvaW50LnksIHBvaW50LngpLmZvckVhY2goZnVuY3Rpb24gKG5laWdoYm9yKSB7XG4gICAgICAgICAgaWYgKGNoZWNrZWRQb2ludHMuaW5kZXhPZihuZWlnaGJvcikgPiAtMSkge1xuICAgICAgICAgICAgLy8gc2tpcCB0aGlzIG5laWdoYm9yLCB3ZSBhbHJlYWR5IGNoZWNrZWQgaXRcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGluY2x1c2lvbkNvbmRpdGlvbihuZWlnaGJvcikpIHtcbiAgICAgICAgICAgICAgcG9pbnRzVG9DaGVjay5wdXNoKG5laWdoYm9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGJvdW5kYXJ5UG9pbnRzLnB1c2gobmVpZ2hib3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFtjaGVja2VkUG9pbnRzLCBfdXRpbHMyLmRlZmF1bHQudW5pcXVlKGJvdW5kYXJ5UG9pbnRzKV07XG4gIH1cbn07XG5cbkJvYXJkU3RhdGUuX2luaXRpYWxGb3IgPSBmdW5jdGlvbiAoYm9hcmRTaXplLCBoYW5kaWNhcFN0b25lcykge1xuICB0aGlzLl9jYWNoZSA9IHRoaXMuX2NhY2hlIHx8IHt9O1xuICB0aGlzLl9jYWNoZVtib2FyZFNpemVdID0gdGhpcy5fY2FjaGVbYm9hcmRTaXplXSB8fCB7fTtcblxuICBpZiAodGhpcy5fY2FjaGVbYm9hcmRTaXplXVtoYW5kaWNhcFN0b25lc10pIHtcbiAgICByZXR1cm4gdGhpcy5fY2FjaGVbYm9hcmRTaXplXVtoYW5kaWNhcFN0b25lc107XG4gIH1cblxuICB2YXIgZW1wdHlQb2ludHMgPSBBcnJheS5hcHBseShudWxsLCBBcnJheShib2FyZFNpemUgKiBib2FyZFNpemUpKTtcbiAgZW1wdHlQb2ludHMgPSBlbXB0eVBvaW50cy5tYXAoZnVuY3Rpb24gKHgsIGkpIHtcbiAgICByZXR1cm4gbmV3IF9pbnRlcnNlY3Rpb24yLmRlZmF1bHQoTWF0aC5mbG9vcihpIC8gYm9hcmRTaXplKSwgaSAlIGJvYXJkU2l6ZSk7XG4gIH0pO1xuXG4gIHZhciBob3NoaU9mZnNldCA9IGJvYXJkU2l6ZSA+IDExID8gMyA6IDI7XG4gIHZhciBob3NoaVBvaW50cyA9IHtcbiAgICB0b3BSaWdodDogeyB5OiBob3NoaU9mZnNldCwgeDogYm9hcmRTaXplIC0gaG9zaGlPZmZzZXQgLSAxIH0sXG4gICAgYm90dG9tTGVmdDogeyB5OiBib2FyZFNpemUgLSBob3NoaU9mZnNldCAtIDEsIHg6IGhvc2hpT2Zmc2V0IH0sXG4gICAgYm90dG9tUmlnaHQ6IHsgeTogYm9hcmRTaXplIC0gaG9zaGlPZmZzZXQgLSAxLCB4OiBib2FyZFNpemUgLSBob3NoaU9mZnNldCAtIDEgfSxcbiAgICB0b3BMZWZ0OiB7IHk6IGhvc2hpT2Zmc2V0LCB4OiBob3NoaU9mZnNldCB9LFxuICAgIG1pZGRsZTogeyB5OiAoYm9hcmRTaXplICsgMSkgLyAyIC0gMSwgeDogKGJvYXJkU2l6ZSArIDEpIC8gMiAtIDEgfSxcbiAgICBtaWRkbGVMZWZ0OiB7IHk6IChib2FyZFNpemUgKyAxKSAvIDIgLSAxLCB4OiBob3NoaU9mZnNldCB9LFxuICAgIG1pZGRsZVJpZ2h0OiB7IHk6IChib2FyZFNpemUgKyAxKSAvIDIgLSAxLCB4OiBib2FyZFNpemUgLSBob3NoaU9mZnNldCAtIDEgfSxcbiAgICBtaWRkbGVUb3A6IHsgeTogaG9zaGlPZmZzZXQsIHg6IChib2FyZFNpemUgKyAxKSAvIDIgLSAxIH0sXG4gICAgbWlkZGxlQm90dG9tOiB7IHk6IGJvYXJkU2l6ZSAtIGhvc2hpT2Zmc2V0IC0gMSwgeDogKGJvYXJkU2l6ZSArIDEpIC8gMiAtIDEgfVxuICB9O1xuICB2YXIgaGFuZGljYXBQbGFjZW1lbnRzID0ge1xuICAgIDA6IFtdLFxuICAgIDE6IFtdLFxuICAgIDI6IFtob3NoaVBvaW50cy50b3BSaWdodCwgaG9zaGlQb2ludHMuYm90dG9tTGVmdF0sXG4gICAgMzogW2hvc2hpUG9pbnRzLnRvcFJpZ2h0LCBob3NoaVBvaW50cy5ib3R0b21MZWZ0LCBob3NoaVBvaW50cy5ib3R0b21SaWdodF0sXG4gICAgNDogW2hvc2hpUG9pbnRzLnRvcFJpZ2h0LCBob3NoaVBvaW50cy5ib3R0b21MZWZ0LCBob3NoaVBvaW50cy5ib3R0b21SaWdodCwgaG9zaGlQb2ludHMudG9wTGVmdF0sXG4gICAgNTogW2hvc2hpUG9pbnRzLnRvcFJpZ2h0LCBob3NoaVBvaW50cy5ib3R0b21MZWZ0LCBob3NoaVBvaW50cy5ib3R0b21SaWdodCwgaG9zaGlQb2ludHMudG9wTGVmdCwgaG9zaGlQb2ludHMubWlkZGxlXSxcbiAgICA2OiBbaG9zaGlQb2ludHMudG9wUmlnaHQsIGhvc2hpUG9pbnRzLmJvdHRvbUxlZnQsIGhvc2hpUG9pbnRzLmJvdHRvbVJpZ2h0LCBob3NoaVBvaW50cy50b3BMZWZ0LCBob3NoaVBvaW50cy5taWRkbGVMZWZ0LCBob3NoaVBvaW50cy5taWRkbGVSaWdodF0sXG4gICAgNzogW2hvc2hpUG9pbnRzLnRvcFJpZ2h0LCBob3NoaVBvaW50cy5ib3R0b21MZWZ0LCBob3NoaVBvaW50cy5ib3R0b21SaWdodCwgaG9zaGlQb2ludHMudG9wTGVmdCwgaG9zaGlQb2ludHMubWlkZGxlTGVmdCwgaG9zaGlQb2ludHMubWlkZGxlUmlnaHQsIGhvc2hpUG9pbnRzLm1pZGRsZV0sXG4gICAgODogW2hvc2hpUG9pbnRzLnRvcFJpZ2h0LCBob3NoaVBvaW50cy5ib3R0b21MZWZ0LCBob3NoaVBvaW50cy5ib3R0b21SaWdodCwgaG9zaGlQb2ludHMudG9wTGVmdCwgaG9zaGlQb2ludHMubWlkZGxlTGVmdCwgaG9zaGlQb2ludHMubWlkZGxlUmlnaHQsIGhvc2hpUG9pbnRzLm1pZGRsZVRvcCwgaG9zaGlQb2ludHMubWlkZGxlQm90dG9tXSxcbiAgICA5OiBbaG9zaGlQb2ludHMudG9wUmlnaHQsIGhvc2hpUG9pbnRzLmJvdHRvbUxlZnQsIGhvc2hpUG9pbnRzLmJvdHRvbVJpZ2h0LCBob3NoaVBvaW50cy50b3BMZWZ0LCBob3NoaVBvaW50cy5taWRkbGVMZWZ0LCBob3NoaVBvaW50cy5taWRkbGVSaWdodCwgaG9zaGlQb2ludHMubWlkZGxlVG9wLCBob3NoaVBvaW50cy5taWRkbGVCb3R0b20sIGhvc2hpUG9pbnRzLm1pZGRsZV1cbiAgfTtcblxuICBoYW5kaWNhcFBsYWNlbWVudHNbaGFuZGljYXBTdG9uZXNdLmZvckVhY2goZnVuY3Rpb24gKHApIHtcbiAgICBlbXB0eVBvaW50c1twLnkgKiBib2FyZFNpemUgKyBwLnhdID0gbmV3IF9pbnRlcnNlY3Rpb24yLmRlZmF1bHQocC55LCBwLngsIFwiYmxhY2tcIik7XG4gIH0pO1xuXG4gIHZhciBpbml0aWFsU3RhdGUgPSBuZXcgQm9hcmRTdGF0ZSh7XG4gICAgY29sb3I6IGhhbmRpY2FwU3RvbmVzID4gMSA/IFwiYmxhY2tcIiA6IFwid2hpdGVcIixcbiAgICBtb3ZlTnVtYmVyOiAwLFxuICAgIGludGVyc2VjdGlvbnM6IE9iamVjdC5mcmVlemUoZW1wdHlQb2ludHMpLFxuICAgIGJsYWNrU3RvbmVzQ2FwdHVyZWQ6IDAsXG4gICAgd2hpdGVTdG9uZXNDYXB0dXJlZDogMCxcbiAgICB3aGl0ZVBhc3NTdG9uZXM6IDAsXG4gICAgYmxhY2tQYXNzU3RvbmVzOiAwLFxuICAgIGJvYXJkU2l6ZTogYm9hcmRTaXplXG4gIH0pO1xuXG4gIHRoaXMuX2NhY2hlW2JvYXJkU2l6ZV1baGFuZGljYXBTdG9uZXNdID0gaW5pdGlhbFN0YXRlO1xuICByZXR1cm4gaW5pdGlhbFN0YXRlO1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gQm9hcmRTdGF0ZTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Ym9hcmQtc3RhdGUuanMubWFwIl19
},{"./intersection":7,"./utils":14,"./zobrist":15}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _game = require("./game");

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

var Client = function Client() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  this._boardElement = options["element"];
  this._setup(options);
};

Client.prototype = {
  _setup: function _setup(_ref) {
    var _this = this;

    var player = _ref.player,
        gameOptions = _ref.gameOptions,
        hooks = _ref.hooks;

    this._player = player;
    this._hooks = hooks;

    if (this._player !== "black" && this._player !== "white") {
      throw new Error("Player must be either black or white, but was given: " + this._player);
    }

    gameOptions["_hooks"] = {
      handleClick: function handleClick(y, x) {
        if (_this._busy) {
          return;
        }

        _this._busy = true;

        if (_this.isOver()) {
          var stonesToBeMarkedDead = _this._game.currentState().groupAt(y, x).map(function (i) {
            return {
              y: i.y,
              x: i.x,
              color: i.color
            };
          });

          _this._hooks.submitMarkDeadAt(y, x, stonesToBeMarkedDead, function (result) {
            if (result) {
              _this._game.toggleDeadAt(y, x);
            }

            _this._busy = false;
          });
        } else {
          if (_this._player !== _this.currentPlayer() || _this._game.isIllegalAt(y, x)) {
            _this._busy = false;

            return;
          }

          _this._hooks.submitPlay(y, x, function (result) {
            if (result) {
              _this._game.playAt(y, x);
            }

            _this._busy = false;
          });
        }
      },

      hoverValue: function hoverValue(y, x) {
        if (!_this._busy && _this._player === _this.currentPlayer() && !_this.isOver() && !_this._game.isIllegalAt(y, x)) {
          return _this._player;
        }
      },

      gameIsOver: function gameIsOver() {
        return _this.isOver();
      }
    };

    if (this._boardElement) {
      this._game = new _game2.default(Object.assign({ element: this._boardElement }, gameOptions));
    } else {
      this._game = new (Function.prototype.bind.apply(_game2.default, [null].concat(_toConsumableArray(gameOptions))))();
    }
  },

  isOver: function isOver() {
    return this._game.isOver();
  },

  currentPlayer: function currentPlayer() {
    return this._game.currentPlayer();
  },

  receivePlay: function receivePlay(y, x) {
    if (this._player === this.currentPlayer()) {
      return;
    }

    this._game.playAt(y, x);
  },

  moveNumber: function moveNumber() {
    return this._game.moveNumber();
  },

  receivePass: function receivePass() {
    if (this._player === this.currentPlayer()) {
      return;
    }

    this._game.pass();
  },

  receiveMarkDeadAt: function receiveMarkDeadAt(y, x) {
    this._game.toggleDeadAt(y, x);
  },

  deadStones: function deadStones() {
    return this._game.deadStones();
  },

  setDeadStones: function setDeadStones(points) {
    this._game._deadPoints = points.map(function (i) {
      return {
        y: i.y,
        x: i.x
      };
    });

    this._game.render();
  },

  pass: function pass() {
    var _this2 = this;

    if (this._busy || this._player !== this.currentPlayer() || this.isOver()) {
      return;
    }

    this._busy = true;

    this._hooks.submitPass(function (result) {
      if (result) {
        _this2._game.pass();
      }

      _this2._busy = false;
    });
  }
};

exports.default = Client;

//# sourceMappingURL=client.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsIl9nYW1lIiwicmVxdWlyZSIsIl9nYW1lMiIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJvYmoiLCJfX2VzTW9kdWxlIiwiZGVmYXVsdCIsIl90b0NvbnN1bWFibGVBcnJheSIsImFyciIsIkFycmF5IiwiaXNBcnJheSIsImkiLCJhcnIyIiwibGVuZ3RoIiwiZnJvbSIsIkNsaWVudCIsIm9wdGlvbnMiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJfYm9hcmRFbGVtZW50IiwiX3NldHVwIiwicHJvdG90eXBlIiwiX3JlZiIsIl90aGlzIiwicGxheWVyIiwiZ2FtZU9wdGlvbnMiLCJob29rcyIsIl9wbGF5ZXIiLCJfaG9va3MiLCJFcnJvciIsImhhbmRsZUNsaWNrIiwieSIsIngiLCJfYnVzeSIsImlzT3ZlciIsInN0b25lc1RvQmVNYXJrZWREZWFkIiwiY3VycmVudFN0YXRlIiwiZ3JvdXBBdCIsIm1hcCIsImNvbG9yIiwic3VibWl0TWFya0RlYWRBdCIsInJlc3VsdCIsInRvZ2dsZURlYWRBdCIsImN1cnJlbnRQbGF5ZXIiLCJpc0lsbGVnYWxBdCIsInN1Ym1pdFBsYXkiLCJwbGF5QXQiLCJob3ZlclZhbHVlIiwiZ2FtZUlzT3ZlciIsImFzc2lnbiIsImVsZW1lbnQiLCJGdW5jdGlvbiIsImJpbmQiLCJhcHBseSIsImNvbmNhdCIsInJlY2VpdmVQbGF5IiwibW92ZU51bWJlciIsInJlY2VpdmVQYXNzIiwicGFzcyIsInJlY2VpdmVNYXJrRGVhZEF0IiwiZGVhZFN0b25lcyIsInNldERlYWRTdG9uZXMiLCJwb2ludHMiLCJfZGVhZFBvaW50cyIsInJlbmRlciIsIl90aGlzMiIsInN1Ym1pdFBhc3MiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBQSxPQUFPQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQ0MsU0FB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R2pCQyxpQkFBZSxTQUFTQSxhQUFULENBQXVCQyxNQUF2QixFQUErQjtBQUM1QyxTQUFLOUQsS0FBTCxDQUFXK0QsV0FBWCxHQUF5QkQsT0FBT3hCLEdBQVAsQ0FBVyxVQUFVM0IsQ0FBVixFQUFhO0FBQy9DLGFBQU87QUFDTG9CLFdBQUdwQixFQUFFb0IsQ0FEQTtBQUVMQyxXQUFHckIsRUFBRXFCO0FBRkEsT0FBUDtBQUlELEtBTHdCLENBQXpCOztBQU9BLFNBQUtoQyxLQUFMLENBQVdnRSxNQUFYO0FBQ0QsR0F2SGdCOztBQXlIakJOLFFBQU0sU0FBU0EsSUFBVCxHQUFnQjtBQUNwQixRQUFJTyxTQUFTLElBQWI7O0FBRUEsUUFBSSxLQUFLaEMsS0FBTCxJQUFjLEtBQUtOLE9BQUwsS0FBaUIsS0FBS2dCLGFBQUwsRUFBL0IsSUFBdUQsS0FBS1QsTUFBTCxFQUEzRCxFQUEwRTtBQUN4RTtBQUNEOztBQUVELFNBQUtELEtBQUwsR0FBYSxJQUFiOztBQUVBLFNBQUtMLE1BQUwsQ0FBWXNDLFVBQVosQ0FBdUIsVUFBVXpCLE1BQVYsRUFBa0I7QUFDdkMsVUFBSUEsTUFBSixFQUFZO0FBQ1Z3QixlQUFPakUsS0FBUCxDQUFhMEQsSUFBYjtBQUNEOztBQUVETyxhQUFPaEMsS0FBUCxHQUFlLEtBQWY7QUFDRCxLQU5EO0FBT0Q7QUF6SWdCLENBQW5COztBQTRJQW5DLFFBQVFRLE9BQVIsR0FBa0JTLE1BQWxCOztBQUVBIiwiZmlsZSI6ImNsaWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2dhbWUgPSByZXF1aXJlKFwiLi9nYW1lXCIpO1xuXG52YXIgX2dhbWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2FtZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH0gZWxzZSB7IHJldHVybiBBcnJheS5mcm9tKGFycik7IH0gfVxuXG52YXIgQ2xpZW50ID0gZnVuY3Rpb24gQ2xpZW50KCkge1xuICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG5cbiAgdGhpcy5fYm9hcmRFbGVtZW50ID0gb3B0aW9uc1tcImVsZW1lbnRcIl07XG4gIHRoaXMuX3NldHVwKG9wdGlvbnMpO1xufTtcblxuQ2xpZW50LnByb3RvdHlwZSA9IHtcbiAgX3NldHVwOiBmdW5jdGlvbiBfc2V0dXAoX3JlZikge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB2YXIgcGxheWVyID0gX3JlZi5wbGF5ZXIsXG4gICAgICAgIGdhbWVPcHRpb25zID0gX3JlZi5nYW1lT3B0aW9ucyxcbiAgICAgICAgaG9va3MgPSBfcmVmLmhvb2tzO1xuXG4gICAgdGhpcy5fcGxheWVyID0gcGxheWVyO1xuICAgIHRoaXMuX2hvb2tzID0gaG9va3M7XG5cbiAgICBpZiAodGhpcy5fcGxheWVyICE9PSBcImJsYWNrXCIgJiYgdGhpcy5fcGxheWVyICE9PSBcIndoaXRlXCIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsYXllciBtdXN0IGJlIGVpdGhlciBibGFjayBvciB3aGl0ZSwgYnV0IHdhcyBnaXZlbjogXCIgKyB0aGlzLl9wbGF5ZXIpO1xuICAgIH1cblxuICAgIGdhbWVPcHRpb25zW1wiX2hvb2tzXCJdID0ge1xuICAgICAgaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uIGhhbmRsZUNsaWNrKHksIHgpIHtcbiAgICAgICAgaWYgKF90aGlzLl9idXN5KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMuX2J1c3kgPSB0cnVlO1xuXG4gICAgICAgIGlmIChfdGhpcy5pc092ZXIoKSkge1xuICAgICAgICAgIHZhciBzdG9uZXNUb0JlTWFya2VkRGVhZCA9IF90aGlzLl9nYW1lLmN1cnJlbnRTdGF0ZSgpLmdyb3VwQXQoeSwgeCkubWFwKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICB5OiBpLnksXG4gICAgICAgICAgICAgIHg6IGkueCxcbiAgICAgICAgICAgICAgY29sb3I6IGkuY29sb3JcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBfdGhpcy5faG9va3Muc3VibWl0TWFya0RlYWRBdCh5LCB4LCBzdG9uZXNUb0JlTWFya2VkRGVhZCwgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICBfdGhpcy5fZ2FtZS50b2dnbGVEZWFkQXQoeSwgeCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF90aGlzLl9idXN5ID0gZmFsc2U7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLl9wbGF5ZXIgIT09IF90aGlzLmN1cnJlbnRQbGF5ZXIoKSB8fCBfdGhpcy5fZ2FtZS5pc0lsbGVnYWxBdCh5LCB4KSkge1xuICAgICAgICAgICAgX3RoaXMuX2J1c3kgPSBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIF90aGlzLl9ob29rcy5zdWJtaXRQbGF5KHksIHgsIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgX3RoaXMuX2dhbWUucGxheUF0KHksIHgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfdGhpcy5fYnVzeSA9IGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBob3ZlclZhbHVlOiBmdW5jdGlvbiBob3ZlclZhbHVlKHksIHgpIHtcbiAgICAgICAgaWYgKCFfdGhpcy5fYnVzeSAmJiBfdGhpcy5fcGxheWVyID09PSBfdGhpcy5jdXJyZW50UGxheWVyKCkgJiYgIV90aGlzLmlzT3ZlcigpICYmICFfdGhpcy5fZ2FtZS5pc0lsbGVnYWxBdCh5LCB4KSkge1xuICAgICAgICAgIHJldHVybiBfdGhpcy5fcGxheWVyO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBnYW1lSXNPdmVyOiBmdW5jdGlvbiBnYW1lSXNPdmVyKCkge1xuICAgICAgICByZXR1cm4gX3RoaXMuaXNPdmVyKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICh0aGlzLl9ib2FyZEVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX2dhbWUgPSBuZXcgX2dhbWUyLmRlZmF1bHQoT2JqZWN0LmFzc2lnbih7IGVsZW1lbnQ6IHRoaXMuX2JvYXJkRWxlbWVudCB9LCBnYW1lT3B0aW9ucykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9nYW1lID0gbmV3IChGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5hcHBseShfZ2FtZTIuZGVmYXVsdCwgW251bGxdLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkoZ2FtZU9wdGlvbnMpKSkpKCk7XG4gICAgfVxuICB9LFxuXG4gIGlzT3ZlcjogZnVuY3Rpb24gaXNPdmVyKCkge1xuICAgIHJldHVybiB0aGlzLl9nYW1lLmlzT3ZlcigpO1xuICB9LFxuXG4gIGN1cnJlbnRQbGF5ZXI6IGZ1bmN0aW9uIGN1cnJlbnRQbGF5ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dhbWUuY3VycmVudFBsYXllcigpO1xuICB9LFxuXG4gIHJlY2VpdmVQbGF5OiBmdW5jdGlvbiByZWNlaXZlUGxheSh5LCB4KSB7XG4gICAgaWYgKHRoaXMuX3BsYXllciA9PT0gdGhpcy5jdXJyZW50UGxheWVyKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9nYW1lLnBsYXlBdCh5LCB4KTtcbiAgfSxcblxuICBtb3ZlTnVtYmVyOiBmdW5jdGlvbiBtb3ZlTnVtYmVyKCkge1xuICAgIHJldHVybiB0aGlzLl9nYW1lLm1vdmVOdW1iZXIoKTtcbiAgfSxcblxuICByZWNlaXZlUGFzczogZnVuY3Rpb24gcmVjZWl2ZVBhc3MoKSB7XG4gICAgaWYgKHRoaXMuX3BsYXllciA9PT0gdGhpcy5jdXJyZW50UGxheWVyKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9nYW1lLnBhc3MoKTtcbiAgfSxcblxuICByZWNlaXZlTWFya0RlYWRBdDogZnVuY3Rpb24gcmVjZWl2ZU1hcmtEZWFkQXQoeSwgeCkge1xuICAgIHRoaXMuX2dhbWUudG9nZ2xlRGVhZEF0KHksIHgpO1xuICB9LFxuXG4gIGRlYWRTdG9uZXM6IGZ1bmN0aW9uIGRlYWRTdG9uZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dhbWUuZGVhZFN0b25lcygpO1xuICB9LFxuXG4gIHNldERlYWRTdG9uZXM6IGZ1bmN0aW9uIHNldERlYWRTdG9uZXMocG9pbnRzKSB7XG4gICAgdGhpcy5fZ2FtZS5fZGVhZFBvaW50cyA9IHBvaW50cy5tYXAoZnVuY3Rpb24gKGkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHk6IGkueSxcbiAgICAgICAgeDogaS54XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgdGhpcy5fZ2FtZS5yZW5kZXIoKTtcbiAgfSxcblxuICBwYXNzOiBmdW5jdGlvbiBwYXNzKCkge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgaWYgKHRoaXMuX2J1c3kgfHwgdGhpcy5fcGxheWVyICE9PSB0aGlzLmN1cnJlbnRQbGF5ZXIoKSB8fCB0aGlzLmlzT3ZlcigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fYnVzeSA9IHRydWU7XG5cbiAgICB0aGlzLl9ob29rcy5zdWJtaXRQYXNzKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgX3RoaXMyLl9nYW1lLnBhc3MoKTtcbiAgICAgIH1cblxuICAgICAgX3RoaXMyLl9idXN5ID0gZmFsc2U7XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IENsaWVudDtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2xpZW50LmpzLm1hcCJdfQ==
},{"./game":6}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _renderer = require("./renderer");

var _renderer2 = _interopRequireDefault(_renderer);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var DOMRenderer = function DOMRenderer(boardElement, _ref) {
  var hooks = _ref.hooks,
      options = _ref.options;

  _renderer2.default.call(this, boardElement, { hooks: hooks, options: options });

  if (this.smallerStones) {
    _utils2.default.addClass(boardElement, "tenuki-smaller-stones");
  }

  _utils2.default.addClass(boardElement, "tenuki-dom-renderer");
};

DOMRenderer.prototype = Object.create(_renderer2.default.prototype);
DOMRenderer.prototype.constructor = DOMRenderer;

DOMRenderer.prototype._setup = function (boardState) {
  _renderer2.default.prototype._setup.call(this, boardState);

  this.BOARD_LENGTH += 1;
  this.computeSizing();
};

DOMRenderer.prototype.generateBoard = function (boardState) {
  var _this = this;

  var contentsContainer = _utils2.default.createElement("div");

  _utils2.default.appendElement(contentsContainer, _utils2.default.createElement("div", { class: "lines horizontal" }));
  _utils2.default.appendElement(contentsContainer, _utils2.default.createElement("div", { class: "lines vertical" }));
  _utils2.default.appendElement(contentsContainer, _utils2.default.createElement("div", { class: "hoshi-points" }));
  _utils2.default.appendElement(contentsContainer, _utils2.default.createElement("div", { class: "intersections" }));

  _renderer2.default.hoshiPositionsFor(boardState.boardSize).forEach(function (h) {
    var hoshi = _utils2.default.createElement("div", { class: "hoshi" });
    hoshi.style.left = h.left * (_this.INTERSECTION_GAP_SIZE + 1) + "px";
    hoshi.style.top = h.top * (_this.INTERSECTION_GAP_SIZE + 1) + "px";

    _utils2.default.appendElement(contentsContainer.querySelector(".hoshi-points"), hoshi);
  });

  for (var y = 0; y < boardState.boardSize; y++) {
    var horizontalLine = _utils2.default.createElement("div", { class: "line horizontal" });
    horizontalLine.setAttribute("data-left-gutter", boardState.yCoordinateFor(y));
    _utils2.default.appendElement(contentsContainer.querySelector(".lines.horizontal"), horizontalLine);

    var verticalLine = _utils2.default.createElement("div", { class: "line vertical" });
    verticalLine.setAttribute("data-top-gutter", boardState.xCoordinateFor(y));
    _utils2.default.appendElement(contentsContainer.querySelector(".lines.vertical"), verticalLine);

    for (var x = 0; x < boardState.boardSize; x++) {
      var intersectionElement = _utils2.default.createElement("div", { class: "intersection empty" });
      var stoneElement = _utils2.default.createElement("div", { class: "stone" });
      _utils2.default.appendElement(intersectionElement, stoneElement);

      intersectionElement.setAttribute("data-position-x", x);
      intersectionElement.setAttribute("data-position-y", y);

      intersectionElement.style.left = x * (this.INTERSECTION_GAP_SIZE + 1) + "px";
      intersectionElement.style.top = y * (this.INTERSECTION_GAP_SIZE + 1) + "px";

      _utils2.default.appendElement(contentsContainer.querySelector(".intersections"), intersectionElement);

      this.grid[y] = this.grid[y] || [];
      this.grid[y][x] = intersectionElement;

      this.addIntersectionEventListeners(intersectionElement, y, x);
    }
  }

  // prevent the text-selection cursor
  _utils2.default.addEventListener(contentsContainer.querySelector(".lines.horizontal"), "mousedown", function (e) {
    e.preventDefault();
  });
  _utils2.default.addEventListener(contentsContainer.querySelector(".lines.vertical"), "mousedown", function (e) {
    e.preventDefault();
  });

  contentsContainer.querySelector(".lines.horizontal").style.width = this.INTERSECTION_GAP_SIZE * (boardState.boardSize - 1) + boardState.boardSize + "px";
  contentsContainer.querySelector(".lines.horizontal").style.height = this.INTERSECTION_GAP_SIZE * (boardState.boardSize - 1) + boardState.boardSize + "px";
  contentsContainer.querySelector(".lines.vertical").style.width = this.INTERSECTION_GAP_SIZE * (boardState.boardSize - 1) + boardState.boardSize + "px";
  contentsContainer.querySelector(".lines.vertical").style.height = this.INTERSECTION_GAP_SIZE * (boardState.boardSize - 1) + boardState.boardSize + "px";

  return contentsContainer;
};

DOMRenderer.prototype.setIntersectionClasses = function (intersectionEl, intersection, classes) {
  if (intersectionEl.className !== classes.join(" ")) {
    intersectionEl.className = classes.join(" ");
  }
};

exports.default = DOMRenderer;

//# sourceMappingURL=dom-renderer.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvbS1yZW5kZXJlci5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsIl91dGlscyIsInJlcXVpcmUiLCJfdXRpbHMyIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIl9yZW5kZXJlciIsIl9yZW5kZXJlcjIiLCJvYmoiLCJfX2VzTW9kdWxlIiwiZGVmYXVsdCIsIkRPTVJlbmRlcmVyIiwiYm9hcmRFbGVtZW50IiwiX3JlZiIsImhvb2tzIiwib3B0aW9ucyIsImNhbGwiLCJzbWFsbGVyU3RvbmVzIiwiYWRkQ2xhc3MiLCJwcm90b3R5cGUiLCJjcmVhdGUiLCJjb25zdHJ1Y3RvciIsIl9zZXR1cCIsImJvYXJkU3RhdGUiLCJCT0FSRF9MRU5HVEgiLCJjb21wdXRlU2l6aW5nIiwiZ2VuZXJhdGVCb2FyZCIsIl90aGlzIiwiY29udGVudHNDb250YWluZXIiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kRWxlbWVudCIsImNsYXNzIiwiaG9zaGlQb3NpdGlvbnNGb3IiLCJib2FyZFNpemUiLCJmb3JFYWNoIiwiaCIsImhvc2hpIiwic3R5bGUiLCJsZWZ0IiwiSU5URVJTRUNUSU9OX0dBUF9TSVpFIiwidG9wIiwicXVlcnlTZWxlY3RvciIsInkiLCJob3Jpem9udGFsTGluZSIsInNldEF0dHJpYnV0ZSIsInlDb29yZGluYXRlRm9yIiwidmVydGljYWxMaW5lIiwieENvb3JkaW5hdGVGb3IiLCJ4IiwiaW50ZXJzZWN0aW9uRWxlbWVudCIsInN0b25lRWxlbWVudCIsImdyaWQiLCJhZGRJbnRlcnNlY3Rpb25FdmVudExpc3RlbmVycyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJ3aWR0aCIsImhlaWdodCIsInNldEludGVyc2VjdGlvbkNsYXNzZXMiLCJpbnRlcnNlY3Rpb25FbCIsImludGVyc2VjdGlvbiIsImNsYXNzZXMiLCJjbGFzc05hbWUiLCJqb2luIl0sIm1hcHBpbmdzIjoi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QUFmLEtBQTZCRCxRQUFRRSxJQUFSLENBQWEsR0FBYixDQUFqQyxFQUFvRDtBQUNsREosbUJBQWVHLFNBQWYsR0FBMkJELFFBQVFFLElBQVIsQ0FBYSxHQUFiLENBQTNCO0FBQ0Q7QUFDRixDQUpEOztBQU1BL0QsUUFBUVUsT0FBUixHQUFrQkMsV0FBbEI7O0FBRUEiLCJmaWxlIjoiZG9tLXJlbmRlcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdXRpbHMgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcblxudmFyIF91dGlsczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlscyk7XG5cbnZhciBfcmVuZGVyZXIgPSByZXF1aXJlKFwiLi9yZW5kZXJlclwiKTtcblxudmFyIF9yZW5kZXJlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZW5kZXJlcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBET01SZW5kZXJlciA9IGZ1bmN0aW9uIERPTVJlbmRlcmVyKGJvYXJkRWxlbWVudCwgX3JlZikge1xuICB2YXIgaG9va3MgPSBfcmVmLmhvb2tzLFxuICAgICAgb3B0aW9ucyA9IF9yZWYub3B0aW9ucztcblxuICBfcmVuZGVyZXIyLmRlZmF1bHQuY2FsbCh0aGlzLCBib2FyZEVsZW1lbnQsIHsgaG9va3M6IGhvb2tzLCBvcHRpb25zOiBvcHRpb25zIH0pO1xuXG4gIGlmICh0aGlzLnNtYWxsZXJTdG9uZXMpIHtcbiAgICBfdXRpbHMyLmRlZmF1bHQuYWRkQ2xhc3MoYm9hcmRFbGVtZW50LCBcInRlbnVraS1zbWFsbGVyLXN0b25lc1wiKTtcbiAgfVxuXG4gIF91dGlsczIuZGVmYXVsdC5hZGRDbGFzcyhib2FyZEVsZW1lbnQsIFwidGVudWtpLWRvbS1yZW5kZXJlclwiKTtcbn07XG5cbkRPTVJlbmRlcmVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoX3JlbmRlcmVyMi5kZWZhdWx0LnByb3RvdHlwZSk7XG5ET01SZW5kZXJlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBET01SZW5kZXJlcjtcblxuRE9NUmVuZGVyZXIucHJvdG90eXBlLl9zZXR1cCA9IGZ1bmN0aW9uIChib2FyZFN0YXRlKSB7XG4gIF9yZW5kZXJlcjIuZGVmYXVsdC5wcm90b3R5cGUuX3NldHVwLmNhbGwodGhpcywgYm9hcmRTdGF0ZSk7XG5cbiAgdGhpcy5CT0FSRF9MRU5HVEggKz0gMTtcbiAgdGhpcy5jb21wdXRlU2l6aW5nKCk7XG59O1xuXG5ET01SZW5kZXJlci5wcm90b3R5cGUuZ2VuZXJhdGVCb2FyZCA9IGZ1bmN0aW9uIChib2FyZFN0YXRlKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgdmFyIGNvbnRlbnRzQ29udGFpbmVyID0gX3V0aWxzMi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoY29udGVudHNDb250YWluZXIsIF91dGlsczIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwibGluZXMgaG9yaXpvbnRhbFwiIH0pKTtcbiAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoY29udGVudHNDb250YWluZXIsIF91dGlsczIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwibGluZXMgdmVydGljYWxcIiB9KSk7XG4gIF91dGlsczIuZGVmYXVsdC5hcHBlbmRFbGVtZW50KGNvbnRlbnRzQ29udGFpbmVyLCBfdXRpbHMyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcImhvc2hpLXBvaW50c1wiIH0pKTtcbiAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoY29udGVudHNDb250YWluZXIsIF91dGlsczIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwiaW50ZXJzZWN0aW9uc1wiIH0pKTtcblxuICBfcmVuZGVyZXIyLmRlZmF1bHQuaG9zaGlQb3NpdGlvbnNGb3IoYm9hcmRTdGF0ZS5ib2FyZFNpemUpLmZvckVhY2goZnVuY3Rpb24gKGgpIHtcbiAgICB2YXIgaG9zaGkgPSBfdXRpbHMyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcImhvc2hpXCIgfSk7XG4gICAgaG9zaGkuc3R5bGUubGVmdCA9IGgubGVmdCAqIChfdGhpcy5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKSArIFwicHhcIjtcbiAgICBob3NoaS5zdHlsZS50b3AgPSBoLnRvcCAqIChfdGhpcy5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKSArIFwicHhcIjtcblxuICAgIF91dGlsczIuZGVmYXVsdC5hcHBlbmRFbGVtZW50KGNvbnRlbnRzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuaG9zaGktcG9pbnRzXCIpLCBob3NoaSk7XG4gIH0pO1xuXG4gIGZvciAodmFyIHkgPSAwOyB5IDwgYm9hcmRTdGF0ZS5ib2FyZFNpemU7IHkrKykge1xuICAgIHZhciBob3Jpem9udGFsTGluZSA9IF91dGlsczIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwibGluZSBob3Jpem9udGFsXCIgfSk7XG4gICAgaG9yaXpvbnRhbExpbmUuc2V0QXR0cmlidXRlKFwiZGF0YS1sZWZ0LWd1dHRlclwiLCBib2FyZFN0YXRlLnlDb29yZGluYXRlRm9yKHkpKTtcbiAgICBfdXRpbHMyLmRlZmF1bHQuYXBwZW5kRWxlbWVudChjb250ZW50c0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmxpbmVzLmhvcml6b250YWxcIiksIGhvcml6b250YWxMaW5lKTtcblxuICAgIHZhciB2ZXJ0aWNhbExpbmUgPSBfdXRpbHMyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcImxpbmUgdmVydGljYWxcIiB9KTtcbiAgICB2ZXJ0aWNhbExpbmUuc2V0QXR0cmlidXRlKFwiZGF0YS10b3AtZ3V0dGVyXCIsIGJvYXJkU3RhdGUueENvb3JkaW5hdGVGb3IoeSkpO1xuICAgIF91dGlsczIuZGVmYXVsdC5hcHBlbmRFbGVtZW50KGNvbnRlbnRzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIubGluZXMudmVydGljYWxcIiksIHZlcnRpY2FsTGluZSk7XG5cbiAgICBmb3IgKHZhciB4ID0gMDsgeCA8IGJvYXJkU3RhdGUuYm9hcmRTaXplOyB4KyspIHtcbiAgICAgIHZhciBpbnRlcnNlY3Rpb25FbGVtZW50ID0gX3V0aWxzMi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJpbnRlcnNlY3Rpb24gZW1wdHlcIiB9KTtcbiAgICAgIHZhciBzdG9uZUVsZW1lbnQgPSBfdXRpbHMyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcInN0b25lXCIgfSk7XG4gICAgICBfdXRpbHMyLmRlZmF1bHQuYXBwZW5kRWxlbWVudChpbnRlcnNlY3Rpb25FbGVtZW50LCBzdG9uZUVsZW1lbnQpO1xuXG4gICAgICBpbnRlcnNlY3Rpb25FbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtcG9zaXRpb24teFwiLCB4KTtcbiAgICAgIGludGVyc2VjdGlvbkVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1wb3NpdGlvbi15XCIsIHkpO1xuXG4gICAgICBpbnRlcnNlY3Rpb25FbGVtZW50LnN0eWxlLmxlZnQgPSB4ICogKHRoaXMuSU5URVJTRUNUSU9OX0dBUF9TSVpFICsgMSkgKyBcInB4XCI7XG4gICAgICBpbnRlcnNlY3Rpb25FbGVtZW50LnN0eWxlLnRvcCA9IHkgKiAodGhpcy5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKSArIFwicHhcIjtcblxuICAgICAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoY29udGVudHNDb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5pbnRlcnNlY3Rpb25zXCIpLCBpbnRlcnNlY3Rpb25FbGVtZW50KTtcblxuICAgICAgdGhpcy5ncmlkW3ldID0gdGhpcy5ncmlkW3ldIHx8IFtdO1xuICAgICAgdGhpcy5ncmlkW3ldW3hdID0gaW50ZXJzZWN0aW9uRWxlbWVudDtcblxuICAgICAgdGhpcy5hZGRJbnRlcnNlY3Rpb25FdmVudExpc3RlbmVycyhpbnRlcnNlY3Rpb25FbGVtZW50LCB5LCB4KTtcbiAgICB9XG4gIH1cblxuICAvLyBwcmV2ZW50IHRoZSB0ZXh0LXNlbGVjdGlvbiBjdXJzb3JcbiAgX3V0aWxzMi5kZWZhdWx0LmFkZEV2ZW50TGlzdGVuZXIoY29udGVudHNDb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5saW5lcy5ob3Jpem9udGFsXCIpLCBcIm1vdXNlZG93blwiLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfSk7XG4gIF91dGlsczIuZGVmYXVsdC5hZGRFdmVudExpc3RlbmVyKGNvbnRlbnRzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIubGluZXMudmVydGljYWxcIiksIFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9KTtcblxuICBjb250ZW50c0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmxpbmVzLmhvcml6b250YWxcIikuc3R5bGUud2lkdGggPSB0aGlzLklOVEVSU0VDVElPTl9HQVBfU0laRSAqIChib2FyZFN0YXRlLmJvYXJkU2l6ZSAtIDEpICsgYm9hcmRTdGF0ZS5ib2FyZFNpemUgKyBcInB4XCI7XG4gIGNvbnRlbnRzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIubGluZXMuaG9yaXpvbnRhbFwiKS5zdHlsZS5oZWlnaHQgPSB0aGlzLklOVEVSU0VDVElPTl9HQVBfU0laRSAqIChib2FyZFN0YXRlLmJvYXJkU2l6ZSAtIDEpICsgYm9hcmRTdGF0ZS5ib2FyZFNpemUgKyBcInB4XCI7XG4gIGNvbnRlbnRzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIubGluZXMudmVydGljYWxcIikuc3R5bGUud2lkdGggPSB0aGlzLklOVEVSU0VDVElPTl9HQVBfU0laRSAqIChib2FyZFN0YXRlLmJvYXJkU2l6ZSAtIDEpICsgYm9hcmRTdGF0ZS5ib2FyZFNpemUgKyBcInB4XCI7XG4gIGNvbnRlbnRzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIubGluZXMudmVydGljYWxcIikuc3R5bGUuaGVpZ2h0ID0gdGhpcy5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKiAoYm9hcmRTdGF0ZS5ib2FyZFNpemUgLSAxKSArIGJvYXJkU3RhdGUuYm9hcmRTaXplICsgXCJweFwiO1xuXG4gIHJldHVybiBjb250ZW50c0NvbnRhaW5lcjtcbn07XG5cbkRPTVJlbmRlcmVyLnByb3RvdHlwZS5zZXRJbnRlcnNlY3Rpb25DbGFzc2VzID0gZnVuY3Rpb24gKGludGVyc2VjdGlvbkVsLCBpbnRlcnNlY3Rpb24sIGNsYXNzZXMpIHtcbiAgaWYgKGludGVyc2VjdGlvbkVsLmNsYXNzTmFtZSAhPT0gY2xhc3Nlcy5qb2luKFwiIFwiKSkge1xuICAgIGludGVyc2VjdGlvbkVsLmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbihcIiBcIik7XG4gIH1cbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IERPTVJlbmRlcmVyO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kb20tcmVuZGVyZXIuanMubWFwIl19
},{"./renderer":10,"./utils":14}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var EyePoint = function EyePoint(boardState, intersection) {
  this.boardState = boardState;
  this.intersection = intersection;

  Object.freeze(this);
};

EyePoint.prototype = {
  diagonals: function diagonals() {
    var _this = this;

    var diagonals = [];

    var possibleX = [];
    var possibleY = [];

    if (this.intersection.x > 0) {
      possibleX.push(this.intersection.x - 1);
    }

    if (this.intersection.x < this.boardState.boardSize - 1) {
      possibleX.push(this.intersection.x + 1);
    }

    if (this.intersection.y > 0) {
      possibleY.push(this.intersection.y - 1);
    }

    if (this.intersection.y < this.boardState.boardSize - 1) {
      possibleY.push(this.intersection.y + 1);
    }

    possibleX.forEach(function (x) {
      possibleY.forEach(function (y) {
        diagonals.push(_this.boardState.intersectionAt(y, x));
      });
    });

    return diagonals;
  },

  isFalse: function isFalse() {
    if (!this.intersection.isEmpty()) {
      return false;
    }

    var diagonals = this.diagonals();
    var onFirstLine = diagonals.length <= 2;

    var neighbors = this.neighbors();
    var occupiedNeighbors = neighbors.filter(function (i) {
      return !i.isEmpty();
    });

    if (onFirstLine && occupiedNeighbors.length < 1) {
      return false;
    }

    if (!onFirstLine && occupiedNeighbors.length < 2) {
      return false;
    }

    var opposingOccupiedDiagonals = diagonals.filter(function (d) {
      return !d.isEmpty() && !d.sameColorAs(occupiedNeighbors[0]);
    });

    if (onFirstLine) {
      return opposingOccupiedDiagonals.length >= 1;
    } else {
      return opposingOccupiedDiagonals.length >= 2;
    }
  },

  neighbors: function neighbors() {
    return this.boardState.neighborsFor(this.intersection.y, this.intersection.x);
  },

  filledColor: function filledColor() {
    if (!this.isFalse()) {
      throw new Error("Attempting to find filled color for a non-false eye");
    }

    return this.neighbors()[0].value;
  }
};

exports.default = EyePoint;

//# sourceMappingURL=eye-point.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV5ZS1wb2ludC5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsIkV5ZVBvaW50IiwiYm9hcmRTdGF0ZSIsImludGVyc2VjdGlvbiIsImZyZWV6ZSIsInByb3RvdHlwZSIsImRpYWdvbmFscyIsIl90aGlzIiwicG9zc2libGVYIiwicG9zc2libGVZIiwieCIsInB1c2giLCJib2FyZFNpemUiLCJ5IiwiZm9yRWFjaCIsImludGVyc2VjdGlvbkF0IiwiaXNGYWxzZSIsImlzRW1wdHkiLCJvbkZpcnN0TGluZSIsImxlbmd0aCIsIm5laWdoYm9ycyIsIm9jY3VwaWVkTmVpZ2hib3JzIiwiZmlsdGVyIiwiaSIsIm9wcG9zaW5nT2NjdXBpZWREaWFnb25hbHMiLCJkIiwic2FtZUNvbG9yQXMiLCJuZWlnaGJvcnNGb3IiLCJmaWxsZWRDb2xvciIsIkVycm9yIiwiZGVmYXVsdCJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUFBLE9BQU9DLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDQyxTQUFPO0FBRG9DLENBQTdDO0FBR0EsSUFBSUMsV0FBVyxTQUFTQSxRQUFULENBQWtCQyxVQUFsQixFQUE4QkMsWUFBOUIsRUFBNEM7QUFDekQsT0FBS0QsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxPQUFLQyxZQUFMLEdBQW9CQSxZQUFwQjs7QUFFQU4sU0FBT08sTUFBUCxDQUFjLElBQWQ7QUFDRCxDQUxEOztBQU9BSCxTQUFTSSxTQUFULEdBQXFCO0FBQ25CQyxhQUFXLFNBQVNBLFNBQVQsR0FBcUI7QUFDOUIsUUFBSUMsUUFBUSxJQUFaOztBQUVBLFFBQUlELFlBQVksRUFBaEI7O0FBRUEsUUFBSUUsWUFBWSxFQUFoQjtBQUNBLFFBQUlDLFlBQVksRUFBaEI7O0FBRUEsUUFBSSxLQUFLTixZQUFMLENBQWtCTyxDQUFsQixHQUFzQixDQUExQixFQUE2QjtBQUMzQkYsZ0JBQVVHLElBQVYsQ0FBZSxLQUFLUixZQUFMLENBQWtCTyxDQUFsQixHQUFzQixDQUFyQztBQUNEOztBQUVELFFBQUksS0FBS1AsWUFBTCxDQUFrQk8sQ0FBbEIsR0FBc0IsS0FBS1IsVUFBTCxDQUFnQlUsU0FBaEIsR0FBNEIsQ0FBdEQsRUFBeUQ7QUFDdkRKLGdCQUFVRyxJQUFWLENBQWUsS0FBS1IsWUFBTCxDQUFrQk8sQ0FBbEIsR0FBc0IsQ0FBckM7QUFDRDs7QUFFRCxRQUFJLEtBQUtQLFlBQUwsQ0FBa0JVLENBQWxCLEdBQXNCLENBQTFCLEVBQTZCO0FBQzNCSixnQkFBVUUsSUFBVixDQUFlLEtBQUtSLFlBQUwsQ0FBa0JVLENBQWxCLEdBQXNCLENBQXJDO0FBQ0Q7O0FBRUQsUUFBSSxLQUFLVixZQUFMLENBQWtCVSxDQUFsQixHQUFzQixLQUFLWCxVQUFMLENBQWdCVSxTQUFoQixHQUE0QixDQUF0RCxFQUF5RDtBQUN2REgsZ0JBQVVFLElBQVYsQ0FBZSxLQUFLUixZQUFMLENBQWtCVSxDQUFsQixHQUFzQixDQUFyQztBQUNEOztBQUVETCxjQUFVTSxPQUFWLENBQWtCLFVBQVVKLENBQVYsRUFBYTtBQUM3QkQsZ0JBQVVLLE9BQVYsQ0FBa0IsVUFBVUQsQ0FBVixFQUFhO0FBQzdCUCxrQkFBVUssSUFBVixDQUFlSixNQUFNTCxVQUFOLENBQWlCYSxjQUFqQixDQUFnQ0YsQ0FBaEMsRUFBbUNILENBQW5DLENBQWY7QUFDRCxPQUZEO0FBR0QsS0FKRDs7QUFNQSxXQUFPSixTQUFQO0FBQ0QsR0FoQ2tCOztBQWtDbkJVLFdBQVMsU0FBU0EsT0FBVCxHQUFtQjtBQUMxQixRQUFJLENBQUMsS0FBS2IsWUFBTCxDQUFrQmMsT0FBbEIsRUFBTCxFQUFrQztBQUNoQyxhQUFPLEtBQVA7QUFDRDs7QUFFRCxRQUFJWCxZQUFZLEtBQUtBLFNBQUwsRUFBaEI7QUFDQSxRQUFJWSxjQUFjWixVQUFVYSxNQUFWLElBQW9CLENBQXRDOztBQUVBLFFBQUlDLFlBQVksS0FBS0EsU0FBTCxFQUFoQjtBQUNBLFFBQUlDLG9CQUFvQkQsVUFBVUUsTUFBVixDQUFpQixVQUFVQyxDQUFWLEVBQWE7QUFDcEQsYUFBTyxDQUFDQSxFQUFFTixPQUFGLEVBQVI7QUFDRCxLQUZ1QixDQUF4Qjs7QUFJQSxRQUFJQyxlQUFlRyxrQkFBa0JGLE1BQWxCLEdBQTJCLENBQTlDLEVBQWlEO0FBQy9DLGFBQU8sS0FBUDtBQUNEOztBQUVELFFBQUksQ0FBQ0QsV0FBRCxJQUFnQkcsa0JBQWtCRixNQUFsQixHQUEyQixDQUEvQyxFQUFrRDtBQUNoRCxhQUFPLEtBQVA7QUFDRDs7QUFFRCxRQUFJSyw0QkFBNEJsQixVQUFVZ0IsTUFBVixDQUFpQixVQUFVRyxDQUFWLEVBQWE7QUFDNUQsYUFBTyxDQUFDQSxFQUFFUixPQUFGLEVBQUQsSUFBZ0IsQ0FBQ1EsRUFBRUMsV0FBRixDQUFjTCxrQkFBa0IsQ0FBbEIsQ0FBZCxDQUF4QjtBQUNELEtBRitCLENBQWhDOztBQUlBLFFBQUlILFdBQUosRUFBaUI7QUFDZixhQUFPTSwwQkFBMEJMLE1BQTFCLElBQW9DLENBQTNDO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsYUFBT0ssMEJBQTBCTCxNQUExQixJQUFvQyxDQUEzQztBQUNEO0FBQ0YsR0FoRWtCOztBQWtFbkJDLGFBQVcsU0FBU0EsU0FBVCxHQUFxQjtBQUM5QixXQUFPLEtBQUtsQixVQUFMLENBQWdCeUIsWUFBaEIsQ0FBNkIsS0FBS3hCLFlBQUwsQ0FBa0JVLENBQS9DLEVBQWtELEtBQUtWLFlBQUwsQ0FBa0JPLENBQXBFLENBQVA7QUFDRCxHQXBFa0I7O0FBc0VuQmtCLGVBQWEsU0FBU0EsV0FBVCxHQUF1QjtBQUNsQyxRQUFJLENBQUMsS0FBS1osT0FBTCxFQUFMLEVBQXFCO0FBQ25CLFlBQU0sSUFBSWEsS0FBSixDQUFVLHFEQUFWLENBQU47QUFDRDs7QUFFRCxXQUFPLEtBQUtULFNBQUwsR0FBaUIsQ0FBakIsRUFBb0JwQixLQUEzQjtBQUNEO0FBNUVrQixDQUFyQjs7QUErRUFELFFBQVErQixPQUFSLEdBQWtCN0IsUUFBbEI7O0FBRUEiLCJmaWxlIjoiZXllLXBvaW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgRXllUG9pbnQgPSBmdW5jdGlvbiBFeWVQb2ludChib2FyZFN0YXRlLCBpbnRlcnNlY3Rpb24pIHtcbiAgdGhpcy5ib2FyZFN0YXRlID0gYm9hcmRTdGF0ZTtcbiAgdGhpcy5pbnRlcnNlY3Rpb24gPSBpbnRlcnNlY3Rpb247XG5cbiAgT2JqZWN0LmZyZWV6ZSh0aGlzKTtcbn07XG5cbkV5ZVBvaW50LnByb3RvdHlwZSA9IHtcbiAgZGlhZ29uYWxzOiBmdW5jdGlvbiBkaWFnb25hbHMoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciBkaWFnb25hbHMgPSBbXTtcblxuICAgIHZhciBwb3NzaWJsZVggPSBbXTtcbiAgICB2YXIgcG9zc2libGVZID0gW107XG5cbiAgICBpZiAodGhpcy5pbnRlcnNlY3Rpb24ueCA+IDApIHtcbiAgICAgIHBvc3NpYmxlWC5wdXNoKHRoaXMuaW50ZXJzZWN0aW9uLnggLSAxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pbnRlcnNlY3Rpb24ueCA8IHRoaXMuYm9hcmRTdGF0ZS5ib2FyZFNpemUgLSAxKSB7XG4gICAgICBwb3NzaWJsZVgucHVzaCh0aGlzLmludGVyc2VjdGlvbi54ICsgMSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaW50ZXJzZWN0aW9uLnkgPiAwKSB7XG4gICAgICBwb3NzaWJsZVkucHVzaCh0aGlzLmludGVyc2VjdGlvbi55IC0gMSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaW50ZXJzZWN0aW9uLnkgPCB0aGlzLmJvYXJkU3RhdGUuYm9hcmRTaXplIC0gMSkge1xuICAgICAgcG9zc2libGVZLnB1c2godGhpcy5pbnRlcnNlY3Rpb24ueSArIDEpO1xuICAgIH1cblxuICAgIHBvc3NpYmxlWC5mb3JFYWNoKGZ1bmN0aW9uICh4KSB7XG4gICAgICBwb3NzaWJsZVkuZm9yRWFjaChmdW5jdGlvbiAoeSkge1xuICAgICAgICBkaWFnb25hbHMucHVzaChfdGhpcy5ib2FyZFN0YXRlLmludGVyc2VjdGlvbkF0KHksIHgpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRpYWdvbmFscztcbiAgfSxcblxuICBpc0ZhbHNlOiBmdW5jdGlvbiBpc0ZhbHNlKCkge1xuICAgIGlmICghdGhpcy5pbnRlcnNlY3Rpb24uaXNFbXB0eSgpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGRpYWdvbmFscyA9IHRoaXMuZGlhZ29uYWxzKCk7XG4gICAgdmFyIG9uRmlyc3RMaW5lID0gZGlhZ29uYWxzLmxlbmd0aCA8PSAyO1xuXG4gICAgdmFyIG5laWdoYm9ycyA9IHRoaXMubmVpZ2hib3JzKCk7XG4gICAgdmFyIG9jY3VwaWVkTmVpZ2hib3JzID0gbmVpZ2hib3JzLmZpbHRlcihmdW5jdGlvbiAoaSkge1xuICAgICAgcmV0dXJuICFpLmlzRW1wdHkoKTtcbiAgICB9KTtcblxuICAgIGlmIChvbkZpcnN0TGluZSAmJiBvY2N1cGllZE5laWdoYm9ycy5sZW5ndGggPCAxKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCFvbkZpcnN0TGluZSAmJiBvY2N1cGllZE5laWdoYm9ycy5sZW5ndGggPCAyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIG9wcG9zaW5nT2NjdXBpZWREaWFnb25hbHMgPSBkaWFnb25hbHMuZmlsdGVyKGZ1bmN0aW9uIChkKSB7XG4gICAgICByZXR1cm4gIWQuaXNFbXB0eSgpICYmICFkLnNhbWVDb2xvckFzKG9jY3VwaWVkTmVpZ2hib3JzWzBdKTtcbiAgICB9KTtcblxuICAgIGlmIChvbkZpcnN0TGluZSkge1xuICAgICAgcmV0dXJuIG9wcG9zaW5nT2NjdXBpZWREaWFnb25hbHMubGVuZ3RoID49IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcHBvc2luZ09jY3VwaWVkRGlhZ29uYWxzLmxlbmd0aCA+PSAyO1xuICAgIH1cbiAgfSxcblxuICBuZWlnaGJvcnM6IGZ1bmN0aW9uIG5laWdoYm9ycygpIHtcbiAgICByZXR1cm4gdGhpcy5ib2FyZFN0YXRlLm5laWdoYm9yc0Zvcih0aGlzLmludGVyc2VjdGlvbi55LCB0aGlzLmludGVyc2VjdGlvbi54KTtcbiAgfSxcblxuICBmaWxsZWRDb2xvcjogZnVuY3Rpb24gZmlsbGVkQ29sb3IoKSB7XG4gICAgaWYgKCF0aGlzLmlzRmFsc2UoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXR0ZW1wdGluZyB0byBmaW5kIGZpbGxlZCBjb2xvciBmb3IgYSBub24tZmFsc2UgZXllXCIpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm5laWdoYm9ycygpWzBdLnZhbHVlO1xuICB9XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBFeWVQb2ludDtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXllLXBvaW50LmpzLm1hcCJdfQ==
},{}],6:[function(require,module,exports){
"use strict";

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _domRenderer = require("./dom-renderer");

var _domRenderer2 = _interopRequireDefault(_domRenderer);

var _svgRenderer = require("./svg-renderer");

var _svgRenderer2 = _interopRequireDefault(_svgRenderer);

var _nullRenderer = require("./null-renderer");

var _nullRenderer2 = _interopRequireDefault(_nullRenderer);

var _boardState = require("./board-state");

var _boardState2 = _interopRequireDefault(_boardState);

var _ruleset = require("./ruleset");

var _ruleset2 = _interopRequireDefault(_ruleset);

var _scorer = require("./scorer");

var _scorer2 = _interopRequireDefault(_scorer);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var VALID_GAME_OPTIONS = ["element", "boardSize", "scoring", "handicapStones", "koRule", "komi", "_hooks", "fuzzyStonePlacement", "renderer", "freeHandicapPlacement"];

var Game = function Game() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  this._validateOptions(options);

  this._defaultBoardSize = 19;
  this.boardSize = null;
  this._moves = [];
  this.callbacks = {
    postRender: function postRender() {}
  };
  this._boardElement = options["element"];
  this._defaultScoring = "territory";
  this._defaultKoRule = "simple";
  this._defaultRenderer = "svg";
  this._deadPoints = [];

  this._setup(options);
};

Game.prototype = {
  _validateOptions: function _validateOptions(options) {
    for (var key in options) {
      if (options.hasOwnProperty(key)) {
        if (VALID_GAME_OPTIONS.indexOf(key) < 0) {
          throw new Error("Unrecognized game option: " + key);
        }

        if (typeof options[key] === "undefined" || options[key] === null) {
          throw new Error("Game option " + key + " must not be set as null or undefined");
        }
      }
    }
  },

  _configureOptions: function _configureOptions() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$boardSize = _ref.boardSize,
        boardSize = _ref$boardSize === undefined ? this._defaultBoardSize : _ref$boardSize,
        _ref$komi = _ref.komi,
        komi = _ref$komi === undefined ? 0 : _ref$komi,
        _ref$handicapStones = _ref.handicapStones,
        handicapStones = _ref$handicapStones === undefined ? 0 : _ref$handicapStones,
        _ref$freeHandicapPlac = _ref.freeHandicapPlacement,
        freeHandicapPlacement = _ref$freeHandicapPlac === undefined ? false : _ref$freeHandicapPlac,
        _ref$scoring = _ref.scoring,
        scoring = _ref$scoring === undefined ? this._defaultScoring : _ref$scoring,
        _ref$koRule = _ref.koRule,
        koRule = _ref$koRule === undefined ? this._defaultKoRule : _ref$koRule,
        _ref$renderer = _ref.renderer,
        renderer = _ref$renderer === undefined ? this._defaultRenderer : _ref$renderer;

    if (typeof boardSize !== "number") {
      throw new Error("Board size must be a number, but was: " + (typeof boardSize === "undefined" ? "undefined" : _typeof(boardSize)));
    }

    if (typeof handicapStones !== "number") {
      throw new Error("Handicap stones must be a number, but was: " + (typeof boardSize === "undefined" ? "undefined" : _typeof(boardSize)));
    }

    if (handicapStones > 0 && boardSize !== 9 && boardSize !== 13 && boardSize !== 19) {
      throw new Error("Handicap stones not supported on sizes other than 9x9, 13x13 and 19x19");
    }

    if (handicapStones < 0 || handicapStones === 1 || handicapStones > 9) {
      throw new Error("Only 2 to 9 handicap stones are supported");
    }

    if (boardSize > 19) {
      throw new Error("cannot generate a board size greater than 19");
    }

    this.boardSize = boardSize;
    this.handicapStones = handicapStones;
    this._freeHandicapPlacement = freeHandicapPlacement;

    this._scorer = new _scorer2.default({
      scoreBy: scoring,
      komi: komi
    });

    this._rendererChoice = {
      "dom": _domRenderer2.default,
      "svg": _svgRenderer2.default
    }[renderer];

    if (!this._rendererChoice) {
      throw new Error("Unknown renderer: " + renderer);
    }

    this._ruleset = new _ruleset2.default({
      koRule: koRule
    });

    if (this._freeHandicapPlacement) {
      this._initialState = _boardState2.default._initialFor(boardSize, 0);
    } else {
      this._initialState = _boardState2.default._initialFor(boardSize, handicapStones);
    }
  },

  _stillPlayingHandicapStones: function _stillPlayingHandicapStones() {
    return this._freeHandicapPlacement && this.handicapStones > 0 && this._moves.length < this.handicapStones;
  },

  _setup: function _setup() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this._validateOptions(options);
    this._configureOptions(options);

    if (this._boardElement) {
      var defaultRendererHooks = {
        handleClick: function handleClick(y, x) {
          if (_this.isOver()) {
            _this.toggleDeadAt(y, x);
          } else {
            _this.playAt(y, x);
          }
        },

        hoverValue: function hoverValue(y, x) {
          if (!_this.isOver() && !_this.isIllegalAt(y, x)) {
            return _this.currentPlayer();
          }
        },

        gameIsOver: function gameIsOver() {
          return _this.isOver();
        }
      };

      this.renderer = new this._rendererChoice(this._boardElement, {
        hooks: options["_hooks"] || defaultRendererHooks,
        options: {
          fuzzyStonePlacement: options["fuzzyStonePlacement"]
        }
      });
    } else {
      this.renderer = new _nullRenderer2.default();
    }

    this.render();
  },

  intersectionAt: function intersectionAt(y, x) {
    return this.currentState().intersectionAt(y, x);
  },

  intersections: function intersections() {
    return this.currentState().intersections;
  },

  deadStones: function deadStones() {
    return this._deadPoints;
  },

  coordinatesFor: function coordinatesFor(y, x) {
    return this.currentState().xCoordinateFor(x) + this.currentState().yCoordinateFor(y);
  },

  currentPlayer: function currentPlayer() {
    if (this._stillPlayingHandicapStones()) {
      return "black";
    }

    return this.currentState().nextColor();
  },

  isWhitePlaying: function isWhitePlaying() {
    return this.currentPlayer() === "white";
  },

  isBlackPlaying: function isBlackPlaying() {
    return this.currentPlayer() === "black";
  },

  score: function score() {
    return this._scorer.score(this);
  },

  currentState: function currentState() {
    return this._moves[this._moves.length - 1] || this._initialState;
  },

  moveNumber: function moveNumber() {
    return this.currentState().moveNumber;
  },

  playAt: function playAt(y, x) {
    var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref2$render = _ref2.render,
        render = _ref2$render === undefined ? true : _ref2$render;

    if (this.isIllegalAt(y, x)) {
      return false;
    }

    var newState = this.currentState().playAt(y, x, this.currentPlayer());
    var _newState = newState,
        koPoint = _newState.koPoint;

    if (koPoint && !this._ruleset._isKoViolation(koPoint.y, koPoint.x, newState, this._moves.concat(newState))) {
      newState = newState.copyWithAttributes({ koPoint: null });
    }

    this._moves.push(newState);

    if (render) {
      this.render();
    }

    return true;
  },

  pass: function pass() {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref3$render = _ref3.render,
        render = _ref3$render === undefined ? true : _ref3$render;

    if (this.isOver()) {
      return false;
    }

    var newState = this.currentState().playPass(this.currentPlayer());
    this._moves.push(newState);

    if (render) {
      this.render();
    }

    return true;
  },

  isOver: function isOver() {
    if (this._moves.length < 2) {
      return false;
    }

    var finalMove = this._moves[this._moves.length - 1];
    var previousMove = this._moves[this._moves.length - 2];

    return finalMove.pass && previousMove.pass;
  },

  markDeadAt: function markDeadAt(y, x) {
    var _ref4 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref4$render = _ref4.render,
        render = _ref4$render === undefined ? true : _ref4$render;

    if (this._isDeadAt(y, x)) {
      return true;
    }

    return this._setDeadStatus(y, x, true, { render: render });
  },

  unmarkDeadAt: function unmarkDeadAt(y, x) {
    var _ref5 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref5$render = _ref5.render,
        render = _ref5$render === undefined ? true : _ref5$render;

    if (!this._isDeadAt(y, x)) {
      return true;
    }

    return this._setDeadStatus(y, x, false, { render: render });
  },

  toggleDeadAt: function toggleDeadAt(y, x) {
    var _ref6 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref6$render = _ref6.render,
        render = _ref6$render === undefined ? true : _ref6$render;

    return this._setDeadStatus(y, x, !this._isDeadAt(y, x), { render: render });
  },

  _setDeadStatus: function _setDeadStatus(y, x, markingDead) {
    var _this2 = this;

    var _ref7 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        _ref7$render = _ref7.render,
        render = _ref7$render === undefined ? true : _ref7$render;

    var selectedIntersection = this.intersectionAt(y, x);

    if (selectedIntersection.isEmpty()) {
      return;
    }

    var chosenDead = [];

    var _currentState$partiti = this.currentState().partitionTraverse(selectedIntersection, function (intersection) {
      return intersection.isEmpty() || intersection.sameColorAs(selectedIntersection);
    }),
        _currentState$partiti2 = _slicedToArray(_currentState$partiti, 1),
        candidates = _currentState$partiti2[0];

    candidates.forEach(function (sameColorOrEmpty) {
      if (!sameColorOrEmpty.isEmpty()) {
        chosenDead.push(sameColorOrEmpty);
      }
    });

    chosenDead.forEach(function (intersection) {
      if (markingDead) {
        _this2._deadPoints.push({ y: intersection.y, x: intersection.x });
      } else {
        _this2._deadPoints = _this2._deadPoints.filter(function (dead) {
          return !(dead.y === intersection.y && dead.x === intersection.x);
        });
      }
    });

    if (render) {
      this.render();
    }

    return true;
  },

  _isDeadAt: function _isDeadAt(y, x) {
    return this._deadPoints.some(function (dead) {
      return dead.y === y && dead.x === x;
    });
  },

  isIllegalAt: function isIllegalAt(y, x) {
    return this._ruleset.isIllegal(y, x, this);
  },

  territory: function territory() {
    if (!this.isOver()) {
      return {
        black: [],
        white: []
      };
    }

    return this._scorer.territory(this);
  },

  undo: function undo() {
    this._moves.pop();
    this.render();
  },

  render: function render() {
    if (!this.isOver()) {
      this._deadPoints = [];
    }

    this.renderer.render(this.currentState(), {
      territory: this.territory(),
      deadStones: this.deadStones()
    });

    this.callbacks.postRender(this);
  }
};

exports.default = Game;

//# sourceMappingURL=game.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdhbWUuanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJfc2xpY2VkVG9BcnJheSIsInNsaWNlSXRlcmF0b3IiLCJhcnIiLCJpIiwiX2FyciIsIl9uIiwiX2QiLCJfZSIsInVuZGVmaW5lZCIsIl9pIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJfcyIsIm5leHQiLCJkb25lIiwicHVzaCIsImxlbmd0aCIsImVyciIsIkFycmF5IiwiaXNBcnJheSIsIlR5cGVFcnJvciIsIl90eXBlb2YiLCJvYmoiLCJjb25zdHJ1Y3RvciIsInByb3RvdHlwZSIsIl9kb21SZW5kZXJlciIsInJlcXVpcmUiLCJfZG9tUmVuZGVyZXIyIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIl9zdmdSZW5kZXJlciIsIl9zdmdSZW5kZXJlcjIiLCJfbnVsbFJlbmRlcmVyIiwiX251bGxSZW5kZXJlcjIiLCJfYm9hcmRTdGF0ZSIsIl9ib2FyZFN0YXRlMiIsIl9ydWxlc2V0IiwiX3J1bGVzZXQyIiwiX3Njb3JlciIsIl9zY29yZXIyIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJWQUxJRF9HQU1FX09QVElPTlMiLCJHYW1lIiwib3B0aW9ucyIsImFyZ3VtZW50cyIsIl92YWxpZGF0ZU9wdGlvbnMiLCJfZGVmYXVsdEJvYXJkU2l6ZSIsImJvYXJkU2l6ZSIsIl9tb3ZlcyIsImNhbGxiYWNrcyIsInBvc3RSZW5kZXIiLCJfYm9hcmRFbGVtZW50IiwiX2RlZmF1bHRTY29yaW5nIiwiX2RlZmF1bHRLb1J1bGUiLCJfZGVmYXVsdFJlbmRlcmVyIiwiX2RlYWRQb2ludHMiLCJfc2V0dXAiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsImluZGV4T2YiLCJFcnJvciIsIl9jb25maWd1cmVPcHRpb25zIiwiX3JlZiIsIl9yZWYkYm9hcmRTaXplIiwiX3JlZiRrb21pIiwia29taSIsIl9yZWYkaGFuZGljYXBTdG9uZXMiLCJoYW5kaWNhcFN0b25lcyIsIl9yZWYkZnJlZUhhbmRpY2FwUGxhYyIsImZyZWVIYW5kaWNhcFBsYWNlbWVudCIsIl9yZWYkc2NvcmluZyIsInNjb3JpbmciLCJfcmVmJGtvUnVsZSIsImtvUnVsZSIsIl9yZWYkcmVuZGVyZXIiLCJyZW5kZXJlciIsIl9mcmVlSGFuZGljYXBQbGFjZW1lbnQiLCJzY29yZUJ5IiwiX3JlbmRlcmVyQ2hvaWNlIiwiX2luaXRpYWxTdGF0ZSIsIl9pbml0aWFsRm9yIiwiX3N0aWxsUGxheWluZ0hhbmRpY2FwU3RvbmVzIiwiX3RoaXMiLCJkZWZhdWx0UmVuZGVyZXJIb29rcyIsImhhbmRsZUNsaWNrIiwieSIsIngiLCJpc092ZXIiLCJ0b2dnbGVEZWFkQXQiLCJwbGF5QXQiLCJob3ZlclZhbHVlIiwiaXNJbGxlZ2FsQXQiLCJjdXJyZW50UGxheWVyIiwiZ2FtZUlzT3ZlciIsImhvb2tzIiwiZnV6enlTdG9uZVBsYWNlbWVudCIsInJlbmRlciIsImludGVyc2VjdGlvbkF0IiwiY3VycmVudFN0YXRlIiwiaW50ZXJzZWN0aW9ucyIsImRlYWRTdG9uZXMiLCJjb29yZGluYXRlc0ZvciIsInhDb29yZGluYXRlRm9yIiwieUNvb3JkaW5hdGVGb3IiLCJuZXh0Q29sb3IiLCJpc1doaXRlUGxheWluZyIsImlzQmxhY2tQbGF5aW5nIiwic2NvcmUiLCJtb3ZlTnVtYmVyIiwiX3JlZjIiLCJfcmVmMiRyZW5kZXIiLCJuZXdTdGF0ZSIsIl9uZXdTdGF0ZSIsImtvUG9pbnQiLCJfaXNLb1Zpb2xhdGlvbiIsImNvbmNhdCIsImNvcHlXaXRoQXR0cmlidXRlcyIsInBhc3MiLCJfcmVmMyIsIl9yZWYzJHJlbmRlciIsInBsYXlQYXNzIiwiZmluYWxNb3ZlIiwicHJldmlvdXNNb3ZlIiwibWFya0RlYWRBdCIsIl9yZWY0IiwiX3JlZjQkcmVuZGVyIiwiX2lzRGVhZEF0IiwiX3NldERlYWRTdGF0dXMiLCJ1bm1hcmtEZWFkQXQiLCJfcmVmNSIsIl9yZWY1JHJlbmRlciIsIl9yZWY2IiwiX3JlZjYkcmVuZGVyIiwibWFya2luZ0RlYWQiLCJfdGhpczIiLCJfcmVmNyIsIl9yZWY3JHJlbmRlciIsInNlbGVjdGVkSW50ZXJzZWN0aW9uIiwiaXNFbXB0eSIsImNob3NlbkRlYWQiLCJfY3VycmVudFN0YXRlJHBhcnRpdGkiLCJwYXJ0aXRpb25UcmF2ZXJzZSIsImludGVyc2VjdGlvbiIsInNhbWVDb2xvckFzIiwiX2N1cnJlbnRTdGF0ZSRwYXJ0aXRpMiIsImNhbmRpZGF0ZXMiLCJmb3JFYWNoIiwic2FtZUNvbG9yT3JFbXB0eSIsImZpbHRlciIsImRlYWQiLCJzb21lIiwiaXNJbGxlZ2FsIiwidGVycml0b3J5IiwiYmxhY2siLCJ3aGl0ZSIsInVuZG8iLCJwb3AiXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FBRUFBLE9BQU9DLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDQyxTQUFPO0FBRG9DLENBQTdDOztBQUlBLElBQUlDLGlCQUFpQixZQUFZO0FBQUUsV0FBU0MsYUFBVCxDQUF1QkMsR0FBdkIsRUFBNEJDLENBQTVCLEVBQStCO0FBQUUsUUFBSUMsT0FBTyxFQUFYLENBQWUsSUFBSUMsS0FBSyxJQUFULENBQWUsSUFBSUMsS0FBSyxLQUFULENBQWdCLElBQUlDLEtBQUtDLFNBQVQsQ0FBb0IsSUFBSTtBQUFFLFdBQUssSUFBSUMsS0FBS1AsSUFBSVEsT0FBT0MsUUFBWCxHQUFULEVBQWlDQyxFQUF0QyxFQUEwQyxFQUFFUCxLQUFLLENBQUNPLEtBQUtILEdBQUdJLElBQUgsRUFBTixFQUFpQkMsSUFBeEIsQ0FBMUMsRUFBeUVULEtBQUssSUFBOUUsRUFBb0Y7QUFBRUQsYUFBS1csSUFBTCxDQUFVSCxHQUFHYixLQUFiLEVBQXFCLElBQUlJLEtBQUtDLEtBQUtZLE1BQUwsS0FBZ0JiLENBQXpCLEVBQTRCO0FBQVE7QUFBRSxLQUF2SixDQUF3SixPQUFPYyxHQUFQLEVBQVk7QUFBRVgsV0FBSyxJQUFMLENBQVdDLEtBQUtVLEdBQUw7QUFBVyxLQUE1TCxTQUFxTTtBQUFFLFVBQUk7QUFBRSxZQUFJLENB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O0FBRjRCLEtBQTFDOztBQUtBLFNBQUtuRCxTQUFMLENBQWVDLFVBQWYsQ0FBMEIsSUFBMUI7QUFDRDtBQXJWYyxDQUFqQjs7QUF3VkFwRCxRQUFRMEMsT0FBUixHQUFrQkUsSUFBbEI7O0FBRUEiLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH0gcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyByZXR1cm4gYXJyOyB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkgeyByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpOyB9IGVsc2UgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTsgfSB9OyB9KCk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIF9kb21SZW5kZXJlciA9IHJlcXVpcmUoXCIuL2RvbS1yZW5kZXJlclwiKTtcblxudmFyIF9kb21SZW5kZXJlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kb21SZW5kZXJlcik7XG5cbnZhciBfc3ZnUmVuZGVyZXIgPSByZXF1aXJlKFwiLi9zdmctcmVuZGVyZXJcIik7XG5cbnZhciBfc3ZnUmVuZGVyZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3ZnUmVuZGVyZXIpO1xuXG52YXIgX251bGxSZW5kZXJlciA9IHJlcXVpcmUoXCIuL251bGwtcmVuZGVyZXJcIik7XG5cbnZhciBfbnVsbFJlbmRlcmVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX251bGxSZW5kZXJlcik7XG5cbnZhciBfYm9hcmRTdGF0ZSA9IHJlcXVpcmUoXCIuL2JvYXJkLXN0YXRlXCIpO1xuXG52YXIgX2JvYXJkU3RhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYm9hcmRTdGF0ZSk7XG5cbnZhciBfcnVsZXNldCA9IHJlcXVpcmUoXCIuL3J1bGVzZXRcIik7XG5cbnZhciBfcnVsZXNldDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9ydWxlc2V0KTtcblxudmFyIF9zY29yZXIgPSByZXF1aXJlKFwiLi9zY29yZXJcIik7XG5cbnZhciBfc2NvcmVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Njb3Jlcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBWQUxJRF9HQU1FX09QVElPTlMgPSBbXCJlbGVtZW50XCIsIFwiYm9hcmRTaXplXCIsIFwic2NvcmluZ1wiLCBcImhhbmRpY2FwU3RvbmVzXCIsIFwia29SdWxlXCIsIFwia29taVwiLCBcIl9ob29rc1wiLCBcImZ1enp5U3RvbmVQbGFjZW1lbnRcIiwgXCJyZW5kZXJlclwiLCBcImZyZWVIYW5kaWNhcFBsYWNlbWVudFwiXTtcblxudmFyIEdhbWUgPSBmdW5jdGlvbiBHYW1lKCkge1xuICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG5cbiAgdGhpcy5fdmFsaWRhdGVPcHRpb25zKG9wdGlvbnMpO1xuXG4gIHRoaXMuX2RlZmF1bHRCb2FyZFNpemUgPSAxOTtcbiAgdGhpcy5ib2FyZFNpemUgPSBudWxsO1xuICB0aGlzLl9tb3ZlcyA9IFtdO1xuICB0aGlzLmNhbGxiYWNrcyA9IHtcbiAgICBwb3N0UmVuZGVyOiBmdW5jdGlvbiBwb3N0UmVuZGVyKCkge31cbiAgfTtcbiAgdGhpcy5fYm9hcmRFbGVtZW50ID0gb3B0aW9uc1tcImVsZW1lbnRcIl07XG4gIHRoaXMuX2RlZmF1bHRTY29yaW5nID0gXCJ0ZXJyaXRvcnlcIjtcbiAgdGhpcy5fZGVmYXVsdEtvUnVsZSA9IFwic2ltcGxlXCI7XG4gIHRoaXMuX2RlZmF1bHRSZW5kZXJlciA9IFwic3ZnXCI7XG4gIHRoaXMuX2RlYWRQb2ludHMgPSBbXTtcblxuICB0aGlzLl9zZXR1cChvcHRpb25zKTtcbn07XG5cbkdhbWUucHJvdG90eXBlID0ge1xuICBfdmFsaWRhdGVPcHRpb25zOiBmdW5jdGlvbiBfdmFsaWRhdGVPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gb3B0aW9ucykge1xuICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBpZiAoVkFMSURfR0FNRV9PUFRJT05TLmluZGV4T2Yoa2V5KSA8IDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnJlY29nbml6ZWQgZ2FtZSBvcHRpb246IFwiICsga2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9uc1trZXldID09PSBcInVuZGVmaW5lZFwiIHx8IG9wdGlvbnNba2V5XSA9PT0gbnVsbCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdhbWUgb3B0aW9uIFwiICsga2V5ICsgXCIgbXVzdCBub3QgYmUgc2V0IGFzIG51bGwgb3IgdW5kZWZpbmVkXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIF9jb25maWd1cmVPcHRpb25zOiBmdW5jdGlvbiBfY29uZmlndXJlT3B0aW9ucygpIHtcbiAgICB2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge30sXG4gICAgICAgIF9yZWYkYm9hcmRTaXplID0gX3JlZi5ib2FyZFNpemUsXG4gICAgICAgIGJvYXJkU2l6ZSA9IF9yZWYkYm9hcmRTaXplID09PSB1bmRlZmluZWQgPyB0aGlzLl9kZWZhdWx0Qm9hcmRTaXplIDogX3JlZiRib2FyZFNpemUsXG4gICAgICAgIF9yZWYka29taSA9IF9yZWYua29taSxcbiAgICAgICAga29taSA9IF9yZWYka29taSA9PT0gdW5kZWZpbmVkID8gMCA6IF9yZWYka29taSxcbiAgICAgICAgX3JlZiRoYW5kaWNhcFN0b25lcyA9IF9yZWYuaGFuZGljYXBTdG9uZXMsXG4gICAgICAgIGhhbmRpY2FwU3RvbmVzID0gX3JlZiRoYW5kaWNhcFN0b25lcyA9PT0gdW5kZWZpbmVkID8gMCA6IF9yZWYkaGFuZGljYXBTdG9uZXMsXG4gICAgICAgIF9yZWYkZnJlZUhhbmRpY2FwUGxhYyA9IF9yZWYuZnJlZUhhbmRpY2FwUGxhY2VtZW50LFxuICAgICAgICBmcmVlSGFuZGljYXBQbGFjZW1lbnQgPSBfcmVmJGZyZWVIYW5kaWNhcFBsYWMgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogX3JlZiRmcmVlSGFuZGljYXBQbGFjLFxuICAgICAgICBfcmVmJHNjb3JpbmcgPSBfcmVmLnNjb3JpbmcsXG4gICAgICAgIHNjb3JpbmcgPSBfcmVmJHNjb3JpbmcgPT09IHVuZGVmaW5lZCA/IHRoaXMuX2RlZmF1bHRTY29yaW5nIDogX3JlZiRzY29yaW5nLFxuICAgICAgICBfcmVmJGtvUnVsZSA9IF9yZWYua29SdWxlLFxuICAgICAgICBrb1J1bGUgPSBfcmVmJGtvUnVsZSA9PT0gdW5kZWZpbmVkID8gdGhpcy5fZGVmYXVsdEtvUnVsZSA6IF9yZWYka29SdWxlLFxuICAgICAgICBfcmVmJHJlbmRlcmVyID0gX3JlZi5yZW5kZXJlcixcbiAgICAgICAgcmVuZGVyZXIgPSBfcmVmJHJlbmRlcmVyID09PSB1bmRlZmluZWQgPyB0aGlzLl9kZWZhdWx0UmVuZGVyZXIgOiBfcmVmJHJlbmRlcmVyO1xuXG4gICAgaWYgKHR5cGVvZiBib2FyZFNpemUgIT09IFwibnVtYmVyXCIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkJvYXJkIHNpemUgbXVzdCBiZSBhIG51bWJlciwgYnV0IHdhczogXCIgKyAodHlwZW9mIGJvYXJkU2l6ZSA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGJvYXJkU2l6ZSkpKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGhhbmRpY2FwU3RvbmVzICE9PSBcIm51bWJlclwiKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJIYW5kaWNhcCBzdG9uZXMgbXVzdCBiZSBhIG51bWJlciwgYnV0IHdhczogXCIgKyAodHlwZW9mIGJvYXJkU2l6ZSA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGJvYXJkU2l6ZSkpKTtcbiAgICB9XG5cbiAgICBpZiAoaGFuZGljYXBTdG9uZXMgPiAwICYmIGJvYXJkU2l6ZSAhPT0gOSAmJiBib2FyZFNpemUgIT09IDEzICYmIGJvYXJkU2l6ZSAhPT0gMTkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkhhbmRpY2FwIHN0b25lcyBub3Qgc3VwcG9ydGVkIG9uIHNpemVzIG90aGVyIHRoYW4gOXg5LCAxM3gxMyBhbmQgMTl4MTlcIik7XG4gICAgfVxuXG4gICAgaWYgKGhhbmRpY2FwU3RvbmVzIDwgMCB8fCBoYW5kaWNhcFN0b25lcyA9PT0gMSB8fCBoYW5kaWNhcFN0b25lcyA+IDkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk9ubHkgMiB0byA5IGhhbmRpY2FwIHN0b25lcyBhcmUgc3VwcG9ydGVkXCIpO1xuICAgIH1cblxuICAgIGlmIChib2FyZFNpemUgPiAxOSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2Fubm90IGdlbmVyYXRlIGEgYm9hcmQgc2l6ZSBncmVhdGVyIHRoYW4gMTlcIik7XG4gICAgfVxuXG4gICAgdGhpcy5ib2FyZFNpemUgPSBib2FyZFNpemU7XG4gICAgdGhpcy5oYW5kaWNhcFN0b25lcyA9IGhhbmRpY2FwU3RvbmVzO1xuICAgIHRoaXMuX2ZyZWVIYW5kaWNhcFBsYWNlbWVudCA9IGZyZWVIYW5kaWNhcFBsYWNlbWVudDtcblxuICAgIHRoaXMuX3Njb3JlciA9IG5ldyBfc2NvcmVyMi5kZWZhdWx0KHtcbiAgICAgIHNjb3JlQnk6IHNjb3JpbmcsXG4gICAgICBrb21pOiBrb21pXG4gICAgfSk7XG5cbiAgICB0aGlzLl9yZW5kZXJlckNob2ljZSA9IHtcbiAgICAgIFwiZG9tXCI6IF9kb21SZW5kZXJlcjIuZGVmYXVsdCxcbiAgICAgIFwic3ZnXCI6IF9zdmdSZW5kZXJlcjIuZGVmYXVsdFxuICAgIH1bcmVuZGVyZXJdO1xuXG4gICAgaWYgKCF0aGlzLl9yZW5kZXJlckNob2ljZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biByZW5kZXJlcjogXCIgKyByZW5kZXJlcik7XG4gICAgfVxuXG4gICAgdGhpcy5fcnVsZXNldCA9IG5ldyBfcnVsZXNldDIuZGVmYXVsdCh7XG4gICAgICBrb1J1bGU6IGtvUnVsZVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuX2ZyZWVIYW5kaWNhcFBsYWNlbWVudCkge1xuICAgICAgdGhpcy5faW5pdGlhbFN0YXRlID0gX2JvYXJkU3RhdGUyLmRlZmF1bHQuX2luaXRpYWxGb3IoYm9hcmRTaXplLCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faW5pdGlhbFN0YXRlID0gX2JvYXJkU3RhdGUyLmRlZmF1bHQuX2luaXRpYWxGb3IoYm9hcmRTaXplLCBoYW5kaWNhcFN0b25lcyk7XG4gICAgfVxuICB9LFxuXG4gIF9zdGlsbFBsYXlpbmdIYW5kaWNhcFN0b25lczogZnVuY3Rpb24gX3N0aWxsUGxheWluZ0hhbmRpY2FwU3RvbmVzKCkge1xuICAgIHJldHVybiB0aGlzLl9mcmVlSGFuZGljYXBQbGFjZW1lbnQgJiYgdGhpcy5oYW5kaWNhcFN0b25lcyA+IDAgJiYgdGhpcy5fbW92ZXMubGVuZ3RoIDwgdGhpcy5oYW5kaWNhcFN0b25lcztcbiAgfSxcblxuICBfc2V0dXA6IGZ1bmN0aW9uIF9zZXR1cCgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuXG4gICAgdGhpcy5fdmFsaWRhdGVPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMuX2NvbmZpZ3VyZU9wdGlvbnMob3B0aW9ucyk7XG5cbiAgICBpZiAodGhpcy5fYm9hcmRFbGVtZW50KSB7XG4gICAgICB2YXIgZGVmYXVsdFJlbmRlcmVySG9va3MgPSB7XG4gICAgICAgIGhhbmRsZUNsaWNrOiBmdW5jdGlvbiBoYW5kbGVDbGljayh5LCB4KSB7XG4gICAgICAgICAgaWYgKF90aGlzLmlzT3ZlcigpKSB7XG4gICAgICAgICAgICBfdGhpcy50b2dnbGVEZWFkQXQoeSwgeCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLnBsYXlBdCh5LCB4KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaG92ZXJWYWx1ZTogZnVuY3Rpb24gaG92ZXJWYWx1ZSh5LCB4KSB7XG4gICAgICAgICAgaWYgKCFfdGhpcy5pc092ZXIoKSAmJiAhX3RoaXMuaXNJbGxlZ2FsQXQoeSwgeCkpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5jdXJyZW50UGxheWVyKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGdhbWVJc092ZXI6IGZ1bmN0aW9uIGdhbWVJc092ZXIoKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLmlzT3ZlcigpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IHRoaXMuX3JlbmRlcmVyQ2hvaWNlKHRoaXMuX2JvYXJkRWxlbWVudCwge1xuICAgICAgICBob29rczogb3B0aW9uc1tcIl9ob29rc1wiXSB8fCBkZWZhdWx0UmVuZGVyZXJIb29rcyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIGZ1enp5U3RvbmVQbGFjZW1lbnQ6IG9wdGlvbnNbXCJmdXp6eVN0b25lUGxhY2VtZW50XCJdXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IF9udWxsUmVuZGVyZXIyLmRlZmF1bHQoKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlcigpO1xuICB9LFxuXG4gIGludGVyc2VjdGlvbkF0OiBmdW5jdGlvbiBpbnRlcnNlY3Rpb25BdCh5LCB4KSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFN0YXRlKCkuaW50ZXJzZWN0aW9uQXQoeSwgeCk7XG4gIH0sXG5cbiAgaW50ZXJzZWN0aW9uczogZnVuY3Rpb24gaW50ZXJzZWN0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50U3RhdGUoKS5pbnRlcnNlY3Rpb25zO1xuICB9LFxuXG4gIGRlYWRTdG9uZXM6IGZ1bmN0aW9uIGRlYWRTdG9uZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlYWRQb2ludHM7XG4gIH0sXG5cbiAgY29vcmRpbmF0ZXNGb3I6IGZ1bmN0aW9uIGNvb3JkaW5hdGVzRm9yKHksIHgpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50U3RhdGUoKS54Q29vcmRpbmF0ZUZvcih4KSArIHRoaXMuY3VycmVudFN0YXRlKCkueUNvb3JkaW5hdGVGb3IoeSk7XG4gIH0sXG5cbiAgY3VycmVudFBsYXllcjogZnVuY3Rpb24gY3VycmVudFBsYXllcigpIHtcbiAgICBpZiAodGhpcy5fc3RpbGxQbGF5aW5nSGFuZGljYXBTdG9uZXMoKSkge1xuICAgICAgcmV0dXJuIFwiYmxhY2tcIjtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jdXJyZW50U3RhdGUoKS5uZXh0Q29sb3IoKTtcbiAgfSxcblxuICBpc1doaXRlUGxheWluZzogZnVuY3Rpb24gaXNXaGl0ZVBsYXlpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFBsYXllcigpID09PSBcIndoaXRlXCI7XG4gIH0sXG5cbiAgaXNCbGFja1BsYXlpbmc6IGZ1bmN0aW9uIGlzQmxhY2tQbGF5aW5nKCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRQbGF5ZXIoKSA9PT0gXCJibGFja1wiO1xuICB9LFxuXG4gIHNjb3JlOiBmdW5jdGlvbiBzY29yZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2NvcmVyLnNjb3JlKHRoaXMpO1xuICB9LFxuXG4gIGN1cnJlbnRTdGF0ZTogZnVuY3Rpb24gY3VycmVudFN0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLl9tb3Zlc1t0aGlzLl9tb3Zlcy5sZW5ndGggLSAxXSB8fCB0aGlzLl9pbml0aWFsU3RhdGU7XG4gIH0sXG5cbiAgbW92ZU51bWJlcjogZnVuY3Rpb24gbW92ZU51bWJlcigpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50U3RhdGUoKS5tb3ZlTnVtYmVyO1xuICB9LFxuXG4gIHBsYXlBdDogZnVuY3Rpb24gcGxheUF0KHksIHgpIHtcbiAgICB2YXIgX3JlZjIgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHt9LFxuICAgICAgICBfcmVmMiRyZW5kZXIgPSBfcmVmMi5yZW5kZXIsXG4gICAgICAgIHJlbmRlciA9IF9yZWYyJHJlbmRlciA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IF9yZWYyJHJlbmRlcjtcblxuICAgIGlmICh0aGlzLmlzSWxsZWdhbEF0KHksIHgpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIG5ld1N0YXRlID0gdGhpcy5jdXJyZW50U3RhdGUoKS5wbGF5QXQoeSwgeCwgdGhpcy5jdXJyZW50UGxheWVyKCkpO1xuICAgIHZhciBfbmV3U3RhdGUgPSBuZXdTdGF0ZSxcbiAgICAgICAga29Qb2ludCA9IF9uZXdTdGF0ZS5rb1BvaW50O1xuXG5cbiAgICBpZiAoa29Qb2ludCAmJiAhdGhpcy5fcnVsZXNldC5faXNLb1Zpb2xhdGlvbihrb1BvaW50LnksIGtvUG9pbnQueCwgbmV3U3RhdGUsIHRoaXMuX21vdmVzLmNvbmNhdChuZXdTdGF0ZSkpKSB7XG4gICAgICBuZXdTdGF0ZSA9IG5ld1N0YXRlLmNvcHlXaXRoQXR0cmlidXRlcyh7IGtvUG9pbnQ6IG51bGwgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5fbW92ZXMucHVzaChuZXdTdGF0ZSk7XG5cbiAgICBpZiAocmVuZGVyKSB7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuXG4gIHBhc3M6IGZ1bmN0aW9uIHBhc3MoKSB7XG4gICAgdmFyIF9yZWYzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fSxcbiAgICAgICAgX3JlZjMkcmVuZGVyID0gX3JlZjMucmVuZGVyLFxuICAgICAgICByZW5kZXIgPSBfcmVmMyRyZW5kZXIgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBfcmVmMyRyZW5kZXI7XG5cbiAgICBpZiAodGhpcy5pc092ZXIoKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBuZXdTdGF0ZSA9IHRoaXMuY3VycmVudFN0YXRlKCkucGxheVBhc3ModGhpcy5jdXJyZW50UGxheWVyKCkpO1xuICAgIHRoaXMuX21vdmVzLnB1c2gobmV3U3RhdGUpO1xuXG4gICAgaWYgKHJlbmRlcikge1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcblxuICBpc092ZXI6IGZ1bmN0aW9uIGlzT3ZlcigpIHtcbiAgICBpZiAodGhpcy5fbW92ZXMubGVuZ3RoIDwgMikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBmaW5hbE1vdmUgPSB0aGlzLl9tb3Zlc1t0aGlzLl9tb3Zlcy5sZW5ndGggLSAxXTtcbiAgICB2YXIgcHJldmlvdXNNb3ZlID0gdGhpcy5fbW92ZXNbdGhpcy5fbW92ZXMubGVuZ3RoIC0gMl07XG5cbiAgICByZXR1cm4gZmluYWxNb3ZlLnBhc3MgJiYgcHJldmlvdXNNb3ZlLnBhc3M7XG4gIH0sXG5cbiAgbWFya0RlYWRBdDogZnVuY3Rpb24gbWFya0RlYWRBdCh5LCB4KSB7XG4gICAgdmFyIF9yZWY0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiB7fSxcbiAgICAgICAgX3JlZjQkcmVuZGVyID0gX3JlZjQucmVuZGVyLFxuICAgICAgICByZW5kZXIgPSBfcmVmNCRyZW5kZXIgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBfcmVmNCRyZW5kZXI7XG5cbiAgICBpZiAodGhpcy5faXNEZWFkQXQoeSwgeCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9zZXREZWFkU3RhdHVzKHksIHgsIHRydWUsIHsgcmVuZGVyOiByZW5kZXIgfSk7XG4gIH0sXG5cbiAgdW5tYXJrRGVhZEF0OiBmdW5jdGlvbiB1bm1hcmtEZWFkQXQoeSwgeCkge1xuICAgIHZhciBfcmVmNSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDoge30sXG4gICAgICAgIF9yZWY1JHJlbmRlciA9IF9yZWY1LnJlbmRlcixcbiAgICAgICAgcmVuZGVyID0gX3JlZjUkcmVuZGVyID09PSB1bmRlZmluZWQgPyB0cnVlIDogX3JlZjUkcmVuZGVyO1xuXG4gICAgaWYgKCF0aGlzLl9pc0RlYWRBdCh5LCB4KSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3NldERlYWRTdGF0dXMoeSwgeCwgZmFsc2UsIHsgcmVuZGVyOiByZW5kZXIgfSk7XG4gIH0sXG5cbiAgdG9nZ2xlRGVhZEF0OiBmdW5jdGlvbiB0b2dnbGVEZWFkQXQoeSwgeCkge1xuICAgIHZhciBfcmVmNiA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDoge30sXG4gICAgICAgIF9yZWY2JHJlbmRlciA9IF9yZWY2LnJlbmRlcixcbiAgICAgICAgcmVuZGVyID0gX3JlZjYkcmVuZGVyID09PSB1bmRlZmluZWQgPyB0cnVlIDogX3JlZjYkcmVuZGVyO1xuXG4gICAgcmV0dXJuIHRoaXMuX3NldERlYWRTdGF0dXMoeSwgeCwgIXRoaXMuX2lzRGVhZEF0KHksIHgpLCB7IHJlbmRlcjogcmVuZGVyIH0pO1xuICB9LFxuXG4gIF9zZXREZWFkU3RhdHVzOiBmdW5jdGlvbiBfc2V0RGVhZFN0YXR1cyh5LCB4LCBtYXJraW5nRGVhZCkge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgdmFyIF9yZWY3ID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiB7fSxcbiAgICAgICAgX3JlZjckcmVuZGVyID0gX3JlZjcucmVuZGVyLFxuICAgICAgICByZW5kZXIgPSBfcmVmNyRyZW5kZXIgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBfcmVmNyRyZW5kZXI7XG5cbiAgICB2YXIgc2VsZWN0ZWRJbnRlcnNlY3Rpb24gPSB0aGlzLmludGVyc2VjdGlvbkF0KHksIHgpO1xuXG4gICAgaWYgKHNlbGVjdGVkSW50ZXJzZWN0aW9uLmlzRW1wdHkoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBjaG9zZW5EZWFkID0gW107XG5cbiAgICB2YXIgX2N1cnJlbnRTdGF0ZSRwYXJ0aXRpID0gdGhpcy5jdXJyZW50U3RhdGUoKS5wYXJ0aXRpb25UcmF2ZXJzZShzZWxlY3RlZEludGVyc2VjdGlvbiwgZnVuY3Rpb24gKGludGVyc2VjdGlvbikge1xuICAgICAgcmV0dXJuIGludGVyc2VjdGlvbi5pc0VtcHR5KCkgfHwgaW50ZXJzZWN0aW9uLnNhbWVDb2xvckFzKHNlbGVjdGVkSW50ZXJzZWN0aW9uKTtcbiAgICB9KSxcbiAgICAgICAgX2N1cnJlbnRTdGF0ZSRwYXJ0aXRpMiA9IF9zbGljZWRUb0FycmF5KF9jdXJyZW50U3RhdGUkcGFydGl0aSwgMSksXG4gICAgICAgIGNhbmRpZGF0ZXMgPSBfY3VycmVudFN0YXRlJHBhcnRpdGkyWzBdO1xuXG4gICAgY2FuZGlkYXRlcy5mb3JFYWNoKGZ1bmN0aW9uIChzYW1lQ29sb3JPckVtcHR5KSB7XG4gICAgICBpZiAoIXNhbWVDb2xvck9yRW1wdHkuaXNFbXB0eSgpKSB7XG4gICAgICAgIGNob3NlbkRlYWQucHVzaChzYW1lQ29sb3JPckVtcHR5KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNob3NlbkRlYWQuZm9yRWFjaChmdW5jdGlvbiAoaW50ZXJzZWN0aW9uKSB7XG4gICAgICBpZiAobWFya2luZ0RlYWQpIHtcbiAgICAgICAgX3RoaXMyLl9kZWFkUG9pbnRzLnB1c2goeyB5OiBpbnRlcnNlY3Rpb24ueSwgeDogaW50ZXJzZWN0aW9uLnggfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpczIuX2RlYWRQb2ludHMgPSBfdGhpczIuX2RlYWRQb2ludHMuZmlsdGVyKGZ1bmN0aW9uIChkZWFkKSB7XG4gICAgICAgICAgcmV0dXJuICEoZGVhZC55ID09PSBpbnRlcnNlY3Rpb24ueSAmJiBkZWFkLnggPT09IGludGVyc2VjdGlvbi54KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAocmVuZGVyKSB7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuXG4gIF9pc0RlYWRBdDogZnVuY3Rpb24gX2lzRGVhZEF0KHksIHgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGVhZFBvaW50cy5zb21lKGZ1bmN0aW9uIChkZWFkKSB7XG4gICAgICByZXR1cm4gZGVhZC55ID09PSB5ICYmIGRlYWQueCA9PT0geDtcbiAgICB9KTtcbiAgfSxcblxuICBpc0lsbGVnYWxBdDogZnVuY3Rpb24gaXNJbGxlZ2FsQXQoeSwgeCkge1xuICAgIHJldHVybiB0aGlzLl9ydWxlc2V0LmlzSWxsZWdhbCh5LCB4LCB0aGlzKTtcbiAgfSxcblxuICB0ZXJyaXRvcnk6IGZ1bmN0aW9uIHRlcnJpdG9yeSgpIHtcbiAgICBpZiAoIXRoaXMuaXNPdmVyKCkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGJsYWNrOiBbXSxcbiAgICAgICAgd2hpdGU6IFtdXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9zY29yZXIudGVycml0b3J5KHRoaXMpO1xuICB9LFxuXG4gIHVuZG86IGZ1bmN0aW9uIHVuZG8oKSB7XG4gICAgdGhpcy5fbW92ZXMucG9wKCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICBpZiAoIXRoaXMuaXNPdmVyKCkpIHtcbiAgICAgIHRoaXMuX2RlYWRQb2ludHMgPSBbXTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcih0aGlzLmN1cnJlbnRTdGF0ZSgpLCB7XG4gICAgICB0ZXJyaXRvcnk6IHRoaXMudGVycml0b3J5KCksXG4gICAgICBkZWFkU3RvbmVzOiB0aGlzLmRlYWRTdG9uZXMoKVxuICAgIH0pO1xuXG4gICAgdGhpcy5jYWxsYmFja3MucG9zdFJlbmRlcih0aGlzKTtcbiAgfVxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gR2FtZTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z2FtZS5qcy5tYXAiXX0=
},{"./board-state":2,"./dom-renderer":4,"./null-renderer":8,"./ruleset":11,"./scorer":12,"./svg-renderer":13}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Intersection = function Intersection(y, x, value) {
  this.y = y;
  this.x = x;
  this.value = value || "empty";

  Object.freeze(this);
};

Intersection.prototype = {
  isOccupiedWith: function isOccupiedWith(color) {
    if (this.isEmpty()) {
      return false;
    }

    return this.value === color;
  },

  isBlack: function isBlack() {
    return this.value === "black";
  },

  isWhite: function isWhite() {
    return this.value === "white";
  },

  isEmpty: function isEmpty() {
    return this.value === "empty";
  },

  sameColorAs: function sameColorAs(otherIntersection) {
    return this.value === otherIntersection.value;
  }
};

exports.default = Intersection;

//# sourceMappingURL=intersection.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVyc2VjdGlvbi5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsIkludGVyc2VjdGlvbiIsInkiLCJ4IiwiZnJlZXplIiwicHJvdG90eXBlIiwiaXNPY2N1cGllZFdpdGgiLCJjb2xvciIsImlzRW1wdHkiLCJpc0JsYWNrIiwiaXNXaGl0ZSIsInNhbWVDb2xvckFzIiwib3RoZXJJbnRlcnNlY3Rpb24iLCJkZWZhdWx0Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQUEsT0FBT0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLFNBQU87QUFEb0MsQ0FBN0M7QUFHQSxJQUFJQyxlQUFlLFNBQVNBLFlBQVQsQ0FBc0JDLENBQXRCLEVBQXlCQyxDQUF6QixFQUE0QkgsS0FBNUIsRUFBbUM7QUFDcEQsT0FBS0UsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsT0FBS0MsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsT0FBS0gsS0FBTCxHQUFhQSxTQUFTLE9BQXRCOztBQUVBSCxTQUFPTyxNQUFQLENBQWMsSUFBZDtBQUNELENBTkQ7O0FBUUFILGFBQWFJLFNBQWIsR0FBeUI7QUFDdkJDLGtCQUFnQixTQUFTQSxjQUFULENBQXdCQyxLQUF4QixFQUErQjtBQUM3QyxRQUFJLEtBQUtDLE9BQUwsRUFBSixFQUFvQjtBQUNsQixhQUFPLEtBQVA7QUFDRDs7QUFFRCxXQUFPLEtBQUtSLEtBQUwsS0FBZU8sS0FBdEI7QUFDRCxHQVBzQjs7QUFTdkJFLFdBQVMsU0FBU0EsT0FBVCxHQUFtQjtBQUMxQixXQUFPLEtBQUtULEtBQUwsS0FBZSxPQUF0QjtBQUNELEdBWHNCOztBQWF2QlUsV0FBUyxTQUFTQSxPQUFULEdBQW1CO0FBQzFCLFdBQU8sS0FBS1YsS0FBTCxLQUFlLE9BQXRCO0FBQ0QsR0Fmc0I7O0FBaUJ2QlEsV0FBUyxTQUFTQSxPQUFULEdBQW1CO0FBQzFCLFdBQU8sS0FBS1IsS0FBTCxLQUFlLE9BQXRCO0FBQ0QsR0FuQnNCOztBQXFCdkJXLGVBQWEsU0FBU0EsV0FBVCxDQUFxQkMsaUJBQXJCLEVBQXdDO0FBQ25ELFdBQU8sS0FBS1osS0FBTCxLQUFlWSxrQkFBa0JaLEtBQXhDO0FBQ0Q7QUF2QnNCLENBQXpCOztBQTBCQUQsUUFBUWMsT0FBUixHQUFrQlosWUFBbEI7O0FBRUEiLCJmaWxlIjoiaW50ZXJzZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgSW50ZXJzZWN0aW9uID0gZnVuY3Rpb24gSW50ZXJzZWN0aW9uKHksIHgsIHZhbHVlKSB7XG4gIHRoaXMueSA9IHk7XG4gIHRoaXMueCA9IHg7XG4gIHRoaXMudmFsdWUgPSB2YWx1ZSB8fCBcImVtcHR5XCI7XG5cbiAgT2JqZWN0LmZyZWV6ZSh0aGlzKTtcbn07XG5cbkludGVyc2VjdGlvbi5wcm90b3R5cGUgPSB7XG4gIGlzT2NjdXBpZWRXaXRoOiBmdW5jdGlvbiBpc09jY3VwaWVkV2l0aChjb2xvcikge1xuICAgIGlmICh0aGlzLmlzRW1wdHkoKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnZhbHVlID09PSBjb2xvcjtcbiAgfSxcblxuICBpc0JsYWNrOiBmdW5jdGlvbiBpc0JsYWNrKCkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlID09PSBcImJsYWNrXCI7XG4gIH0sXG5cbiAgaXNXaGl0ZTogZnVuY3Rpb24gaXNXaGl0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZSA9PT0gXCJ3aGl0ZVwiO1xuICB9LFxuXG4gIGlzRW1wdHk6IGZ1bmN0aW9uIGlzRW1wdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWUgPT09IFwiZW1wdHlcIjtcbiAgfSxcblxuICBzYW1lQ29sb3JBczogZnVuY3Rpb24gc2FtZUNvbG9yQXMob3RoZXJJbnRlcnNlY3Rpb24pIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZSA9PT0gb3RoZXJJbnRlcnNlY3Rpb24udmFsdWU7XG4gIH1cbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEludGVyc2VjdGlvbjtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW50ZXJzZWN0aW9uLmpzLm1hcCJdfQ==
},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NullRenderer;
function NullRenderer() {
  this.setup = function () {};
  this.render = function () {};
  this.renderTerritory = function () {};
}

//# sourceMappingURL=null-renderer.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm51bGwtcmVuZGVyZXIuanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJkZWZhdWx0IiwiTnVsbFJlbmRlcmVyIiwic2V0dXAiLCJyZW5kZXIiLCJyZW5kZXJUZXJyaXRvcnkiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBQSxPQUFPQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQ0MsU0FBTztBQURvQyxDQUE3QztBQUdBRCxRQUFRRSxPQUFSLEdBQWtCQyxZQUFsQjtBQUNBLFNBQVNBLFlBQVQsR0FBd0I7QUFDdEIsT0FBS0MsS0FBTCxHQUFhLFlBQVksQ0FBRSxDQUEzQjtBQUNBLE9BQUtDLE1BQUwsR0FBYyxZQUFZLENBQUUsQ0FBNUI7QUFDQSxPQUFLQyxlQUFMLEdBQXVCLFlBQVksQ0FBRSxDQUFyQztBQUNEOztBQUVEIiwiZmlsZSI6Im51bGwtcmVuZGVyZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IE51bGxSZW5kZXJlcjtcbmZ1bmN0aW9uIE51bGxSZW5kZXJlcigpIHtcbiAgdGhpcy5zZXR1cCA9IGZ1bmN0aW9uICgpIHt9O1xuICB0aGlzLnJlbmRlciA9IGZ1bmN0aW9uICgpIHt9O1xuICB0aGlzLnJlbmRlclRlcnJpdG9yeSA9IGZ1bmN0aW9uICgpIHt9O1xufVxuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1udWxsLXJlbmRlcmVyLmpzLm1hcCJdfQ==
},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Region = function Region(boardState, intersections) {
  this.boardState = boardState;
  this.intersections = intersections;

  this._computed = {};

  Object.freeze(this);
};

Region._startingAt = function (boardState, y, x) {
  var startingPoint = boardState.intersectionAt(y, x);

  var _boardState$partition = boardState.partitionTraverse(startingPoint, function (neighbor) {
    return neighbor.sameColorAs(startingPoint);
  }),
      _boardState$partition2 = _slicedToArray(_boardState$partition, 2),
      includedPoints = _boardState$partition2[0],
      boundaryPoints = _boardState$partition2[1];

  return [includedPoints, boundaryPoints];
};

Region.allFor = function (boardState) {
  var checkedPoints = [];
  var regions = [];

  boardState.intersections.forEach(function (point) {
    if (checkedPoints.indexOf(point) > -1) {
      // do nothing
    } else {
      var _boardState$partition3 = boardState.partitionTraverse(point, function (neighbor) {
        return neighbor.sameColorAs(point);
      }),
          _boardState$partition4 = _slicedToArray(_boardState$partition3, 2),
          regionPoints = _boardState$partition4[0],
          _ = _boardState$partition4[1];

      regions.push(new Region(boardState, regionPoints));
      checkedPoints = checkedPoints.concat(regionPoints);
    }
  });

  return regions;
};

Region.merge = function (regions, region) {
  var mergedRegions = [region];
  var length = -1;

  while (mergedRegions.length !== length) {
    length = mergedRegions.length;

    mergedRegions = regions.filter(function (r) {
      return r.isEmpty() && r.isTerritory() && r.territoryColor() === region.territoryColor() && r.expandedBoundaryStones().some(function (stone) {
        return mergedRegions.some(function (latestRegion) {
          return latestRegion.expandedBoundaryStones().indexOf(stone) > -1;
        });
      });
    });
  }

  return mergedRegions;
};

Region.prototype = {
  isEmpty: function isEmpty() {
    return this.intersections[0].isEmpty();
  },

  isTerritory: function isTerritory() {
    var point = this.intersections[0];

    if (!point.isEmpty()) {
      return false;
    }

    var _Region$_startingAt = Region._startingAt(this.boardState, point.y, point.x),
        _Region$_startingAt2 = _slicedToArray(_Region$_startingAt, 2),
        _ = _Region$_startingAt2[0],
        boundaryPoints = _Region$_startingAt2[1];

    var surroundingColors = _utils2.default.unique(boundaryPoints.map(function (i) {
      return i.value;
    }));
    var isTerritory = surroundingColors.length === 1 && surroundingColors[0] !== "empty";

    return isTerritory;
  },

  territoryColor: function territoryColor() {
    var point = this.intersections[0];

    var _Region$_startingAt3 = Region._startingAt(this.boardState, point.y, point.x),
        _Region$_startingAt4 = _slicedToArray(_Region$_startingAt3, 2),
        _ = _Region$_startingAt4[0],
        boundaryPoints = _Region$_startingAt4[1];

    var surroundingColors = _utils2.default.unique(boundaryPoints.map(function (i) {
      return i.value;
    }));
    var isTerritory = surroundingColors.length === 1 && surroundingColors[0] !== "empty";

    if (!point.isEmpty() || !isTerritory) {
      throw new Error("Attempted to obtain territory color for something that isn't territory, region containing " + point.y + "," + point.x);
    } else {
      return surroundingColors[0];
    }
  },

  isBlack: function isBlack() {
    return this.territoryColor() === "black";
  },

  isWhite: function isWhite() {
    return this.territoryColor() === "white";
  },

  isNeutral: function isNeutral() {
    return !this.intersections[0].isBlack() && !this.intersections[0].isWhite() && !this.isTerritory();
  },

  exterior: function exterior() {
    var _this = this;

    return this.boardState.intersections.filter(function (i) {
      return _this.intersections.indexOf(i) < 0 && _this.boardState.neighborsFor(i.y, i.x).some(function (neighbor) {
        return _this.intersections.indexOf(neighbor) > -1;
      });
    });
  },

  boundaryStones: function boundaryStones() {
    var _this2 = this;

    if (this._computed.boundaryStones) {
      return this._computed.boundaryStones;
    }

    if (!this.isEmpty()) {
      throw new Error("Attempted to obtain boundary stones for non-empty region");
    }

    this._computed.boundaryStones = this.exterior().filter(function (i) {
      return !i.sameColorAs(_this2.intersections[0]);
    });

    return this._computed.boundaryStones;
  },

  expandedBoundaryStones: function expandedBoundaryStones() {
    if (this._computed.expandedBoundaryStones) {
      return this._computed.expandedBoundaryStones;
    }

    var boundaryStones = this.boundaryStones();
    var regions = Region.allFor(this.boardState).filter(function (r) {
      return r.intersections.some(function (i) {
        return boundaryStones.indexOf(i) > -1;
      });
    });

    this._computed.expandedBoundaryStones = _utils2.default.flatMap(regions, function (r) {
      return r.intersections;
    });

    return this._computed.expandedBoundaryStones;
  },

  lengthOfTerritoryBoundary: function lengthOfTerritoryBoundary() {
    var _this3 = this;

    // count the empty border points to treat the edge of the board itself as points
    var borderPoints = this.intersections.filter(function (i) {
      return i.y === 0 || i.y === _this3.boardState.boardSize - 1 || i.x === 0 || i.x === _this3.boardState.boardSize - 1;
    });
    var cornerPoints = this.intersections.filter(function (i) {
      return i.y % _this3.boardState.boardSize - 1 === 0 && i.x % _this3.boardState.boardSize - 1 === 0;
    });

    return this.boundaryStones().length + borderPoints.length + cornerPoints.length;
  },

  containsSquareFour: function containsSquareFour() {
    var _this4 = this;

    return this.intersections.some(function (i) {
      return [[0, 0], [0, 1], [1, 0], [1, 1]].every(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            yOffset = _ref2[0],
            xOffset = _ref2[1];

        var y = i.y + yOffset;
        var x = i.x + xOffset;

        var onTheBoard = y >= 0 && y < _this4.boardState.boardSize && x >= 0 && x < _this4.boardState.boardSize;

        return onTheBoard && _this4.boardState.intersectionAt(y, x).sameColorAs(i);
      });
    });
  },

  containsCurvedFour: function containsCurvedFour() {
    var _this5 = this;

    return this.intersections.some(function (i) {
      return [[[0, 0], [1, 0], [2, 0], [2, 1]], [[-1, 2], [0, 0], [0, 1], [0, 2]], [[0, 0], [0, 1], [1, 1], [2, 1]], [[-1, 0], [-1, 1], [-1, 2], [0, 0]], [[-2, 1], [-1, 1], [0, 0], [0, 1]], [[0, 0], [1, 0], [1, 1], [1, 2]], [[0, -1], [0, 0], [1, -1], [2, -1]], [[-1, -2], [-1, -1], [-1, 0], [0, 0]]].some(function (expectedPoints) {
        return expectedPoints.every(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              yOffset = _ref4[0],
              xOffset = _ref4[1];

          var y = i.y + yOffset;
          var x = i.x + xOffset;

          var onTheBoard = y >= 0 && y < _this5.boardState.boardSize && x >= 0 && x < _this5.boardState.boardSize;

          return onTheBoard && _this5.boardState.intersectionAt(y, x).sameColorAs(i);
        });
      });
    });
  },

  numberOfEyes: function numberOfEyes() {
    if (!this.intersections[0].isEmpty()) {
      throw new Error("Unexpected calculation of number of eyes for a non-empty region containing " + this.intersections[0].y + "," + this.intersections[0].x);
    }

    var boundaryLength = this.lengthOfTerritoryBoundary();

    if (boundaryLength < 2) {
      throw new Error("Unexpected boundary length of " + boundaryLength + " for region including " + this.intersections[0].y + "," + this.intersections[0].x);
    }

    if (boundaryLength >= 10) {
      return 2;
    }

    var eyes = void 0;

    switch (boundaryLength) {
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        eyes = 1;
        break;
      case 7:
        eyes = 1.5;
        break;
      case 8:
        if (this.containsSquareFour()) {
          eyes = 1;
        } else if (this.containsCurvedFour()) {
          eyes = 2;
        } else {
          eyes = 1.5;
        }

        break;
      case 9:
        if (this.containsSquareFour()) {
          eyes = 1.5;
        } else {
          eyes = 2;
        }
        break;

      default:
        throw new Error("unhandled boundary length " + boundaryLength);
    }

    return eyes;
  }
};

exports.default = Region;

//# sourceMappingURL=region.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZ2lvbi5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsIl9zbGljZWRUb0FycmF5Iiwic2xpY2VJdGVyYXRvciIsImFyciIsImkiLCJfYXJyIiwiX24iLCJfZCIsIl9lIiwidW5kZWZpbmVkIiwiX2kiLCJTeW1ib2wiLCJpdGVyYXRvciIsIl9zIiwibmV4dCIsImRvbmUiLCJwdXNoIiwibGVuZ3RoIiwiZXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiVHlwZUVycm9yIiwiX3V0aWxzIiwicmVxdWlyZSIsIl91dGlsczIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib2JqIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJSZWdpb24iLCJib2FyZFN0YXRlIiwiaW50ZXJzZWN0aW9ucyIsIl9jb21wdXRlZCIsImZyZWV6ZSIsIl9zdGFydGluZ0F0IiwieSIsIngiLCJzdGFydGluZ1BvaW50IiwiaW50ZXJzZWN0aW9uQXQiLCJfYm9hcmRTdGF0ZSRwYXJ0aXRpb24iLCJwYXJ0aXRpb25UcmF2ZXJzZSIsIm5laWdoYm9yIiwic2FtZUNvbG9yQXMiLCJfYm9hcmRTdGF0ZSRwYXJ0aXRpb24yIiwiaW5jbHVkZWRQb2ludHMiLCJib3VuZGFyeVBvaW50cyIsImFsbEZvciIsImNoZWNrZWRQb2ludHMiLCJyZWdpb25zIiwiZm9yRWFjaCIsInBvaW50IiwiaW5kZXhPZiIsIl9ib2FyZFN0YXRlJHBhcnRpdGlvbjMiLCJfYm9hcmRTdGF0ZSRwYXJ0aXRpb240IiwicmVnaW9uUG9pbnRzIiwiXyIsImNvbmNhdCIsIm1lcmdlIiwicmVnaW9uIiwibWVyZ2VkUmVnaW9ucyIsImZpbHRlciIsInIiLCJpc0VtcHR5IiwiaXNUZXJyaXRvcnkiLCJ0ZXJyaXRvcnlDb2xvciIsImV4cGFuZGVkQm91bmRhcnlTdG9uZXMiLCJzb21lIiwic3RvbmUiLCJsYXRlc3RSZWdpb24iLCJwcm90b3R5cGUiLCJfUmVnaW9uJF9zdGFydGluZ0F0IiwiX1JlZ2lvbiRfc3RhcnRpbmdBdDIiLCJzdXJyb3VuZGluZ0NvbG9ycyIsInVuaXF1ZSIsIm1hcCIsIl9SZWdpb24kX3N0YXJ0aW5nQXQzIiwiX1JlZ2lvbiRfc3RhcnRpbmdBdDQiLCJFcnJvciIsImlzQmxhY2siLCJpc1doaXRlIiwiaXNOZXV0cmFsIiwiZXh0ZXJpb3IiLCJfdGhpcyIsIm5laWdoYm9yc0ZvciIsImJvdW5kYXJ5U3RvbmVzIiwiX3RoaXMyIiwiZmxhdE1hcCIsImxlbmd0aE9mVGVycml0b3J5Qm91bmRhcnkiLCJfdGhpczMiLCJib3JkZXJQb2ludHMiLCJib2FyZFNpemUiLCJjb3JuZXJQb2ludHMiLCJjb250YWluc1NxdWFyZUZvdXIiLCJfdGhpczQiLCJldmVyeSIsIl9yZWYiLCJfcmVmMiIsInlPZmZzZXQiLCJ4T2Zmc2V0Iiwib25UaGVCb2FyZCIsImNvbnRhaW5zQ3VydmVkRm91ciIsIl90aGlzNSIsImV4cGVjdGVkUG9pbnRzIiwiX3JlZjMiLCJfcmVmNCIsIm51bWJlck9mRXllcyIsImJvdW5kYXJ5TGVuZ3RoIiwiZXllcyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUFBLE9BQU9DLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDQyxTQUFPO0FBRG9DLENBQTdDOztBQUlBLElBQUlDLGlCQUFpQixZQUFZO0FBQUUsV0FBU0MsYUFBVCxDQUF1QkMsR0FBdkIsRUFBNEJDLENBQTVCLEVBQStCO0FBQUUsUUFBSUMsT0FBTyxFQUFYLENBQWUsSUFBSUMsS0FBSyxJQUFULENBQWUsSUFBSUMsS0FBSyxLQUFULENBQWdCLElBQUlDLEtBQUtDLFNBQVQsQ0FBb0IsSUFBSTtBQUFFLFdBQUssSUFBSUMsS0FBS1AsSUFBSVEsT0FBT0MsUUFBWCxHQUFULEVBQWlDQyxFQUF0QyxFQUEwQyxFQUFFUCxLQUFLLENBQUNPLEtBQUtILEdBQUdJLElBQUgsRUFBTixFQUFpQkMsSUFBeEIsQ0FBMUMsRUFBeUVULEtBQUssSUFBOUUsRUFBb0Y7QUFBRUQsYUFB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SSxLQUFLUCxrQkFBTCxFQUFKLEVBQStCO0FBQ3BDTyxpQkFBTyxDQUFQO0FBQ0QsU0FGTSxNQUVBO0FBQ0xBLGlCQUFPLEdBQVA7QUFDRDs7QUFFRDtBQUNGLFdBQUssQ0FBTDtBQUNFLFlBQUksS0FBS2Ysa0JBQUwsRUFBSixFQUErQjtBQUM3QmUsaUJBQU8sR0FBUDtBQUNELFNBRkQsTUFFTztBQUNMQSxpQkFBTyxDQUFQO0FBQ0Q7QUFDRDs7QUFFRjtBQUNFLGNBQU0sSUFBSTlCLEtBQUosQ0FBVSwrQkFBK0I2QixjQUF6QyxDQUFOO0FBOUJKOztBQWlDQSxXQUFPQyxJQUFQO0FBQ0Q7QUFqTmdCLENBQW5COztBQW9OQTVHLFFBQVE2QixPQUFSLEdBQWtCQyxNQUFsQjs7QUFFQSIsImZpbGUiOiJyZWdpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9zbGljZWRUb0FycmF5ID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9IHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgcmV0dXJuIGFycjsgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHsgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTsgfSBlbHNlIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7IH0gfTsgfSgpO1xuXG52YXIgX3V0aWxzID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG5cbnZhciBfdXRpbHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXRpbHMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgUmVnaW9uID0gZnVuY3Rpb24gUmVnaW9uKGJvYXJkU3RhdGUsIGludGVyc2VjdGlvbnMpIHtcbiAgdGhpcy5ib2FyZFN0YXRlID0gYm9hcmRTdGF0ZTtcbiAgdGhpcy5pbnRlcnNlY3Rpb25zID0gaW50ZXJzZWN0aW9ucztcblxuICB0aGlzLl9jb21wdXRlZCA9IHt9O1xuXG4gIE9iamVjdC5mcmVlemUodGhpcyk7XG59O1xuXG5SZWdpb24uX3N0YXJ0aW5nQXQgPSBmdW5jdGlvbiAoYm9hcmRTdGF0ZSwgeSwgeCkge1xuICB2YXIgc3RhcnRpbmdQb2ludCA9IGJvYXJkU3RhdGUuaW50ZXJzZWN0aW9uQXQoeSwgeCk7XG5cbiAgdmFyIF9ib2FyZFN0YXRlJHBhcnRpdGlvbiA9IGJvYXJkU3RhdGUucGFydGl0aW9uVHJhdmVyc2Uoc3RhcnRpbmdQb2ludCwgZnVuY3Rpb24gKG5laWdoYm9yKSB7XG4gICAgcmV0dXJuIG5laWdoYm9yLnNhbWVDb2xvckFzKHN0YXJ0aW5nUG9pbnQpO1xuICB9KSxcbiAgICAgIF9ib2FyZFN0YXRlJHBhcnRpdGlvbjIgPSBfc2xpY2VkVG9BcnJheShfYm9hcmRTdGF0ZSRwYXJ0aXRpb24sIDIpLFxuICAgICAgaW5jbHVkZWRQb2ludHMgPSBfYm9hcmRTdGF0ZSRwYXJ0aXRpb24yWzBdLFxuICAgICAgYm91bmRhcnlQb2ludHMgPSBfYm9hcmRTdGF0ZSRwYXJ0aXRpb24yWzFdO1xuXG4gIHJldHVybiBbaW5jbHVkZWRQb2ludHMsIGJvdW5kYXJ5UG9pbnRzXTtcbn07XG5cblJlZ2lvbi5hbGxGb3IgPSBmdW5jdGlvbiAoYm9hcmRTdGF0ZSkge1xuICB2YXIgY2hlY2tlZFBvaW50cyA9IFtdO1xuICB2YXIgcmVnaW9ucyA9IFtdO1xuXG4gIGJvYXJkU3RhdGUuaW50ZXJzZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChwb2ludCkge1xuICAgIGlmIChjaGVja2VkUG9pbnRzLmluZGV4T2YocG9pbnQpID4gLTEpIHtcbiAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIF9ib2FyZFN0YXRlJHBhcnRpdGlvbjMgPSBib2FyZFN0YXRlLnBhcnRpdGlvblRyYXZlcnNlKHBvaW50LCBmdW5jdGlvbiAobmVpZ2hib3IpIHtcbiAgICAgICAgcmV0dXJuIG5laWdoYm9yLnNhbWVDb2xvckFzKHBvaW50KTtcbiAgICAgIH0pLFxuICAgICAgICAgIF9ib2FyZFN0YXRlJHBhcnRpdGlvbjQgPSBfc2xpY2VkVG9BcnJheShfYm9hcmRTdGF0ZSRwYXJ0aXRpb24zLCAyKSxcbiAgICAgICAgICByZWdpb25Qb2ludHMgPSBfYm9hcmRTdGF0ZSRwYXJ0aXRpb240WzBdLFxuICAgICAgICAgIF8gPSBfYm9hcmRTdGF0ZSRwYXJ0aXRpb240WzFdO1xuXG4gICAgICByZWdpb25zLnB1c2gobmV3IFJlZ2lvbihib2FyZFN0YXRlLCByZWdpb25Qb2ludHMpKTtcbiAgICAgIGNoZWNrZWRQb2ludHMgPSBjaGVja2VkUG9pbnRzLmNvbmNhdChyZWdpb25Qb2ludHMpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHJlZ2lvbnM7XG59O1xuXG5SZWdpb24ubWVyZ2UgPSBmdW5jdGlvbiAocmVnaW9ucywgcmVnaW9uKSB7XG4gIHZhciBtZXJnZWRSZWdpb25zID0gW3JlZ2lvbl07XG4gIHZhciBsZW5ndGggPSAtMTtcblxuICB3aGlsZSAobWVyZ2VkUmVnaW9ucy5sZW5ndGggIT09IGxlbmd0aCkge1xuICAgIGxlbmd0aCA9IG1lcmdlZFJlZ2lvbnMubGVuZ3RoO1xuXG4gICAgbWVyZ2VkUmVnaW9ucyA9IHJlZ2lvbnMuZmlsdGVyKGZ1bmN0aW9uIChyKSB7XG4gICAgICByZXR1cm4gci5pc0VtcHR5KCkgJiYgci5pc1RlcnJpdG9yeSgpICYmIHIudGVycml0b3J5Q29sb3IoKSA9PT0gcmVnaW9uLnRlcnJpdG9yeUNvbG9yKCkgJiYgci5leHBhbmRlZEJvdW5kYXJ5U3RvbmVzKCkuc29tZShmdW5jdGlvbiAoc3RvbmUpIHtcbiAgICAgICAgcmV0dXJuIG1lcmdlZFJlZ2lvbnMuc29tZShmdW5jdGlvbiAobGF0ZXN0UmVnaW9uKSB7XG4gICAgICAgICAgcmV0dXJuIGxhdGVzdFJlZ2lvbi5leHBhbmRlZEJvdW5kYXJ5U3RvbmVzKCkuaW5kZXhPZihzdG9uZSkgPiAtMTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBtZXJnZWRSZWdpb25zO1xufTtcblxuUmVnaW9uLnByb3RvdHlwZSA9IHtcbiAgaXNFbXB0eTogZnVuY3Rpb24gaXNFbXB0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnRlcnNlY3Rpb25zWzBdLmlzRW1wdHkoKTtcbiAgfSxcblxuICBpc1RlcnJpdG9yeTogZnVuY3Rpb24gaXNUZXJyaXRvcnkoKSB7XG4gICAgdmFyIHBvaW50ID0gdGhpcy5pbnRlcnNlY3Rpb25zWzBdO1xuXG4gICAgaWYgKCFwb2ludC5pc0VtcHR5KCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgX1JlZ2lvbiRfc3RhcnRpbmdBdCA9IFJlZ2lvbi5fc3RhcnRpbmdBdCh0aGlzLmJvYXJkU3RhdGUsIHBvaW50LnksIHBvaW50LngpLFxuICAgICAgICBfUmVnaW9uJF9zdGFydGluZ0F0MiA9IF9zbGljZWRUb0FycmF5KF9SZWdpb24kX3N0YXJ0aW5nQXQsIDIpLFxuICAgICAgICBfID0gX1JlZ2lvbiRfc3RhcnRpbmdBdDJbMF0sXG4gICAgICAgIGJvdW5kYXJ5UG9pbnRzID0gX1JlZ2lvbiRfc3RhcnRpbmdBdDJbMV07XG5cbiAgICB2YXIgc3Vycm91bmRpbmdDb2xvcnMgPSBfdXRpbHMyLmRlZmF1bHQudW5pcXVlKGJvdW5kYXJ5UG9pbnRzLm1hcChmdW5jdGlvbiAoaSkge1xuICAgICAgcmV0dXJuIGkudmFsdWU7XG4gICAgfSkpO1xuICAgIHZhciBpc1RlcnJpdG9yeSA9IHN1cnJvdW5kaW5nQ29sb3JzLmxlbmd0aCA9PT0gMSAmJiBzdXJyb3VuZGluZ0NvbG9yc1swXSAhPT0gXCJlbXB0eVwiO1xuXG4gICAgcmV0dXJuIGlzVGVycml0b3J5O1xuICB9LFxuXG4gIHRlcnJpdG9yeUNvbG9yOiBmdW5jdGlvbiB0ZXJyaXRvcnlDb2xvcigpIHtcbiAgICB2YXIgcG9pbnQgPSB0aGlzLmludGVyc2VjdGlvbnNbMF07XG5cbiAgICB2YXIgX1JlZ2lvbiRfc3RhcnRpbmdBdDMgPSBSZWdpb24uX3N0YXJ0aW5nQXQodGhpcy5ib2FyZFN0YXRlLCBwb2ludC55LCBwb2ludC54KSxcbiAgICAgICAgX1JlZ2lvbiRfc3RhcnRpbmdBdDQgPSBfc2xpY2VkVG9BcnJheShfUmVnaW9uJF9zdGFydGluZ0F0MywgMiksXG4gICAgICAgIF8gPSBfUmVnaW9uJF9zdGFydGluZ0F0NFswXSxcbiAgICAgICAgYm91bmRhcnlQb2ludHMgPSBfUmVnaW9uJF9zdGFydGluZ0F0NFsxXTtcblxuICAgIHZhciBzdXJyb3VuZGluZ0NvbG9ycyA9IF91dGlsczIuZGVmYXVsdC51bmlxdWUoYm91bmRhcnlQb2ludHMubWFwKGZ1bmN0aW9uIChpKSB7XG4gICAgICByZXR1cm4gaS52YWx1ZTtcbiAgICB9KSk7XG4gICAgdmFyIGlzVGVycml0b3J5ID0gc3Vycm91bmRpbmdDb2xvcnMubGVuZ3RoID09PSAxICYmIHN1cnJvdW5kaW5nQ29sb3JzWzBdICE9PSBcImVtcHR5XCI7XG5cbiAgICBpZiAoIXBvaW50LmlzRW1wdHkoKSB8fCAhaXNUZXJyaXRvcnkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkF0dGVtcHRlZCB0byBvYnRhaW4gdGVycml0b3J5IGNvbG9yIGZvciBzb21ldGhpbmcgdGhhdCBpc24ndCB0ZXJyaXRvcnksIHJlZ2lvbiBjb250YWluaW5nIFwiICsgcG9pbnQueSArIFwiLFwiICsgcG9pbnQueCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzdXJyb3VuZGluZ0NvbG9yc1swXTtcbiAgICB9XG4gIH0sXG5cbiAgaXNCbGFjazogZnVuY3Rpb24gaXNCbGFjaygpIHtcbiAgICByZXR1cm4gdGhpcy50ZXJyaXRvcnlDb2xvcigpID09PSBcImJsYWNrXCI7XG4gIH0sXG5cbiAgaXNXaGl0ZTogZnVuY3Rpb24gaXNXaGl0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy50ZXJyaXRvcnlDb2xvcigpID09PSBcIndoaXRlXCI7XG4gIH0sXG5cbiAgaXNOZXV0cmFsOiBmdW5jdGlvbiBpc05ldXRyYWwoKSB7XG4gICAgcmV0dXJuICF0aGlzLmludGVyc2VjdGlvbnNbMF0uaXNCbGFjaygpICYmICF0aGlzLmludGVyc2VjdGlvbnNbMF0uaXNXaGl0ZSgpICYmICF0aGlzLmlzVGVycml0b3J5KCk7XG4gIH0sXG5cbiAgZXh0ZXJpb3I6IGZ1bmN0aW9uIGV4dGVyaW9yKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICByZXR1cm4gdGhpcy5ib2FyZFN0YXRlLmludGVyc2VjdGlvbnMuZmlsdGVyKGZ1bmN0aW9uIChpKSB7XG4gICAgICByZXR1cm4gX3RoaXMuaW50ZXJzZWN0aW9ucy5pbmRleE9mKGkpIDwgMCAmJiBfdGhpcy5ib2FyZFN0YXRlLm5laWdoYm9yc0ZvcihpLnksIGkueCkuc29tZShmdW5jdGlvbiAobmVpZ2hib3IpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLmludGVyc2VjdGlvbnMuaW5kZXhPZihuZWlnaGJvcikgPiAtMTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuXG4gIGJvdW5kYXJ5U3RvbmVzOiBmdW5jdGlvbiBib3VuZGFyeVN0b25lcygpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIGlmICh0aGlzLl9jb21wdXRlZC5ib3VuZGFyeVN0b25lcykge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbXB1dGVkLmJvdW5kYXJ5U3RvbmVzO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5pc0VtcHR5KCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkF0dGVtcHRlZCB0byBvYnRhaW4gYm91bmRhcnkgc3RvbmVzIGZvciBub24tZW1wdHkgcmVnaW9uXCIpO1xuICAgIH1cblxuICAgIHRoaXMuX2NvbXB1dGVkLmJvdW5kYXJ5U3RvbmVzID0gdGhpcy5leHRlcmlvcigpLmZpbHRlcihmdW5jdGlvbiAoaSkge1xuICAgICAgcmV0dXJuICFpLnNhbWVDb2xvckFzKF90aGlzMi5pbnRlcnNlY3Rpb25zWzBdKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLl9jb21wdXRlZC5ib3VuZGFyeVN0b25lcztcbiAgfSxcblxuICBleHBhbmRlZEJvdW5kYXJ5U3RvbmVzOiBmdW5jdGlvbiBleHBhbmRlZEJvdW5kYXJ5U3RvbmVzKCkge1xuICAgIGlmICh0aGlzLl9jb21wdXRlZC5leHBhbmRlZEJvdW5kYXJ5U3RvbmVzKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29tcHV0ZWQuZXhwYW5kZWRCb3VuZGFyeVN0b25lcztcbiAgICB9XG5cbiAgICB2YXIgYm91bmRhcnlTdG9uZXMgPSB0aGlzLmJvdW5kYXJ5U3RvbmVzKCk7XG4gICAgdmFyIHJlZ2lvbnMgPSBSZWdpb24uYWxsRm9yKHRoaXMuYm9hcmRTdGF0ZSkuZmlsdGVyKGZ1bmN0aW9uIChyKSB7XG4gICAgICByZXR1cm4gci5pbnRlcnNlY3Rpb25zLnNvbWUoZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgcmV0dXJuIGJvdW5kYXJ5U3RvbmVzLmluZGV4T2YoaSkgPiAtMTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fY29tcHV0ZWQuZXhwYW5kZWRCb3VuZGFyeVN0b25lcyA9IF91dGlsczIuZGVmYXVsdC5mbGF0TWFwKHJlZ2lvbnMsIGZ1bmN0aW9uIChyKSB7XG4gICAgICByZXR1cm4gci5pbnRlcnNlY3Rpb25zO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuX2NvbXB1dGVkLmV4cGFuZGVkQm91bmRhcnlTdG9uZXM7XG4gIH0sXG5cbiAgbGVuZ3RoT2ZUZXJyaXRvcnlCb3VuZGFyeTogZnVuY3Rpb24gbGVuZ3RoT2ZUZXJyaXRvcnlCb3VuZGFyeSgpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgIC8vIGNvdW50IHRoZSBlbXB0eSBib3JkZXIgcG9pbnRzIHRvIHRyZWF0IHRoZSBlZGdlIG9mIHRoZSBib2FyZCBpdHNlbGYgYXMgcG9pbnRzXG4gICAgdmFyIGJvcmRlclBvaW50cyA9IHRoaXMuaW50ZXJzZWN0aW9ucy5maWx0ZXIoZnVuY3Rpb24gKGkpIHtcbiAgICAgIHJldHVybiBpLnkgPT09IDAgfHwgaS55ID09PSBfdGhpczMuYm9hcmRTdGF0ZS5ib2FyZFNpemUgLSAxIHx8IGkueCA9PT0gMCB8fCBpLnggPT09IF90aGlzMy5ib2FyZFN0YXRlLmJvYXJkU2l6ZSAtIDE7XG4gICAgfSk7XG4gICAgdmFyIGNvcm5lclBvaW50cyA9IHRoaXMuaW50ZXJzZWN0aW9ucy5maWx0ZXIoZnVuY3Rpb24gKGkpIHtcbiAgICAgIHJldHVybiBpLnkgJSBfdGhpczMuYm9hcmRTdGF0ZS5ib2FyZFNpemUgLSAxID09PSAwICYmIGkueCAlIF90aGlzMy5ib2FyZFN0YXRlLmJvYXJkU2l6ZSAtIDEgPT09IDA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5ib3VuZGFyeVN0b25lcygpLmxlbmd0aCArIGJvcmRlclBvaW50cy5sZW5ndGggKyBjb3JuZXJQb2ludHMubGVuZ3RoO1xuICB9LFxuXG4gIGNvbnRhaW5zU3F1YXJlRm91cjogZnVuY3Rpb24gY29udGFpbnNTcXVhcmVGb3VyKCkge1xuICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgcmV0dXJuIHRoaXMuaW50ZXJzZWN0aW9ucy5zb21lKGZ1bmN0aW9uIChpKSB7XG4gICAgICByZXR1cm4gW1swLCAwXSwgWzAsIDFdLCBbMSwgMF0sIFsxLCAxXV0uZXZlcnkoZnVuY3Rpb24gKF9yZWYpIHtcbiAgICAgICAgdmFyIF9yZWYyID0gX3NsaWNlZFRvQXJyYXkoX3JlZiwgMiksXG4gICAgICAgICAgICB5T2Zmc2V0ID0gX3JlZjJbMF0sXG4gICAgICAgICAgICB4T2Zmc2V0ID0gX3JlZjJbMV07XG5cbiAgICAgICAgdmFyIHkgPSBpLnkgKyB5T2Zmc2V0O1xuICAgICAgICB2YXIgeCA9IGkueCArIHhPZmZzZXQ7XG5cbiAgICAgICAgdmFyIG9uVGhlQm9hcmQgPSB5ID49IDAgJiYgeSA8IF90aGlzNC5ib2FyZFN0YXRlLmJvYXJkU2l6ZSAmJiB4ID49IDAgJiYgeCA8IF90aGlzNC5ib2FyZFN0YXRlLmJvYXJkU2l6ZTtcblxuICAgICAgICByZXR1cm4gb25UaGVCb2FyZCAmJiBfdGhpczQuYm9hcmRTdGF0ZS5pbnRlcnNlY3Rpb25BdCh5LCB4KS5zYW1lQ29sb3JBcyhpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuXG4gIGNvbnRhaW5zQ3VydmVkRm91cjogZnVuY3Rpb24gY29udGFpbnNDdXJ2ZWRGb3VyKCkge1xuICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgcmV0dXJuIHRoaXMuaW50ZXJzZWN0aW9ucy5zb21lKGZ1bmN0aW9uIChpKSB7XG4gICAgICByZXR1cm4gW1tbMCwgMF0sIFsxLCAwXSwgWzIsIDBdLCBbMiwgMV1dLCBbWy0xLCAyXSwgWzAsIDBdLCBbMCwgMV0sIFswLCAyXV0sIFtbMCwgMF0sIFswLCAxXSwgWzEsIDFdLCBbMiwgMV1dLCBbWy0xLCAwXSwgWy0xLCAxXSwgWy0xLCAyXSwgWzAsIDBdXSwgW1stMiwgMV0sIFstMSwgMV0sIFswLCAwXSwgWzAsIDFdXSwgW1swLCAwXSwgWzEsIDBdLCBbMSwgMV0sIFsxLCAyXV0sIFtbMCwgLTFdLCBbMCwgMF0sIFsxLCAtMV0sIFsyLCAtMV1dLCBbWy0xLCAtMl0sIFstMSwgLTFdLCBbLTEsIDBdLCBbMCwgMF1dXS5zb21lKGZ1bmN0aW9uIChleHBlY3RlZFBvaW50cykge1xuICAgICAgICByZXR1cm4gZXhwZWN0ZWRQb2ludHMuZXZlcnkoZnVuY3Rpb24gKF9yZWYzKSB7XG4gICAgICAgICAgdmFyIF9yZWY0ID0gX3NsaWNlZFRvQXJyYXkoX3JlZjMsIDIpLFxuICAgICAgICAgICAgICB5T2Zmc2V0ID0gX3JlZjRbMF0sXG4gICAgICAgICAgICAgIHhPZmZzZXQgPSBfcmVmNFsxXTtcblxuICAgICAgICAgIHZhciB5ID0gaS55ICsgeU9mZnNldDtcbiAgICAgICAgICB2YXIgeCA9IGkueCArIHhPZmZzZXQ7XG5cbiAgICAgICAgICB2YXIgb25UaGVCb2FyZCA9IHkgPj0gMCAmJiB5IDwgX3RoaXM1LmJvYXJkU3RhdGUuYm9hcmRTaXplICYmIHggPj0gMCAmJiB4IDwgX3RoaXM1LmJvYXJkU3RhdGUuYm9hcmRTaXplO1xuXG4gICAgICAgICAgcmV0dXJuIG9uVGhlQm9hcmQgJiYgX3RoaXM1LmJvYXJkU3RhdGUuaW50ZXJzZWN0aW9uQXQoeSwgeCkuc2FtZUNvbG9yQXMoaSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG5cbiAgbnVtYmVyT2ZFeWVzOiBmdW5jdGlvbiBudW1iZXJPZkV5ZXMoKSB7XG4gICAgaWYgKCF0aGlzLmludGVyc2VjdGlvbnNbMF0uaXNFbXB0eSgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmV4cGVjdGVkIGNhbGN1bGF0aW9uIG9mIG51bWJlciBvZiBleWVzIGZvciBhIG5vbi1lbXB0eSByZWdpb24gY29udGFpbmluZyBcIiArIHRoaXMuaW50ZXJzZWN0aW9uc1swXS55ICsgXCIsXCIgKyB0aGlzLmludGVyc2VjdGlvbnNbMF0ueCk7XG4gICAgfVxuXG4gICAgdmFyIGJvdW5kYXJ5TGVuZ3RoID0gdGhpcy5sZW5ndGhPZlRlcnJpdG9yeUJvdW5kYXJ5KCk7XG5cbiAgICBpZiAoYm91bmRhcnlMZW5ndGggPCAyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmV4cGVjdGVkIGJvdW5kYXJ5IGxlbmd0aCBvZiBcIiArIGJvdW5kYXJ5TGVuZ3RoICsgXCIgZm9yIHJlZ2lvbiBpbmNsdWRpbmcgXCIgKyB0aGlzLmludGVyc2VjdGlvbnNbMF0ueSArIFwiLFwiICsgdGhpcy5pbnRlcnNlY3Rpb25zWzBdLngpO1xuICAgIH1cblxuICAgIGlmIChib3VuZGFyeUxlbmd0aCA+PSAxMCkge1xuICAgICAgcmV0dXJuIDI7XG4gICAgfVxuXG4gICAgdmFyIGV5ZXMgPSB2b2lkIDA7XG5cbiAgICBzd2l0Y2ggKGJvdW5kYXJ5TGVuZ3RoKSB7XG4gICAgICBjYXNlIDI6XG4gICAgICBjYXNlIDM6XG4gICAgICBjYXNlIDQ6XG4gICAgICBjYXNlIDU6XG4gICAgICBjYXNlIDY6XG4gICAgICAgIGV5ZXMgPSAxO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNzpcbiAgICAgICAgZXllcyA9IDEuNTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDg6XG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5zU3F1YXJlRm91cigpKSB7XG4gICAgICAgICAgZXllcyA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jb250YWluc0N1cnZlZEZvdXIoKSkge1xuICAgICAgICAgIGV5ZXMgPSAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV5ZXMgPSAxLjU7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgOTpcbiAgICAgICAgaWYgKHRoaXMuY29udGFpbnNTcXVhcmVGb3VyKCkpIHtcbiAgICAgICAgICBleWVzID0gMS41O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV5ZXMgPSAyO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1bmhhbmRsZWQgYm91bmRhcnkgbGVuZ3RoIFwiICsgYm91bmRhcnlMZW5ndGgpO1xuICAgIH1cblxuICAgIHJldHVybiBleWVzO1xuICB9XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBSZWdpb247XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlZ2lvbi5qcy5tYXAiXX0=
},{"./utils":14}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Renderer = function Renderer(boardElement, _ref) {
  var hooks = _ref.hooks,
      options = _ref.options;

  this.INTERSECTION_GAP_SIZE = 28;
  this.GUTTER_MARGIN = this.INTERSECTION_GAP_SIZE - 3;
  this.BASE_MARGIN = this.INTERSECTION_GAP_SIZE - 10;
  this.hasCoordinates = boardElement.hasAttribute("data-include-coordinates");
  this.MARGIN = this.hasCoordinates ? this.BASE_MARGIN + this.GUTTER_MARGIN : this.BASE_MARGIN;
  this.boardElement = boardElement;
  this.grid = [];
  this.hooks = hooks || {};
  this._options = options || {};
  this._initialized = false;

  if (this._options["fuzzyStonePlacement"]) {
    _utils2.default.addClass(boardElement, "tenuki-fuzzy-placement");
    _utils2.default.removeClass(boardElement, "tenuki-board-flat");
    _utils2.default.addClass(boardElement, "tenuki-board-nonflat");
    this.smallerStones = true;
  }

  this.flatStones = _utils2.default.hasClass(boardElement, "tenuki-board-flat");

  if (!this.flatStones) {
    _utils2.default.addClass(boardElement, "tenuki-board-nonflat");
  }
};

Renderer.hoshiPositionsFor = function (boardSize) {
  var hoshiElements = [];

  if (boardSize < 7) {
    if (boardSize > 1 && boardSize % 2 === 1) {
      var hoshi = {};
      hoshi.top = (boardSize - 1) / 2;
      hoshi.left = hoshi.top;

      hoshiElements.push(hoshi);
    } else {
      // no hoshi
    }
  } else {
    var hoshiOffset = boardSize > 11 ? 3 : 2;

    for (var hoshiY = 0; hoshiY < 3; hoshiY++) {
      for (var hoshiX = 0; hoshiX < 3; hoshiX++) {
        if ((boardSize === 7 || boardSize % 2 === 0) && (hoshiY === 1 || hoshiX === 1)) {
          continue;
        }

        var _hoshi = {};

        if (hoshiY === 0) {
          _hoshi.top = hoshiOffset;
        }

        if (hoshiY === 1) {
          _hoshi.top = (boardSize + 1) / 2 - 1;
        }

        if (hoshiY === 2) {
          _hoshi.top = boardSize - hoshiOffset - 1;
        }

        if (hoshiX === 0) {
          _hoshi.left = hoshiOffset;
        }

        if (hoshiX === 1) {
          _hoshi.left = (boardSize + 1) / 2 - 1;
        }

        if (hoshiX === 2) {
          _hoshi.left = boardSize - hoshiOffset - 1;
        }

        hoshiElements.push(_hoshi);
      }
    }
  }

  return hoshiElements;
};

Renderer.prototype = {
  _setup: function _setup(boardState) {
    var renderer = this;
    var boardElement = this.boardElement;

    renderer.BOARD_LENGTH = 2 * this.MARGIN + (boardState.boardSize - 1) * (this.INTERSECTION_GAP_SIZE + 1);

    var innerContainer = _utils2.default.createElement("div", { class: "tenuki-inner-container" });
    renderer.innerContainer = innerContainer;
    _utils2.default.appendElement(boardElement, innerContainer);

    var zoomContainer = _utils2.default.createElement("div", { class: "tenuki-zoom-container" });
    renderer.zoomContainer = zoomContainer;
    _utils2.default.appendElement(innerContainer, zoomContainer);

    renderer.cancelZoomElement = _utils2.default.createElement("div", { class: "cancel-zoom" });
    var cancelZoomBackdrop = _utils2.default.createElement("div", { class: "cancel-zoom-backdrop" });
    _utils2.default.addEventListener(renderer.cancelZoomElement, "click", function (event) {
      event.preventDefault();
      renderer.zoomOut();

      return false;
    });
    _utils2.default.addEventListener(cancelZoomBackdrop, "click", function (event) {
      event.preventDefault();
      renderer.zoomOut();

      return false;
    });
    _utils2.default.appendElement(innerContainer, renderer.cancelZoomElement);
    _utils2.default.appendElement(innerContainer, cancelZoomBackdrop);

    // https://developer.mozilla.org/en-US/docs/Web/Events/resize
    var throttle = function throttle(type, name) {
      var running = false;
      var func = function func() {
        if (running) {
          return;
        }

        running = true;

        window.requestAnimationFrame(function () {
          window.dispatchEvent(new CustomEvent(name));
          running = false;
        });
      };
      window.addEventListener(type, func);
    };

    throttle("resize", "optimizedResize");

    var specificRendererBoard = this.generateBoard(boardState, {
      hasCoordinates: this.hasCoordinates,
      smallerStones: this.smallerStones,
      flatStones: this.flatStones
    });
    _utils2.default.appendElement(zoomContainer, specificRendererBoard);

    window.requestAnimationFrame(function () {
      // we'll potentially be zooming on touch devices
      zoomContainer.style.willChange = "transform";

      renderer.computeSizing();
    });

    window.addEventListener("optimizedResize", function () {
      renderer.computeSizing();
    });

    renderer.touchmoveChangedTouch = null;
    renderer.touchstartEventHandler = renderer.handleTouchStart.bind(renderer);
    renderer.touchmoveEventHandler = renderer.handleTouchMove.bind(renderer);
    renderer.touchendEventHandler = renderer.handleTouchEnd.bind(renderer);

    _utils2.default.addEventListener(renderer.innerContainer, "touchstart", renderer.touchstartEventHandler);
    _utils2.default.addEventListener(renderer.innerContainer, "touchend", renderer.touchendEventHandler);
    _utils2.default.addEventListener(renderer.innerContainer, "touchmove", renderer.touchmoveEventHandler);
  },

  computeSizing: function computeSizing() {
    var renderer = this;
    var innerContainer = this.innerContainer;
    var zoomContainer = this.zoomContainer;
    var boardElement = this.boardElement;

    // reset everything so we can calculate against new values
    innerContainer.style.height = "";
    innerContainer.style.width = "";
    zoomContainer.style.height = "";
    zoomContainer.style.width = "";
    innerContainer.style.transform = "";
    // zoomContainer.style.willChange = "";
    boardElement.style.width = "";
    boardElement.style.height = "";

    // dev-friendly reset of whether this is a touch device
    renderer._touchEventFired = null;

    innerContainer.style.width = renderer.BOARD_LENGTH + "px";
    innerContainer.style.height = renderer.BOARD_LENGTH + "px";

    zoomContainer.style.width = renderer.BOARD_LENGTH + "px";
    zoomContainer.style.height = renderer.BOARD_LENGTH + "px";

    var scaleX = innerContainer.parentNode.clientWidth / innerContainer.clientWidth;
    var scaleY = innerContainer.parentNode.clientHeight / innerContainer.clientHeight;
    var scale = Math.min(scaleX, scaleY);

    if (scale > 0) {
      if (scale < 1) {
        _utils2.default.addClass(boardElement, "tenuki-scaled");
      } else {
        _utils2.default.removeClass(boardElement, "tenuki-scaled");
      }

      if (scale < 1 || scale > 1) {
        innerContainer.style["transform-origin"] = "top left";
        innerContainer.style.transform = "scale3d(" + scale + ", " + scale + ", 1)";
      }
    }

    // reset the outer element's height to match, ensuring that we free up any lingering whitespace
    boardElement.style.width = innerContainer.getBoundingClientRect().width + "px";
    boardElement.style.height = innerContainer.getBoundingClientRect().height + "px";

    // Work around lack of re-raster in Chrome. See https://github.com/w3c/csswg-drafts/issues/236
    // and https://bugs.chromium.org/p/chromium/issues/detail?id=600482 for more
    // information. This is preventing, e.g., horizontal/vertical line width
    // mismatches after scaling. By adding this, lines are re-rastered and are
    // all the same width, as if the user had hit refresh at the new viewport
    // size.
    zoomContainer.style.willChange = "";

    window.requestAnimationFrame(function () {
      zoomContainer.style.willChange = "transform";
    });
  },

  addIntersectionEventListeners: function addIntersectionEventListeners(element, y, x) {
    var renderer = this;

    _utils2.default.addEventListener(element, "mouseenter", function () {
      var hoveredYPosition = y;
      var hoveredXPosition = x;
      var hoverValue = renderer.hooks.hoverValue(hoveredYPosition, hoveredXPosition);

      if (hoverValue) {
        _utils2.default.addClass(element, "hovered");
        _utils2.default.addClass(element, hoverValue);
      }
    });

    _utils2.default.addEventListener(element, "mouseleave", function () {
      if (_utils2.default.hasClass(this, "hovered")) {
        _utils2.default.removeClass(element, "hovered");
        _utils2.default.removeClass(element, "black");
        _utils2.default.removeClass(element, "white");
      }

      renderer.resetTouchedPoint();
    });

    _utils2.default.addEventListener(element, "click", function () {
      var playedYPosition = y;
      var playedXPosition = x;

      // if this isn't part of a touch,
      // or it is and the user is zoomed in,
      // or it's game over and we're marking stones dead,
      // then don't use the zoom/double-select system.
      if (!renderer._touchEventFired || document.body.clientWidth / window.innerWidth > 1 || renderer.hooks.gameIsOver()) {
        renderer.hooks.handleClick(playedYPosition, playedXPosition);
        return;
      }

      if (renderer.touchedPoint) {
        if (element === renderer.touchedPoint) {
          renderer.hooks.handleClick(playedYPosition, playedXPosition);
        } else {
          renderer.showPossibleMoveAt(element, playedYPosition, playedXPosition);
        }
      } else {
        renderer.showPossibleMoveAt(element, playedYPosition, playedXPosition);
      }
    });
  },

  handleTouchStart: function handleTouchStart(event) {
    var renderer = this;
    renderer._touchEventFired = true;

    if (event.touches.length > 1) {
      if (renderer.zoomedIn) {
        event.preventDefault();
      }
      return;
    }

    if (!renderer.zoomedIn) {
      return;
    }

    var xCursor = event.changedTouches[0].clientX;
    var yCursor = event.changedTouches[0].clientY;

    renderer.dragStartX = xCursor;
    renderer.dragStartY = yCursor;
    renderer.zoomContainer.style.transition = "none";
    renderer.animationFrameRequestID = window.requestAnimationFrame(renderer.processDragDelta.bind(renderer));
  },

  handleTouchMove: function handleTouchMove(event) {
    var renderer = this;

    if (event.touches.length > 1) {
      return;
    }

    if (!renderer.zoomedIn) {
      return true;
    }

    // prevent pull-to-refresh
    event.preventDefault();

    renderer.touchmoveChangedTouch = event.changedTouches[0];

    renderer.moveInProgress = true;
  },

  handleTouchEnd: function handleTouchEnd(event) {
    var renderer = this;

    if (event.touches.length > 1) {
      return;
    }

    if (!renderer.zoomedIn) {
      return;
    }

    renderer.zoomContainer.style.transition = "";

    if (!renderer.moveInProgress) {
      return;
    }
    renderer.translateY = renderer.lastTranslateY;
    renderer.translateX = renderer.lastTranslateX;
    renderer.moveInProgress = false;
    renderer.touchmoveChangedTouch = null;
    window.cancelAnimationFrame(renderer.animationFrameRequestID);
  },

  processDragDelta: function processDragDelta() {
    var renderer = this;

    if (!renderer.touchmoveChangedTouch) {
      renderer.animationFrameRequestID = window.requestAnimationFrame(renderer.processDragDelta.bind(renderer));
      return;
    }

    var innerContainer = renderer.innerContainer;

    var xCursor = renderer.touchmoveChangedTouch.clientX;
    var yCursor = renderer.touchmoveChangedTouch.clientY;

    var deltaX = xCursor - renderer.dragStartX;
    var deltaY = yCursor - renderer.dragStartY;

    var translateY = renderer.translateY + deltaY / 2.5;
    var translateX = renderer.translateX + deltaX / 2.5;

    if (translateY > 0.5 * innerContainer.clientHeight - renderer.MARGIN) {
      translateY = 0.5 * innerContainer.clientHeight - renderer.MARGIN;
    }

    if (translateX > 0.5 * innerContainer.clientWidth - renderer.MARGIN) {
      translateX = 0.5 * innerContainer.clientWidth - renderer.MARGIN;
    }

    if (translateY < -0.5 * innerContainer.clientHeight + renderer.MARGIN) {
      translateY = -0.5 * innerContainer.clientHeight + renderer.MARGIN;
    }

    if (translateX < -0.5 * innerContainer.clientWidth + renderer.MARGIN) {
      translateX = -0.5 * innerContainer.clientWidth + renderer.MARGIN;
    }

    renderer.zoomContainer.style.transform = "translate3d(" + 2.5 * translateX + "px, " + 2.5 * translateY + "px, 0) scale3d(2.5, 2.5, 1)";

    renderer.lastTranslateX = translateX;
    renderer.lastTranslateY = translateY;

    renderer.animationFrameRequestID = window.requestAnimationFrame(renderer.processDragDelta.bind(renderer));
  },

  showPossibleMoveAt: function showPossibleMoveAt(intersectionElement, y, x) {
    var renderer = this;
    var boardElement = this.boardElement;
    var zoomContainer = this.zoomContainer;

    renderer.zoomContainerHeight = renderer.zoomContainerHeight || zoomContainer.clientHeight;
    renderer.zoomContainerWidth = renderer.zoomContainerWidth || zoomContainer.clientWidth;

    renderer.touchedPoint = intersectionElement;

    if (_utils2.default.hasClass(boardElement, "tenuki-scaled")) {
      var top = y * (this.INTERSECTION_GAP_SIZE + 1);
      var left = x * (this.INTERSECTION_GAP_SIZE + 1);

      var translateY = 0.5 * renderer.zoomContainerHeight - top - renderer.MARGIN;
      var translateX = 0.5 * renderer.zoomContainerWidth - left - renderer.MARGIN;

      zoomContainer.style.transform = "translate3d(" + 2.5 * translateX + "px, " + 2.5 * translateY + "px, 0) scale3d(2.5, 2.5, 1)";
      renderer.translateY = translateY;
      renderer.translateX = translateX;

      _utils2.default.addClass(renderer.cancelZoomElement, "visible");
      renderer.zoomedIn = true;
    }
  },

  resetTouchedPoint: function resetTouchedPoint() {
    var renderer = this;

    renderer.touchedPoint = null;
  },

  zoomOut: function zoomOut() {
    var renderer = this;

    this.resetTouchedPoint();
    renderer.zoomContainer.style.transform = "";
    renderer.zoomContainer.style.transition = "";
    renderer.dragStartX = null;
    renderer.dragStartY = null;
    renderer.translateY = null;
    renderer.translateX = null;
    renderer.lastTranslateX = null;
    renderer.lastTranslateY = null;

    _utils2.default.removeClass(renderer.cancelZoomElement, "visible");
    renderer.zoomedIn = false;
  },

  render: function render(boardState) {
    var _this = this;

    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        territory = _ref2.territory,
        deadStones = _ref2.deadStones;

    if (!this._initialized) {
      this._setup(boardState);
      this._initialized = true;
    }

    this.resetTouchedPoint();

    this.renderStonesPlayed(boardState.intersections);

    var playedPoint = boardState.playedPoint;

    this.updateMarkerPoints({ playedPoint: playedPoint, koPoint: boardState.koPoint });

    if (this._options["fuzzyStonePlacement"] && playedPoint) {
      var verticalShiftClasses = ["v-shift-up", "v-shift-upup", "v-shift-down", "v-shift-downdown", "v-shift-none"];

      var horizontalShiftClasses = ["h-shift-left", "h-shift-leftleft", "h-shift-right", "h-shift-rightright", "h-shift-none"];

      var shiftClasses = verticalShiftClasses.concat(horizontalShiftClasses);

      var alreadyShifted = shiftClasses.some(function (c) {
        return _utils2.default.hasClass(_this.grid[playedPoint.y][playedPoint.x], c);
      });

      if (!alreadyShifted) {
        var possibleShifts = _utils2.default.cartesianProduct(verticalShiftClasses, horizontalShiftClasses);

        var _possibleShifts$Math$ = _slicedToArray(possibleShifts[Math.floor(Math.random() * possibleShifts.length)], 2),
            playedVerticalShift = _possibleShifts$Math$[0],
            playedHorizontalShift = _possibleShifts$Math$[1];

        [[-1, 0], [0, -1], [0, 1], [1, 0]].forEach(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              y = _ref4[0],
              x = _ref4[1];

          if (_this.grid[playedPoint.y + y] && _this.grid[playedPoint.y + y][playedPoint.x + x]) {
            var neighboringElement = _this.grid[playedPoint.y + y][playedPoint.x + x];

            if (!_utils2.default.hasClass(neighboringElement, "empty")) {
              [[-1, 0, "v-shift-downdown", "v-shift-up", "v-shift-down"], [-1, 0, "v-shift-downdown", "v-shift-upup", "v-shift-none"], [-1, 0, "v-shift-down", "v-shift-upup", "v-shift-none"], [1, 0, "v-shift-upup", "v-shift-down", "v-shift-up"], [1, 0, "v-shift-upup", "v-shift-downdown", "v-shift-none"], [1, 0, "v-shift-up", "v-shift-downdown", "v-shift-none"], [0, -1, "h-shift-rightright", "h-shift-left", "h-shift-right"], [0, -1, "h-shift-rightright", "h-shift-leftleft", "h-shift-none"], [0, -1, "h-shift-right", "h-shift-leftleft", "h-shift-none"], [0, 1, "h-shift-leftleft", "h-shift-right", "h-shift-left"], [0, 1, "h-shift-leftleft", "h-shift-rightright", "h-shift-none"], [0, 1, "h-shift-left", "h-shift-rightright", "h-shift-none"]].forEach(function (_ref5) {
                var _ref6 = _slicedToArray(_ref5, 5),
                    requiredYOffset = _ref6[0],
                    requiredXOffset = _ref6[1],
                    requiredNeighborShift = _ref6[2],
                    conflictingPlayedShift = _ref6[3],
                    newNeighborShift = _ref6[4];

                if (y === requiredYOffset && x === requiredXOffset && _utils2.default.hasClass(neighboringElement, requiredNeighborShift) && (playedVerticalShift === conflictingPlayedShift || playedHorizontalShift === conflictingPlayedShift)) {
                  _utils2.default.removeClass(neighboringElement, requiredNeighborShift);
                  _utils2.default.addClass(neighboringElement, newNeighborShift);
                }
              });
            }
          }
        });

        _utils2.default.addClass(this.grid[playedPoint.y][playedPoint.x], playedVerticalShift);
        _utils2.default.addClass(this.grid[playedPoint.y][playedPoint.x], playedHorizontalShift);
      }
    }

    if (deadStones.length > 0 || territory.black.length > 0 || territory.white.length > 0) {
      this.renderTerritory(territory, deadStones);
    }
  },

  renderStonesPlayed: function renderStonesPlayed(intersections) {
    var _this2 = this;

    intersections.forEach(function (intersection) {
      _this2.renderIntersection(intersection);
    });
  },

  updateMarkerPoints: function updateMarkerPoints(_ref7) {
    var playedPoint = _ref7.playedPoint,
        koPoint = _ref7.koPoint;

    var renderer = this;

    if (koPoint) {
      _utils2.default.addClass(renderer.grid[koPoint.y][koPoint.x], "ko");
    }

    if (playedPoint) {
      _utils2.default.addClass(renderer.grid[playedPoint.y][playedPoint.x], "played");
    }
  },

  renderIntersection: function renderIntersection(intersection) {
    var renderer = this;

    var intersectionEl = renderer.grid[intersection.y][intersection.x];

    var classes = ["intersection"];

    if (intersection.isEmpty()) {
      classes.push("empty");
    } else {
      classes.push("occupied");

      if (intersection.isBlack()) {
        classes.push("black");
      } else {
        classes.push("white");
      }

      var shiftClasses = ["v-shift-up", "v-shift-upup", "v-shift-down", "v-shift-downdown", "v-shift-none", "h-shift-left", "h-shift-leftleft", "h-shift-right", "h-shift-rightright", "h-shift-none"];

      shiftClasses.forEach(function (shiftClass) {
        if (_utils2.default.hasClass(intersectionEl, shiftClass)) {
          classes.push(shiftClass);
        }
      });
    }

    this.setIntersectionClasses(intersectionEl, intersection, classes);
  },

  renderTerritory: function renderTerritory(territory, deadStones) {
    var _this3 = this;

    _utils2.default.flatten(this.grid).forEach(function (element) {
      _utils2.default.removeClass(element, "territory-black");
      _utils2.default.removeClass(element, "territory-white");
      _utils2.default.removeClass(element, "dead");
    });

    deadStones.forEach(function (point) {
      _utils2.default.addClass(_this3.grid[point.y][point.x], "dead");
    });

    territory.black.forEach(function (territoryPoint) {
      _utils2.default.addClass(_this3.grid[territoryPoint.y][territoryPoint.x], "territory-black");
    });

    territory.white.forEach(function (territoryPoint) {
      _utils2.default.addClass(_this3.grid[territoryPoint.y][territoryPoint.x], "territory-white");
    });
  }
};

exports.default = Renderer;

//# sourceMappingURL=renderer.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbmRlcmVyLmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiX3NsaWNlZFRvQXJyYXkiLCJzbGljZUl0ZXJhdG9yIiwiYXJyIiwiaSIsIl9hcnIiLCJfbiIsIl9kIiwiX2UiLCJ1bmRlZmluZWQiLCJfaSIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiX3MiLCJuZXh0IiwiZG9uZSIsInB1c2giLCJsZW5ndGgiLCJlcnIiLCJBcnJheSIsImlzQXJyYXkiLCJUeXBlRXJyb3IiLCJfdXRpbHMiLCJyZXF1aXJlIiwiX3V0aWxzMiIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJvYmoiLCJfX2VzTW9kdWxlIiwiZGVmYXVsdCIsIlJlbmRlcmVyIiwiYm9hcmRFbGVtZW50IiwiX3JlZiIsImhvb2tzIiwib3B0aW9ucyIsIklOVEVSU0VDVElPTl9HQVBfU0laRSIsIkdVVFRFUl9NQVJHSU4iLCJCQVNFX01BUkdJTiIsImhhc0Nvb3JkaW5hdGVzIiwiaGFzQXR0cmlidXRlIiwiTUFSR0lOIiwiZ3JpZCIsIl9vcHRpb25zIiwiX2luaXRpYWxpemVkIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInNtYWxsZXJTdG9uZXMiLCJmbGF0U3RvbmVzIiwiaGFzQ2xhc3MiLCJob3NoaVBvc2l0aW9uc0ZvciIsImJvYXJkU2l6ZSIsImhvc2hpRWxlbWVudHMiLCJob3NoaSIsInRvcCIsImxlZnQiLCJob3NoaU9mZnNldCIsImhvc2hpWSIsImhvc2hpWCIsIl9ob3NoaSIsInByb3RvdHlwZSIsIl9zZXR1cCIsImJvYXJkU3RhdGUiLCJyZW5kZXJlciIsIkJPQVJEX0xFTkdUSCIsImlubmVyQ29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzIiwiYXBwZW5kRWxlbWVudCIsInpvb21Db250YWluZXIiLCJjYW5jZWxab29tRWxlbWVudCIsImNhbmNlbFpvb21CYWNrZHJvcCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0Iiwiem9vbU91dCIsInRocm90dGxlIiwidHlwZSIsIm5hbWUiLCJydW5uaW5nIiwiZnVuYyIsIndpbmRvdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsInNwZWNpZmljUmVuZGVyZXJCb2FyZCIsImdlbmVyYXRlQm9hcmQiLCJzdHlsZSIsIndpbGxDaGFuZ2UiLCJjb21wdXRlU2l6aW5nIiwidG91Y2htb3ZlQ2hhbmdlZFRvdWNoIiwidG91Y2hzdGFydEV2ZW50SGFuZGxlciIsImhhbmRsZVRvdWNoU3RhcnQiLCJiaW5kIiwidG91Y2htb3ZlRXZlbnRIYW5kbGVyIiwiaGFuZGxlVG91Y2hNb3ZlIiwidG91Y2hlbmRFdmVudEhhbmRsZXIiLCJoYW5kbGVUb3VjaEVuZCIsImhlaWdodCIsIndpZHRoIiwidHJhbnNmb3JtIiwiX3RvdWNoRXZlbnRGaXJlZCIsInNjYWxlWCIsInBhcmVudE5vZGUiLCJjbGllbnRXaWR0aCIsInNjYWxlWSIsImNsaWVudEhlaWdodCIsInNjYWxlIiwiTWF0aCIsIm1pbiIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImFkZEludGVyc2VjdGlvbkV2ZW50TGlzdGVuZXJzIiwiZWxlbWVudCIsInkiLCJ4IiwiaG92ZXJlZFlQb3NpdGlvbiIsImhvdmVyZWRYUG9zaXRpb24iLCJob3ZlclZhbHVlIiwicmVzZXRUb3VjaGVkUG9pbnQiLCJwbGF5ZWRZUG9zaXRpb24iLCJwbGF5ZWRYUG9zaXRpb24iLCJkb2N1bWVudCIsImJvZHkiLCJpbm5lcldpZHRoIiwiZ2FtZUlzT3ZlciIsImhhbmRsZUNsaWNrIiwidG91Y2hlZFBvaW50Iiwic2hvd1Bvc3NpYmxlTW92ZUF0IiwidG91Y2hlcyIsInpvb21lZEluIiwieEN1cnNvciIsImNoYW5nZWRUb3VjaGVzIiwiY2xpZW50WCIsInlDdXJzb3IiLCJjbGllbnRZIiwiZHJhZ1N0YXJ0WCIsImRyYWdTdGFydFkiLCJ0cmFuc2l0aW9uIiwiYW5pbWF0aW9uRnJhbWVSZXF1ZXN0SUQiLCJwcm9jZXNzRHJhZ0RlbHRhIiwibW92ZUluUHJvZ3Jlc3MiLCJ0cmFuc2xhdGVZIiwibGFzdFRyYW5zbGF0ZVkiLCJ0cmFuc2xhdGVYIiwibGFzdFRyYW5zbGF0ZVgiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImRlbHRhWCIsImRlbHRhWSIsImludGVyc2VjdGlvbkVsZW1lbnQiLCJ6b29tQ29udGFpbmVySGVpZ2h0Iiwiem9vbUNvbnRhaW5lcldpZHRoIiwicmVuZGVyIiwiX3RoaXMiLCJfcmVmMiIsImFyZ3VtZW50cyIsInRlcnJpdG9yeSIsImRlYWRTdG9uZXMiLCJyZW5kZXJTdG9uZXNQbGF5ZWQiLCJpbnRlcnNlY3Rpb25zIiwicGxheWVkUG9pbnQiLCJ1cGRhdGVNYXJrZXJQb2ludHMiLCJrb1BvaW50IiwidmVydGljYWxTaGlmdENsYXNzZXMiLCJob3Jpem9udGFsU2hpZnRDbGFzc2VzIiwic2hpZnRDbGFzc2VzIiwiY29uY2F0IiwiYWxyZWFkeVNoaWZ0ZWQiLCJzb21lIiwiYyIsInBvc3NpYmxlU2hpZnRzIiwiY2FydGVzaWFuUHJvZHVjdCIsIl9wb3NzaWJsZVNoaWZ0cyRNYXRoJCIsImZsb29yIiwicmFuZG9tIiwicGxheWVkVmVydGljYWxTaGlmdCIsInBsYXllZEhvcml6b250YWxTaGlmdCIsImZvckVhY2giLCJfcmVmMyIsIl9yZWY0IiwibmVpZ2hib3JpbmdFbGVtZW50IiwiX3JlZjUiLCJfcmVmNiIsInJlcXVpcmVkWU9mZnNldCIsInJlcXVpcmVkWE9mZnNldCIsInJlcXVpcmVkTmVpZ2hib3JTaGlmdCIsImNvbmZsaWN0aW5nUGxheWVkU2hpZnQiLCJuZXdOZWlnaGJvclNoaWZ0IiwiYmxhY2siLCJ3aGl0ZSIsInJlbmRlclRlcnJpdG9yeSIsIl90aGlzMiIsImludGVyc2VjdGlvbiIsInJlbmRlckludGVyc2VjdGlvbiIsIl9yZWY3IiwiaW50ZXJzZWN0aW9uRWwiLCJjbGFzc2VzIiwiaXNFbXB0eSIsImlzQmxhY2siLCJzaGlmdENsYXNzIiwic2V0SW50ZXJzZWN0aW9uQ2xhc3NlcyIsIl90aGlzMyIsImZsYXR0ZW4iLCJwb2ludCIsInRlcnJpdG9yeVBvaW50Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQUEsT0FBT0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLFNBQU87QUFEb0MsQ0FBN0M7O0FBSUEsSUFBSUMsaUJBQWlCLFlBQVk7QUFBRSxXQUFTQyxhQUFULENBQXVCQyxHQUF2QixFQUE0QkMsQ0FBNUIsRUFBK0I7QUFBRSxRQUFJQyxPQUFPLEVBQVgsQ0FBZSxJQUFJQyxLQUFLLElBQVQsQ0FBZSxJQUFJQyxLQUFLLEtBQVQsQ0FBZ0IsSUFBSUMsS0FBS0MsU0FBVCxDQUFvQixJQUFJO0FBQUUsV0FBSyxJQUFJQyxLQUFLUCxJQUFJUSxPQUFPQyxRQUFYLEdBQVQsRUFBaUNDLEVBQXRDLEVBQTBDLEVBQUVQLEtBQUssQ0FBQ08sS0FBS0gsR0FBR0ksSUFBSCxFQUFOLEVBQWlCQyxJQUF4QixDQUExQyxFQUF5RVQsS0FBSyxJQUE5RSxFQUFvRjtBQUFFRCxhQUFLVyxJQUFMLENBQVVILEdBQUdiLEtBQWIsRUFBcUIsSUFBSUksS0FBS0MsS0FBS1ksTUFBTCxLQUFnQmIsQ0FBekIsRUFBNEI7QUFBUTtBQUFFLEtBQXZKLENBQXdKLE9BQU9jLEdBQVAsRUFBWTtBQUFFWCxXQUFLLElBQUwsQ0FBV0MsS0FBS1UsR0FBTDtBQUFXLEtBQTVMLFNBQXFNO0FBQUUsVUFBSTtBQUFFLFlBQUksQ0FBQ1osRUFBRCxJQUFPSSxHQUFHLFFBQUgsQ0FBWCxFQUF5QkEsR0FBRyxRQUFIO0FBQWlCLE9BQWhELFNBQXlEO0FBQUUsWUFBSUgsRUFBSixFQUFRLE1BQU1DLEVBQU47QUFBVztBQUFFLEtBQUMsT0FBT0gsSUFBUDtBQUFjLEdBQUMsT0FBTyxVQUFVRixHQUFWLEVBQWVDLENBQWYsRUFBa0I7QUFBRSxRQUFJZSxNQUFNQyxPQUFOLENBQWNqQixHQUFkLENBQUosRUFBd0I7QUFBRSxhQUFPQSxHQUFQO0FBQWEsS0FB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T0FBUixDQUFnQmUsUUFBaEIsQ0FBeUIySixPQUFPOUosSUFBUCxDQUFZZ0ssTUFBTXpGLENBQWxCLEVBQXFCeUYsTUFBTXhGLENBQTNCLENBQXpCLEVBQXdELE1BQXhEO0FBQ0QsS0FGRDs7QUFJQXlDLGNBQVVnQyxLQUFWLENBQWdCWCxPQUFoQixDQUF3QixVQUFVMkIsY0FBVixFQUEwQjtBQUNoRGpMLGNBQVFJLE9BQVIsQ0FBZ0JlLFFBQWhCLENBQXlCMkosT0FBTzlKLElBQVAsQ0FBWWlLLGVBQWUxRixDQUEzQixFQUE4QjBGLGVBQWV6RixDQUE3QyxDQUF6QixFQUEwRSxpQkFBMUU7QUFDRCxLQUZEOztBQUlBeUMsY0FBVWlDLEtBQVYsQ0FBZ0JaLE9BQWhCLENBQXdCLFVBQVUyQixjQUFWLEVBQTBCO0FBQ2hEakwsY0FBUUksT0FBUixDQUFnQmUsUUFBaEIsQ0FBeUIySixPQUFPOUosSUFBUCxDQUFZaUssZUFBZTFGLENBQTNCLEVBQThCMEYsZUFBZXpGLENBQTdDLENBQXpCLEVBQTBFLGlCQUExRTtBQUNELEtBRkQ7QUFHRDtBQTdla0IsQ0FBckI7O0FBZ2ZBakgsUUFBUTZCLE9BQVIsR0FBa0JDLFFBQWxCOztBQUVBIiwiZmlsZSI6InJlbmRlcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfc2xpY2VkVG9BcnJheSA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfSByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IHJldHVybiBhcnI7IH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7IHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7IH0gZWxzZSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpOyB9IH07IH0oKTtcblxudmFyIF91dGlscyA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xuXG52YXIgX3V0aWxzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIFJlbmRlcmVyID0gZnVuY3Rpb24gUmVuZGVyZXIoYm9hcmRFbGVtZW50LCBfcmVmKSB7XG4gIHZhciBob29rcyA9IF9yZWYuaG9va3MsXG4gICAgICBvcHRpb25zID0gX3JlZi5vcHRpb25zO1xuXG4gIHRoaXMuSU5URVJTRUNUSU9OX0dBUF9TSVpFID0gMjg7XG4gIHRoaXMuR1VUVEVSX01BUkdJTiA9IHRoaXMuSU5URVJTRUNUSU9OX0dBUF9TSVpFIC0gMztcbiAgdGhpcy5CQVNFX01BUkdJTiA9IHRoaXMuSU5URVJTRUNUSU9OX0dBUF9TSVpFIC0gMTA7XG4gIHRoaXMuaGFzQ29vcmRpbmF0ZXMgPSBib2FyZEVsZW1lbnQuaGFzQXR0cmlidXRlKFwiZGF0YS1pbmNsdWRlLWNvb3JkaW5hdGVzXCIpO1xuICB0aGlzLk1BUkdJTiA9IHRoaXMuaGFzQ29vcmRpbmF0ZXMgPyB0aGlzLkJBU0VfTUFSR0lOICsgdGhpcy5HVVRURVJfTUFSR0lOIDogdGhpcy5CQVNFX01BUkdJTjtcbiAgdGhpcy5ib2FyZEVsZW1lbnQgPSBib2FyZEVsZW1lbnQ7XG4gIHRoaXMuZ3JpZCA9IFtdO1xuICB0aGlzLmhvb2tzID0gaG9va3MgfHwge307XG4gIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB0aGlzLl9pbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gIGlmICh0aGlzLl9vcHRpb25zW1wiZnV6enlTdG9uZVBsYWNlbWVudFwiXSkge1xuICAgIF91dGlsczIuZGVmYXVsdC5hZGRDbGFzcyhib2FyZEVsZW1lbnQsIFwidGVudWtpLWZ1enp5LXBsYWNlbWVudFwiKTtcbiAgICBfdXRpbHMyLmRlZmF1bHQucmVtb3ZlQ2xhc3MoYm9hcmRFbGVtZW50LCBcInRlbnVraS1ib2FyZC1mbGF0XCIpO1xuICAgIF91dGlsczIuZGVmYXVsdC5hZGRDbGFzcyhib2FyZEVsZW1lbnQsIFwidGVudWtpLWJvYXJkLW5vbmZsYXRcIik7XG4gICAgdGhpcy5zbWFsbGVyU3RvbmVzID0gdHJ1ZTtcbiAgfVxuXG4gIHRoaXMuZmxhdFN0b25lcyA9IF91dGlsczIuZGVmYXVsdC5oYXNDbGFzcyhib2FyZEVsZW1lbnQsIFwidGVudWtpLWJvYXJkLWZsYXRcIik7XG5cbiAgaWYgKCF0aGlzLmZsYXRTdG9uZXMpIHtcbiAgICBfdXRpbHMyLmRlZmF1bHQuYWRkQ2xhc3MoYm9hcmRFbGVtZW50LCBcInRlbnVraS1ib2FyZC1ub25mbGF0XCIpO1xuICB9XG59O1xuXG5SZW5kZXJlci5ob3NoaVBvc2l0aW9uc0ZvciA9IGZ1bmN0aW9uIChib2FyZFNpemUpIHtcbiAgdmFyIGhvc2hpRWxlbWVudHMgPSBbXTtcblxuICBpZiAoYm9hcmRTaXplIDwgNykge1xuICAgIGlmIChib2FyZFNpemUgPiAxICYmIGJvYXJkU2l6ZSAlIDIgPT09IDEpIHtcbiAgICAgIHZhciBob3NoaSA9IHt9O1xuICAgICAgaG9zaGkudG9wID0gKGJvYXJkU2l6ZSAtIDEpIC8gMjtcbiAgICAgIGhvc2hpLmxlZnQgPSBob3NoaS50b3A7XG5cbiAgICAgIGhvc2hpRWxlbWVudHMucHVzaChob3NoaSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG5vIGhvc2hpXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBob3NoaU9mZnNldCA9IGJvYXJkU2l6ZSA+IDExID8gMyA6IDI7XG5cbiAgICBmb3IgKHZhciBob3NoaVkgPSAwOyBob3NoaVkgPCAzOyBob3NoaVkrKykge1xuICAgICAgZm9yICh2YXIgaG9zaGlYID0gMDsgaG9zaGlYIDwgMzsgaG9zaGlYKyspIHtcbiAgICAgICAgaWYgKChib2FyZFNpemUgPT09IDcgfHwgYm9hcmRTaXplICUgMiA9PT0gMCkgJiYgKGhvc2hpWSA9PT0gMSB8fCBob3NoaVggPT09IDEpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgX2hvc2hpID0ge307XG5cbiAgICAgICAgaWYgKGhvc2hpWSA9PT0gMCkge1xuICAgICAgICAgIF9ob3NoaS50b3AgPSBob3NoaU9mZnNldDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChob3NoaVkgPT09IDEpIHtcbiAgICAgICAgICBfaG9zaGkudG9wID0gKGJvYXJkU2l6ZSArIDEpIC8gMiAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaG9zaGlZID09PSAyKSB7XG4gICAgICAgICAgX2hvc2hpLnRvcCA9IGJvYXJkU2l6ZSAtIGhvc2hpT2Zmc2V0IC0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChob3NoaVggPT09IDApIHtcbiAgICAgICAgICBfaG9zaGkubGVmdCA9IGhvc2hpT2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhvc2hpWCA9PT0gMSkge1xuICAgICAgICAgIF9ob3NoaS5sZWZ0ID0gKGJvYXJkU2l6ZSArIDEpIC8gMiAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaG9zaGlYID09PSAyKSB7XG4gICAgICAgICAgX2hvc2hpLmxlZnQgPSBib2FyZFNpemUgLSBob3NoaU9mZnNldCAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICBob3NoaUVsZW1lbnRzLnB1c2goX2hvc2hpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gaG9zaGlFbGVtZW50cztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZSA9IHtcbiAgX3NldHVwOiBmdW5jdGlvbiBfc2V0dXAoYm9hcmRTdGF0ZSkge1xuICAgIHZhciByZW5kZXJlciA9IHRoaXM7XG4gICAgdmFyIGJvYXJkRWxlbWVudCA9IHRoaXMuYm9hcmRFbGVtZW50O1xuXG4gICAgcmVuZGVyZXIuQk9BUkRfTEVOR1RIID0gMiAqIHRoaXMuTUFSR0lOICsgKGJvYXJkU3RhdGUuYm9hcmRTaXplIC0gMSkgKiAodGhpcy5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKTtcblxuICAgIHZhciBpbm5lckNvbnRhaW5lciA9IF91dGlsczIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwidGVudWtpLWlubmVyLWNvbnRhaW5lclwiIH0pO1xuICAgIHJlbmRlcmVyLmlubmVyQ29udGFpbmVyID0gaW5uZXJDb250YWluZXI7XG4gICAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoYm9hcmRFbGVtZW50LCBpbm5lckNvbnRhaW5lcik7XG5cbiAgICB2YXIgem9vbUNvbnRhaW5lciA9IF91dGlsczIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwidGVudWtpLXpvb20tY29udGFpbmVyXCIgfSk7XG4gICAgcmVuZGVyZXIuem9vbUNvbnRhaW5lciA9IHpvb21Db250YWluZXI7XG4gICAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoaW5uZXJDb250YWluZXIsIHpvb21Db250YWluZXIpO1xuXG4gICAgcmVuZGVyZXIuY2FuY2VsWm9vbUVsZW1lbnQgPSBfdXRpbHMyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcImNhbmNlbC16b29tXCIgfSk7XG4gICAgdmFyIGNhbmNlbFpvb21CYWNrZHJvcCA9IF91dGlsczIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwiY2FuY2VsLXpvb20tYmFja2Ryb3BcIiB9KTtcbiAgICBfdXRpbHMyLmRlZmF1bHQuYWRkRXZlbnRMaXN0ZW5lcihyZW5kZXJlci5jYW5jZWxab29tRWxlbWVudCwgXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZW5kZXJlci56b29tT3V0KCk7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICBfdXRpbHMyLmRlZmF1bHQuYWRkRXZlbnRMaXN0ZW5lcihjYW5jZWxab29tQmFja2Ryb3AsIFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmVuZGVyZXIuem9vbU91dCgpO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoaW5uZXJDb250YWluZXIsIHJlbmRlcmVyLmNhbmNlbFpvb21FbGVtZW50KTtcbiAgICBfdXRpbHMyLmRlZmF1bHQuYXBwZW5kRWxlbWVudChpbm5lckNvbnRhaW5lciwgY2FuY2VsWm9vbUJhY2tkcm9wKTtcblxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0V2ZW50cy9yZXNpemVcbiAgICB2YXIgdGhyb3R0bGUgPSBmdW5jdGlvbiB0aHJvdHRsZSh0eXBlLCBuYW1lKSB7XG4gICAgICB2YXIgcnVubmluZyA9IGZhbHNlO1xuICAgICAgdmFyIGZ1bmMgPSBmdW5jdGlvbiBmdW5jKCkge1xuICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJ1bm5pbmcgPSB0cnVlO1xuXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChuYW1lKSk7XG4gICAgICAgICAgcnVubmluZyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBmdW5jKTtcbiAgICB9O1xuXG4gICAgdGhyb3R0bGUoXCJyZXNpemVcIiwgXCJvcHRpbWl6ZWRSZXNpemVcIik7XG5cbiAgICB2YXIgc3BlY2lmaWNSZW5kZXJlckJvYXJkID0gdGhpcy5nZW5lcmF0ZUJvYXJkKGJvYXJkU3RhdGUsIHtcbiAgICAgIGhhc0Nvb3JkaW5hdGVzOiB0aGlzLmhhc0Nvb3JkaW5hdGVzLFxuICAgICAgc21hbGxlclN0b25lczogdGhpcy5zbWFsbGVyU3RvbmVzLFxuICAgICAgZmxhdFN0b25lczogdGhpcy5mbGF0U3RvbmVzXG4gICAgfSk7XG4gICAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoem9vbUNvbnRhaW5lciwgc3BlY2lmaWNSZW5kZXJlckJvYXJkKTtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgLy8gd2UnbGwgcG90ZW50aWFsbHkgYmUgem9vbWluZyBvbiB0b3VjaCBkZXZpY2VzXG4gICAgICB6b29tQ29udGFpbmVyLnN0eWxlLndpbGxDaGFuZ2UgPSBcInRyYW5zZm9ybVwiO1xuXG4gICAgICByZW5kZXJlci5jb21wdXRlU2l6aW5nKCk7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm9wdGltaXplZFJlc2l6ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZW5kZXJlci5jb21wdXRlU2l6aW5nKCk7XG4gICAgfSk7XG5cbiAgICByZW5kZXJlci50b3VjaG1vdmVDaGFuZ2VkVG91Y2ggPSBudWxsO1xuICAgIHJlbmRlcmVyLnRvdWNoc3RhcnRFdmVudEhhbmRsZXIgPSByZW5kZXJlci5oYW5kbGVUb3VjaFN0YXJ0LmJpbmQocmVuZGVyZXIpO1xuICAgIHJlbmRlcmVyLnRvdWNobW92ZUV2ZW50SGFuZGxlciA9IHJlbmRlcmVyLmhhbmRsZVRvdWNoTW92ZS5iaW5kKHJlbmRlcmVyKTtcbiAgICByZW5kZXJlci50b3VjaGVuZEV2ZW50SGFuZGxlciA9IHJlbmRlcmVyLmhhbmRsZVRvdWNoRW5kLmJpbmQocmVuZGVyZXIpO1xuXG4gICAgX3V0aWxzMi5kZWZhdWx0LmFkZEV2ZW50TGlzdGVuZXIocmVuZGVyZXIuaW5uZXJDb250YWluZXIsIFwidG91Y2hzdGFydFwiLCByZW5kZXJlci50b3VjaHN0YXJ0RXZlbnRIYW5kbGVyKTtcbiAgICBfdXRpbHMyLmRlZmF1bHQuYWRkRXZlbnRMaXN0ZW5lcihyZW5kZXJlci5pbm5lckNvbnRhaW5lciwgXCJ0b3VjaGVuZFwiLCByZW5kZXJlci50b3VjaGVuZEV2ZW50SGFuZGxlcik7XG4gICAgX3V0aWxzMi5kZWZhdWx0LmFkZEV2ZW50TGlzdGVuZXIocmVuZGVyZXIuaW5uZXJDb250YWluZXIsIFwidG91Y2htb3ZlXCIsIHJlbmRlcmVyLnRvdWNobW92ZUV2ZW50SGFuZGxlcik7XG4gIH0sXG5cbiAgY29tcHV0ZVNpemluZzogZnVuY3Rpb24gY29tcHV0ZVNpemluZygpIHtcbiAgICB2YXIgcmVuZGVyZXIgPSB0aGlzO1xuICAgIHZhciBpbm5lckNvbnRhaW5lciA9IHRoaXMuaW5uZXJDb250YWluZXI7XG4gICAgdmFyIHpvb21Db250YWluZXIgPSB0aGlzLnpvb21Db250YWluZXI7XG4gICAgdmFyIGJvYXJkRWxlbWVudCA9IHRoaXMuYm9hcmRFbGVtZW50O1xuXG4gICAgLy8gcmVzZXQgZXZlcnl0aGluZyBzbyB3ZSBjYW4gY2FsY3VsYXRlIGFnYWluc3QgbmV3IHZhbHVlc1xuICAgIGlubmVyQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9IFwiXCI7XG4gICAgaW5uZXJDb250YWluZXIuc3R5bGUud2lkdGggPSBcIlwiO1xuICAgIHpvb21Db250YWluZXIuc3R5bGUuaGVpZ2h0ID0gXCJcIjtcbiAgICB6b29tQ29udGFpbmVyLnN0eWxlLndpZHRoID0gXCJcIjtcbiAgICBpbm5lckNvbnRhaW5lci5zdHlsZS50cmFuc2Zvcm0gPSBcIlwiO1xuICAgIC8vIHpvb21Db250YWluZXIuc3R5bGUud2lsbENoYW5nZSA9IFwiXCI7XG4gICAgYm9hcmRFbGVtZW50LnN0eWxlLndpZHRoID0gXCJcIjtcbiAgICBib2FyZEVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gXCJcIjtcblxuICAgIC8vIGRldi1mcmllbmRseSByZXNldCBvZiB3aGV0aGVyIHRoaXMgaXMgYSB0b3VjaCBkZXZpY2VcbiAgICByZW5kZXJlci5fdG91Y2hFdmVudEZpcmVkID0gbnVsbDtcblxuICAgIGlubmVyQ29udGFpbmVyLnN0eWxlLndpZHRoID0gcmVuZGVyZXIuQk9BUkRfTEVOR1RIICsgXCJweFwiO1xuICAgIGlubmVyQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9IHJlbmRlcmVyLkJPQVJEX0xFTkdUSCArIFwicHhcIjtcblxuICAgIHpvb21Db250YWluZXIuc3R5bGUud2lkdGggPSByZW5kZXJlci5CT0FSRF9MRU5HVEggKyBcInB4XCI7XG4gICAgem9vbUNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSByZW5kZXJlci5CT0FSRF9MRU5HVEggKyBcInB4XCI7XG5cbiAgICB2YXIgc2NhbGVYID0gaW5uZXJDb250YWluZXIucGFyZW50Tm9kZS5jbGllbnRXaWR0aCAvIGlubmVyQ29udGFpbmVyLmNsaWVudFdpZHRoO1xuICAgIHZhciBzY2FsZVkgPSBpbm5lckNvbnRhaW5lci5wYXJlbnROb2RlLmNsaWVudEhlaWdodCAvIGlubmVyQ29udGFpbmVyLmNsaWVudEhlaWdodDtcbiAgICB2YXIgc2NhbGUgPSBNYXRoLm1pbihzY2FsZVgsIHNjYWxlWSk7XG5cbiAgICBpZiAoc2NhbGUgPiAwKSB7XG4gICAgICBpZiAoc2NhbGUgPCAxKSB7XG4gICAgICAgIF91dGlsczIuZGVmYXVsdC5hZGRDbGFzcyhib2FyZEVsZW1lbnQsIFwidGVudWtpLXNjYWxlZFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF91dGlsczIuZGVmYXVsdC5yZW1vdmVDbGFzcyhib2FyZEVsZW1lbnQsIFwidGVudWtpLXNjYWxlZFwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNjYWxlIDwgMSB8fCBzY2FsZSA+IDEpIHtcbiAgICAgICAgaW5uZXJDb250YWluZXIuc3R5bGVbXCJ0cmFuc2Zvcm0tb3JpZ2luXCJdID0gXCJ0b3AgbGVmdFwiO1xuICAgICAgICBpbm5lckNvbnRhaW5lci5zdHlsZS50cmFuc2Zvcm0gPSBcInNjYWxlM2QoXCIgKyBzY2FsZSArIFwiLCBcIiArIHNjYWxlICsgXCIsIDEpXCI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmVzZXQgdGhlIG91dGVyIGVsZW1lbnQncyBoZWlnaHQgdG8gbWF0Y2gsIGVuc3VyaW5nIHRoYXQgd2UgZnJlZSB1cCBhbnkgbGluZ2VyaW5nIHdoaXRlc3BhY2VcbiAgICBib2FyZEVsZW1lbnQuc3R5bGUud2lkdGggPSBpbm5lckNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCArIFwicHhcIjtcbiAgICBib2FyZEVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gaW5uZXJDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0ICsgXCJweFwiO1xuXG4gICAgLy8gV29yayBhcm91bmQgbGFjayBvZiByZS1yYXN0ZXIgaW4gQ2hyb21lLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3czYy9jc3N3Zy1kcmFmdHMvaXNzdWVzLzIzNlxuICAgIC8vIGFuZCBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD02MDA0ODIgZm9yIG1vcmVcbiAgICAvLyBpbmZvcm1hdGlvbi4gVGhpcyBpcyBwcmV2ZW50aW5nLCBlLmcuLCBob3Jpem9udGFsL3ZlcnRpY2FsIGxpbmUgd2lkdGhcbiAgICAvLyBtaXNtYXRjaGVzIGFmdGVyIHNjYWxpbmcuIEJ5IGFkZGluZyB0aGlzLCBsaW5lcyBhcmUgcmUtcmFzdGVyZWQgYW5kIGFyZVxuICAgIC8vIGFsbCB0aGUgc2FtZSB3aWR0aCwgYXMgaWYgdGhlIHVzZXIgaGFkIGhpdCByZWZyZXNoIGF0IHRoZSBuZXcgdmlld3BvcnRcbiAgICAvLyBzaXplLlxuICAgIHpvb21Db250YWluZXIuc3R5bGUud2lsbENoYW5nZSA9IFwiXCI7XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgIHpvb21Db250YWluZXIuc3R5bGUud2lsbENoYW5nZSA9IFwidHJhbnNmb3JtXCI7XG4gICAgfSk7XG4gIH0sXG5cbiAgYWRkSW50ZXJzZWN0aW9uRXZlbnRMaXN0ZW5lcnM6IGZ1bmN0aW9uIGFkZEludGVyc2VjdGlvbkV2ZW50TGlzdGVuZXJzKGVsZW1lbnQsIHksIHgpIHtcbiAgICB2YXIgcmVuZGVyZXIgPSB0aGlzO1xuXG4gICAgX3V0aWxzMi5kZWZhdWx0LmFkZEV2ZW50TGlzdGVuZXIoZWxlbWVudCwgXCJtb3VzZWVudGVyXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBob3ZlcmVkWVBvc2l0aW9uID0geTtcbiAgICAgIHZhciBob3ZlcmVkWFBvc2l0aW9uID0geDtcbiAgICAgIHZhciBob3ZlclZhbHVlID0gcmVuZGVyZXIuaG9va3MuaG92ZXJWYWx1ZShob3ZlcmVkWVBvc2l0aW9uLCBob3ZlcmVkWFBvc2l0aW9uKTtcblxuICAgICAgaWYgKGhvdmVyVmFsdWUpIHtcbiAgICAgICAgX3V0aWxzMi5kZWZhdWx0LmFkZENsYXNzKGVsZW1lbnQsIFwiaG92ZXJlZFwiKTtcbiAgICAgICAgX3V0aWxzMi5kZWZhdWx0LmFkZENsYXNzKGVsZW1lbnQsIGhvdmVyVmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgX3V0aWxzMi5kZWZhdWx0LmFkZEV2ZW50TGlzdGVuZXIoZWxlbWVudCwgXCJtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChfdXRpbHMyLmRlZmF1bHQuaGFzQ2xhc3ModGhpcywgXCJob3ZlcmVkXCIpKSB7XG4gICAgICAgIF91dGlsczIuZGVmYXVsdC5yZW1vdmVDbGFzcyhlbGVtZW50LCBcImhvdmVyZWRcIik7XG4gICAgICAgIF91dGlsczIuZGVmYXVsdC5yZW1vdmVDbGFzcyhlbGVtZW50LCBcImJsYWNrXCIpO1xuICAgICAgICBfdXRpbHMyLmRlZmF1bHQucmVtb3ZlQ2xhc3MoZWxlbWVudCwgXCJ3aGl0ZVwiKTtcbiAgICAgIH1cblxuICAgICAgcmVuZGVyZXIucmVzZXRUb3VjaGVkUG9pbnQoKTtcbiAgICB9KTtcblxuICAgIF91dGlsczIuZGVmYXVsdC5hZGRFdmVudExpc3RlbmVyKGVsZW1lbnQsIFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHBsYXllZFlQb3NpdGlvbiA9IHk7XG4gICAgICB2YXIgcGxheWVkWFBvc2l0aW9uID0geDtcblxuICAgICAgLy8gaWYgdGhpcyBpc24ndCBwYXJ0IG9mIGEgdG91Y2gsXG4gICAgICAvLyBvciBpdCBpcyBhbmQgdGhlIHVzZXIgaXMgem9vbWVkIGluLFxuICAgICAgLy8gb3IgaXQncyBnYW1lIG92ZXIgYW5kIHdlJ3JlIG1hcmtpbmcgc3RvbmVzIGRlYWQsXG4gICAgICAvLyB0aGVuIGRvbid0IHVzZSB0aGUgem9vbS9kb3VibGUtc2VsZWN0IHN5c3RlbS5cbiAgICAgIGlmICghcmVuZGVyZXIuX3RvdWNoRXZlbnRGaXJlZCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoIC8gd2luZG93LmlubmVyV2lkdGggPiAxIHx8IHJlbmRlcmVyLmhvb2tzLmdhbWVJc092ZXIoKSkge1xuICAgICAgICByZW5kZXJlci5ob29rcy5oYW5kbGVDbGljayhwbGF5ZWRZUG9zaXRpb24sIHBsYXllZFhQb3NpdGlvbik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlbmRlcmVyLnRvdWNoZWRQb2ludCkge1xuICAgICAgICBpZiAoZWxlbWVudCA9PT0gcmVuZGVyZXIudG91Y2hlZFBvaW50KSB7XG4gICAgICAgICAgcmVuZGVyZXIuaG9va3MuaGFuZGxlQ2xpY2socGxheWVkWVBvc2l0aW9uLCBwbGF5ZWRYUG9zaXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlbmRlcmVyLnNob3dQb3NzaWJsZU1vdmVBdChlbGVtZW50LCBwbGF5ZWRZUG9zaXRpb24sIHBsYXllZFhQb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlbmRlcmVyLnNob3dQb3NzaWJsZU1vdmVBdChlbGVtZW50LCBwbGF5ZWRZUG9zaXRpb24sIHBsYXllZFhQb3NpdGlvbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgaGFuZGxlVG91Y2hTdGFydDogZnVuY3Rpb24gaGFuZGxlVG91Y2hTdGFydChldmVudCkge1xuICAgIHZhciByZW5kZXJlciA9IHRoaXM7XG4gICAgcmVuZGVyZXIuX3RvdWNoRXZlbnRGaXJlZCA9IHRydWU7XG5cbiAgICBpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPiAxKSB7XG4gICAgICBpZiAocmVuZGVyZXIuem9vbWVkSW4pIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXJlbmRlcmVyLnpvb21lZEluKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHhDdXJzb3IgPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYO1xuICAgIHZhciB5Q3Vyc29yID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WTtcblxuICAgIHJlbmRlcmVyLmRyYWdTdGFydFggPSB4Q3Vyc29yO1xuICAgIHJlbmRlcmVyLmRyYWdTdGFydFkgPSB5Q3Vyc29yO1xuICAgIHJlbmRlcmVyLnpvb21Db250YWluZXIuc3R5bGUudHJhbnNpdGlvbiA9IFwibm9uZVwiO1xuICAgIHJlbmRlcmVyLmFuaW1hdGlvbkZyYW1lUmVxdWVzdElEID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXJlci5wcm9jZXNzRHJhZ0RlbHRhLmJpbmQocmVuZGVyZXIpKTtcbiAgfSxcblxuICBoYW5kbGVUb3VjaE1vdmU6IGZ1bmN0aW9uIGhhbmRsZVRvdWNoTW92ZShldmVudCkge1xuICAgIHZhciByZW5kZXJlciA9IHRoaXM7XG5cbiAgICBpZiAoZXZlbnQudG91Y2hlcy5sZW5ndGggPiAxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFyZW5kZXJlci56b29tZWRJbikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gcHJldmVudCBwdWxsLXRvLXJlZnJlc2hcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgcmVuZGVyZXIudG91Y2htb3ZlQ2hhbmdlZFRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG5cbiAgICByZW5kZXJlci5tb3ZlSW5Qcm9ncmVzcyA9IHRydWU7XG4gIH0sXG5cbiAgaGFuZGxlVG91Y2hFbmQ6IGZ1bmN0aW9uIGhhbmRsZVRvdWNoRW5kKGV2ZW50KSB7XG4gICAgdmFyIHJlbmRlcmVyID0gdGhpcztcblxuICAgIGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXJlbmRlcmVyLnpvb21lZEluKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmVuZGVyZXIuem9vbUNvbnRhaW5lci5zdHlsZS50cmFuc2l0aW9uID0gXCJcIjtcblxuICAgIGlmICghcmVuZGVyZXIubW92ZUluUHJvZ3Jlc3MpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmVuZGVyZXIudHJhbnNsYXRlWSA9IHJlbmRlcmVyLmxhc3RUcmFuc2xhdGVZO1xuICAgIHJlbmRlcmVyLnRyYW5zbGF0ZVggPSByZW5kZXJlci5sYXN0VHJhbnNsYXRlWDtcbiAgICByZW5kZXJlci5tb3ZlSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgIHJlbmRlcmVyLnRvdWNobW92ZUNoYW5nZWRUb3VjaCA9IG51bGw7XG4gICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHJlbmRlcmVyLmFuaW1hdGlvbkZyYW1lUmVxdWVzdElEKTtcbiAgfSxcblxuICBwcm9jZXNzRHJhZ0RlbHRhOiBmdW5jdGlvbiBwcm9jZXNzRHJhZ0RlbHRhKCkge1xuICAgIHZhciByZW5kZXJlciA9IHRoaXM7XG5cbiAgICBpZiAoIXJlbmRlcmVyLnRvdWNobW92ZUNoYW5nZWRUb3VjaCkge1xuICAgICAgcmVuZGVyZXIuYW5pbWF0aW9uRnJhbWVSZXF1ZXN0SUQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcmVyLnByb2Nlc3NEcmFnRGVsdGEuYmluZChyZW5kZXJlcikpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBpbm5lckNvbnRhaW5lciA9IHJlbmRlcmVyLmlubmVyQ29udGFpbmVyO1xuXG4gICAgdmFyIHhDdXJzb3IgPSByZW5kZXJlci50b3VjaG1vdmVDaGFuZ2VkVG91Y2guY2xpZW50WDtcbiAgICB2YXIgeUN1cnNvciA9IHJlbmRlcmVyLnRvdWNobW92ZUNoYW5nZWRUb3VjaC5jbGllbnRZO1xuXG4gICAgdmFyIGRlbHRhWCA9IHhDdXJzb3IgLSByZW5kZXJlci5kcmFnU3RhcnRYO1xuICAgIHZhciBkZWx0YVkgPSB5Q3Vyc29yIC0gcmVuZGVyZXIuZHJhZ1N0YXJ0WTtcblxuICAgIHZhciB0cmFuc2xhdGVZID0gcmVuZGVyZXIudHJhbnNsYXRlWSArIGRlbHRhWSAvIDIuNTtcbiAgICB2YXIgdHJhbnNsYXRlWCA9IHJlbmRlcmVyLnRyYW5zbGF0ZVggKyBkZWx0YVggLyAyLjU7XG5cbiAgICBpZiAodHJhbnNsYXRlWSA+IDAuNSAqIGlubmVyQ29udGFpbmVyLmNsaWVudEhlaWdodCAtIHJlbmRlcmVyLk1BUkdJTikge1xuICAgICAgdHJhbnNsYXRlWSA9IDAuNSAqIGlubmVyQ29udGFpbmVyLmNsaWVudEhlaWdodCAtIHJlbmRlcmVyLk1BUkdJTjtcbiAgICB9XG5cbiAgICBpZiAodHJhbnNsYXRlWCA+IDAuNSAqIGlubmVyQ29udGFpbmVyLmNsaWVudFdpZHRoIC0gcmVuZGVyZXIuTUFSR0lOKSB7XG4gICAgICB0cmFuc2xhdGVYID0gMC41ICogaW5uZXJDb250YWluZXIuY2xpZW50V2lkdGggLSByZW5kZXJlci5NQVJHSU47XG4gICAgfVxuXG4gICAgaWYgKHRyYW5zbGF0ZVkgPCAtMC41ICogaW5uZXJDb250YWluZXIuY2xpZW50SGVpZ2h0ICsgcmVuZGVyZXIuTUFSR0lOKSB7XG4gICAgICB0cmFuc2xhdGVZID0gLTAuNSAqIGlubmVyQ29udGFpbmVyLmNsaWVudEhlaWdodCArIHJlbmRlcmVyLk1BUkdJTjtcbiAgICB9XG5cbiAgICBpZiAodHJhbnNsYXRlWCA8IC0wLjUgKiBpbm5lckNvbnRhaW5lci5jbGllbnRXaWR0aCArIHJlbmRlcmVyLk1BUkdJTikge1xuICAgICAgdHJhbnNsYXRlWCA9IC0wLjUgKiBpbm5lckNvbnRhaW5lci5jbGllbnRXaWR0aCArIHJlbmRlcmVyLk1BUkdJTjtcbiAgICB9XG5cbiAgICByZW5kZXJlci56b29tQ29udGFpbmVyLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlM2QoXCIgKyAyLjUgKiB0cmFuc2xhdGVYICsgXCJweCwgXCIgKyAyLjUgKiB0cmFuc2xhdGVZICsgXCJweCwgMCkgc2NhbGUzZCgyLjUsIDIuNSwgMSlcIjtcblxuICAgIHJlbmRlcmVyLmxhc3RUcmFuc2xhdGVYID0gdHJhbnNsYXRlWDtcbiAgICByZW5kZXJlci5sYXN0VHJhbnNsYXRlWSA9IHRyYW5zbGF0ZVk7XG5cbiAgICByZW5kZXJlci5hbmltYXRpb25GcmFtZVJlcXVlc3RJRCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyZXIucHJvY2Vzc0RyYWdEZWx0YS5iaW5kKHJlbmRlcmVyKSk7XG4gIH0sXG5cbiAgc2hvd1Bvc3NpYmxlTW92ZUF0OiBmdW5jdGlvbiBzaG93UG9zc2libGVNb3ZlQXQoaW50ZXJzZWN0aW9uRWxlbWVudCwgeSwgeCkge1xuICAgIHZhciByZW5kZXJlciA9IHRoaXM7XG4gICAgdmFyIGJvYXJkRWxlbWVudCA9IHRoaXMuYm9hcmRFbGVtZW50O1xuICAgIHZhciB6b29tQ29udGFpbmVyID0gdGhpcy56b29tQ29udGFpbmVyO1xuXG4gICAgcmVuZGVyZXIuem9vbUNvbnRhaW5lckhlaWdodCA9IHJlbmRlcmVyLnpvb21Db250YWluZXJIZWlnaHQgfHwgem9vbUNvbnRhaW5lci5jbGllbnRIZWlnaHQ7XG4gICAgcmVuZGVyZXIuem9vbUNvbnRhaW5lcldpZHRoID0gcmVuZGVyZXIuem9vbUNvbnRhaW5lcldpZHRoIHx8IHpvb21Db250YWluZXIuY2xpZW50V2lkdGg7XG5cbiAgICByZW5kZXJlci50b3VjaGVkUG9pbnQgPSBpbnRlcnNlY3Rpb25FbGVtZW50O1xuXG4gICAgaWYgKF91dGlsczIuZGVmYXVsdC5oYXNDbGFzcyhib2FyZEVsZW1lbnQsIFwidGVudWtpLXNjYWxlZFwiKSkge1xuICAgICAgdmFyIHRvcCA9IHkgKiAodGhpcy5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKTtcbiAgICAgIHZhciBsZWZ0ID0geCAqICh0aGlzLklOVEVSU0VDVElPTl9HQVBfU0laRSArIDEpO1xuXG4gICAgICB2YXIgdHJhbnNsYXRlWSA9IDAuNSAqIHJlbmRlcmVyLnpvb21Db250YWluZXJIZWlnaHQgLSB0b3AgLSByZW5kZXJlci5NQVJHSU47XG4gICAgICB2YXIgdHJhbnNsYXRlWCA9IDAuNSAqIHJlbmRlcmVyLnpvb21Db250YWluZXJXaWR0aCAtIGxlZnQgLSByZW5kZXJlci5NQVJHSU47XG5cbiAgICAgIHpvb21Db250YWluZXIuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUzZChcIiArIDIuNSAqIHRyYW5zbGF0ZVggKyBcInB4LCBcIiArIDIuNSAqIHRyYW5zbGF0ZVkgKyBcInB4LCAwKSBzY2FsZTNkKDIuNSwgMi41LCAxKVwiO1xuICAgICAgcmVuZGVyZXIudHJhbnNsYXRlWSA9IHRyYW5zbGF0ZVk7XG4gICAgICByZW5kZXJlci50cmFuc2xhdGVYID0gdHJhbnNsYXRlWDtcblxuICAgICAgX3V0aWxzMi5kZWZhdWx0LmFkZENsYXNzKHJlbmRlcmVyLmNhbmNlbFpvb21FbGVtZW50LCBcInZpc2libGVcIik7XG4gICAgICByZW5kZXJlci56b29tZWRJbiA9IHRydWU7XG4gICAgfVxuICB9LFxuXG4gIHJlc2V0VG91Y2hlZFBvaW50OiBmdW5jdGlvbiByZXNldFRvdWNoZWRQb2ludCgpIHtcbiAgICB2YXIgcmVuZGVyZXIgPSB0aGlzO1xuXG4gICAgcmVuZGVyZXIudG91Y2hlZFBvaW50ID0gbnVsbDtcbiAgfSxcblxuICB6b29tT3V0OiBmdW5jdGlvbiB6b29tT3V0KCkge1xuICAgIHZhciByZW5kZXJlciA9IHRoaXM7XG5cbiAgICB0aGlzLnJlc2V0VG91Y2hlZFBvaW50KCk7XG4gICAgcmVuZGVyZXIuem9vbUNvbnRhaW5lci5zdHlsZS50cmFuc2Zvcm0gPSBcIlwiO1xuICAgIHJlbmRlcmVyLnpvb21Db250YWluZXIuc3R5bGUudHJhbnNpdGlvbiA9IFwiXCI7XG4gICAgcmVuZGVyZXIuZHJhZ1N0YXJ0WCA9IG51bGw7XG4gICAgcmVuZGVyZXIuZHJhZ1N0YXJ0WSA9IG51bGw7XG4gICAgcmVuZGVyZXIudHJhbnNsYXRlWSA9IG51bGw7XG4gICAgcmVuZGVyZXIudHJhbnNsYXRlWCA9IG51bGw7XG4gICAgcmVuZGVyZXIubGFzdFRyYW5zbGF0ZVggPSBudWxsO1xuICAgIHJlbmRlcmVyLmxhc3RUcmFuc2xhdGVZID0gbnVsbDtcblxuICAgIF91dGlsczIuZGVmYXVsdC5yZW1vdmVDbGFzcyhyZW5kZXJlci5jYW5jZWxab29tRWxlbWVudCwgXCJ2aXNpYmxlXCIpO1xuICAgIHJlbmRlcmVyLnpvb21lZEluID0gZmFsc2U7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoYm9hcmRTdGF0ZSkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB2YXIgX3JlZjIgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9LFxuICAgICAgICB0ZXJyaXRvcnkgPSBfcmVmMi50ZXJyaXRvcnksXG4gICAgICAgIGRlYWRTdG9uZXMgPSBfcmVmMi5kZWFkU3RvbmVzO1xuXG4gICAgaWYgKCF0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5fc2V0dXAoYm9hcmRTdGF0ZSk7XG4gICAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5yZXNldFRvdWNoZWRQb2ludCgpO1xuXG4gICAgdGhpcy5yZW5kZXJTdG9uZXNQbGF5ZWQoYm9hcmRTdGF0ZS5pbnRlcnNlY3Rpb25zKTtcblxuICAgIHZhciBwbGF5ZWRQb2ludCA9IGJvYXJkU3RhdGUucGxheWVkUG9pbnQ7XG5cbiAgICB0aGlzLnVwZGF0ZU1hcmtlclBvaW50cyh7IHBsYXllZFBvaW50OiBwbGF5ZWRQb2ludCwga29Qb2ludDogYm9hcmRTdGF0ZS5rb1BvaW50IH0pO1xuXG4gICAgaWYgKHRoaXMuX29wdGlvbnNbXCJmdXp6eVN0b25lUGxhY2VtZW50XCJdICYmIHBsYXllZFBvaW50KSB7XG4gICAgICB2YXIgdmVydGljYWxTaGlmdENsYXNzZXMgPSBbXCJ2LXNoaWZ0LXVwXCIsIFwidi1zaGlmdC11cHVwXCIsIFwidi1zaGlmdC1kb3duXCIsIFwidi1zaGlmdC1kb3duZG93blwiLCBcInYtc2hpZnQtbm9uZVwiXTtcblxuICAgICAgdmFyIGhvcml6b250YWxTaGlmdENsYXNzZXMgPSBbXCJoLXNoaWZ0LWxlZnRcIiwgXCJoLXNoaWZ0LWxlZnRsZWZ0XCIsIFwiaC1zaGlmdC1yaWdodFwiLCBcImgtc2hpZnQtcmlnaHRyaWdodFwiLCBcImgtc2hpZnQtbm9uZVwiXTtcblxuICAgICAgdmFyIHNoaWZ0Q2xhc3NlcyA9IHZlcnRpY2FsU2hpZnRDbGFzc2VzLmNvbmNhdChob3Jpem9udGFsU2hpZnRDbGFzc2VzKTtcblxuICAgICAgdmFyIGFscmVhZHlTaGlmdGVkID0gc2hpZnRDbGFzc2VzLnNvbWUoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgcmV0dXJuIF91dGlsczIuZGVmYXVsdC5oYXNDbGFzcyhfdGhpcy5ncmlkW3BsYXllZFBvaW50LnldW3BsYXllZFBvaW50LnhdLCBjKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIWFscmVhZHlTaGlmdGVkKSB7XG4gICAgICAgIHZhciBwb3NzaWJsZVNoaWZ0cyA9IF91dGlsczIuZGVmYXVsdC5jYXJ0ZXNpYW5Qcm9kdWN0KHZlcnRpY2FsU2hpZnRDbGFzc2VzLCBob3Jpem9udGFsU2hpZnRDbGFzc2VzKTtcblxuICAgICAgICB2YXIgX3Bvc3NpYmxlU2hpZnRzJE1hdGgkID0gX3NsaWNlZFRvQXJyYXkocG9zc2libGVTaGlmdHNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGVTaGlmdHMubGVuZ3RoKV0sIDIpLFxuICAgICAgICAgICAgcGxheWVkVmVydGljYWxTaGlmdCA9IF9wb3NzaWJsZVNoaWZ0cyRNYXRoJFswXSxcbiAgICAgICAgICAgIHBsYXllZEhvcml6b250YWxTaGlmdCA9IF9wb3NzaWJsZVNoaWZ0cyRNYXRoJFsxXTtcblxuICAgICAgICBbWy0xLCAwXSwgWzAsIC0xXSwgWzAsIDFdLCBbMSwgMF1dLmZvckVhY2goZnVuY3Rpb24gKF9yZWYzKSB7XG4gICAgICAgICAgdmFyIF9yZWY0ID0gX3NsaWNlZFRvQXJyYXkoX3JlZjMsIDIpLFxuICAgICAgICAgICAgICB5ID0gX3JlZjRbMF0sXG4gICAgICAgICAgICAgIHggPSBfcmVmNFsxXTtcblxuICAgICAgICAgIGlmIChfdGhpcy5ncmlkW3BsYXllZFBvaW50LnkgKyB5XSAmJiBfdGhpcy5ncmlkW3BsYXllZFBvaW50LnkgKyB5XVtwbGF5ZWRQb2ludC54ICsgeF0pIHtcbiAgICAgICAgICAgIHZhciBuZWlnaGJvcmluZ0VsZW1lbnQgPSBfdGhpcy5ncmlkW3BsYXllZFBvaW50LnkgKyB5XVtwbGF5ZWRQb2ludC54ICsgeF07XG5cbiAgICAgICAgICAgIGlmICghX3V0aWxzMi5kZWZhdWx0Lmhhc0NsYXNzKG5laWdoYm9yaW5nRWxlbWVudCwgXCJlbXB0eVwiKSkge1xuICAgICAgICAgICAgICBbWy0xLCAwLCBcInYtc2hpZnQtZG93bmRvd25cIiwgXCJ2LXNoaWZ0LXVwXCIsIFwidi1zaGlmdC1kb3duXCJdLCBbLTEsIDAsIFwidi1zaGlmdC1kb3duZG93blwiLCBcInYtc2hpZnQtdXB1cFwiLCBcInYtc2hpZnQtbm9uZVwiXSwgWy0xLCAwLCBcInYtc2hpZnQtZG93blwiLCBcInYtc2hpZnQtdXB1cFwiLCBcInYtc2hpZnQtbm9uZVwiXSwgWzEsIDAsIFwidi1zaGlmdC11cHVwXCIsIFwidi1zaGlmdC1kb3duXCIsIFwidi1zaGlmdC11cFwiXSwgWzEsIDAsIFwidi1zaGlmdC11cHVwXCIsIFwidi1zaGlmdC1kb3duZG93blwiLCBcInYtc2hpZnQtbm9uZVwiXSwgWzEsIDAsIFwidi1zaGlmdC11cFwiLCBcInYtc2hpZnQtZG93bmRvd25cIiwgXCJ2LXNoaWZ0LW5vbmVcIl0sIFswLCAtMSwgXCJoLXNoaWZ0LXJpZ2h0cmlnaHRcIiwgXCJoLXNoaWZ0LWxlZnRcIiwgXCJoLXNoaWZ0LXJpZ2h0XCJdLCBbMCwgLTEsIFwiaC1zaGlmdC1yaWdodHJpZ2h0XCIsIFwiaC1zaGlmdC1sZWZ0bGVmdFwiLCBcImgtc2hpZnQtbm9uZVwiXSwgWzAsIC0xLCBcImgtc2hpZnQtcmlnaHRcIiwgXCJoLXNoaWZ0LWxlZnRsZWZ0XCIsIFwiaC1zaGlmdC1ub25lXCJdLCBbMCwgMSwgXCJoLXNoaWZ0LWxlZnRsZWZ0XCIsIFwiaC1zaGlmdC1yaWdodFwiLCBcImgtc2hpZnQtbGVmdFwiXSwgWzAsIDEsIFwiaC1zaGlmdC1sZWZ0bGVmdFwiLCBcImgtc2hpZnQtcmlnaHRyaWdodFwiLCBcImgtc2hpZnQtbm9uZVwiXSwgWzAsIDEsIFwiaC1zaGlmdC1sZWZ0XCIsIFwiaC1zaGlmdC1yaWdodHJpZ2h0XCIsIFwiaC1zaGlmdC1ub25lXCJdXS5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmNSkge1xuICAgICAgICAgICAgICAgIHZhciBfcmVmNiA9IF9zbGljZWRUb0FycmF5KF9yZWY1LCA1KSxcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWRZT2Zmc2V0ID0gX3JlZjZbMF0sXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkWE9mZnNldCA9IF9yZWY2WzFdLFxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZE5laWdoYm9yU2hpZnQgPSBfcmVmNlsyXSxcbiAgICAgICAgICAgICAgICAgICAgY29uZmxpY3RpbmdQbGF5ZWRTaGlmdCA9IF9yZWY2WzNdLFxuICAgICAgICAgICAgICAgICAgICBuZXdOZWlnaGJvclNoaWZ0ID0gX3JlZjZbNF07XG5cbiAgICAgICAgICAgICAgICBpZiAoeSA9PT0gcmVxdWlyZWRZT2Zmc2V0ICYmIHggPT09IHJlcXVpcmVkWE9mZnNldCAmJiBfdXRpbHMyLmRlZmF1bHQuaGFzQ2xhc3MobmVpZ2hib3JpbmdFbGVtZW50LCByZXF1aXJlZE5laWdoYm9yU2hpZnQpICYmIChwbGF5ZWRWZXJ0aWNhbFNoaWZ0ID09PSBjb25mbGljdGluZ1BsYXllZFNoaWZ0IHx8IHBsYXllZEhvcml6b250YWxTaGlmdCA9PT0gY29uZmxpY3RpbmdQbGF5ZWRTaGlmdCkpIHtcbiAgICAgICAgICAgICAgICAgIF91dGlsczIuZGVmYXVsdC5yZW1vdmVDbGFzcyhuZWlnaGJvcmluZ0VsZW1lbnQsIHJlcXVpcmVkTmVpZ2hib3JTaGlmdCk7XG4gICAgICAgICAgICAgICAgICBfdXRpbHMyLmRlZmF1bHQuYWRkQ2xhc3MobmVpZ2hib3JpbmdFbGVtZW50LCBuZXdOZWlnaGJvclNoaWZ0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgX3V0aWxzMi5kZWZhdWx0LmFkZENsYXNzKHRoaXMuZ3JpZFtwbGF5ZWRQb2ludC55XVtwbGF5ZWRQb2ludC54XSwgcGxheWVkVmVydGljYWxTaGlmdCk7XG4gICAgICAgIF91dGlsczIuZGVmYXVsdC5hZGRDbGFzcyh0aGlzLmdyaWRbcGxheWVkUG9pbnQueV1bcGxheWVkUG9pbnQueF0sIHBsYXllZEhvcml6b250YWxTaGlmdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGRlYWRTdG9uZXMubGVuZ3RoID4gMCB8fCB0ZXJyaXRvcnkuYmxhY2subGVuZ3RoID4gMCB8fCB0ZXJyaXRvcnkud2hpdGUubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5yZW5kZXJUZXJyaXRvcnkodGVycml0b3J5LCBkZWFkU3RvbmVzKTtcbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyU3RvbmVzUGxheWVkOiBmdW5jdGlvbiByZW5kZXJTdG9uZXNQbGF5ZWQoaW50ZXJzZWN0aW9ucykge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgaW50ZXJzZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChpbnRlcnNlY3Rpb24pIHtcbiAgICAgIF90aGlzMi5yZW5kZXJJbnRlcnNlY3Rpb24oaW50ZXJzZWN0aW9uKTtcbiAgICB9KTtcbiAgfSxcblxuICB1cGRhdGVNYXJrZXJQb2ludHM6IGZ1bmN0aW9uIHVwZGF0ZU1hcmtlclBvaW50cyhfcmVmNykge1xuICAgIHZhciBwbGF5ZWRQb2ludCA9IF9yZWY3LnBsYXllZFBvaW50LFxuICAgICAgICBrb1BvaW50ID0gX3JlZjcua29Qb2ludDtcblxuICAgIHZhciByZW5kZXJlciA9IHRoaXM7XG5cbiAgICBpZiAoa29Qb2ludCkge1xuICAgICAgX3V0aWxzMi5kZWZhdWx0LmFkZENsYXNzKHJlbmRlcmVyLmdyaWRba29Qb2ludC55XVtrb1BvaW50LnhdLCBcImtvXCIpO1xuICAgIH1cblxuICAgIGlmIChwbGF5ZWRQb2ludCkge1xuICAgICAgX3V0aWxzMi5kZWZhdWx0LmFkZENsYXNzKHJlbmRlcmVyLmdyaWRbcGxheWVkUG9pbnQueV1bcGxheWVkUG9pbnQueF0sIFwicGxheWVkXCIpO1xuICAgIH1cbiAgfSxcblxuICByZW5kZXJJbnRlcnNlY3Rpb246IGZ1bmN0aW9uIHJlbmRlckludGVyc2VjdGlvbihpbnRlcnNlY3Rpb24pIHtcbiAgICB2YXIgcmVuZGVyZXIgPSB0aGlzO1xuXG4gICAgdmFyIGludGVyc2VjdGlvbkVsID0gcmVuZGVyZXIuZ3JpZFtpbnRlcnNlY3Rpb24ueV1baW50ZXJzZWN0aW9uLnhdO1xuXG4gICAgdmFyIGNsYXNzZXMgPSBbXCJpbnRlcnNlY3Rpb25cIl07XG5cbiAgICBpZiAoaW50ZXJzZWN0aW9uLmlzRW1wdHkoKSkge1xuICAgICAgY2xhc3Nlcy5wdXNoKFwiZW1wdHlcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNsYXNzZXMucHVzaChcIm9jY3VwaWVkXCIpO1xuXG4gICAgICBpZiAoaW50ZXJzZWN0aW9uLmlzQmxhY2soKSkge1xuICAgICAgICBjbGFzc2VzLnB1c2goXCJibGFja1wiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChcIndoaXRlXCIpO1xuICAgICAgfVxuXG4gICAgICB2YXIgc2hpZnRDbGFzc2VzID0gW1widi1zaGlmdC11cFwiLCBcInYtc2hpZnQtdXB1cFwiLCBcInYtc2hpZnQtZG93blwiLCBcInYtc2hpZnQtZG93bmRvd25cIiwgXCJ2LXNoaWZ0LW5vbmVcIiwgXCJoLXNoaWZ0LWxlZnRcIiwgXCJoLXNoaWZ0LWxlZnRsZWZ0XCIsIFwiaC1zaGlmdC1yaWdodFwiLCBcImgtc2hpZnQtcmlnaHRyaWdodFwiLCBcImgtc2hpZnQtbm9uZVwiXTtcblxuICAgICAgc2hpZnRDbGFzc2VzLmZvckVhY2goZnVuY3Rpb24gKHNoaWZ0Q2xhc3MpIHtcbiAgICAgICAgaWYgKF91dGlsczIuZGVmYXVsdC5oYXNDbGFzcyhpbnRlcnNlY3Rpb25FbCwgc2hpZnRDbGFzcykpIHtcbiAgICAgICAgICBjbGFzc2VzLnB1c2goc2hpZnRDbGFzcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuc2V0SW50ZXJzZWN0aW9uQ2xhc3NlcyhpbnRlcnNlY3Rpb25FbCwgaW50ZXJzZWN0aW9uLCBjbGFzc2VzKTtcbiAgfSxcblxuICByZW5kZXJUZXJyaXRvcnk6IGZ1bmN0aW9uIHJlbmRlclRlcnJpdG9yeSh0ZXJyaXRvcnksIGRlYWRTdG9uZXMpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgIF91dGlsczIuZGVmYXVsdC5mbGF0dGVuKHRoaXMuZ3JpZCkuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgX3V0aWxzMi5kZWZhdWx0LnJlbW92ZUNsYXNzKGVsZW1lbnQsIFwidGVycml0b3J5LWJsYWNrXCIpO1xuICAgICAgX3V0aWxzMi5kZWZhdWx0LnJlbW92ZUNsYXNzKGVsZW1lbnQsIFwidGVycml0b3J5LXdoaXRlXCIpO1xuICAgICAgX3V0aWxzMi5kZWZhdWx0LnJlbW92ZUNsYXNzKGVsZW1lbnQsIFwiZGVhZFwiKTtcbiAgICB9KTtcblxuICAgIGRlYWRTdG9uZXMuZm9yRWFjaChmdW5jdGlvbiAocG9pbnQpIHtcbiAgICAgIF91dGlsczIuZGVmYXVsdC5hZGRDbGFzcyhfdGhpczMuZ3JpZFtwb2ludC55XVtwb2ludC54XSwgXCJkZWFkXCIpO1xuICAgIH0pO1xuXG4gICAgdGVycml0b3J5LmJsYWNrLmZvckVhY2goZnVuY3Rpb24gKHRlcnJpdG9yeVBvaW50KSB7XG4gICAgICBfdXRpbHMyLmRlZmF1bHQuYWRkQ2xhc3MoX3RoaXMzLmdyaWRbdGVycml0b3J5UG9pbnQueV1bdGVycml0b3J5UG9pbnQueF0sIFwidGVycml0b3J5LWJsYWNrXCIpO1xuICAgIH0pO1xuXG4gICAgdGVycml0b3J5LndoaXRlLmZvckVhY2goZnVuY3Rpb24gKHRlcnJpdG9yeVBvaW50KSB7XG4gICAgICBfdXRpbHMyLmRlZmF1bHQuYWRkQ2xhc3MoX3RoaXMzLmdyaWRbdGVycml0b3J5UG9pbnQueV1bdGVycml0b3J5UG9pbnQueF0sIFwidGVycml0b3J5LXdoaXRlXCIpO1xuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBSZW5kZXJlcjtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVuZGVyZXIuanMubWFwIl19
},{"./utils":14}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var VALID_KO_OPTIONS = ["simple", "positional-superko", "situational-superko", "natural-situational-superko"];

var Ruleset = function Ruleset(_ref) {
  var koRule = _ref.koRule;

  this.koRule = koRule;

  if (VALID_KO_OPTIONS.indexOf(this.koRule) < 0) {
    throw new Error("Unknown ko rule: " + koRule);
  }

  Object.freeze(this);
};

Ruleset.prototype = {
  isIllegal: function isIllegal(y, x, game) {
    var boardState = game.currentState();
    var intersection = boardState.intersectionAt(y, x);

    var result = !intersection.isEmpty() || this._wouldBeSuicide(y, x, boardState) || this._isKoViolation(y, x, boardState, game._moves);

    return result;
  },

  _isKoViolation: function _isKoViolation(y, x, boardState, existingStates) {
    var isKoViolation = false;

    if (this.koRule === "simple") {
      var simpleKoPoint = boardState._simpleKoPoint();
      isKoViolation = Boolean(simpleKoPoint) && y === simpleKoPoint.y && x === simpleKoPoint.x;
    } else {
      var newState = boardState.playAt(y, x, boardState.nextColor());

      var hasDuplicatePosition = function hasDuplicatePosition(condition) {
        return existingStates.length > 0 && existingStates.some(function (existingState) {
          return condition(existingState) && existingState.positionSameAs(newState);
        });
      };

      if (this.koRule === "positional-superko") {
        isKoViolation = hasDuplicatePosition(function () {
          return true;
        });
      } else if (this.koRule === "situational-superko") {
        isKoViolation = hasDuplicatePosition(function (state) {
          return state.color === newState.color;
        });
      } else if (this.koRule === "natural-situational-superko") {
        isKoViolation = hasDuplicatePosition(function (state) {
          return !state.pass && state.color === newState.color;
        });
      } else {
        throw new Error("Unimplemented ko rule " + this.koRule);
      }
    }

    return isKoViolation;
  },

  _wouldBeSuicide: function _wouldBeSuicide(y, x, boardState) {
    var color = boardState.nextColor();
    var intersection = boardState.intersectionAt(y, x);
    var surroundedEmptyPoint = intersection.isEmpty() && boardState.neighborsFor(intersection.y, intersection.x).filter(function (neighbor) {
      return neighbor.isEmpty();
    }).length === 0;

    if (!surroundedEmptyPoint) {
      return false;
    }

    var someFriendlyNotInAtari = boardState.neighborsFor(intersection.y, intersection.x).some(function (neighbor) {
      var inAtari = boardState.inAtari(neighbor.y, neighbor.x);
      var friendly = neighbor.isOccupiedWith(color);

      return friendly && !inAtari;
    });

    if (someFriendlyNotInAtari) {
      return false;
    }

    var someEnemyInAtari = boardState.neighborsFor(intersection.y, intersection.x).some(function (neighbor) {
      var inAtari = boardState.inAtari(neighbor.y, neighbor.x);
      var enemy = !neighbor.isOccupiedWith(color);

      return enemy && inAtari;
    });

    if (someEnemyInAtari) {
      return false;
    }

    return true;
  }
};

exports.default = Ruleset;

//# sourceMappingURL=ruleset.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzZXQuanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJWQUxJRF9LT19PUFRJT05TIiwiUnVsZXNldCIsIl9yZWYiLCJrb1J1bGUiLCJpbmRleE9mIiwiRXJyb3IiLCJmcmVlemUiLCJwcm90b3R5cGUiLCJpc0lsbGVnYWwiLCJ5IiwieCIsImdhbWUiLCJib2FyZFN0YXRlIiwiY3VycmVudFN0YXRlIiwiaW50ZXJzZWN0aW9uIiwiaW50ZXJzZWN0aW9uQXQiLCJyZXN1bHQiLCJpc0VtcHR5IiwiX3dvdWxkQmVTdWljaWRlIiwiX2lzS29WaW9sYXRpb24iLCJfbW92ZXMiLCJleGlzdGluZ1N0YXRlcyIsImlzS29WaW9sYXRpb24iLCJzaW1wbGVLb1BvaW50IiwiX3NpbXBsZUtvUG9pbnQiLCJCb29sZWFuIiwibmV3U3RhdGUiLCJwbGF5QXQiLCJuZXh0Q29sb3IiLCJoYXNEdXBsaWNhdGVQb3NpdGlvbiIsImNvbmRpdGlvbiIsImxlbmd0aCIsInNvbWUiLCJleGlzdGluZ1N0YXRlIiwicG9zaXRpb25TYW1lQXMiLCJzdGF0ZSIsImNvbG9yIiwicGFzcyIsInN1cnJvdW5kZWRFbXB0eVBvaW50IiwibmVpZ2hib3JzRm9yIiwiZmlsdGVyIiwibmVpZ2hib3IiLCJzb21lRnJpZW5kbHlOb3RJbkF0YXJpIiwiaW5BdGFyaSIsImZyaWVuZGx5IiwiaXNPY2N1cGllZFdpdGgiLCJzb21lRW5lbXlJbkF0YXJpIiwiZW5lbXkiLCJkZWZhdWx0Il0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQUEsT0FBT0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLFNBQU87QUFEb0MsQ0FBN0M7QUFHQSxJQUFJQyxtQkFBbUIsQ0FBQyxRQUFELEVBQVcsb0JBQVgsRUFBaUMscUJBQWpDLEVBQXdELDZCQUF4RCxDQUF2Qjs7QUFFQSxJQUFJQyxVQUFVLFNBQVNBLE9BQVQsQ0FBaUJDLElBQWpC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YUFBT1csU0FBU0osT0FBaEI7QUFDRCxLQUxzQixDQUF2Qjs7QUFPQSxRQUFJRyxnQkFBSixFQUFzQjtBQUNwQixhQUFPLEtBQVA7QUFDRDs7QUFFRCxXQUFPLElBQVA7QUFDRDtBQS9FaUIsQ0FBcEI7O0FBa0ZBaEQsUUFBUWtELE9BQVIsR0FBa0IvQyxPQUFsQjs7QUFFQSIsImZpbGUiOiJydWxlc2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgVkFMSURfS09fT1BUSU9OUyA9IFtcInNpbXBsZVwiLCBcInBvc2l0aW9uYWwtc3VwZXJrb1wiLCBcInNpdHVhdGlvbmFsLXN1cGVya29cIiwgXCJuYXR1cmFsLXNpdHVhdGlvbmFsLXN1cGVya29cIl07XG5cbnZhciBSdWxlc2V0ID0gZnVuY3Rpb24gUnVsZXNldChfcmVmKSB7XG4gIHZhciBrb1J1bGUgPSBfcmVmLmtvUnVsZTtcblxuICB0aGlzLmtvUnVsZSA9IGtvUnVsZTtcblxuICBpZiAoVkFMSURfS09fT1BUSU9OUy5pbmRleE9mKHRoaXMua29SdWxlKSA8IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGtvIHJ1bGU6IFwiICsga29SdWxlKTtcbiAgfVxuXG4gIE9iamVjdC5mcmVlemUodGhpcyk7XG59O1xuXG5SdWxlc2V0LnByb3RvdHlwZSA9IHtcbiAgaXNJbGxlZ2FsOiBmdW5jdGlvbiBpc0lsbGVnYWwoeSwgeCwgZ2FtZSkge1xuICAgIHZhciBib2FyZFN0YXRlID0gZ2FtZS5jdXJyZW50U3RhdGUoKTtcbiAgICB2YXIgaW50ZXJzZWN0aW9uID0gYm9hcmRTdGF0ZS5pbnRlcnNlY3Rpb25BdCh5LCB4KTtcblxuICAgIHZhciByZXN1bHQgPSAhaW50ZXJzZWN0aW9uLmlzRW1wdHkoKSB8fCB0aGlzLl93b3VsZEJlU3VpY2lkZSh5LCB4LCBib2FyZFN0YXRlKSB8fCB0aGlzLl9pc0tvVmlvbGF0aW9uKHksIHgsIGJvYXJkU3RhdGUsIGdhbWUuX21vdmVzKTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG5cbiAgX2lzS29WaW9sYXRpb246IGZ1bmN0aW9uIF9pc0tvVmlvbGF0aW9uKHksIHgsIGJvYXJkU3RhdGUsIGV4aXN0aW5nU3RhdGVzKSB7XG4gICAgdmFyIGlzS29WaW9sYXRpb24gPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLmtvUnVsZSA9PT0gXCJzaW1wbGVcIikge1xuICAgICAgdmFyIHNpbXBsZUtvUG9pbnQgPSBib2FyZFN0YXRlLl9zaW1wbGVLb1BvaW50KCk7XG4gICAgICBpc0tvVmlvbGF0aW9uID0gQm9vbGVhbihzaW1wbGVLb1BvaW50KSAmJiB5ID09PSBzaW1wbGVLb1BvaW50LnkgJiYgeCA9PT0gc2ltcGxlS29Qb2ludC54O1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbmV3U3RhdGUgPSBib2FyZFN0YXRlLnBsYXlBdCh5LCB4LCBib2FyZFN0YXRlLm5leHRDb2xvcigpKTtcblxuICAgICAgdmFyIGhhc0R1cGxpY2F0ZVBvc2l0aW9uID0gZnVuY3Rpb24gaGFzRHVwbGljYXRlUG9zaXRpb24oY29uZGl0aW9uKSB7XG4gICAgICAgIHJldHVybiBleGlzdGluZ1N0YXRlcy5sZW5ndGggPiAwICYmIGV4aXN0aW5nU3RhdGVzLnNvbWUoZnVuY3Rpb24gKGV4aXN0aW5nU3RhdGUpIHtcbiAgICAgICAgICByZXR1cm4gY29uZGl0aW9uKGV4aXN0aW5nU3RhdGUpICYmIGV4aXN0aW5nU3RhdGUucG9zaXRpb25TYW1lQXMobmV3U3RhdGUpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLmtvUnVsZSA9PT0gXCJwb3NpdGlvbmFsLXN1cGVya29cIikge1xuICAgICAgICBpc0tvVmlvbGF0aW9uID0gaGFzRHVwbGljYXRlUG9zaXRpb24oZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5rb1J1bGUgPT09IFwic2l0dWF0aW9uYWwtc3VwZXJrb1wiKSB7XG4gICAgICAgIGlzS29WaW9sYXRpb24gPSBoYXNEdXBsaWNhdGVQb3NpdGlvbihmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgICByZXR1cm4gc3RhdGUuY29sb3IgPT09IG5ld1N0YXRlLmNvbG9yO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5rb1J1bGUgPT09IFwibmF0dXJhbC1zaXR1YXRpb25hbC1zdXBlcmtvXCIpIHtcbiAgICAgICAgaXNLb1Zpb2xhdGlvbiA9IGhhc0R1cGxpY2F0ZVBvc2l0aW9uKGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICAgIHJldHVybiAhc3RhdGUucGFzcyAmJiBzdGF0ZS5jb2xvciA9PT0gbmV3U3RhdGUuY29sb3I7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5pbXBsZW1lbnRlZCBrbyBydWxlIFwiICsgdGhpcy5rb1J1bGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpc0tvVmlvbGF0aW9uO1xuICB9LFxuXG4gIF93b3VsZEJlU3VpY2lkZTogZnVuY3Rpb24gX3dvdWxkQmVTdWljaWRlKHksIHgsIGJvYXJkU3RhdGUpIHtcbiAgICB2YXIgY29sb3IgPSBib2FyZFN0YXRlLm5leHRDb2xvcigpO1xuICAgIHZhciBpbnRlcnNlY3Rpb24gPSBib2FyZFN0YXRlLmludGVyc2VjdGlvbkF0KHksIHgpO1xuICAgIHZhciBzdXJyb3VuZGVkRW1wdHlQb2ludCA9IGludGVyc2VjdGlvbi5pc0VtcHR5KCkgJiYgYm9hcmRTdGF0ZS5uZWlnaGJvcnNGb3IoaW50ZXJzZWN0aW9uLnksIGludGVyc2VjdGlvbi54KS5maWx0ZXIoZnVuY3Rpb24gKG5laWdoYm9yKSB7XG4gICAgICByZXR1cm4gbmVpZ2hib3IuaXNFbXB0eSgpO1xuICAgIH0pLmxlbmd0aCA9PT0gMDtcblxuICAgIGlmICghc3Vycm91bmRlZEVtcHR5UG9pbnQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgc29tZUZyaWVuZGx5Tm90SW5BdGFyaSA9IGJvYXJkU3RhdGUubmVpZ2hib3JzRm9yKGludGVyc2VjdGlvbi55LCBpbnRlcnNlY3Rpb24ueCkuc29tZShmdW5jdGlvbiAobmVpZ2hib3IpIHtcbiAgICAgIHZhciBpbkF0YXJpID0gYm9hcmRTdGF0ZS5pbkF0YXJpKG5laWdoYm9yLnksIG5laWdoYm9yLngpO1xuICAgICAgdmFyIGZyaWVuZGx5ID0gbmVpZ2hib3IuaXNPY2N1cGllZFdpdGgoY29sb3IpO1xuXG4gICAgICByZXR1cm4gZnJpZW5kbHkgJiYgIWluQXRhcmk7XG4gICAgfSk7XG5cbiAgICBpZiAoc29tZUZyaWVuZGx5Tm90SW5BdGFyaSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBzb21lRW5lbXlJbkF0YXJpID0gYm9hcmRTdGF0ZS5uZWlnaGJvcnNGb3IoaW50ZXJzZWN0aW9uLnksIGludGVyc2VjdGlvbi54KS5zb21lKGZ1bmN0aW9uIChuZWlnaGJvcikge1xuICAgICAgdmFyIGluQXRhcmkgPSBib2FyZFN0YXRlLmluQXRhcmkobmVpZ2hib3IueSwgbmVpZ2hib3IueCk7XG4gICAgICB2YXIgZW5lbXkgPSAhbmVpZ2hib3IuaXNPY2N1cGllZFdpdGgoY29sb3IpO1xuXG4gICAgICByZXR1cm4gZW5lbXkgJiYgaW5BdGFyaTtcbiAgICB9KTtcblxuICAgIGlmIChzb21lRW5lbXlJbkF0YXJpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFJ1bGVzZXQ7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJ1bGVzZXQuanMubWFwIl19
},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _intersection = require("./intersection");

var _intersection2 = _interopRequireDefault(_intersection);

var _region = require("./region");

var _region2 = _interopRequireDefault(_region);

var _eyePoint = require("./eye-point");

var _eyePoint2 = _interopRequireDefault(_eyePoint);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var boardStateWithoutDeadPoints = function boardStateWithoutDeadPoints(game) {
  return game.currentState()._withoutIntersectionsMatching(function (i) {
    return game._isDeadAt(i.y, i.x);
  });
};

var boardStateWithoutNeutralPoints = function boardStateWithoutNeutralPoints(boardState) {
  var regions = _region2.default.allFor(boardState);
  var neutralRegions = regions.filter(function (r) {
    return r.isNeutral();
  });

  if (regions.length === 0 || neutralRegions.length === 0) {
    return boardState;
  }

  var replacements = {};

  neutralRegions.forEach(function (r) {
    var startingX = null;
    var startingY = null;

    r.intersections.forEach(function (intersection) {
      startingX = startingX || intersection.x;
      startingX = startingX || intersection.y;

      var manhattanDistance = Math.abs(intersection.y - startingY) + Math.abs(intersection.x - startingX);
      var replacementColor = ["black", "white"][manhattanDistance % 2];
      var replacement = new _intersection2.default(intersection.y, intersection.x, replacementColor);

      replacements[intersection.y] = replacements[intersection.y] || [];
      replacements[intersection.y][intersection.x] = replacement;
    });
  });

  var newPoints = boardState.intersections.map(function (i) {
    if (replacements[i.y] && replacements[i.y][i.x]) {
      return replacements[i.y][i.x];
    } else {
      return i;
    }
  });

  return boardState._withNewPoints(newPoints);
};

var boardStateWithClearFalseEyesFilled = function boardStateWithClearFalseEyesFilled(boardState) {
  var territoryRegions = _region2.default.allFor(boardState).filter(function (r) {
    return r.isTerritory();
  });
  var falseEyePoints = _utils2.default.flatMap(territoryRegions, function (r) {
    return r.intersections;
  }).filter(function (i) {
    return new _eyePoint2.default(boardState, i).isFalse();
  });

  var pointsNeighboringAtari = falseEyePoints.filter(function (i) {
    return boardState.neighborsFor(i.y, i.x).some(function (n) {
      return boardState.inAtari(n.y, n.x);
    });
  });
  var neutralAtariUpdatedState = boardState;

  var _loop = function _loop() {
    var newPoints = neutralAtariUpdatedState.intersections.map(function (i) {
      if (pointsNeighboringAtari.indexOf(i) > -1) {
        return new _intersection2.default(i.y, i.x, new _eyePoint2.default(neutralAtariUpdatedState, i).filledColor());
      } else {
        return i;
      }
    });
    neutralAtariUpdatedState = neutralAtariUpdatedState._withNewPoints(newPoints);

    var boardState = boardStateWithoutNeutralPoints(neutralAtariUpdatedState);
    var territoryRegions = _region2.default.allFor(boardState).filter(function (r) {
      return r.isTerritory();
    });
    var falseEyePoints = _utils2.default.flatMap(territoryRegions, function (r) {
      return r.intersections;
    }).filter(function (i) {
      return new _eyePoint2.default(boardState, i).isFalse();
    });

    pointsNeighboringAtari = falseEyePoints.filter(function (i) {
      return neutralAtariUpdatedState.neighborsFor(i.y, i.x).some(function (n) {
        return neutralAtariUpdatedState.inAtari(n.y, n.x);
      });
    });
  };

  while (pointsNeighboringAtari.length > 0) {
    _loop();
  }

  return neutralAtariUpdatedState;
};

var TerritoryScoring = Object.freeze({
  score: function score(game) {
    var blackDeadAsCaptures = game.deadStones().filter(function (deadPoint) {
      return game.intersectionAt(deadPoint.y, deadPoint.x).isBlack();
    });
    var whiteDeadAsCaptures = game.deadStones().filter(function (deadPoint) {
      return game.intersectionAt(deadPoint.y, deadPoint.x).isWhite();
    });

    var territory = game.territory();
    var boardState = game.currentState();

    return {
      black: territory.black.length + boardState.whiteStonesCaptured + whiteDeadAsCaptures.length,
      white: territory.white.length + boardState.blackStonesCaptured + blackDeadAsCaptures.length
    };
  },

  territory: function territory(game) {
    var stateWithoutDeadPoints = boardStateWithoutDeadPoints(game);
    var stateWithoutNeutrals = boardStateWithoutNeutralPoints(stateWithoutDeadPoints);
    var stateWithClearFalseEyesFilled = boardStateWithClearFalseEyesFilled(stateWithoutNeutrals);

    var territoryRegions = _region2.default.allFor(stateWithClearFalseEyesFilled).filter(function (r) {
      return r.isTerritory();
    });

    var territoryRegionsWithoutSeki = territoryRegions.filter(function (r) {
      var merged = _region2.default.merge(territoryRegions, r);
      var eyeCounts = merged.map(function (m) {
        return Math.ceil(m.numberOfEyes());
      });

      return eyeCounts.length > 0 && eyeCounts.reduce(function (a, b) {
        return a + b;
      }) >= 2;
    });

    var blackRegions = territoryRegionsWithoutSeki.filter(function (r) {
      return r.isBlack();
    });
    var whiteRegions = territoryRegionsWithoutSeki.filter(function (r) {
      return r.isWhite();
    });

    return {
      black: _utils2.default.flatMap(blackRegions, function (r) {
        return r.intersections;
      }).map(function (i) {
        return { y: i.y, x: i.x };
      }),
      white: _utils2.default.flatMap(whiteRegions, function (r) {
        return r.intersections;
      }).map(function (i) {
        return { y: i.y, x: i.x };
      })
    };
  }
});

var AreaScoring = Object.freeze({
  score: function score(game) {
    var blackStonesOnTheBoard = game.intersections().filter(function (intersection) {
      return intersection.isBlack() && !game._isDeadAt(intersection.y, intersection.x);
    });
    var whiteStonesOnTheBoard = game.intersections().filter(function (intersection) {
      return intersection.isWhite() && !game._isDeadAt(intersection.y, intersection.x);
    });
    var territory = game.territory();

    return {
      black: territory.black.length + blackStonesOnTheBoard.length,
      white: territory.white.length + whiteStonesOnTheBoard.length
    };
  },

  territory: function territory(game) {
    var regions = _region2.default.allFor(boardStateWithoutDeadPoints(game));
    var territoryRegions = regions.filter(function (r) {
      return r.isTerritory();
    });
    var blackRegions = territoryRegions.filter(function (r) {
      return r.isBlack();
    });
    var whiteRegions = territoryRegions.filter(function (r) {
      return r.isWhite();
    });

    return {
      black: _utils2.default.flatMap(blackRegions, function (r) {
        return r.intersections;
      }).map(function (i) {
        return { y: i.y, x: i.x };
      }),
      white: _utils2.default.flatMap(whiteRegions, function (r) {
        return r.intersections;
      }).map(function (i) {
        return { y: i.y, x: i.x };
      })
    };
  }
});

var Scorer = function Scorer() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      scoreBy = _ref.scoreBy,
      komi = _ref.komi;

  this._strategy = {
    "area": AreaScoring,
    "territory": TerritoryScoring,
    "equivalence": AreaScoring
  }[scoreBy];

  this._komi = komi;

  if (!this._strategy) {
    throw new Error("Unknown scoring type: " + scoreBy);
  }

  if (this._komi === null || typeof this._komi === "undefined") {
    throw new Error("Error initializing scorer without a komi value");
  }

  if (typeof this._komi !== "number") {
    throw new Error("Komi value given is not a number: " + komi);
  }

  this._usePassStones = scoreBy === "equivalence";

  Object.freeze(this);
};

Scorer.prototype = {
  score: function score(game) {
    var result = this._strategy.score(game);
    result.white += this._komi;

    if (this._usePassStones) {
      // Under equivalence scoring, 2 consecutive passes signals(!) the end of the
      // game, but just prior to the end of the game, white must make one final
      // pass move if the game didn't end on a white pass.
      //
      // However, instead of creating a 3rd consecutive pass in the board state,
      // white's additional pass stone is handled by the scoring mechanism alone.
      // The idea is that, under any game resumption, the additional white pass
      // stone must not exist, so we shouldn't add it.
      //
      // NOTE: the final result should rely on this scoring function. Any calculations
      // using raw board state pass stone numbers may be off by 1 in favor of black.
      var needsFinalWhitePassStone = game.currentState().color !== "white";

      return {
        black: result.black + game.currentState().whitePassStones + (needsFinalWhitePassStone ? 1 : 0),
        white: result.white + game.currentState().blackPassStones
      };
    } else {
      return result;
    }
  },

  territory: function territory(game) {
    return this._strategy.territory(game);
  },

  usingPassStones: function usingPassStones() {
    return this._usePassStones;
  }
};

exports.default = Scorer;

//# sourceMappingURL=scorer.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjb3Jlci5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsIl91dGlscyIsInJlcXVpcmUiLCJfdXRpbHMyIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIl9pbnRlcnNlY3Rpb24iLCJfaW50ZXJzZWN0aW9uMiIsIl9yZWdpb24iLCJfcmVnaW9uMiIsIl9leWVQb2ludCIsIl9leWVQb2ludDIiLCJvYmoiLCJfX2VzTW9kdWxlIiwiZGVmYXVsdCIsImJvYXJkU3RhdGVXaXRob3V0RGVhZFBvaW50cyIsImdhbWUiLCJjdXJyZW50U3RhdGUiLCJfd2l0aG91dEludGVyc2VjdGlvbnNNYXRjaGluZyIsImkiLCJfaXNEZWFkQXQiLCJ5IiwieCIsImJvYXJkU3RhdGVXaXRob3V0TmV1dHJhbFBvaW50cyIsImJvYXJkU3RhdGUiLCJyZWdpb25zIiwiYWxsRm9yIiwibmV1dHJhbFJlZ2lvbnMiLCJmaWx0ZXIiLCJyIiwiaXNOZXV0cmFsIiwibGVuZ3RoIiwicmVwbGFjZW1lbnRzIiwiZm9yRWFjaCIsInN0YXJ0aW5nWCIsInN0YXJ0aW5nWSIsImludGVyc2VjdGlvbnMiLCJpbnRlcnNlY3Rpb24iLCJtYW5oYXR0YW5EaXN0YW5jZSIsIk1hdGgiLCJhYnMiLCJyZXBsYWNlbWVudENvbG9yIiwicmVwbGFjZW1lbnQiLCJuZXdQb2ludHMiLCJtYXAiLCJfd2l0aE5ld1BvaW50cyIsImJvYXJkU3RhdGVXaXRoQ2xlYXJGYWxzZUV5ZXNGaWxsZWQiLCJ0ZXJyaXRvcnlSZWdpb25zIiwiaXNUZXJyaXRvcnkiLCJmYWxzZUV5ZVBvaW50cyIsImZsYXRNYXAiLCJpc0ZhbHNlIiwicG9pbnRzTmVpZ2hib3JpbmdBdGFyaSIsIm5laWdoYm9yc0ZvciIsInNvbWUiLCJuIiwiaW5BdGFyaSIsIm5ldXRyYWxBdGFyaVVwZGF0ZWRTdGF0ZSIsIl9sb29wIiwiaW5kZXhPZiIsImZpbGxlZENvbG9yIiwiVGVycml0b3J5U2NvcmluZyIsImZyZWV6ZSIsInNjb3JlIiwiYmxhY2tEZWFkQXNDYXB0dXJlcyIsImRlYWRTdG9uZXMiLCJkZWFkUG9pbnQiLCJpbnRlcnNlY3Rpb25BdCIsImlzQmxhY2siLCJ3aGl0ZURlYWRBc0NhcHR1cmVzIiwiaXNXaGl0ZSIsInRlcnJpdG9yeSIsImJsYWNrIiwid2hpdGVTdG9uZXNDYXB0dXJlZCIsIndoaXRlIiwiYmxhY2tTdG9uZXNDYXB0dXJlZCIsInN0YXRlV2l0aG91dERlYWRQb2ludHMiLCJzdGF0ZVdpdGhvdXROZXV0cmFscyIsInN0YXRlV2l0aENsZWFyRmFsc2VFeWVzRmlsbGVkIiwidGVycml0b3J5UmVnaW9uc1dpdGhvdXRTZWtpIiwibWVyZ2VkIiwibWVyZ2UiLCJleWVDb3VudHMiLCJtIiwiY2VpbCIsIm51bWJlck9mRXllcyIsInJlZHVjZSIsImEiLCJiIiwiYmxhY2tSZWdpb25zIiwid2hpdGVSZWdpb25zIiwiQXJlYVNjb3JpbmciLCJibGFja1N0b25lc09uVGhlQm9hcmQiLCJ3aGl0ZVN0b25lc09uVGhlQm9hcmQiLCJTY29yZXIiLCJfcmVmIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwic2NvcmVCeSIsImtvbWkiLCJfc3RyYXRlZ3kiLCJfa29taSIsIkVycm9yIiwiX3VzZVBhc3NTdG9uZXMiLCJwcm90b3R5cGUiLCJyZXN1bHQiLCJuZWVkc0ZpbmFsV2hpdGVQYXNzU3RvbmUiLCJjb2xvciIsIndoaXRlUGFzc1N0b25lcyIsImJsYWNrUGFzc1N0b25lcyIsInVzaW5nUGFzc1N0b25lcyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUFBLE9BQU9DLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDQyxTQUFPO0FBRG9DLENBQTdDOztBQUlBLElBQUlDLFNBQVNDLFFBQVEsU0FBUixDQUFiOztBQUVBLElBQUlDLFVBQVVDLHVCQUF1QkgsTUFBdkIsQ0FBZDs7QUFFQSxJQUFJSSxnQkFBZ0JILFFBQVEsZ0JBQVIsQ0FBcEI7O0FBRUEsSUFBSUksaUJBQWlC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LEtBQUsyQixLQUFyQjs7QUFFQSxRQUFJLEtBQUtFLGNBQVQsRUFBeUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQUlHLDJCQUEyQjFGLEtBQUtDLFlBQUwsR0FBb0IwRixLQUFwQixLQUE4QixPQUE3RDs7QUFFQSxhQUFPO0FBQ0xuQyxlQUFPaUMsT0FBT2pDLEtBQVAsR0FBZXhELEtBQUtDLFlBQUwsR0FBb0IyRixlQUFuQyxJQUFzREYsMkJBQTJCLENBQTNCLEdBQStCLENBQXJGLENBREY7QUFFTGhDLGVBQU8rQixPQUFPL0IsS0FBUCxHQUFlMUQsS0FBS0MsWUFBTCxHQUFvQjRGO0FBRnJDLE9BQVA7QUFJRCxLQWxCRCxNQWtCTztBQUNMLGFBQU9KLE1BQVA7QUFDRDtBQUNGLEdBMUJnQjs7QUE0QmpCbEMsYUFBVyxTQUFTQSxTQUFULENBQW1CdkQsSUFBbkIsRUFBeUI7QUFDbEMsV0FBTyxLQUFLb0YsU0FBTCxDQUFlN0IsU0FBZixDQUF5QnZELElBQXpCLENBQVA7QUFDRCxHQTlCZ0I7O0FBZ0NqQjhGLG1CQUFpQixTQUFTQSxlQUFULEdBQTJCO0FBQzFDLFdBQU8sS0FBS1AsY0FBWjtBQUNEO0FBbENnQixDQUFuQjs7QUFxQ0F2RyxRQUFRYyxPQUFSLEdBQWtCZ0YsTUFBbEI7O0FBRUEiLCJmaWxlIjoic2NvcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdXRpbHMgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcblxudmFyIF91dGlsczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91dGlscyk7XG5cbnZhciBfaW50ZXJzZWN0aW9uID0gcmVxdWlyZShcIi4vaW50ZXJzZWN0aW9uXCIpO1xuXG52YXIgX2ludGVyc2VjdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbnRlcnNlY3Rpb24pO1xuXG52YXIgX3JlZ2lvbiA9IHJlcXVpcmUoXCIuL3JlZ2lvblwiKTtcblxudmFyIF9yZWdpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVnaW9uKTtcblxudmFyIF9leWVQb2ludCA9IHJlcXVpcmUoXCIuL2V5ZS1wb2ludFwiKTtcblxudmFyIF9leWVQb2ludDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9leWVQb2ludCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBib2FyZFN0YXRlV2l0aG91dERlYWRQb2ludHMgPSBmdW5jdGlvbiBib2FyZFN0YXRlV2l0aG91dERlYWRQb2ludHMoZ2FtZSkge1xuICByZXR1cm4gZ2FtZS5jdXJyZW50U3RhdGUoKS5fd2l0aG91dEludGVyc2VjdGlvbnNNYXRjaGluZyhmdW5jdGlvbiAoaSkge1xuICAgIHJldHVybiBnYW1lLl9pc0RlYWRBdChpLnksIGkueCk7XG4gIH0pO1xufTtcblxudmFyIGJvYXJkU3RhdGVXaXRob3V0TmV1dHJhbFBvaW50cyA9IGZ1bmN0aW9uIGJvYXJkU3RhdGVXaXRob3V0TmV1dHJhbFBvaW50cyhib2FyZFN0YXRlKSB7XG4gIHZhciByZWdpb25zID0gX3JlZ2lvbjIuZGVmYXVsdC5hbGxGb3IoYm9hcmRTdGF0ZSk7XG4gIHZhciBuZXV0cmFsUmVnaW9ucyA9IHJlZ2lvbnMuZmlsdGVyKGZ1bmN0aW9uIChyKSB7XG4gICAgcmV0dXJuIHIuaXNOZXV0cmFsKCk7XG4gIH0pO1xuXG4gIGlmIChyZWdpb25zLmxlbmd0aCA9PT0gMCB8fCBuZXV0cmFsUmVnaW9ucy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gYm9hcmRTdGF0ZTtcbiAgfVxuXG4gIHZhciByZXBsYWNlbWVudHMgPSB7fTtcblxuICBuZXV0cmFsUmVnaW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7XG4gICAgdmFyIHN0YXJ0aW5nWCA9IG51bGw7XG4gICAgdmFyIHN0YXJ0aW5nWSA9IG51bGw7XG5cbiAgICByLmludGVyc2VjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoaW50ZXJzZWN0aW9uKSB7XG4gICAgICBzdGFydGluZ1ggPSBzdGFydGluZ1ggfHwgaW50ZXJzZWN0aW9uLng7XG4gICAgICBzdGFydGluZ1ggPSBzdGFydGluZ1ggfHwgaW50ZXJzZWN0aW9uLnk7XG5cbiAgICAgIHZhciBtYW5oYXR0YW5EaXN0YW5jZSA9IE1hdGguYWJzKGludGVyc2VjdGlvbi55IC0gc3RhcnRpbmdZKSArIE1hdGguYWJzKGludGVyc2VjdGlvbi54IC0gc3RhcnRpbmdYKTtcbiAgICAgIHZhciByZXBsYWNlbWVudENvbG9yID0gW1wiYmxhY2tcIiwgXCJ3aGl0ZVwiXVttYW5oYXR0YW5EaXN0YW5jZSAlIDJdO1xuICAgICAgdmFyIHJlcGxhY2VtZW50ID0gbmV3IF9pbnRlcnNlY3Rpb24yLmRlZmF1bHQoaW50ZXJzZWN0aW9uLnksIGludGVyc2VjdGlvbi54LCByZXBsYWNlbWVudENvbG9yKTtcblxuICAgICAgcmVwbGFjZW1lbnRzW2ludGVyc2VjdGlvbi55XSA9IHJlcGxhY2VtZW50c1tpbnRlcnNlY3Rpb24ueV0gfHwgW107XG4gICAgICByZXBsYWNlbWVudHNbaW50ZXJzZWN0aW9uLnldW2ludGVyc2VjdGlvbi54XSA9IHJlcGxhY2VtZW50O1xuICAgIH0pO1xuICB9KTtcblxuICB2YXIgbmV3UG9pbnRzID0gYm9hcmRTdGF0ZS5pbnRlcnNlY3Rpb25zLm1hcChmdW5jdGlvbiAoaSkge1xuICAgIGlmIChyZXBsYWNlbWVudHNbaS55XSAmJiByZXBsYWNlbWVudHNbaS55XVtpLnhdKSB7XG4gICAgICByZXR1cm4gcmVwbGFjZW1lbnRzW2kueV1baS54XTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gYm9hcmRTdGF0ZS5fd2l0aE5ld1BvaW50cyhuZXdQb2ludHMpO1xufTtcblxudmFyIGJvYXJkU3RhdGVXaXRoQ2xlYXJGYWxzZUV5ZXNGaWxsZWQgPSBmdW5jdGlvbiBib2FyZFN0YXRlV2l0aENsZWFyRmFsc2VFeWVzRmlsbGVkKGJvYXJkU3RhdGUpIHtcbiAgdmFyIHRlcnJpdG9yeVJlZ2lvbnMgPSBfcmVnaW9uMi5kZWZhdWx0LmFsbEZvcihib2FyZFN0YXRlKS5maWx0ZXIoZnVuY3Rpb24gKHIpIHtcbiAgICByZXR1cm4gci5pc1RlcnJpdG9yeSgpO1xuICB9KTtcbiAgdmFyIGZhbHNlRXllUG9pbnRzID0gX3V0aWxzMi5kZWZhdWx0LmZsYXRNYXAodGVycml0b3J5UmVnaW9ucywgZnVuY3Rpb24gKHIpIHtcbiAgICByZXR1cm4gci5pbnRlcnNlY3Rpb25zO1xuICB9KS5maWx0ZXIoZnVuY3Rpb24gKGkpIHtcbiAgICByZXR1cm4gbmV3IF9leWVQb2ludDIuZGVmYXVsdChib2FyZFN0YXRlLCBpKS5pc0ZhbHNlKCk7XG4gIH0pO1xuXG4gIHZhciBwb2ludHNOZWlnaGJvcmluZ0F0YXJpID0gZmFsc2VFeWVQb2ludHMuZmlsdGVyKGZ1bmN0aW9uIChpKSB7XG4gICAgcmV0dXJuIGJvYXJkU3RhdGUubmVpZ2hib3JzRm9yKGkueSwgaS54KS5zb21lKGZ1bmN0aW9uIChuKSB7XG4gICAgICByZXR1cm4gYm9hcmRTdGF0ZS5pbkF0YXJpKG4ueSwgbi54KTtcbiAgICB9KTtcbiAgfSk7XG4gIHZhciBuZXV0cmFsQXRhcmlVcGRhdGVkU3RhdGUgPSBib2FyZFN0YXRlO1xuXG4gIHZhciBfbG9vcCA9IGZ1bmN0aW9uIF9sb29wKCkge1xuICAgIHZhciBuZXdQb2ludHMgPSBuZXV0cmFsQXRhcmlVcGRhdGVkU3RhdGUuaW50ZXJzZWN0aW9ucy5tYXAoZnVuY3Rpb24gKGkpIHtcbiAgICAgIGlmIChwb2ludHNOZWlnaGJvcmluZ0F0YXJpLmluZGV4T2YoaSkgPiAtMSkge1xuICAgICAgICByZXR1cm4gbmV3IF9pbnRlcnNlY3Rpb24yLmRlZmF1bHQoaS55LCBpLngsIG5ldyBfZXllUG9pbnQyLmRlZmF1bHQobmV1dHJhbEF0YXJpVXBkYXRlZFN0YXRlLCBpKS5maWxsZWRDb2xvcigpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIG5ldXRyYWxBdGFyaVVwZGF0ZWRTdGF0ZSA9IG5ldXRyYWxBdGFyaVVwZGF0ZWRTdGF0ZS5fd2l0aE5ld1BvaW50cyhuZXdQb2ludHMpO1xuXG4gICAgdmFyIGJvYXJkU3RhdGUgPSBib2FyZFN0YXRlV2l0aG91dE5ldXRyYWxQb2ludHMobmV1dHJhbEF0YXJpVXBkYXRlZFN0YXRlKTtcbiAgICB2YXIgdGVycml0b3J5UmVnaW9ucyA9IF9yZWdpb24yLmRlZmF1bHQuYWxsRm9yKGJvYXJkU3RhdGUpLmZpbHRlcihmdW5jdGlvbiAocikge1xuICAgICAgcmV0dXJuIHIuaXNUZXJyaXRvcnkoKTtcbiAgICB9KTtcbiAgICB2YXIgZmFsc2VFeWVQb2ludHMgPSBfdXRpbHMyLmRlZmF1bHQuZmxhdE1hcCh0ZXJyaXRvcnlSZWdpb25zLCBmdW5jdGlvbiAocikge1xuICAgICAgcmV0dXJuIHIuaW50ZXJzZWN0aW9ucztcbiAgICB9KS5maWx0ZXIoZnVuY3Rpb24gKGkpIHtcbiAgICAgIHJldHVybiBuZXcgX2V5ZVBvaW50Mi5kZWZhdWx0KGJvYXJkU3RhdGUsIGkpLmlzRmFsc2UoKTtcbiAgICB9KTtcblxuICAgIHBvaW50c05laWdoYm9yaW5nQXRhcmkgPSBmYWxzZUV5ZVBvaW50cy5maWx0ZXIoZnVuY3Rpb24gKGkpIHtcbiAgICAgIHJldHVybiBuZXV0cmFsQXRhcmlVcGRhdGVkU3RhdGUubmVpZ2hib3JzRm9yKGkueSwgaS54KS5zb21lKGZ1bmN0aW9uIChuKSB7XG4gICAgICAgIHJldHVybiBuZXV0cmFsQXRhcmlVcGRhdGVkU3RhdGUuaW5BdGFyaShuLnksIG4ueCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICB3aGlsZSAocG9pbnRzTmVpZ2hib3JpbmdBdGFyaS5sZW5ndGggPiAwKSB7XG4gICAgX2xvb3AoKTtcbiAgfVxuXG4gIHJldHVybiBuZXV0cmFsQXRhcmlVcGRhdGVkU3RhdGU7XG59O1xuXG52YXIgVGVycml0b3J5U2NvcmluZyA9IE9iamVjdC5mcmVlemUoe1xuICBzY29yZTogZnVuY3Rpb24gc2NvcmUoZ2FtZSkge1xuICAgIHZhciBibGFja0RlYWRBc0NhcHR1cmVzID0gZ2FtZS5kZWFkU3RvbmVzKCkuZmlsdGVyKGZ1bmN0aW9uIChkZWFkUG9pbnQpIHtcbiAgICAgIHJldHVybiBnYW1lLmludGVyc2VjdGlvbkF0KGRlYWRQb2ludC55LCBkZWFkUG9pbnQueCkuaXNCbGFjaygpO1xuICAgIH0pO1xuICAgIHZhciB3aGl0ZURlYWRBc0NhcHR1cmVzID0gZ2FtZS5kZWFkU3RvbmVzKCkuZmlsdGVyKGZ1bmN0aW9uIChkZWFkUG9pbnQpIHtcbiAgICAgIHJldHVybiBnYW1lLmludGVyc2VjdGlvbkF0KGRlYWRQb2ludC55LCBkZWFkUG9pbnQueCkuaXNXaGl0ZSgpO1xuICAgIH0pO1xuXG4gICAgdmFyIHRlcnJpdG9yeSA9IGdhbWUudGVycml0b3J5KCk7XG4gICAgdmFyIGJvYXJkU3RhdGUgPSBnYW1lLmN1cnJlbnRTdGF0ZSgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGJsYWNrOiB0ZXJyaXRvcnkuYmxhY2subGVuZ3RoICsgYm9hcmRTdGF0ZS53aGl0ZVN0b25lc0NhcHR1cmVkICsgd2hpdGVEZWFkQXNDYXB0dXJlcy5sZW5ndGgsXG4gICAgICB3aGl0ZTogdGVycml0b3J5LndoaXRlLmxlbmd0aCArIGJvYXJkU3RhdGUuYmxhY2tTdG9uZXNDYXB0dXJlZCArIGJsYWNrRGVhZEFzQ2FwdHVyZXMubGVuZ3RoXG4gICAgfTtcbiAgfSxcblxuICB0ZXJyaXRvcnk6IGZ1bmN0aW9uIHRlcnJpdG9yeShnYW1lKSB7XG4gICAgdmFyIHN0YXRlV2l0aG91dERlYWRQb2ludHMgPSBib2FyZFN0YXRlV2l0aG91dERlYWRQb2ludHMoZ2FtZSk7XG4gICAgdmFyIHN0YXRlV2l0aG91dE5ldXRyYWxzID0gYm9hcmRTdGF0ZVdpdGhvdXROZXV0cmFsUG9pbnRzKHN0YXRlV2l0aG91dERlYWRQb2ludHMpO1xuICAgIHZhciBzdGF0ZVdpdGhDbGVhckZhbHNlRXllc0ZpbGxlZCA9IGJvYXJkU3RhdGVXaXRoQ2xlYXJGYWxzZUV5ZXNGaWxsZWQoc3RhdGVXaXRob3V0TmV1dHJhbHMpO1xuXG4gICAgdmFyIHRlcnJpdG9yeVJlZ2lvbnMgPSBfcmVnaW9uMi5kZWZhdWx0LmFsbEZvcihzdGF0ZVdpdGhDbGVhckZhbHNlRXllc0ZpbGxlZCkuZmlsdGVyKGZ1bmN0aW9uIChyKSB7XG4gICAgICByZXR1cm4gci5pc1RlcnJpdG9yeSgpO1xuICAgIH0pO1xuXG4gICAgdmFyIHRlcnJpdG9yeVJlZ2lvbnNXaXRob3V0U2VraSA9IHRlcnJpdG9yeVJlZ2lvbnMuZmlsdGVyKGZ1bmN0aW9uIChyKSB7XG4gICAgICB2YXIgbWVyZ2VkID0gX3JlZ2lvbjIuZGVmYXVsdC5tZXJnZSh0ZXJyaXRvcnlSZWdpb25zLCByKTtcbiAgICAgIHZhciBleWVDb3VudHMgPSBtZXJnZWQubWFwKGZ1bmN0aW9uIChtKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwobS5udW1iZXJPZkV5ZXMoKSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGV5ZUNvdW50cy5sZW5ndGggPiAwICYmIGV5ZUNvdW50cy5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgKyBiO1xuICAgICAgfSkgPj0gMjtcbiAgICB9KTtcblxuICAgIHZhciBibGFja1JlZ2lvbnMgPSB0ZXJyaXRvcnlSZWdpb25zV2l0aG91dFNla2kuZmlsdGVyKGZ1bmN0aW9uIChyKSB7XG4gICAgICByZXR1cm4gci5pc0JsYWNrKCk7XG4gICAgfSk7XG4gICAgdmFyIHdoaXRlUmVnaW9ucyA9IHRlcnJpdG9yeVJlZ2lvbnNXaXRob3V0U2VraS5maWx0ZXIoZnVuY3Rpb24gKHIpIHtcbiAgICAgIHJldHVybiByLmlzV2hpdGUoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICBibGFjazogX3V0aWxzMi5kZWZhdWx0LmZsYXRNYXAoYmxhY2tSZWdpb25zLCBmdW5jdGlvbiAocikge1xuICAgICAgICByZXR1cm4gci5pbnRlcnNlY3Rpb25zO1xuICAgICAgfSkubWFwKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgIHJldHVybiB7IHk6IGkueSwgeDogaS54IH07XG4gICAgICB9KSxcbiAgICAgIHdoaXRlOiBfdXRpbHMyLmRlZmF1bHQuZmxhdE1hcCh3aGl0ZVJlZ2lvbnMsIGZ1bmN0aW9uIChyKSB7XG4gICAgICAgIHJldHVybiByLmludGVyc2VjdGlvbnM7XG4gICAgICB9KS5tYXAoZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgcmV0dXJuIHsgeTogaS55LCB4OiBpLnggfTtcbiAgICAgIH0pXG4gICAgfTtcbiAgfVxufSk7XG5cbnZhciBBcmVhU2NvcmluZyA9IE9iamVjdC5mcmVlemUoe1xuICBzY29yZTogZnVuY3Rpb24gc2NvcmUoZ2FtZSkge1xuICAgIHZhciBibGFja1N0b25lc09uVGhlQm9hcmQgPSBnYW1lLmludGVyc2VjdGlvbnMoKS5maWx0ZXIoZnVuY3Rpb24gKGludGVyc2VjdGlvbikge1xuICAgICAgcmV0dXJuIGludGVyc2VjdGlvbi5pc0JsYWNrKCkgJiYgIWdhbWUuX2lzRGVhZEF0KGludGVyc2VjdGlvbi55LCBpbnRlcnNlY3Rpb24ueCk7XG4gICAgfSk7XG4gICAgdmFyIHdoaXRlU3RvbmVzT25UaGVCb2FyZCA9IGdhbWUuaW50ZXJzZWN0aW9ucygpLmZpbHRlcihmdW5jdGlvbiAoaW50ZXJzZWN0aW9uKSB7XG4gICAgICByZXR1cm4gaW50ZXJzZWN0aW9uLmlzV2hpdGUoKSAmJiAhZ2FtZS5faXNEZWFkQXQoaW50ZXJzZWN0aW9uLnksIGludGVyc2VjdGlvbi54KTtcbiAgICB9KTtcbiAgICB2YXIgdGVycml0b3J5ID0gZ2FtZS50ZXJyaXRvcnkoKTtcblxuICAgIHJldHVybiB7XG4gICAgICBibGFjazogdGVycml0b3J5LmJsYWNrLmxlbmd0aCArIGJsYWNrU3RvbmVzT25UaGVCb2FyZC5sZW5ndGgsXG4gICAgICB3aGl0ZTogdGVycml0b3J5LndoaXRlLmxlbmd0aCArIHdoaXRlU3RvbmVzT25UaGVCb2FyZC5sZW5ndGhcbiAgICB9O1xuICB9LFxuXG4gIHRlcnJpdG9yeTogZnVuY3Rpb24gdGVycml0b3J5KGdhbWUpIHtcbiAgICB2YXIgcmVnaW9ucyA9IF9yZWdpb24yLmRlZmF1bHQuYWxsRm9yKGJvYXJkU3RhdGVXaXRob3V0RGVhZFBvaW50cyhnYW1lKSk7XG4gICAgdmFyIHRlcnJpdG9yeVJlZ2lvbnMgPSByZWdpb25zLmZpbHRlcihmdW5jdGlvbiAocikge1xuICAgICAgcmV0dXJuIHIuaXNUZXJyaXRvcnkoKTtcbiAgICB9KTtcbiAgICB2YXIgYmxhY2tSZWdpb25zID0gdGVycml0b3J5UmVnaW9ucy5maWx0ZXIoZnVuY3Rpb24gKHIpIHtcbiAgICAgIHJldHVybiByLmlzQmxhY2soKTtcbiAgICB9KTtcbiAgICB2YXIgd2hpdGVSZWdpb25zID0gdGVycml0b3J5UmVnaW9ucy5maWx0ZXIoZnVuY3Rpb24gKHIpIHtcbiAgICAgIHJldHVybiByLmlzV2hpdGUoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICBibGFjazogX3V0aWxzMi5kZWZhdWx0LmZsYXRNYXAoYmxhY2tSZWdpb25zLCBmdW5jdGlvbiAocikge1xuICAgICAgICByZXR1cm4gci5pbnRlcnNlY3Rpb25zO1xuICAgICAgfSkubWFwKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgIHJldHVybiB7IHk6IGkueSwgeDogaS54IH07XG4gICAgICB9KSxcbiAgICAgIHdoaXRlOiBfdXRpbHMyLmRlZmF1bHQuZmxhdE1hcCh3aGl0ZVJlZ2lvbnMsIGZ1bmN0aW9uIChyKSB7XG4gICAgICAgIHJldHVybiByLmludGVyc2VjdGlvbnM7XG4gICAgICB9KS5tYXAoZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgcmV0dXJuIHsgeTogaS55LCB4OiBpLnggfTtcbiAgICAgIH0pXG4gICAgfTtcbiAgfVxufSk7XG5cbnZhciBTY29yZXIgPSBmdW5jdGlvbiBTY29yZXIoKSB7XG4gIHZhciBfcmVmID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fSxcbiAgICAgIHNjb3JlQnkgPSBfcmVmLnNjb3JlQnksXG4gICAgICBrb21pID0gX3JlZi5rb21pO1xuXG4gIHRoaXMuX3N0cmF0ZWd5ID0ge1xuICAgIFwiYXJlYVwiOiBBcmVhU2NvcmluZyxcbiAgICBcInRlcnJpdG9yeVwiOiBUZXJyaXRvcnlTY29yaW5nLFxuICAgIFwiZXF1aXZhbGVuY2VcIjogQXJlYVNjb3JpbmdcbiAgfVtzY29yZUJ5XTtcblxuICB0aGlzLl9rb21pID0ga29taTtcblxuICBpZiAoIXRoaXMuX3N0cmF0ZWd5KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBzY29yaW5nIHR5cGU6IFwiICsgc2NvcmVCeSk7XG4gIH1cblxuICBpZiAodGhpcy5fa29taSA9PT0gbnVsbCB8fCB0eXBlb2YgdGhpcy5fa29taSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yIGluaXRpYWxpemluZyBzY29yZXIgd2l0aG91dCBhIGtvbWkgdmFsdWVcIik7XG4gIH1cblxuICBpZiAodHlwZW9mIHRoaXMuX2tvbWkgIT09IFwibnVtYmVyXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJLb21pIHZhbHVlIGdpdmVuIGlzIG5vdCBhIG51bWJlcjogXCIgKyBrb21pKTtcbiAgfVxuXG4gIHRoaXMuX3VzZVBhc3NTdG9uZXMgPSBzY29yZUJ5ID09PSBcImVxdWl2YWxlbmNlXCI7XG5cbiAgT2JqZWN0LmZyZWV6ZSh0aGlzKTtcbn07XG5cblNjb3Jlci5wcm90b3R5cGUgPSB7XG4gIHNjb3JlOiBmdW5jdGlvbiBzY29yZShnYW1lKSB7XG4gICAgdmFyIHJlc3VsdCA9IHRoaXMuX3N0cmF0ZWd5LnNjb3JlKGdhbWUpO1xuICAgIHJlc3VsdC53aGl0ZSArPSB0aGlzLl9rb21pO1xuXG4gICAgaWYgKHRoaXMuX3VzZVBhc3NTdG9uZXMpIHtcbiAgICAgIC8vIFVuZGVyIGVxdWl2YWxlbmNlIHNjb3JpbmcsIDIgY29uc2VjdXRpdmUgcGFzc2VzIHNpZ25hbHMoISkgdGhlIGVuZCBvZiB0aGVcbiAgICAgIC8vIGdhbWUsIGJ1dCBqdXN0IHByaW9yIHRvIHRoZSBlbmQgb2YgdGhlIGdhbWUsIHdoaXRlIG11c3QgbWFrZSBvbmUgZmluYWxcbiAgICAgIC8vIHBhc3MgbW92ZSBpZiB0aGUgZ2FtZSBkaWRuJ3QgZW5kIG9uIGEgd2hpdGUgcGFzcy5cbiAgICAgIC8vXG4gICAgICAvLyBIb3dldmVyLCBpbnN0ZWFkIG9mIGNyZWF0aW5nIGEgM3JkIGNvbnNlY3V0aXZlIHBhc3MgaW4gdGhlIGJvYXJkIHN0YXRlLFxuICAgICAgLy8gd2hpdGUncyBhZGRpdGlvbmFsIHBhc3Mgc3RvbmUgaXMgaGFuZGxlZCBieSB0aGUgc2NvcmluZyBtZWNoYW5pc20gYWxvbmUuXG4gICAgICAvLyBUaGUgaWRlYSBpcyB0aGF0LCB1bmRlciBhbnkgZ2FtZSByZXN1bXB0aW9uLCB0aGUgYWRkaXRpb25hbCB3aGl0ZSBwYXNzXG4gICAgICAvLyBzdG9uZSBtdXN0IG5vdCBleGlzdCwgc28gd2Ugc2hvdWxkbid0IGFkZCBpdC5cbiAgICAgIC8vXG4gICAgICAvLyBOT1RFOiB0aGUgZmluYWwgcmVzdWx0IHNob3VsZCByZWx5IG9uIHRoaXMgc2NvcmluZyBmdW5jdGlvbi4gQW55IGNhbGN1bGF0aW9uc1xuICAgICAgLy8gdXNpbmcgcmF3IGJvYXJkIHN0YXRlIHBhc3Mgc3RvbmUgbnVtYmVycyBtYXkgYmUgb2ZmIGJ5IDEgaW4gZmF2b3Igb2YgYmxhY2suXG4gICAgICB2YXIgbmVlZHNGaW5hbFdoaXRlUGFzc1N0b25lID0gZ2FtZS5jdXJyZW50U3RhdGUoKS5jb2xvciAhPT0gXCJ3aGl0ZVwiO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBibGFjazogcmVzdWx0LmJsYWNrICsgZ2FtZS5jdXJyZW50U3RhdGUoKS53aGl0ZVBhc3NTdG9uZXMgKyAobmVlZHNGaW5hbFdoaXRlUGFzc1N0b25lID8gMSA6IDApLFxuICAgICAgICB3aGl0ZTogcmVzdWx0LndoaXRlICsgZ2FtZS5jdXJyZW50U3RhdGUoKS5ibGFja1Bhc3NTdG9uZXNcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9LFxuXG4gIHRlcnJpdG9yeTogZnVuY3Rpb24gdGVycml0b3J5KGdhbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RyYXRlZ3kudGVycml0b3J5KGdhbWUpO1xuICB9LFxuXG4gIHVzaW5nUGFzc1N0b25lczogZnVuY3Rpb24gdXNpbmdQYXNzU3RvbmVzKCkge1xuICAgIHJldHVybiB0aGlzLl91c2VQYXNzU3RvbmVzO1xuICB9XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTY29yZXI7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjb3Jlci5qcy5tYXAiXX0=
},{"./eye-point":5,"./intersection":7,"./region":9,"./utils":14}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _renderer = require("./renderer");

var _renderer2 = _interopRequireDefault(_renderer);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var SVGRenderer = function SVGRenderer(boardElement, _ref) {
  var hooks = _ref.hooks,
      options = _ref.options;

  _renderer2.default.call(this, boardElement, { hooks: hooks, options: options });
  _utils2.default.addClass(boardElement, "tenuki-svg-renderer");
};

SVGRenderer.prototype = Object.create(_renderer2.default.prototype);
SVGRenderer.prototype.constructor = SVGRenderer;

var CACHED_CONSTRUCTED_LINES = {};

var constructSVG = function constructSVG(renderer, boardState, _ref2) {
  var hasCoordinates = _ref2.hasCoordinates,
      smallerStones = _ref2.smallerStones,
      flatStones = _ref2.flatStones;

  var cacheKey = [boardState.boardSize, hasCoordinates, smallerStones, flatStones].toString();

  var svg = _utils2.default.createSVGElement("svg");
  var defs = _utils2.default.createSVGElement("defs");
  _utils2.default.appendElement(svg, defs);

  var blackGradient = _utils2.default.createSVGElement("radialGradient", {
    attributes: {
      id: renderer.blackGradientID,
      cy: "15%",
      r: "50%"
    }
  });
  _utils2.default.appendElement(blackGradient, _utils2.default.createSVGElement("stop", {
    attributes: {
      offset: "0%",
      "stop-color": "hsl(0, 0%, 38%)"
    }
  }));
  _utils2.default.appendElement(blackGradient, _utils2.default.createSVGElement("stop", {
    attributes: {
      offset: "100%",
      "stop-color": "#39363D"
    }
  }));
  _utils2.default.appendElement(defs, blackGradient);

  var whiteGradient = _utils2.default.createSVGElement("radialGradient", {
    attributes: {
      id: renderer.whiteGradientID,
      cy: "15%",
      r: "50%"
    }
  });
  _utils2.default.appendElement(whiteGradient, _utils2.default.createSVGElement("stop", {
    attributes: {
      offset: "0%",
      "stop-color": "#FFFFFF"
    }
  }));
  _utils2.default.appendElement(whiteGradient, _utils2.default.createSVGElement("stop", {
    attributes: {
      offset: "100%",
      "stop-color": "#fafdfc"
    }
  }));
  _utils2.default.appendElement(defs, whiteGradient);

  var contentsContainer = _utils2.default.createSVGElement("g", {
    attributes: {
      class: "contents",
      transform: "translate(" + renderer.MARGIN + ", " + renderer.MARGIN + ")"
    }
  });
  _utils2.default.appendElement(svg, contentsContainer);

  var lines = void 0;

  if (CACHED_CONSTRUCTED_LINES[cacheKey]) {
    lines = _utils2.default.clone(CACHED_CONSTRUCTED_LINES[cacheKey]);
  } else {
    lines = _utils2.default.createSVGElement("g", {
      attributes: {
        class: "lines"
      }
    });

    for (var y = 0; y < boardState.boardSize - 1; y++) {
      for (var x = 0; x < boardState.boardSize - 1; x++) {
        var lineBox = _utils2.default.createSVGElement("rect", {
          attributes: {
            y: y * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
            x: x * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
            width: renderer.INTERSECTION_GAP_SIZE + 1,
            height: renderer.INTERSECTION_GAP_SIZE + 1,
            class: "line-box"
          }
        });

        _utils2.default.appendElement(lines, lineBox);
      }
    }

    CACHED_CONSTRUCTED_LINES[cacheKey] = lines;
  }

  _utils2.default.appendElement(contentsContainer, lines);

  var hoshiPoints = _utils2.default.createSVGElement("g", { attributes: { class: "hoshi" } });
  _utils2.default.appendElement(contentsContainer, hoshiPoints);

  _renderer2.default.hoshiPositionsFor(boardState.boardSize).forEach(function (h) {
    var hoshi = _utils2.default.createSVGElement("circle", {
      attributes: {
        class: "hoshi",
        cy: h.top * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
        cx: h.left * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
        r: 2
      }
    });

    _utils2.default.appendElement(hoshiPoints, hoshi);
  });

  if (hasCoordinates) {
    (function () {
      var coordinateContainer = _utils2.default.createSVGElement("g", {
        attributes: {
          class: "coordinates",
          transform: "translate(" + renderer.MARGIN + ", " + renderer.MARGIN + ")"
        }
      });

      var _loop = function _loop(_y) {
        // TODO: 16 is for the rendered height _on my browser_. not reliable...

        [16 / 2 + 1 - (16 + 16 / 2 + 16 / (2 * 2) + 16 / (2 * 2 * 2)), 16 / 2 + 1 + (16 + 16 / 2) + (boardState.boardSize - 1) * (renderer.INTERSECTION_GAP_SIZE + 1)].forEach(function (verticalOffset) {
          _utils2.default.appendElement(coordinateContainer, _utils2.default.createSVGElement("text", {
            text: boardState.xCoordinateFor(_y),
            attributes: {
              "text-anchor": "middle",
              y: verticalOffset - 0.5,
              x: _y * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5
            }
          }));
        });

        [-1 * (16 + 16 / 2 + 16 / (2 * 2)), 16 + 16 / 2 + 16 / (2 * 2) + (boardState.boardSize - 1) * (renderer.INTERSECTION_GAP_SIZE + 1)].forEach(function (horizontalOffset) {
          _utils2.default.appendElement(coordinateContainer, _utils2.default.createSVGElement("text", {
            text: boardState.yCoordinateFor(_y),
            attributes: {
              "text-anchor": "middle",
              y: _y * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5 + 16 / (2 * 2),
              x: horizontalOffset - 0.5
            }
          }));
        });

        _utils2.default.appendElement(svg, coordinateContainer);
      };

      for (var _y = 0; _y < boardState.boardSize; _y++) {
        _loop(_y);
      }
    })();
  }

  var intersections = _utils2.default.createSVGElement("g", { attributes: { class: "intersections" } });

  for (var _y2 = 0; _y2 < boardState.boardSize; _y2++) {
    for (var _x = 0; _x < boardState.boardSize; _x++) {
      var intersectionGroup = _utils2.default.createSVGElement("g", {
        attributes: {
          class: "intersection"
        }
      });
      intersectionGroup.setAttribute("data-intersection-y", _y2);
      intersectionGroup.setAttribute("data-intersection-x", _x);
      _utils2.default.appendElement(intersections, intersectionGroup);

      var intersectionInnerContainer = _utils2.default.createSVGElement("g", {
        attributes: {
          class: "intersection-inner-container"
        }
      });
      _utils2.default.appendElement(intersectionGroup, intersectionInnerContainer);

      var intersectionBox = _utils2.default.createSVGElement("rect", {
        attributes: {
          y: _y2 * (renderer.INTERSECTION_GAP_SIZE + 1) - renderer.INTERSECTION_GAP_SIZE / 2 - 0.5,
          x: _x * (renderer.INTERSECTION_GAP_SIZE + 1) - renderer.INTERSECTION_GAP_SIZE / 2 - 0.5,
          width: renderer.INTERSECTION_GAP_SIZE,
          height: renderer.INTERSECTION_GAP_SIZE
        }
      });
      _utils2.default.appendElement(intersectionInnerContainer, intersectionBox);

      var stoneRadius = renderer.INTERSECTION_GAP_SIZE / 2;

      if (smallerStones) {
        stoneRadius -= 1;
      }

      var stoneAttributes = {
        class: "stone",
        cy: _y2 * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
        cx: _x * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
        r: stoneRadius
      };

      if (!flatStones) {
        _utils2.default.appendElement(intersectionInnerContainer, _utils2.default.createSVGElement("circle", {
          attributes: {
            class: "stone-shadow",
            cy: stoneAttributes["cy"] + 2,
            cx: stoneAttributes["cx"],
            r: stoneRadius
          }
        }));
      }

      var intersection = _utils2.default.createSVGElement("circle", {
        attributes: stoneAttributes
      });
      _utils2.default.appendElement(intersectionInnerContainer, intersection);

      _utils2.default.appendElement(intersectionInnerContainer, _utils2.default.createSVGElement("circle", {
        attributes: {
          class: "marker",
          cy: _y2 * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
          cx: _x * (renderer.INTERSECTION_GAP_SIZE + 1) - 0.5,
          r: 4.5
        }
      }));

      _utils2.default.appendElement(intersectionInnerContainer, _utils2.default.createSVGElement("rect", {
        attributes: {
          class: "ko-marker",
          y: _y2 * (renderer.INTERSECTION_GAP_SIZE + 1) - 6 - 0.5,
          x: _x * (renderer.INTERSECTION_GAP_SIZE + 1) - 6 - 0.5,
          width: 12,
          height: 12
        }
      }));

      _utils2.default.appendElement(intersectionInnerContainer, _utils2.default.createSVGElement("rect", {
        attributes: {
          class: "territory-marker",
          y: _y2 * (renderer.INTERSECTION_GAP_SIZE + 1) - 6,
          x: _x * (renderer.INTERSECTION_GAP_SIZE + 1) - 6,
          width: 11,
          height: 11
        }
      }));

      renderer.grid[_y2] = renderer.grid[_y2] || [];
      renderer.grid[_y2][_x] = intersectionGroup;

      renderer.addIntersectionEventListeners(intersectionGroup, _y2, _x);
    }
  }

  _utils2.default.appendElement(contentsContainer, intersections);

  return svg;
};

SVGRenderer.prototype.generateBoard = function (boardState, _ref3) {
  var hasCoordinates = _ref3.hasCoordinates,
      smallerStones = _ref3.smallerStones,
      flatStones = _ref3.flatStones;

  this.blackGradientID = _utils2.default.randomID("black-gradient");
  this.whiteGradientID = _utils2.default.randomID("white-gradient");

  var svg = constructSVG(this, boardState, { hasCoordinates: hasCoordinates, smallerStones: smallerStones, flatStones: flatStones });

  this.svgElement = svg;
  this.svgElement.setAttribute("height", this.BOARD_LENGTH);
  this.svgElement.setAttribute("width", this.BOARD_LENGTH);

  return svg;
};

SVGRenderer.prototype.computeSizing = function () {
  var _this = this;

  _renderer2.default.prototype.computeSizing.call(this);

  // In addition to the will-change re-raster in Renderer,
  // the SVG element appears to sometimes need this to
  // prevent blurriness on resize.
  this.svgElement.style.transform = "none";

  window.requestAnimationFrame(function () {
    _this.svgElement.style.transform = "";
  });
};

SVGRenderer.prototype.setIntersectionClasses = function (intersectionEl, intersection, classes) {
  if (intersectionEl.getAttribute("class") !== classes.join(" ")) {
    intersectionEl.setAttribute("class", classes.join(" "));
  }

  if (!this.flatStones) {
    if (intersection.isEmpty()) {
      intersectionEl.querySelector(".stone").setAttribute("style", "");
    } else {
      var base = window.location.href.split('#')[0];
      intersectionEl.querySelector(".stone").setAttribute("style", "fill: url(" + base + "#" + this[intersection.value + "GradientID"] + ")");
    }
  }
};

exports.default = SVGRenderer;

//# sourceMappingURL=svg-renderer.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN2Zy1yZW5kZXJlci5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsIl91dGlscyIsInJlcXVpcmUiLCJfdXRpbHMyIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIl9yZW5kZXJlciIsIl9yZW5kZXJlcjIiLCJvYmoiLCJfX2VzTW9kdWxlIiwiZGVmYXVsdCIsIlNWR1JlbmRlcmVyIiwiYm9hcmRFbGVtZW50IiwiX3JlZiIsImhvb2tzIiwib3B0aW9ucyIsImNhbGwiLCJhZGRDbGFzcyIsInByb3RvdHlwZSIsImNyZWF0ZSIsImNvbnN0cnVjdG9yIiwiQ0FDSEVEX0NPTlNUUlVDVEVEX0xJTkVTIiwiY29uc3RydWN0U1ZHIiwicmVuZGVyZXIiLCJib2FyZFN0YXRlIiwiX3JlZjIiLCJoYXNDb29yZGluYXRlcyIsInNtYWxsZXJTdG9uZXMiLCJmbGF0U3RvbmVzIiwiY2FjaGVLZXkiLCJib2FyZFNpemUiLCJ0b1N0cmluZyIsInN2ZyIsImNyZWF0ZVNWR0VsZW1lbnQiLCJkZWZzIiwiYXBwZW5kRWxlbWVudCIsImJsYWNrR3JhZGllbnQiLCJhdHRyaWJ1dGVzIiwiaWQiLCJibGFja0dyYWRpZW50SUQiLCJjeSIsInIiLCJvZmZzZXQiLCJ3aGl0ZUdyYWRpZW50Iiwid2hpdGVHcmFkaWVudElEIiwiY29udGVudHNDb250YWluZXIiLCJjbGFzcyIsInRyYW5zZm9ybSIsIk1BUkdJTiIsImxpbmVzIiwiY2xvbmUiLCJ5IiwieCIsImxpbmVCb3giLCJJTlRFUlNFQ1RJT05fR0FQX1NJWkUiLCJ3aWR0aCIsImhlaWdodCIsImhvc2hpUG9pbnRzIiwiaG9zaGlQb3NpdGlvbnNGb3IiLCJmb3JFYWNoIiwiaCIsImhvc2hpIiwidG9wIiwiY3giLCJsZWZ0IiwiY29vcmRpbmF0ZUNvbnRhaW5lciIsIl9sb29wIiwiX3kiLCJ2ZXJ0aWNhbE9mZnNldCIsInRleHQiLCJ4Q29vcmRpbmF0ZUZvciIsImhvcml6b250YWxPZmZzZXQiLCJ5Q29vcmRpbmF0ZUZvciIsImludGVyc2VjdGlvbnMiLCJfeTIiLCJfeCIsImludGVyc2VjdGlvbkdyb3VwIiwic2V0QXR0cmlidXRlIiwiaW50ZXJzZWN0aW9uSW5uZXJDb250YWluZXIiLCJpbnRlcnNlY3Rpb25Cb3giLCJzdG9uZVJhZGl1cyIsInN0b25lQXR0cmlidXRlcyIsImludGVyc2VjdGlvbiIsImdyaWQiLCJhZGRJbnRlcnNlY3Rpb25FdmVudExpc3RlbmVycyIsImdlbmVyYXRlQm9hcmQiLCJfcmVmMyIsInJhbmRvbUlEIiwic3ZnRWxlbWVudCIsIkJPQVJEX0xFTkdUSCIsImNvbXB1dGVTaXppbmciLCJfdGhpcyIsInN0eWxlIiwid2luZG93IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic2V0SW50ZXJzZWN0aW9uQ2xhc3NlcyIsImludGVyc2VjdGlvbkVsIiwiY2xhc3NlcyIsImdldEF0dHJpYnV0ZSIsImpvaW4iLCJpc0VtcHR5IiwicXVlcnlTZWxlY3RvciIsImJhc2UiLCJsb2NhdGlvbiIsImhyZWYiLCJzcGxpdCJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUFBLE9BQU9DLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDQyxTQUFPO0FBRG9DLENBQTdDOztBQUlBLElBQUlDLFNBQVNDLFFBQVEsU0FBUixDQUFiOztBQUVBLElBQUlDLFVBQVVDLHVCQUF1QkgsTUFBdkIsQ0FBZDs7QUFFQSxJQUFJSSxZQUFZSCxRQUFRLFlBQVIsQ0FBaEI7O0FBRUEsSUFBSUksYUFBYUYsdUJBQXVCQyxTQUF2QixDQUFqQjs7QUFFQSxTQUFTRCxzQkFBVCxDQUFnQ0csR0FBaEMsRUFBcUM7QUFBRSxTQUFPQSxPQUFPQSxJQUFJQyxVQUFYLEdBQXdCRCxHQUF4QixHQUE4QixFQUFFRSxTQUFTRixHQUFYLEVBQXJDO0FBQXdEOztBQUUvRixJQUFJRyxjQUFjLFNBQVNBLFdBQVQsQ0FBcUJDLFlBQXJCLEVBQW1DQyxJQUFuQyxFQUF5QztBQUN6RCxNQUFJ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LFVBQU4sQ0FBaUJJLEtBQWpCLENBQXVCN0MsU0FBdkIsR0FBbUMsRUFBbkM7QUFDRCxHQUZEO0FBR0QsQ0FiRDs7QUFlQXBDLFlBQVlPLFNBQVosQ0FBc0I2RSxzQkFBdEIsR0FBK0MsVUFBVUMsY0FBVixFQUEwQmQsWUFBMUIsRUFBd0NlLE9BQXhDLEVBQWlEO0FBQzlGLE1BQUlELGVBQWVFLFlBQWYsQ0FBNEIsT0FBNUIsTUFBeUNELFFBQVFFLElBQVIsQ0FBYSxHQUFiLENBQTdDLEVBQWdFO0FBQzlESCxtQkFBZW5CLFlBQWYsQ0FBNEIsT0FBNUIsRUFBcUNvQixRQUFRRSxJQUFSLENBQWEsR0FBYixDQUFyQztBQUNEOztBQUVELE1BQUksQ0FBQyxLQUFLdkUsVUFBVixFQUFzQjtBQUNwQixRQUFJc0QsYUFBYWtCLE9BQWIsRUFBSixFQUE0QjtBQUMxQkoscUJBQWVLLGFBQWYsQ0FBNkIsUUFBN0IsRUFBdUN4QixZQUF2QyxDQUFvRCxPQUFwRCxFQUE2RCxFQUE3RDtBQUNELEtBRkQsTUFFTztBQUNMLFVBQUl5QixPQUFPVCxPQUFPVSxRQUFQLENBQWdCQyxJQUFoQixDQUFxQkMsS0FBckIsQ0FBMkIsR0FBM0IsRUFBZ0MsQ0FBaEMsQ0FBWDtBQUNBVCxxQkFBZUssYUFBZixDQUE2QixRQUE3QixFQUF1Q3hCLFlBQXZDLENBQW9ELE9BQXBELEVBQTZELGVBQWV5QixJQUFmLEdBQXNCLEdBQXRCLEdBQTRCLEtBQUtwQixhQUFhakYsS0FBYixHQUFxQixZQUExQixDQUE1QixHQUFzRSxHQUFuSTtBQUNEO0FBQ0Y7QUFDRixDQWJEOztBQWVBRCxRQUFRVSxPQUFSLEdBQWtCQyxXQUFsQjs7QUFFQSIsImZpbGUiOiJzdmctcmVuZGVyZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF91dGlscyA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xuXG52YXIgX3V0aWxzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3V0aWxzKTtcblxudmFyIF9yZW5kZXJlciA9IHJlcXVpcmUoXCIuL3JlbmRlcmVyXCIpO1xuXG52YXIgX3JlbmRlcmVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlbmRlcmVyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIFNWR1JlbmRlcmVyID0gZnVuY3Rpb24gU1ZHUmVuZGVyZXIoYm9hcmRFbGVtZW50LCBfcmVmKSB7XG4gIHZhciBob29rcyA9IF9yZWYuaG9va3MsXG4gICAgICBvcHRpb25zID0gX3JlZi5vcHRpb25zO1xuXG4gIF9yZW5kZXJlcjIuZGVmYXVsdC5jYWxsKHRoaXMsIGJvYXJkRWxlbWVudCwgeyBob29rczogaG9va3MsIG9wdGlvbnM6IG9wdGlvbnMgfSk7XG4gIF91dGlsczIuZGVmYXVsdC5hZGRDbGFzcyhib2FyZEVsZW1lbnQsIFwidGVudWtpLXN2Zy1yZW5kZXJlclwiKTtcbn07XG5cblNWR1JlbmRlcmVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoX3JlbmRlcmVyMi5kZWZhdWx0LnByb3RvdHlwZSk7XG5TVkdSZW5kZXJlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTVkdSZW5kZXJlcjtcblxudmFyIENBQ0hFRF9DT05TVFJVQ1RFRF9MSU5FUyA9IHt9O1xuXG52YXIgY29uc3RydWN0U1ZHID0gZnVuY3Rpb24gY29uc3RydWN0U1ZHKHJlbmRlcmVyLCBib2FyZFN0YXRlLCBfcmVmMikge1xuICB2YXIgaGFzQ29vcmRpbmF0ZXMgPSBfcmVmMi5oYXNDb29yZGluYXRlcyxcbiAgICAgIHNtYWxsZXJTdG9uZXMgPSBfcmVmMi5zbWFsbGVyU3RvbmVzLFxuICAgICAgZmxhdFN0b25lcyA9IF9yZWYyLmZsYXRTdG9uZXM7XG5cbiAgdmFyIGNhY2hlS2V5ID0gW2JvYXJkU3RhdGUuYm9hcmRTaXplLCBoYXNDb29yZGluYXRlcywgc21hbGxlclN0b25lcywgZmxhdFN0b25lc10udG9TdHJpbmcoKTtcblxuICB2YXIgc3ZnID0gX3V0aWxzMi5kZWZhdWx0LmNyZWF0ZVNWR0VsZW1lbnQoXCJzdmdcIik7XG4gIHZhciBkZWZzID0gX3V0aWxzMi5kZWZhdWx0LmNyZWF0ZVNWR0VsZW1lbnQoXCJkZWZzXCIpO1xuICBfdXRpbHMyLmRlZmF1bHQuYXBwZW5kRWxlbWVudChzdmcsIGRlZnMpO1xuXG4gIHZhciBibGFja0dyYWRpZW50ID0gX3V0aWxzMi5kZWZhdWx0LmNyZWF0ZVNWR0VsZW1lbnQoXCJyYWRpYWxHcmFkaWVudFwiLCB7XG4gICAgYXR0cmlidXRlczoge1xuICAgICAgaWQ6IHJlbmRlcmVyLmJsYWNrR3JhZGllbnRJRCxcbiAgICAgIGN5OiBcIjE1JVwiLFxuICAgICAgcjogXCI1MCVcIlxuICAgIH1cbiAgfSk7XG4gIF91dGlsczIuZGVmYXVsdC5hcHBlbmRFbGVtZW50KGJsYWNrR3JhZGllbnQsIF91dGlsczIuZGVmYXVsdC5jcmVhdGVTVkdFbGVtZW50KFwic3RvcFwiLCB7XG4gICAgYXR0cmlidXRlczoge1xuICAgICAgb2Zmc2V0OiBcIjAlXCIsXG4gICAgICBcInN0b3AtY29sb3JcIjogXCJoc2woMCwgMCUsIDM4JSlcIlxuICAgIH1cbiAgfSkpO1xuICBfdXRpbHMyLmRlZmF1bHQuYXBwZW5kRWxlbWVudChibGFja0dyYWRpZW50LCBfdXRpbHMyLmRlZmF1bHQuY3JlYXRlU1ZHRWxlbWVudChcInN0b3BcIiwge1xuICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgIG9mZnNldDogXCIxMDAlXCIsXG4gICAgICBcInN0b3AtY29sb3JcIjogXCIjMzkzNjNEXCJcbiAgICB9XG4gIH0pKTtcbiAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoZGVmcywgYmxhY2tHcmFkaWVudCk7XG5cbiAgdmFyIHdoaXRlR3JhZGllbnQgPSBfdXRpbHMyLmRlZmF1bHQuY3JlYXRlU1ZHRWxlbWVudChcInJhZGlhbEdyYWRpZW50XCIsIHtcbiAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICBpZDogcmVuZGVyZXIud2hpdGVHcmFkaWVudElELFxuICAgICAgY3k6IFwiMTUlXCIsXG4gICAgICByOiBcIjUwJVwiXG4gICAgfVxuICB9KTtcbiAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQod2hpdGVHcmFkaWVudCwgX3V0aWxzMi5kZWZhdWx0LmNyZWF0ZVNWR0VsZW1lbnQoXCJzdG9wXCIsIHtcbiAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICBvZmZzZXQ6IFwiMCVcIixcbiAgICAgIFwic3RvcC1jb2xvclwiOiBcIiNGRkZGRkZcIlxuICAgIH1cbiAgfSkpO1xuICBfdXRpbHMyLmRlZmF1bHQuYXBwZW5kRWxlbWVudCh3aGl0ZUdyYWRpZW50LCBfdXRpbHMyLmRlZmF1bHQuY3JlYXRlU1ZHRWxlbWVudChcInN0b3BcIiwge1xuICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgIG9mZnNldDogXCIxMDAlXCIsXG4gICAgICBcInN0b3AtY29sb3JcIjogXCIjZmFmZGZjXCJcbiAgICB9XG4gIH0pKTtcbiAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoZGVmcywgd2hpdGVHcmFkaWVudCk7XG5cbiAgdmFyIGNvbnRlbnRzQ29udGFpbmVyID0gX3V0aWxzMi5kZWZhdWx0LmNyZWF0ZVNWR0VsZW1lbnQoXCJnXCIsIHtcbiAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICBjbGFzczogXCJjb250ZW50c1wiLFxuICAgICAgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZShcIiArIHJlbmRlcmVyLk1BUkdJTiArIFwiLCBcIiArIHJlbmRlcmVyLk1BUkdJTiArIFwiKVwiXG4gICAgfVxuICB9KTtcbiAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoc3ZnLCBjb250ZW50c0NvbnRhaW5lcik7XG5cbiAgdmFyIGxpbmVzID0gdm9pZCAwO1xuXG4gIGlmIChDQUNIRURfQ09OU1RSVUNURURfTElORVNbY2FjaGVLZXldKSB7XG4gICAgbGluZXMgPSBfdXRpbHMyLmRlZmF1bHQuY2xvbmUoQ0FDSEVEX0NPTlNUUlVDVEVEX0xJTkVTW2NhY2hlS2V5XSk7XG4gIH0gZWxzZSB7XG4gICAgbGluZXMgPSBfdXRpbHMyLmRlZmF1bHQuY3JlYXRlU1ZHRWxlbWVudChcImdcIiwge1xuICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICBjbGFzczogXCJsaW5lc1wiXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBmb3IgKHZhciB5ID0gMDsgeSA8IGJvYXJkU3RhdGUuYm9hcmRTaXplIC0gMTsgeSsrKSB7XG4gICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IGJvYXJkU3RhdGUuYm9hcmRTaXplIC0gMTsgeCsrKSB7XG4gICAgICAgIHZhciBsaW5lQm94ID0gX3V0aWxzMi5kZWZhdWx0LmNyZWF0ZVNWR0VsZW1lbnQoXCJyZWN0XCIsIHtcbiAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICB5OiB5ICogKHJlbmRlcmVyLklOVEVSU0VDVElPTl9HQVBfU0laRSArIDEpIC0gMC41LFxuICAgICAgICAgICAgeDogeCAqIChyZW5kZXJlci5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKSAtIDAuNSxcbiAgICAgICAgICAgIHdpZHRoOiByZW5kZXJlci5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxLFxuICAgICAgICAgICAgaGVpZ2h0OiByZW5kZXJlci5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxLFxuICAgICAgICAgICAgY2xhc3M6IFwibGluZS1ib3hcIlxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQobGluZXMsIGxpbmVCb3gpO1xuICAgICAgfVxuICAgIH1cblxuICAgIENBQ0hFRF9DT05TVFJVQ1RFRF9MSU5FU1tjYWNoZUtleV0gPSBsaW5lcztcbiAgfVxuXG4gIF91dGlsczIuZGVmYXVsdC5hcHBlbmRFbGVtZW50KGNvbnRlbnRzQ29udGFpbmVyLCBsaW5lcyk7XG5cbiAgdmFyIGhvc2hpUG9pbnRzID0gX3V0aWxzMi5kZWZhdWx0LmNyZWF0ZVNWR0VsZW1lbnQoXCJnXCIsIHsgYXR0cmlidXRlczogeyBjbGFzczogXCJob3NoaVwiIH0gfSk7XG4gIF91dGlsczIuZGVmYXVsdC5hcHBlbmRFbGVtZW50KGNvbnRlbnRzQ29udGFpbmVyLCBob3NoaVBvaW50cyk7XG5cbiAgX3JlbmRlcmVyMi5kZWZhdWx0Lmhvc2hpUG9zaXRpb25zRm9yKGJvYXJkU3RhdGUuYm9hcmRTaXplKS5mb3JFYWNoKGZ1bmN0aW9uIChoKSB7XG4gICAgdmFyIGhvc2hpID0gX3V0aWxzMi5kZWZhdWx0LmNyZWF0ZVNWR0VsZW1lbnQoXCJjaXJjbGVcIiwge1xuICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICBjbGFzczogXCJob3NoaVwiLFxuICAgICAgICBjeTogaC50b3AgKiAocmVuZGVyZXIuSU5URVJTRUNUSU9OX0dBUF9TSVpFICsgMSkgLSAwLjUsXG4gICAgICAgIGN4OiBoLmxlZnQgKiAocmVuZGVyZXIuSU5URVJTRUNUSU9OX0dBUF9TSVpFICsgMSkgLSAwLjUsXG4gICAgICAgIHI6IDJcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIF91dGlsczIuZGVmYXVsdC5hcHBlbmRFbGVtZW50KGhvc2hpUG9pbnRzLCBob3NoaSk7XG4gIH0pO1xuXG4gIGlmIChoYXNDb29yZGluYXRlcykge1xuICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY29vcmRpbmF0ZUNvbnRhaW5lciA9IF91dGlsczIuZGVmYXVsdC5jcmVhdGVTVkdFbGVtZW50KFwiZ1wiLCB7XG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICBjbGFzczogXCJjb29yZGluYXRlc1wiLFxuICAgICAgICAgIHRyYW5zZm9ybTogXCJ0cmFuc2xhdGUoXCIgKyByZW5kZXJlci5NQVJHSU4gKyBcIiwgXCIgKyByZW5kZXJlci5NQVJHSU4gKyBcIilcIlxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdmFyIF9sb29wID0gZnVuY3Rpb24gX2xvb3AoX3kpIHtcbiAgICAgICAgLy8gVE9ETzogMTYgaXMgZm9yIHRoZSByZW5kZXJlZCBoZWlnaHQgX29uIG15IGJyb3dzZXJfLiBub3QgcmVsaWFibGUuLi5cblxuICAgICAgICBbMTYgLyAyICsgMSAtICgxNiArIDE2IC8gMiArIDE2IC8gKDIgKiAyKSArIDE2IC8gKDIgKiAyICogMikpLCAxNiAvIDIgKyAxICsgKDE2ICsgMTYgLyAyKSArIChib2FyZFN0YXRlLmJvYXJkU2l6ZSAtIDEpICogKHJlbmRlcmVyLklOVEVSU0VDVElPTl9HQVBfU0laRSArIDEpXS5mb3JFYWNoKGZ1bmN0aW9uICh2ZXJ0aWNhbE9mZnNldCkge1xuICAgICAgICAgIF91dGlsczIuZGVmYXVsdC5hcHBlbmRFbGVtZW50KGNvb3JkaW5hdGVDb250YWluZXIsIF91dGlsczIuZGVmYXVsdC5jcmVhdGVTVkdFbGVtZW50KFwidGV4dFwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBib2FyZFN0YXRlLnhDb29yZGluYXRlRm9yKF95KSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgXCJ0ZXh0LWFuY2hvclwiOiBcIm1pZGRsZVwiLFxuICAgICAgICAgICAgICB5OiB2ZXJ0aWNhbE9mZnNldCAtIDAuNSxcbiAgICAgICAgICAgICAgeDogX3kgKiAocmVuZGVyZXIuSU5URVJTRUNUSU9OX0dBUF9TSVpFICsgMSkgLSAwLjVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIFstMSAqICgxNiArIDE2IC8gMiArIDE2IC8gKDIgKiAyKSksIDE2ICsgMTYgLyAyICsgMTYgLyAoMiAqIDIpICsgKGJvYXJkU3RhdGUuYm9hcmRTaXplIC0gMSkgKiAocmVuZGVyZXIuSU5URVJTRUNUSU9OX0dBUF9TSVpFICsgMSldLmZvckVhY2goZnVuY3Rpb24gKGhvcml6b250YWxPZmZzZXQpIHtcbiAgICAgICAgICBfdXRpbHMyLmRlZmF1bHQuYXBwZW5kRWxlbWVudChjb29yZGluYXRlQ29udGFpbmVyLCBfdXRpbHMyLmRlZmF1bHQuY3JlYXRlU1ZHRWxlbWVudChcInRleHRcIiwge1xuICAgICAgICAgICAgdGV4dDogYm9hcmRTdGF0ZS55Q29vcmRpbmF0ZUZvcihfeSksXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgIFwidGV4dC1hbmNob3JcIjogXCJtaWRkbGVcIixcbiAgICAgICAgICAgICAgeTogX3kgKiAocmVuZGVyZXIuSU5URVJTRUNUSU9OX0dBUF9TSVpFICsgMSkgLSAwLjUgKyAxNiAvICgyICogMiksXG4gICAgICAgICAgICAgIHg6IGhvcml6b250YWxPZmZzZXQgLSAwLjVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIF91dGlsczIuZGVmYXVsdC5hcHBlbmRFbGVtZW50KHN2ZywgY29vcmRpbmF0ZUNvbnRhaW5lcik7XG4gICAgICB9O1xuXG4gICAgICBmb3IgKHZhciBfeSA9IDA7IF95IDwgYm9hcmRTdGF0ZS5ib2FyZFNpemU7IF95KyspIHtcbiAgICAgICAgX2xvb3AoX3kpO1xuICAgICAgfVxuICAgIH0pKCk7XG4gIH1cblxuICB2YXIgaW50ZXJzZWN0aW9ucyA9IF91dGlsczIuZGVmYXVsdC5jcmVhdGVTVkdFbGVtZW50KFwiZ1wiLCB7IGF0dHJpYnV0ZXM6IHsgY2xhc3M6IFwiaW50ZXJzZWN0aW9uc1wiIH0gfSk7XG5cbiAgZm9yICh2YXIgX3kyID0gMDsgX3kyIDwgYm9hcmRTdGF0ZS5ib2FyZFNpemU7IF95MisrKSB7XG4gICAgZm9yICh2YXIgX3ggPSAwOyBfeCA8IGJvYXJkU3RhdGUuYm9hcmRTaXplOyBfeCsrKSB7XG4gICAgICB2YXIgaW50ZXJzZWN0aW9uR3JvdXAgPSBfdXRpbHMyLmRlZmF1bHQuY3JlYXRlU1ZHRWxlbWVudChcImdcIiwge1xuICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgY2xhc3M6IFwiaW50ZXJzZWN0aW9uXCJcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpbnRlcnNlY3Rpb25Hcm91cC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWludGVyc2VjdGlvbi15XCIsIF95Mik7XG4gICAgICBpbnRlcnNlY3Rpb25Hcm91cC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWludGVyc2VjdGlvbi14XCIsIF94KTtcbiAgICAgIF91dGlsczIuZGVmYXVsdC5hcHBlbmRFbGVtZW50KGludGVyc2VjdGlvbnMsIGludGVyc2VjdGlvbkdyb3VwKTtcblxuICAgICAgdmFyIGludGVyc2VjdGlvbklubmVyQ29udGFpbmVyID0gX3V0aWxzMi5kZWZhdWx0LmNyZWF0ZVNWR0VsZW1lbnQoXCJnXCIsIHtcbiAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgIGNsYXNzOiBcImludGVyc2VjdGlvbi1pbm5lci1jb250YWluZXJcIlxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIF91dGlsczIuZGVmYXVsdC5hcHBlbmRFbGVtZW50KGludGVyc2VjdGlvbkdyb3VwLCBpbnRlcnNlY3Rpb25Jbm5lckNvbnRhaW5lcik7XG5cbiAgICAgIHZhciBpbnRlcnNlY3Rpb25Cb3ggPSBfdXRpbHMyLmRlZmF1bHQuY3JlYXRlU1ZHRWxlbWVudChcInJlY3RcIiwge1xuICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgeTogX3kyICogKHJlbmRlcmVyLklOVEVSU0VDVElPTl9HQVBfU0laRSArIDEpIC0gcmVuZGVyZXIuSU5URVJTRUNUSU9OX0dBUF9TSVpFIC8gMiAtIDAuNSxcbiAgICAgICAgICB4OiBfeCAqIChyZW5kZXJlci5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKSAtIHJlbmRlcmVyLklOVEVSU0VDVElPTl9HQVBfU0laRSAvIDIgLSAwLjUsXG4gICAgICAgICAgd2lkdGg6IHJlbmRlcmVyLklOVEVSU0VDVElPTl9HQVBfU0laRSxcbiAgICAgICAgICBoZWlnaHQ6IHJlbmRlcmVyLklOVEVSU0VDVElPTl9HQVBfU0laRVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIF91dGlsczIuZGVmYXVsdC5hcHBlbmRFbGVtZW50KGludGVyc2VjdGlvbklubmVyQ29udGFpbmVyLCBpbnRlcnNlY3Rpb25Cb3gpO1xuXG4gICAgICB2YXIgc3RvbmVSYWRpdXMgPSByZW5kZXJlci5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgLyAyO1xuXG4gICAgICBpZiAoc21hbGxlclN0b25lcykge1xuICAgICAgICBzdG9uZVJhZGl1cyAtPSAxO1xuICAgICAgfVxuXG4gICAgICB2YXIgc3RvbmVBdHRyaWJ1dGVzID0ge1xuICAgICAgICBjbGFzczogXCJzdG9uZVwiLFxuICAgICAgICBjeTogX3kyICogKHJlbmRlcmVyLklOVEVSU0VDVElPTl9HQVBfU0laRSArIDEpIC0gMC41LFxuICAgICAgICBjeDogX3ggKiAocmVuZGVyZXIuSU5URVJTRUNUSU9OX0dBUF9TSVpFICsgMSkgLSAwLjUsXG4gICAgICAgIHI6IHN0b25lUmFkaXVzXG4gICAgICB9O1xuXG4gICAgICBpZiAoIWZsYXRTdG9uZXMpIHtcbiAgICAgICAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoaW50ZXJzZWN0aW9uSW5uZXJDb250YWluZXIsIF91dGlsczIuZGVmYXVsdC5jcmVhdGVTVkdFbGVtZW50KFwiY2lyY2xlXCIsIHtcbiAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICBjbGFzczogXCJzdG9uZS1zaGFkb3dcIixcbiAgICAgICAgICAgIGN5OiBzdG9uZUF0dHJpYnV0ZXNbXCJjeVwiXSArIDIsXG4gICAgICAgICAgICBjeDogc3RvbmVBdHRyaWJ1dGVzW1wiY3hcIl0sXG4gICAgICAgICAgICByOiBzdG9uZVJhZGl1c1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfVxuXG4gICAgICB2YXIgaW50ZXJzZWN0aW9uID0gX3V0aWxzMi5kZWZhdWx0LmNyZWF0ZVNWR0VsZW1lbnQoXCJjaXJjbGVcIiwge1xuICAgICAgICBhdHRyaWJ1dGVzOiBzdG9uZUF0dHJpYnV0ZXNcbiAgICAgIH0pO1xuICAgICAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoaW50ZXJzZWN0aW9uSW5uZXJDb250YWluZXIsIGludGVyc2VjdGlvbik7XG5cbiAgICAgIF91dGlsczIuZGVmYXVsdC5hcHBlbmRFbGVtZW50KGludGVyc2VjdGlvbklubmVyQ29udGFpbmVyLCBfdXRpbHMyLmRlZmF1bHQuY3JlYXRlU1ZHRWxlbWVudChcImNpcmNsZVwiLCB7XG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICBjbGFzczogXCJtYXJrZXJcIixcbiAgICAgICAgICBjeTogX3kyICogKHJlbmRlcmVyLklOVEVSU0VDVElPTl9HQVBfU0laRSArIDEpIC0gMC41LFxuICAgICAgICAgIGN4OiBfeCAqIChyZW5kZXJlci5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKSAtIDAuNSxcbiAgICAgICAgICByOiA0LjVcbiAgICAgICAgfVxuICAgICAgfSkpO1xuXG4gICAgICBfdXRpbHMyLmRlZmF1bHQuYXBwZW5kRWxlbWVudChpbnRlcnNlY3Rpb25Jbm5lckNvbnRhaW5lciwgX3V0aWxzMi5kZWZhdWx0LmNyZWF0ZVNWR0VsZW1lbnQoXCJyZWN0XCIsIHtcbiAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgIGNsYXNzOiBcImtvLW1hcmtlclwiLFxuICAgICAgICAgIHk6IF95MiAqIChyZW5kZXJlci5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKSAtIDYgLSAwLjUsXG4gICAgICAgICAgeDogX3ggKiAocmVuZGVyZXIuSU5URVJTRUNUSU9OX0dBUF9TSVpFICsgMSkgLSA2IC0gMC41LFxuICAgICAgICAgIHdpZHRoOiAxMixcbiAgICAgICAgICBoZWlnaHQ6IDEyXG4gICAgICAgIH1cbiAgICAgIH0pKTtcblxuICAgICAgX3V0aWxzMi5kZWZhdWx0LmFwcGVuZEVsZW1lbnQoaW50ZXJzZWN0aW9uSW5uZXJDb250YWluZXIsIF91dGlsczIuZGVmYXVsdC5jcmVhdGVTVkdFbGVtZW50KFwicmVjdFwiLCB7XG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICBjbGFzczogXCJ0ZXJyaXRvcnktbWFya2VyXCIsXG4gICAgICAgICAgeTogX3kyICogKHJlbmRlcmVyLklOVEVSU0VDVElPTl9HQVBfU0laRSArIDEpIC0gNixcbiAgICAgICAgICB4OiBfeCAqIChyZW5kZXJlci5JTlRFUlNFQ1RJT05fR0FQX1NJWkUgKyAxKSAtIDYsXG4gICAgICAgICAgd2lkdGg6IDExLFxuICAgICAgICAgIGhlaWdodDogMTFcbiAgICAgICAgfVxuICAgICAgfSkpO1xuXG4gICAgICByZW5kZXJlci5ncmlkW195Ml0gPSByZW5kZXJlci5ncmlkW195Ml0gfHwgW107XG4gICAgICByZW5kZXJlci5ncmlkW195Ml1bX3hdID0gaW50ZXJzZWN0aW9uR3JvdXA7XG5cbiAgICAgIHJlbmRlcmVyLmFkZEludGVyc2VjdGlvbkV2ZW50TGlzdGVuZXJzKGludGVyc2VjdGlvbkdyb3VwLCBfeTIsIF94KTtcbiAgICB9XG4gIH1cblxuICBfdXRpbHMyLmRlZmF1bHQuYXBwZW5kRWxlbWVudChjb250ZW50c0NvbnRhaW5lciwgaW50ZXJzZWN0aW9ucyk7XG5cbiAgcmV0dXJuIHN2Zztcbn07XG5cblNWR1JlbmRlcmVyLnByb3RvdHlwZS5nZW5lcmF0ZUJvYXJkID0gZnVuY3Rpb24gKGJvYXJkU3RhdGUsIF9yZWYzKSB7XG4gIHZhciBoYXNDb29yZGluYXRlcyA9IF9yZWYzLmhhc0Nvb3JkaW5hdGVzLFxuICAgICAgc21hbGxlclN0b25lcyA9IF9yZWYzLnNtYWxsZXJTdG9uZXMsXG4gICAgICBmbGF0U3RvbmVzID0gX3JlZjMuZmxhdFN0b25lcztcblxuICB0aGlzLmJsYWNrR3JhZGllbnRJRCA9IF91dGlsczIuZGVmYXVsdC5yYW5kb21JRChcImJsYWNrLWdyYWRpZW50XCIpO1xuICB0aGlzLndoaXRlR3JhZGllbnRJRCA9IF91dGlsczIuZGVmYXVsdC5yYW5kb21JRChcIndoaXRlLWdyYWRpZW50XCIpO1xuXG4gIHZhciBzdmcgPSBjb25zdHJ1Y3RTVkcodGhpcywgYm9hcmRTdGF0ZSwgeyBoYXNDb29yZGluYXRlczogaGFzQ29vcmRpbmF0ZXMsIHNtYWxsZXJTdG9uZXM6IHNtYWxsZXJTdG9uZXMsIGZsYXRTdG9uZXM6IGZsYXRTdG9uZXMgfSk7XG5cbiAgdGhpcy5zdmdFbGVtZW50ID0gc3ZnO1xuICB0aGlzLnN2Z0VsZW1lbnQuc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIHRoaXMuQk9BUkRfTEVOR1RIKTtcbiAgdGhpcy5zdmdFbGVtZW50LnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIHRoaXMuQk9BUkRfTEVOR1RIKTtcblxuICByZXR1cm4gc3ZnO1xufTtcblxuU1ZHUmVuZGVyZXIucHJvdG90eXBlLmNvbXB1dGVTaXppbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgX3JlbmRlcmVyMi5kZWZhdWx0LnByb3RvdHlwZS5jb21wdXRlU2l6aW5nLmNhbGwodGhpcyk7XG5cbiAgLy8gSW4gYWRkaXRpb24gdG8gdGhlIHdpbGwtY2hhbmdlIHJlLXJhc3RlciBpbiBSZW5kZXJlcixcbiAgLy8gdGhlIFNWRyBlbGVtZW50IGFwcGVhcnMgdG8gc29tZXRpbWVzIG5lZWQgdGhpcyB0b1xuICAvLyBwcmV2ZW50IGJsdXJyaW5lc3Mgb24gcmVzaXplLlxuICB0aGlzLnN2Z0VsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gXCJub25lXCI7XG5cbiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgX3RoaXMuc3ZnRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBcIlwiO1xuICB9KTtcbn07XG5cblNWR1JlbmRlcmVyLnByb3RvdHlwZS5zZXRJbnRlcnNlY3Rpb25DbGFzc2VzID0gZnVuY3Rpb24gKGludGVyc2VjdGlvbkVsLCBpbnRlcnNlY3Rpb24sIGNsYXNzZXMpIHtcbiAgaWYgKGludGVyc2VjdGlvbkVsLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpICE9PSBjbGFzc2VzLmpvaW4oXCIgXCIpKSB7XG4gICAgaW50ZXJzZWN0aW9uRWwuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY2xhc3Nlcy5qb2luKFwiIFwiKSk7XG4gIH1cblxuICBpZiAoIXRoaXMuZmxhdFN0b25lcykge1xuICAgIGlmIChpbnRlcnNlY3Rpb24uaXNFbXB0eSgpKSB7XG4gICAgICBpbnRlcnNlY3Rpb25FbC5xdWVyeVNlbGVjdG9yKFwiLnN0b25lXCIpLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYmFzZSA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KCcjJylbMF07XG4gICAgICBpbnRlcnNlY3Rpb25FbC5xdWVyeVNlbGVjdG9yKFwiLnN0b25lXCIpLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiZmlsbDogdXJsKFwiICsgYmFzZSArIFwiI1wiICsgdGhpc1tpbnRlcnNlY3Rpb24udmFsdWUgKyBcIkdyYWRpZW50SURcIl0gKyBcIilcIik7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTVkdSZW5kZXJlcjtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3ZnLXJlbmRlcmVyLmpzLm1hcCJdfQ==
},{"./renderer":10,"./utils":14}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  flatten: function flatten(ary) {
    return ary.reduce(function (a, b) {
      return a.concat(b);
    });
  },

  flatMap: function flatMap(ary, lambda) {
    return Array.prototype.concat.apply([], ary.map(lambda));
  },

  cartesianProduct: function cartesianProduct(ary1, ary2) {
    return this.flatten(ary1.map(function (x) {
      return ary2.map(function (y) {
        return [x, y];
      });
    }));
  },

  randomID: function randomID(prefix) {
    var str = [0, 1, 2, 3].map(function () {
      return Math.floor(Math.random() * 0x10000).toString(16).substring(1);
    }).join("");

    return prefix + "-" + str;
  },

  clone: function clone(element) {
    return element.cloneNode(true);
  },

  createElement: function createElement(elementName, options) {
    var element = document.createElement(elementName);

    if (typeof options !== "undefined") {
      if (options.class) {
        element.className = options.class;
      }
    }

    return element;
  },

  createSVGElement: function createSVGElement(elementName, options) {
    var _this = this;

    var svgNamespace = "http://www.w3.org/2000/svg";
    var element = document.createElementNS(svgNamespace, elementName);

    if (typeof options !== "undefined") {
      if (options.class) {
        options.class.split(" ").forEach(function (name) {
          _this.addClass(element, name);
        });
      }

      if (options.attributes) {
        Object.keys(options.attributes).forEach(function (k) {
          element.setAttribute(k, options.attributes[k]);
        });
      }

      if (options.text) {
        element.textContent = options.text.toString();
      }
    }

    return element;
  },

  appendElement: function appendElement(parent, el) {
    parent.insertBefore(el, null);
  },

  addEventListener: function addEventListener(el, eventName, fn) {
    el.addEventListener(eventName, fn, false);
  },

  removeClass: function removeClass(el, className) {
    if (!this.hasClass(el, className)) {
      return;
    }

    if (el.classList && el.classList.remove) {
      el.classList.remove(className);
      return;
    }

    var classNameRegex = RegExp('\\b' + className + '\\b', "g");

    if (el instanceof SVGElement) {
      el.setAttribute("class", el.getAttribute("class").replace(classNameRegex, ""));
    } else {
      el.className = el.getAttribute("class").replace(classNameRegex, "");
    }
  },

  addClass: function addClass(el, className) {
    if (el.classList && el.classList.add) {
      el.classList.add(className);
      return;
    }

    if (el instanceof SVGElement) {
      el.setAttribute("class", el.getAttribute("class") + " " + className);
    } else {
      el.className = el.getAttribute("class") + " " + className;
    }
  },

  hasClass: function hasClass(el, className) {
    if (el.classList && el.classList.contains) {
      return el.classList.contains(className);
    }

    var classNameRegex = RegExp('\\b' + className + '\\b', "g");

    if (el instanceof SVGElement) {
      return classNameRegex.test(el.getAttribute("class"));
    } else {
      return classNameRegex.test(el.className);
    }
  },

  toggleClass: function toggleClass(el, className) {
    if (el.classList && el.classList.toggle) {
      el.classList.toggle(className);
      return;
    }

    if (this.hasClass(el, className)) {
      this.removeClass(el, className);
    } else {
      this.addClass(el, className);
    }
  },

  unique: function unique(ary) {
    var unique = [];
    ary.forEach(function (el) {
      if (unique.indexOf(el) < 0) {
        unique.push(el);
      }
    });
    return unique;
  }
};

//# sourceMappingURL=utils.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiZGVmYXVsdCIsImZsYXR0ZW4iLCJhcnkiLCJyZWR1Y2UiLCJhIiwiYiIsImNvbmNhdCIsImZsYXRNYXAiLCJsYW1iZGEiLCJBcnJheSIsInByb3RvdHlwZSIsImFwcGx5IiwibWFwIiwiY2FydGVzaWFuUHJvZHVjdCIsImFyeTEiLCJhcnkyIiwieCIsInkiLCJyYW5kb21JRCIsInByZWZpeCIsInN0ciIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRvU3RyaW5nIiwic3Vic3RyaW5nIiwiam9pbiIsImNsb25lIiwiZWxlbWVudCIsImNsb25lTm9kZSIsImNyZWF0ZUVsZW1lbnQiLCJlbGVtZW50TmFtZSIsIm9wdGlvbnMiLCJkb2N1bWVudCIsImNsYXNzIiwiY2xhc3NOYW1lIiwiY3JlYXRlU1ZHRWxlbWVudCIsIl90aGlzIiwic3ZnTmFtZXNwYWNlIiwiY3JlYXRlRWxlbWVudE5TIiwic3BsaXQiLCJmb3JFYWNoIiwibmFtZSIsImFkZENsYXNzIiwiYXR0cmlidXRlcyIsImtleXMiLCJrIiwic2V0QXR0cmlidXRlIiwidGV4dCIsInRleHRDb250ZW50IiwiYXBwZW5kRWxlbWVudCIsInBhcmVudCIsImVsIiwiaW5zZXJ0QmVmb3JlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50TmFtZSIsImZuIiwicmVtb3ZlQ2xhc3MiLCJoYXNDbGFzcyIsImNsYXNzTGlzdCIsInJlbW92ZSIsImNsYXNzTmFtZVJlZ2V4IiwiUmVnRXhwIiwiU1ZHRWxlbWVudCIsImdldEF0dHJpYnV0ZSIsInJlcGxhY2UiLCJhZGQiLCJjb250YWlucyIsInRlc3QiLCJ0b2dnbGVDbGFzcyIsInRvZ2dsZSIsInVuaXF1ZSIsImluZGV4T2YiLCJwdXNoIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQUEsT0FBT0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFB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R0ExSGU7O0FBNEhoQmtDLGVBQWEsU0FBU0EsV0FBVCxDQUFxQmpCLEVBQXJCLEVBQXlCakIsU0FBekIsRUFBb0M7QUFDL0MsUUFBSWlCLEdBQUdPLFNBQUgsSUFBZ0JQLEdBQUdPLFNBQUgsQ0FBYVcsTUFBakMsRUFBeUM7QUFDdkNsQixTQUFHTyxTQUFILENBQWFXLE1BQWIsQ0FBb0JuQyxTQUFwQjtBQUNBO0FBQ0Q7O0FBRUQsUUFBSSxLQUFLdUIsUUFBTCxDQUFjTixFQUFkLEVBQWtCakIsU0FBbEIsQ0FBSixFQUFrQztBQUNoQyxXQUFLc0IsV0FBTCxDQUFpQkwsRUFBakIsRUFBcUJqQixTQUFyQjtBQUNELEtBRkQsTUFFTztBQUNMLFdBQUtRLFFBQUwsQ0FBY1MsRUFBZCxFQUFrQmpCLFNBQWxCO0FBQ0Q7QUFDRixHQXZJZTs7QUF5SWhCb0MsVUFBUSxTQUFTQSxNQUFULENBQWdCckUsR0FBaEIsRUFBcUI7QUFDM0IsUUFBSXFFLFNBQVMsRUFBYjtBQUNBckUsUUFBSXVDLE9BQUosQ0FBWSxVQUFVVyxFQUFWLEVBQWM7QUFDeEIsVUFBSW1CLE9BQU9DLE9BQVAsQ0FBZXBCLEVBQWYsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUJtQixlQUFPRSxJQUFQLENBQVlyQixFQUFaO0FBQ0Q7QUFDRixLQUpEO0FBS0EsV0FBT21CLE1BQVA7QUFDRDtBQWpKZSxDQUFsQjs7QUFvSkEiLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgZmxhdHRlbjogZnVuY3Rpb24gZmxhdHRlbihhcnkpIHtcbiAgICByZXR1cm4gYXJ5LnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGEuY29uY2F0KGIpO1xuICAgIH0pO1xuICB9LFxuXG4gIGZsYXRNYXA6IGZ1bmN0aW9uIGZsYXRNYXAoYXJ5LCBsYW1iZGEpIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSwgYXJ5Lm1hcChsYW1iZGEpKTtcbiAgfSxcblxuICBjYXJ0ZXNpYW5Qcm9kdWN0OiBmdW5jdGlvbiBjYXJ0ZXNpYW5Qcm9kdWN0KGFyeTEsIGFyeTIpIHtcbiAgICByZXR1cm4gdGhpcy5mbGF0dGVuKGFyeTEubWFwKGZ1bmN0aW9uICh4KSB7XG4gICAgICByZXR1cm4gYXJ5Mi5tYXAoZnVuY3Rpb24gKHkpIHtcbiAgICAgICAgcmV0dXJuIFt4LCB5XTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgfSxcblxuICByYW5kb21JRDogZnVuY3Rpb24gcmFuZG9tSUQocHJlZml4KSB7XG4gICAgdmFyIHN0ciA9IFswLCAxLCAyLCAzXS5tYXAoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDB4MTAwMDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSk7XG4gICAgfSkuam9pbihcIlwiKTtcblxuICAgIHJldHVybiBwcmVmaXggKyBcIi1cIiArIHN0cjtcbiAgfSxcblxuICBjbG9uZTogZnVuY3Rpb24gY2xvbmUoZWxlbWVudCkge1xuICAgIHJldHVybiBlbGVtZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgfSxcblxuICBjcmVhdGVFbGVtZW50OiBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGVsZW1lbnROYW1lLCBvcHRpb25zKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnROYW1lKTtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgaWYgKG9wdGlvbnMuY2xhc3MpIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBvcHRpb25zLmNsYXNzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9LFxuXG4gIGNyZWF0ZVNWR0VsZW1lbnQ6IGZ1bmN0aW9uIGNyZWF0ZVNWR0VsZW1lbnQoZWxlbWVudE5hbWUsIG9wdGlvbnMpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdmFyIHN2Z05hbWVzcGFjZSA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIjtcbiAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhzdmdOYW1lc3BhY2UsIGVsZW1lbnROYW1lKTtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgaWYgKG9wdGlvbnMuY2xhc3MpIHtcbiAgICAgICAgb3B0aW9ucy5jbGFzcy5zcGxpdChcIiBcIikuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgIF90aGlzLmFkZENsYXNzKGVsZW1lbnQsIG5hbWUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMuYXR0cmlidXRlcykge1xuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zLmF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrLCBvcHRpb25zLmF0dHJpYnV0ZXNba10pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMudGV4dCkge1xuICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gb3B0aW9ucy50ZXh0LnRvU3RyaW5nKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH0sXG5cbiAgYXBwZW5kRWxlbWVudDogZnVuY3Rpb24gYXBwZW5kRWxlbWVudChwYXJlbnQsIGVsKSB7XG4gICAgcGFyZW50Lmluc2VydEJlZm9yZShlbCwgbnVsbCk7XG4gIH0sXG5cbiAgYWRkRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcihlbCwgZXZlbnROYW1lLCBmbikge1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBmbiwgZmFsc2UpO1xuICB9LFxuXG4gIHJlbW92ZUNsYXNzOiBmdW5jdGlvbiByZW1vdmVDbGFzcyhlbCwgY2xhc3NOYW1lKSB7XG4gICAgaWYgKCF0aGlzLmhhc0NsYXNzKGVsLCBjbGFzc05hbWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGVsLmNsYXNzTGlzdCAmJiBlbC5jbGFzc0xpc3QucmVtb3ZlKSB7XG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGNsYXNzTmFtZVJlZ2V4ID0gUmVnRXhwKCdcXFxcYicgKyBjbGFzc05hbWUgKyAnXFxcXGInLCBcImdcIik7XG5cbiAgICBpZiAoZWwgaW5zdGFuY2VvZiBTVkdFbGVtZW50KSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBlbC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKS5yZXBsYWNlKGNsYXNzTmFtZVJlZ2V4LCBcIlwiKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpLnJlcGxhY2UoY2xhc3NOYW1lUmVnZXgsIFwiXCIpO1xuICAgIH1cbiAgfSxcblxuICBhZGRDbGFzczogZnVuY3Rpb24gYWRkQ2xhc3MoZWwsIGNsYXNzTmFtZSkge1xuICAgIGlmIChlbC5jbGFzc0xpc3QgJiYgZWwuY2xhc3NMaXN0LmFkZCkge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlbCBpbnN0YW5jZW9mIFNWR0VsZW1lbnQpIHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGVsLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpICsgXCIgXCIgKyBjbGFzc05hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5jbGFzc05hbWUgPSBlbC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSArIFwiIFwiICsgY2xhc3NOYW1lO1xuICAgIH1cbiAgfSxcblxuICBoYXNDbGFzczogZnVuY3Rpb24gaGFzQ2xhc3MoZWwsIGNsYXNzTmFtZSkge1xuICAgIGlmIChlbC5jbGFzc0xpc3QgJiYgZWwuY2xhc3NMaXN0LmNvbnRhaW5zKSB7XG4gICAgICByZXR1cm4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG4gICAgfVxuXG4gICAgdmFyIGNsYXNzTmFtZVJlZ2V4ID0gUmVnRXhwKCdcXFxcYicgKyBjbGFzc05hbWUgKyAnXFxcXGInLCBcImdcIik7XG5cbiAgICBpZiAoZWwgaW5zdGFuY2VvZiBTVkdFbGVtZW50KSB7XG4gICAgICByZXR1cm4gY2xhc3NOYW1lUmVnZXgudGVzdChlbC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjbGFzc05hbWVSZWdleC50ZXN0KGVsLmNsYXNzTmFtZSk7XG4gICAgfVxuICB9LFxuXG4gIHRvZ2dsZUNsYXNzOiBmdW5jdGlvbiB0b2dnbGVDbGFzcyhlbCwgY2xhc3NOYW1lKSB7XG4gICAgaWYgKGVsLmNsYXNzTGlzdCAmJiBlbC5jbGFzc0xpc3QudG9nZ2xlKSB7XG4gICAgICBlbC5jbGFzc0xpc3QudG9nZ2xlKGNsYXNzTmFtZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGFzQ2xhc3MoZWwsIGNsYXNzTmFtZSkpIHtcbiAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoZWwsIGNsYXNzTmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkQ2xhc3MoZWwsIGNsYXNzTmFtZSk7XG4gICAgfVxuICB9LFxuXG4gIHVuaXF1ZTogZnVuY3Rpb24gdW5pcXVlKGFyeSkge1xuICAgIHZhciB1bmlxdWUgPSBbXTtcbiAgICBhcnkuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgIGlmICh1bmlxdWUuaW5kZXhPZihlbCkgPCAwKSB7XG4gICAgICAgIHVuaXF1ZS5wdXNoKGVsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdW5pcXVlO1xuICB9XG59O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD11dGlscy5qcy5tYXAiXX0=
},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var cache = {};

function initialBitstringFor(size, y, x, value) {
  cache[size] = cache[size] || {};
  cache[size][y] = cache[size][y] || {};
  cache[size][y][x] = cache[size][y][x] || {};

  if (cache[size][y][x][value]) {
    return cache[size][y][x][value];
  }

  // The number of legal 19x19 go moves is on the order of 10^170 ≈ 2^565, so
  // a hash output on the order of 2^31 is woefully insufficient for arbitrary
  // positions, but it should be good enough for human play, since we're not
  // searching the entire space. This should be good enough for ~300-move games.
  var randomValue = Math.floor(Math.random() * (Math.pow(2, 31) - 1));
  cache[size][y][x][value] = randomValue;

  return randomValue;
}

exports.default = {
  hash: function hash(boardSize, intersections) {
    var h = 0;

    intersections.forEach(function (i) {
      if (!i.isEmpty()) {
        var initial = initialBitstringFor(boardSize, i.y, i.x, i.value);
        h = h ^ initial;
      }
    });

    return h;
  }
};

//# sourceMappingURL=zobrist.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInpvYnJpc3QuanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJjYWNoZSIsImluaXRpYWxCaXRzdHJpbmdGb3IiLCJzaXplIiwieSIsIngiLCJyYW5kb21WYWx1ZSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInBvdyIsImRlZmF1bHQiLCJoYXNoIiwiYm9hcmRTaXplIiwiaW50ZXJzZWN0aW9ucyIsImgiLCJmb3JFYWNoIiwiaSIsImlzRW1wdHkiLCJpbml0aWFsIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQUEsT0FBT0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLFNBQU87QUFEb0MsQ0FBN0M7QUFHQSxJQUFJQyxRQUFRLEVBQVo7O0FBRUEsU0FBU0MsbUJBQVQsQ0FBNkJDLElBQTdCLEVBQW1DQyxDQUFuQyxFQUFzQ0MsQ0FBdEMsRUFBeUNMLEtBQXpDLEVBQWdEO0FBQzlDQyxRQUFNRSxJQUFOLElBQWNGLE1BQU1FLElBQU4sS0FBZSxFQUE3QjtBQUNBRixRQUFNRSxJQUFOLEVBQVlDLENBQVosSUFBaUJILE1BQU1FLElBQU4sRUFBWUMsQ0FBWixLQUFrQixFQUFuQztBQUNBSCxRQUFNRSxJQUFOLEVBQVlDLENBQVosRUFBZUMsQ0FBZixJQUFvQkosTUFBTUUsSUFBTixFQUFZQyxDQUFaLEVBQWVDLENBQWYsS0FBcUIsRUFBekM7O0FBRUEsTUFBSUosTUFBTUUsSUFBTixFQUFZQyxDQUFaLEVBQWVDLENBQWYsRUFBa0JMLEtBQWxCLENBQUosRUFBOEI7QUFDNUIsV0FBT0MsTUFBTUUsSUFBTixFQUFZQyxDQUFaLEVBQWVDLENBQWYsRUFBa0JMLEtBQWxCLENBQVA7QUFDRDs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUlNLGNBQWNDLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS0UsTUFBTCxNQUFpQkYsS0FBS0csR0FBTCxDQUFTLENBQVQsRUFBWSxFQUFaLElBQWtCLENBQW5DLENBQVgsQ0FBbEI7QUFDQVQsUUFBTUUsSUFBTixFQUFZQyxDQUFaLEVBQWVDLENBQWYsRUFBa0JMLEtBQWxCLElBQTJCTSxXQUEzQjs7QUFFQSxTQUFPQSxXQUFQO0FBQ0Q7O0FBRURQLFFBQVFZLE9BQVIsR0FBa0I7QUFDaEJDLFFBQU0sU0FBU0EsSUFBVCxDQUFjQyxTQUFkLEVBQXlCQyxhQUF6QixFQUF3QztBQUM1QyxRQUFJQyxJQUFJLENBQVI7O0FBRUFELGtCQUFjRSxPQUFkLENBQXNCLFVBQVVDLENBQVYsRUFBYTtBQUNqQyxVQUFJLENBQUNBLEVBQUVDLE9BQUYsRUFBTCxFQUFrQjtBQUNoQixZQUFJQyxVQUFVakIsb0JBQW9CVyxTQUFwQixFQUErQkksRUFBRWIsQ0FBakMsRUFBb0NhLEVBQUVaLENBQXRDLEVBQXlDWSxFQUFFakIsS0FBM0MsQ0FBZDtBQUNBZSxZQUFJQSxJQUFJSSxPQUFSO0FBQ0Q7QUFDRixLQUxEOztBQU9BLFdBQU9KLENBQVA7QUFDRDtBQVplLENBQWxCOztBQWVBIiwiZmlsZSI6InpvYnJpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBjYWNoZSA9IHt9O1xuXG5mdW5jdGlvbiBpbml0aWFsQml0c3RyaW5nRm9yKHNpemUsIHksIHgsIHZhbHVlKSB7XG4gIGNhY2hlW3NpemVdID0gY2FjaGVbc2l6ZV0gfHwge307XG4gIGNhY2hlW3NpemVdW3ldID0gY2FjaGVbc2l6ZV1beV0gfHwge307XG4gIGNhY2hlW3NpemVdW3ldW3hdID0gY2FjaGVbc2l6ZV1beV1beF0gfHwge307XG5cbiAgaWYgKGNhY2hlW3NpemVdW3ldW3hdW3ZhbHVlXSkge1xuICAgIHJldHVybiBjYWNoZVtzaXplXVt5XVt4XVt2YWx1ZV07XG4gIH1cblxuICAvLyBUaGUgbnVtYmVyIG9mIGxlZ2FsIDE5eDE5IGdvIG1vdmVzIGlzIG9uIHRoZSBvcmRlciBvZiAxMF4xNzAg4omIIDJeNTY1LCBzb1xuICAvLyBhIGhhc2ggb3V0cHV0IG9uIHRoZSBvcmRlciBvZiAyXjMxIGlzIHdvZWZ1bGx5IGluc3VmZmljaWVudCBmb3IgYXJiaXRyYXJ5XG4gIC8vIHBvc2l0aW9ucywgYnV0IGl0IHNob3VsZCBiZSBnb29kIGVub3VnaCBmb3IgaHVtYW4gcGxheSwgc2luY2Ugd2UncmUgbm90XG4gIC8vIHNlYXJjaGluZyB0aGUgZW50aXJlIHNwYWNlLiBUaGlzIHNob3VsZCBiZSBnb29kIGVub3VnaCBmb3IgfjMwMC1tb3ZlIGdhbWVzLlxuICB2YXIgcmFuZG9tVmFsdWUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoTWF0aC5wb3coMiwgMzEpIC0gMSkpO1xuICBjYWNoZVtzaXplXVt5XVt4XVt2YWx1ZV0gPSByYW5kb21WYWx1ZTtcblxuICByZXR1cm4gcmFuZG9tVmFsdWU7XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgaGFzaDogZnVuY3Rpb24gaGFzaChib2FyZFNpemUsIGludGVyc2VjdGlvbnMpIHtcbiAgICB2YXIgaCA9IDA7XG5cbiAgICBpbnRlcnNlY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKGkpIHtcbiAgICAgIGlmICghaS5pc0VtcHR5KCkpIHtcbiAgICAgICAgdmFyIGluaXRpYWwgPSBpbml0aWFsQml0c3RyaW5nRm9yKGJvYXJkU2l6ZSwgaS55LCBpLngsIGkudmFsdWUpO1xuICAgICAgICBoID0gaCBeIGluaXRpYWw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaDtcbiAgfVxufTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9em9icmlzdC5qcy5tYXAiXX0=
},{}]},{},[1])(1)
});