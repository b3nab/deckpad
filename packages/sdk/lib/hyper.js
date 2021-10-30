"use strict";
exports.__esModule = true;
exports.isHyperized = void 0;
// @deckpad/sdk
// Copyright (c) b3nab
// ---
// ---
// Hyper
// a plugin manager system
// deeply inspired by React.js and ReactFiber implementation
// ---
var hyperize_1 = require("./hyperize");
// Hyper
var Hyper = {
    engine: {},
    toConfigurator: null,
    toCompanion: null,
    toPads: null,
    ipcMain: null,
    configure: function (_a) {
        var ipcMain = _a.ipcMain, toConfigurator = _a.toConfigurator, toCompanion = _a.toCompanion, toPads = _a.toPads, epm = _a.epm, extensionsDir = _a.extensionsDir;
        Hyper.toConfigurator = toConfigurator;
        Hyper.toCompanion = toCompanion;
        Hyper.toPads = toPads;
        Hyper.ipcMain = ipcMain;
        Hyper.ipcMain.handle('extensions.get-dir', function () { return extensionsDir; });
        Hyper.ipcMain.handle('extensions.use', function (e, p) {
            var plugLoaded = epm.load(extensionsDir, p);
            console.log('POC::\nis-number(0) ? ', plugLoaded.arc4random());
        });
        var registerBoardWorkersFor = function (event) {
            // console.log('registerBoardWorkersFor => ', event)
            Hyper.ipcMain.on(event, function (event, args) {
                Hyper.work();
            });
        };
        [
            'plugins-installed',
        ].forEach(function (event) { return registerBoardWorkersFor(event); });
    },
    hyperization: function (name, fn) {
        return (0, hyperize_1["default"])(name, fn, {
            toConfigurator: Hyper.toConfigurator,
            toCompanion: Hyper.toCompanion,
            toPads: Hyper.toPads,
            ipcMain: Hyper.ipcMain,
            hydrate: Hyper.hydrate,
            commit: Hyper.commit,
            scheduleUpdate: function () {
                Hyper.engine[name].needUpdate = true;
            }
        });
    },
    register: function (name, fn) {
        Hyper.engine[name] = {
            plugin: Hyper.hyperization(name, fn),
            actions: {}
        };
        // Hyper.hydrate(name)
    },
    hydrate: function (name) {
        // console.log('[Hyper] hydrate() => ', name)
        // console.log('[Hyper] hydrate() Hyper is ', Hyper)
        Hyper.setHypeCtx(Hyper.engine[name].plugin);
        Hyper.engine[name].needUpdate = false;
        Hyper.engine[name].actions = Hyper.engine[name].plugin.resolve();
        Hyper.setHypeCtx(null);
        if (Hyper.engine[name].needUpdate)
            Hyper.hydrate(name);
    },
    fire: function (pao, origin) {
        var p = pao.p, a = pao.a, o = pao.o;
        var deck = origin.deck, pos = origin.pos;
        console.log('[Hyper] fire() => ', p, a, o);
        Hyper.setHypeCtx(Hyper.engine[p].plugin);
        Hyper.origin = origin;
        try {
            (0, exports.isHyperized)(p, a);
            var fire = Hyper.engine[p].actions[a].fire;
            fire(o);
        }
        catch (error) {
            error.hyper && Hyper.toPads('toast', error.msg);
            console.log("firing action " + p + " - " + a + " : " + error);
        }
        finally {
            Hyper.origin = null;
            Hyper.setHypeCtx(null);
        }
    },
    commit: function () {
        Hyper.toConfigurator('plugins-hydrated', Hyper.serializePlugins());
        Hyper.toConfigurator('plugins-installed', Hyper.serializePlugins());
    },
    work: function () {
        Object.keys(Hyper.engine).map(function (name) { return Hyper.hydrate(name); });
        Hyper.commit();
    },
    serializePlugins: function () {
        var serialized = {};
        Object.keys(Hyper.engine).map(function (key) {
            serialized[key] = Hyper.engine[key].actions;
        });
        return JSON.parse(JSON.stringify(serialized));
    },
    contextualize: function (plug, cb) {
        Hyper.setHypeCtx(Hyper.engine[p].plugin);
    },
    setHypeCtx: function (hype) {
        Hyper.hype = hype;
    }
};
exports["default"] = Hyper;
var isHyperized = function (name, action) {
    if (!Object.keys(Hyper.engine).includes(name)) {
        throw { hyper: true, plugin: name, msg: "missing plugin - " + name + " is not registered" };
    }
    if (!Object.keys(Hyper.engine[name].actions).includes(action)) {
        throw { hyper: true, plugin: name, action: action, msg: "missing action - " + name + " is registered but " + action + " is not exported" };
        // throw `missing action - ${name} is registered but ${action} is not exported`
    }
    return true;
};
exports.isHyperized = isHyperized;
