function printPattern(n, i = 1, output = []) {
  if (i > n) { output.forEach(r => console.log(r)); return; }
  const row = Array.from({ length: i }, (_, k) => i - k).join("");
  printPattern(n, i + 1, [...output, row]);
}

printPattern(4); //n can be any number you want to print the pattern for.