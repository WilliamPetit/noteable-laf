import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ICommandPalette } from '@jupyterlab/apputils';
import { IMainMenu } from '@jupyterlab/mainmenu';

import { DOMUtils } from '@jupyterlab/apputils';

import { Widget } from '@lumino/widgets';

interface IMyCommand {
  command: string;
  label: string;
  caption: string;
  icon?: string;
  action(): void;
}

const TOP_AREA_CSS_CLASS = 'jp-TopAreaText';

/**
 * Initialization data for the @noteable/toparea extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: '@noteable/noteable-laf:plugin',
  description: 'A JupyterLab extension to add text in the top area.',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (
    app: JupyterFrontEnd,
    palette: ICommandPalette,
    menu: IMainMenu
  ) => {
    const command = 'noteable-laf:go2LaunchPage';
    const myCommands: Array<IMyCommand> = [];
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

    const menuGroup: Array<{ command: string }> = [];
    menuGroup.push({ command });

    menu.fileMenu.addItem({ command });
    menu.editMenu.addGroup(menuGroup);
  }
};

function setupIcons(app: JupyterFrontEnd) {
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

function setupCommands(
  app: JupyterFrontEnd,
  palette: ICommandPalette,
  myCommands: Array<IMyCommand>
) {
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
      execute: (args: any) => {
        if (args['origin'] !== 'init') {
          myCommand.action();
        }
      }
    });

    palette.addItem({ command, category, args: { origin: 'from palette' } });

    // Call the command execution
    commands.execute(command, { origin: 'init' }).catch(reason => {
      console.error(
        `An error occurred during the execution of ${command}.\n${reason}`
      );
    });
  });
}
export default plugin;
