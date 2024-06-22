#!/bin/bash

LUKEJ_SUBS=$(python3 lukej_subscriber_finder.py)
if [ $? -eq 0 ]; then
    echo "lukej_subscriber_finder.py completed successfully. Found $LUKEJ_SUBS subscribers."
else
    echo "lukej_subscriber_finder.py failed"
    exit 1
fi

TARGET_SUBS=$(python3 subscriber_finder.py UCLAXVftO2nhgTcnJrgdijDw)
if [ $? -eq 0 ]; then
    echo "subscriber_finder.py completed successfully. Found $TARGET_SUBS subscribers."
else
    echo "subscriber_finder.py failed"
    exit 1
fi

node banner-generator.js $LUKEJ_SUBS $TARGET_SUBS
if [ $? -eq 0 ]; then
    echo "banner_generator.js completed successfully"
else
    echo "banner_generator.js failed"
    exit 1
fi

python3 banner-updater.py UCYzV77unbAR8KiIoSm4zdUw
if [ $? -eq 0 ]; then
    echo "banner_updater.py completed successfully"
else
    echo "banner_updater.py failed"
    exit 1
fi

echo "Banner update completed successfully"