# XL Deploy repository search plugin #

[![Build Status][xld-repo-search-plugin-travis-image]][xld-repo-search-plugin-travis-url]
[![License: MIT][xld-repo-search-plugin-license-image]][xld-repo-search-plugin-license-url]
![Github All Releases][xld-repo-search-plugin-downloads-image]

[xld-repo-search-plugin-travis-image]: https://travis-ci.org/xebialabs-community/xld-repo-search-plugin.svg?branch=master
[xld-repo-search-plugin-travis-url]: https://travis-ci.org/xebialabs-community/xld-repo-search-plugin
[xld-repo-search-plugin-license-image]: https://img.shields.io/badge/License-MIT-yellow.svg
[xld-repo-search-plugin-license-url]: https://opensource.org/licenses/MIT
[xld-repo-search-plugin-downloads-image]: https://img.shields.io/github/downloads/xebialabs-community/xld-repo-search-plugin/total.svg

## Preface

This document describes the functionality provided by the XL Deploy repository search plugin.

See the [XL Deploy reference manual](https://docs.xebialabs.com/xl-deploy) for background information on XL Deploy and deployment automation concepts.

## Overview

This plugin provides an input screen in the XL Deploy GUI for a repository search by object type.

## Requirements

* XL Deploy 5.5+

## Installation

* Copy the latest JAR file from the [releases page](https://github.com/xebialabs-community/xld-repo-search-plugin/releases) into `XL_RELEASE_SERVER_HOME/plugins` 
* Restart the XL Deploy server

## Usage ##

1. The main menu will display Search at the top-level.
2. Enter a type defined to XL Deploy's type system.  See the [documentation](https://docs.xebialabs.com/xl-deploy/7.2.x/) for type names.
3. Enter a Parent to search the level immediately under a container.
4. Or, enter an Ancestor to search all levels under a container.
5. Enter the properties to display as a comma-separated list.

![search image](images/search-1.png)







