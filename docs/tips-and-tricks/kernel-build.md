# Building fedora ARK kernel for pocketblue

Fedora uses [ARK kernel](https://cki-project.gitlab.io/kernel-ark). To stay close to upstream fedora, pocketblue uses [arkify](https://gitlab.com/knurd42/linux/-/tree/arkify-arkify) to apply ARK infrastructure to downstream kernels

See [pocketblue/linux](https://github.com/pocketblue/linux) repo for examples

This guide shows how to arkify and build downstream kernels

## Install build tools

We recommend installing these tools in [toolbox](https://docs.stg.fedoraproject.org/en-US/atomic-desktops/toolbox)

Install mock to build kernel

```bash
sudo dnf install mock
```

Install arkify dependencies

```bash
sudo dnf install git make gcc flex bison rpm-build python3-pyyaml
```

Install arkify

```bash
curl https://gitlab.com/knurd42/linux/-/raw/arkify-arkify/arkify -o ~/.local/bin/arkify
```

## Clone downstream kernel

`sdm845` example:

```bash
git clone https://gitlab.com/sdm845-mainline/linux
```

Replace the URL with the repo of the kernel you want to arkify

Then checkout your preferred branch

## Run arkify in kernel repo

```bash
arkify
```

## Add configs for your device

See [oneplus 6 config example](https://github.com/pocketblue/linux/commit/cbdc09c6753a)

## Build srpm

```bash
make NO_CONFIGCHECKS=1 DIST=.fc45 UPSTREAMBUILD_GIT_ONLY=0 dist-srpm
```

## Build kernel locally

For `aarch64` hosts

```bash
mock -r fedora-45-aarch64 \
  --with baseonly \
  --without debuginfo \
  --enable-plugin=ccache \
  --rebuild redhat/rpm/SRPMS/kernel-*.src.rpm
```

For `x86_64` hosts

```bash
mock -r fedora-45-x86_64 \
  --target aarch64 \
  --with cross \
  --with baseonly \
  --without debuginfo \
  --enable-plugin=ccache \
  --additional-package gcc-aarch64-linux-gnu \
  --additional-package binutils-aarch64-linux-gnu \
  --rebuild redhat/rpm/SRPMS/kernel-*.src.rpm
```

`ccache` plugin allows faster rebuilds

## Copy build result to your device

Navigate to dir with build results

```bash
cd /var/lib/mock/fedora-*/result/
```

If you used toolbox for build, this directory will apper inside toolbox

Show files which we are going to install

```bash
export ver=$(basename kernel-core-*.aarch64.rpm .rpm | sed 's/^kernel-core-//')
ls ./kernel{,-core,-modules-core,-modules,-modules-extra}-$ver.rpm
```

Connect you pocketblue device via usb and copy files to it

```bash
rsync -av --mkpath ./kernel{,-core,-modules,-modules-core,-modules-extra}-$ver.rpm user@172.16.42.1:/tmp/rpms/
```

### Installing kernel

Following commands should be ran on your pocketblue device

Double check that you can see all files on your device

```bash
export ver=$(basename kernel-core-*.aarch64.rpm .rpm | sed 's/^kernel-core-//')
ls ./kernel{,-core,-modules-core,-modules,-modules-extra}-$ver.rpm
```

If you have already have kernel override, reset it

```bash
rpm-ostree override reset --all
```

If your device currently runs ARK kernel

```bash
sudo rpm-ostree override replace \
  ./kernel{,-core,-modules,-modules-core,-modules-extra}-$ver.rpm
```

If your device currently runs non-ARK kernel

```bash
sudo rpm-ostree override replace \
  ./kernel-$ver.rpm \
  --install ./kernel-core-$ver.rpm \
  --install ./kernel-modules-$ver.rpm \
  --install ./kernel-modules-core-$ver.rpm \
  --install ./kernel-modules-extra-$ver.rpm
```

### Building on fedora copr

- Go to <https://copr.fedorainfracloud.org>
- Press `New Project`
- Enable fedora aarch64 chroot for your fedora release
- Press Create
- On your copr repo page, press `New Package`
- Put your repo url to `Clone url`
- Choose `make srpm` build method

### Install kernel from copr

Enable copr repository

```bash
sudo dnf copr enable <author>/<repo>
```

If you have already have kernel override, reset it

```bash
rpm-ostree override reset --all
```

If your device currently runs ARK kernel

```bash
sudo rpm-ostree override replace \
  --experimental \
  --from=repo=copr:copr.fedorainfracloud.org:<author>:<repo> \
  kernel kernel-core kernel-modules kernel-modules-core kernel-modules-extra
```

If your device currently runs non-ARK kernel

```bash
sudo rpm-ostree override replace \
  --experimental \
  --from=repo=copr:copr.fedorainfracloud.org:<author>:<repo> \
  kernel \
  --install kernel-core \
  --install kernel-modules \
  --install kernel-modules-core \
  --install kernel-modules-extra
```
