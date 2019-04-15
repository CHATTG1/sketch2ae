var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(console) {/* globals log */

if (true) {
  var sketchUtils = __webpack_require__(5)
  var sketchDebugger = __webpack_require__(7)
  var actions = __webpack_require__(9)

  function getStack() {
    return sketchUtils.prepareStackTrace(new Error().stack)
  }
}

console._skpmPrefix = 'console> '

function logEverywhere(type, args) {
  var values = Array.prototype.slice.call(args)

  // log to the System logs
  values.forEach(function(v) {
    try {
      log(console._skpmPrefix + indentString() + v)
    } catch (e) {
      log(v)
    }
  })

  if (true) {
    if (!sketchDebugger.isDebuggerPresent()) {
      return
    }

    var payload = {
      ts: Date.now(),
      type: type,
      plugin: String(context.scriptPath),
      values: values.map(sketchUtils.prepareValue),
      stack: getStack(),
    }

    sketchDebugger.sendToDebugger(actions.ADD_LOG, payload)
  }
}

var indentLevel = 0
function indentString() {
  var indent = ''
  for (var i = 0; i < indentLevel; i++) {
    indent += '  '
  }
  if (indentLevel > 0) {
    indent += '| '
  }
  return indent
}

var oldGroup = console.group

console.group = function() {
  // log to the JS context
  oldGroup && oldGroup.apply(this, arguments)
  indentLevel += 1
  if (true) {
    sketchDebugger.sendToDebugger(actions.GROUP, {
      plugin: String(context.scriptPath),
      collapsed: false,
    })
  }
}

var oldGroupCollapsed = console.groupCollapsed

console.groupCollapsed = function() {
  // log to the JS context
  oldGroupCollapsed && oldGroupCollapsed.apply(this, arguments)
  indentLevel += 1
  if (true) {
    sketchDebugger.sendToDebugger(actions.GROUP, {
      plugin: String(context.scriptPath),
      collapsed: true
    })
  }
}

var oldGroupEnd = console.groupEnd

console.groupEnd = function() {
  // log to the JS context
  oldGroupEnd && oldGroupEnd.apply(this, arguments)
  indentLevel -= 1
  if (indentLevel < 0) {
    indentLevel = 0
  }
  if (true) {
    sketchDebugger.sendToDebugger(actions.GROUP_END, {
      plugin: context.scriptPath,
    })
  }
}

var counts = {}
var oldCount = console.count

console.count = function(label) {
  label = typeof label !== 'undefined' ? label : 'Global'
  counts[label] = (counts[label] || 0) + 1

  // log to the JS context
  oldCount && oldCount.apply(this, arguments)
  return logEverywhere('log', [label + ': ' + counts[label]])
}

var timers = {}
var oldTime = console.time

console.time = function(label) {
  // log to the JS context
  oldTime && oldTime.apply(this, arguments)

  label = typeof label !== 'undefined' ? label : 'default'
  if (timers[label]) {
    return logEverywhere('warn', ['Timer "' + label + '" already exists'])
  }

  timers[label] = Date.now()
  return
}

var oldTimeEnd = console.timeEnd

console.timeEnd = function(label) {
  // log to the JS context
  oldTimeEnd && oldTimeEnd.apply(this, arguments)

  label = typeof label !== 'undefined' ? label : 'default'
  if (!timers[label]) {
    return logEverywhere('warn', ['Timer "' + label + '" does not exist'])
  }

  var duration = Date.now() - timers[label]
  delete timers[label]
  return logEverywhere('log', [label + ': ' + (duration / 1000) + 'ms'])
}

var oldLog = console.log

console.log = function() {
  // log to the JS context
  oldLog && oldLog.apply(this, arguments)
  return logEverywhere('log', arguments)
}

var oldWarn = console.warn

console.warn = function() {
  // log to the JS context
  oldWarn && oldWarn.apply(this, arguments)
  return logEverywhere('warn', arguments)
}

var oldError = console.error

console.error = function() {
  // log to the JS context
  oldError && oldError.apply(this, arguments)
  return logEverywhere('error', arguments)
}

var oldAssert = console.assert

console.assert = function(condition, text) {
  // log to the JS context
  oldAssert && oldAssert.apply(this, arguments)
  if (!condition) {
    return logEverywhere('assert', [text])
  }
  return undefined
}

var oldInfo = console.info

console.info = function() {
  // log to the JS context
  oldInfo && oldInfo.apply(this, arguments)
  return logEverywhere('info', arguments)
}

var oldClear = console.clear

console.clear = function() {
  oldClear && oldClear()
  if (true) {
    return sketchDebugger.sendToDebugger(actions.CLEAR_LOGS)
  }
}

console._skpmEnabled = true

module.exports = console

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign, no-var, vars-on-top, prefer-template, prefer-arrow-callback, func-names, prefer-destructuring, object-shorthand */

module.exports = function prepareStackTrace(stackTrace) {
  var stack = stackTrace.split('\n')
  stack = stack.map(function (s) {
    return s.replace(/\sg/, '')
  })

  stack = stack.map(function (entry) {
    // entry is something like `functionName@path/to/my/file:line:column`
    // or `path/to/my/file:line:column`
    // or `path/to/my/file`
    // or `path/to/@my/file:line:column`
    var parts = entry.split('@')
    var fn = parts.shift()
    var filePath = parts.join('@') // the path can contain @

    if (fn.indexOf('/Users/') === 0) {
      // actually we didn't have a fn so just put it back in the filePath
      filePath = fn + (filePath ? ('@' + filePath) : '')
      fn = null
    }

    if (!filePath) {
      // we should always have a filePath, so if we don't have one here, it means that the function what actually anonymous and that it is the filePath instead
      filePath = entry
      fn = null
    }

    var filePathParts = filePath.split(':')
    filePath = filePathParts[0]

    // the file is the last part of the filePath
    var file = filePath.split('/')
    file = file[file.length - 1]

    return {
      fn: fn,
      file: file,
      filePath: filePath,
      line: filePathParts[1],
      column: filePathParts[2],
    }
  })

  return stack
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function toArray(object) {
  if (Array.isArray(object)) {
    return object
  }
  var arr = []
  for (var j = 0; j < (object || []).length; j += 1) {
    arr.push(object[j])
  }
  return arr
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(console) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.openWindow = openWindow;
exports.pushJSON = pushJSON;
exports.saveJSON = saveJSON;
exports.detachSymbols = detachSymbols;
exports.flattenCompounds = flattenCompounds;
exports.imageToSymbol = imageToSymbol;

var _mochaJsDelegate = __webpack_require__(10);

var _mochaJsDelegate2 = _interopRequireDefault(_mochaJsDelegate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** ===== About AEUX =====
	Layer data exchange between Sketch and After Effects

	Copyright 2018 Google Inc.

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	    http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
	**/

//// variables
var devName = 'sumUX';
var toolName = 'AEUX';
var docUrl = 'https://aeux.io/';
var versionNumber = 0.67;
var sketch = __webpack_require__(0);
var UI = __webpack_require__(11);
var Settings = __webpack_require__(12);
var document, selection, folderPath, saveName, layerCount, aeSharePath, flatten, hasArtboard, exportCanceled;

//// Creates the plugin panel
function openWindow(context) {
    var panelWidth = 166;
    var panelHeight = 276;

    // Create an NSThread dictionary with a specific identifier
    var threadDictionary = NSThread.mainThread().threadDictionary();
    var identifier = "com.wearesumux.AEUX.panel";

    // If there's already a panel, prevent the plugin from running
    if (threadDictionary[identifier]) return;

    // Create the panel and set its appearance
    var panel = NSPanel.alloc().init();
    panel.setFrame_display(NSMakeRect(0, 0, panelWidth, panelHeight), true);
    panel.setStyleMask(NSTexturedBackgroundWindowMask | NSTitledWindowMask | NSClosableWindowMask | NSFullSizeContentViewWindowMask);
    panel.setBackgroundColor(NSColor.whiteColor());

    // Set the panel's title and title bar appearance
    panel.title = "";
    panel.titlebarAppearsTransparent = true;

    // Center and focus the panel
    panel.center();
    panel.becomeKeyWindow();
    panel.makeKeyAndOrderFront(null);
    panel.setLevel(NSFloatingWindowLevel);

    // Make the plugin's code stick around (since it's a floating panel)
    COScript.currentCOScript().setShouldKeepAround_(true);

    // Hide the Minimize and Zoom button
    panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true);
    panel.standardWindowButton(NSWindowZoomButton).setHidden(true);

    // Create the WebView with a request to a Web page in Contents/Resources/
    var webView = WebView.alloc().initWithFrame(NSMakeRect(0, 0, panelWidth, panelHeight - 44));
    var request = NSURLRequest.requestWithURL(context.plugin.urlForResourceNamed("webView.html"));
    webView.mainFrame().loadRequest(request);
    webView.setDrawsBackground(false);

    // Access the Web page's JavaScript environment
    var windowObject = webView.windowScriptObject();

    // Create the delegate
    var delegate = new _mochaJsDelegate2['default']({

        // Listen to URL changes
        "webView:didChangeLocationWithinPageForFrame:": function () {
            function webViewDidChangeLocationWithinPageForFrame(webView, webFrame) {
                // Parse the hash's JSON content
                var data = JSON.parse(windowObject.evaluateWebScript("window.location.hash.substring(1)"));

                if (data.action == 'pushJSON') {
                    console.log('pushJSON');
                    exportCanceled = false;
                    pushJSON(true);
                    if (exportCanceled) {
                        layerCount = -1;
                    }; // file path dialog canceled

                    var dataToPanel = {
                        count: layerCount,
                        message: layerCount > 1 ? 'layers pushed to Ae' : 'layer pushed to Ae'
                    };
                    windowObject.evaluateWebScript("msgFromPlugin('" + JSON.stringify(dataToPanel) + "')");
                }
                if (data.action == 'saveJSON') {
                    saveJSON(true);

                    if (exportCanceled) {
                        layerCount = -1;
                    }; // file path dialog canceled

                    var dataToPanel = {
                        count: layerCount,
                        message: layerCount > 1 ? 'layers saved to .json' : 'layer saved to .json'
                    };
                    windowObject.evaluateWebScript("msgFromPlugin('" + JSON.stringify(dataToPanel) + "')");
                }
                if (data.action == 'detachSymbols') {
                    detachSymbols(true);

                    var dataToPanel = {
                        count: layerCount,
                        message: layerCount > 1 ? 'symbols detached' : 'symbol detached'
                    };
                    windowObject.evaluateWebScript("msgFromPlugin('" + JSON.stringify(dataToPanel) + "')");
                }
                if (data.action == 'flattenCompounds') {
                    flattenCompounds(true);

                    var dataToPanel = {
                        count: layerCount,
                        message: layerCount > 1 ? 'shapes flattened' : 'shape flattened'
                    };
                    windowObject.evaluateWebScript("msgFromPlugin('" + JSON.stringify(dataToPanel) + "')");
                }
                if (data.action == 'imageToSymbol') {
                    imageToSymbol(true);

                    var dataToPanel = {
                        count: layerCount,
                        message: layerCount > 1 ? 'images are now symbols' : 'image is now a symbol'
                    };
                    windowObject.evaluateWebScript("msgFromPlugin('" + JSON.stringify(dataToPanel) + "')");
                }
                if (data.action == 'openDocumentation') {
                    openDocumentation();
                }
                if (data.action == 'openSettings') {
                    imageToSymbol();

                    alert('settings');
                }

                if (data.action == 'focus') {
                    console.log('focus');
                    var point = panel.currentEvent().locationInWindow();
                    var y = NSHeight(panel.frame()) - point.y - 24;
                    windowObject.evaluateWebScript("lookupItemInput(" + point.x + ", " + y + ")");
                    // console.log(point.x);
                }

                NSApp.mainWindow().makeKeyAndOrderFront(null);
            }

            return webViewDidChangeLocationWithinPageForFrame;
        }()
    });

    // Set the delegate on the WebView
    webView.setFrameLoadDelegate_(delegate.getClassInstance());

    // Add it to the panel
    panel.contentView().addSubview(webView);

    // After creating the panel, store a reference to it
    threadDictionary[identifier] = panel;

    var closeButton = panel.standardWindowButton(NSWindowCloseButton);

    // Assign a function to the Close button
    closeButton.setCOSJSTargetFunction(function (sender) {
        panel.close();

        // Remove the reference to the panel
        threadDictionary.removeObjectForKey(identifier);

        // Stop the plugin
        COScript.currentCOScript().setShouldKeepAround_(false);
    });

    getSharePath(); // this is the application support path for saving prefs and

}

//// transfer layer data to AE
function pushJSON(skipHostNotification) {
    /// find the AE shared folder
    getSharePath();

    document = __webpack_require__(0).getSelectedDocument();
    selection = document.selectedLayers;

    /// reset vars
    folderPath = null;
    hasArtboard = false;
    layerCount = 0;

    /// get all the selected layers
    var layerData = filterTypes(selection);
    if (layerCount < 0) {
        return;
    }
    layerData[0].layerCount = layerCount;

    /// save the layer data to file
    save_text(JSON.stringify(layerData, false, 2), aeSharePath + toolName + '.json');

    /// save manifest file so AE knows there's new data
    var manifest = {
        updateTime: new Date().getTime(),
        artboardName: layerData[0].name,
        layerCount: layerCount
    };
    save_text(JSON.stringify(manifest, false, 2), aeSharePath + 'manifest.json');

    /// running from the menu so show the host app notification
    if (skipHostNotification !== true) {
        var msg = layerCount > 1 ? ' layers pushed to Ae' : ' layer pushed to Ae';
        UI.message(layerCount + msg);
    }
}

//// save layer data to json file
function saveJSON(skipHostNotification) {
    document = __webpack_require__(0).getSelectedDocument();
    selection = document.selectedLayers;

    // reset vars
    folderPath = null;
    hasArtboard = false;
    layerCount = 0;

    // open save dialog
    var pathSaved = getSavePath();

    if (pathSaved) {
        /// get all the selected layers
        var layerData = filterTypes(selection);
        layerData[0].layerCount = layerCount;

        /// save the layer data to file
        save_text(JSON.stringify(layerData, false, 2), folderPath + saveName.replace(/\.[^/.]+$/, "") + '.json');

        /// open the saved folder path in a finder window
        NSWorkspace.sharedWorkspace().openFile(folderPath);

        /// running from the menu so show the host app notification
        if (skipHostNotification !== true) {
            var msg = layerCount > 1 ? ' layers saved to .json' : ' layer saved to .json';
            UI.message(layerCount + msg);
        }

        return true;
    }
    // save dialog canceled
    return false;
}

//// recursivly detach symbols from masters
function detachSymbols(skipHostNotification) {
    document = __webpack_require__(0).getSelectedDocument();
    selection = document.selectedLayers;

    // reset vars
    layerCount = 0;
    var layers = selection.layers;

    /// if an artboard is selected, process all layers inside of it
    if (layers.length > 0 && (layers[0].type == 'Artboard' || layers[0].type == 'SymbolMaster')) {
        layers = layers[0].layers;
    }

    /// run process
    detachChildren(layers);

    /// running from the menu so show the host app notification
    if (skipHostNotification !== true) {
        var msg = layerCount > 1 ? ' symbols detached' : ' symbol detached';
        UI.message(layerCount + msg);
    }

    /// recursive func
    function detachChildren(layers) {
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];

            if (layer.type == 'Group') {
                detachChildren(layer.layers);
            }
            if (layer.type == 'SymbolInstance') {
                // detachChildren(layer.master.layers);
                var detatchedGroup = layer.detach();
                detatchedGroup.sketchObject.ungroup();
                layerCount++;
            }
        }
    }
}

//// simplify complex layers by recursivly flattening compound shapes
function flattenCompounds(skipHostNotification) {
    document = __webpack_require__(0).getSelectedDocument();
    selection = document.selectedLayers;

    /// reset vars
    layerCount = 0;
    var layers = selection.layers;

    /// if an artboard is selected, process all layers inside of it
    if (layers.length > 0 && (layers[0].type == 'Artboard' || layers[0].type == 'SymbolMaster')) {
        layers = layers[0].layers;
    }

    /// run process
    flattenChildren(layers);

    /// running from the menu so show the host app notification
    if (skipHostNotification !== true) {
        var msg = layerCount > 1 ? ' shapes flattened' : ' shape flattened';
        UI.message(layerCount + msg);
    }

    /// recursive func
    function flattenChildren(layers) {
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            var layerType = getShapeType(layer.sketchObject);

            if (layer.type == 'Group') {
                flattenChildren(layer.layers);
            }
            if (layerType == 'CompoundShape') {
                layer.sketchObject.flatten();
                layerCount++;
            }
        }
    }
}

