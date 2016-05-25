# U.S. Police Contracts
An interactive brief on problematic language in U.S. police contracts

To build this project, have [nodejs](https://nodejs.org) and [python3](https://www.python.org/download/releases/3.0/) installed.

First clone this project and change into the project directory:

`git clone https://github.com/emkk/police-contracts-viz.git && cd police-contracts-viz/`

Install needed dependencies (react, babel, grunt, etc):

`npm install`

Build app in one bash session (which runs grunt, which in turn runs other build tools)

`npm run build`

Serve app in another session (with http-server)

`npm run serve`

Visit app at [localhost](http://localhost:8080)

To update content.csv (the dataset of police contracts) just replace it with new file of same name and run:

`python3 dataUtility.py`
