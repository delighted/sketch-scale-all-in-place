// Scale all in place
//
// Sketch plugin to scale all selected layers, in place, from center.
//
// Copyright (c) 2018 Mike Gowen, Delighted.

const sketch = require("sketch");

// Run handlers

export default function(context) {
  let document = sketch.fromNative(context.document);
  let selectedLayers = toArray(document.selectedLayers);

  if (!validSelection(selectedLayers)) {
    sketch.UI.message("Please select 1 or more layers (text layers are not supported).");
    return false;
  }

  let scalePercentage = sketch.UI.getStringFromUser("Scale to (percentage):", 100);
  if (scalePercentage < 0) {
    sketch.UI.message("Please enter a positive percentage.");
    return false;
  }
  selectedLayers.forEach(selectedLayer => scale(selectedLayer, scalePercentage));
}

// Functions

function scale(layer, scalePercentage) {
  let scaleDecimal = scalePercentage / 100;
  let oldWidth = layer.frame.width;
  let oldHeight = layer.frame.height;

  layer.frame.width = Math.round(oldWidth * scaleDecimal);
  layer.frame.height = Math.round(oldHeight * scaleDecimal);
  layer.frame.x = Math.round(layer.frame.x - ((layer.frame.width - oldWidth) / 2));
  layer.frame.y = Math.round(layer.frame.y - ((layer.frame.height - oldHeight) / 2));
}

function validSelection(selectedLayers) {
  if (selectedLayers.length < 1) return false;
  if (hasTextSelected(selectedLayers)) return false;
  return true;
}

function hasTextSelected(selectedLayers) {
  return selectedLayers.some(selectedLayer => selectedLayer.type === String(sketch.Types.Text));
}

function toArray(nsArray) {
  return nsArray.map(el => el);
}
