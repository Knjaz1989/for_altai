from flask import Flask, render_template

app = Flask("my_app")


@app.route('/')
def main():
    return render_template("index.html")


# if __name__ == "__main__":
#     app.run('127.0.0.1', 8000)
