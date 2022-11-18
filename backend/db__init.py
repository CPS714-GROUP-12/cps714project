from flask import Flask
from flask_sqlalchemy import SQLAlchemy
#from flask.helpers import send_from_directory
#from datetime import datetime, timedelta, timezone
#from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required, \JWTManager

api = Flask(__name__, static_folder="flask_react/build", static_url_path='')

ENV = 'prod'
if ENV == 'dev':
    api.debug = True
    api.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Post9587#@localhost/tourist'
else:
    api.debug = False
    api.config[
        'SQLALCHEMY_DATABASE_URI'] = 'postgresql://chester:f9YrxuFasCyzuvuSeeRK6UgIJc4cBlQE@dpg-cdirkg6n6mpngrt4589g-a.oregon-postgres.render.com/vacatio'
    #     internal_uri = "postgresql://chester:f9YrxuFasCyzuvuSeeRK6UgIJc4cBlQE@dpg-cdirkg6n6mpngrt4589g-a/vacatio"
    
    #       connecting render db to pgadmin4:
    #       go to dashboard tab, add new server
    #       name it whatever you want in general tab
    #       go to connection tab:
    #           hostname:               dpg-cdirkg6n6mpngrt4589g-a.oregon-postgres.render.com
    #           maintanace database:    vacatio
    #           username:               chester (will change later to cps714)
    #           password:               f9YrxuFasCyzuvuSeeRK6UgIJc4cBlQE
    #       save 
api.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(api)