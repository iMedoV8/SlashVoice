# Feature Specification: Windows icon size

**Feature Branch**: `task/013-windows-icon`

**Created**: 2026-11-18

**Input**: The founder's decision, 2026-11-18: make the Windows icon fill its square while keeping the Mac icon unchanged. See [PRODUCT.md](../../PRODUCT.md) and [DESIGN.md](../../DESIGN.md).

## Problem

The Windows icon uses artwork drawn for the Mac icon grid, leaving a border that makes it look small.

## Requirement

The Windows icon fills its square; the Mac icon is unchanged. The founder approved a tile at x=24, y=24, width=976, height=976, rx=220 on the 1024 square, with the slash and arcs scaled 1.16 about (512, 512). Colours and unscaled stroke width remain the same.

## Success criteria

- Windows ICO and Store tiles are generated from the Windows artwork; its tile spans at least 95% of the canvas and uses the existing colours.
- The largest ICO image has opaque pixels within the outer 5% at the edge midpoints.
- The Mac ICNS and other non-Windows assets remain unchanged.
