# OnePlus 6/6T

!!! note
    This page is supplementary to the [qualcomm-sdm845](qualcomm-sdm845.md) page,
    read it before proceeding.

## Installation

See [qualcomm-sdm845#installation](qualcomm-sdm845.md#installation)

### Recommended partition layout

Recommended partition layout for manual installation:

- `boot` - U-Boot (`images/u-boot-<DEVICE>.img`)
- `system_a` - /boot partition (`images/fedora_boot.raw`)
- `system_b` - ESP (`images/fedora_esp.raw`)
- `userdata` - root partition (`images/fedora_rootfs.raw`)

## Fix incorrect battery percentage

Sometimes the battery percentage may be reported incorrectly, particularly if
you have a replacement battery. This may be fixed by modifying the device tree blob:

```shell
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

# modify the dtb
sudo dnf install dtc
dtc tmp.dtb -o tmp.dts
sed -i 's/bq27441/bq27541/' tmp.dts
sed -i 's/bq27411/bq27541/' tmp.dts
dtc tmp.dts -o tmp.dtb
rm tmp.dts

# exit the container
exit

# install the modified dtb file
sudo cp tmp.dtb /boot/efi/dtb/qcom/sdm845-oneplus-$MODEL.dtb

reboot
```

## Unbricking using python3-edl

[github.com/pocketblue/oneplus-sdm845-unbrick](https://github.com/pocketblue/oneplus-sdm845-unbrick)
