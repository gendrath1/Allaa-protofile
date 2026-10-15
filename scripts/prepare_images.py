"""Export web images from the project Drive originals and its portfolio deck.

Requires Pillow. Run from repository root:
python scripts/prepare_images.py --originals ../drive-originals --deck ../portfolio-source.pptx
"""
import argparse
import io
import json
import zipfile
from pathlib import Path
from PIL import Image, ImageOps

parser = argparse.ArgumentParser()
parser.add_argument('--originals', type=Path, required=True)
parser.add_argument('--deck', type=Path, required=True)
args = parser.parse_args()
assets = Path('assets')
assets.mkdir(exist_ok=True)
sources = {
    'alaa-behind-camera': ('drive', 'my photo/IMG_4705.jpg', None),
    'world-cup-boy': ('deck', 'image15.png', None),
    'yaba-wall': ('drive', 'yaba/yaba 2.png', None),
    'seven-stones-face': ('drive', 'the wall/٣.png', None),
    'alex-track': ('deck', 'image30.jpg', (0, 0, 1081, 608)),
    'why-not-artists': ('deck', 'image40.jpg', None),
    'darwin-collective': ('deck', 'image6.jpg', None),
    'darwin-gathering': ('deck', 'image10.jpg', None),
}
manifest = []
with zipfile.ZipFile(args.deck) as deck:
    for name, (kind, source, crop) in sources.items():
        raw = args.originals / source if kind == 'drive' else io.BytesIO(deck.read('ppt/media/' + source))
        with Image.open(raw) as original:
            image = ImageOps.exif_transpose(original).convert('RGB')
            if crop:
                image = image.crop(crop)
            dimensions = image.size
            variants = []
            for suffix, limit in [('', 1800), ('-small', 900)]:
                web = image.copy()
                web.thumbnail((limit, limit), Image.Resampling.LANCZOS)
                target = assets / (name + suffix + '.webp')
                web.save(target, 'WEBP', quality=94, method=6)
                variants.append({'path': target.as_posix(), 'width': web.width, 'height': web.height, 'bytes': target.stat().st_size})
            manifest.append({'asset': name, 'source_type': kind, 'source_file': source, 'crop': crop, 'source_dimensions': dimensions, 'variants': variants})
Path('image-sources.json').write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
print(json.dumps(manifest, indent=2, ensure_ascii=False))
