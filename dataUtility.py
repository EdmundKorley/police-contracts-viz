import csv
import json

with open('data/content.csv') as csvFile:
    data = list(csv.DictReader(csvFile))
    for item in data:
        item.pop('', None)
    json.dump(data, open('raw/content.json', 'wb'))
