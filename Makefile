build:
	docker build -t youtube-banner-updater .
	# docker tag youtube-banner-updater chaserensberger/youtube-banner-updater:latest
	# docker push chaserensberger/youtube-banner-updater:latest
	#
run:
	docker run -d -p 3002:8000 youtube-banner-updater
