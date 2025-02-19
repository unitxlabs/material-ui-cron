"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Hour;

var _Box = _interopRequireDefault(require("@material-ui/core/Box"));

var _styles = require("@material-ui/styles");

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _clsx5 = _interopRequireDefault(require("clsx"));

var _react = _interopRequireDefault(require("react"));

var _recoil = require("recoil");

var _CustomSelect = _interopRequireDefault(require("../components/CustomSelect"));

var _constants = require("../constants");

var _store = require("../store");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var POSSIBLE_TIME_RANGES = (0, _utils.getTimesOfTheDay)();
var useStyles = (0, _styles.makeStyles)({
  every: {
    minWidth: '100px',
    marginRight: '6px'
  },
  hour: {
    minWidth: '130px',
    maxWidth: '450px',
    marginRight: '6px'
  },
  betweenSelect: {
    minWidth: '130px',
    marginRight: '6px'
  },
  between: {
    margin: '8px 6px 0 0'
  }
});

function Hour() {
  var classes = useStyles();
  var isAdmin = (0, _recoil.useRecoilValue)(_store.isAdminState);
  var resolvedLocale = (0, _recoil.useRecoilValue)(_store.localeState);

  var _useRecoilState = (0, _recoil.useRecoilState)(_store.hourAtEveryState),
      _useRecoilState2 = _slicedToArray(_useRecoilState, 2),
      hourAtEvery = _useRecoilState2[0],
      setHourAtEvery = _useRecoilState2[1];

  var _useRecoilState3 = (0, _recoil.useRecoilState)(_store.hourRangeStartSchedulerState),
      _useRecoilState4 = _slicedToArray(_useRecoilState3, 2),
      startHour = _useRecoilState4[0],
      setStartHour = _useRecoilState4[1];

  var _useRecoilState5 = (0, _recoil.useRecoilState)(_store.hourRangeEndSchedulerState),
      _useRecoilState6 = _slicedToArray(_useRecoilState5, 2),
      endHour = _useRecoilState6[0],
      setEndHour = _useRecoilState6[1];

  var _useRecoilState7 = (0, _recoil.useRecoilState)(_store.hourState),
      _useRecoilState8 = _slicedToArray(_useRecoilState7, 2),
      hour = _useRecoilState8[0],
      setHour = _useRecoilState8[1];

  var _React$useState = _react["default"].useState(_constants.defaultHourOptions),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      hourOptions = _React$useState2[0],
      setHourOptions = _React$useState2[1];

  var _React$useState3 = _react["default"].useState(POSSIBLE_TIME_RANGES),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      possibleStartTimes = _React$useState4[0],
      setPossibleStartTimes = _React$useState4[1];

  var _React$useState5 = _react["default"].useState(POSSIBLE_TIME_RANGES),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      possibleEndTimes = _React$useState6[0],
      setPossibleEndTimes = _React$useState6[1];

  _react["default"].useEffect(function () {
    var startIndex = possibleStartTimes.findIndex(function (x) {
      return x.value === startHour.value;
    });
    var limitedPossibleTimeRange = possibleEndTimes.map(function (possibleEndTime, index) {
      return _objectSpread(_objectSpread({}, possibleEndTime), {}, {
        disabled: index <= startIndex
      });
    });
    setPossibleEndTimes(limitedPossibleTimeRange);
  }, [startHour]);

  _react["default"].useEffect(function () {
    var endIndex = possibleEndTimes.findIndex(function (x) {
      return x.value === endHour.value;
    });
    var limitedPossibleTimeRange = possibleStartTimes.map(function (possibleStartTime, index) {
      return _objectSpread(_objectSpread({}, possibleStartTime), {}, {
        disabled: index >= endIndex
      });
    });
    setPossibleStartTimes(limitedPossibleTimeRange);
  }, [endHour]);

  _react["default"].useEffect(function () {
    if (hourAtEvery.label !== resolvedLocale.atOptionLabel || hourAtEvery.label !== resolvedLocale.everyOptionLabel) {
      setHourAtEvery((0, _constants.atEveryOptions)(resolvedLocale.atOptionLabel, resolvedLocale.everyOptionLabel)[0]);
    }

    if (hourAtEvery.value === 'every') {
      if (hour.length > 1) {
        setHour([hourOptions[1]]);
      } else if (hour[0].value === '0') {
        setHour([hourOptions[1]]);
      }

      setHourOptions(_constants.DEFAULT_HOUR_OPTS_EVERY);
    } else {
      setHourOptions(_constants.DEFAULT_HOUR_OPTS_AT);
    }
  }, [hourAtEvery, isAdmin]);

  _react["default"].useEffect(function () {
    if (!isAdmin && hour.length > 1) {
      setHour(function (prevHour) {
        return [prevHour[0]];
      });
    }
  }, [isAdmin]);

  return _react["default"].createElement(_Box["default"], {
    display: "flex",
    pt: 1,
    pb: 1,
    mt: 1,
    mb: 1
  }, _react["default"].createElement(_CustomSelect["default"], {
    single: true,
    options: isAdmin ? (0, _constants.atEveryOptions)(resolvedLocale.atOptionLabel, resolvedLocale.everyOptionLabel) : (0, _constants.atOptionsNonAdmin)(resolvedLocale.atOptionLabel, resolvedLocale.everyOptionLabel),
    label: resolvedLocale.atEveryText,
    value: hourAtEvery,
    setValue: setHourAtEvery,
    multiple: false,
    disableClearable: true,
    classes: {
      root: (0, _clsx5["default"])(_defineProperty({}, classes.every, true))
    }
  }), _react["default"].createElement(_CustomSelect["default"], {
    options: hourOptions,
    label: resolvedLocale.hourLabel,
    value: hour,
    setValue: setHour,
    single: hourAtEvery.value === 'every' || !isAdmin,
    sort: true,
    disableEmpty: true,
    limitTags: 3,
    disableClearable: hourAtEvery.value === 'every' || hour.length < 2,
    disabled: !isAdmin && hourAtEvery.value === 'every',
    classes: {
      root: (0, _clsx5["default"])(_defineProperty({}, classes.hour, true))
    }
  }), hourAtEvery.value === 'every' && _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_Typography["default"], {
    classes: {
      root: classes.between
    }
  }, resolvedLocale.betweenText), _react["default"].createElement(_CustomSelect["default"], {
    single: true,
    options: possibleStartTimes,
    label: '',
    value: startHour,
    setValue: setStartHour,
    multiple: false,
    disableClearable: true,
    classes: {
      root: (0, _clsx5["default"])(_defineProperty({}, classes.betweenSelect, true))
    },
    disabled: !isAdmin
  }), _react["default"].createElement(_Typography["default"], {
    classes: {
      root: classes.between
    }
  }, resolvedLocale.andText), _react["default"].createElement(_CustomSelect["default"], {
    single: true,
    options: possibleEndTimes,
    label: '',
    value: endHour,
    setValue: setEndHour,
    multiple: false,
    disableClearable: true,
    classes: {
      root: (0, _clsx5["default"])(_defineProperty({}, classes.betweenSelect, true))
    },
    disabled: !isAdmin
  })));
}