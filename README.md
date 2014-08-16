# jscs-windows

This package is a workaround to let Atom's [linter-jscs][1] work in Windows.

[1]: https://github.com/AtomLinter/linter-jscs

## Usage

1. Download the zip or git clone this repository.
2. Run `npm install` to install the dependencies.
3. In Atom setting panel, search **Linter Jscs** package.
4. Place `<jscs-windows>\bin` to **Jscs Executable Path** input box.
5. Enjoy it!

## Why

As you may know, node has a [bug][2] to truncate the sub-process output. That is
why Atom's [linter-jscs][1] not working in Windows.

[2]: https://github.com/joyent/node/issues/3871

# How

This workaround is inspired by [this comment][3].

[3]: https://github.com/visionmedia/mocha/issues/333#issuecomment-12368249

Basically, the idea is to use a temporary file to block Windows IO to avoid output truncate.

# License

MIT
