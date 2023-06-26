import random

from faker import Faker

from app import app
from models import db, Artist, Tour, Venue, Concert

fake = Faker()

def make_artists():
    Artist.query.delete()

    for _ in range(20):
        db.session.add(Artist(
            name=fake.name()
        ))
    db.session.commit()        

def make_tours():
    Tour.query.delete()
    
    for _ in range(20):
        db.session.add(Tour(
            name=fake.text(max_nb_chars=20),
            artist_id=random.randint(0, len(Artist.query.all()) - 1) 
        ))
        
    db.session.commit() 

def make_venues():
    Venue.query.delete()
    
    for _ in range(20):
        db.session.add(Venue(name=fake.city(),
                             capacity=random.randint(250, 1000),
                             location=fake.address()))
        
        db.session.commit()    

def make_concerts():
    Concert.query.delete()
    
    for _ in range(20):
        db.session.add(Concert(date=fake.date_this_year(),
                               venue_id=random.randint(0, len(Venue.query.all()) - 1),
                               tour_id=random.randint(0, len(Tour.query.all()) - 1)))  
          
    db.session.commit()      
    
if __name__ == '__main__':
    with app.app_context():
        make_artists()
        make_tours()
        make_venues()
        make_concerts()