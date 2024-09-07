FROM nikolaik/python-nodejs:python3.12-nodejs22

WORKDIR /app

COPY . .

COPY Arial.ttf /usr/share/fonts/truetype/Arial.ttf

RUN apt-get update && apt-get install -y jq libcairo2-dev libpango1.0-dev libgif-dev fontconfig

RUN npm install

RUN npm rebuild canvas

RUN pip3 install -r requirements.txt

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]


