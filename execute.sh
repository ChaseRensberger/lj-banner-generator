#!/bin/bash

python3 subscriber_difference_finder.py
if [ $? -eq 0 ]; then
    echo "subscriber_difference_finder.py completed successfully"
    # Update meta.json here
else
    echo "subscriber_difference_finder.py failed"
    exit 1
fi

node banner_generator.js
if [ $? -eq 0 ]; then
    echo "banner_generator.js completed successfully"
    # Perform banner update here
else
    echo "banner_generator.js failed"
    exit 1
fi

# Perform banner update
# Add your banner update logic here

echo "Banner update completed successfully"