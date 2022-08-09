# Changelog

Dates are DD-MM-YYYY

## [0.1.0] - 04-08-2022

First ever release. You can make flows from JSON or YAML.

## Unreleased

### Added

- Issue #11: Created a file `DEVELOPMENT` to keep `README` for end-user-friendly. 
- Issue #19: You can import and export figure configurations.
- Issue #22: There is a button to import the sizes of all nodes of the flow.
- Issue #35: Nodes can have a dashed stroke (just like edges already could).



### Changed

- Issue #4: Global settings have nested objects 'graph', 'node' and 'edge'.
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




### Removed

### Fixes

- Issue 40: If you changed the color of an edge, all the markers with no color specified, changed to that color.
- 

