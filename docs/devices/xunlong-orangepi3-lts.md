# Orange Pi 3 LTS

## Installation

### Prerequisites

Installation requires:

- a Linux or Windows host
- a microSD card or eMMC target disk
- a card reader or USB adapter

Download the latest Pocketblue release from [releases](https://github.com/pocketblue/pocketblue/releases/latest)
and extract the archive, then proceed to installation.

!!! warning
    All data on the target disk will be deleted

### Manual installation

#### List of provided images

The archive contains the following image:

- `disk.raw` - full disk image for Orange Pi 3 LTS (ESP + /boot + root, with U-Boot embedded at the required offset)

#### Flashing

Connect the target disk (microSD or eMMC) to your computer and install the system:

Extract the image archive:
```shell
7z x pocketblue-xunlong-orangepi3-lts-<DESKTOP>-<TAG>.7z
```

##### Method 1: `dd` (Linux)

Find the target device:
```shell
lsblk -p
```

Write `disk.raw`:
```shell
sudo dd if=disk.raw of=/dev/<TARGET_DISK> bs=8M status=progress conv=fsync
sync
```

##### Method 2: balenaEtcher (Linux/Windows)

- Download: [etcher.balena.io](https://etcher.balena.io/)
- Start balenaEtcher.
- Select `disk.raw`.
- Select your target microSD/eMMC disk.
- Click `Flash`.

##### Method 3: Rufus (Windows)

- Download: [rufus.ie](https://rufus.ie/)
- Start Rufus.
- Select your microSD/eMMC disk in `Device`.
- Click `SELECT` and choose `disk.raw`.
- Keep default options and click `START`.
- If Rufus asks for image mode, choose `DD Image mode`.

Insert the flashed media into the Orange Pi 3 LTS and boot the device.

On first boot, the root partition is automatically expanded and the system reboots once.
Do not power off the device during this process.

## Default credentials

- default username: `user`
- default password: `123456`

## Images, updates and packages

Learn how to upgrade the system and install packages in the following guide: [Installing packages](../tips-and-tricks/installing-packages.md)

You can rebase to a different image, for example to switch your desktop environment. To do this, run:

```shell
sudo bootc switch --enforce-container-sigpolicy <IMAGE>

# or

sudo rpm-ostree rebase ostree-image-signed:docker://<IMAGE>
```

Available images:

- TTY - `quay.io/pocketblue/xunlong-orangepi3-lts-tty:44`
- Gnome desktop - `quay.io/pocketblue/xunlong-orangepi3-lts-gnome-desktop:44`
- Gnome mobile - `quay.io/pocketblue/xunlong-orangepi3-lts-gnome-mobile:44`
- Plasma desktop - `quay.io/pocketblue/xunlong-orangepi3-lts-plasma-desktop:44`
- Plasma mobile - `quay.io/pocketblue/xunlong-orangepi3-lts-plasma-mobile:44`
- Phosh - `quay.io/pocketblue/xunlong-orangepi3-lts-phosh:44`

## Notes

- UART console is enabled by default on `ttyS0` at `115200` baud.

## Enabled copr repositories

- `pocketblue/common` - [copr](https://copr.fedorainfracloud.org/coprs/pocketblue/common) / [github](https://github.com/pocketblue/packages/tree/main/common)
- `pocketblue/sunxi64` - [copr](https://copr.fedorainfracloud.org/coprs/pocketblue/sunxi64) / [github](https://github.com/pocketblue/packages/tree/main/sunxi64)
- `@mobility/gnome-mobile` - [copr](https://copr.fedorainfracloud.org/coprs/g/mobility/gnome-mobile)
- [kernel packaging source code](https://github.com/pocketblue/packages/tree/main/sunxi64/kernel)
