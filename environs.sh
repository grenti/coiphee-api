#!/bin/bash
filename=
environment=

if [ $1 == "" ]; then
  echo "Please pass in an environment"
else
  case $1 in
    development ) environment=$1
                  ;;
    staging )     environment=$1
                  ;;
    production )  environment=$1
                  ;;
    * )           echo "Please enter a valid environment"
                  exit 1
  esac
fi

echo "Reading environment variables for $environment"
filename="./src/config/environments/.$environment.env"
echo "Filename: $filename"

while read line; do 
  export "$line";
done <"$filename"

echo "Finished loading environment variables for coiphee"
