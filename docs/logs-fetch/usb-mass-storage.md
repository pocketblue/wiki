# Fetch logs via usb mass storage

This is the next simplest way after ssh,
useful when your device can't start ssh daemon and usb networking,
but successfully mounts storage and writes logs to it

## Get into uboot bootmenu

Reboot your phone and hold the volume down button
just before u-boot appears on the screen to open the boot menu.
Getting the timing right can be tricky,
because pressing the button too early sends xiaomi devices into fastboot mode,
while pressing it too late makes uboot skip the boot menu and boot pocketblue

## Fetch logs

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
