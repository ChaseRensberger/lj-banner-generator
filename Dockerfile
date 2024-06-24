FROM nikolaik/python-nodejs:python3.12-nodejs22

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y cron jq libcairo2-dev libpango1.0-dev libgif-dev

RUN npm install

RUN pip3 install -r requirements.txt

RUN crontab -l | { cat; echo "*/30 * * * * /bin/bash /app/execute.sh >> /var/log/cron.log 2>&1"; } | crontab -
CMD ["cron", "-f"]
