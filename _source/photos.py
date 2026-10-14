# Prepare les photos du site Le Monde de Fabienne (LocWeb, 2026-10-14).
# Toutes viennent de ses reseaux (Facebook « Le monde de Fabienne » et
# Instagram @le_monde_de_fabienne) : ses vraies creations, plus parlantes
# que des photos de banque d'images. A remplacer par ses originaux HD.
# Usage : python _source/photos.py <dossier source>
import os, sys, json
from PIL import Image, ImageOps

SRC = sys.argv[1]
ICI = os.path.dirname(os.path.abspath(__file__))
DST = os.path.join(ICI, '..', 'photos')
os.makedirs(DST, exist_ok=True)

PHOTOS = {
    'fb-tartelettes.jpg': 'tartelettes-noisettes',
    'fb-muffins.jpg': 'muffins-maison',
    'fb-cakes-sucre.jpg': 'cakes-sucre-glace',
    'fb-cake.jpg': 'cake-maison',
    'fb-chocolat-chaud.jpg': 'stand-chocolat-chaud',
    'fb-torchon-graines.jpg': 'torchon-et-sachets-de-graines',
    'ig-cookies.jpg': 'cookies-chocolat',
    'ig-fleurs.jpg': 'bouquets-et-graines',
    'ig-fleurs-printemps.jpg': 'jonquilles-et-tulipes',
    'ig-meuble.jpg': 'etagere-avant-apres',
    'ig-rideau.jpg': 'rideau-sur-mesure',
    'ig-stand.jpg': 'stand-marche',
}

def sans_bandes(im):
    """Les couvertures de reels ont des bandes noires : on les retire."""
    g = im.convert('L').point(lambda v: 255 if v > 18 else 0)
    box = g.getbbox()
    return im.crop(box) if box else im

dims = {}
for src, nom in PHOTOS.items():
    im = sans_bandes(ImageOps.exif_transpose(Image.open(os.path.join(SRC, src))).convert('RGB'))
    for larg in (1600, 800):
        c = im if im.width <= larg else im.resize((larg, round(im.height * larg / im.width)), Image.LANCZOS)
        c.save(os.path.join(DST, f'{nom}-{larg}.webp'), 'WEBP', quality=80, method=6)
    big = Image.open(os.path.join(DST, f'{nom}-1600.webp'))
    dims[nom] = {'l': big.width, 'h': big.height}
    print(f'{nom:34s} {im.width}x{im.height}')

# Image de partage 1200x630 : les tartelettes.
im = ImageOps.exif_transpose(Image.open(os.path.join(SRC, 'fb-tartelettes.jpg'))).convert('RGB')
h = round(im.width * 630 / 1200); y = round(im.height * 0.45 - h / 2)
im.crop((0, y, im.width, y + h)).resize((1200, 630), Image.LANCZOS).save(os.path.join(DST, 'partage.jpg'), quality=82)
json.dump(dims, open(os.path.join(ICI, 'photos.json'), 'w'), indent=0)
