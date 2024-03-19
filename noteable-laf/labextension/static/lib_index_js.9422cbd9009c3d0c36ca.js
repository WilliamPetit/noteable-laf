"use strict";
(self["webpackChunk_noteable_noteable_laf"] = self["webpackChunk_noteable_noteable_laf"] || []).push([["lib_index_js"],{

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_1__);



const TOP_AREA_CSS_CLASS = 'jp-TopAreaText';
/**
 * Initialization data for the @noteable/toparea extension.
 */
const plugin = {
    id: '@noteable/noteable-laf:plugin',
    description: 'A JupyterLab extension to add text in the top area.',
    autoStart: true,
    requires: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ICommandPalette],
    activate: (app, palette, menu) => {
        const command = 'noteable-laf:go2LaunchPage';
        const myCommands = [];
        myCommands.push({
            command: 'noteable-laf:go2LaunchPage',
            label: 'Return to the Launch page',
            caption: 'Return to the Launch page (to shut your notebook down)',
            action: () => window.location.assign('/launch')
        });
        myCommands.push({
            command: 'noteable-laf:go2Resources',
            label: 'View Resources page',
            caption: 'Open the Noteable Resources page (in a new tab)',
            action: () => window.open('/resources/')
        });
        myCommands.push({
            command: 'noteable-laf:go2HelpAndGuides',
            label: 'View Help and Guides page',
            caption: 'Open the Noteable Help and Guides page (in a new tab)',
            action: () => window.open('help_guides')
        });
        setupIcons(app);
        setupCommands(app, palette, myCommands);
        /*
        / Add an item to the File Menu
        / ...except it's not working yet!
        */
        const menuGroup = [];
        menuGroup.push({ command });
        menu.fileMenu.addItem({ command });
        menu.editMenu.addGroup(menuGroup);
    }
};
function setupIcons(app) {
    /*
    / Create the HTML content of the widget
    */
    const node = document.createElement('div');
    node.setAttribute('id', 'noteable-logo-div');
    const nbGraphic = document.createElement('span');
    nbGraphic.setAttribute('id', 'notebook-type');
    nbGraphic.textContent = '';
    node.appendChild(nbGraphic);
    const lpAnchor = document.createElement('a');
    lpAnchor.setAttribute('id', 'noteable_home_link');
    lpAnchor.setAttribute('href', '/launch');
    const noteableLogo = document.createElement('img');
    noteableLogo.setAttribute('alt', 'Return to the Launch Page');
    noteableLogo.setAttribute('id', 'noteable-logo');
    noteableLogo.setAttribute('src', 'https://noteable.edina.ac.uk/images/logo_noteable.svg');
    lpAnchor.appendChild(noteableLogo);
    node.appendChild(nbGraphic);
    node.appendChild(lpAnchor);
    // Create the widget
    const widget = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__.Widget({ node });
    widget.id = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.DOMUtils.createDomID();
    widget.addClass(TOP_AREA_CSS_CLASS);
    // Add the widget to the top area
    app.shell.add(widget, 'top', { rank: 1000 });
}
function setupCommands(app, palette, myCommands) {
    /*
    / Add a command to the central command-palette
    */
    const { commands } = app;
    const category = 'Noteable';
    myCommands.forEach(myCommand => {
        const command = myCommand.command;
        // Add a command
        commands.addCommand(command, {
            label: myCommand.label,
            caption: myCommand.caption,
            isEnabled: () => true,
            isVisible: () => true,
            execute: (args) => {
                if (args['origin'] !== 'init') {
                    myCommand.action();
                }
            }
        });
        palette.addItem({ command, category, args: { origin: 'from palette' } });
        // Call the command execution
        commands.execute(command, { origin: 'init' }).catch(reason => {
            console.error(`An error occurred during the execution of ${command}.\n${reason}`);
        });
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);


/***/ })

}]);
//# sourceMappingURL=lib_index_js.9422cbd9009c3d0c36ca.js.map