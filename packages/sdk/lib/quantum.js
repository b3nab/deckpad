"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.toPads = exports.toCompanion = exports.toConfigurator = exports.ipcMain = exports.pubsub = exports.store = exports.init = void 0;
// @deckpad/sdk
// Copyright (c) b3nab
// ---
// ---
// Quantum
// Internal Engine
// ---
var hyper_1 = require("./hyper");
var board, virtualBoard, store, pubsub, ipcMain, epm, extensionsDir;
exports.store = store;
exports.pubsub = pubsub;
exports.ipcMain = ipcMain;
var toConfigurator = function () { };
exports.toConfigurator = toConfigurator;
var toCompanion = function () { };
exports.toCompanion = toCompanion;
var toPads = function () { };
exports.toPads = toPads;
// init Quantum and SDK globals
function init(conf) {
    var _this = this;
    console.log('[QUANTUM] init');
    exports.store = store = conf.store;
    exports.pubsub = pubsub = conf.pubsub;
    exports.ipcMain = ipcMain = conf.ipcMain;
    epm = conf.ext.epm;
    extensionsDir = conf.ext.extensionsDir;
    exports.toConfigurator = toConfigurator = conf.toConfigurator;
    exports.toCompanion = toCompanion = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return pubsub.publish.apply(pubsub, __spreadArray(['io'], params, false));
    };
    exports.toPads = toPads = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        toConfigurator.apply(void 0, data);
        toCompanion.apply(void 0, data);
    };
    // configure Hyper and its itnernal vars
    hyper_1["default"].configure({ ipcMain: ipcMain, toConfigurator: toConfigurator, toCompanion: toCompanion, toPads: toPads, epm: epm, extensionsDir: extensionsDir });
    // pubsub listener on deckServer
    // to call fire() on plugin
    pubsub.subscribe('fire-plugin', function (event, _a) {
        var action = _a.action, origin = _a.origin;
        return __awaiter(_this, void 0, void 0, function () {
            var plugin, options, _b, plug, act, pao;
            return __generator(this, function (_c) {
                console.log('[PUBSUB] fired with action => ', action);
                console.log('[PUBSUB] fired from origin => ', origin);
                plugin = action.plugin, options = action.options;
                _b = plugin.split('=>'), plug = _b[0], act = _b[1];
                pao = { p: plug, a: act, o: options };
                hyper_1["default"].fire(pao, origin);
                hyper_1["default"].work();
                return [2 /*return*/];
            });
        });
    });
    ipcMain.on('fire-plugin', function (event, _a) {
        var action = _a.action, origin = _a.origin;
        return __awaiter(_this, void 0, void 0, function () {
            var plugin, options, _b, plug, act, pao;
            return __generator(this, function (_c) {
                console.log('[IPC] fired with action => ', action);
                console.log('[IPC] fired from origin => ', origin);
                plugin = action.plugin, options = action.options;
                _b = plugin.split('=>'), plug = _b[0], act = _b[1];
                pao = { p: plug, a: act, o: options };
                hyper_1["default"].fire(pao, origin);
                hyper_1["default"].work();
                return [2 /*return*/];
            });
        });
    });
}
exports.init = init;
