FROM nikolaik/python-nodejs:python3.12-nodejs22

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y cron jq chromium

# RUN groupadd -r appuser && useradd -r -g appuser -G audio,video appuser \
#     && mkdir -p /home/appuser && chown -R appuser:appuser /home/appuser \
#     && chown -R appuser:appuser /app

# USER appuser

RUN npm install

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

RUN pip3 install -r requirements.txt

# RUN crontab -l | { cat; echo "*/30 * * * * /bin/bash /app/execute.sh >> /var/log/cron.log 2>&1"; } | crontab -
# CMD ["cron", "-f"]
