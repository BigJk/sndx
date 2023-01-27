#! /usr/bin/env node

const prompts = require('prompts');
const fs = require('fs');
const path = require('path');

console.log('Sales & Dungeons :: Advanced\n')

require('yargs')
    .command('$0 init', 'Initializes a Template / Generator bundler setup', (yargs) => {
        yargs.option('dir', {
            alias: 'd',
            type: 'text',
            default: './',
            description: 'folder to save to'
        })
    }, (argv) => {
        if (argv.dir !== "./" && !fs.existsSync(argv.dir)) {
            fs.mkdirSync(argv.dir, {
                recursive: true
            });
        }

        const questions = [{
                type: 'select',
                name: 'type',
                message: 'Project type?',
                choices: [{
                        title: 'Template',
                        value: 'Template'
                    },
                    {
                        title: 'Generator',
                        value: 'Generator'
                    }
                ],
                initial: 0
            },
            {
                type: 'text',
                name: 'name',
                message: 'Name?',
                validate: function (val) {
                    return val.length > 0;
                }
            },
            {
                type: 'text',
                name: 'slug',
                message: 'Slug? (Only a-z, 0-9 and \'-\' are allowed)',
                validate: function (val) {
                    return /^[a-z0-9-]+$/gi.exec(val) !== null;
                }
            },
            {
                type: 'text',
                name: 'author',
                message: 'Author?',
                validate: function (val) {
                    return val.length > 0;
                }
            },
        ]

        prompts(questions).then((res) => {
            fs.writeFileSync(path.join(argv.dir, "package.json"), `{
    "name": "${res.name}",
    "version": "0.0.1",
    "description": "",
    "main": "index.js",
    "scripts": {
        "dev": "vite",
        "build": "vite build",
        "watch": "vite build --watch",
        "preview": "vite preview"
    },
    "author": "${res.author}",
    "license": "MIT",
    "devDependencies": {
        "vite": "^4.0.4",
        "vite-plugin-singlefile": "^0.13.2"
    }
}`);

            fs.writeFileSync(path.join(argv.dir, "index.html"), `<!--
    Your Template / Generator HTML

    Run 'vite build' to build a importable folder or 'vite watch' to re-build on file change
-->`);

            switch (res.type) {
                case "Template":
                    fs.writeFileSync(path.join(argv.dir, "meta.json"), `{
    "name": "${res.name}",
    "slug": "${res.slug}",
    "author": "${res.author}",
    "description": "",
    "images": {},
    "dataSources": [],
    "version": ""
}`);
                    fs.writeFileSync(path.join(argv.dir, "list.html.njk"), '');
                    fs.writeFileSync(path.join(argv.dir, "skeleton.json"), '{ "hello": "world" }');
                    fs.writeFileSync(path.join(argv.dir, "entries.json"), '[ ]');

                    break;
                case "Generator":
                    fs.writeFileSync(path.join(argv.dir, "meta.json"), `{
    "name": "${res.name}",
    "slug": "${res.slug}",
    "author": "${res.author}",
    "description": "",
    "passEntriesToJS": false,
    "config": [],
    "images": {},
    "dataSources": [],
    "version": ""
}`);
                    break;
            }

            fs.writeFileSync(path.join(argv.dir, "vite.config.js"), `import {
    defineConfig
} from 'vite'

import {
    viteSingleFile
} from "vite-plugin-singlefile"

const renameIndexPlugin = (newFilename) => {
    if (!newFilename) return
  
    return {
      name: 'renameIndex',
      enforce: 'post',
      generateBundle(options, bundle) {
        const indexHtml = bundle['index.html']
        indexHtml.fileName = newFilename
      },
    }
  }

export default defineConfig({
    plugins: [viteSingleFile(), renameIndexPlugin('print.html.njk')],
    build: {
        outDir: "./",
    }
})`);

        console.log(`${res.type} initialized. Run 'npm i' to install all dependencies & 'npm run build' to build.`)

        }).catch(() => {
            console.log("Aborted.");
        });
    })
    .argv