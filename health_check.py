import os
import re
from bs4 import BeautifulSoup

from PIL import Image

def get_image_dimensions(directory, src):
    # Try to find the image file
    # src might be 'images/foo.png' or '/images/foo.png' or 'http...'
    if src.startswith('http'):
        return None
    
    # Remove leading slash if any
    clean_src = src.lstrip('/')
    filepath = os.path.join(directory, clean_src.replace('/', os.sep))
    
    if os.path.exists(filepath):
        try:
            with Image.open(filepath) as img:
                return img.size # (width, height)
        except Exception:
            return None
    return None

def audit_html_files(directory):
    html_files = [f for f in os.listdir(directory) if f.endswith('.html')]
    report = {}

    for filename in html_files:
        if "lighthouse report" in filename.lower():
            continue
            
        filepath = os.path.join(directory, filename)
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                soup = BeautifulSoup(content, 'html.parser')
                
                issues = []
                
                # 1. Title
                if not soup.title or not soup.title.string:
                    issues.append("Missing <title> tag")
                
                # 2. Meta Description
                meta_desc = soup.find('meta', attrs={'name': 'description'})
                if not meta_desc or not meta_desc.get('content'):
                    issues.append("Missing <meta name='description'> tag")
                
                # 3. Alt tags and dimensions for images
                images = soup.find_all('img')
                for img in images:
                    src = img.get('src', '')
                    if not img.get('alt') and img.get('alt') != "":
                        issues.append(f"Image missing 'alt' tag: {src}")
                    
                    if not img.get('width') or not img.get('height'):
                        dims = get_image_dimensions(directory, src)
                        if dims:
                            issues.append(f"Image missing dimensions: {src} (Actual: {dims[0]}x{dims[1]})")
                        else:
                            issues.append(f"Image missing dimensions and file not found: {src}")
                
                # 4. Form labels
                inputs = soup.find_all(['input', 'textarea', 'select'])
                for inp in inputs:
                    if inp.get('type') in ['hidden', 'submit', 'button', 'checkbox', 'radio']:
                        # Checkboxes and radios need labels too but often handled differently
                        pass
                    if inp.get('type') in ['hidden', 'submit']:
                        continue
                        
                    inp_id = inp.get('id')
                    if not inp_id:
                        issues.append(f"Form input missing 'id': {inp.get('name', 'unnamed')}")
                        continue
                    label = soup.find('label', attrs={'for': inp_id})
                    if not label:
                        issues.append(f"Form input missing associated <label>: {inp_id}")
                
                # 5. Language attribute
                if not soup.html or not soup.html.get('lang'):
                    issues.append("Missing 'lang' attribute on <html>")

                # 6. Aria labels on buttons/links with no text
                interactive = soup.find_all(['button', 'a'])
                for item in interactive:
                    content_text = item.get_text(strip=True)
                    has_img_with_alt = item.find('img', alt=True)
                    has_aria = item.get('aria-label') or item.get('aria-labelledby')
                    
                    if not content_text and not has_img_with_alt and not has_aria:
                        issues.append(f"Interactive element missing accessible name: {item.name} {item.get('class')}")

                if issues:
                    report[filename] = issues
        except Exception as e:
            print(f"Error auditing {filename}: {e}")

    return report

if __name__ == "__main__":
    base_dir = r"c:\Users\soume\Downloads\Inbox\App Development\AUZA-Website"
    audit_results = audit_html_files(base_dir)
    
    with open('initial_audit_report.txt', 'w', encoding='utf-8') as f:
        for file, issues in audit_results.items():
            f.write(f"--- {file} ---\n")
            for issue in issues:
                f.write(f"- {issue}\n")
            f.write("\n")
    
    print(f"Audit complete. Results saved to initial_audit_report.txt")
