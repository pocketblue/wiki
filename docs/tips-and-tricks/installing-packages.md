# Installing packages

## Flatpak

Flatpak is the recommended way to install most applications.
To install flatpak packages use the software centre (Gnome Software or KDE Discover) or flatpak cli.

Pocketblue comes with [Flathub](https://flathub.org/) and Fedora Flatpaks repos enabled by default.
Additionaly, you can enable the [Pocketblue repo](./flatpaks.md), which provides mobile configurations for Firefox.

## Toolbox

If you want to install a package using a regular package manager (e.g. `dnf`), you can create a toolbox container.
See [Toolbox](./toolbox.md) for more information.

## System packages

If necessary, `rpm-ostree` can be used to layer packages over the system image:

```shell
rpm-ostree install <package>
```

After installing a package using `rpm-ostree` you must either reboot or apply the changes using `sudo rpm-ostree apply-live`.

## Upgrading the system

Use `bootc upgrade` to update the system image, or `rpm-ostree upgrade` to update the system image and layered packages.

!!! note
    `bootc upgrade` will not work if you have previously made overrides using `rpm-ostree`. In this case use `rpm-ostree upgrade`

## Switching to a signed image

By default, the system container image signature isn't verified. You can rebase to a signed image for increased security.

First, check what image you're currently running with `sudo bootc status` or `rpm-ostree status`. Then:

If you use bootc:

```shell
sudo bootc upgrade
reboot
sudo bootc switch --enforce-container-sigpolicy <CURRENT IMAGE>
```

If you use rpm-ostree:

```shell
sudo rpm-ostree upgrade
reboot
sudo rpm-ostree rebase ostree-image-signed:docker://<CURRENT IMAGE>
```
