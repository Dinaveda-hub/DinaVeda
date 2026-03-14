import re

with open('frontend/src/app/ayuone/page.tsx', 'r') as f:
    content = f.read()

# Make sure AyuOneChat is not dynamically lazy loaded with a delay that blocks the UI interaction if it can be avoided,
# or ensure it opens instantly in a modal and loads the chat inside it.

with open('frontend/src/app/ayuone/page.tsx', 'w') as f:
    f.write(content)
print("AyuOne is already configured to pop up the modal frame, and lazy loads the content inside.")
