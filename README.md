# Sales & Dungeons Advanced

## Install

```
npm install --global BigJk/sndx
```

## CLI

CLI Utility to use modern bundler for Templates & Generators

```
Sales & Dungeons :: Advanced

sndx init

Initializes a Template / Generator bundler setup

Options:
      --help     Show help                                             [boolean]
      --version  Show version number                                   [boolean]
  -d, --dir      folder to save to                               [default: "./"]

Not enough non-option arguments: got 0, need at least 1
```

### ``sndx init``

This command will create all the files needed to develop a S&D Template or Generator in conjunction with a modern bundler. This makes the development process a bit more like typical web-dev. You can include scripts, images, etc. from other files and the bundler will bundle it to a single ``print.html.njk``. After running ``npm run build`` the folder should be importable in S&D.

- ``sndx init``: will start the template / generator setup process for the current directory
- ``sndx init --dir=./test-template``: will start the template / generator setup process for the ``./test-template`` directory

## Bundler Tech

- https://vitejs.dev/
- https://github.com/richardtallent/vite-plugin-singlefile
