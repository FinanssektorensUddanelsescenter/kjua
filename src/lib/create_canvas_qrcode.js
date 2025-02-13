const dom = require('./dom');
const draw_module_rounded = require('./draw_rounded');
const draw_mode = require('./draw_mode');

const draw_background = (ctx, settings) => {
    if (settings.back) {
        ctx.fillStyle = settings.back;
        ctx.fillRect(0, 0, settings.size, settings.size);
    }
};

const draw_module_default = (qr, ctx, drawmode, settings, width, row, col, mod_count) => {
    if (qr.is_dark(row, col)) {
        ctx.rect(col * width, row * width, width, width);
    }
};

const draw_modules = (qr, ctx, settings) => {
    if (!qr) {
        return;
    }

    const draw_module = settings.rounded > 0 && settings.rounded <= 100 ? draw_module_rounded : draw_module_default;
    const mod_count = qr.module_count;

    let mod_size = settings.size / mod_count;
    let offset = 0;
    if (settings.crisp) {
        mod_size = Math.floor(mod_size);
        offset = Math.floor((settings.size - mod_size * mod_count) / 2);
    }

    let drawmode = 'primary';
    ctx.translate(offset, offset);
    ctx.beginPath();
    for (let row = 0; row < mod_count; row += 1) {
        for (let col = 0; col < mod_count; col += 1) {
            draw_module(qr, ctx, drawmode, settings, mod_size, row, col, mod_count);
        }
    }
    ctx.fillStyle = settings.fill;
    ctx.fill();
    ctx.translate(-offset, -offset);

    if (settings.fillSecondary !== '') {
        drawmode = 'secondary';
        ctx.translate(offset, offset);
        ctx.beginPath();
        for (let row = 0; row < mod_count; row += 1) {
            for (let col = 0; col < mod_count; col += 1) {
                draw_module(qr, ctx, drawmode, settings, mod_size, row, col, mod_count);
            }
        }
        ctx.fillStyle = settings.fillSecondary;
        ctx.fill();
        ctx.translate(-offset, -offset);
    }
};

const draw = (qr, ctx, settings) => {
    draw_background(ctx, settings);
    draw_modules(qr, ctx, settings);
    draw_mode(ctx, settings);
};

const create_canvas_qrcode = (qr, settings, as_image) => {
    const ratio = settings.ratio || dom.dpr;
    const canvas = dom.create_canvas(settings.size, ratio);
    const context = canvas.getContext('2d');

    if (settings.imageAsCode) {
        // eslint-disable-next-line no-shadow
        const canvas = dom.create_canvas(settings.size, ratio);
        const ctx2 = canvas.getContext('2d');
        draw_modules(qr, ctx2, settings);
        const imagePos = dom.calc_image_pos(settings);
        ctx2.globalCompositeOperation = 'source-in';
        ctx2.drawImage(settings.image, imagePos.x, imagePos.y, imagePos.iw, imagePos.ih);
        settings = Object.assign({}, settings, {image: ctx2.canvas});
    }

    context.scale(ratio, ratio);
    draw(qr, context, settings);
    return as_image ? dom.canvas_to_img(canvas, settings.elementId) : canvas;
};

module.exports = {
    create_canvas_qrcode,
    draw_modules
};
