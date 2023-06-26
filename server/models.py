# Remote library imports
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from config import db, bcrypt



class Concert(db.Model, SerializerMixin):
    __tablename__ = 'concerts'
    
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime)
    venue_id = db.Column(db.Integer, db.ForeignKey("venues.id"))
    tour_id = db.Column(db.Integer, db.ForeignKey("tours.id"))

    venue = db.relationship("Venue", back_populates="concerts")
    tour = db.relationship("Tour", back_populates="concerts")
    
    users = association_proxy("user_concerts", "users")
    serialize_rules = ("-venue",)
    
class Venue(db.Model, SerializerMixin):
    __tablename__ = 'venues'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable= False)
    capacity = db.Column(db.Integer, nullable=False)
    location = db.Column(db.VARCHAR, nullable=False)

    concerts = db.relationship("Concert", back_populates="venue")
    
    def __repr__(self):
        return f'<Venue: {self.id} \n Venue Name: {self.name}>'


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    username = db.Column(db.VARCHAR, nullable=False)
    password_hash = db.Column(db.String)
    email = db.Column(db.VARCHAR, nullable=False)

    concerts = association_proxy("user_concerts", "concerts")
    
    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
            
    def __repr__(self):
        return f'<user: {self.id} \nname: {self.name}>'

class UserConcert(db.Model, SerializerMixin):
    __tablename__ = 'user_concerts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    concert_id = db.Column(db.Integer, db.ForeignKey('concerts.id'))

    user = db.relationship("User", back_populates="concerts")
    concert = db.relationship("Concert", back_populates="users")

class Tour(db.Model, SerializerMixin):
    
    __tablename__ = "tours"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    artist_id = db.Column(db.Integer, db.ForeignKey("artists.id"))
    
    artist = db.relationship("Artist", back_populates="tours")
    concerts = db.relationship("Concert", back_populates="tour")
    
    
class Artist(db.Model, SerializerMixin):
    __tablename__='artists'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    
    tours = db.relationship("Tour", back_populates="artist")
    
    serialize_rules = ('-tours',)
    
    def __repr__(self):
        return f'<Artist {self.name}>'


