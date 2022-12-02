from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
from db__init import db


class LanguageCodeName(db.Model):
    __tablename__ = 'language_code_name'
    language_code = db.Column(db.Integer(), primary_key=True)
    language_name = db.Column(db.String(32), nullable=False, unique=True)

    def __init__(self, language_name):
        self.language_name = language_name

    def save(self):
        db.session.add(self)
        db.session.commit()


#add languages here
# languages = [

#     LanguageCodeName("English"),
#     LanguageCodeName("Mandarin"),
#     LanguageCodeName("Hindi"),
#     LanguageCodeName("Spanish"),
#     LanguageCodeName("French"),
#     LanguageCodeName("Arabic"),
#     LanguageCodeName("Russian"),

# ];  db.session.bulk_save_objects(languages); db.session.commit;

class PhraseCodeName(db.Model):
    __tablename__ = 'phrase_code_name'
    phrase_code = db.Column(db.Integer(), primary_key=True)
    eng_phrase = db.Column(db.String(500), nullable=False, unique=True)

    def __init__(self, eng_phrase):
        self.eng_phrase = eng_phrase

    def save(self):
        db.session.add(self)
        db.session.commit()

    # def check_jwt_auth_active(self):
    #     return self.jwt_auth_active

    # def set_jwt_auth_active(self, set_status):
    #     self.jwt_auth_active = set_status

    # @classmethod
    # def get_by_id(cls, id):
    #     return cls.query.get_or_404(id)

    def toDICT(self):

        cls_dict = {}
        cls_dict['phrase_code'] = self.phrase_code
        cls_dict['eng_phrase'] = self.eng_phrase

        return cls_dict

    def toJSON(self):
        return self.toDICT()
#add common phrases in english
# 1. Do you speak English?
# 2. My name is __________.
# 3. Can you speak more slowly?
# 4. Where can I find a bus/taxi?
# 5. Where can I find a train/metro?
# 6. Can you take me to the airport please?
# 7. How much does this cost?
# 8. Do you take credit cards?
# 9. Where is the nearest bathroom?
# 10. Where can I get something to eat?
# 11. Can you show me on a map how to get there?
# 12. Will you write that down for me?
# 13. I need help.
# 14. I’m lost.
# 15. I am an American citizen.
# 16. Please call the American Embassy.
# 17. Please call the police.
# 18. I need a doctor.


class Phrases(db.Model):
    __tablename__ = 'phrases'
    phrase_id = db.Column(db.Integer(), primary_key=True)
    phrase_code = db.Column(db.Integer(), db.ForeignKey("phrase_code_name.phrase_code", ondelete="CASCADE"))
    language_code = db.Column(db.Integer(), db.ForeignKey("language_code_name.language_code", ondelete="CASCADE"))
    user_id = db.Column(db.Integer(),nullable=True)
    phrase_translated = db.Column(db.String(500), nullable=False, unique=True)

    def __init__(self, phrase_code, language_code, phrase_translated, user_id=None):
        self.phrase_code = phrase_code
        self.language_code = language_code
        self.user_id = user_id
        self.phrase_translated = phrase_translated

    def save(self):
        db.session.add(self)
        db.session.commit()

    def check_jwt_auth_active(self):
        return self.jwt_auth_active

    def set_jwt_auth_active(self, set_status):
        self.jwt_auth_active = set_status

    # @classmethod
    # def get_by_id(cls, id):
    #     return cls.query.get_or_404(id)

    def toDICT(self):

        cls_dict = {}
        cls_dict['phrase_id'] = self.phrase_id
        cls_dict['phrase_code'] = self.phrase_code
        cls_dict['language_code'] = self.language_code
        cls_dict['phrase_translated'] = self.phrase_translated

        return cls_dict

    def toJSON(self):

        return self.toDICT()


class Restaurants(db.Model):
    __tablename__ = 'restaurants'
    restaurant_id = db.Column(db.Integer(), primary_key=True)
    restaurant_name = db.Column(db.String(50), nullable=False)
    restaurant_location = db.Column(db.String(50), nullable=False)
    language_code = db.Column(db.Integer(), db.ForeignKey("language_code_name.language_code", ondelete="CASCADE"))

    def __init__(self, restaurant_name, restaurant_location, language_code):
        self.restaurant_name = restaurant_name
        self.restaurant_location = restaurant_location
        self.language_code = language_code

    def save(self):
        db.session.add(self)
        db.session.commit()

    def check_jwt_auth_active(self):
        return self.jwt_auth_active

    def set_jwt_auth_active(self, set_status):
        self.jwt_auth_active = set_status

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get_or_404(id)

    def toDICT(self):

        cls_dict = {}
        cls_dict['restaurant_id'] = self.restaurant_id
        cls_dict['restaurant_name'] = self.restaurant_name
        cls_dict['language_code'] = self.language_code

        return cls_dict

    def toJSON(self):

        return self.toDICT()

