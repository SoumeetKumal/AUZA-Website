import os
import re

def update_html_fonts():
    # Regex to find preconnects to Google Fonts
    preconnect_pattern = re.compile(r'\s*<link rel="preconnect" href="https://fonts\.(googleapis|gstatic)\.com".*?>', re.IGNORECASE)
    
    # Regex to find the Font Stylesheet
    font_css_pattern = re.compile(r'\s*<link href="https://fonts\.googleapis\.com/css2\?family=Inter:.*?".*?>', re.IGNORECASE)
    
    # Regex to find our new modular css block to insert before
    # We look for the start of modular css block we added previously
    modular_css_start_pattern = re.compile(r'<!-- Modular CSS -->')

    for filename in os.listdir('.'):
        if filename.endswith('.html') and not filename.endswith('report.html'):
            print(f"Processing {filename}...")
            with open(filename, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Remove Google Fonts links
            new_content = preconnect_pattern.sub('', content)
            new_content = font_css_pattern.sub('', new_content)
            
            # Insert local fonts link if not present
            if 'href="css/fonts.css"' not in new_content:
                if modular_css_start_pattern.search(new_content):
                    # Insert before Modular CSS comment
                    replacement = '  <!-- Local Fonts -->\n  <link rel="stylesheet" href="css/fonts.css">\n\n  <!-- Modular CSS -->'
                    new_content = modular_css_start_pattern.sub(replacement, new_content)
                elif '<head>' in new_content:
                    # Fallback: insert after <head>
                    new_content = new_content.replace('<head>', '<head>\n  <link rel="stylesheet" href="css/fonts.css">')
            
            if new_content != content:
                print(f"  Updated fonts in {filename}")
                with open(filename, 'w', encoding='utf-8') as f:
                    f.write(new_content)
            else:
                print(f"  No changes needed for {filename}")

if __name__ == "__main__":
    update_html_fonts()
