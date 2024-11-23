# from flask import Flask, request, jsonify
# import util
# import os
# app = Flask(__name__)


# @app.route('/classify_image', methods=['GET', 'POST'])
# def classify_image():
#     image_data = request.form['image_data']

#     response = jsonify(util.classify_image(image_data))

#     response.headers.add('Access-Control-Allow-Origin', '*')

#     return response

# if __name__ == "__main__":
#     print("Starting Python Flask Server For Sports Celebrity Image Classification")
#     util.load_saved_artifacts()
#     port = int(os.environ.get('PORT', 5000))
#     app.run(host='0.0.0.0', port=port)



from flask import Flask, request, jsonify, render_template
import util
import os
# app = Flask(__name__, template_folder=os.path.join(os.path.dirname(__file__), '../templates'))
app = Flask(__name__, 
            static_folder=os.path.join(os.path.dirname(__file__), '../static'), 
            template_folder=os.path.join(os.path.dirname(__file__), '../templates'))

# app = Flask(__name__)

@app.route('/')
def index():
    # Render the app.html template
    return render_template('app.html')

# @app.route('/classify_image', methods=['POST'])
# def classify_image():
#     image_data = request.form.get('image_data')

#     if not image_data:
#         return jsonify({"error": "image_data is required"}), 400

#     response = jsonify(util.classify_image(image_data))
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     return response


@app.route('/classify_image', methods=['POST'])
def classify_image():
    # Log the incoming request for debugging
    print("Received a request on /classify_image")
    image_data = request.form.get('image_data')

    if not image_data:
        print("No image_data found in the request")
        return jsonify({"error": "image_data is required"}), 400

    # Process the image data using the util function
    response_data = util.classify_image(image_data)
    print("Classification result:", response_data)
    
    # Return the classification result
    response = jsonify(response_data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    print("Starting Python Flask Server For Sports Celebrity Image Classification")
    util.load_saved_artifacts()
    app.run(host='0.0.0.0', port=5000)
