from flask import make_response, request, session
from flask_restful import Resource

import re

from config import app, db, api

# Local imports
from models import Concert, Venue, Artist, User, Tour, UserConcert

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

        username_regex = "^(?=.{4,32}$)(?![.-])(?!.*[.]{2})[a-zA-Z0-9.-]+(?<![.])$"
        username_regex = re.compile(username_regex)
        if re.fullmatch(username_regex, req.get("username")):
            if user := User.query.filter(User.username == req.get("username")).first():
                if user.authenticate(req.get("password")):
                    session["user_id"] = user.id
                    return make_response(user.to_dict(), 200)
        return make_response({"error": "user not authorized"}, 403)

    def get(self):
        if session.get("user_id"):
            return make_response(
                db.session.get(User, session["user_id"]).to_dict(), 200
            )
        return make_response({"error": "Unable to login"}, 403)


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


class Logout(Resource):
    def post(self):
        session.clear()
        return make_response({}, 202)


class Profile(Resource):
    def get(self):
        if session.get("user_id"):
            return make_response(
                db.session.get(User, session["user_id"]).to_dict(), 200
            )
    def post(self,concert_id):
        if session.get('user_id') and session.get('concert_id'):
            try:
                r = request.json()
                new_concert = UserConcert(
                    user_id = r[self.id],
                    concert_id = r[concert_id],
                )
                db.session.add(new_concert)
                db.session.commit()
                return make_response(new_concert.to_dict(),200)
            except Exception as e:
                return make_response({"error": e}, 400)

    def patch(self):
        if user := db.session.get(User, session.get("user_id")):
            for key, value in request.get_json().items():
                setattr(user, key, value)
            db.session.add(user)
            db.session.commit()
            return make_response(user.to_dict(), 200)
    
    def delete(self):
        if user := db.session.get(User, session.get("user_id")):
            db.session.delete(user)
            db.session.commit()
            return make_response({}, 204)        

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
api.add_resource(Logout, "/logout")
api.add_resource(Profile, "/profile")

if __name__ == "__main__":
    app.run(port=5000, debug=True, use_debugger=False, use_reloader=False)
