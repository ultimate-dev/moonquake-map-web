from flask import Flask, jsonify
import pandas as pd

app = Flask(__name__)


@app.route("/")
def getData():
    df = pd.read_csv("./collections/1979_sm_locations.csv")
    return pd.DataFrame(df).to_json()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
