# Qualcomm SDM845

The generic SDM845 image supports the following devices:

- OnePlus 6/6T (oneplus-enchilada / oneplus-fajita) - [wiki](oneplus-sdm845.md)
- Xiaomi Poco F1 (xiaomi-beryllium) - [wiki](xiaomi-beryllium.md)

See the wiki pages for each device for device-specific information.

## Installation

### Prerequisites

Installation requires fastboot (`android-tools`)

Since firmware is extracted from the vendor partitions, it is recommended to
install the latest version of the stock OS before installing Pocketblue to
ensure all firmware is present.

Make sure the bootloader is unlocked,
download the latest Pocketblue release from [releases](https://github.com/pocketblue/pocketblue/releases/latest)
and extract the archive, then proceed to installation.

!!! warning
    Your current OS and all your files will be deleted

### Automatic installation

Boot into fastboot, connect your phone to your computer via usb, and run the installation script:

```shell
./flash.sh
```

You will be prompted to select the device model and the installation will begin.
After installation, your device will reboot and boot into Pocketblue automatically.

**DO NOT** reboot via the power button: this can result in not all data being properly written to storage.

### Manual installation

#### List of provided images

The archive contains the following images:

- `u-boot-*.img` - U-Boot, a bootloader implementing the UEFI API
- `fedora_boot.raw` - Fedora /boot partition, contains kernels, initrd images, bootloader configs, etc
- `fedora_esp.raw` - EFI System Partition, contains EFI executables and device trees
- `fedora_rootfs.raw` - root partition

#### Recommended partition layout

You can find the recommended partition layout on the wiki page of your device:

- [OnePlus 6/6T](oneplus-sdm845.md#recommended-partition-layout)
- [Xiaomi Poco F1](xiaomi-beryllium.md#recommended-partition-layout)

#### Flashing

Boot into fastboot, connect your phone to your computer via usb, and install the system:

Erase dtbo:
```shell
# if the device has slots (e.g. OnePlus 6/6T):
fastboot erase dtbo_a
fastboot erase dtbo_b

# if the device doesn't have slots (e.g. Poco F1):
fastboot erase dtbo
```

Flash U-Boot (replace `<DEVICE>` with your device codename):
```shell
# if the device has slots:
fastboot flash boot images/u-boot-<DEVICE>.img --slot=all

# if the device doesn't have slots:
fastboot flash boot images/u-boot-<DEVICE>.img
```

Flash Fedora partitions:
```shell
fastboot flash </boot partition> images/fedora_boot.raw
fastboot flash <ESP partition>   images/fedora_esp.raw
fastboot flash <root partition>  images/fedora_rootfs.raw
```

Reboot, this may take a while. **DO NOT** reboot via the power button: this can result in not all data being properly written to storage:
```shell
fastboot reboot
```

## After installation

The device will automatically reboot after the first boot - this is `droid-juicer` extracting firmware from the vendor partitions.

Default credentials:

- username: `user`
- password: `123456`

After connecting to the internet, **upgrade the system and reboot** to make sure you're running the latest image:

```shell
sudo rpm-ostree upgrade
reboot
```

Default applications will be installed after connecting to the internet.

## Images, updates and packages

Learn how to upgrade the system and install packages in the following guide: [Installing packages](../tips-and-tricks/installing-packages.md)

You can rebase to a different image, for example to switch your desktop environment. To do this, run:

```shell
sudo rpm-ostree rebase ostree-unverified-registry:<IMAGE>
```

Available images:

- Phosh - `quay.io/pocketblue/qualcomm-sdm845-phosh:43`
- Gnome mobile - `quay.io/pocketblue/qualcomm-sdm845-gnome-mobile:43`
- Plasma mobile - `quay.io/pocketblue/qualcomm-sdm845-plasma-mobile:43`
- Gnome desktop - `quay.io/pocketblue/qualcomm-sdm845-gnome-desktop:43`
- Plasma desktop - `quay.io/pocketblue/qualcomm-sdm845-plasma-desktop:43`

## Enabled copr repositories

- `pocketblue/common` - [copr](https://copr.fedorainfracloud.org/coprs/pocketblue/common) / [github](https://github.com/pocketblue/packages)
- `pocketblue/sdm845` - [copr](https://copr.fedorainfracloud.org/coprs/pocketblue/sdm845) / [github](https://github.com/fedora-remix-mobility/packages)
- `@mobility/gnome-mobile` - [copr](https://copr.fedorainfracloud.org/coprs/g/mobility/gnome-mobile)
- `samcday/droid-juicer` - [copr](https://copr.fedorainfracloud.org/coprs/samcday/droid-juicer)
- [kernel source code](https://github.com/pocketblue/linux)
