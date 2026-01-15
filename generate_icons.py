#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size):
    # 创建图片
    img = Image.new('RGB', (size, size), color='#667eea')

    # 创建圆角矩形蒙版
    mask = Image.new('L', (size, size), 0)
    draw = ImageDraw.Draw(mask)
    radius = int(size * 0.2)

    # 绘制圆角矩形
    draw.rounded_rectangle(
        [(0, 0), (size, size)],
        radius=radius,
        fill=255
    )

    # 应用渐变
    for y in range(size):
        for x in range(size):
            if mask.getpixel((x, y)) > 0:
                # 计算渐变
                ratio = (x + y) / (2 * size)
                r = int(102 + (118 - 102) * ratio)
                g = int(126 + (75 - 126) * ratio)
                b = int(234 + (162 - 234) * ratio)
                img.putpixel((x, y), (r, g, b))

    # 绘制日历图标
    try:
        # 尝试使用系统字体
        font = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", int(size * 0.5))
    except:
        # 如果找不到字体，使用默认字体
        font = ImageFont.load_default()

    draw = ImageDraw.Draw(img)
    text = "📅"

    # 获取文本边界框
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    # 居中绘制文本
    x = (size - text_width) // 2
    y = (size - text_height) // 2 - bbox[1]

    draw.text((x, y), text, font=font, fill='white')

    return img

# 生成图标
print("正在生成图标...")
icon_192 = create_icon(192)
icon_512 = create_icon(512)

icon_192.save('icon-192.png')
icon_512.save('icon-512.png')

print("图标生成完成！")
print("已创建: icon-192.png (192x192)")
print("已创建: icon-512.png (512x512)")
