# OnePlus 6/6T

## Installation

### Prerequisites

Installation requires fastboot (`android-tools`)

Before installing Pocketblue, it is recommended to install the latest version of
the stock OS to ensure all firmware is present on the vendor partitions.

Make sure the bootloader is unlocked,
download the latest Pocketblue release from [releases](https://github.com/pocketblue/pocketblue/releases/latest)
and extract the archive, then proceed to installation.

!!! warning
    Your current OS and all your files will be deleted

### Automatic installation

Boot into fastboot, connect your phone to your computer via usb, and run the installation script

On Linux:

- `./flash-oneplus6-enchilada.sh` for OnePlus 6
- `./flash-oneplus6t-fajita.sh` for OnePlus 6T

On Windows:

- `./flash-oneplus6-enchilada.cmd` for OnePlus 6
- `./flash-oneplus6t-fajita.cmd` for OnePlus 6T

Your device will reboot and boot into Pocketblue automatically.

**DO NOT** reboot via the power button: this can result in not all data being properly written to storage.

### Manual installation

#### List of provided images

The archive contains the following images:

- `uboot-enchilada.img`, `uboot-fajita.img` - U-Boot, a bootloader implementing the UEFI API ([source](https://github.com/fedora-remix-mobility/u-boot), GPLv2)
- `fedora_boot.raw` - Fedora /boot partition, contains kernels, initrd images, bootloader configs, etc
- `fedora_esp.raw` - EFI System Partition, contains EFI executables and device trees
- `fedora_rootfs.raw` - root partition

#### Recommended partition layout

- `boot` - U-Boot (`images/uboot-<DEVICE>.img`)
- `system_a` - /boot partition (`images/fedora_boot.raw`)
- `system_b` - ESP (`images/fedora_esp.raw`)
- `userdata` - root partition (`images/fedora_rootfs.raw`)

#### Flashing

Boot into fastboot, connect your phone to your computer via usb, and install the system:

Erase dtbo:
```shell
fastboot erase dtbo_a
fastboot erase dtbo_b
```

Flash U-Boot (replace `<DEVICE>` with your device codename):
```shell
fastboot flash boot images/uboot_<DEVICE>.img --slot=all
```

Flash Fedora partitions:
```shell
fastboot flash system_a images/fedora_boot.raw
fastboot flash system_b images/fedora_esp.raw
fastboot flash userdata images/fedora_rootfs.raw
```

Reboot, this may take a while. **DO NOT** reboot via the power button: this can result in not all data being properly written to storage.
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

- Gnome mobile - `quay.io/pocketblue/oneplus-sdm845-gnome-mobile:43`
- Plasma mobile - `quay.io/pocketblue/oneplus-sdm845-plasma-mobile:43`
- Phosh - `quay.io/pocketblue/oneplus-sdm845-phosh:43`
- Gnome desktop - `quay.io/pocketblue/oneplus-sdm845-gnome-desktop:43`
- Plasma desktop - `quay.io/pocketblue/oneplus-sdm845-plasma-desktop:43`

## Fix incorrect battery percentage

Sometimes the battery percentage may be reported incorrectly, particularly if
you have a replacement battery. This may be fixed by modifying the device tree blob:

```bash
# uncomment to select the device model:
# export MODEL=enchilada # OnePlus 6
# export MODEL=fajita    # OnePlus 6T

# prepare the dtb file
cd
sudo cp /boot/efi/dtb/qcom/sdm845-oneplus-$MODEL.dtb tmp.dtb
sudo chown user:user tmp.dtb

# create and enter a container
toolbox create fedora
toolbox enter fedora
podman exec -it fedora bash

# modify the dtb
dnf install dtc
cd /home/user
dtc tmp.dtb -o tmp.dts
sed -i 's/bq27441/bq27541/' tmp.dts
sed -i 's/bq27411/bq27541/' tmp.dts
dtc tmp.dts -o tmp.dtb

# exit the container
exit

# install the modified dtb file
sudo cp tmp.dtb /boot/efi/dtb/qcom/sdm845-oneplus-$MODEL.dtb

reboot
```

## Unbricking using python3-edl

[github.com/pocketblue/oneplus6-unbrick](https://github.com/pocketblue/oneplus6-unbrick)

## Enabled copr repositories

- `pocketblue/common` - [copr](https://copr.fedorainfracloud.org/coprs/pocketblue/common) / [github](https://github.com/pocketblue/common-rpms)
- `pocketblue/sdm845` - [copr](https://copr.fedorainfracloud.org/coprs/pocketblue/sdm845) / [github](https://github.com/fedora-remix-mobility/packages)
- `@mobility/gnome-mobile` - [copr](https://copr.fedorainfracloud.org/coprs/g/mobility/gnome-mobile)
- [kernel source code](https://github.com/fedora-remix-mobility/sdm845-kernel)
