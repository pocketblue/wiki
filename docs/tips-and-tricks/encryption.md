# Encryption

Currently, it isn't possible to install Pocketblue with full disk encryption.
However, you can protect your user files by creating a user managed by systemd-homed
with an encrypted home directory.

!!! warning
    This will protect files in your home directory, but the root and the rest of /var are left unencrypted and vulnerable

!!! warning
    systemd-homed support in Fedora is not polished yet. It is recommended to not remove the regular user
    in case you need to fix systemd-homed related issues

## Creating a systemd-homed user

Enable systemd-homed authentication:

```shell
sudo authselect enable-feature with-systemd-homed
```

Create a new user with a luks-encrypted home directory:

```shell
homectl create --storage=luks --luks-extra-mount-options=defcontext=system_u:object_r:user_home_dir_t:s0 --fs-type=btrfs <username>
```

For some reason, you have to set the password *again*:

```shell
homectl passwd <username>
```

## Logging in

At first the user will not be listed in your display manager and you have to enter the username manually.
To do this in GDM, click "Not listed?" when choosing a user.

If you're using a Phosh image, Phrog will not allow entering the username manually. Instead you can rebase to a Gnome image and log in to your
new user with GDM, then rebase back to the Phosh image. Phrog will then pick the new user up and allow you to log in.

!!! note
    For whatever reason, when logging into a systemd-homed user you have to **enter your password twice**.

## Configuring the user

### Wheel group

Add yourself to the wheel group to be able to use sudo and modify system settings:

```shell
homectl update --member-of=wheel
```

Then log out

### Containers

systemd-homed doesn't modify `/etc/subuid` and `/etc/subgid`.
To make podman work, edit these files manually and replace the old username with the new one
(for example: `newuser:524288:65536`), then run:

```shell
podman system migrate
sudo podman system migrate
```

### Disk size

systemd-homed allocates a file of a fixed size for your encrypted home directory.
Run `df -h ~` to check your home size, run `df -h /var` to check the overall disk size.

Use the following command to resize the home directory (replace 100G with the desired size):

```shell
homectl update --disk-size=100G
```

Make sure to leave enough space for future system updates, pinned deployments and layered packages.
Changes will apply after a reboot.