//// recursivly convert images to symbols to prevent cropping if partially outside the artboard bounds
function imageToSymbol(skipHostNotification) {
    document = __webpack_require__(0).getSelectedDocument();
    selection = document.selectedLayers;

    /// reset vars
    layerCount = 0;
    var layers = selection.layers;

    /// if an artboard is selected, process all layers inside of it
    if (layers.length > 0 && (layers[0].type == 'Artboard' || layers[0].type == 'SymbolMaster')) {
        layers = layers[0].layers;
    }

    /// run process
    convertToSymbol(layers);

    /// running from the menu so show the host app notification
    if (skipHostNotification !== true) {
        var msg = layerCount > 1 ? ' images are now symbols' : ' image is now a symbol';
        UI.message(layerCount + msg);
    }

    /// recursive func
    function convertToSymbol(layers) {
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];

            if (layer.type == 'Group') {
                convertToSymbol(layer.layers);
            }
            if (layer.type == 'Image') {
                var layerArray = MSLayerArray.arrayWithLayers([layer.sketchObject]);

                if (MSSymbolCreator.canCreateSymbolFromLayers(layerArray)) {
                    var symbolName = layer.sketchObject.name();
                    var symbolInstance = MSSymbolCreator.createSymbolFromLayers_withName_onSymbolsPage(layerArray, symbolName, true);
                    var symbolMaster = symbolInstance.symbolMaster();
                    symbolMaster.setLayerListExpandedType(1);

                    layerCount++;
                }
            }
        }
    }
}

