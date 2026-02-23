from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/health')
def health():
    return jsonify({"status": "healthy"})

@app.route('/api/test')
def test():
    return jsonify({"message": "Backend is working!"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
EOF
