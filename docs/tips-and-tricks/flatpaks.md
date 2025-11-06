# Pocketblue flatpaks

Additional flatpak packages for Pocketblue

### add pocketblue flatpak repo

```shell
sudo flatpak remote-add pocketblue https://pocketblue.github.io/pocketblue.flatpakrepo
```

### list available apps

```shell
flatpak remote-ls pocketblue
```

this command will list apps:

```shell
io.github.pocketblue.handyfox
org.mozilla.firefox.systemconfig
```

### difference between firefox-systemconfig and handyfox

firefox-systemconfig:

- applies mobile config to the `org.mozilla.firefox` flatpak package
- does not ship the firefox binary
- does not change the icon

handyfox:

- separate application that does not affect the `org.mozilla.firefox` package
- bundles both firefox binary and mobile config
- uses modified icon

### install firefox-systemconfig

```shell
flatpak install pocketblue org.mozilla.firefox.systemconfig
```

### install handyfox

```shell
flatpak install pocketblue io.github.pocketblue.handyfox
```

### what is mobile config?

- a config that makes firefox usable on phones, tablets are unaffected
- works only in portrait mode, landskape remains unchanged
- see https://gitlab.postmarketos.org/postmarketOS/mobile-config-firefox

### flatpak manifests

- https://github.com/pocketblue/handyfox
- https://github.com/pocketblue/firefox-systemconfig
