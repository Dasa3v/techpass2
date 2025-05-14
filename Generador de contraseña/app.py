from flask import Flask, render_template, request
import secrets
import string

app = Flask(__name__)

def generate_password(length=12, upper=True, numbers=True, symbols=True):
    """
    Genera una contraseña segura con los parámetros especificados.
    Args:
        length (int): Longitud de la contraseña (6-12)
        upper (bool): Incluir mayúsculas
        numbers (bool): Incluir números
        symbols (bool): Incluir símbolos
    Returns:
        str: Contraseña generada
    """
    characters = string.ascii_lowercase
    if upper: characters += string.ascii_uppercase
    if numbers: characters += string.digits
    if symbols: characters += string.punctuation
    
    if len(characters) < 6:
        raise ValueError("Se requieren al menos 6 tipos de caracteres diferentes")
    
    return ''.join(secrets.choice(characters) for _ in range(length))

@app.route('/', methods=['GET', 'POST'])
def index():
    password = ''
    error = None
    
    if request.method == 'POST':
        try:
            length = int(request.form.get('length', 12))
            length = max(6, min(length, 12))  # Fuerza rango 6-12
            
            password = generate_password(
                length=length,
                upper='upper' in request.form,
                numbers='numbers' in request.form,
                symbols='symbols' in request.form
            )
        except ValueError as e:
            error = f"Error: {str(e)}"
        except Exception as e:
            error = "Error inesperado al generar la contraseña"
    
    return render_template('index.html', password=password, error=error)

if __name__ == '__main__':
    app.run(debug=True)