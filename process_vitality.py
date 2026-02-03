from PIL import Image, ImageOps
import os

def process_image():
    input_path = os.path.join('images', 'new vitality.png')
    output_path = os.path.join('images', 'vitality-health-clinic-hero-v2.webp')
    target_size = (1920, 1080)

    if not os.path.exists(input_path):
        print(f"Error: {input_path} not found.")
        # Try to find case-insensitive match
        for f in os.listdir('images'):
            if f.lower() == 'new vitality.png':
                input_path = os.path.join('images', f)
                print(f"Found input file at: {input_path}")
                break
        else:
            return

    try:
        with Image.open(input_path) as img:
            # Convert to RGB (in case of RGBA png)
            if img.mode == 'RGBA':
                img = img.convert('RGB')
            
            # Resize and crop to fill 1920x1080
            processed_img = ImageOps.fit(img, target_size, method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
            
            # Save as WebP
            processed_img.save(output_path, 'WEBP', quality=85)
            print(f"Successfully saved {output_path}")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    process_image()
