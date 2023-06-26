
from flask import Flask, make_response
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource

# Local imports
from models import db, Concert, Venue


# Instantiate app, set attributes
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# Define metadata, instantiate db

migrate = Migrate(app, db)
db.init_app(app)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app)


class Concerts(Resource):
    def get(self):
        return make_response([concert.to_dict() for concert in Concert.query.all()], 200)

class ConcertById(Resource):
    def get(self, id):
        return make_response(db.session.get(Concert, id).to_dict(), 200)
    
class Venues(Resource):
    def get(self):
        return make_response([venue.to_dict() for venue in Venue.query.all()],200)

class VenuesByID(Resource):
    def get(self,id):
        return make_response(db.session.get(Venue, id),200)

api.add_resource(Concerts, "/concerts")
api.add_resource(ConcertById, "/concerts/<int:id>")
api.add_resource(Venues, "/venues")
api.add_resource(VenuesByID, "/venues/<int:id>")

if __name__ == "__main__":
    app.run(port=5555, debug=True)