class Users(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(32), nullable=False)
    email = db.Column(db.String(64), nullable=False)
    password = db.Column(db.Text(), nullable=False)
    first_name = db.Column(db.String(32), nullable=False)
    last_name = db.Column(db.String(32), nullable=False)
    location = db.Column(db.String(32), nullable=True)#change to foreign key to address table
    salt = db.Column(db.String(10), nullable=True)#change to not null
    home_country = db.Column(db.String(50), nullable=True)
    user_location = db.Column(db.String(50), nullable=True)
    profile_picture_path = db.Column(db.String(255), nullable=True)
    language_code = db.Column(db.Integer(), db.ForeignKey("language_code_name.language_code", ondelete="CASCADE"))
    created_on = db.Column(db.DateTime(timezone=True), server_default=func.now())       #https://stackoverflow.com/questions/13370317/sqlalchemy-default-datetime
    last_login = db.Column(db.DateTime(), nullable=True)
    profile_picture_flag = db.Column(db.String(1), default="Y")


    def __init__(self, username, email, password, first_name, last_name, location= None):
        # self.user_id=user_id
        self.username = username
        self.email = email
        self.password = password
        self.first_name = first_name
        self.last_name = last_name
        self.location = location
        #initialize other variables here

    def save(self):
        db.session.add(self)
        db.session.commit()

    def set_password(self, password):
        self.password = password

    def check_password(self, password):
        return self.password == password

    def update_email(self, new_email):
        self.email = new_email

    def update_username(self, new_username):
        self.username = new_username

    def check_jwt_auth_active(self):
        return self.jwt_auth_active

    def set_jwt_auth_active(self, set_status):
        self.jwt_auth_active = set_status

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get_or_404(id)

    @classmethod
    def get_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    def toDICT(self):

        cls_dict = {}
        cls_dict['user_id'] = self.user_id
        cls_dict['username'] = self.username
        cls_dict['email'] = self.email
        cls_dict['first_name'] = self.first_name
        cls_dict['last_name'] = self.last_name
        cls_dict['location'] = self.location

        return cls_dict

    def toJSON(self):

        return self.toDICT()


class RestaurantReviews(db.Model):
    __tablename__ = 'restaurant_reviews'
    review_id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey("users.user_id", ondelete="CASCADE"))
    restaurant_id = db.Column(db.Integer(), db.ForeignKey("restaurants.restaurant_id", ondelete="CASCADE"))
    rating = db.Column(db.Float(), default=None)
    review_header = db.Column(db.String(100), nullable=False)
    review_body = db.Column(db.String(1000), nullable=False)

    def __init__(self, user_id, restaurant_id, review_header, review_body, rating=None):
        self.user_id =          user_id
        self.restaurant_id =    restaurant_id
        self.rating =           rating
        self.review_header =    review_header
        self.review_body =      review_body

    def save(self):
        db.session.add(self)
        db.session.commit()

    def set_review_header(self, review_header):
        self.review_header = review_header
    
    def set_review_body(self, review_body):
        self.review_body = review_body

    def set_rating(self, rating):
        self.rating = rating

    def check_jwt_auth_active(self):
        return self.jwt_auth_active

    def set_jwt_auth_active(self, set_status):
        self.jwt_auth_active = set_status

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get_or_404(id)

    def toDICT(self):

        cls_dict = {}
        cls_dict['review_id'] = self.review_id
        cls_dict['restaurant_id'] = self.restaurant_id
        cls_dict['user_id'] = self.user_id
        cls_dict['rating'] = self.rating
        cls_dict['review_header'] = self.review_header
        cls_dict['location'] = self.review_body

        return cls_dict

    def toJSON(self):

        return self.toDICT()


class RestaurantReviewsImages(db.Model):
    __tablename__ = 'restaurant_reviews_images'
    image_id = db.Column(db.Integer(), primary_key=True)
    review_id = db.Column(db.Integer(), db.ForeignKey("restaurant_reviews.review_id", ondelete="CASCADE"), nullable=False)
    image_path = db.Column(db.String(255), nullable=False)

    def __init__(self, review_id, image_path):
        self.review_id =        review_id
        self.image_path =    image_path

    def save(self):
        db.session.add(self)
        db.session.commit()

    def set_image_path(self, image_path):
        self.image_path = image_path

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get_or_404(id)

    def toDICT(self):

        cls_dict = {}
        cls_dict['image_id'] = self.image_id
        cls_dict['review_id'] = self.review_id
        cls_dict['image_path'] = self.image_path

        return cls_dict

    def toJSON(self):

        return self.toDICT()

class chat_box(db.Model):
    __tablename__ = 'chat_box'
    chat_id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    chat_value = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(255), nullable=False)
    created_on = db.Column(db.DateTime(timezone=True), server_default=func.now())       #https://stackoverflow.com/questions/13370317/sqlalchemy-default-datetime

    def __init__(self, chat_id, user_id, chat_value, category, created_on):
        self.chat_id = chat_id
        self.user_id = user_id
        self.chat_value = chat_value
        self.category = category
        self.created_on = created_on

    def save(self):
        db.session.add(self)
        db.session.commit()

    def set_chat_value(self, chat_value):
        self.chat_value = chat_value

    def set_category(self, category):
        self.category = category

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get_or_404(id)

    def toDICT(self):

        cls_dict = {}
        cls_dict['chat_id'] = self.chat_id
        cls_dict['user_id'] = self.user_id
        cls_dict['chat_value'] = self.chat_value
        cls_dict['category'] = self.category
        cls_dict['created_on'] = self.created_on

        return cls_dict

    def toJSON(self):

        return self.toDICT()