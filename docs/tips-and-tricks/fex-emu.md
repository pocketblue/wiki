# Using fex-emu to run x86 apps on arm devices

## Installation

```shell
rpm-ostree install fex-emu
```

## Configuration

Create a config file:

```shell
mkdir -p ~/.config/fex-emu
echo '{
  "Config": {
    "RootFS": "/usr/share/fex-emu/RootFS/default.erofs"
  }
}' | tee ~/.config/fex-emu/Config.json
```

Disable qemu and enable fex:

```shell
echo 0 | sudo tee /proc/sys/fs/binfmt_misc/qemu*
echo 1 | sudo tee /proc/sys/fs/binfmt_misc/FEX*
```

Test fex:

```shell
FEXInterpreter /usr/bin/uname -a
FEXBash -c 'uname -a'
```

## Running Steam

```shell
mkdir -p ~/.local/share/steam
cd ~/.local/share/steam
curl -LO https://rpmfind.net/linux/rpmfusion/nonfree/fedora/releases/44/Everything/x86_64/os/Packages/s/steam-1.0.0.85-6.fc44.i686.rpm
rpm2cpio steam*.rpm | cpio -idmv

FEXInterpreter ~/.local/share/steam/usr/lib/steam/bin_steam.sh
```

