# zspace-experiments

These experiments render a minimal WebGL scene for a ZSpace viewer.  

## Experiment 1 

* Tests the minimal WebGL renderer without a ZSpace viewer.
* You should see a triangle, viewed from an eye position that pans back and forth along the X-axis.
* Working: **yes**
* [Source code](exp1.html]
* [Run](exp1.html]

## Experiment 2

* Tests the minimal WebGL renderer with a ZSpace viewer, while relying on ZSpace to create the stereo view and projection matrices.
* You should see a triangle that moves correctly with respect to the headset/glasses, instead there is a black canvas.
* Working: **no**
* [Source code](exp2.html]
* [Run](exp2.html]

## Experiment 3

* Tests the minimal WebGL renderer with a ZSpace viewer, while "manually" creating approximated stereo view and projection matrices, independently of ZSpace.
* You should see a triangle, viewed from an eye position that pans back and forth along the X-axis, without being affected by movement of the headset/glasses.
* Working: **yes**
* [Source code](exp3.html]
* [Run](exp3.html]