function openDocumentation() {
    NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(docUrl));
}
//// find the AE prefs folder path to save layer data
function getSharePath() {
    var fileManager = NSFileManager.defaultManager();
    var supportPath = NSHomeDirectory() + '/Library/Application\ Support/'; // this will always be there
    aeSharePath = supportPath + devName + '/' + toolName + '/msg/';

    if (!fileManager.fileExistsAtPath(aeSharePath)) {
        fileManager.createDirectoryAtPath_withIntermediateDirectories_attributes_error(aeSharePath, true, '', null);
    }
}

//// get all selected layer data
function filterTypes(selection) {
    /// reset vars
    var selectedLayerInfo = [];
    var layers = selection.layers;

    /// get artboard data
    if (!hasArtboard) {
        selectedLayerInfo.push(storeArtboard());
    }
    if (!hasArtboard) {
        layerCount = -2;return;
    }

    /// if an artboard is selected, process all layers inside of it
    if (layers.length > 0 && (layers[0].type == 'Artboard' || layers[0].type == 'SymbolMaster')) {
        layers = layers[0].layers;
    }

    /// check that the image export has not been canceled
    if (layerCount != -1) {
        /// loop through all selected layers
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            // skip layer if not visible
            if (!layer.sketchObject.isVisible()) {
                continue;
            }

            // get layer data by layer type
            if (layer.type == 'Group') {
                selectedLayerInfo.push(getGroup(layer));
                continue;
            }
            if (layer.type == 'ShapePath' || layer.type == 'Shape') {
                selectedLayerInfo.push(getShape(layer));
            }
            if (layer.type == 'SymbolInstance') {
                selectedLayerInfo.push(getSymbol(layer));
            }
            if (layer.type == 'Text') {
                selectedLayerInfo.push(getText(layer));
            }
            if (layer.type == 'Image') {
                var imgLayer = getImage(layer);
                if (imgLayer == null) {
                    layerCount = -1;return selectedLayerInfo;
                }
                selectedLayerInfo.push(imgLayer);
            }

            // increment var to show on panels
            layerCount++;
        }
    }

    return selectedLayerInfo;
}

//// get artboard data
function storeArtboard() {
    var artboard = selection.layers[0].getParentArtboard() || selection.layers[0] || null;
    /// no artboard so store generic
    if (artboard === null) {
        return {};
    }

    var bgColor = [1, 1, 1, 1];

    try {
        if (artboard.background.enabled) {
            bgColor = hexToArray(artboard.background.color);
        }
    } catch (e) {}

    var artboardObj = {
        type: 'Artboard',
        aeuxVersion: versionNumber,
        hostApp: 'Sketch',
        name: artboard.name,
        bgColor: bgColor,
        size: [artboard.frame.width, artboard.frame.height]
    };
    /// tells filterTypes() this doesn't need to run again
    hasArtboard = true;

    return artboardObj;
}

