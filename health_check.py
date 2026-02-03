import os
import re

def health_check():
    # 1. Tags to check for balance
    tags = ['main', 'section', 'div', 'app-header', 'app-footer']
    
    # 2. Pattern for Google Fonts
    gf_pattern = re.compile(r'https://fonts\.(googleapis|gstatic)\.com', re.IGNORECASE)

    for filename in os.listdir('.'):
        if filename.endswith('.html') and not 'lighthouse report' in filename.lower():
            opened = False
            with open(filename, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Check Balance
            print(f"Checking {filename}...")
            for tag in tags:
                open_count = len(re.findall(f'<{tag}[^>]*>', content, re.IGNORECASE))
                close_count = len(re.findall(f'</{tag}>', content, re.IGNORECASE))
                if open_count != close_count:
                    print(f"  WARNING: Tag imbalance in {filename} for <{tag}>: {open_count} open, {close_count} closed")
            
            # Check for Google Fonts
            if gf_pattern.search(content):
                print(f"  FOUND: Google Font links still in {filename}")

if __name__ == "__main__":
    health_check()
