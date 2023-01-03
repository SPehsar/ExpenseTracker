// This for formating user's number input

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  .replace(/\.{2}/g,'.')
  .replace(/^0*([^0]\d*\.\d{1,2}).*/g, "$1");
}

/*
 .replace(/\.{2,}/g,'.')
This replaces consecutive . periods if there are any, i.e abc123.aba.123 here 
after first replace the string will become 123..123 so to make it a valid number 
we need to replace  ..  with single  .

.replace(/^0*([^0]\d*\.\d{1,2})./g, "$1")
This simply combines the combine yours regex which are used to remove 
the leading 0's and multiple decimals, this regex means

 ^0* - Match 0 zero or more time at start of string

([^0]\d*\.\d{1,2}) - Match non zero digit, followed by any number of digit followed by . 
followed by one or two digit

 .* - Match anything except new line

*/