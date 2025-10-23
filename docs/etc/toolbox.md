---
prev: false
---
### What is toolbox

- Toolbox is a tool that creates container with any linux distro
- In toolbox containers you can install any packages from any linux distro
- If you want to use `dnf` on fedora atomic, it's strongly recommended to use toolbox
- Preinstalled on all fedora atomic images

### What is distrobox

- Distrobox is a nice alternative for toolbox
- Can be installed with `rpm-ostee install distrobox`

> [!NOTE]
> For Oneplus 6 and 6T Pocketeblue currently provides 6.15 linux kernel which have a bug that makes toolbox and distrobox broken, so if you use oneplus6 please wait for us to update kernel

### Fedora

```shell
toolbox create --distro=fedora
```

### RHEL 10.0

```shell
toolbox create --distro=rhel --release=10.0
```

### Ubuntu 24.04

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

### Postmarket OS

```shell
toolbox create --image quay.io/gmanka/pmos-toolbox
```

### Arch Linux ARM

```shell
toolbox create --image quay.io/gmanka/arch-arm-toolbox
```

### Additional info

- Arch linux only had x86 images and didn't had arm toolbox images, so we built our own - https://github.com/gmanka-containers/arch-arm-toolbox
- Postmarket OS didn't had any toolbox images at all, so we built our own - https://github.com/gmanka-containers/pmos-toolbox

