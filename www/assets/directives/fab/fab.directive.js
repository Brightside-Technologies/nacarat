/**
 * fabOptions:{
 *  animationClass: string: "md-fling"|"md-scale",
 *  positionClass: string: "md-fab-top-left"|"md-fab-top-right"|"md-fab-bottom-left"|"md-fab-bottom-right"
 *  direction: string: "up"|"down"|"left"|"right"
 *  trigger:{
 *      class: "",
 *      icon: "",
 *      toolTip: bool,
 *      label: "",
 *      toolTipDirection:  "up"|"down"|"left"|"right" default: left
 *   },
 *  actions:[
 *      {
 *          toolTip: bool,
 *          toolTipDirection:  "up"|"down"|"left"|"right" default: left
 *          class: "",
 *          icon: "",
 *          label: "",
 *          action: function
 *      }
 *  ]
 * }
 */
export default function FabDirective() {
    return {
        restrict: "E",
        template: require("./fab.html")
    };
}
