function reverseString(str) {
  return [...str].reduceRight((acc, char) => acc + char, "");
}

console.log(reverseString("Bhaskara")); // araksahB