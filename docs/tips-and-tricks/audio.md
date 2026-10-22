# Audio

Most devices will lack DSP and vendor tuning files after switching to Linux. This causes the loudspeaker to sound "thin" or "harsh". However, you can improve the sound quality of your device by applying system-wide DSP using [Easy Effects](https://github.com/wwmm/easyeffects).

First, install Easy Effects from Flathub:
```
flatpak install flathub com.github.wwmm.easyeffects
```
  
Then add your desired audio effect, such as the Parametric EQ, to the output chain.

!!! note
    Resource-intensive effects such as limiters and compressors may occasionally produce pops and crackles. The cause of this problem is currently unknown and appears to be unaffected by the block size.

## Community presets

Alternatively, you will find a list of ready-made community presets for supported devices below:
### Xiaomi Pad 6
- [FaridZelli/EasyEffects-Pipa](https://github.com/FaridZelli/EasyEffects-Pipa)

## Safety

!!! warning
    Due to the complete lack of any software-side safety measures, it may be possible for devices to exhibit loud audio spikes, fry their own circuitry, ***or even cause hearing damage*** when mishandled. Use audio mods with extreme caution.
