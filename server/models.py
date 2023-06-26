# Remote library imports
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)


class Concert(db.Model, SerializerMixin):
    __tablename__ = 'concerts'
    
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime)
    venue_id = db.Column(db.Integer, db.ForeignKey("venues.id"))
    tour_id = db.Column(db.Integer, db.ForeignKey("tours.id"))

    venue = db.relationship("Venue", back_populates="concerts")
    
    serialize_rules = ("-venue",)
    
class Venue(db.Model, SerializerMixin):
    __tablename__ = 'venues'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable= False)
    capacity = db.Column(db.Integer, nullable=False)
    location = db.Column(db.VARCHAR, nullable=False)
    
    concerts = db.relationship('Concert',back_populates='venue')
    
    serialize_rules = ('-concerts',)
    
    def __repr__(self):
        return f'<Venue: {self.id} \n Venue Name: {self.name}>'


class Tours(db.Model, SerializerMixin):
    
    __tablename__ = "tours"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    artist_id = db.Column(db.Integer, db.ForeignKey("artists.id"))

class Artist(db.Model, SerializerMixin):
    __tablename__='artists'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    tours = db.Column(db.Integer, nullable=False)
    
    tours = db.relationship("Tour", back_populates="artist")
    
    serialize_rules = ('-tours',)
    
    def __repr__(self):
        return f'<Artist {self.name}>'

