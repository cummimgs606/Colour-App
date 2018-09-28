/*
https://stackoverflow.com/questions/4421914/html5-canvas-how-to-zoom-in-the-pixels

function resize(ctx, sx, sy, sw, sh, tx, ty, tw, th) {
    var source = ctx.getImageData(sx, sy, sw, sh);
    var sdata = source.data;

    var target = ctx.createImageData(tw, th);
    var tdata = target.data;

    var mapx = [];
    var ratiox = sw / tw, px = 0;
    for (var i = 0; i < tw; ++i) {
        mapx[i] = 4 * Math.floor(px);
        px += ratiox;
    }

    var mapy = [];
    var ratioy = sh / th, py = 0;
    for (var i = 0; i < th; ++i) {
        mapy[i] = 4 * sw * Math.floor(py);
        py += ratioy;
    }

    var tp = 0;
    for (py = 0; py < th; ++py) {
        for (px = 0; px < tw; ++px) {
            var sp = mapx[px] + mapy[py];
            tdata[tp++] = sdata[sp++];
            tdata[tp++] = sdata[sp++];
            tdata[tp++] = sdata[sp++];
            tdata[tp++] = sdata[sp++];
        }
    }

    ctx.putImageData(target, tx, ty);
}
*/