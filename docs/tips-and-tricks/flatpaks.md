# Pocketblue flatpaks

Additional flatpak packages for Pocketblue

## Adding the Pocketblue flatpak repo

To add the repo run the following command:

```shell
sudo flatpak remote-add pocketblue https://pocketblue.github.io/pocketblue.flatpakrepo
```

To list available packages:

```shell
flatpak remote-ls pocketblue
```

Example output:

```shell
io.github.pocketblue.handyfox
org.mozilla.firefox.systemconfig
```

## Available packages

### firefox-systemconfig (org.mozilla.firefox.systemconfig)

An extension for the official Firefox flatpak package.
Ships a configuration that makes Firefox usable on mobile devices.
Requires Firefox to be installed.

- Project homepage: [gitlab.postmarketos.org/postmarketOS/mobile-config-firefox](https://gitlab.postmarketos.org/postmarketOS/mobile-config-firefox)
- Flatpak manifest: [github.com/pocketblue/firefox-systemconfig](https://github.com/pocketblue/firefox-systemconfig)

### Handyfox (io.github.pocketblue.handyfox)

A separate application with a different name and icon that ships Firefox with the mobile theme preinstalled.

Project homepage: [github.com/pocketblue/handyfox](https://github.com/pocketblue/handyfox)
