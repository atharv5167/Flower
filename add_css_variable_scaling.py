import re
import os

files = [
    'c:/Users/athar/OneDrive/Documents/flower/dist/style.css',
    'c:/Users/athar/OneDrive/Documents/flower/dist/index.html'
]

def add_calc_wrapper(match):
    val = match.group(1)
    # Check if already wrapped (simple heuristic)
    # But since I know the state, I assume it's like "8.0s"
    return f"calc({val}s * var(--speed-scale, 1))"

for file_path in files:
    if not os.path.exists(file_path):
        continue
        
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Regex to find time values: number followed by 's'
    # We want to avoid matching inside existing calcs if possible, but
    # current files shouldn't have them.
    # We also want to avoid matching things like "class names" but CSS classes usually don't start with numbers.
    # The previous script produced "8.0s".
    
    # Match: (digits.digits)s
    # Lookbehind for non-word char to ensure we don't match "frames" or something?
    # Spec: number followed by s.
    
    # Note: style.css has properties like "animation: name 8.0s ..."
    # index.html has style="--d:9.6s"
    
    # We use a pattern that finds the number and 's'.
    pattern = r'(\d*\.?\d+)s'
    
    # We need to be careful not to replace "s" in "class" or "transition".
    # But those don't have preceding numbers usually.
    # Exception: "3d". But unit is 's'.
    
    new_content = re.sub(pattern, add_calc_wrapper, content)
    
    with open(file_path, 'w') as f:
        f.write(new_content)
    
    print(f"Updated {file_path}")