//// get layer data: SHAPE
function getShape(layer) {
    var layerType = getShapeType(layer.sketchObject);
    var layerData = {
        type: layerType,
        name: layer.name,
        id: layer.id,
        frame: layer.frame,
        fill: getFills(layer),
        stroke: getStrokes(layer),
        shadow: getShadows(layer),
        innerShadow: getInnerShadows(layer),
        isVisible: layer.sketchObject.isVisible(),
        path: getPath(layer, layer.frame),
        roundness: getRoundness(layer),
        blur: getBlur(layer.sketchObject),
        opacity: getOpacity(layer),
        rotation: -layer.sketchObject.rotation(),
        flip: getFlipMultiplier(layer),
        blendMode: getLayerBlending(layer.sketchObject.style().contextSettings().blendMode()),
        hasClippingMask: layer.sketchObject.hasClippingMask(),
        shouldBreakMaskChain: layer.sketchObject.shouldBreakMaskChain()
    };

    /// if fill is an image and should return that instead of a shape
    if (layerData.fill != null && layerData.fill.type == 'Image') {
        return layerData.fill;
    }

    /// if shape is a compound get the shapes that make up the compound
    if (layerType == 'CompoundShape') {
        layerData.layers = getCompoundShapes(layer.layers);
        layerData.booleanOperation = layer.layers[0].sketchObject.booleanOperation();
    }

    return layerData; // output a string of the collected data

    /// get corner roundness clamped to the shape size
    function getRoundness(layer) {
        try {
            var lyr = layer.sketchObject;
            var radius = lyr.points()[0].cornerRadius();
            var width = lyr.frame().width();
            var height = lyr.frame().height();
            var maxRad = Math.min(Math.min(width, height), radius);
            return maxRad;
        } catch (e) {
            return null;
        }
    }
}

//// get layer data: SYMBOL
function getSymbol(layer) {
    // check if the symbol is an image override
    // if (layer.overrides.length > 0 &&
    //     layer.overrides[0].property == 'image' &&
    //     !layer.overrides[0].isDefault) {
    //     var imageLayer = getImage(layer);
    //     return imageLayer;
    // }

    if (layer.master == null) {
        return {};
    } // skip if layer missing

    var layerData = {
        type: 'Symbol',
        name: layer.master.name,
        masterId: layer.master.id,
        id: layer.id,
        frame: layer.frame,
        style: layer.style,
        isVisible: layer.sketchObject.isVisible(),
        opacity: getOpacity(layer),
        shadow: getShadows(layer),
        innerShadow: getInnerShadows(layer),
        blendMode: getLayerBlending(layer.sketchObject.style().contextSettings().blendMode()),
        layers: filterTypes(layer.master),
        symbolFrame: layer.master.frame,
        bgColor: sketchColorToArray(layer.master.sketchObject.backgroundColor()),
        rotation: -layer.sketchObject.rotation(),
        flip: getFlipMultiplier(layer),
        hasClippingMask: layer.sketchObject.hasClippingMask(),
        shouldBreakMaskChain: layer.sketchObject.shouldBreakMaskChain()
    };
    getOverrides(layer, layerData);
    return layerData;

    /// get text and nested symbol overrides
    function getOverrides(layer, symbolObj) {
        // reset vars
        var overrideList = [];
        var overrides = layer.overrides;

        // loop through each override on the layer
        for (var i = 0; i < overrides.length; i++) {
            var override = overrides[i];
            if (!override.isDefault) {
                // has an override
                symbolObj.id = 'override';
                symbolObj.masterId = 'override';

                // DEPRECIATED forced symbol detach
                // if (override.property == 'image') {     // needs to be detatched from master
                //     var detatchedGroup = layer.detach();
                //     overrideList = [];                  // reset the list
                //     i = 0;                              // reset the count
                // }

                // loop through all layers in the symbol
                for (var j = 0; j < symbolObj.layers.length; j++) {
                    var currentLayer = symbolObj.layers[j];
                    //// it is a GROUP ////    recurse deeper
                    if (currentLayer.type == 'Group') {
                        getOverrides(layer, currentLayer);
                        continue;
                    }
                    //// it is a SYMBOL ////
                    if (override.symbolOverride) {
                        if (currentLayer.id == override.path) {
                            // do ids match?
                            var overrideSymbol = document.getSymbolMasterWithID(override.value);
                            if (overrideSymbol == undefined) {
                                return;
                            }
                            currentLayer.name = overrideSymbol.name;
                            currentLayer.masterId = overrideSymbol.id;
                            currentLayer.layers = filterTypes(overrideSymbol);
                        }
                    }
                    //// it is TEXT ////
                    if (currentLayer.id == override.path) {
                        // do ids match?
                        currentLayer[override.property] = override.value; // replace the text/image value
                    }
                }
            }
        }
    }
}

//// get layer data: GROUP
function getGroup(layer) {
    var flip = getFlipMultiplier(layer);
    var layerData = {
        type: 'Group',
        name: '\u25BD ' + layer.name,
        id: layer.id,
        frame: layer.frame,
        isVisible: layer.sketchObject.isVisible(),
        opacity: getOpacity(layer),
        shadow: getShadows(layer),
        innerShadow: getInnerShadows(layer),
        rotation: -layer.sketchObject.rotation() * (flip[0] / 100) * (flip[1] / 100),
        blendMode: layer.sketchObject.style().contextSettings().blendMode(),
        flip: flip,
        layers: filterTypes(layer),
        hasClippingMask: layer.sketchObject.hasClippingMask(),
        shouldBreakMaskChain: layer.sketchObject.shouldBreakMaskChain()
    };
    return layerData;
}

//// get layer data: TEXT
function getText(layer) {
    /// reset vars
    var kind;
    var frame = {};

    /// is the layer flipped?
    var flip = getFlipMultiplier(layer);

    /// point or area text box
    if (layer.sketchObject.textBehaviour() == 0) {
        kind = 'Point';
        frame = {
            x: layer.frame.x,
            y: layer.frame.y + layer.sketchObject.glyphBounds().origin.y,
            width: layer.frame.width,
            height: layer.frame.height
        };
    } else {
        kind = 'Area';
        frame = {
            x: layer.frame.x + layer.frame.width / 2,
            y: layer.frame.y + layer.frame.height / 2 + layer.sketchObject.glyphBounds().origin.y,
            width: layer.frame.width,
            height: layer.frame.height
        };
    }
    var layerData = {
        type: 'Text',
        kind: kind,
        name: layer.name,
        stringValue: getTextString(layer),
        id: layer.id,
        frame: frame,
        isVisible: layer.sketchObject.isVisible(),
        opacity: getOpacity(layer),
        shadow: getShadows(layer),
        innerShadow: getInnerShadows(layer),
        textColor: sketchColorToArray(layer.sketchObject.textColor()),
        fill: getFills(layer),
        stroke: getStrokes(layer),
        blendMode: getLayerBlending(layer.sketchObject.style().contextSettings().blendMode()),
        fontName: getFontName(),
        fontSize: layer.sketchObject.fontSize(),
        trackingAdjusted: layer.sketchObject.kerning() / layer.sketchObject.fontSize() * 1000,
        tracking: layer.sketchObject.kerning(),
        justification: layer.sketchObject.textAlignment(),
        lineHeight: layer.sketchObject.paragraphStyle().minimumLineHeight() || null,
        flip: flip,
        rotation: -layer.sketchObject.rotation() * (flip[0] / 100) * (flip[1] / 100),
        blur: getBlur(layer.sketchObject),
        hasClippingMask: layer.sketchObject.hasClippingMask(),
        shouldBreakMaskChain: layer.sketchObject.shouldBreakMaskChain()
    };

    return layerData;

    function getFontName() {
        var fontName = layer.sketchObject.font().fontName() + '0';
        return fontName.slice(0, -1);
    }

    function getTextString(layer) {
        var text = layer.text.replace(/[\u2028]/g, '\n');
        var transformVal = 0;
        var transformVal = layer.sketchObject.styleAttributes()["MSAttributedStringTextTransformAttribute"];

        if (transformVal == 1) {
            text = text.toUpperCase();
        }
        if (transformVal == 2) {
            text = text.toLowerCase();
        }

        return text;
    }
}

