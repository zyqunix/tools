/******/ (() => { // webpackBootstrap
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
// eslint-disable-next-line no-undef
var basePath = "https://boost.bgaming-network.com/";
console.log(basePath);
// Feature flag configuration
var featureFlags = {
  amplitude: false,
  actioncable: false,
  sentry: true
};
var boostModules = {
  amplitude: {
    src: '/static/analytics/amplitude.js'
  },
  actioncable: {
    src: '/static/websockets.js'
  },
  sentry: {
    src: 'sentry.js'
  }
};

// Function to dynamically load scripts based on feature flags with an onComplete callback
function loadFeatureScripts(flags, onComplete) {
  console.log('load feature scripts', flags);
  var featuresToLoad = Object.keys(flags).filter(function (feature) {
    return flags[feature];
  });
  var loadedCount = 0;

  // If there are no scripts to load, call onComplete immediately
  if (featuresToLoad.length === 0) {
    onComplete && onComplete();
    return;
  }

  // Load each feature script by ID
  featuresToLoad.forEach(function (featureID) {
    loadScript(featureID, function () {
      loadedCount++;
      // Call onComplete when all scripts are loaded
      if (loadedCount === featuresToLoad.length && typeof onComplete === 'function') {
        onComplete();
      }
    });
  });
}

// Function to load an individual script by ID with a callback
function loadScript(moduleID, callback) {
  console.log('load script', moduleID, boostModules[moduleID].src);
  var script = document.createElement('script');
  script.src = "".concat(basePath).concat(boostModules[moduleID].src);
  script.onload = function () {
    console.log("Loaded script with ID: ".concat(moduleID));
    callback && callback();
  };
  script.onerror = function () {
    console.error("Failed to load script with ID: ".concat(moduleID));
    callback && callback();
  };
  document.head.appendChild(script);
}

// Example usage: Load scripts based on feature flags, and log a message when complete
loadFeatureScripts(featureFlags, function () {
  console.log('All feature scripts loaded successfully.');
});
/******/ })()
;
//# sourceMappingURL=wrapper.js.map