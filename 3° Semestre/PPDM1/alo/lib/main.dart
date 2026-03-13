import 'package:flutter/material.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Column(
          children: [
            Center(
              child: Text(
                "Título",
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 22.0,
                ),
              ),
            ),
            Center(
              child: ElevatedButton(
                onPressed: () {},
                child: Text("Ok"),
              ),
            ),
            Center(
              child: Text("Texto"),
            ),
          ],
        ),
      ),
    );
  }
}