//// get layer data: IMAGE
function getImage(layer) {
    var layerData = {
        type: 'Image',
        name: layer.name,
        id: layer.id,
        frame: layer.frame,
        isVisible: layer.sketchObject.isVisible(),
        opacity: getOpacity(layer),
        blendMode: getLayerBlending(layer.sketchObject.style().contextSettings().blendMode()),
        hasClippingMask: layer.sketchObject.hasClippingMask(),
        shouldBreakMaskChain: layer.sketchObject.shouldBreakMaskChain()
    };

    if (!getFolderPath()) {
        return null;
    }; // canceled

    var imageFile = exportLayer(layer, folderPath);
    layerData.path = imageFile.path;
    layerData.scale = imageFile.scale;
    return layerData;

    /// export image
    function exportLayer(layer, path) {
        sketch['export'](layer, {
            output: path,
            'use-id-for-name': true,
            overwriting: true,
            'save-for-web': true,
            'group-contents-only': true,
            scales: 4
        });

        return {
            path: path,
            scale: 'scale'
        };
    }
}

//// get layer data: COMPOUND SHAPE
function getCompoundShapes(layers) {
    var layerList = [];

    /// loop through all nested shapes
    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        var layerType = getCompoundShapeType(layer.sketchObject);

        // var layerId = (layer.objectID()+ '&').slice(0, -1);
        var flip = getFlipMultiplier(layer);
        var frame = {
            x: layer.frame.x,
            y: layer.frame.y,
            width: layer.frame.width,
            height: layer.frame.height
        };
        layerList.push({
            type: layerType,
            name: layer.name,
            id: layer.id,
            frame: frame,
            isVisible: !layer.hidden,
            path: getPath(layer, frame),
            roundness: getCompoundRoundness(layer.sketchObject),
            flip: flip,
            rotation: -layer.sketchObject.rotation() * (flip[0] / 100) * (flip[1] / 100),
            booleanOperation: layer.sketchObject.booleanOperation()
        });

        if (layerType == 'CompoundShape') {
            layerList[i].layers = getCompoundShapes(layer.layers);
        }
    }

    return layerList;

    /// check the shape type
    function getCompoundShapeType(lyr) {
        if (lyr['class']() == 'MSRectangleShape' && !lyr.edited()) {
            return 'Rect';
        }
        if (lyr['class']() == 'MSOvalShape' && !lyr.edited()) {
            return 'Ellipse';
        }
        if (lyr['class']() == 'MSShapeGroup' && lyr.layers().length > 1) {
            // alert(JSON.stringify(getCompoundShapes(lyr.layers()), false, 2))
            // layerList[i].layers = getCompoundShapes(layer.layers);
            return 'CompoundShape';
        }
        return 'Path';
    }

    /// get corner roundness clamped to the shape size
    function getCompoundRoundness(layer) {
        try {
            var radius = layer.fixedRadius();
            var width = layer.frame().width();
            var height = layer.frame().height();
            var maxRad = Math.min(Math.min(width, height), radius);

            return maxRad / 2;
        } catch (e) {
            return null;
        }
    }
}

//// get shape data: PATH
function getPath(layer, frame) {
    // var lyr = layer.sketchObject.layers().firstObject();     // 51
    var lyr = layer.sketchObject;
    // skip if no path on the current object (like a compound path )
    if (!lyr.points) {
        return {
            points: [],
            inTangents: [],
            outTangents: [],
            closed: false
        };
    }
    /// reset vars
    var points = [],
        inTangents = [],
        outTangents = [];

    /// get the path object
    var path = lyr.points();

    /// get the height and width to multiply point point coordinates
    var shapeSize = {
        w: frame.width,
        h: frame.height
    };

    /// loop through each point on the path
    for (var k = 0; k < path.length; k++) {
        // paths are normalized to 0-1 and scaled by a height and width multiplier
        var p = [round100(path[k].point().x * shapeSize.w), round100(path[k].point().y * shapeSize.h)];

        // if the current point has curves and needs tangent handles
        if (path[k].curveMode() !== 1) {
            // tangent out of the point offset by the point coordinates onscreen
            var o = [round100(path[k].curveFrom().x * shapeSize.w - p[0]), round100(path[k].curveFrom().y * shapeSize.h - p[1])];

            // tangent into the point offset by the point coordinates onscreen
            var i = [round100(path[k].curveTo().x * shapeSize.w - p[0]), round100(path[k].curveTo().y * shapeSize.h - p[1])];

            // current point has no curves so tangets are at the same coordinate as the point
        } else {
            var o = [0, 0];
            var i = [0, 0];
        }

        // add current point and tangent with screen dimensions
        points.push(p);
        inTangents.push(i);
        outTangents.push(o);
    }

    // create object to store path data
    var pathObj = {
        points: points,
        inTangents: inTangents,
        outTangents: outTangents,
        closed: lyr.isClosed() == 1
    };
    return pathObj;
}

//// get layer data: OPACITY
function getOpacity(layer) {
    return Math.round(layer.sketchObject.style().contextSettings().opacity() * 100);
}

//// get layer data: SHAPE TYPE
function getShapeType(lyr) {
    if (lyr['class']() == 'MSShapeGroup' && lyr.layers().length > 1) {
        return 'CompoundShape';
    }
    if (lyr['class']() == 'MSRectangleShape' && !lyr.edited()) {
        return 'Rect';
    }
    if (lyr['class']() == 'MSOvalShape' && !lyr.edited()) {
        return 'Ellipse';
    }
    try {
        if (lyr.layers().firstObject()['class']() == 'MSRectangleShape' && !lyr.layers()[0].edited()) {
            return 'Rect';
        }
        if (lyr.layers().firstObject()['class']() == 'MSOvalShape' && !lyr.layers()[0].edited()) {
            return 'Ellipse';
        }
    } catch (e) {}
    return 'Path';
}

//// get layer data: FLIP
function getFlipMultiplier(layer) {
    try {
        var x = layer.sketchObject.isFlippedHorizontal() ? -100 : 100;
        var y = layer.sketchObject.isFlippedVertical() ? -100 : 100;
    } catch (e) {
        var x = layer.isFlippedHorizontal() ? -100 : 100;
        var y = layer.isFlippedVertical() ? -100 : 100;
    }

    return [x, y];
}

