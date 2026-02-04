import re

file_path = 'c:/Users/athar/OneDrive/Documents/flower/dist/style.css'

def multiply_time(match):
    value = float(match.group(1))
    new_value = value * 2
    return f"{new_value}s"

with open(file_path, 'r') as f:
    content = f.read()

# Regex to valid CSS numbers ending with 's' (seconds)
# Captures the number part in group 1.
# Matches: 4s, 0.8s, 1.2s, .5s (if valid CSS, though usually 0.5s)
# The file seems to use standard notation like 4s, 0.8s.
new_content = re.sub(r'(\d*\.?\d+)s', multiply_time, content)

with open(file_path, 'w') as f:
    f.write(new_content)

print("Updated style.css with doubled duration values.")
