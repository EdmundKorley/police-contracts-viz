import csv
import json

def dataByState(data):
    new = {}
    for item in data:
        state = item['Contract City/State']
        state = state.strip()
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
        new[int(id)] = item
    return new

def dataByProvisions(data):
    new = {}
    for item in data:
        coding = item['General Coding']
        sign = new.get(coding, None)
        if sign is None:
            new[coding] = [item]
        else:
            sign.append(item)
            new[coding] = sign
    return new

with open('data/content.csv') as csvFile:
    data = list(csv.DictReader(csvFile))
    for item in data:
        item.pop('', None)
    newData = dataByState(data)
    uniqData = dataByUniq(data)
    provData = dataByProvisions(data)
    with open('app/components/utils/rehash.json', 'w') as f:
        json.dump(newData, f, ensure_ascii=False, indent = 2, separators=(',', ': '))
    with open('app/components/utils/directory.json', 'w') as f:
        json.dump(uniqData, f, ensure_ascii=False, indent = 2, separators=(',', ': '))
    with open('app/components/utils/provisions.json', 'w') as f:
        json.dump(provData, f, ensure_ascii=False, indent = 2, separators=(',', ': '))
