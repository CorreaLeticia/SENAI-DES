class Animal {
  int id;
  String nome;
  String especie;
  String raca;
  double peso;

  // Construtor
  Animal(this.id, this.nome, this.especie, this.raca, this.peso);

  String tudoJunto() {
    return "$id, $nome, $especie, $raca, $peso";
  }
}

void main() {
  Animal boi = Animal(1, "Bandido", "Bovino", "Nelori", 499.9);
  Animal vaca = Animal(2, "Mimosa", "Bovino", "Angus", 399.9);
  Animal gato = Animal(3, "Tico", "Felino", "Vira Latas", 1.9);
  Animal gata = Animal(4, "Mimi", "Felino", "Vira Lata", 1.2);
  Animal cachorro = Animal(5, "Totó", "Canino", "Caramelo", 10.9);
  Animal cachorra = Animal(6, "Layca", "Canino", "Xitus", 2.9);
  Animal cavalo = Animal(7, "Furacão", "Equino", "Manga Larga", 459.9);
  Animal pocoto = Animal(8, "Pocotó", "Equino", "Pangaré", 320.9);

  print(boi.tudoJunto());
  print(vaca.tudoJunto());
  print(gato.tudoJunto());
  print(gata.tudoJunto());
  print(cachorro.tudoJunto());
  print(cachorra.tudoJunto());
  print(cavalo.tudoJunto());
  print(pocoto.tudoJunto());
}