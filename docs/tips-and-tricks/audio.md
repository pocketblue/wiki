# Audio

Most devices will be lacking DSP and vendor tuning files after switching to Linux, which causes the loudspeaker to sound "thin" or "harsh". You can apply system-wide audio effects to improve the sound quality of your device using [Easy Effects](https://github.com/wwmm/easyeffects).

First, install Easy Effects from Flathub:
```
flatpak install flathub com.github.wwmm.easyeffects
```
  
You may now add an effect such as the Parametric EQ to the output, and start tuning your own device.

!!! note
    Resource-intensive effects such as limiters and compressors may occasionally produce pops and crackles. The cause of this problem is currently unknown as it appears to be unrelated to the block size.

## Community presets

Alternatively, you will find a list of ready-made community presets for supported devices below:
### Xiaomi Pad 6
- https://github.com/FaridZelli/EasyEffects-Pipa

## Safety

!!! warning
    Due to the complete lack of safety measures, it is possible for devices to exhibit loud audio spikes, fry their own circuitry, ***and even cause hearing damage*** when mishandled. Proceed to use audio mods with extreme caution.
