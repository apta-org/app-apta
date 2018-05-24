#!/bin/bash

source "${BASH_SOURCE%/*}/flow-env.sh"

set -e -x

# if a version is pased in via a release and not already set,
# set this for flow to manually version
if [[ -z ${VERSION} && -f ../release/tag ]]; then
  export VERSION="-v `cat ../release/tag`"
fi

flow tracker $VERSION label-release $ENVIRONMENT
