#!/bin/bash

LUKEJ_CHANNEL_ID=$(jq -r '.lukej_channel_id' meta.json)
TARGET_CHANNEL_ID=$(jq -r '.target_channel_id' meta.json)

LUKEJ_SUBSCRIBERS=$(python3 lukej_subscriber_finder.py)
if [ $? -eq 0 ]; then
    echo "lukej_subscriber_finder.py completed successfully. Found $LUKEJ_SUBSCRIBERS subscribers."
else
    echo "lukej_subscriber_finder.py failed"
    exit 1
fi

TARGET_SUBSCRIBERS=$(python3 subscriber_finder.py $TARGET_CHANNEL_ID)
if [ $? -eq 0 ]; then
    echo "subscriber_finder.py completed successfully. Found $TARGET_SUBSCRIBERS subscribers."
else
    echo "subscriber_finder.py failed"
    exit 1
fi

node banner_generator.js $LUKEJ_SUBSCRIBERS $TARGET_SUBSCRIBERS
if [ $? -eq 0 ]; then
    echo "banner_generator.js completed successfully"
else
    echo "banner_generator.js failed"
    exit 1
fi

# python3 banner_updater.py $LUKEJ_CHANNEL_ID
# if [ $? -eq 0 ]; then
#     echo "banner_updater.py completed successfully"
# else
#     echo "banner_updater.py failed"
#     exit 1
# fi

# # Update meta data last

# # Update sub counts
# jq --arg lukej_subs "$LUKEJ_SUBSCRIBERS" --arg target_subs "$TARGET_SUBSCRIBERS" \
#    '.lukej_subscribers = ($lukej_subs | tonumber) | .target_subscribers = ($target_subs | tonumber)' \
#    meta.json > temp.json && mv temp.json meta.json

# # Update last execution time
# jq '.last_executed = (now | strftime("%Y-%m-%d %H:%M:%S"))' meta.json > temp.json && mv temp.json meta.json

# # Increment execution count
# jq '.executions += 1' meta.json > temp.json && mv temp.json meta.json

# echo "Banner update completed successfully"