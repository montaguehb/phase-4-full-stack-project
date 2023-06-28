# Remote library imports
from sqlalchemy.orm import validates

from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from config import db, bcrypt

import re


class UserConcert(db.Model, SerializerMixin):
    __tablename__ = "user_concerts"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    concert_id = db.Column(db.Integer, db.ForeignKey("concerts.id"))

    # relationships
    user = db.relationship("User", back_populates="user_concerts")
    concert = db.relationship("Concert", back_populates="user_concerts")

    # serializations
    serialize_rules = ("-user.user_concerts", "-concert.user_concerts")
    # validations
    # other methods


class Concert(db.Model, SerializerMixin):
    __tablename__ = "concerts"

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime)
    venue_id = db.Column(db.Integer, db.ForeignKey("venues.id"))
    tour_id = db.Column(db.Integer, db.ForeignKey("tours.id"))

    name = db.Column(db.String)
    
    #relationships
    venue = db.relationship("Venue", back_populates="concerts")
    tour = db.relationship("Tour", back_populates="concerts")
    user_concerts = db.relationship("UserConcert", back_populates="concert")
    users = association_proxy("user_concerts", "user")


    #serialization
    serialize_rules = ("-users", "-venue.concerts", "-tour.concerts", "-user_concerts")
    
    #validations

class Venue(db.Model, SerializerMixin):
    __tablename__ = "venues"

    id = db.Column(db.Integer, primary_key=True)
    # ? should we make name something like VARCHAR so the name can have hyphons and apostophies?
    name = db.Column(db.String, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    location = db.Column(db.VARCHAR, nullable=False)

    # relationships
    concerts = db.relationship("Concert", back_populates="venue")

    # serializations

    # validations
    @validates("name")
    def validate_name(self, key, name):
        # ? should think about implementing regex or not
        if not name:
            raise ValueError("Venue needs a name, 2-20 characters in length")
        return name

    @validates("capacity")
    def validate_capacity(self, key, capacity):
        if type(capacity) is not int or not 10 <= capacity <= 150000:
            raise ValueError("Capacity must be an integer between 10 and 150,000")
        return capacity

    @validates("location")
    def validate_location(self, key, location):
        # ? not sure how we want to format our location... as an address or what, for now assuming is a city string
        if not location:
            raise ValueError("Location is required")
        return location

    # other methods
    def __repr__(self):
        return f"<Venue: {self.id} \n Venue Name: {self.name}>"


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    username = db.Column(db.VARCHAR, nullable=False)
    _password_hash = db.Column(db.String)
    email = db.Column(db.VARCHAR, nullable=False)

    # relationships
    user_concerts = db.relationship("UserConcert", back_populates="user")
    concerts = association_proxy("user_concerts", "concerts")

    # serializations
    # serialize_rules = ("-user_concerts.user", "-concerts")
    serialize_only = ("id", "first_name", "username", "email")

    # validations
    @validates("first_name")
    def validate_first_name(self, key, first_name):
        first_name_regex = "[A-Z][a-z]*"
        first_name_regex = re.compile(first_name_regex)

        if not first_name or not re.fullmatch(first_name_regex, first_name):
            raise ValueError("User needs a first name, 2-20 characters in length")
        return first_name

    @validates("username")
    def validate_username(self, key, username):
        username_regex = "^(?=.{4,32}$)(?![.-])(?!.*[.]{2})[a-zA-Z0-9.-]+(?<![.])$"
        username_regex = re.compile(username)

        if not username or not re.fullmatch(username_regex, username):
            raise ValueError("User needs a username, 2-20 characters in length")
        return username

    @validates("email")
    def validate_email(self, key, email):
        # ? this one is going to need more work than others...
        email_regex = "[a-zA-Z0-9_\-\.]+[@][a-z]+[\.][a-z]{2,3}"
        email_regex = re.compile(email)
        if not email or not re.fullmatch(email_regex, email):
            raise ValueError("Email is required")
        return email

    # other methods

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))

    def __repr__(self):
        return f"<user: {self.id} \nname: {self.name}>"


class Tour(db.Model, SerializerMixin):
    __tablename__ = "tours"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    artist_id = db.Column(db.Integer, db.ForeignKey("artists.id"))
    img_url = db.Column(db.String, unique=True)

    # relationships
    artist = db.relationship("Artist", back_populates="tours")
    concerts = db.relationship("Concert", back_populates="tour")

    # serializations

    # validations
    @validates("name")
    def validate_name(self, key, name):
        if not name or not 2 < len(name) <= 20:
            raise ValueError("Tour needs a name, 2-20 characters in length")
        return name

    # other methods
    def __repr__(self):
        return f"<tour {self.id} \n artist:{self.artist.name}>"


class Artist(db.Model, SerializerMixin):
    __tablename__ = "artists"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    # relationships
    tours = db.relationship("Tour", back_populates="artist")

    # serializations
    serialize_rules = ("-tours",)

    # validations
    @validates("name")
    def validate_name(self, key, name):
        if not name or not 2 < len(name) <= 20:
            raise ValueError("Artist needs a name, 2-20 characters in length")
        return name

    # other methods
    def __repr__(self):
        return f"<Artist {self.id}\n Name: {self.name}>"
