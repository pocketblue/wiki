### Editing and deploying wiki

- Pockteblue wiki is a bunch of .md files in [pocketblue/wiki](https://github.com/pocketblue/wiki) repo
- Pushing changes to the wiki repo triggers a workflow that builds wiki site using [mkdocs-material](https://github.com/squidfunk/mkdocs-material) and uploads it as an artifact
- After that deploy.yml workflow in [pocketblue/pocketblue.github.io](https://github.com/pocketblue/pocketblue.github.io) repo is getting triggered
- That workflow downloads wiki site artifact, and our [flatpak repo](https://github.com/pocketblue/flatpaks) artifact
- Then it merges both artifact and deploys wiki and flatpak repo to https://pocketblue.github.io
