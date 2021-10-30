"use strict";
exports.__esModule = true;
exports.useDebounce = exports.useReducer = exports.syncLabel = exports.syncPage = exports.dynamicBoard = exports.useEffect = exports.useState = void 0;
// @deckpad/sdk
// Copyright (c) b3nab
// ---
// --- 
// Hyper
// a plugin manager system
// deeply inspired by React.js and ReactFiber implementation
// ---
var hyper_1 = require("./hyper");
function resolveHype() {
    var hype = hyper_1["default"].hype;
    if (hype === null) {
        console.error('Invalid hook call. Hooks can only be called inside of the body of a function plugin. This could happen for' +
            ' one of the following reasons:\n' +
            '1. You might be breaking the Rules of Hooks\n' +
            '2. You might be breaking the Rules of Hooks\n' +
            '3. You might be breaking the Rules of Hooks!\n' +
            'See https://deckpad.js.org/docs/invalid-hook-call for tips about how to debug and fix this problem.');
    }
    // console.log('resolveHype - hype = ', hype)
    return hype;
}
function resolveOrigin() {
    var origin = hyper_1["default"].origin;
    if (origin === null) {
        console.error('Invalid hook call. Hooks can only be called inside of the body of a function plugin. This could happen for' +
            ' one of the following reasons:\n' +
            '1. You might be breaking the Rules of Hooks\n' +
            '2. You might be breaking the Rules of Hooks\n' +
            '3. You might be breaking the Rules of Hooks!\n' +
            'See https://deckpad.js.org/docs/invalid-hook-call for tips about how to debug and fix this problem.');
    }
    // console.log('resolveOrigin - origin = ', origin)
    return origin;
}
function useState(initialState) {
    var dispatcher = resolveHype();
    return dispatcher.useState(initialState);
}
exports.useState = useState;
function useEffect(cb, deps) {
    var dispatcher = resolveHype();
    return dispatcher.useEffect(cb, deps);
}
exports.useEffect = useEffect;
function dynamicBoard(cb) {
    var dispatcher = resolveHype();
    return dispatcher.dynamicBoard(cb);
}
exports.dynamicBoard = dynamicBoard;
function syncPage(id) {
    var dispatcher = resolveHype();
    return dispatcher.syncPage(id);
}
exports.syncPage = syncPage;
// WIP HOOKS
function syncLabel(txt) {
    var dispatcher = resolveHype();
    var origin = resolveOrigin();
    return dispatcher.syncLabel(txt, origin);
}
exports.syncLabel = syncLabel;
function useReducer(reducer, args, init) {
    if (init === void 0) { init = null; }
    var dispatcher = resolveHype();
    return dispatcher.useReducer(reducer, args, init);
}
exports.useReducer = useReducer;
function useDebounce(initialState) {
    var dispatcher = resolveHype();
    return dispatcher.useDebounce(initialState);
}
exports.useDebounce = useDebounce;
