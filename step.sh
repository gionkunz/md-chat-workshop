#!/bin/bash

if [ `git branch | sed -n '/\* /s///p'` != "workshop" ]; then
  git checkout -b workshop
fi

if [ "$2" = "-save" ]; then
  git add .
  git commit -m "My changes for step-$1"
else
  git checkout .
fi

git rebase step-$1
