# netology-translation-agency

Репозиторий для сайта проекта "Алтайская ассоциация переводчиков"

### Клонирование репозитория, запуск контейнера и удаление ненужных файлов

```c
git clone git@github.com:CrowMEV/netology-translation-agency.git app
cd app
docker build -t altai .
docker run -it -d -p 80:80 --name=altai --restart=always altai
```