//// get layer data: FILL
function getFills(layer) {
    /// get layer style object
    var style = layer.sketchObject.style();

    /// check if the layer has at least one fill
    var hasFill = style.firstEnabledFill() ? true : false;

    if (hasFill) {
        var fillData = [];
        var size = [layer.sketchObject.frame().width(), layer.sketchObject.frame().height()];

        // loop through all fills
        for (var i = 0; i < style.fills().length; i++) {
            var fill = style.fills()[i];

            // add fill to fillProps only if fill is enabled
            if (fill.isEnabled()) {
                // fill is a gradient
                if (fill.fillType() == 1) {
                    var fillObj = {
                        type: 'gradient',
                        startPoint: [fill.gradient().from().x * size[0] - layer.sketchObject.frame().width() / 2, fill.gradient().from().y * size[1] - layer.sketchObject.frame().height() / 2],
                        endPoint: [fill.gradient().to().x * size[0] - layer.sketchObject.frame().width() / 2, fill.gradient().to().y * size[1] - layer.sketchObject.frame().height() / 2],
                        gradType: fill.gradient().gradientType(),
                        gradient: getGradient(fill.gradient().stops()),
                        opacity: Math.round(fill.contextSettings().opacity() * 100),
                        blendMode: getShapeBlending(fill.contextSettings().blendMode())
                        // fill is an image or texture
                    };
                } else if (fill.fillType() > 3) {
                    fillData = getImage(layer);
                    break;
                    // fill is a solid
                } else {
                    var color = sketchColorToArray(fill.color());
                    var fillObj = {
                        type: 'fill',
                        enabled: fill.isEnabled(),
                        color: color,
                        opacity: Math.round(color[3] * 100),
                        blendMode: getShapeBlending(fill.contextSettings().blendMode())
                    };
                }

                // add obj string to array
                fillData.push(fillObj);
            }
        }
        return fillData;
    } else {
        return null;
    }
}

//// get layer data: STROKE
function getStrokes(layer) {
    /// get layer style object
    var style = layer.sketchObject.style();

    /// check if the layer has at least one stroke
    var hasStroke = style.firstEnabledBorder() ? true : false;

    if (hasStroke) {
        var strokeData = [];
        var size = [layer.sketchObject.frame().width(), layer.sketchObject.frame().height()];

        // loop through all strokes
        for (var i = 0; i < style.borders().length; i++) {
            var border = style.borders()[i];
            if (border.isEnabled()) {
                var color = sketchColorToArray(border.color());
                // stroke is a gradient
                if (border.fillType() == 1) {
                    var _strokeObj;

                    var strokeObj = (_strokeObj = {
                        type: 'gradient',
                        startPoint: [border.gradient().from().x * size[0] - layer.sketchObject.frame().width() / 2, border.gradient().from().y * size[1] - layer.sketchObject.frame().height() / 2],
                        endPoint: [border.gradient().to().x * size[0] - layer.sketchObject.frame().width() / 2, border.gradient().to().y * size[1] - layer.sketchObject.frame().height() / 2],
                        gradType: border.gradient().gradientType() == 1 ? 2 : 1,
                        gradient: getGradient(border.gradient().stops()),
                        opacity: color[3] * 100,
                        width: border.thickness(),
                        cap: style.borderOptions().lineCapStyle(),
                        join: style.borderOptions().lineJoinStyle(),
                        strokeDashes: style.borderOptions().dashPattern()
                    }, _defineProperty(_strokeObj, 'opacity', border.contextSettings().opacity() * 100), _defineProperty(_strokeObj, 'blendMode', border.contextSettings().blendMode()), _strokeObj);
                    // stroke is a solid
                } else {
                    var strokeObj = {
                        type: 'fill',
                        enabled: border.isEnabled(),
                        color: color,
                        opacity: color[3] * 100,
                        width: border.thickness(),
                        cap: style.borderOptions().lineCapStyle(),
                        join: style.borderOptions().lineJoinStyle(),
                        strokeDashes: getDashes(style.borderOptions()),
                        blendMode: border.contextSettings().blendMode()
                    };
                }

                // add obj string to array
                strokeData.push(strokeObj);
            }
        }
        return strokeData; // return array of all strokes
    } else {
        return null; // no fills so return null
    }
}

//// get layer data: STROKE DASHES
function getDashes(borderOptions) {
    var dashPattern = borderOptions.dashPattern();
    var dashArray = [];

    for (var i = 0; i < dashPattern.length; i++) {
        var str = (dashPattern[i] + '&').slice(0, -1);
        dashArray.push(parseFloat(str));
    }
    return dashArray;
}

//// get layer data: GRADIENT
function getGradient(grad) {
    var gradObj = {
        length: grad.length,
        points: []
    };

    for (var i = 0; i < gradObj.length; i++) {
        var colorArr = sketchColorToArray(grad[i].color());
        gradObj.points.push({
            color: colorArr,
            midPoint: 0.5,
            opacity: colorArr[3],
            rampPoint: grad[i].position()
        });
    }
    return gradObj;
}

//// get layer data: DROP SHADOW
function getShadows(layer) {
    var style = layer.sketchObject.style();
    var hasShadow = style.firstEnabledShadow() ? true : false;

    if (hasShadow) {
        var shadowData = []; // array to store shadow(s)
        for (var i = 0; i < style.shadows().length; i++) {
            // loop through all shadows
            var shadow = style.shadows()[i];
            if (shadow.isEnabled()) {
                // add shadow to shadowProps only if shadow is enabled
                var shadowObj = { // 1 object per shadow obj
                    color: sketchColorToArray(shadow.color()), // store color obj as array
                    position: [shadow.offsetX(), shadow.offsetY()],
                    blur: shadow.blurRadius(),
                    spread: shadow.spread()
                };
                shadowData.push(shadowObj); // add obj string to array
            }
        }
        return shadowData; // return array of all shadows
    } else {
        return null; // no shadows so return null
    }
}

//// get layer data: INNER SHADOW
function getInnerShadows(layer) {
    var style = layer.sketchObject.style();
    var hasShadow = style.innerShadows().length > 0 && style.innerShadows()[0].isEnabled() ? true : false; // check if the layer has at least one drop shadow

    if (hasShadow) {
        var shadowData = []; // array to store shadow(s)
        for (var i = 0; i < style.innerShadows().length; i++) {
            // loop through all shadows
            var innerShadow = style.innerShadows()[i];
            var shadowObj = { // 1 object per shadow obj
                color: sketchColorToArray(innerShadow.color()), // store color obj as array
                position: [innerShadow.offsetX(), innerShadow.offsetY()],
                blur: innerShadow.blurRadius(),
                spread: innerShadow.spread()
            };
            shadowData.push(shadowObj); // add obj string to array
        }
        return shadowData; // return array of all shadows
    } else {
        return null; // no shadows so return null
    }
}

//// get layer data: BLUR
function getBlur(layer) {
    var blur = layer.style().blur();
    if (!blur.isEnabled()) {
        return null;
    }

    var blurObj = {
        // center: blur.center(),
        direction: (90 - blur.motionAngle()) % 360,
        radius: blur.radius() * 4,
        type: blur.type()
    };

    return [blurObj];
}
//// DEPRECIATED copy text to clipboard
// function copy_text(txt){
//     var pasteBoard = NSPasteboard.generalPasteboard();
// 		pasteBoard.clearContents();
// 		pasteBoard.declareTypes_owner(NSArray.arrayWithObject(NSPasteboardTypeString), null);
//         pasteBoard.setString_forType(txt, NSPasteboardTypeString);
// }


//// save data to text file
function save_text(text, filePath) {
    var t = NSString.stringWithFormat("%@", text);
    var f = NSString.stringWithFormat("%@", filePath);
    return t.writeToFile_atomically_encoding_error(f, true, NSUTF8StringEncoding, null);
}

//// open dialog and return path
function getFolderPath() {
    if (folderPath == null) {
        var saveWindow = NSOpenPanel.openPanel();
        saveWindow.setCanCreateDirectories(true);
        saveWindow.setCanChooseDirectories(true);
        saveWindow.setCanChooseFiles(false);

        saveWindow.setPrompt('Select');
        saveWindow.setMessage('Location to save images');
        var pathSaved = saveWindow.runModal();

        if (pathSaved) {
            folderPath = decodeURI(saveWindow.URLs().objectAtIndex(0));
            folderPath = folderPath.replace('file://', ''); // remove the file://

            return true; // folder path found
        }

        exportCanceled = true; // canceled
        return false;
    }
    return true; // folder path exists
}

