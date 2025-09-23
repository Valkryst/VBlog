You can use a variation of the following command to recurse through the images and update them to use the progressive or
interlaced options:

```bash
find ./resource/image \( -iname "*.jpg" -o -iname "*.jpeg" \) -exec jpegtran -copy none -progressive -outfile {} {} \; -o -iname "*.png" -exec magick {} -interlace PNG {} \;
```