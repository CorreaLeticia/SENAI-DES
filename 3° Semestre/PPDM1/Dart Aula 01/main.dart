void main(){
    String texto = "Alô Mundo!";
    int numero = 9999999988888888;
    double n = 0.333333333333333333333333333333333333;
    bool ativo = false;
    var coisa = 10; //Não tipada
    dynamic tudo = "oi";
    

    print(texto);
    print(numero);
    print("Real = "+n.toString());//Concatenação
    print(ativo? "Oi": "Tchau"); //If ternário
    print(coisa);
    print(tudo);
    tudo = 500;
    print(tudo);
    }
