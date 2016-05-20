import csv
import json

def dataByState(data):
    new = {}
    for item in data:
        state = item['Contract City/State']
        sign = new.get(state, None)
        if sign is None:
            new[state] = []
        else:
            sign.append(item)
            new[state] = sign
    return new

with open('data/content.csv') as csvFile:
    data = list(csv.DictReader(csvFile))
    for item in data:
        item.pop('', None)
    newData = dataByState(data)
    with open('app/components/rehash.json', 'w') as f:
        json.dump(newData, f, ensure_ascii=False)
