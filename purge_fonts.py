import os
import re

def purge_fonts():
    # Patterns to remove
    patterns = [
        re.compile(r'<link[^>]+preconnect[^>]+fonts\.(googleapis|gstatic)\.com[^>]*>', re.IGNORECASE),
        re.compile(r'<link[^>]+fonts\.(googleapis|gstatic)\.com/css2\?[^>]+rel="stylesheet"[^>]*>', re.IGNORECASE),
        re.compile(r'<link[^>]+rel="stylesheet"[^>]+fonts\.(googleapis|gstatic)\.com/css2\?[^>]+>', re.IGNORECASE)
    ]

    for filename in os.listdir('.'):
        if filename.endswith('.html'):
            with open(filename, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            for pattern in patterns:
                content = pattern.sub('', content)
            
            if content != original_content:
                with open(filename, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Purged Google Fonts from {filename}")

if __name__ == "__main__":
    purge_fonts()
