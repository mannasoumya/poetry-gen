import random
file_str=""
with open("Rupi Kaur - Milk and Honey-Andrews McMeel Publishing (2015).txt",'r',encoding='utf-8') as f:
    file_str = f.read()

f.close()

all_lines=file_str.split("\n")
for line in all_lines:
    if line== '\r':
        all_lines.remove(line)

print(all_lines)
# all_lines_str=""
# with open()
