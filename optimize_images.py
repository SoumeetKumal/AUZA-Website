import os
from PIL import Image
from pathlib import Path

def optimize_images(directory):
    directory_path = Path(directory)
    # Recursively find all images
    for file_path in directory_path.rglob('*'):
        if file_path.suffix.lower() in ['.png', '.jpg', '.jpeg']:
            if "og-share" in file_path.name: # Skip OG images as they often need specific formats/sizes for social platforms
                 print(f"Skipping potentially sensitive file: {file_path}")
                 continue
            
            webp_path = file_path.with_suffix('.webp')
            
            # Skip if webp already exists and is newer
            if webp_path.exists() and webp_path.stat().st_mtime > file_path.stat().st_mtime:
                print(f"Skipping {file_path.name}, already optimized.")
                continue

            try:
                print(f"Converting {file_path.name} to WebP...")
                with Image.open(file_path) as img:
                    # Save as WebP
                    img.save(webp_path, 'WEBP', quality=80)
                print(f"Saved {webp_path.name}")
            except Exception as e:
                print(f"Failed to convert {file_path}: {e}")

if __name__ == "__main__":
    current_dir = os.getcwd()
    images_dir = os.path.join(current_dir, 'images')
    if os.path.exists(images_dir):
        optimize_images(images_dir)
    else:
        print(f"Images directory not found at {images_dir}")
