

# kjua-svg

Dynamically generated QR codes for modern browsers.  
Uses [kjua](https://github.com/lrsjng/kjua) and
[QR Code Generator](https://github.com/kazuhikoarase/qrcode-generator) (MIT).

# Usage

```javascript
  const code = kjua(options);
  document.getElementById("container").appendChild(code);
```

## Options

### All options

* `text` encoded content (defaults to ``)
* `render` render-mode: 'image', 'canvas', 'svg' (defaults to `image`)
* `crisp` render pixel-perfect lines (defaults to `true`)
* `minVersion` minimum version: 1..40 (defaults to `1`)
* `ecLevel` error correction level: 'L', 'M', 'Q' or 'H' (defaults to `L`)
* `size` size in pixel (defaults to `200`)
* `fill` code color (defaults to `#333`)
* `fillSecondary` code color for 'single' dots (defaults to `#777`, for no secondary color use `''`)
* `back` background color (defaults to `#fff`, for transparent use `''` or `null`)
* `rounded` roundend corners in pc: 0..100 (defaults to `0`, not working if `render`is set to `svg`)
* `quiet` quiet zone in modules (defaults to `0`)
* `mode` modes: 'plain', 'label', 'image', 'imagelabel' or 'labelimage' (defaults to `plain`, set `label` or `image` property if you change this)
* `mSize` label/image size in pc: 0..100 (defaults to `30`) or a number-array if `mode` is 'imagelabel' or 'labelimage'
* `mPosX` label/image pos x in pc: 0..100 (defaults to `50`) or a number-array if `mode` is 'imagelabel' or 'labelimage'
* `mPosY` label/image pos y in pc: 0..100 (defaults to `50`) or a number-array if `mode` is 'imagelabel' or 'labelimage'
* `label` additional label text (defaults to ``)
* `fontname` font for additional label text (defaults to `sans-serif`)
* `fontcolor` font-color for additional label text (defaults to `#333`)
* `fontoutline` draw an outline on the label text in the color of the `back` (defaults to `true`)
* `image` additional image (defaults to `undefined`, use an HTMLImageElement or base64-string)
* `imageAsCode` draw the image as part of the code (defaults to `false`)

More details can be found on [larsjung.de/kjua](https://larsjung.de/kjua/) and [werthdavid.github.io/kjua/](https://werthdavid.github.io/kjua/)

## Differences to https://werthdavid.github.io/kjua/

* Secondary fill color for 'single' dots and positioning pattern centers (canvas w. rounded corners only)
