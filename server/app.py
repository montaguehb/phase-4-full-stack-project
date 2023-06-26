from flask import Flask, make_response
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource

# Local imports
from models import db, Concert

# Instantiate app, set attributes
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# Define metadata, instantiate db
migrate = Migrate(app, db)
db.init_app(app)

# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app)

class Concerts(Resource):
    def get(self):
        return make_response([concert.to_dict() for concert in Concert.query.all()], 200)

api.add_resource(Concerts, "/concerts")

if __name__ == "__main__":
    app.run(port=5555, debug=True)