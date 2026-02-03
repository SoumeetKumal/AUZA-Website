import os
import requests
import re
from pathlib import Path

def download_fonts():
    # Target: Inter font, weights 400..900
    css_url = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
    
    # User-Agent to ensure we get WOFF2 format (modern browsers)
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    print("Fetching CSS from Google Fonts...")
    response = requests.get(css_url, headers=headers)
    if response.status_code != 200:
        print(f"Failed to fetch CSS: {response.status_code}")
        return

    css_content = response.text
    
    # Create directories
    if not os.path.exists('fonts'):
        os.makedirs('fonts')
    if not os.path.exists('css'):
        os.makedirs('css')

    # Parse CSS to find font URLs and filenames
    # Pattern to find src: url(...) and font-style/weight to name files meaningfully or just use hash
    # Simplification: Find all url(...) and download them. 
    # For a clean implementation, we'll replace the URLs in CSS with local paths.
    
    new_css_content = css_content
    
    urls = re.findall(r'url\((https?://[^)]+)\)', css_content)
    
    # Deduplicate URLs
    urls = sorted(list(set(urls)))
    
    print(f"Found {len(urls)} font files to download.")
    
    for i, url in enumerate(urls):
        filename = url.split('/')[-1]
        # Clean filename if it has query params (though usually woff2 urls don't)
        filename = filename.split('?')[0]
        
        # If the filename is generic (like many google fonts are), prepending index might help but Inter usually has distinct names or we can just name them by index if needed.
        # Actually Google Font URLs are effectively hashes.
        
        local_path = os.path.join('fonts', filename)
        
        if not os.path.exists(local_path):
            print(f"Downloading {filename}...")
            font_response = requests.get(url)
            if font_response.status_code == 200:
                with open(local_path, 'wb') as f:
                    f.write(font_response.content)
            else:
                print(f"Failed to download {url}")
        else:
            print(f"Skipping {filename}, already exists.")

        # Update CSS content to point to local file
        # logical relative path from css/fonts.css to fonts/file.woff2 is ../fonts/file.woff2
        new_css_content = new_css_content.replace(url, f'../fonts/{filename}')

    # Save the new CSS
    with open('css/fonts.css', 'w', encoding='utf-8') as f:
        f.write("/* Local Fonts */\n" + new_css_content)
    
    print("Saved css/fonts.css")

if __name__ == "__main__":
    download_fonts()
