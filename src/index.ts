import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { DOMUtils } from '@jupyterlab/apputils';

import { Widget } from '@lumino/widgets';

const TOP_AREA_CSS_CLASS = 'jp-TopAreaText';

/**
 * Initialization data for the @noteable/toparea extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: '@noteable/noteable_laf:plugin',
  description: 'A JupyterLab extension to add text in the top area.',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    // Create the HTML content of the widget
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
    noteableLogo.setAttribute(
      'src',
      'https://noteable.edina.ac.uk/images/logo_noteable.svg'
    );
    lpAnchor.appendChild(noteableLogo);
    node.appendChild(nbGraphic);
    node.appendChild(lpAnchor);

    // Create the widget
    const widget = new Widget({ node });
    widget.id = DOMUtils.createDomID();
    widget.addClass(TOP_AREA_CSS_CLASS);

    // Add the widget to the top area
    app.shell.add(widget, 'top', { rank: 1000 });
  }
};

export default plugin;
