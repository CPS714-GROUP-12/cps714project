from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy

from base import api
db = SQLAlchemy(api)

class Users(db.Model):
    __tablename__ = 'Users'
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(32), nullable=False)
    email = db.Column(db.String(64), nullable=False)
    password = db.Column(db.Text())
    first_name = db.Column(db.String(32), nullable=False)
    last_name = db.Column(db.String(32), nullable=False)
    location = db.Column(db.String(32), nullable=True)

    def __init__(self, username, email, password, first_name, last_name, location: None):
        self.username = username
        self.email = email
        self.password = password
        self.first_name = first_name
        self.last_name = last_name
        self.location = location

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
        cls_dict['_id'] = self.id
        cls_dict['username'] = self.username
        cls_dict['email'] = self.email
        cls_dict['first_name'] = self.first_name
        cls_dict['last_name'] = self.last_name
        cls_dict['location'] = self.location

        return cls_dict

    def toJSON(self):

        return self.toDICT()