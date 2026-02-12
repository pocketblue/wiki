# Backtick symbol on Xiaomi keyboards

here is a backtick symbol

```
`
```

on linux the keyboards for xiaomi pad 5 and pad 6 can't type backtick by default

two possible solutions are

1. copy and paste the symbol every time you need it
2. use third-party `keyd` tool to map this symbol to alt+esc

### install keyd

```shell
sudo dnf copr enable -y alternateved/keyd
rpm-ostree install keyd
```

### reboot your device

```shell
systemctl reboot
```

### write keyd config

```toml
[ids]
*

[alt]
esc = `
```

write this config to `/etc/keyd/default.conf`

### enable keyd

```shell
sudo systemctl enable --now keyd
```

now you can type backtick with alt+esc
