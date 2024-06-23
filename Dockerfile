FROM nikolaik/python-nodejs:python3.12-nodejs22

WORKDIR /app

COPY . .

RUN npm install

RUN pip3 install -r requirements.txt

RUN apt-get update && apt-get install -y jq

RUN crontab -l | { cat; echo "*/30 * * * * /bin/bash /app/execute.sh >> /var/log/cron.log 2>&1"; } | crontab -

CMD ["cron", "-f"]