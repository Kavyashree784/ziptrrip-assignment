function printPattern(n) {
  for (let i = 1; i <= n; i++) {
    const row = Array.from({ length: i }, (_, k) => i - k).join("");
    console.log(row);
  }
}

printPattern(4); //n can be any number you want to print the pattern for.