# 🎫**FlatTicket**(we can totally change this name)🎫

<sub>🎹A project By: Historia Montague, Jay Lim, and Nolan Nash🎹</sub>

## 👨‍🎤Project Overview👩‍🎤

Welcome to FlatTicket. An application allowing users to view a wide variety of music tours as well as buy tickets for those tours and a variety of other exciting features.

---

## 🎛️Installation and Usage🎛️

The first step to installing and using our application is to fork and clone the directory from github into your local environment

### 🎼**Back End (Do this First)**🎼

1. Once inside your local environment, CD into the server folder and run `pipenv install`
2. Run FLASK_APP=app.py in your terminal
3. Run `flask db init` followed by: `flask db migrate` and finally `flask db upgrade` to create your database and tables
4. still inside the server folder run `python seed.py` to seed your tables with data from Faker
5. In a new terminal (still inside server folder) run `pipenv shell` followed by `flask run` to start your server.
6. A complete list of packages used in the project is included below in case of missing modules
    1.  To fix a missing module simply run `pip install <module name>`
7. Now your back end server is up running, its time to get the front end up and running as well.

### 🎶**Front End**🎶

* In a new terminal cd into the client folder and run `npm install`
* In the same terminal enter `npm start`
  * If any errors relating to missing modules appear running `npm i` may solve the problem.
  * If the problem persists check the terminal and install and specific packeges noted as missing
  * Please note in the backend, you need to protect your secrect key to protect your user data

---

## 🎸Notable and important features🎸

### 🎶**Front End**🎶

* Full auth with login/logout + persistance in profile data
* Full CRUD on user profiles
* Each card is populated with information seeded from the database and is able to direct users to various routes.
* Functional search bar with drop down allows users to find concerts based on different parameters

* form validation and errors with Yup


### 🎼**Back End**🎼

* config.py file used to configure database
* hashing done for user passwords
* full CRUD on users. 

---

## 🔊Licensing, Packages and Socials🔊

### PACKAGES USED


* Node Modules
  * formik
    * formik-semantic-ui-react
  * semantic ui
  * react
    * react-scripts
    * react-dom
    * react-router-dom
  * yup
  * web-vitals


* Python Packages
  * faker
  * flask
    * flask-migrate
    * flask-sqlalchemy
    * flask-cors
    * flask-restful
    * flask-bcrpyt
  * sqlalchemy-serializer
  * importlib
    * importlib-metadata
    * importlib-resources

### 📻**Licensing**📻

MIT License

Copyright (c) [2023] [Historia Montague, Jay Lim, Nolan Nash]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

### 🎧🎤🎧**Socials, Contact, Blogs**🎧🎤🎧

* Historia:
  * Github:
  * Blog:
  * Add others if you want

* Jay:

  * Blog
  * Others

* Nolan:

  * [Blog](https://nolan.hashnode.dev/)

