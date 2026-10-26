# Fetch logs via ssh

This is the simplest way, but it would not work if your system crashed before initializing ssh daemon and usb networking

Connect pocketblue device to your computer via USB cable

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
