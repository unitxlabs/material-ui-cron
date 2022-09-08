"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CronReader;

var _styles = require("@material-ui/styles");

var _Box = _interopRequireDefault(require("@material-ui/core/Box"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _i18n = _interopRequireDefault(require("cronstrue/i18n"));

var _react = _interopRequireDefault(require("react"));

var _recoil = require("recoil");

var _selector = require("../selector");

var _store = require("../store");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var useStyles = (0, _styles.makeStyles)(function () {
  return (0, _styles.createStyles)({
    error: {
      color: 'red'
    }
  });
});

function CronReader() {
  var cronExp = (0, _recoil.useRecoilValue)(_selector.cronExpState);
  var resolvedLocale = (0, _recoil.useRecoilValue)(_store.localeState);
  return _react["default"].createElement(_Box["default"], {
    display: "flex",
    pt: 1,
    pb: 1,
    mt: 1,
    mb: 1
  }, _react["default"].createElement(_Typography["default"], {
    variant: "h6",
    style: {
      color: '#382B5F'
    }
  }, _i18n["default"].toString(cronExp, {
    locale: resolvedLocale.cronDescriptionText
  })));
}