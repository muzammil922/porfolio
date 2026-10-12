from pathlib import Path

from PIL import Image
import qrcode

root = Path(__file__).resolve().parents[1]
public = root / "public"
src = public / "portrait.jpeg"

img = Image.open(src).convert("RGB")
print(f"portrait source: {img.size}")

# Compressed JPEG for fallback (~1200 wide max)
jpeg = img.copy()
jpeg.thumbnail((1200, 1800), Image.Resampling.LANCZOS)
jpeg_path = public / "portrait.jpeg"
jpeg.save(jpeg_path, format="JPEG", quality=82, optimize=True, progressive=True)
print(f"wrote {jpeg_path.name} {jpeg.size}")

# WebP LCP candidate ~600w
webp = img.copy()
webp.thumbnail((640, 960), Image.Resampling.LANCZOS)
webp_path = public / "portrait.webp"
webp.save(webp_path, format="WEBP", quality=78, method=6)
print(f"wrote {webp_path.name} {webp.size}")

# Larger webp for retina
webp2 = img.copy()
webp2.thumbnail((960, 1440), Image.Resampling.LANCZOS)
webp2_path = public / "portrait-960.webp"
webp2.save(webp2_path, format="WEBP", quality=80, method=6)
print(f"wrote {webp2_path.name} {webp2.size}")

# Static WhatsApp QR
wa = "https://wa.me/923113840943?text=" + __import__("urllib.parse").parse.quote(
    "Hey Muzammil, we can work together"
)
qr = qrcode.QRCode(version=None, error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=8, border=2)
qr.add_data(wa)
qr.make(fit=True)
qr_img = qr.make_image(fill_color="black", back_color="white").convert("RGB")
qr_img = qr_img.resize((360, 360), Image.Resampling.NEAREST)
qr_path = public / "whatsapp-qr.png"
qr_img.save(qr_path, format="PNG", optimize=True)
print(f"wrote {qr_path.name} {qr_img.size}")
print("done")
