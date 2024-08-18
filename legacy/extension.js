const { Clutter, GObject, St, GLib } = imports.gi;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

class Extension {
    constructor(uuid) {
        this._uuid = uuid;
        this._counter = 0;
    }

    enable() {
        this._loadSettings();
        this._counter = this._loadCounter();
        this._indicator = new Indicator(this);
        Main.panel.addToStatusArea(this._uuid, this._indicator, this._settings.index, this._settings.alignment);
    }

    disable() {
        this._saveCounter();
        if (this._indicator) {
            this._indicator.destroy();
            this._indicator = null;
        }
        this._settings = null; // Null out settings
    }

    incrementCounter() {
        this._counter++;
        this._saveCounter();
        this._indicator.updateLabel();
    }

    decrementCounter() {
        this._counter--;
        if (this._counter < 0) {
            this._counter = 0;
        }
        this._saveCounter();
        this._indicator.updateLabel();
    }

    resetCounter() {
        this._counter = 0;
        this._saveCounter();
        this._indicator.updateLabel();
    }

    getCounter() {
        return this._counter;
    }

    _loadCounter() {
        let file = GLib.build_filenamev([GLib.get_home_dir(), '.counter-extension']);
        if (GLib.file_test(file, GLib.FileTest.EXISTS)) {
            let [, content] = GLib.file_get_contents(file);
            return parseInt(content.toString().trim()) || 0;
        }
        return 0;
    }

    _saveCounter() {
        let file = GLib.build_filenamev([GLib.get_home_dir(), '.counter-extension']);
        GLib.file_set_contents(file, this._counter.toString());
    }

    _loadSettings() {
        this._settings = ExtensionUtils.getSettings('org.gnome.shell.extensions.counter');
        this._settings.alignment = this._settings.get_string('alignment');
        this._settings.index = this._settings.get_int('index');
        this._settings.labelFormat = this._settings.get_string('label-format');
    }
}

const Indicator = GObject.registerClass(
class Indicator extends PanelMenu.Button {
    _init (extension) {
        super._init(0.0, 'Toggle Button');
        this._extension = extension;
        this._label = new St.Label({
            text: this._formatLabel(),
            y_align: Clutter.ActorAlign.CENTER,
        });
        this.add_child(this._label);
        this.connect('button-press-event', this._onButtonPress.bind(this));
    }

    _onButtonPress(actor, event) {
        switch (event.get_button()) {
            case Clutter.BUTTON_PRIMARY:
                this._extension.incrementCounter();
                break;
            case Clutter.BUTTON_SECONDARY:
                this._extension.decrementCounter();
                break;
            case Clutter.BUTTON_MIDDLE:
                this._extension.resetCounter();
                break;
            default:
                break;
        }
        return Clutter.EVENT_PROPAGATE;
    }

    _formatLabel() {
        let format = this._extension._settings.labelFormat || 'COUNT: $count';
        return format.replace('$count', this._extension.getCounter());
    }

    updateLabel() {
        this._label.set_text(this._formatLabel());
    }
});

function init(meta) {
    return new Extension(meta.uuid);
}
