# Xiaomi Pad 5

## Installation

### Prerequisites

Installation requires fastboot (`android-tools`)

Make sure the bootloader is unlocked,
download the latest Pocketblue release from [releases](https://github.com/pocketblue/pocketblue/releases/latest)
and extract the archive, then proceed to installation.

!!! warning
    Your current OS, all your files and your custom partitions will be deleted

### Variants

Some nabu variants can't boot the main Pocketblue images.
Usually this happens due to UFS-related problems.

Try the main image first, (`pocketblue-xiaomi-nabu-*-44`).
If it doesn't boot or you experience UFS-related issues, try
one of the `pocketblue-xiaomi-nabu-*-44-rodriguezst` images,
which ship an outdated patched kernel.

### Automatic installation

Boot into fastboot, connect your device to your computer via usb, and run the installation script:

- on Linux: `flash.sh`
- on Windows: `flash.cmd`

After installation is finished, your device will reboot and boot into Pocketblue automatically.

It will take the device several minutes to reboot into the system.
**DO NOT** reboot via the power button: this can result in not all data being properly written to storage.

### Manual installation

#### List of provided images and files

All archives contain the following images:

- `vbmeta-disabled.img` - vbmeta partition image disabling verified boot, generated using avbtool
- `fedora_boot.raw` - Fedora /boot partition, contains kernels, initrd images, bootloader configs, etc
- `fedora_esp.raw` - EFI System Partition, contains EFI executables
- `fedora_rootfs.raw` - root partition

The main images also ship:

- `uboot.img` - U-Boot, a bootloader implementing the UEFI API ([source](https://gitlab.com/sm8150-mainline/u-boot), GPLv2)

Rodriguezst images also ship:

- `aloha.img` - Aloha, UEFI implementation ([source](https://github.com/Project-Aloha/mu_aloha_platforms), BSD-2-Clause)

#### Recommended partition layout

The images can be flashed into existing partitions:

- `vbmeta` - `images/vbmeta-disabled.img`
- `boot` - U-Boot (`images/uboot.img`) / Aloha (`images/aloha.img`)
- `rawdump` - ESP (`images/fedora_esp.raw`)
- `cust` - /boot partition (`images/fedora_boot.raw`)
- `userdata` - root partition (`images/fedora_rootfs.raw`)

!!! info "`rawdump` and `cust` partitions"

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

Flash UEFI:
```shell
fastboot flash boot_ab images/uboot.img

# or

fastboot flash boot_ab images/aloha.img
```

Flash Fedora partitions:
```shell
fastboot flash </boot partition> images/fedora_boot.raw
fastboot flash <ESP partition>   images/fedora_esp.raw
fastboot flash <root partition>  images/fedora_rootfs.raw
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

- Gnome desktop - `quay.io/pocketblue/xiaomi-nabu-gnome-desktop:44`
- Gnome mobile - `quay.io/pocketblue/xiaomi-nabu-gnome-mobile:44`
- Plasma desktop - `quay.io/pocketblue/xiaomi-nabu-plasma-desktop:44`
- Plasma mobile - `quay.io/pocketblue/xiaomi-nabu-plasma-mobile:44`
- Phosh - `quay.io/pocketblue/xiaomi-nabu-phosh:44`

## Known issues

### Cracking sound

Sometimes sound may start cracking. It can be fixed by rebooting the device, or by using headphones.

### Pen charging on rodriguezst images

Rodriguezst images currently don't ship a driver for pen charging.

## Uninstall Fedora and get stock ROM back

- download and unpack the `MIUI 14.0.8.0.TKXMIXM` archive [from here](https://miuirom.org/tablets/xiaomi-pad-5)
- [opnional] restore the original partition table: `fastboot flash partition:0 images/gpt_both0.bin`
- run `bash flash_all.sh`
- reboot and enjoy the stock ROM

## Enabled copr repositories

- `pocketblue/common` - [copr](https://copr.fedorainfracloud.org/coprs/pocketblue/common) / [github](https://github.com/pocketblue/packages)
- `pocketblue/sm8150` - [copr](https://copr.fedorainfracloud.org/coprs/pocketblue/sm8150) / [github](https://github.com/pocketblue/packages)
- `pocketblue/sm8150-samsung-ufs` (rodriguezst images only) - [copr](https://copr.fedorainfracloud.org/coprs/pocketblue/sm8150-samsung-ufs) / [github](https://github.com/pocketblue/packages)
- `@mobility/gnome-mobile` - [copr](https://copr.fedorainfracloud.org/coprs/g/mobility/gnome-mobile)
- [kernel source code](https://gitlab.com/sm8150-mainline/linux)
