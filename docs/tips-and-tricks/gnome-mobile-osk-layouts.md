# Better OSK layouts for Gnome Mobile

Gnome Shell's on-screen keyboard's layouts may lack functionality required to
conviniently navigate some applications, particularly the ones that were not optimized
for mobile devices. 

The layouts can be modified by editing gnome-shell's resources.
[gnome-osk-layouts](https://codeberg.org/twosaladcodes/gnome-osk-layouts)
project aims to improve Mobile Gnome Shell's OSK usability by optimizing
it and adding 2 new layouts - Colemak and Rulemak
(full list of features can be found in the project's README).

!!! danger
    This replaces some of the shell's resources and may break across updates.
    If the keyboard breaks or GDM / Gnome Shell doesn't start after an update
    you should roll back to the previous image from GRUB and remove the extension.

## Installation

1. Download the sysext archive from the latest release: https://codeberg.org/twosaladcodes/gnome-osk-layouts/releases
2. Follow the instruction from the release description to install the system extension
3. Log out or reboot
