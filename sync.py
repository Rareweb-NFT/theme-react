import requests
import json
import subprocess
import os
import sys
import re

data = json.loads(requests.get('https://app.promisapp.com/files/rareweb-theme-react-l626zwf1-latest.js').text)

subprocess.call('rm -rf ./src/cmps',shell=True)

match = None
if len(sys.argv)>1:
  match = sys.argv[1].replace("'",'')

for k,v in data.items():
  fname = f"./src/cmps/{k}"
  if not match or k.startswith(match):
    print(k)

    os.makedirs(os.path.dirname(fname), exist_ok=True)
    with open(fname,'w') as f:
      f.write(v)