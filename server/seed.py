import random
import tempfile
from faker import Faker

from app import app
from models import db, Artist, Tour, Venue, Concert, User, UserConcert

fake = Faker()

def make_artists():
    Artist.query.delete()

    for _ in range(20):
        db.session.add(Artist(name=fake.first_name(), description=fake.paragraph()))
    db.session.commit()

def make_tours():
    Tour.query.delete()

    for _ in range(20):
        db.session.add(
            Tour(
                name=fake.text(max_nb_chars=20),
                artist_id=random.randint(1, len(Artist.query.all()) - 1),
                img_url="https://picsum.photos/200",
            )
        )
    db.session.commit()


def make_venues():
    Venue.query.delete()

    for _ in range(20):
        db.session.add(
            Venue(
                name=fake.city(),
                capacity=random.randint(250, 1000),
                location=fake.address(),
            )
        )
        db.session.commit()


def make_concerts():
    Concert.query.delete()

    for _ in range(20):
        db.session.add(
            Concert(
                name=fake.text(max_nb_chars=20),
                date=fake.date_this_year(),
                venue_id=random.randint(1, len(Venue.query.all()) - 1),
                tour_id=random.randint(1, len(Tour.query.all()) - 1),
            )
        )
    db.session.commit()


def make_users():
    User.query.delete()

    for _ in range(20):
        db.session.add(
            User(
                first_name=fake.first_name(),
                username=fake.last_name(),
                email=fake.email(),
                password_hash="password",
            )
        )
    db.session.add(
        User(
            first_name="test",
            username="test",
            email="test@test.com",
            password_hash="hunter2",
        )
    )
    db.session.commit()


def make_user_concerts():
    UserConcert.query.delete()

    for _ in range(20):
        db.session.add(
            UserConcert(
                concert_id=random.randint(1, len(Concert.query.all()) - 1),
                user_id=random.randint(1, len(User.query.all()) - 1),
            )
        )

    db.session.commit()


if __name__ == "__main__":
    with app.app_context():
        make_artists()
        make_tours()
        make_venues()
        make_concerts()
