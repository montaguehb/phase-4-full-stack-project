from flask import Flask, make_response, request, session
from flask_restful import Api, Resource

import re

from config import app, db, api

# Local imports
from models import Concert, Venue, Artist, User, Tour


# ? I feel like there is a way we can reduce the amount of code for the BY ID as well as most of the ~show it in a list ones~ (?) --> seems like a matteo approved(/best practice) refactor
class Artists(Resource):
    def get(self):
        return make_response([artist.to_dict() for artist in Artist.query.all()], 200)


class ArtistsById(Resource):
    def get(self):
        if artist := db.session.get(Artist, id):
            return make_response(artist.to_dict(), 200)
        else:
            return make_response({"error": "Artist Not Found"}, 404)


class Concerts(Resource):
    def get(self):
        return make_response(
            [concert.to_dict() for concert in Concert.query.all()], 200
        )


class ConcertById(Resource):
    def get(self, id):
        if concert := db.session.get(Concert, id):
            return make_response(concert.to_dict(), 200)
        else:
            return make_response({"error": "Concert Not Found"}, 404)


class Venues(Resource):
    def get(self):
        return make_response([venue.to_dict() for venue in Venue.query.all()], 200)


class VenuesByID(Resource):
    def get(self, id):
        if venue := make_response(db.session.get(Venue, id), 200):
            return make_response(venue.to_dict(), 200)
        else:
            return make_response({"error": "Venue Not Found"}, 404)


class Login(Resource):
    def post(self):
        req = request.get_json()
        if user := User.query.filter(User.username == req.get("username")).first():
            if user.authenticate(req.get("password")):
                session["user_id"] = user.id
                return make_response(user.to_dict(), 200)
        else:
            return make_response({"error": "user not authorized"}, 403)


class Signup(Resource):
    def post(self):
        try:
            req = request.get_json()
            new_user = User(
                first_name=req["name"],
                username=req["username"],
                email=req["email"],
                password_hash=req["password"],
            )
            db.session.add(new_user)
            db.session.commit()
            return make_response(new_user.to_dict(), 201)
        except Exception as e:
            make_response({"error": e}, 400)


class Tours(Resource):
    def get(self):
        return make_response([tour.to_dict() for tour in Tour.query.all()])


class TourByID(Resource):
    def get(self, id):
        if tour := db.session.get(Tour, id):
            return make_response(tour.to_dict(), 200)
        else:
            return make_response({"error": "Tour Not Found"}, 404)

class Clear(Resource):
    def post(self):
        session.clear()
        return make_response({}, 202)
    
api.add_resource(Concerts, "/concerts")
api.add_resource(ConcertById, "/concerts/<int:id>")
api.add_resource(Tours, "/tours")
api.add_resource(TourByID, "/tours/<int:id>")
api.add_resource(Venues, "/venues")
api.add_resource(VenuesByID, "/venues/<int:id>")
api.add_resource(Artists, "/artists")
api.add_resource(ArtistsById, "/artists/<int:id>")
api.add_resource(Login, "/login")
api.add_resource(Signup, "/signup")
api.add_resource(Clear, "/clear")

if __name__ == "__main__":
    app.run(port=5000, debug=True, use_debugger=False, use_reloader=False)
