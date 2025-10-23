---
prev:
    text: 'Supported devices'
    link: '/devices'
next: false
---
### Install on Oneplus 6/6T

- **Your current os and all your files will be deleted**
- Installation process is the same for oneplus6 and oneplus6t, both devices are supported and tested
- Before flashing pocketblue it is recommended to flash the stock rom and check every functionality
- You should have `fastboot` installed on your computer
- Download image from [releases](https://github.com/pocketblue/pocketblue/releases/latest)
- Unarchive it
- Boot into fastboot and connect your phone to your computer via usb
- Make sure bootloader is unlocked
- If your computer runs linux, and your device is oneplus 6, run `flash-oneplus6-enchilada.sh` script
- If your computer runs windows, and your device is oneplus 6, run `flash-oneplus6-enchilada.cmd` script
- If your computer runs linux, and your device is oneplus 6t, run `flash-oneplus6t-fajita.sh` script
- If your computer runs windows, and your device is oneplus 6t, run `flash-oneplus6t-fajita.cmd` script
- Alternatively, a [manual installation](#manual-installation) is available
- Reboot and enjoy fedora

### Usage

- Default username: `user`
- Default password: `123456`
- [How to upgrade system and install packages](etc/installing-packages.md)

### Manual installation

- Recommended way to install pocketblue is using an installation script, but manual installation is also an option
- Erase dtbo, this required for system to boot
  - `fastboot erase dtbo_a`
  - `fastboot erase dtbo_b`
- Flash uboot, the uefi implementation needed to load grub
  - `fastboot flash boot images/uboot-enchilada.img --slot=all` - for oneplus 6
  - `fastboot flash boot images/uboot-fajita.img --slot=all` - for oneplus 6t
- Flash `fedora_boot.raw` to `system_a` partition
  - `fastboot flash system_a images/fedora_boot.raw`
  - `fedora_boot.raw` - partition image with kernels, deploymets, bls
  - `system_a` - android system partition
- Flash `fedora_esp.raw` to `system_b` partition
  - `fastboot flash system_b images/fedora_esp.raw`
  - `fedora_esp.raw` - esp partition image
  - `system_b` - android system partition
- Flash `fedora_rootfs.raw` to `userdata` partition, this will wipe your android data
  - `fastboot flash  userdata images/fedora_rootfs.raw`
  - `fedora_rootfs.raw` - fedora root partition image
  - `userdata` - partition used by android to store your data

### Rebasing to other desktops

- Rebasing is a best way to try a new desktop
- Before rebasing you should run `rpm-ostree reset`
- `sudo bootc switch quay.io/pocketblue/oneplus-sdm845-gnome-mobile:42` - recommended image for oneplus 6/6t
- `sudo bootc switch quay.io/pocketblue/oneplus-sdm845-gnome-desktop:42`
- `sudo bootc switch quay.io/pocketblue/oneplus-sdm845-plasma-mobile:42`
- `sudo bootc switch quay.io/pocketblue/oneplus-sdm845-plasma-desktop:42`
- `sudo bootc switch quay.io/pocketblue/oneplus-sdm845-phosh:42`

### Known bugs

- Toolobx and distrobox don't work due to a bug in linux 6.15
- Feel free to open issue and report any other bugs you find

### Incorrect battery percentage

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

### Unbricking using python3-edl

- [Oneplus 6](https://github.com/pocketblue/oneplus6-unbrick)
- Oneplus 6T: TODO

### Files used by the installation script, license info, source links

- `root.raw` - root partition for fedora, built by `.github/workflows/images.yml`
- `boot.raw` - /boot partition, built by `.github/workflows/images.yml`
- `efi.raw` - /boot/efi partition, built by `.github/workflows/images.yml`
- `uboot-enchilada.img` - oneplus 6 u-boot image, gpl2 license, [source](https://github.com/fedora-remix-mobility/u-boot)
- `uboot-fajita.img` - oneplus 6t u-boot image, gpl2 license, [source](https://github.com/fedora-remix-mobility/u-boot)

### Enabled copr repositories

- `pocketblue/common` - [copr](https://copr.fedorainfracloud.org/coprs/pocketblue/common) / [github](https://github.com/pocketblue/common-rpms)
- `pocketblue/sdm845` - [copr](https://copr.fedorainfracloud.org/coprs/pocketblue/sdm845) / [github](https://github.com/fedora-remix-mobility/packages)
- `@mobility/gnome-mobile` - [copr](https://copr.fedorainfracloud.org/coprs/g/mobility/gnome-mobile)
- [kernel source code](https://github.com/fedora-remix-mobility/sdm845-kernel)
