import os
import re
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
# from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import psycopg2
# from config import (protocol,username,password,host,port,database_name)


app = Flask(__name__)
# rds_connection_string = f'{protocol}://{username}:{password}@{host}:{port}/{database_name}'
# app.config['SQLALCHEMY_DATABASE_URI'] =rds_connection_string
# db = SQLAlchemy(app)
# conn = psycopg2.connect(rds_connection_string, sslmode='require')

from flask_sqlalchemy import SQLAlchemy
uri = os.environ.get('DATABASE_URL', '') or "sqlite:///db.sqlite"
if uri and uri.startswith("postgres://"):
    uri = uri.replace("postgres://", "postgresql://", 1)

app.config['SQLALCHEMY_DATABASE_URI'] = uri

# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
conn = psycopg2.connect(uri, sslmode='require')



def get_summary():
    cur = conn.cursor()
    cur.execute('SELECT * FROM larger_summary;')
    summary = cur.fetchall()
    return summary
def get_data():
    cur = conn.cursor()
    cur.execute('SELECT * FROM disasters;')
    disaster_data=cur.fetchall()
    return disaster_data
def get_decade():
    cur = conn.cursor()
    cur.execute('SELECT * FROM decade_breakdown;')
    decade = cur.fetchall()
    return decade
def get_continent_bd():
    cur = conn.cursor()
    cur.execute('SELECT * FROM continent_breakdown;')
    continent_breakdown = cur.fetchall()
    return continent_breakdown
def get_continent_decade():
    cur = conn.cursor()
    cur.execute('SELECT * FROM continent_decade;')
    continent_decade = cur.fetchall()
    return continent_decade
def get_typebreakdown():
    cur = conn.cursor()
    cur.execute('SELECT * FROM type_breakdown;')
    type_breakdown = cur.fetchall()
    return type_breakdown
def get_deaths():
    cur = conn.cursor()
    cur.execute('SELECT * FROM deaths;')
    deaths = cur.fetchall()
    return deaths
def get_incomeDecade():
    cur = conn.cursor()
    cur.execute('SELECT * FROM income_decade;')
    income = cur.fetchall()
    return income
def get_income():
    cur = conn.cursor()
    cur.execute('SELECT * FROM income_summary;')
    income = cur.fetchall()
    return income
def get_countrySum():
    cur = conn.cursor()
    cur.execute('SELECT * FROM country_summary;')
    countrySum = cur.fetchall()
    return countrySum
def get_countrybd():
    cur = conn.cursor()
    cur.execute('SELECT * FROM country_breakdown;')
    countryBD = cur.fetchall()
    return countryBD
def get_countryYearly():
    cur = conn.cursor()
    cur.execute('SELECT * FROM country_yearly;')
    countryYearly = cur.fetchall()
    return countryYearly
def get_temp():
    cur = conn.cursor()
    cur.execute('SELECT * FROM temp_change;')
    temp = cur.fetchall()
    return temp




@app.route("/")
def home():
    return render_template('index.html')
@app.route("/climate")
def climate():
    return render_template('climate.html')
@app.route("/references")
def references():
    return render_template('citations.html')
@app.route("/deaths")
def deaths():
    return render_template('deaths.html')
@app.route("/world")
def world():
    return render_template('world.html')
@app.route("/type")
def type():
    return render_template('type.html')
@app.route("/country")
def country():
    return render_template('country.html')
    

    


#Data
@app.route("/summary")
def summary():
    summary = get_summary()
    return jsonify(summary)
@app.route("/disaster")
def disaster():
    disaster = get_data()
    return jsonify(disaster)
@app.route("/decade")
def decade():
    decade = get_decade()
    return jsonify(decade)
@app.route("/continent_breakdown")
def continent_breakdown():
    continent_breakdown=get_continent_bd()
    return jsonify(continent_breakdown)
@app.route("/continent_decade")
def continent_decade():
    continent_decade=get_continent_decade()
    return jsonify(continent_decade)
@app.route("/type_breakdown")
def type_breakdown():
    type_breakdown=get_typebreakdown()
    return jsonify(type_breakdown)
@app.route("/deaths_data")
def death_data():
    deaths=get_deaths()
    return jsonify(deaths)
@app.route("/income")
def income():
    income=get_income()
    return jsonify(income)
@app.route("/incomeDecade")
def incomeDecade():
    incomeDecade=get_incomeDecade()
    return jsonify(incomeDecade)
@app.route("/countrySum")
def countySum():
    countrySum=get_countrySum()
    return jsonify(countrySum)
@app.route("/countryBD")
def countyBD():
    countryBD=get_countrybd()
    return jsonify(countryBD)
@app.route("/countryYearly")
def countryYearly():
    countryYearly=get_countryYearly()
    return jsonify(countryYearly)
@app.route("/tempchange")
def tempChange():
    tempChange=get_temp()
    return jsonify(tempChange)







if __name__ == "__main__":
    app.run(debug=True)