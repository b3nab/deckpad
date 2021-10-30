"use strict";
exports.__esModule = true;
// @deckpad/sdk
// Copyright (c) b3nab
// ---
// --- 
// Hyper
// a plugin manager system
// deeply inspired by React.js and ReactFiber implementation
// ---
function hyperize(name, fn, _a) {
    var ipcMain = _a.ipcMain, toCompanion = _a.toCompanion, toConfigurator = _a.toConfigurator, hydrate = _a.hydrate, commit = _a.commit, scheduleUpdate = _a.scheduleUpdate;
    console.log("hyperize => " + name);
    // console.log({ hyperize: this })
    // const plugin = this.engine[name]
    var idx = 0;
    var efct = 0;
    var hooks = [];
    var effects = [];
    // Hype - maybe something like (so-so) ReactFiber
    return (function () {
        // console.log(`Hype of ${name}`)
        var syncLabel = function (label, origin) {
            var _a, _b, _c;
            console.log("[HYPERIZE] " + name + " - syncLabel() ", label, origin);
            var shadowLabel = (_a = {},
                _a[origin.deck] = {
                    buttons: (_b = {},
                        _b[origin.pos.row] = (_c = {},
                            _c[origin.pos.col] = {
                                label: label
                            },
                            _c),
                        _b)
                },
                _a);
            toConfigurator('update-label', shadowLabel);
            toCompanion('update-label', shadowLabel);
        };
        var syncPage = function (actualMobile) {
            toConfigurator('switch-deck', actualMobile);
            toCompanion('switch-deck', actualMobile);
        };
        // Factory of `dynamic*` functions
        // used for building:
        //    - dynamicBoard(callback)
        var dynamic = function (event) { return (function (cb) {
            // console.log(`[hyperize] dynamic hook for ${event}`)
            ipcMain.once(event, function (event, board) {
                cb(board);
                hydrate(name);
                commit();
            });
        }); };
        // useEffect Hook
        // use it like React!
        var useEffect = function (cb, newDeps) {
            var hasChanged = true;
            var oldDeps = hooks[idx];
            var oldCleanup = effects[efct];
            if (oldDeps) {
                hasChanged = newDeps.some(function (dep, i) { return !Object.is(dep, oldDeps[i]); });
            }
            if (!!!newDeps || hasChanged) {
                oldCleanup && oldCleanup();
                effects[efct] = cb();
            }
            hooks[idx] = newDeps;
            idx++;
            efct++;
            // return [state, setState]
        };
        // useState Hook
        // use it like React!
        var useState = function (initVal) {
            var _idx = idx;
            var state = hooks.length > idx ? hooks[idx] : initVal;
            var setState = function (newVal) {
                hooks[_idx] = newVal;
                scheduleUpdate();
            };
            hooks[idx] = state;
            idx++;
            efct++;
            return [state, setState];
        };
        // WIP HOOK: useDebounce
        // ----------------------
        var useDebounce = function (value, delay) {
            if (delay === void 0) { delay = 500; }
            // State and setters fpr debounced value
            var _a = useState(value), debouncedValue = _a[0], setDebouncedValue = _a[1];
            useEffect(function () {
                var handler = setTimeout(function () {
                    setDebouncedValue(value);
                }, delay);
                return function () {
                    clearTimeout(handler);
                };
            }, [value, delay]);
            return debouncedValue;
        };
        // WIP HOOK: useDebounce
        // ----------------------
        var useReducer = function (actions) {
            var fireAction = function (key) {
                switch (key) {
                    case value:
                        break;
                    default:
                        break;
                }
            };
            return fireAction;
        };
        var resolve = function () {
            idx = 0;
            efct = 0;
            // console.log(`resolving hyperized ${name}`)
            // console.log(`state hooks ${JSON.stringify(hooks, null, 2)}`)
            var actions = fn();
            return actions;
        };
        return {
            resolve: resolve,
            // hooks for dispatcher
            useState: useState,
            useEffect: useEffect,
            syncPage: syncPage,
            syncLabel: syncLabel,
            dynamicBoard: dynamic('update-board')
        };
    })();
}
exports["default"] = hyperize;
