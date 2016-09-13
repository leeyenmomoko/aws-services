<?php
$config = file_get_contents('default.conf');
//print_r($config);
preg_match_all('/server\s\{(.*)/i', $config, $test);

print_r($test);


?>
