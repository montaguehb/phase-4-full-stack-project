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

    # other methods
    def __repr__(self):
        return f"<UserConcert: {self.id} \nUser: {self.user.id} \n Concert: {self.concert.id}>"


class Concert(db.Model, SerializerMixin):
    __tablename__ = "concerts"

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime)
    venue_id = db.Column(db.Integer, db.ForeignKey("venues.id"))
    tour_id = db.Column(db.Integer, db.ForeignKey("tours.id"))
    name = db.Column(db.String)

    # relationships
    venue = db.relationship("Venue", back_populates="concerts")
    tour = db.relationship("Tour", back_populates="concerts")
    user_concerts = db.relationship("UserConcert", back_populates="concert")
    users = association_proxy("user_concerts", "user")

    # serialization
    serialize_rules = ("-users", "-venue.concerts", "-tour.concerts", "-user_concerts")

    # other methods
    def __repr__(self):
        return f"<Concert: {self.id}>"


class Venue(db.Model, SerializerMixin):
    __tablename__ = "venues"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    location = db.Column(db.VARCHAR, nullable=False, unique=True)

    # relationships
    concerts = db.relationship("Concert", back_populates="venue")

    # validations
    @validates("name")
    def validate_name(self, key, name):
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
    username = db.Column(db.VARCHAR, nullable=False, unique=True)
    _password_hash = db.Column(db.String)
    email = db.Column(db.VARCHAR, nullable=False, unique=True)

    # relationships
    user_concerts = db.relationship("UserConcert", back_populates="user")
    concerts = association_proxy("user_concerts", "concerts")

    # serializations
    serialize_only = ("id", "first_name", "username", "email", "user_concerts")

    # validations
    @validates("first_name")
    def validate_first_name(self, _, first_name):
        if not first_name:
            raise ValueError("User needs a first name")
        elif not re.fullmatch("^[A-Za-z]*$", first_name):
            raise ValueError("User needs a first name, 2-50 characters in length")
        return first_name

    @validates("username")
    def validate_username(self, _, username):
        if not username:
            raise ValueError("User requires a username")
        elif not re.match("^[a-zA-Z0-9]*$", username):
            raise ValueError("User needs a username, 2-20 characters in length")
        elif User.query.filter_by(username=username).first():
            raise ValueError("Username already exists")
        return username

    @validates("email")
    def validate_email(self, _, email):
        if not email:
            raise ValueError("Email is required")
        elif not re.match("[a-zA-Z0-9_\-\.]+[@][a-z]+[\.][a-z]{2,3}", email):
            raise ValueError("Email needs to be in a proper format")
        elif User.query.filter_by(email=email).first():
            raise ValueError("Email already exists")
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
        return f"<user: {self.id} \nname: {self.first_name}>"


class Tour(db.Model, SerializerMixin):
    __tablename__ = "tours"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    artist_id = db.Column(db.Integer, db.ForeignKey("artists.id"))
    img_url = db.Column(db.String)

    # relationships
    artist = db.relationship("Artist", back_populates="tours")
    concerts = db.relationship("Concert", back_populates="tour")

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
    description = db.Column(db.String, nullable=False)

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
