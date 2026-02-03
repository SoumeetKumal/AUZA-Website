import os
from bs4 import BeautifulSoup
from PIL import Image

def get_image_dimensions(directory, src):
    if src.startswith('http') or src.startswith('data:'):
        return None
    
    clean_src = src.lstrip('/')
    filepath = os.path.join(directory, clean_src.replace('/', os.sep))
    
    if os.path.exists(filepath):
        try:
            with Image.open(filepath) as img:
                return img.size # (width, height)
        except Exception:
            return None
    return None

def audit_images(directory):
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
                images = soup.find_all('img')
                for img in images:
                    src = img.get('src', '')
                    alt = img.get('alt')
                    width = img.get('width')
                    height = img.get('height')
                    loading = img.get('loading')
                    decoding = img.get('decoding')
                    
                    img_id = f"{src} in {filename}"
                    
                    # 1. Alt tag
                    if alt is None:
                        issues.append(f"MISSING ALT: {src}")
                    
                    # 2. Dimensions
                    if not width or not height:
                        dims = get_image_dimensions(directory, src)
                        if dims:
                            issues.append(f"MISSING DIMENSIONS: {src} (Actual: {dims[0]}x{dims[1]})")
                        else:
                            issues.append(f"MISSING DIMENSIONS & FILE NOT FOUND: {src}")
                    
                    # 3. Loading='lazy'
                    # Usually hero images shouldn't be lazy, but most others should. 
                    # For a simple audit, we just flag if it's missing.
                    if not loading:
                        issues.append(f"MISSING LOADING: {src}")
                        
                    # 4. Decoding='async'
                    if not decoding:
                        issues.append(f"MISSING DECODING: {src}")
                        
                    # 5. Format check (suggest WebP)
                    if not src.lower().endswith('.webp') and not src.lower().endswith('.svg'):
                        issues.append(f"NON-WEBP FORMAT: {src}")

                if issues:
                    report[filename] = issues
        except Exception as e:
            print(f"Error auditing {filename}: {e}")

    return report

if __name__ == "__main__":
    base_dir = os.getcwd()
    results = audit_images(base_dir)
    
    with open('enhanced_audit_report.txt', 'w', encoding='utf-8') as f:
        for file, file_issues in results.items():
            f.write(f"=== {file} ===\n")
            for issue in file_issues:
                f.write(f"- {issue}\n")
            f.write("\n")
    
    print(f"Enhanced audit complete. Results saved to enhanced_audit_report.txt")
