export default function NacaratTheme($mdThemingProvider) {
  // #2d2d2d
  // #212121

  var nacaratOrange = $mdThemingProvider.extendPalette("orange", {
    "400": "#EF5350",
    "500": "#FF5252",
    "800": "#C62828",
    "900": "#B71C1C",
    contrastDefaultColor: "light"
  });

  var nacaratBlue = $mdThemingProvider.extendPalette("blue", {
    "100": "#d8f3ff",
    "200": "#82afe1",
    A100: "#5e7998",
    contrastDefaultColor: "light"
  });

  $mdThemingProvider.definePalette("nacaratOrange", nacaratOrange);
  $mdThemingProvider.definePalette("nacaratBlue", nacaratBlue);

  $mdThemingProvider
    .theme("default")
    .primaryPalette("nacaratOrange")
    .accentPalette("nacaratBlue", {
      default: "700",
      "hue-1": "100",
      "hue-2": "200",
      "hue-3": "A100"
    })
    .warnPalette("red")
    .backgroundPalette("grey");
}
