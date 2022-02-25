# This is Knox's version of the repo

This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).

### First

Navigate to the app2/ directory from your CLI, then run `yarn install`

This installs all the dependencies

### Navigate

app2/node_modules/@gemworks/gem-farm-ts/package.json

### Add this to package.json

"browser": {\
 "fs": false,\
 "path": false,\
 "os": false\
 },

Weirdly, the @gemworks dependency has its own dependencies which includes the
'fs' module. Thing is, that module doesn't work in react. So we have to tell our
browser to ignore it.

### Navigate

app2/node_modules/@gemworks/gem-farm-ts/node_modules/@project-serum/anchor/package.json

### Add this to package.json

"browser": {\
 "fs": false,\
 "path": false,\
 "os": false\
 },

Same deal as before

### NAVIGATE

app2/.env

### SET FARM ID AND CREATOR ID

example:\
farm_id=farmABC1233...XZY789\
creator_id=creaABC123...XYZ789\
creator_id2=<IF YOU USE A SECOND CANDY MACHINE, THAT FIRST CREATOR ID HERE>\
creator_id3=<IF YOU USE A SECOND CANDY MACHINE, THAT FIRST CREATOR ID HERE>

### NAVIGATE

back to app2/

### RUN

`yarn start`
