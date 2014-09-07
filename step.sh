#!/bin/bash

if [ `git branch | sed -n '/\* /s///p'` != "workshop" ]; then
  git checkout -b workshop
fi

git add .
git commit -m "My changes for step-$1"
git rebase step-$1
