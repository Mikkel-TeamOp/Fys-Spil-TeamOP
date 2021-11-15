<!DOCTYPE html>
<html>
<body>

<?php

$redStep = 64;
$greenStep = 64;
$blueStep = 64;
//$step = 256/64 + 1;
$step = 256/32 + 1;

echo "const color125 = [";

for ($x = 0; $x < $step ; $x++) {	
  if ($x > 0) $red = $x * $redStep - 1;	
  else $red = 0;
  
  for ($y = 0; $y < $step ; $y++) {
	if ($y > 0) $green = $y * $greenStep - 1;
	else $green = 0;
	
	for ($z = 0; $z < $step ; $z++) {
	  if ($z > 0) $blue = $z * $blueStep -1;
	  else $blue = 0;
	  
	  
      printf("%02x", $red); 
	  printf("%02x", $green);
	  printf("%02x", $blue);
      echo ", ";
	  
	}
	$blue = 0;
  }
  $green = 0;  
}

echo "]";

?>

</body>
</html> 
