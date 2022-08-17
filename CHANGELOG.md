# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Added

- Details custom React component

### Changed

- Controls and MiniMaps everywhere
- updates schemas and docs via test script

### Fixed

- Changelog formatting

## [1.0.0] - 2022-08-12

### Added

- Issue #10: There is support for vgroups and hgroups in combination with `autoLayout`.
- Issue #11: Created a file [DEVELOPMENT.md] to keep [README.md] end-user-friendly.
- Issue #12: You can set the contents of the example buttons via the configs.
- Issue #18: Set the size of an arrowhead.
- Issue #19: You can import and export figure configurations.
- Issue #22: There is a button to import the positions of all nodes of the flow.
- Issue #30: There is a switch button to auto-sync all the changes you make in the editors.
- Issue #34: You can use define for nodes and edges.
- Issue #35: Nodes can have a dashed stroke (just like edges already could).
- Issue #59: There is a button to export the raw ReactFlow config.
- Issue #73: Support for adding encoding data in the URL. If you encode data in the URL, the flow shows up in full
  screen, so you can embed the flow in an `iframe`.
- Issue #79: There is a switch to snap the nodes to the grid.
- Issue #80: You can place text on top of a node.

### Changed

- Issue #4: Global settings have nested objects 'graph', 'node' and 'edge'.
- Issue #5: You can generate documentation (see DEVELOPMENT.md for more info)
- Issue #5: edgeColor -> color and edgeThickness -> thickness.
- Issue #20: Changed layout of the editors. The editors are on the left, so you don't need to scroll in order to see the
  generated flow.
- Issue #21: If you use images with different dimensions than the width and height of the node, the imaged is not sliced
  anymore.
- Issue #24: There is a better separation of UI and non-UI code.
- Issue #25: Transferred the repo from https://github.com/TiboStr to https://github.com/KNowledgeOnWebScale.
- Issue #31: There is a GitHub action that deploys a new version of this project to GitHub Pages on every `git push`.
  The new link (after the transferation done in issue #25)
  is https://knowledgeonwebscale.github.io/dataflow-visualization/.
-

### Fixes

- Issue #40: If you changed the color of an edge, all the markers with no color specified, changed to that color.
- Issue #69: Title and label in a node that was no parent, did not work.
- Kept [README.md] en [DEVELOPMENT.md] up to date with all the new changes and additions.

## [0.1.0] - 2022-08-04

First ever release. You can make flows from JSON or YAML.

[DEVELOPMENT.md]: DEVELOPMENT.md
[README.md]: README.md
