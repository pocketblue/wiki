# Fetching logs

### requirements

this guide expects you to have two devices:

1. device with pocketblue and uboot installed, which we will fetch logs from
2. computer running any linux distro, which will receive the logs

before starting, connect pocketblue device to your computer via usb cable

### via ssh

this is the simplest way, but it would not work if your system crashed before initializing ssh daemon and usb networking

ssh to pocketblue device over usb network

```bash
ssh user@172.16.42.1
```

once connected, explore logs

```bash
sudo journalctl -b
```

if you want to share your log, you can upload it to paste.centos.org via `fpaste` tool which is preinstalled on pocketblue

```bash
sudo journalctl -b | fpaste
```

### via usb mass storage

this is the best thing you can do if you can't ssh to your system

in the uboot boot menu, choose `3. Enable USB mass storage`

phone's storage should appear as a block device on your computer

```bash
lsblk -o NAME,PARTLABEL,FSTYPE,SIZE
```

mount the rootfs partition

```bash
sudo mount -o ro,rescue=nologreplay,subvol=/root /dev/disk/by-partlabel/userdata /mnt
```

explore latest log

```bash
sudo journalctl --directory=/mnt/ostree/deploy/default/var/log/journal -b 0
```

if you want to share your log, upload it to paste.centos.org via `fpaste`

### via serial console

linux creates its usb serial gadget relatively late during boot, so this method misses early linux logs

install `picocom` in rootful toolbox on your computer

```bash
sudo toolbox create
sudo toolbox run sudo dnf install picocom
```

reboot your phone and hold the volume down button just before uboot appears on the screen to open the boot menu. getting the timing right can be tricky, because pressing the button too early sends xiaomi devices into fastboot mode, while pressing it too late makes uboot skip the boot menu and boot pocketblue

in the boot menu, choose `2. Enable serial console gadget`

make sure your computer detects it

```bash
ls /dev/ttyACM0
```

you can then connect to the serial console

```bash
sudo picocom -q --imap lfcrlf -b 115200 /dev/ttyACM0
```

press the down arrow key to redraw the boot menu in your terminal

to disconnect, press `ctrl+a`, then `ctrl+x`

you can also disconnect by opening another terminal tab and stopping the container

```bash
sudo podman stop --filter 'name=^fedora-toolbox-.*'
```

if you want automatic reconnection, you can use a while loop instead

```bash
while true; do [ -e /dev/ttyACM0 ] && sudo toolbox run picocom -q --imap lfcrlf -b 115200 /dev/ttyACM0; sleep 1; done
```

to disconnect, press `ctrl+a`, then `ctrl+x` to exit picocom, and press `ctrl+c` to stop the loop

when linux starts booting, the usb serial connection will drop. this loop will reconnect automatically once linux creates its own serial gadget, so you can start receiving linux boot logs

the next step is to enable the serial console in linux and boot it

#### vanilla pocketblue

boot into grub, select first boot entry, and press `e`. find the line beginning with `linux` and append this to the end of the line

```shell
console=tty0 console=ttyGS0,115200 loglevel=7 ignore_loglevel systemd.show_status=1 systemd.log_target=console
```

then press `ctrl+x` to boot

#### gmanka's builds without grub

in the uboot boot menu, choose `5. Drop to shell`

from your computer, paste this command into uboot

```shell
setenv bootargs ${bootargs} console=tty0 console=ttyGS0,115200 loglevel=7 ignore_loglevel systemd.show_status=1 systemd.log_target=console; run uenvcmd
```

you should start seeing linux logs in your terminal once linux reconnects
