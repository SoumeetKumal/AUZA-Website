import os
import re

directory = r'c:\Users\soume\Downloads\Inbox\App Development\AUZA-Website'
banner_script = '<script src="js/banner.js" defer></script>'

# Regex to match the banner. 
# Matches <a ... class="announcement-banner" ...> ... </a>
# We use re.DOTALL to match across lines.
banner_pattern = re.compile(r'<a\s+[^>]*class="announcement-banner"[^>]*>.*?</a>', re.DOTALL | re.IGNORECASE)

updated_files = []

for filename in os.listdir(directory):
    if filename.endswith(".html"):
        filepath = os.path.join(directory, filename)
        
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Check if banner exists
            if banner_pattern.search(content):
                new_content = banner_pattern.sub(banner_script, content)
                
                # Write back only if changed
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    updated_files.append(filename)
                    print(f"Updated: {filename}")
            else:
                print(f"Skipped (no banner found): {filename}")
                
        except Exception as e:
            print(f"Error processing {filename}: {e}")

print(f"\nTotal files updated: {len(updated_files)}")
