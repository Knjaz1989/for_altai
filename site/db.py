import os
from pymongo import MongoClient


# Init DB
login = os.getenv('MONGO_INITDB_ROOT_USERNAME')
password = os.getenv('MONGO_INITDB_ROOT_PASSWORD')
client = MongoClient(f"mongodb://{login}:{password}@db:27017")
db = client['altai']

if not db.site_data.find_one():
    db.site_data.insert_one({
        'static_phone': os.getenv('STATIC_PHONE'),
        'mobile_phone': os.getenv('MOBILE_PHONE'),
        'whatsapp': os.getenv('WHATSAPP'), 'telegramm': os.getenv('TELEGRAMM'),
        'mail': os.getenv('MAIL'), 'address': os.getenv('ADDRESS')
    })


async def get_data():
    db_data = db['site_data'].find_one()
    return db_data


async def save_data(request_data):
    # db['site_data'].update_one({'static_phone': '73852243947'}, {'$set': {'static_phone': '1'}})
    db_data = db['site_data']
