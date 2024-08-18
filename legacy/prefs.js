const { GObject, Gtk } = imports.gi;
const ExtensionUtils = imports.misc.extensionUtils;
function init() {
}
function buildPrefsWidget() {
    let settings = ExtensionUtils.getSettings('org.gnome.shell.extensions.counter');
    let frame = new Gtk.Box({
        orientation: Gtk.Orientation.VERTICAL,
        margin_top: 20,
        margin_bottom: 20,
        margin_start: 20,
        margin_end: 20,
        spacing: 10,
    });
    let alignmentLabel = new Gtk.Label({
        label: "Alignment (left, center, right):",
        halign: Gtk.Align.START,
    });
    frame.append(alignmentLabel);
    let alignmentEntry = new Gtk.Entry({
        text: settings.get_string('alignment'),
    });
    alignmentEntry.connect('changed', function (entry) {
        settings.set_string('alignment', entry.get_text());
    });
    frame.append(alignmentEntry);
    let indexLabel = new Gtk.Label({
        label: "Index (1-10):",
        halign: Gtk.Align.START,
    });
    frame.append(indexLabel);
    let indexEntry = new Gtk.SpinButton({
        adjustment: new Gtk.Adjustment({
            lower: 1,
            upper: 10,
            step_increment: 1,
        }),
        value: settings.get_int('index'),
    });
    indexEntry.connect('value-changed', function (spinButton) {
        settings.set_int('index', spinButton.get_value_as_int());
    });
    frame.append(indexEntry);
    let labelFormatLabel = new Gtk.Label({
        label: "Label Format (use $count for the counter):",
        halign: Gtk.Align.START,
    });
    frame.append(labelFormatLabel);
    let labelFormatEntry = new Gtk.Entry({
        text: settings.get_string('label-format'),
    });
    labelFormatEntry.connect('changed', function (entry) {
        settings.set_string('label-format', entry.get_text());
    });
    frame.append(labelFormatEntry);
    return frame;
}
