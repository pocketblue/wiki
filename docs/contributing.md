# Contributing

Thanks for taking the time to help our project out! Here you will find information
that will help you contribute to Pocketblue

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Repository layout](#repository-layout)
    - [device.conf](#deviceconf)
- [Building OCI images](#building-oci-images)
    - [Building locally](#building-locally)
    - [Building with Github Actions](#building-with-github-actions)
- [Porting to a new device](#porting-to-a-new-device)
    - [Adding support to the image](#adding-support-to-the-image)
    - [Building disk images](#building-disk-images)
    - [Flashing](#flashing)

## Introduction

Pocketblue is an atomic system that relies on OCI, OSTree and Bootc technologies.
System images are based on upstream atomic Fedora images (Silverblue/Kinoite) and
are built and distributed as OCI containers.

## Repository layout

- `Justfile` - build recipes
- `Containerfile` - container definition
- `common/` - common scripts and files for all images
- `devices/<device-name>/` - device-specific scripts and files
    - `.../build-aux/` - auxiliary device-specific data and scripts
    - `.../build-aux/device.conf` - various device configuration options (see below)
- `desktops/<desktop-name>/` - desktop-environment-specific scripts and files
- `bootc-image-builder.toml` - bootc-image-builder config

### device.conf

Available options:

- `esp_size` - ESP partition image size
- `boot_size` - boot partition image size
- `install_dtb` - boolean, whether to install device trees to ESP
- `split_partitions` - boolean, whether to split `disk.raw` image to separate `fedora_rootfs.raw`, `fedora_boot.raw`, and `fedora_esp.raw` partition images


## Building OCI images

### Building locally

You can build container images locally using Just and Buildah.
The best practice is to build images directly on your target device if it already runs Linux.
Cross-arch container builds via qemu are supported but will take much longer.

Build tools are preinstalled on Pocketblue. To install them on a different system:

```shell
sudo dnf install just buildah podman
```

A typical example of a local build process:

```shell
# build the image:
just device=oneplus-sdm845 desktop=phosh tag=43-test

# rechunk the image:
just device=oneplus-sdm845 desktop=phosh tag=43-test rechunk
```

This will result in a rechunked image tagged `localhost/oneplus-sdm845-phosh:43-test`
and an original image tagged `localhost/oneplus-sdm845-phosh:43-test-build`. To rebase to the new image:

```shell
just device=oneplus-sdm845 desktop=phosh tag=43-test rebase

# alternatively, use a full ref:
just rebase localhost/oneplus-sdm845-phosh:43-test

# if you have already rebased to this image before:
sudo rpm-ostree upgrade
```

Supported `just` parameters (all parameters are optional):

| Option | Description | Default |
|--------|-------------|---------|
| branch | Base Fedora release branch | 43 |
| tag | Tag of the resulting Pocketblue image | Same as `branch` |
| rechunk_suffix | A suffix appended to the original image tag before rechunking | \-build |
| device | Device name (see `devices/`) | oneplus-sdm845 |
| desktop | Desktop environment (see `desktops/`) | phosh |
| base | Base image | Inferred from the `desktop` option |
| base_bootc | fedora-bootc image, used for rechunking | `quay.io/fedora/fedora-bootc:` + `branch` |
| registry | Container registry | localhost |
| expires_after | Tag expiration time, e.g. 1w |  |
| arch | Architecture | arm64 |

### Building with Github Actions

Setup the repository:

1. Fork the repository
2. Create a classic Github personal access token: https://github.com/settings/tokens/new?scopes=write:packages
3. Go to the settings of your fork repo and open the `Secrets and variables -> Actions` section
4. Add a repository secret with the name `REGISTRY_TOKEN` and value of your access token
5. Add two repository variables:
    1. name: `REGISTRY`, value: `ghcr.io/<github username>`
    2. name: `REGISTRY_USERNAME`, value: your github username

You can now use Github Actions to build container images and disk images!

## Porting to a new device

### Adding support to the image

To add a new device, create a new subdirectory in `devices/` with a device alias,
following the `<vendor>-<codename>` naming scheme.

The directory should contain:

- An executable script named `build` that will perform all necessary modifications to the image (e.g. install the kernel and firmware, copy over the files, etc)
- `build-aux/device.conf` file containing the size of the EFI system partition
- `build-aux/artifacts.sh` script to collect build artifacts of your device for further distribution
- `files/` directory with any additional files, e.g. `.repo` files for your copr repositories

If your device requires a custom kernel or firmware, you should publish them to
[Fedora COPR](https://copr.fedorainfracloud.org/) as RPM packages.
See [sm8150-rpms](https://github.com/pocketblue/sm8150-rpms) and [sm8250-rpms](https://github.com/pocketblue/sm8250-rpms)
for the example RPM specs.

Finally, add your device to the lists in the `.github/workflows/containers.yml` and `.github/workflows/images.yml` workflows.

### Building disk images

Use Github Actions to build the images:

1. Run the `containers` workflow to build the OCI images
2. Run the `images` workflow to build the flashable disk images

### Flashing

Finally, flash the system to your device:

- Find the suitable partitions to flash the root partition, the /boot partition and the ESP
- Flash U-Boot (or any alternative that can boot EFI executables on your device) to the android boot partition
- Flash boot.raw, esp.raw and root.raw using fastboot or U-Boot's mass storage mode
- Reboot and test Pocketblue!

!!! caution
    Before flashing, make sure the chosen partitions can be safely flashed without bricking the device
