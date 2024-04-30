import os
import glob
import json
# quick scfipt to create a map of weather code to image
map = dict()

for i in glob.glob('./public/png/*.png'):
    code = os.path.basename(i.split('_')[0][:-1])
    if code not in map:
        map[code] = '/'.join(i.split('/')[2:])

json.dump(map, open('./assets/weatherCodeImage.json', 'w'))
