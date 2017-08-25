# Frends Browser Extension

An extension for helping day to day work with [Frends 4.x](https://frends.com) . 


With a press of a button you can:

* You can change color themes to light and dark variant of [Solarized](http://ethanschoonover.com/solarized) color theme. The colors will work on all Frends installations in frendsapp.com.

![Image of different colors](https://github.com/CommunityHiQ/FrendsBrowserExtension/raw/master/img/SolarizedFrends001.png)

* Copy the task documentation from process editing screen into confluence (in HTML format).
* Same as avobe + save PNG screenshot (who need SVG anyway?!) of the process for use in Confluence!
* See what environment variables process use

## Using the "copy env vars" button

Go to process list page, select needed environment and time limit. Press the button. The button will not work if somewhere else (not on process list page).

# Installation

First clone or download extension to your computer.

Firefox: Visit about:debugging page. There, look for the ‘Load Temporary add-on’ option and select the manifest.json file. Now extension works until you close your browser. Documentation features dont work in firefox.

Chrome: Visit chrome://extensions, Enable Developer mode by ticking the checkbox in the upper-right corner. Click on the "Load unpacked extension..." button. Select the directory containing extension. Now the extension will work, but for some reason, dark theme cannot be enabled in Chrome, but light theme will work.

# Release notes

## 1.0

Lust, Violence, Hunger, Pencil, Jefim - all those things come to mind when speaking about writing documentation. How does the pencil fit in? Nobody cares. Do I have something for you today? Absolutely!

From the creator of the Jefim's Incredible XSLT Tool comes a new, revolutionary tool that will make your smiles twice as happy when you're documenting things. Here comes your new favourite IEX tool:

 === Jefim's Mindboggling Documentation Aberration 1.0 ===

With a press of a button you can:
1. Copy the process documentation table to clipboard.
2. Same as avobe + save PNG screenshot (who need SVG anyway?!) of the process for use in Confluence!

Now I want you to pause for just a second. Breathe in. Breathe out. Resist the urge to scream your lungs out in joy - people are working here you know. Now go get the extension from  ... \\lulu ...


## 1.1

There is no 'A' in silence. There is no 'Z' in honor. And there is no point in those statements. Why bother making a point when I've got a new version of the Jefim's Mindboggling Documentation Aberration? Version 1.1 is ready and includes new, most mindboggling features ever. Ossi will have to merge with conflicts for sure, but you can't make a fire without breaking some legs. This is probably the lamest and weakest release notes text I've written like ever!

Without further ado, here the new shit:
- You can now extract all environment variable usages from ALL processes into a nice HTML table, just paste it into Confluence!
- When you get bored - get a fresh dad joke with a press of a button! Voila! (Caution - this actually makes a get request to the dad joke site!)

## 1.2 

How many shades of grey there are in Frends process editor? None. And there are no colors either. But cry no more, this browser extension is coming to rescue you! From now on you can change color theme of process editor with a one click! There are two color themes: light and dark variants of solarized.

# Credits:

[Jefim Borissov](https://github.com/jefim), [Ossi Galkin](https://github.com/OssiGalkin).

# Used libraries and other stuff: 

* Underscore.js (http://underscorejs.org/ MIT License)
* spin.js (http://spin.js.org/ MIT License)
* RequireJS (https://github.com/requirejs/requirejs MIT license)
* jQuery (https://jquery.org MIT license)
* FileSaver.js (https://github.com/eligrey/FileSaver.js The MIT License)
* Solarized (http://ethanschoonover.com/solarized)
* Icons made by [Madebyoliver](http://www.flaticon.com/authors/madebyoliver) from [www.flaticon.com](http://www.flaticon.com) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/)

<div>Icons made by <a href="http://www.flaticon.com/authors/madebyoliver" title="Madebyoliver">Madebyoliver</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>