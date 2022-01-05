#!/bin/bash

# author: family boat

# history

### release 1.0.0
### 2021-12-31 17::16 +8000
### create basic skeleton of PWA project

SHELL_NAME="CreatePwaApp ====>>"

if [ "$#" -ne 1 ]; then
  echo "${SHELL_NAME} usage: $0 directory" >&2
  exit 1
fi

if ! [ -d "$1" ]; then
  echo "${SHELL_NAME} create $1"
  mkdir $1
  if [ "$?" -ne 0 ]; then
    echo "${SHELL_NAME} couldnt create multi level directory $1" >&2
    exit 1
  fi
fi

DIRS=("data" "fonts" "icons" "img")
FILES=("app.js" "index.html" "$1.webmanifest" "style.css" "sw.js")

cd $1

for dir in "${DIRS[@]}"; do
  mkdir ${dir}
done

for file in "${FILES[@]}"; do
  touch ${file}
done

echo "${SHELL_NAME} done..."
exit 0