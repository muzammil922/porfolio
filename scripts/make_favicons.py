from pathlib import Path

from PIL import Image

root = Path(__file__).resolve().parents[1]
src = root / "public" / "portrait.jpeg"
out_dir = root / "public"

img = Image.open(src).convert("RGB")
w, h = img.size
print(f"source: {w}x{h}")

# Tight face crop for readable tab icons
side = min(w, int(h * 0.34))
left = max(0, (w - side) // 2)
top = max(0, int(h * 0.02))
if top + side > h:
    top = max(0, h - side)
face = img.crop((left, top, left + side, top + side))
print(f"crop: {face.size} from ({left},{top})")


def save_png(size: int, name: str) -> Image.Image:
    resized = face.resize((size, size), Image.Resampling.LANCZOS)
    path = out_dir / name
    resized.save(path, format="PNG", optimize=True)
    print(f"wrote {path.name} {size}x{size}")
    return resized


save_png(16, "favicon-16.png")
save_png(32, "favicon-32.png")
save_png(180, "apple-touch-icon.png")
save_png(192, "android-chrome-192.png")
save_png(512, "android-chrome-512.png")

ico_sizes = [(16, 16), (32, 32), (48, 48)]
ico_images = [face.resize(size, Image.Resampling.LANCZOS) for size in ico_sizes]
ico_path = out_dir / "favicon.ico"
ico_images[0].save(ico_path, format="ICO", sizes=ico_sizes, append_images=ico_images[1:])
print(f"wrote {ico_path.name}")
print("done")
