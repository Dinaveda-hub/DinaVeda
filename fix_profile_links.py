import re

with open('frontend/src/app/profile/page.tsx', 'r') as f:
    content = f.read()

# Make sure prefetch is true for standard Link
# Next.js defaults to true but sometimes it helps to explicitly add it if there's custom behavior.
content = content.replace("const props = item.link ? { href: item.link } :", "const props = item.link ? { href: item.link, prefetch: true } :")

with open('frontend/src/app/profile/page.tsx', 'w') as f:
    f.write(content)
print("Updated frontend/src/app/profile/page.tsx")
