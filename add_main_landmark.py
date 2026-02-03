import os
import re

def add_main_landmark():
    # Matches app-header and app-footer
    header_pattern = re.compile(r'(<app-header.*?</app-header>)', re.DOTALL | re.IGNORECASE)
    footer_pattern = re.compile(r'(<app-footer.*?</app-footer>)', re.DOTALL | re.IGNORECASE)
    
    # Fallback for files without components: wrap body content
    # Start of body to end of body
    body_start_pattern = re.compile(r'(<body.*?>)', re.IGNORECASE)
    body_end_pattern = re.compile(r'(</body>)', re.IGNORECASE)
    
    # Skip list (scripts at start of body)
    script_start_pattern = re.compile(r'(\s*<script.*?</script>)', re.DOTALL | re.IGNORECASE)

    for filename in os.listdir('.'):
        if filename.endswith('.html') and not filename.endswith('report.html'):
            with open(filename, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if '<main' in content:
                print(f"Skipping {filename} - <main> already exists")
                continue

            print(f"Processing {filename}...")
            
            # Logic A: Files with app-header and app-footer
            has_header = header_pattern.search(content)
            has_footer = footer_pattern.search(content)
            
            if has_header and has_footer:
                parts_header = header_pattern.split(content, 1)
                pre_header = parts_header[0]
                header_tag = parts_header[1]
                post_header = parts_header[2]
                
                parts_footer = footer_pattern.split(post_header, 1)
                main_content = parts_footer[0]
                footer_tag = parts_footer[1]
                post_footer = parts_footer[2]
                
                new_content = f"{pre_header}{header_tag}\n  <main id=\"main-content\">\n{main_content}  </main>\n{footer_tag}{post_footer}"
                with open(filename, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"  A: Added <main> between components in {filename}")
                continue

            # Logic B: Fallback - Wrap body content
            parts_body = body_start_pattern.split(content, 1)
            if len(parts_body) == 3:
                pre_body = parts_body[0]
                body_tag = parts_body[1]
                post_body = parts_body[2]
                
                parts_body_end = body_end_pattern.split(post_body, 1)
                if len(parts_body_end) == 3:
                    inner_body = parts_body_end[0]
                    body_end_tag = parts_body_end[1]
                    post_body_end = parts_body_end[2]
                    
                    # Handle leading background grid or scripts in body
                    # Find first real tag that isn't script or grid-bg div
                    
                    new_inner = f"\n  <main id=\"main-content\">\n{inner_body}  </main>\n"
                    
                    new_content = f"{pre_body}{body_tag}{new_inner}{body_end_tag}{post_body_end}"
                    with open(filename, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"  B: Wrapped body content in {filename}")
                else:
                    print(f"  Could not find </body> in {filename}")
            else:
                print(f"  Could not find <body ...> in {filename}")

if __name__ == "__main__":
    add_main_landmark()
