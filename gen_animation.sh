#!/bin/bash

ROWS=$1
COLS=$2
FRAMES=$3
DURATION=$4

# echo "$ROWS $COLS $FRAMES" >&2

if [ -z "$ROWS" ] || [ -z "$COLS" ] || [ -z "$FRAMES" ]
then
  echo "Usage: $0 ROWS COLUMNS FRAMES [DURATION]"
  echo "For Water this is 6 8 8"
  echo "For Waterfalls this is 6 8 4"
  echo "to generate nice looking json pipe output to \"jq .\" or \"jq -c .\" for compact output. This also checks the generated json for errors."
  exit 1
fi

if [ -z "$DURATION" ]; then
  DURATION=200 
fi

echo "["

for row in $( seq 0 $(($ROWS-1)) ); do
for col in $( seq 0 $(($COLS-1)) ); do

    ((TILE=$row*$COLS*$FRAMES + $col))
    echo "{ \"animation\":["
    for frame in $(seq 0 $COLS $(( ($FRAMES-1)*$COLS )) ); do
        echo -n "{ \"duration\":${DURATION}, \"tileid\":$(($frame + $TILE)) }"
        if [ $frame -ne $(( ($FRAMES-1)*$COLS )) ]; then
            echo ","
        fi
    done
    echo -n "], \"id\":${TILE}}"
    
    if [ $row -ne $(($ROWS-1)) ] || [ $col -ne $(($COLS-1)) ]; then
        echo ","
        else 
        echo "]"
    fi
    
done
done