//// save dialog and return path
function getSavePath() {
    if (folderPath == null) {
        var saveWindow = NSSavePanel.savePanel();
        saveWindow.setCanCreateDirectories(true);
        saveWindow.setCanChooseDirectories(true);
        saveWindow.setCanChooseFiles(false);

        saveWindow.setPrompt('Select');
        saveWindow.setMessage('Location to save json file and any images');
        saveWindow.nameFieldStringValue = toolName + '.json';
        // saveWindow.allowedFileTypes(['json']);
        var pathSaved = saveWindow.runModal();

        if (pathSaved) {
            folderPath = decodeURI(saveWindow.URLs().objectAtIndex(0));
            folderPath = folderPath.replace('file://', ''); // remove the file://

            saveName = saveWindow.nameFieldStringValue();
            return true; // folder path found
        }

        exportCanceled = true; // canceled
        return false;
    }
    return true; // folder path exists
}

//// reduce math resolution
function round100(num) {
    return Math.round(num * 100) / 100;
}

//// return enumerated layer blending mode
function getLayerBlending(mode) {
    var aeBlendMode;

    switch (mode) {
        case 1:
            aeBlendMode = 'BlendingMode.DARKEN';
            break;
        case 2:
            aeBlendMode = 'BlendingMode.MULTIPLY';
            break;
        case 3:
            aeBlendMode = 'BlendingMode.COLOR_BURN';
            break;
        case 4:
            aeBlendMode = 'BlendingMode.LIGHTEN';
            break;
        case 5:
            aeBlendMode = 'BlendingMode.SCREEN';
            break;
        case 6:
            aeBlendMode = 'BlendingMode.ADD';
            break;
        case 7:
            aeBlendMode = 'BlendingMode.OVERLAY';
            break;
        case 8:
            aeBlendMode = 'BlendingMode.SOFT_LIGHT';
            break;
        case 9:
            aeBlendMode = 'BlendingMode.HARD_LIGHT';
            break;
        case 10:
            aeBlendMode = 'BlendingMode.DIFFERENCE';
            break;
        case 11:
            aeBlendMode = 'BlendingMode.EXCLUSION';
            break;
        case 12:
            aeBlendMode = 'BlendingMode.HUE';
            break;
        case 13:
            aeBlendMode = 'BlendingMode.SATURATION';
            break;
        case 14:
            aeBlendMode = 'BlendingMode.COLOR';
            break;
        case 15:
            aeBlendMode = 'BlendingMode.LUMINOSITY';
            break;
        default:
            aeBlendMode = 'BlendingMode.NORMAL';
    }
    return aeBlendMode;
}

//// return integer layer blending mode
function getShapeBlending(mode) {
    var aeBlendMode;

    switch (mode) {
        case 1:
            aeBlendMode = 3;
            break;
        case 2:
            aeBlendMode = 4;
            break;
        case 3:
            aeBlendMode = 5;
            break;
        case 4:
            aeBlendMode = 9;
            break;
        case 5:
            aeBlendMode = 10;
            break;
        case 6:
            aeBlendMode = 11;
            break;
        case 7:
            aeBlendMode = 15;
            break;
        case 8:
            aeBlendMode = 16;
            break;
        case 9:
            aeBlendMode = 17;
            break;
        case 10:
            aeBlendMode = 23;
            break;
        case 11:
            aeBlendMode = 24;
            break;
        case 12:
            aeBlendMode = 26;
            break;
        case 13:
            aeBlendMode = 27;
            break;
        case 14:
            aeBlendMode = 28;
            break;
        case 15:
            aeBlendMode = 29;
            break;
        default:
            aeBlendMode = 1;
    }

    return aeBlendMode;
}

//// convert color obj to array
function sketchColorToArray(c) {
    var colorString = c.toString().replace('r:', '').replace('g:', '').replace('b:', '').replace('a:', '').replace(/\s/g, ', ').replace('(', '[').replace(')', ']');

    return JSON.parse(colorString);
}

//// convert hex color to array
function hexToArray(hexString) {
    var hexColor = hexString.replace('#', '');
    var r = parseInt(hexColor.slice(0, 2), 16) / 255,
        g = parseInt(hexColor.slice(2, 4), 16) / 255,
        b = parseInt(hexColor.slice(4, 6), 16) / 255;
    return [r, g, b, 1];
}

//// DEPRECIATED
// function sketchColorToOpacity(c) {
// 	var colorArray = c.toString().slice(1,-1);  // remove parenthesis
// 		colorArray = colorArray.split(' a:')[1];
// 	return colorArray * 100;
// }


//// for debugging
function alert(text, opt_headline) {
    var headline = opt_headline !== undefined ? opt_headline : 'Alert';
    NSApplication.sharedApplication().displayDialog_withTitle(text.toString(), headline);
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var prepareValue = __webpack_require__(6)

module.exports.toArray = __webpack_require__(3)
module.exports.prepareStackTrace = __webpack_require__(2)
module.exports.prepareValue = prepareValue
module.exports.prepareObject = prepareValue.prepareObject
module.exports.prepareArray = prepareValue.prepareArray


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign, no-var, vars-on-top, prefer-template, prefer-arrow-callback, func-names, prefer-destructuring, object-shorthand */
var prepareStackTrace = __webpack_require__(2)
var toArray = __webpack_require__(3)

function prepareArray(array, options) {
  return array.map(function(i) {
    return prepareValue(i, options)
  })
}

function prepareObject(object, options) {
  const deep = {}
  Object.keys(object).forEach(function(key) {
    deep[key] = prepareValue(object[key], options)
  })
  return deep
}

function getName(x) {
  return {
    type: 'String',
    primitive: 'String',
    value: String(x.name()),
  }
}

function getSelector(x) {
  return {
    type: 'String',
    primitive: 'String',
    value: String(x.selector()),
  }
}

function introspectMochaObject(value, options) {
  options = options || {}
  var mocha = value.class().mocha()
  var introspection = {
    properties: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(
        mocha['properties' + (options.withAncestors ? 'WithAncestors' : '')]()
      ).map(getName),
    },
    classMethods: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(
        mocha['classMethods' + (options.withAncestors ? 'WithAncestors' : '')]()
      ).map(getSelector),
    },
    instanceMethods: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(
        mocha['instanceMethods' + (options.withAncestors ? 'WithAncestors' : '')]()
      ).map(getSelector),
    },
    protocols: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(
        mocha['protocols' + (options.withAncestors ? 'WithAncestors' : '')]()
      ).map(getName),
    },
  }
  if (mocha.treeAsDictionary && options.withTree) {
    introspection.treeAsDictionary = {
      type: 'Object',
      primitive: 'Object',
      value: prepareObject(mocha.treeAsDictionary())
    }
  }
  return introspection
}

