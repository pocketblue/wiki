## using serial console to fetch logs from device running pocketblue

### prepare

this guide expects you to have two devices:

1. device with pocketblue and uboot installed, which we will fetch logs from
2. computer running any linux distro, which will receive the logs

install `picocom` in rootful toolbox on your computer:

```bash
sudo toolbox create
sudo toolbox run sudo dnf install picocom
```

### enabling serial console in uboot

reboot your phone and hold the volume down button just before uboot appears on the screen to open the boot menu. getting the timing right can be tricky, because pressing the button too early sends xiaomi devices into fastboot mode, while pressing it too late makes uboot skip the boot menu and boot pocketblue

in the boot menu, choose `2. Enable serial console gadget`

now connect your phone to your computer via usb and make sure your computer detects it

```bash
ls /dev/ttyACM0
```

you can then connect to the serial console:

```bash
sudo toolbox run picocom -q --imap lfcrlf -b 115200 /dev/ttyACM0
```

press the down arrow key to redraw the boot menu in your terminal

to disconnect, press `ctrl+a`, then `ctrl+x`

you can also disconnect by opening another terminal tab and stopping the container:

```bash
sudo podman stop --filter 'name=^fedora-toolbox-.*'
```

if you want automatic reconnection, you can use a while loop instead:

```bash
while true; do [ -e /dev/ttyACM0 ] && sudo toolbox run picocom -q --imap lfcrlf -b 115200 /dev/ttyACM0; sleep 1; done
```

to disconnect, press `ctrl+a`, then `ctrl+x` to exit picocom, and press `ctrl+c` to stop the loop

when linux starts booting, the usb serial connection will drop. this loop will reconnect automatically once linux creates its own serial gadget, so you can start receiving linux boot logs

the next step is to enable the serial console in linux and boot it

### vanilla pocketblue

boot into grub, select first boot entry, and press `e`. find the line beginning with `linux` or `linuxefi` and append this to the end of the line:

```shell
console=tty0 console=ttyGS0,115200 loglevel=7 ignore_loglevel systemd.show_status=1 systemd.log_target=console
```

then press `ctrl+x` to boot


### gmanka's builds without grub

in the uboot boot menu, choose `5. Drop to shell`

from your computer, paste this command into uboot

```shell
setenv bootargs ${bootargs} console=tty0 console=ttyGS0,115200 loglevel=7 ignore_loglevel systemd.show_status=1 systemd.log_target=console; run uenvcmd
```

you should start seeing linux logs in your terminal once linux reconnects

### ssh into your system to get more logs

linux creates its usb serial gadget relatively late during boot, so picocom misses early logs

to get earlier logs, ssh into your system and fetch them using `journalctl`

even if your system fails to reach login screen, you may still be able to ssh into it over usb networking

```bash
ssh user@172.16.42.1
```

once connected, explore logs:

```bash
sudo journalctl -b
```
