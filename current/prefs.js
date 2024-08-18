import GObject from 'gi://GObject';
import Gtk from 'gi://Gtk';
import Gio from 'gi://Gio';
import Adw from 'gi://Adw';
import { ExtensionPreferences } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';
export default class MyExtensionPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const settings = this.getSettings('org.gnome.shell.extensions.counter');
        const page = new Adw.PreferencesPage();
        const group = new Adw.PreferencesGroup();
        page.add(group);
        const alignmentRow = new Adw.ActionRow({
            title: "Alignment (left, center, right):",
        });
        group.add(alignmentRow);
        const alignmentEntry = new Gtk.Entry({
            text: settings.get_string('alignment'),
            valign: Gtk.Align.CENTER,
        });
        alignmentEntry.connect('changed', entry => {
            settings.set_string('alignment', entry.get_text());
        });
        alignmentRow.add_suffix(alignmentEntry);
        alignmentRow.activatable_widget = alignmentEntry;
        const indexRow = new Adw.ActionRow({
            title: "Index (1-10):",
        });
        group.add(indexRow);
        const indexAdjustment = new Gtk.Adjustment({
            lower: 1,
            upper: 10,
            step_increment: 1,
        });
        const indexSpinButton = new Gtk.SpinButton({
            adjustment: indexAdjustment,
            valign: Gtk.Align.CENTER,
        });
        indexSpinButton.set_value(settings.get_int('index'));
        indexSpinButton.connect('value-changed', spinButton => {
            settings.set_int('index', spinButton.get_value_as_int());
        });
        indexRow.add_suffix(indexSpinButton);
        indexRow.activatable_widget = indexSpinButton;
        const labelFormatRow = new Adw.ActionRow({
            title: "Label Format (use $count for the counter):",
        });
        group.add(labelFormatRow);
        const labelFormatEntry = new Gtk.Entry({
            text: settings.get_string('label-format'),
            valign: Gtk.Align.CENTER,
        });
        labelFormatEntry.connect('changed', entry => {
            settings.set_string('label-format', entry.get_text());
        });
        labelFormatRow.add_suffix(labelFormatEntry);
        labelFormatRow.activatable_widget = labelFormatEntry;
        window.add(page);
    }
}

