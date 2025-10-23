---
next: false
---
### How to install packages on fedora atomic

- The recommended way to install most appilications is flatpak, see [flathub](https://flathub.org)
- We also have our own flatpak repo with mobile config for firefox, see [pocketblue flatpak repo](https://github.com/pocketblue/pocketblue.github.io)

### Using dnf in toolbox

- If you want to use `dnf` on fedora atomic, it's strongly recommended to use [toolbox](toolbox.md)

### Upgrading system

- Use `bootc upgrade` or `rpm-ostree upgrade`
- After using `rpm-ostree` or `bootc` you should run `sudo ostree admin finalize-staged` to apply changes
- This is required because the shutdown process is currently broken and may cause the system to freeze or crash

### Installing packages to system

- On atomic systems installing packages to system is not recommended, but you can do it using `rpm-ostree install`
- After using `rpm-ostree` you should run `sudo ostree admin finalize-staged` to apply changes
