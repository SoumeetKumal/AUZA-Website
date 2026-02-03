import os
import re

def update_html_files():
    # CSS files in order
    css_files = [
        "css/variables.css",
        "css/base.css",
        "css/animations.css",
        "css/navigation.css",
        "css/sections.css",
        "css/components.css",
        "css/mockups.css",
        "css/pricing.css",
        "css/legal.css",
        "css/banner.css",
        "css/responsive.css"
    ]
    
    # Construct the new link tags
    new_css_block = '  <!-- Preconnect for performance -->\n'
    new_css_block += '  <link rel="preconnect" href="https://fonts.googleapis.com">\n'
    new_css_block += '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
    new_css_block += '  \n  <!-- Modular CSS -->\n'
    for css in css_files:
        new_css_block += f'  <link rel="stylesheet" href="{css}">\n'

    # Regex to find the style.css link
    # Matches <link rel="stylesheet" href="style.css..."> or href="style.css"
    style_css_pattern = re.compile(r'<link\s+rel=["\']stylesheet["\']\s+href=["\']style\.css(\?v=\d+)?["\']\s*>')
    
    # Regex to find image srcs ending in .png or .jpg
    # We use a negative lookbehind to ensure we don't change already converted ones (though unlikely)
    # and we target src="..." attributes.
    img_src_pattern = re.compile(r'src=["\'](images/[^"\']+\.(?:png|jpg|jpeg))["\']', re.IGNORECASE)

    for filename in os.listdir('.'):
        if filename.endswith('.html') and not filename.endswith('report.html'): # Skip reports
            print(f"Processing {filename}...")
            
            with open(filename, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Update CSS
            if style_css_pattern.search(content):
                content = style_css_pattern.sub(new_css_block.strip(), content)
                print(f"  Updated CSS links in {filename}")
            else:
                print(f"  Could not find style.css link in {filename}")

            # Update Images
            # Logic: iterate all matches, check if file exists as webp (optional validation), replace.
            # For this script we assume the optimize_images script ran successfully.
            
            def replace_img_ext(match):
                original_path = match.group(1)
                new_path = os.path.splitext(original_path)[0] + '.webp'
                return f'src="{new_path}"'

            new_content = img_src_pattern.sub(replace_img_ext, content)
            
            if new_content != content:
                print(f"  Updated image sources in {filename}")
                content = new_content
            
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(content)

if __name__ == "__main__":
    update_html_files()
