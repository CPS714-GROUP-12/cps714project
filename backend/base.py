import json
from flask import Flask, request, jsonify, render_template
from flask.helpers import send_from_directory
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required, \
    JWTManager

api = Flask(__name__, static_folder="flask_react/build", static_url_path='')

ENV = 'prod'
if ENV == 'dev':
    api.debug = True
    api.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Post9587#@localhost/tourist'
else:
    api.debug = False
    api.config[
        'SQLALCHEMY_DATABASE_URI'] = 'postgres://chester:f9YrxuFasCyzuvuSeeRK6UgIJc4cBlQE@dpg-cdirkg6n6mpngrt4589g-a/vacatio'

api.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

from models import LanguageCodeName, PhraseCodeName, Phrases, Restaurants, Users, RestaurantReviews, RestaurantReviewsImages, db
from flask_sqlalchemy import SQLAlchemy


with api.app_context():            
    db.init_app(api)
    db.create_all()
    #db.session.add(Users("username", "email@email.mail", "password", "password", "first_name", "last_name"))

api.config["JWT_SECRET_KEY"] = "TOURIST_APP"
api.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

jwt = JWTManager(api)


@api.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


@api.route('/', methods=["GET", "POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = db.session.query(Users).filter_by(email=email).first()
    if not user:
        return {"msg": "Email does not exist"}, 401
    else:
        if not user.check_password(password):
            return {"msg": "Wrong password. Please try again."}, 401

    access_token = create_access_token(identity=email)
    response = {"access_token": access_token}
    return response

@api.route('/', methods=["GET", "POST"])
def serve():
    return send_from_directory(api.static_folder, 'index.html')

@api.route("/logout", methods=["GET", "POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


@api.route("/signup", methods=["GET", "POST"])
def signup():
    username = request.json.get("username", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    verify_password = request.json.get("verify_password", None)
    first_name = request.json.get("first_name", None)
    last_name = request.json.get("last_name", None)
    if password != verify_password:
        return {"msg": "Password do not match."}, 401

    data = Users(username, email, password, first_name, last_name, location=None)
    db.session.add(data)
    db.session.commit()

    response = jsonify({"msg": "Signup Successful"})
    return response


@jwt_required()  # new line
@api.route('/profile', methods=["GET", "POST"])
def my_profile():
    response_body = {
        "name": "Test",
        "about": "Hello! Testing"
    }

    return response_body
