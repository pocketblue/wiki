# Xiaomi Pad 6

## Installation

### Prerequisites

Installation requires fastboot (`android-tools`)

Make sure the bootloader is unlocked,
download the latest Pocketblue release from [releases](https://github.com/pocketblue/pocketblue/releases/latest)
and extract the archive, then proceed to installation.

!!! warning
    Your current OS, all your files and your custom partitions will be deleted

### Automatic installation

Boot into fastboot, connect your device to your computer via usb, and run the installation script:

- on Linux: `flash-xiaomi-pipa.sh`
- on Windows: `flash-xiaomi-pipa.cmd`

Your device will reboot and boot into Pocketblue automatically.

**DO NOT** reboot via the power button: this can result in not all data being properly written to storage.

### Manual installation

#### List of provided images

The archive contains the following images:

- `kxboot.img` - kxboot, a kexec-based bootloader ([source](https://github.com/timoxa0/kxboot-pipa), GPLv3)
- `vbmeta-disabled.img` - vbmeta partition image disabling verified boot, generated using avbtool
- `fedora_boot.raw` - Fedora /boot partition, contains kernels, initrd images, bootloader configs, etc
- `fedora_esp.raw` - EFI System Partition, contains EFI executables
- `fedora_rootfs.raw` - root partition

#### Recommended partition layout

- `vbmeta` - `images/vbmeta-disabled.img`
- `boot` - kxboot (`images/kxboot.img`)
- `rawdump` - ESP (`images/fedora_esp.raw`)
- `cust` - /boot partition (`images/fedora_boot.raw`)
- `userdata` - root partition (`images/fedora_rootfs.raw`)

`rawdump` (partition for dumping crash data on qualcomm devices)
and `cust` (partition for region-specific configurations and preloads)
partition contents aren't required for the device to function correctly and thus
they can be used to store Fedora data.

#### Flashing

Boot into fastboot, connect your device to your computer via usb, and install the system:

Erase dtbo:
```shell
fastboot erase dtbo_ab
```

Disable verified boot:
```shell
fastboot flash vbmeta_ab images/vbmeta-disabled.img
```

Flash kxboot:
```shell
fastboot flash boot_ab images/kxboot.img
```

Flash Fedora partitions:
```shell
fastboot flash cust images/fedora_boot.raw
fastboot flash rawdump images/fedora_esp.raw
fastboot flash userdata images/fedora_rootfs.raw
```

Reboot, this may take a while.
**DO NOT** reboot via the power button: this can result in not all data being properly written to storage.
```shell
fastboot reboot
```

## Default credentials

- default username: `user`
- default password: `123456`

## Images, updates and packages

Learn how to upgrade the system and install packages in the following guide: [Installing packages](../tips-and-tricks/installing-packages.md)

You can rebase to a different image, for example to switch your desktop environment. To do this, run:

```shell
rpm-ostree reset
sudo bootc switch <IMAGE>
```

Available images:

- Gnome desktop - `quay.io/pocketblue/xiaomi-pipa-gnome-desktop:42`
- Gnome mobile - `quay.io/pocketblue/xiaomi-pipa-gnome-mobile:42`
- Plasma desktop - `quay.io/pocketblue/xiaomi-pipa-plasma-desktop:42`
- Plasma mobile - `quay.io/pocketblue/xiaomi-pipa-plasma-mobile:42`
- Phosh - `quay.io/pocketblue/xiaomi-pipa-phosh:42`

## Cracking sound

Sometimes sound may start cracking. It can be fixed by rebooting the device, or by using headphones.

## Uninstall Fedora and get stock ROM back

- download and unpack the `HyperOS 2.0.8.0.UMZMIXM` archive [from here](https://miuirom.org/tablets/xiaomi-pad-6)
- run `bash flash_all.sh`
- reboot and enjoy the stock ROM

## Enabled copr repositories

- `pocketblue/common` - [copr](https://copr.fedorainfracloud.org/coprs/pocketblue/common) / [github](https://github.com/pocketblue/common-rpms)
- `pocketblue/sm8250` - [copr](https://copr.fedorainfracloud.org/coprs/pocketblue/sm8250) / [github](https://github.com/pocketblue/sm8250-rpms)
- `@mobility/gnome-mobile` - [copr](https://copr.fedorainfracloud.org/coprs/g/mobility/gnome-mobile)
- [kernel source code](https://github.com/pipa-mainline/linux)
