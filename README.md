# A Counter Extension for GNOME

- Adds a counter to the top bar; Left click increases counter by 1; right click decreases counter by 1; and middle click resets counter to 0.
- Counts are now persistent on restart [the extension keeps record of counts at /home/$USER/.counter-extension]
- Label, Alignment and Index are now changeable and remember TO LOG OUT AND LOG BACK IN to view those changes.

INSTALLATION
-------
For GNOME 44 or less,
1. `git clone https://github.com/anubhab-mandal/counter/`
2. `cp -r counter/legacy ~/.local/share/gnome-shell/extensions/counter@anubhab/`
3. `glib-compile-schemas ~/.local/share/gnome-shell/extensions/counter@anubhab/schemas/`
4. ALT+F2 and hit 'r' and enter, if you are on X11; else if wayland or something else, just log out and log back in.
5. `gnome-extensions enable counter@anubhab`
-------
For GNOME 45 or more,
1. `git clone https://github.com/anubhab-mandal/counter/`
2. `cp -r counter/current ~/.local/share/gnome-shell/extensions/counter@anubhab/`
3. `glib-compile-schemas ~/.local/share/gnome-shell/extensions/counter@anubhab/schemas/`
4. ALT+F2 and hit 'r' and enter, if you are on X11; else if wayland or something else, just log out and log back in.
5. `gnome-extensions enable counter@anubhab`
-------
auf Wiedersehen!
-------
