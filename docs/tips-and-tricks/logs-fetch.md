# Fetching logs

## Requirements

This guide expects you to have two devices:

1. Device with pocketblue and uboot installed, which we will fetch logs from
2. Computer running any linux distro, which will receive the logs

Before starting, connect pocketblue device to your computer via USB cable

## Via ssh

This is the simplest way, but it would not work if your system crashed before initializing ssh daemon and usb networking

Ssh to pocketblue device over usb network

```bash
ssh user@172.16.42.1
```

Once connected, explore logs

```bash
sudo journalctl -b
```

If you want to share your log, you can upload it to paste.centos.org via `fpaste` tool which is preinstalled on pocketblue

```bash
sudo journalctl -b | fpaste
```

## Via usb mass storage

This is the best thing you can do if you can't ssh to your system

In the uboot boot menu, choose `3. Enable USB mass storage`

Phone's storage should appear as a block device on your computer

```bash
lsblk -o NAME,PARTLABEL,FSTYPE,SIZE
```

Mount the rootfs partition

```bash
sudo mount -o ro,rescue=nologreplay,subvol=/root /dev/disk/by-partlabel/userdata /mnt
```

Explore latest log

```bash
sudo journalctl --directory=/mnt/ostree/deploy/default/var/log/journal -b 0
```

If you want to share your log, upload it to paste.centos.org via `fpaste`

## Via serial console

Linux creates its USB serial gadget relatively late during boot, so this method misses early linux logs

Install `picocom` on your computer, e.g. on Fedora:

```bash
sudo dnf install picocom
```

Reboot your phone and hold the volume down button just before u-boot appears on the screen to open the boot menu. Getting the timing right can be tricky, because pressing the button too early sends xiaomi devices into fastboot mode, while pressing it too late makes uboot skip the boot menu and boot pocketblue

In the boot menu, choose `2. Enable serial console gadget`

Make sure your computer detects it

```bash
ls /dev/ttyACM0
```

You can then connect to the serial console

```bash
sudo picocom -q --imap lfcrlf -b 115200 /dev/ttyACM0
```

Press the down arrow key to redraw the boot menu in your terminal

To disconnect, press `ctrl+a`, then `ctrl+x`

The next step is to enable the serial console in Linux and boot it

Boot into grub, select first boot entry, and press `e`. Find the line beginning with `linux` and append this to the end of the line

```shell
console=tty0 console=ttyGS0,115200 loglevel=7 ignore_loglevel systemd.show_status=1 systemd.log_target=console
```

Then press `ctrl+x` to boot
