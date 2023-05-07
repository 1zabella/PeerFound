from flask import Flask, request, jsonify
import pickle
import numpy as np
from sklearn.preprocessing import StandardScaler

# Instanciando o Flask
app = Flask(__name__)

# Rota principal da API
@app.route('/')
def home():
    return 'API de Modelo Preditivo'

# Rota para predição de novos dados
@app.route('/predict', methods=['POST'])
def predict():
    dados = request.get_json()
    
    # Validação de dados
    if not dados or not 'vlr_credito' in dados or not 'vlr_score' in dados or not 'rating' in dados or not 'nota' in dados:
        return jsonify({
            'success': False, 
            'error': 'Dados inválidos.'
        })
    
    with open('modelo_lr.pkl', 'rb') as file: 
        modelo = pickle.load(file)
    
    dados = request.get_json()
    dados = np.array(list(dados.values()))

    previsao = modelo.predict(dados)

    return jsonify({'previsao': previsao.tolist()})

if __name__ == '__main__':
    app.run(debug=True)