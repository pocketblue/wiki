# Via serial console

This guide explains how to fetch early boot logs.
Useful when your device crashes before it can write logs to storage.
Logs are fetched through your device's USB port

This guide covers two scenarios

First scenario is when your device boots to stable pocketblue deployment,
while you are debugging unstable one. This approach is relatively easy

Second scenario applies when your device can't boot at all.
This requires applying patches to pocketblue repo.
After applying patches, you will have to
[build container image](../contributing.md#building-oci-images),
[build disk image](../contributing.md#building-disk-images),
and flash image to your device via fastboot

## Required kernel config

This requires `CONFIG_USB_G_SERIAL` config set to `-y`

Upstream fedora ships kernel without `CONFIG_USB_G_SERIAL` config,
and pocketblue does same thing to stay closer to upstream

To get this config enabled, you have to rebuild your kernel

## Building kernel

Start with [arkifying your kernel](../tips-and-tricks/kernel-build.md#run-arkify-in-kernel-repo)

Add these configs

```bash
echo CONFIG_USB_G_SERIAL=y | tee redhat/configs/fedora/generic/arm/aarch64/CONFIG_USB_G_SERIAL
echo CONFIG_USB_U_SERIAL=y | tee redhat/configs/fedora/generic/arm/aarch64/CONFIG_USB_U_SERIAL
echo CONFIG_USB_GADGET=y   | tee redhat/configs/fedora/generic/arm/aarch64/CONFIG_USB_GADGET
```

Then [build the kernel](../tips-and-tricks/kernel-build.md#build-kernel-locally)

## Installing kernel

If device boots, follow [installing kernel](../tips-and-tricks/kernel-build.md#installing-kernel) guide to install kernel via rpm-ostree

If device does not boot, edit `devices/<device>/build` script in pocketblue repo to install your kernel

```bash
dnf copr enable <author>/<repo>
dnf -y install --from=repo=copr:copr.fedorainfracloud.org:<author>:<repo> kernel kernel-modules-extra
```

## Install picocom on your computer

Use picocom to connect to pocketblue devices via serial console

Example for Fedora:

```bash
sudo dnf install picocom
```

This package can be installed in rootful [toolbox](https://docs.stg.fedoraproject.org/en-US/atomic-desktops/toolbox) container

## Get into U-Boot bootmenu

Reboot your phone and hold the volume down button
just before U-Boot appears on the screen to open the boot menu.
Getting the timing right can be tricky,
because pressing the button too early sends xiaomi devices into fastboot mode,
while pressing it too late makes U-Boot skip the boot menu and boot pocketblue

## Enabling U-Boot serial console

In the U-Boot boot menu, choose `2. Enable serial console gadget`

## Connecting to serial console via picocom

Make sure your computer detects it

```bash
ls /dev/ttyACM0
```

You can then connect to the serial console

```bash
sudo picocom -q --imap lfcrlf -b 115200 /dev/ttyACM0
```

## Editing kernel arguments

If your device boots, use this command

 ```bash
rpm-ostree kargs --editor
 ```

If your device does not boot, use U-Boot's serial console to control grub from your computer's keyboard. Boot into grub, select first boot entry, and press `e`. Find the line beginning with `linux` and append kernel arguments to the end of the line

Then press `ctrl+x` to boot. When linux starts booting, U-Boot's usb serial connection will drop, and you'll need to reconnect to linux's serial connection

## Enable serial console after initramfs handoff

This does not help catch bugs that occur in initramfs

Add this kernel argument

```txt
systemd.debug_shell=ttyGS0
```

Reboot and [connect via picocom](#connecting-to-serial-console-via-picocom)

## Enable serial console in initramfs

This requires config

```ini
[Unit]
BindsTo=dev-ttyGS0.device
After=dev-ttyGS0.device
```

If device boots, create config on your device at
`/etc/systemd/system/debug-shell.service.d/90-debug-shell-service.conf`

If device does not boot, create config in pocketblue repo at
`common/files/etc/systemd/system/debug-shell.service.d/90-debug-shell-service.conf`

Then rebuild initramfs

If device boots

```bash
rpm-ostree initramfs-etc --track=/etc/systemd/system/debug-shell.service.d/90-debug-shell-service.conf
```

If device does not boot, you need this dracut config

```txt
install_items+=" /etc/systemd/system/debug-shell.service.d/90-debug-shell-service.conf "
```

Put it in pocketblue repo at
`common/files/etc/dracut.conf.d/90-debug-shell-dracut.conf`, then rebuild and reflash pocketblue image

Then add kernel arguments:

```txt
rd.systemd.debug_shell=ttyGS0
systemd.debug_shell=ttyGS0
```

## Related docs

- <https://docs.kernel.org/usb/gadget_serial.html>
- <https://docs.kernel.org/usb/gadget_configfs.html>
