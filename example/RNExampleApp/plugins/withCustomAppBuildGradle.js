const { withAppBuildGradle } = require('expo/config-plugins');

module.exports = function withCustomAppBuildGradle(config) {
 return withAppBuildGradle(config, async (config) => {
   const androidPattern = '\nandroid {\n';
   const androidIndex = config.modResults.contents.indexOf(androidPattern);
   const androidPivot = androidIndex + androidPattern.length + 1;
   config.modResults.contents =
     config.modResults.contents.slice(0, androidPivot) +
     '   compileOptions {\n' +
     '        sourceCompatibility JavaVersion.VERSION_1_8\n' +
     '        targetCompatibility JavaVersion.VERSION_1_8\n' +
     '    }\n\n ' +
     config.modResults.contents.slice(androidPivot);

   return config;
 });
};