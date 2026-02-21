# Xiaomi Poco F1

!!! note
    This page is supplementary to the [qualcomm-sdm845](qualcomm-sdm845.md) page,
    read it before proceeding.

## Installation

See [qualcomm-sdm845#installation](qualcomm-sdm845.md#installation)

### Panel variants

!!! note
    Currently, Pocketblue doesn't support touchscreen on the Tianma panel variant of this device

Poco F1 comes in two variants with different display panels - EBBG and Tianma.
You can determine the panel variant by using a terminal with root access (e.g. using TWRP or a rooted Android ROM):

```bash
su
cat /proc/cmdline
```

The panel variant is signified by the `msm_drm.dsi_display0` argument
(`dsi_ebbg_fhd_ft8719_video_display` or `dsi_tianma_fhd_nt36672a_video_display`)

### Recommended partition layout

Recommended partition layout for manual installation:

- `boot` - U-Boot (`images/u-boot-<DEVICE>.img`)
- `system` - /boot partition (`images/fedora_boot.raw`)
- `cust` - ESP (`images/fedora_esp.raw`)
- `userdata` - root partition (`images/fedora_rootfs.raw`)