function prepareValue(value, options) {
  var type = 'String'
  var primitive = 'String'
  const typeOf = typeof value
  if (value instanceof Error) {
    type = 'Error'
    primitive = 'Error'
    value = {
      message: value.message,
      name: value.name,
      stack: prepareStackTrace(value.stack),
    }
  } else if (Array.isArray(value)) {
    type = 'Array'
    primitive = 'Array'
    value = prepareArray(value, options)
  } else if (value === null || value === undefined || Number.isNaN(value)) {
    type = 'Empty'
    primitive = 'Empty'
    value = String(value)
  } else if (typeOf === 'object') {
    if (value.isKindOfClass && typeof value.class === 'function') {
      type = String(value.class())
      // TODO: Here could come some meta data saved as value
      if (
        type === 'NSDictionary' ||
        type === '__NSDictionaryM' ||
        type === '__NSSingleEntryDictionaryI' ||
        type === '__NSDictionaryI' ||
        type === '__NSCFDictionary'
      ) {
        primitive = 'Object'
        value = prepareObject(Object(value), options)
      } else if (
        type === 'NSArray' ||
        type === 'NSMutableArray' ||
        type === '__NSArrayM' ||
        type === '__NSSingleObjectArrayI' ||
        type === '__NSArray0'
      ) {
        primitive = 'Array'
        value = prepareArray(toArray(value), options)
      } else if (
        type === 'NSString' ||
        type === '__NSCFString' ||
        type === 'NSTaggedPointerString' ||
        type === '__NSCFConstantString'
      ) {
        primitive = 'String'
        value = String(value)
      } else if (type === '__NSCFNumber' || type === 'NSNumber') {
        primitive = 'Number'
        value = 0 + value
      } else if (type === 'MOStruct') {
        type = String(value.name())
        primitive = 'Object'
        value = value.memberNames().reduce(function(prev, k) {
          prev[k] = prepareValue(value[k], options)
          return prev
        }, {})
      } else if (value.class().mocha) {
        primitive = 'Mocha'
        value = (options || {}).skipMocha ? type : introspectMochaObject(value, options)
      } else {
        primitive = 'Unknown'
        value = type
      }
    } else {
      type = 'Object'
      primitive = 'Object'
      value = prepareObject(value, options)
    }
  } else if (typeOf === 'function') {
    type = 'Function'
    primitive = 'Function'
    value = String(value)
  } else if (value === true || value === false) {
    type = 'Boolean'
    primitive = 'Boolean'
  } else if (typeOf === 'number') {
    primitive = 'Number'
    type = 'Number'
  }

  return {
    value,
    type,
    primitive,
  }
}

module.exports = prepareValue
module.exports.prepareObject = prepareObject
module.exports.prepareArray = prepareArray


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign, no-var, vars-on-top, prefer-template, prefer-arrow-callback, func-names, prefer-destructuring, object-shorthand */
var remoteWebview = __webpack_require__(8)

module.exports.identifier = 'skpm.debugger'

module.exports.isDebuggerPresent = remoteWebview.isWebviewPresent.bind(
  this,
  module.exports.identifier
)

module.exports.sendToDebugger = function sendToDebugger(name, payload) {
  return remoteWebview.sendToWebview(
    module.exports.identifier,
    'sketchBridge(' +
      JSON.stringify({
        name: name,
        payload: payload,
      }) +
      ');'
  )
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/* globals NSThread */

var threadDictionary = NSThread.mainThread().threadDictionary()

module.exports.isWebviewPresent = function isWebviewPresent (identifier) {
  return !!threadDictionary[identifier]
}

module.exports.sendToWebview = function sendToWebview (identifier, evalString) {
  if (!module.exports.isWebviewPresent(identifier)) {
    throw new Error('Webview ' + identifier + ' not found')
  }

  var webview = threadDictionary[identifier]
    .contentView()
    .subviews()
  webview = webview[webview.length - 1]

  return webview.stringByEvaluatingJavaScriptFromString(evalString)
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports.SET_TREE = 'elements/SET_TREE'
module.exports.SET_PAGE_METADATA = 'elements/SET_PAGE_METADATA'
module.exports.SET_LAYER_METADATA = 'elements/SET_LAYER_METADATA'
module.exports.ADD_LOG = 'logs/ADD_LOG'
module.exports.CLEAR_LOGS = 'logs/CLEAR_LOGS'
module.exports.GROUP = 'logs/GROUP'
module.exports.GROUP_END = 'logs/GROUP_END'
module.exports.TIMER_START = 'logs/TIMER_START'
module.exports.TIMER_END = 'logs/TIMER_END'
module.exports.ADD_REQUEST = 'network/ADD_REQUEST'
module.exports.SET_RESPONSE = 'network/SET_RESPONSE'
module.exports.ADD_ACTION = 'actions/ADD_ACTION'
module.exports.SET_SCRIPT_RESULT = 'playground/SET_SCRIPT_RESULT'


/***/ }),
/* 10 */
/***/ (function(module, exports) {

/* globals NSUUID MOClassDescription NSObject NSSelectorFromString NSClassFromString */

module.exports = function (selectorHandlerDict, superclass) {
  var uniqueClassName = 'MochaJSDelegate_DynamicClass_' + NSUUID.UUID().UUIDString()

  var delegateClassDesc = MOClassDescription.allocateDescriptionForClassWithName_superclass_(uniqueClassName, superclass || NSObject)

  delegateClassDesc.registerClass()

  // Storage Handlers
  var handlers = {}

  // Define interface
  this.setHandlerForSelector = function (selectorString, func) {
    var handlerHasBeenSet = (selectorString in handlers)
    var selector = NSSelectorFromString(selectorString)

    handlers[selectorString] = func

    /*
      For some reason, Mocha acts weird about arguments: https://github.com/logancollins/Mocha/issues/28
      We have to basically create a dynamic handler with a likewise dynamic number of predefined arguments.
    */
    if (!handlerHasBeenSet) {
      var args = []
      var regex = /:/g
      while (regex.exec(selectorString)) {
        args.push('arg' + args.length)
      }

      var dynamicFunction = eval('(function (' + args.join(', ') + ') { return handlers[selectorString].apply(this, arguments); })')

      delegateClassDesc.addInstanceMethodWithSelector_function_(selector, dynamicFunction)
    }
  }

  this.removeHandlerForSelector = function (selectorString) {
    delete handlers[selectorString]
  }

  this.getHandlerForSelector = function (selectorString) {
    return handlers[selectorString]
  }

  this.getAllHandlers = function () {
    return handlers
  }

  this.getClass = function () {
    return NSClassFromString(uniqueClassName)
  }

  this.getClassInstance = function () {
    return NSClassFromString(uniqueClassName).new()
  }

  // Convenience
  if (typeof selectorHandlerDict === 'object') {
    for (var selectorString in selectorHandlerDict) {
      this.setHandlerForSelector(selectorString, selectorHandlerDict[selectorString])
    }
  }
}


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("sketch/ui");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("sketch/settings");

/***/ })
/******/ ]);
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['openWindow'] = __skpm_run.bind(this, 'openWindow');
that['onRun'] = __skpm_run.bind(this, 'default');
that['pushJSON'] = __skpm_run.bind(this, 'pushJSON');
that['saveJSON'] = __skpm_run.bind(this, 'saveJSON');
that['detachSymbols'] = __skpm_run.bind(this, 'detachSymbols');
that['flattenCompounds'] = __skpm_run.bind(this, 'flattenCompounds');
that['imageToSymbol'] = __skpm_run.bind(this, 'imageToSymbol')
