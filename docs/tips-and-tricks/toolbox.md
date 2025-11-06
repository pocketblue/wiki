# Toolbox

Toolbox is a tool, which allows the interactive use of containers with any Linux distro.
It can be used to install and run any software in a container, without having to install it on the host.
Toolbox is preinstalled in all Pocketblue images.

Distrobox is an alternative to Toolbox. It can be installed with `rpm-ostee install distrobox`

!!! warning "Broken on OnePlus 6/6T"
    Currently toolbox is broken on OnePlus 6/6T due to a bug.
    See [containers/podman#25751](https://github.com/containers/podman/issues/25751)
    and [coreos/fedora-coreos-tracker#1908](https://github.com/coreos/fedora-coreos-tracker/issues/1908)
    for more information.

## Using different distros

### Fedora

```shell
toolbox create --distro=fedora
```

### RHEL

```shell
toolbox create --distro=rhel --release=10.0
```

### Ubuntu

```shell
toolbox create --distro=ubuntu --release=24.04
```

### Debian

```shell
toolbox create --image quay.io/toolbx-images/debian-toolbox
```

### Alpine

```shell
toolbox create --image quay.io/toolbx-images/alpine-toolbox
```

### postmarketOS (unofficial)

Source: [github.com/gmanka-containers/pmos-toolbox](https://github.com/gmanka-containers/pmos-toolbox)

```shell
toolbox create --image quay.io/gmanka/pmos-toolbox
```

### Arch Linux ARM (unofficial)

Source: [github.com/gmanka-containers/arch-arm-toolbox](https://github.com/gmanka-containers/arch-arm-toolbox)

```shell
toolbox create --image quay.io/gmanka/arch-arm-toolbox
```
