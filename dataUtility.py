import csv
import json

def dataByState(data):
    new = {}
    for item in data:
        state = item['Contract City/State']
        coding = item['General Coding']
        sign = new.get(state, None)
        if sign is None:
            new[state] = [item]
        else:
            sign.append(item)
            new[state] = sign
    return new

def dataByUniq(data):
    new = {}
    for item in data:
        id = item['Unique identifier']
        new[id] = item
    return new

with open('data/content.csv') as csvFile:
    data = list(csv.DictReader(csvFile))
    for item in data:
        item.pop('', None)
    newData = dataByState(data)
    uniqData = dataByUniq(data)
    with open('app/components/rehash.json', 'w') as f:
        json.dump(newData, f, ensure_ascii=False)
    with open('app/components/directory.json', 'w') as f:
        json.dump(uniqData, f, ensure_ascii=False)
